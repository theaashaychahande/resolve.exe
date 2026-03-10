/**
 * Drishtii API client
 * Calls the FastAPI backend for document extraction.
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface ExtractionContext {
    docName?: string;
    docType?: string;
    languages?: string[];
    description?: string;
    targetFields?: string[];
}

export interface FileExtractionResult {
    filename: string;
    raw_text?: string;
    fields?: Record<string, string | null>;
    error?: string;
}

export interface ExtractionResponse {
    results: FileExtractionResult[];
    excelUrl?: string;
}

/**
 * Upload files + context to the backend and get extracted fields back.
 */
export async function extractDocuments(
    files: File[],
    context: ExtractionContext
): Promise<ExtractionResponse> {
    const formData = new FormData();

    for (const file of files) {
        formData.append('files', file);
    }

    formData.append('context', JSON.stringify(context));

    const response = await fetch(`${API_BASE_URL}/extract`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error ${response.status}: ${errorText}`);
    }

    return response.json() as Promise<ExtractionResponse>;
}

/**
 * Health check — returns true if the backend is reachable.
 */
export async function checkBackendHealth(): Promise<boolean> {
    try {
        const res = await fetch(`${API_BASE_URL}/health`, { method: 'GET' });
        return res.ok;
    } catch {
        return false;
    }
}
