import { useState, useRef } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import type { DocumentContext } from '@/types';
import { validateDocumentContext, parseTargetFields, validateTargetFields } from '@/utils/validation';
import { useKeyboardShortcuts, useFocusManagement, announceToScreenReader } from '@/hooks/useKeyboardShortcuts';

interface DocumentContextFormProps {
  onSubmit: (context: DocumentContext) => void;
  isLoading?: boolean;
}

export default function DocumentContextForm({ onSubmit, isLoading = false }: DocumentContextFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { focusFirstError } = useFocusManagement();

  const [formData, setFormData] = useState({
    docName: '',
    docType: '',
    languages: [] as string[],
    writingStyle: 'Printed' as typeof writingStyles[number],
    description: '',
    targetFields: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const languages = ['English', 'Hindi', 'Marathi'];
  const writingStyles = ['Printed', 'Handwritten', 'Mixed'] as const;

  const toggleLanguage = (lang: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter((l) => l !== lang)
        : [...prev.languages, lang],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Parse and validate target fields
    const parsedFields = parseTargetFields(formData.targetFields);
    const fieldsValidation = validateTargetFields(parsedFields);

    if (!fieldsValidation.valid) {
      const fieldErrors = { targetFields: fieldsValidation.error || 'Invalid target fields' };
      setErrors(fieldErrors);
      announceToScreenReader('Form validation failed. Please review the errors below.', 'assertive');
      focusFirstError(fieldErrors);
      return;
    }

    // Validate entire form
    const contextData: DocumentContext = {
      docName: formData.docName.trim(),
      docType: formData.docType as any,
      languages: formData.languages,
      writingStyle: formData.writingStyle,
      description: formData.description.trim(),
      targetFields: parsedFields,
    };

    const validationErrors = validateDocumentContext(contextData);
    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach((err) => {
        errorMap[err.field] = err.message;
      });
      setErrors(errorMap);
      announceToScreenReader(
        `Form validation failed with ${validationErrors.length} error(s). Please review the form.`,
        'assertive'
      );
      focusFirstError(errorMap);
      return;
    }

    announceToScreenReader('Document context configured successfully. Proceeding to upload.', 'polite');
    onSubmit(contextData);
  };

  // Keyboard shortcut for submit (Ctrl+Enter or Cmd+Enter)
  useKeyboardShortcuts([
    {
      key: 'Enter',
      modifiers: ['ctrl'],
      handler: () => {
        formRef.current?.querySelector('button[type="submit"]')?.dispatchEvent(
          new Event('click', { bubbles: true })
        );
      },
      description: 'Submit form',
    },
  ]);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6"
      aria-label="Document context configuration form"
      noValidate
    >
      {/* Form Instructions */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200" role="region" aria-label="Form instructions">
        <h2 className="text-xl font-bold mb-2 text-gray-900 flex items-center gap-2">
          Document Instructions
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed font-medium">
          Please provide the basic details for your document extraction. This metadata helps our AI identify 
          and extract fields with maximum precision.
        </p>
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
        <div className="p-6 space-y-5">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Basic Information
          </h3>

          <div className="grid sm:grid-cols-2 gap-6 mt-4">
            {/* Document Name */}
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-gray-700">
                Document Name <span className="text-red-500" aria-label="required">*</span>
              </label>
              <input
                id="docName"
                type="text"
                value={formData.docName}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, docName: e.target.value }));
                  errors.docName && setErrors((prev) => ({ ...prev, docName: '' }));
                }}
                placeholder="e.g., Passport_2024, Invoice_A1"
                className={`w-full px-4 py-3 bg-white border rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2D5444]/20 transition ${
                  errors.docName
                    ? 'border-red-400 focus:ring-red-400/20'
                    : 'border-gray-200 focus:border-[#2D5444]'
                }`}
                aria-invalid={!!errors.docName}
                aria-describedby={errors.docName ? 'docName-error' : undefined}
              />
              {errors.docName && (
                <p id="docName-error" className="text-xs text-red-500 mt-1 flex items-center gap-1 font-bold">
                  <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" /> {errors.docName}
                </p>
              )}
            </div>

            {/* Document Type (Text Box) */}
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-gray-700">
                Document Type <span className="text-red-500" aria-label="required">*</span>
              </label>
              <input
                id="docType"
                type="text"
                value={formData.docType}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, docType: e.target.value as any }));
                  errors.docType && setErrors((prev) => ({ ...prev, docType: '' }));
                }}
                placeholder="e.g., Invoice, ID Card"
                className={`w-full px-4 py-3 bg-white border rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2D5444]/20 transition ${
                  errors.docType
                    ? 'border-red-400 focus:ring-red-400/20'
                    : 'border-gray-200 focus:border-[#2D5444]'
                }`}
                aria-invalid={!!errors.docType}
                aria-describedby={errors.docType ? 'docType-error' : undefined}
              />
              {errors.docType && (
                <p id="docType-error" className="text-xs text-red-500 mt-1 flex items-center gap-1 font-bold">
                  <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" /> {errors.docType}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Document Details */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
        <div className="p-6 space-y-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Document Details
          </h3>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Languages */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700">
                Languages <span className="text-red-500" aria-label="required">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2.5" role="group">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => toggleLanguage(lang)}
                    aria-pressed={formData.languages.includes(lang)}
                    className={`flex-1 px-5 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                      formData.languages.includes(lang)
                        ? 'bg-[#2D5444] text-white border-[#2D5444] shadow-md'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-[#2D5444]/50'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              {errors.languages && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-bold">
                  <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" /> {errors.languages}
                </p>
              )}
            </div>

            {/* Writing Style */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700">
                Writing Style <span className="text-red-500" aria-label="required">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2.5" role="group">
                {writingStyles.map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, writingStyle: style }))}
                    aria-pressed={formData.writingStyle === style}
                    className={`flex-1 px-5 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                      formData.writingStyle === style
                        ? 'bg-[#2D5444] text-white border-[#2D5444] shadow-md'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-[#2D5444]/50'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
              {errors.writingStyle && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1 font-bold">
                  <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" /> {errors.writingStyle}
                </p>
              )}
            </div>
          </div>

          {/* Document Description */}
          <div className="space-y-1.5 pt-2">
            <label className="block text-sm font-bold text-gray-700">
              Document Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="e.g., This is a monthly utility bill for June 2024"
              rows={3}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2D5444]/20 focus:border-[#2D5444] transition resize-none"
            />
          </div>
        </div>
      </div>

      {/* Target Fields */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
        <div className="p-6 space-y-4">
          <label className="block text-sm font-bold text-gray-700">
            Field Names <span className="text-red-500" aria-label="required">*</span>
            <span className="text-xs text-gray-400 ml-2 font-medium">(comma-separated, max 20 fields)</span>
          </label>
          <textarea
            id="targetFields"
            value={formData.targetFields}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, targetFields: e.target.value }));
              errors.targetFields && setErrors((prev) => ({ ...prev, targetFields: '' }));
            }}
            placeholder="e.g., Name, Date, Amount, Invoice_ID"
            rows={3}
            className={`w-full px-4 py-4 bg-white border rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2D5444]/20 transition resize-none ${
              errors.targetFields
                ? 'border-red-400 focus:ring-red-400/20'
                : 'border-gray-200 focus:border-[#2D5444]'
            }`}
            aria-invalid={!!errors.targetFields}
            aria-describedby={errors.targetFields ? 'targetFields-error' : 'targetFields-count'}
          />
          <div className="flex items-center justify-between">
            <div id="targetFields-count" className="text-xs text-gray-400 font-bold" aria-live="polite">
              Fields Count: <span className="text-gray-900">{parseTargetFields(formData.targetFields).length}</span> / 20
            </div>
            {errors.targetFields && (
              <p id="targetFields-error" className="text-xs text-red-500 flex items-center gap-1 font-bold">
                <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" /> {errors.targetFields}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#2D5444] hover:bg-[#1b3a2f] disabled:opacity-50 disabled:cursor-not-allowed text-white text-lg font-black py-4 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0"
          aria-busy={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" /> Preparing AI Extraction...
            </span>
          ) : (
            'Setup & Continue to Upload'
          )}
        </button>
        <p className="text-center text-gray-400 text-xs mt-4 font-medium">
          Tip: Use <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-200 rounded text-gray-600">Ctrl + Enter</kbd> to submit
        </p>
      </div>
    </form>
  );
}
