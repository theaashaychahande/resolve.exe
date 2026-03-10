import streamlit as st
import os
import cv2
import numpy as np
import pandas as pd
import easyocr
import google.generativeai as genai
from PIL import Image
from pdf2image import convert_from_bytes
from dotenv import load_dotenv
import json
import base64
from io import BytesIO


load_dotenv()

GENAI_API_KEY = os.getenv("GEMINI_API_KEY")
if GENAI_API_KEY:
    genai.configure(api_key=GENAI_API_KEY)


OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")


POPPLER_PATH = os.getenv("POPPLER_PATH", r"d:\All projects\Drishtii\poppler_data\Library\bin")

st.set_page_config(
    page_title="Drishtii - AI Document Extraction",
    page_icon="👁️",
    layout="wide"
)


st.markdown("""
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Outfit:wght@300;500;700&display=swap" rel="stylesheet">

<style>
    /* Global Overrides */
    body, [data-testid="stAppViewContainer"] {
        background-color: #050505;
        font-family: 'Inter', sans-serif;
        color: #e0e0e0;
    }
    
    [data-testid="stHeader"] {
        background: rgba(0,0,0,0);
    }

    /* Typography */
    h1, h2, h3 {
        font-family: 'Outfit', sans-serif;
        font-weight: 700;
        letter-spacing: -0.02em;
        color: #ffffff;
    }
    
    .main-title {
        font-size: 3.5rem;
        background: linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 0.5rem;
        text-align: center;
    }
    
    .sub-title {
        font-size: 1.1rem;
        color: #888;
        font-weight: 300;
        margin-bottom: 3rem;
        text-align: center;
    }

    /* Cards / Containers */
    .glass-card {
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        padding: 1.5rem;
        transition: all 0.3s ease;
        margin-bottom: 1rem;
    }
    
    .glass-card:hover {
        border-color: rgba(16, 185, 129, 0.3);
    }

    /* Section Headers */
    .section-label {
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.15em;
        color: #10b981;
        font-weight: 600;
        margin-bottom: 1rem;
    }
</style>
""", unsafe_allow_html=True)

# --- Logic Layer ---

@st.cache_resource
def get_ocr_reader():
    
    return easyocr.Reader(['en', 'hi', 'mr'], gpu=False)

def preprocess_image(image_np):
    
    gray = cv2.cvtColor(image_np, cv2.COLOR_RGB2GRAY)
    
    denoised = cv2.fastNlMeansDenoising(gray, h=10)
    return denoised

def extract_text_from_image(image):
    
    reader = get_ocr_reader()
    image_np = np.array(image)
    
    results = reader.readtext(image_np, detail=0)
    return " ".join(results)

def parse_with_gemini(raw_text, context, target_fields):
    
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

def parse_with_openrouter(raw_text, context, target_fields):
    
    import requests
    if not OPENROUTER_API_KEY:
        raise ValueError("OpenRouter API Key not configured.")

    prompt = f"""
    You are a high-precision document data extraction engine called Drishtii.
    DOCUMENT CONTEXT: {context}
    TARGET FIELDS: {target_fields}
    RAW TEXT: {raw_text}
    Return ONLY valid JSON.
    """

    try:
        response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
            },
            data=json.dumps({
                "model": "google/gemini-2.0-flash-001", 
                "messages": [
                    {"role": "user", "content": prompt}
                ]
            })
        )
        response.raise_for_status()
        result = response.json()
        content = result['choices'][0]['message']['content']
        clean_json = content.strip().replace('```json', '').replace('```', '')
        return json.loads(clean_json)
    except Exception as e:
        raise Exception(f"OpenRouter Fallback Failed: {str(e)}")

def parse_document(raw_text, context, target_fields):
    
    try:
        
        return parse_with_gemini(raw_text, context, target_fields)
    except Exception as gemini_err:
        st.warning(f"⚠️ Primary engine (Gemini) encountered an issue. Switching to fallback engine...")
        try:
            # Attempt Fallback (OpenRouter)
            return parse_with_openrouter(raw_text, context, target_fields)
        except Exception as fallback_err:
            return {"error": f"Both primary and fallback engines failed. Gemini: {str(gemini_err)} | OpenRouter: {str(fallback_err)}"}

