import { useRef } from 'react';
import {
  FileImage,
  FileText,
  Camera,
  X,
  CheckCircle2,
  Loader2,
  CloudUpload,
} from 'lucide-react';
import DocumentContextForm from '@/components/DocumentContextForm';
import { useUpload } from '@/context/UploadContext';
import { validateFiles } from '@/utils/validation';
import type { DocumentContext } from '@/types';

export default function UploadPage() {
  const { session, createSession, addFiles, removeFile, clearFiles, processFiles } = useUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (context: DocumentContext) => {
    createSession(context);
  };

  const handleAddFiles = (newFiles: FileList | null) => {
    if (!newFiles || !session) return;

    const filesArray = Array.from(newFiles);
    const validation = validateFiles(filesArray);

    if (!validation.valid) {
      const errorMessages = Array.from(validation.errors.values());
      alert(`File validation errors:\n${errorMessages.join('\n')}`);
      return;
    }

    addFiles(filesArray);
  };

  const triggerFileInput = (accept: string, capture?: boolean) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = accept;
      if (capture) {
        fileInputRef.current.capture = 'environment';
      } else {
        fileInputRef.current.removeAttribute('capture');
      }
      fileInputRef.current.click();
    }
  };

  // Show form if no session
  if (!session) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-dark">Upload Documents</h1>
          <p className="text-sm text-gray mt-1">
            First, tell us about your document. This helps our AI extract the right information with high accuracy.
          </p>
        </div>

        <DocumentContextForm onSubmit={handleFormSubmit} />
      </div>
    );
  }

  // Show upload UI if session exists
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark">Upload Document</h1>
        <p className="text-sm text-gray mt-1">
          Upload documents to extract data using AI processing.
        </p>

        {/* Document context summary */}
        <div className="mt-4 bg-primary-soft border border-primary-dark/20 rounded-lg p-4 text-sm">
          <p className="font-medium text-dark mb-2">📋 Document Context:</p>
          <div className="grid sm:grid-cols-2 gap-2 text-gray text-xs">
            <p>
              <span className="font-medium">Type:</span> {session.context?.docType}
            </p>
            <p>
              <span className="font-medium">Languages:</span> {session.context?.languages.join(', ')}
            </p>
            <p>
              <span className="font-medium">Style:</span> {session.context?.writingStyle}
            </p>
            <p>
              <span className="font-medium">Fields:</span> {session.context?.targetFields.length} target fields
            </p>
          </div>
          <button
            onClick={() => {
              clearFiles();
              removeFile('all');
            }}
            className="text-xs text-primary-dark hover:text-primary-deep mt-3 font-medium"
          >
            ← Change document context
          </button>
        </div>
      </div>

      {/* Upload Methods */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          {
            icon: FileImage,
            label: 'Upload Image',
            desc: 'JPG, PNG, WEBP',
            accept: 'image/*',
          },
          { icon: FileText, label: 'Upload PDF', desc: 'PDF documents', accept: '.pdf' },
          {
            icon: Camera,
            label: 'Camera Capture',
            desc: 'Use your camera',
            accept: 'image/*',
            capture: true,
          },
        ].map((m, i) => (
          <button
            key={i}
            onClick={() =>
              triggerFileInput(m.accept, m.capture)
            }
            className="flex items-center gap-4 bg-white border border-border rounded-xl p-5 hover:border-primary-dark/30 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary-deep/10 text-primary-dark flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary-deep group-hover:to-primary-dark group-hover:text-white transition-all">
              <m.icon className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-dark text-sm">{m.label}</p>
              <p className="text-xs text-gray">{m.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => handleAddFiles(e.target.files)}
      />

      {/* Drag & Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragLeave={() => {}}
        onDrop={(e) => {
          e.preventDefault();
          handleAddFiles(e.dataTransfer.files);
        }}
        onClick={() => {
          triggerFileInput('image/*,.pdf');
        }}
        className="border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer hover:border-primary-dark/40 hover:bg-primary-soft/50 transition-all"
      >
        <CloudUpload className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p className="text-lg font-semibold text-dark mb-1">Drag & drop files here</p>
        <p className="text-sm text-gray">or click to browse files from your device</p>
        <p className="text-xs text-gray mt-2">Supports JPG, PNG, PDF up to 10MB</p>
      </div>

      {/* File Previews */}
      {session.files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-dark">Uploaded Files ({session.files.length})</h3>
            <div className="flex gap-2">
              <button
                onClick={() => clearFiles()}
                className="text-sm text-gray hover:text-red-500 transition"
              >
                Clear All
              </button>
              <button
                onClick={() => processFiles()}
                disabled={!session.files.some((f) => f.status === 'ready')}
                className="bg-primary hover:bg-[#1ea34e] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-5 py-2 rounded-lg transition-all shadow-sm shadow-primary/20"
              >
                Process Documents
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {session.files.map((f) => (
              <div
                key={f.id}
                className="bg-white border border-border rounded-xl p-4 relative group"
              >
                {f.status === 'ready' && (
                  <button
                    onClick={() => removeFile(f.id)}
                    className="absolute top-2 right-2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray hover:bg-red-100 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}

                {f.preview ? (
                  <img
                    src={f.preview}
                    alt=""
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                ) : (
                  <div className="w-full h-32 bg-primary-soft rounded-lg flex items-center justify-center mb-3">
                    <FileText className="w-10 h-10 text-gray-300" />
                  </div>
                )}

                <p className="text-sm font-medium text-dark truncate">{f.file.name}</p>
                <p className="text-xs text-gray">
                  {(f.file.size / 1024).toFixed(1)} KB
                </p>

                <div className="mt-3 flex items-center gap-2">
                  {f.status === 'ready' && (
                    <span className="text-xs text-gray bg-primary-soft px-2 py-1 rounded-full">
                      Ready
                    </span>
                  )}
                  {f.status === 'processing' && (
                    <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full flex items-center gap-1">
                      <Loader2 className="w-3 h-3 animate-spin" /> Processing
                    </span>
                  )}
                  {f.status === 'done' && (
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Extracted
                    </span>
                  )}
                  {f.status === 'failed' && (
                    <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
                      Failed
                    </span>
                  )}
                </div>

                {f.errorMessage && (
                  <p className="text-xs text-red-500 mt-2 flex items-start gap-1">
                    <span className="flex-shrink-0 mt-0.5">⚠️</span>
                    {f.errorMessage}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
