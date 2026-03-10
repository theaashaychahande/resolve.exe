import { useRef } from 'react';
import {
  FileImage,
  FileText,
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

  // Case 1: No files uploaded yet - Show Upload UI
  if (!session || session.files.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-dark">Upload Documents</h1>
          <p className="text-sm text-gray mt-1">
            To get started, please upload the documents you'd like to process.
          </p>
        </div>

        {/* Upload Methods */}
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              icon: FileImage,
              label: 'Upload Image',
              desc: 'JPG, PNG, WEBP',
              accept: 'image/*',
            },
            { icon: FileText, label: 'Upload PDF', desc: 'PDF documents', accept: '.pdf' },
          ].map((m, i) => (
            <button
              key={i}
              onClick={() => {
                if (!session) createSession(undefined);
                triggerFileInput(m.accept);
              }}
              className="flex items-center gap-4 bg-white border border-border rounded-xl p-5 hover:border-primary-dark/30 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-50 text-gray-400 flex items-center justify-center group-hover:bg-[#2D5444] group-hover:text-white transition-all">
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
          onChange={(e) => {
            if (!session) createSession(undefined);
            handleAddFiles(e.target.files);
          }}
        />

        {/* Drag & Drop Zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDragLeave={() => { }}
          onDrop={(e) => {
            e.preventDefault();
            if (!session) createSession(undefined);
            handleAddFiles(e.dataTransfer.files);
          }}
          onClick={() => {
            if (!session) createSession(undefined);
            triggerFileInput('image/*,.pdf');
          }}
          className="border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center cursor-pointer hover:border-[#2D5444]/40 hover:bg-gray-50/50 transition-all"
        >
          <CloudUpload className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-semibold text-dark mb-1">Drag & drop files here</p>
          <p className="text-sm text-gray">or click to browse files from your device</p>
          <p className="text-xs text-gray mt-2">Supports JPG, PNG, PDF up to 10MB</p>
        </div>
      </div>
    );
  }

  // Case 2: Files uploaded but no context (Doc Description) yet
  if (!session.context) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-dark">Document Details</h1>
            <p className="text-sm text-gray mt-1">
              Now, tell us about your {session.files.length > 1 ? 'documents' : 'document'}. This helps our AI extract the right information.
            </p>
          </div>
          <button
            onClick={() => clearFiles()}
            className="text-sm border border-border px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            ← Back to Upload
          </button>
        </div>

        <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-dark mb-4">Files to process:</h3>
          <div className="flex flex-wrap gap-2">
            {session.files.map(f => (
              <div key={f.id} className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700">
                <FileText className="w-3.5 h-3.5" />
                <span className="truncate max-w-[150px]">{f.file.name}</span>
              </div>
            ))}
          </div>
        </div>

        <DocumentContextForm onSubmit={handleFormSubmit} />
      </div>
    );
  }

  // Case 3: Files AND Context exist -> Ready to process
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark">Ready to Process</h1>
          <p className="text-sm text-gray mt-1">
            Everything is set! Review your files and start the extraction.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => clearFiles()}
            className="text-sm border border-border px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Reset
          </button>
            <button
              onClick={() => processFiles()}
              disabled={!session.files.some((f) => f.status === 'ready')}
              className="bg-[#2D5444] hover:bg-[#1b3a2f] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold px-6 py-2 rounded-lg transition-all shadow-lg shadow-[#2D5444]/20"
            >
              Start Processing Documents
            </button>
        </div>
      </div>

      {/* Document context summary */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="font-bold text-gray-900 text-sm flex items-center gap-2">
            Extraction Settings
          </p>
          <button
            onClick={() => {
              // Hacky way to go back to form
              // In a real app we'd have a specific "edit context" state
              createSession(undefined);
            }}
            className="text-xs text-[#2D5444] hover:underline font-bold"
          >
            Edit Settings
          </button>
        </div>
        <div className="grid sm:grid-cols-4 gap-4 text-gray-600 text-xs">
          <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
            <p className="text-gray-400 mb-1 font-medium">Document Type</p>
            <p className="font-bold text-gray-900 truncate">{session.context.docType}</p>
          </div>
          <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
            <p className="text-gray-400 mb-1 font-medium">Languages</p>
            <p className="font-bold text-gray-900">{session.context.languages.join(', ')}</p>
          </div>
          <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
            <p className="text-gray-400 mb-1 font-medium">Target Fields</p>
            <p className="font-bold text-gray-900">{session.context.targetFields.length} Fields</p>
          </div>
          <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">
            <p className="text-gray-400 mb-1 font-medium">Files</p>
            <p className="font-bold text-gray-900">{session.files.length} Documents</p>
          </div>
        </div>
      </div>

      {/* File Previews */}
      <div className="space-y-4">
        <h3 className="font-bold text-gray-900">
          Uploaded Files
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {session.files.map((f) => (
            <div
              key={f.id}
              className="bg-white border border-border rounded-xl p-4 relative group hover:shadow-md transition-all"
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
                <div className="w-full h-32 bg-gray-50 rounded-lg flex items-center justify-center mb-3">
                  <FileText className="w-10 h-10 text-gray-200" />
                </div>
              )}

              <p className="text-sm font-bold text-dark truncate">{f.file.name}</p>
              <p className="text-xs text-gray">
                {(f.file.size / 1024).toFixed(1)} KB
              </p>

              <div className="mt-3 flex items-center gap-2">
                {f.status === 'ready' && (
                  <span className="text-xs text-[#2D5444] bg-gray-50 border border-[#2D5444]/20 px-2.5 py-1 rounded-full font-bold">
                    Ready
                  </span>
                )}
                {f.status === 'processing' && (
                  <span className="text-xs text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full flex items-center gap-1 font-semibold">
                    <Loader2 className="w-3 h-3 animate-spin" /> Processing
                  </span>
                )}
                {f.status === 'done' && (
                  <span className="text-xs text-white bg-[#2D5444] px-2.5 py-1 rounded-full flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Extracted
                  </span>
                )}
                {f.status === 'failed' && (
                  <span className="text-xs text-red-600 bg-red-50 px-2.5 py-1 rounded-full font-semibold">
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
    </div>
  );
}
