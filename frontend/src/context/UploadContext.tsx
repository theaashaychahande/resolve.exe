import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { DocumentContext, UploadSession, UploadedFile, ExtractedData } from '@/types';

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
        files: prev.files.map((f) => (f.status === 'ready' ? { ...f, status: 'processing' as const } : f)),
      };
    });

    // Simulate processing
    setTimeout(() => {
      setSession((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          files: prev.files.map((f) => (f.status === 'processing' ? { ...f, status: 'done' as const } : f)),
        };
      });
    }, 2500);
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