def get_download_link(df, filename, label):
    
    towrite = BytesIO()
    df.to_excel(towrite, index=False, header=True)
    towrite.seek(0)
    b64 = base64.b64encode(towrite.read()).decode()
    return f'<a href="data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,{b64}" download="{filename}.xlsx" class="stButton" style="text-decoration: none; padding: 10px; background-color: #10b981; color: white; border-radius: 8px;">{label}</a>'


def main():
    st.markdown('<h1 class="main-title">Drishtii</h1>', unsafe_allow_html=True)
    st.markdown('<p class="sub-title">Advanced AI data extraction layer for high-precision document digitization.</p>', unsafe_allow_html=True)

    col1, col2 = st.columns([1, 1.2], gap="large")

    with col1:
        st.markdown('<p class="section-label">Source Document</p>', unsafe_allow_html=True)
        uploaded_file = st.file_uploader("Upload PDF or Image", type=["pdf", "jpg", "jpeg", "png"], label_visibility="collapsed")
        
        doc_images = []
        if uploaded_file:
            st.markdown('<div class="glass-card">', unsafe_allow_html=True)
            if uploaded_file.type == "application/pdf":
                try:
                    # Convert PDF to images
                    pdf_bytes = uploaded_file.read()
                    doc_images = convert_from_bytes(pdf_bytes, poppler_path=POPPLER_PATH if os.path.exists(POPPLER_PATH) else None)
                    st.success(f"PDF loaded: {len(doc_images)} pages detected.")
                    st.image(doc_images[0], caption="Page 1 Preview", use_container_width=True)
                except Exception as e:
                    st.error(f"Error processing PDF: {e}. Ensure Poppler is correctly configured.")
            else:
                img = Image.open(uploaded_file)
                doc_images = [img]
                st.image(img, caption="Document Preview", use_container_width=True)
            st.markdown('</div>', unsafe_allow_html=True)
        else:
            st.markdown('<div class="glass-card" style="text-align: center; color: #666;">Upload a file to begin</div>', unsafe_allow_html=True)

    with col2:
        st.markdown('<p class="section-label">Context & Parameters</p>', unsafe_allow_html=True)
        
        with st.form("extraction_config"):
            d_col1, d_col2 = st.columns(2)
            with d_col1:
                doc_name = st.text_input("Document Name", value="unnamed_doc")
            with d_col2:
                doc_type = st.selectbox("Document Type", ["Invoice", "ID Card", "Marksheet", "Certificate", "Custom"])
            
            doc_lang = st.multiselect("Languages", ["English", "Hindi", "Marathi"], default=["English"])
            doc_context = st.text_area("Extraction Goal / Context", placeholder="e.g. Extract name, total amount, and date from this invoice.")
            fields_to_extract = st.text_area("Fields to Extract (comma separated)", placeholder="Name, Date, Total, ID_Number")
            
            submit = st.form_submit_button("Initiate Precision Extraction")

    if submit and doc_images:
        with st.status("Drishtii is processing your document...", expanded=True) as status:
            full_raw_text = ""
            for i, img in enumerate(doc_images):
                st.write(f"🔍 Analyzing page {i+1}...")
                page_text = extract_text_from_image(img)
                full_raw_text += page_text + "\n"
            
            st.write(" Parsing with AI Context...")
            extracted_json = parse_document(full_raw_text, doc_context, fields_to_extract)
            
            status.update(label="Extraction Complete!", state="complete", expanded=False)

        st.markdown("---")
        st.markdown('<p class="section-label">Extracted Data Output</p>', unsafe_allow_html=True)
        
        res_col1, res_col2 = st.columns([2, 1])
        
        with res_col1:
            st.markdown('<div class="glass-card">', unsafe_allow_html=True)
            st.subheader("Structured Results")
            st.json(extracted_json)
            st.markdown('</div>', unsafe_allow_html=True)
            
            # Export options
            if isinstance(extracted_json, dict) and "error" not in extracted_json:
                flat_data = {k: str(v) for k, v in extracted_json.items()}
                df = pd.DataFrame([flat_data])
                
                st.markdown(get_download_link(df, f"extracted_{doc_name}", " Download as Excel"), unsafe_allow_html=True)

        with res_col2:
            st.markdown('<div class="glass-card">', unsafe_allow_html=True)
            st.subheader("Raw Context")
            st.write(f"**Doc Type:** {doc_type}")
            st.write(f"**Langs:** {', '.join(doc_lang)}")
            with st.expander("View Raw OCR Text"):
                st.text(full_raw_text)
            st.markdown('</div>', unsafe_allow_html=True)

if __name__ == "__main__":
    main()
