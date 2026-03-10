# Drishtii - Project Context & Technical Brief

## Overview
Drishtii is an AI-powered data extraction system designed to bridge the gap between physical documents and digital, actionable data. Unlike standard OCR tools that return a messy block of text, Drishtii uses granular user context to pull specific, structured information from printed or handwritten documents, particularly those in regional Indian languages (Hindi and Marathi).

## The Problem
Physical documents—invoices, certificates, and forms—often contain "dead data" that is hard to utilize without manual entry. Manual extraction is slow and prone to errors. Furthermore, general AI models often struggle with regional languages or specific handwritten formats without proper context.

## Core Solution
The system allows users to provide a "Document Detail Form" before processing. This context—document type, language, description, and target fields—is fed into the extraction engine to ensure the AI knows exactly what it is looking for and which OCR models to prioritize.

## System Architecture & Workflow
1. **Intake**: Accept PDF and JPEG files.
2. **Preprocessing**: OpenCV handles image normalization and noise reduction.
3. **Extraction**:
    - EasyOCR converts image/PDF content to raw text (supporting Hindi/Marathi natively).
    - AI Engine (using the provided form context) parses the raw text into structured JSON.
4. **Storage**: Firebase stores the extracted data and user sessions.
5. **Output**:
    - Export options: CSV, Excel, and PDF.
    - **Visualization**: A built-in dashboard that plots the extracted data using Python libraries for immediate analysis.

## User Input Parameters (Context)
To achieve high accuracy, the user provides:
- **Document Type**: Passport, Invoice, Marksheet, or a "Custom" type.
- **Language**: English, Hindi, Marathi, or Mixed.
- **Writing Style**: Printed, Handwritten, or Mixed.
- **Goal**: A brief description of what the user needs to extract.

## Key Features (MVP)
- Support for PDF/JPEG formats.
- Context-aware AI parsing.
- Regional language support (Hindi, Marathi).
- Export to Excel/CSV.
- Basic visual plotting on the dashboard.
- Firebase integration for persistence.

## Team: Resolve.exe
- **Goal**: Competing in HackOn 2.0.
- **Members**: Aashay Chahande & Priyanka Dhamande.
- **Domain**: AI/ML + Automation.
