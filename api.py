"""
Drishtii FastAPI Backend
Exposes the OCR + AI extraction logic as a REST API
so the React frontend can call it.
"""

import os
import json
import asyncio
import time
from io import BytesIO
from typing import List

import pandas as pd

import cv2
import numpy as np
import easyocr
import google.generativeai as genai
from PIL import Image
from pdf2image import convert_from_bytes
from dotenv import load_dotenv
import requests as http_requests

from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

# ---------------------------------------------------------------------------
# Setup
# ---------------------------------------------------------------------------

load_dotenv()

GENAI_API_KEY = os.getenv("GEMINI_API_KEY")
if GENAI_API_KEY:
    genai.configure(api_key=GENAI_API_KEY)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
POPPLER_PATH = os.getenv(
    "POPPLER_PATH",
    r"d:\All projects\Drishtii\poppler_data\Library\bin"
)

app = FastAPI(title="Drishtii API", version="1.0.0")

# Allow the Netlify-hosted frontend (and localhost dev) to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict to your Netlify URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve the output folder so files can be downloaded
if not os.path.exists("output"):
    os.makedirs("output")
app.mount("/output", StaticFiles(directory="output"), name="output")

# ---------------------------------------------------------------------------
# Core logic (mirrors app.py)
# ---------------------------------------------------------------------------

_ocr_reader = None

def get_ocr_reader():
    global _ocr_reader
    if _ocr_reader is None:
        _ocr_reader = easyocr.Reader(['en', 'hi', 'mr'], gpu=False)
    return _ocr_reader


def extract_text_from_image(image: Image.Image) -> str:
    reader = get_ocr_reader()
    image_np = np.array(image)
    results = reader.readtext(image_np, detail=0)
    return " ".join(results)


def parse_with_gemini(raw_text: str, context: str, target_fields: str) -> dict:
    if not GENAI_API_KEY:
        raise ValueError("Gemini API Key not configured.")
    model = genai.GenerativeModel('gemini-1.5-flash')
    prompt = f"""
You are a high-precision document data extraction engine called Drishtii.

DOCUMENT CONTEXT:
{context}

TARGET FIELDS TO EXTRACT:
{target_fields}

RAW TEXT FROM DOCUMENT (MAY CONTAIN OCR ERRORS OR REGIONAL LANGUAGES):
\"\"\"{raw_text}\"\"\"

INSTRUCTION:
Extract the target fields from the raw text.
Return ONLY a valid JSON object.
If a field is not found, use "null".
Ensure all values are accurately pulled, especially numbers, dates, and names.
Maintain original language for names and addresses if found in Hindi or Marathi.
"""
    response = model.generate_content(prompt)
    clean_json = response.text.strip().replace('```json', '').replace('```', '')
    return json.loads(clean_json)


def parse_with_openrouter(raw_text: str, context: str, target_fields: str) -> dict:
    if not OPENROUTER_API_KEY:
        raise ValueError("OpenRouter API Key not configured.")
    prompt = f"""
You are a high-precision document data extraction engine called Drishtii.
DOCUMENT CONTEXT: {context}
TARGET FIELDS: {target_fields}
RAW TEXT: {raw_text}
Return ONLY valid JSON.
"""
    response = http_requests.post(
        url="https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
        },
        data=json.dumps({
            "model": "google/gemini-2.0-flash-001",
            "messages": [{"role": "user", "content": prompt}]
        })
    )
    response.raise_for_status()
    result = response.json()
    content = result['choices'][0]['message']['content']
    clean_json = content.strip().replace('```json', '').replace('```', '')
    return json.loads(clean_json)


def parse_document(raw_text: str, context: str, target_fields: str) -> dict:
    try:
        return parse_with_gemini(raw_text, context, target_fields)
    except Exception:
        try:
            return parse_with_openrouter(raw_text, context, target_fields)
        except Exception as fallback_err:
            return {"error": str(fallback_err)}


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.get("/health")
def health():
    return {"status": "ok", "service": "Drishtii API"}


@app.post("/extract")
async def extract(
    files: List[UploadFile] = File(...),
    context: str = Form(default="{}"),
):
    """
    Accepts one or more files + a JSON context string.
    Returns a list of extraction results, one per file.
    """
    try:
        ctx = json.loads(context)
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid context JSON")

    doc_context = ctx.get("description", ctx.get("docType", "General document"))
    target_fields = ", ".join(ctx.get("targetFields", []))
    lang_map = {"English": "en", "Hindi": "hi", "Marathi": "mr"}
    languages = [lang_map.get(l, "en") for l in ctx.get("languages", ["English"])]

    results = []

    for upload in files:
        raw_bytes = await upload.read()
        file_type = upload.content_type or ""
        doc_images: List[Image.Image] = []

        # Decode the uploaded file into PIL images
        if "pdf" in file_type:
            poppler = POPPLER_PATH if os.path.exists(POPPLER_PATH) else None
            try:
                doc_images = convert_from_bytes(raw_bytes, poppler_path=poppler)
            except Exception as e:
                results.append({
                    "filename": upload.filename,
                    "error": f"PDF conversion failed: {e}"
                })
                continue
        else:
            try:
                img = Image.open(BytesIO(raw_bytes)).convert("RGB")
                doc_images = [img]
            except Exception as e:
                results.append({
                    "filename": upload.filename,
                    "error": f"Image decode failed: {e}"
                })
                continue

        # Run OCR on each page
        full_raw_text = ""
        for page_img in doc_images:
            full_raw_text += extract_text_from_image(page_img) + "\n"

        # Parse with AI
        extracted = parse_document(full_raw_text, doc_context, target_fields)

        results.append({
            "filename": upload.filename,
            "raw_text": full_raw_text.strip(),
            "fields": extracted,
        })

    # Aggregate results for Excel
    all_rows = []
    for r in results:
        if "fields" in r and isinstance(r["fields"], dict):
            row = {"filename": r["filename"]}
            row.update({str(k): str(v) for k, v in r["fields"].items()})
            all_rows.append(row)

    if all_rows:
        df = pd.DataFrame(all_rows)
        output_dir = "output"
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
        
        excel_path = os.path.join(output_dir, "output.xlsx")
        df.to_excel(excel_path, index=False)
        print(f"Generated Excel output at {excel_path}")

    return {
        "results": results,
        "excelUrl": "/output/output.xlsx" if all_rows else None
    }
