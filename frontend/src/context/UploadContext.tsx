import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { DocumentContext, UploadSession, UploadedFile, ExtractedData } from '@/types';
import { extractDocuments } from '@/utils/api';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface UploadContextType {
  // Session management
  session: UploadSession | null;
  createSession: (context?: DocumentContext) => void;
  clearSession: () => void;

  // File management
  addFiles: (files: File[]) => void;
  removeFile: (fileId: string) => void;
  clearFiles: () => void;

  // File processing
  processFiles: () => void;
  updateFileStatus: (fileId: string, status: UploadedFile['status'], errorMessage?: string) => void;
  setExtractedData: (fileId: string, data: ExtractedData) => void;

  // Extract session data
  allExtractedDocuments: ExtractedData[];
  getSessionFiles: () => UploadedFile[];
  hasSession: boolean;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export function UploadProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<UploadSession | null>(null);

  const createSession = useCallback((context?: DocumentContext) => {
    const newSession: UploadSession = {
      id: `session_${Date.now()}`,
      context: context || null,
      files: [],
      createdAt: new Date(),
    };
    setSession(newSession);
  }, []);

  const clearSession = useCallback(() => {
    setSession(null);
  }, []);

  const addFiles = useCallback(
    (files: File[]) => {
      if (!session) return;

      const newFiles = Array.from(files).map((file) => ({
        id: `file_${Date.now()}_${Math.random()}`,
        file,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : '',
        status: 'ready' as const,
      }));

      setSession((prev) =>
        prev
          ? {
            ...prev,
            files: [...prev.files, ...newFiles],
          }
          : null
      );
    },
    [session]
  );

  const removeFile = useCallback((fileId: string) => {
    setSession((prev) =>
      prev
        ? {
          ...prev,
          files: prev.files.filter((f) => f.id !== fileId),
        }
        : null
    );
  }, []);

  const clearFiles = useCallback(() => {
    setSession((prev) =>
      prev
        ? {
          ...prev,
          files: [],
        }
        : null
    );
  }, []);

  const processFiles = useCallback(() => {
    setSession((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        files: prev.files.map((f) =>
          f.status === 'ready' ? { ...f, status: 'processing' as const } : f
        ),
      };
    });

    // We capture the session snapshot inside a state callback
    setSession((prev) => {
      if (!prev) return null;

      const readyFiles = prev.files.filter((f) => f.status === 'processing');
      const ctx = prev.context;

      // Fire the API call asynchronously
      (async () => {
        try {
          const filesToUpload = readyFiles.map((f) => f.file);
          const context = ctx
            ? {
              docName: ctx.docName,
              docType: ctx.docType,
              languages: ctx.languages,
              description: ctx.description || ctx.docType,
              targetFields: ctx.targetFields,
            }
            : {};

          const response = await extractDocuments(filesToUpload, context);

          // Map results back by filename
          const resultMap = new Map(
            response.results.map((r) => [r.filename, r])
          );

          setSession((s) => {
            if (!s) return null;
            return {
              ...s,
              excelUrl: response.excelUrl,
              files: s.files.map((f) => {
                if (f.status !== 'processing') return f;
                const result = resultMap.get(f.file.name);
                if (!result) return { ...f, status: 'done' as const };
                if (result.error) {
                  return {
                    ...f,
                    status: 'failed' as const,
                    errorMessage: result.error,
                  };
                }
                const extracted: ExtractedData = {
                  docName: ctx?.docName || f.file.name,
                  name: String(result.fields?.['Name'] ?? result.fields?.['name'] ?? ''),
                  date: String(result.fields?.['Date'] ?? result.fields?.['date'] ?? ''),
                  idNumber: String(result.fields?.['ID Number'] ?? result.fields?.['id_number'] ?? ''),
                  fields: Object.fromEntries(
                    Object.entries(result.fields ?? {}).map(([k, v]) => [k, String(v ?? '')])
                  ),
                };
                return {
                  ...f,
                  status: 'done' as const,
                  extractedData: extracted,
                };
              }),
            };
          });

          // Save to Firestore
          try {
            const extractionsRef = collection(db, 'extractions');
            await Promise.all(
              response.results
                .filter(r => !r.error)
                .map(async (result) => {
                  const extracted = {
                    docType: ctx?.docType || 'Unknown',
                    fileName: result.filename,
                    timestamp: serverTimestamp(),
                    fields: result.fields || {},
                    metadata: {
                      languages: ctx?.languages || [],
                      description: ctx?.description || '',
                    }
                  };
                  await addDoc(extractionsRef, extracted);
                })
            );
            console.log('Successfully saved extractions to Firestore');
          } catch (fsErr) {
            console.error('Error saving to Firestore:', fsErr);
          }
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Unknown error';
          setSession((s) => {
            if (!s) return null;
            return {
              ...s,
              files: s.files.map((f) =>
                f.status === 'processing'
                  ? { ...f, status: 'failed' as const, errorMessage: message }
                  : f
              ),
            };
          });
        }
      })();

      return prev; // Return unchanged — the async call will update state
    });
  }, []);

  const updateFileStatus = useCallback(
    (fileId: string, status: UploadedFile['status'], errorMessage?: string) => {
      setSession((prev) =>
        prev
          ? {
            ...prev,
            files: prev.files.map((f) =>
              f.id === fileId
                ? { ...f, status, errorMessage: errorMessage || undefined }
                : f
            ),
          }
          : null
      );
    },
    []
  );

  const setExtractedData = useCallback((fileId: string, data: ExtractedData) => {
    setSession((prev) =>
      prev
        ? {
          ...prev,
          files: prev.files.map((f) =>
            f.id === fileId
              ? { ...f, extractedData: data, status: 'done' as const }
              : f
          ),
        }
        : null
    );
  }, []);

  const allExtractedDocuments = session?.files
    .filter((f) => f.extractedData)
    .map((f) => f.extractedData!)
    ?? [];

  const getSessionFiles = useCallback(() => {
    return session?.files ?? [];
  }, [session]);

  const value: UploadContextType = {
    session,
    createSession,
    clearSession,
    addFiles,
    removeFile,
    clearFiles,
    processFiles,
    updateFileStatus,
    setExtractedData,
    allExtractedDocuments,
    getSessionFiles,
    hasSession: !!session,
  };

  return <UploadContext.Provider value={value}>{children}</UploadContext.Provider>;
}

export function useUpload() {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error('useUpload must be used within UploadProvider');
  }
  return context;
}
