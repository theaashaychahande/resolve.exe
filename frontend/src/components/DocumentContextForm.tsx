import { useState, useRef } from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';
import Card from '@/components/ui/Card';
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
    docType: 'Custom' as const,
    languages: [] as string[],
    writingStyle: 'Printed' as const,
    description: '',
    targetFields: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    details: true,
    fields: true,
  });

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

  const docTypes = ['Passport', 'Invoice', 'Marksheet', 'Custom'] as const;
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
    console.log('Form submitted with docType:', formData.docType);
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
      docType: formData.docType,
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

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-4"
      aria-label="Document context configuration form"
      noValidate
    >
      {/* Form Instructions for Screen Readers */}
      <div className="sr-only" role="region" aria-label="Form instructions">
        <p>
          This form configures the document metadata before uploading. All fields marked with * are required. Use Ctrl+Enter to submit the form.
        </p>
      </div>

      {/* Basic Information */}
      <Card className="overflow-hidden">
        <button
          type="button"
          onClick={() => {
            toggleSection('basic');
            announceToScreenReader(
              `${expandedSections.basic ? 'Collapsed' : 'Expanded'} Basic Information section`,
              'polite'
            );
          }}
          className="w-full flex items-center justify-between p-5 hover:bg-primary-soft/50 transition"
          aria-expanded={expandedSections.basic}
          aria-controls="basic-section"
        >
          <h3 className="text-sm font-semibold text-dark">Basic Information</h3>
          <ChevronDown
            className={`w-4 h-4 text-gray transition-transform ${expandedSections.basic ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>

        {expandedSections.basic && (
          <div id="basic-section" className="border-t border-border px-5 py-4 space-y-4">
            {/* Document Name */}
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">
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
                className={`w-full px-4 py-2.5 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 transition ${
                  errors.docName
                    ? 'border-red-300 focus:ring-red-200'
                    : 'border-border focus:ring-primary-dark/20 focus:border-primary-dark'
                }`}
                aria-invalid={!!errors.docName}
                aria-describedby={errors.docName ? 'docName-error' : 'docName-hint'}
              />
              {errors.docName ? (
                <p id="docName-error" className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" aria-hidden="true" /> {errors.docName}
                </p>
              ) : (
                <p id="docName-hint" className="text-xs text-gray mt-1">
                  2-50 characters, describe what this document is
                </p>
              )}
            </div>

            {/* Document Type */}
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">
                Document Type <span className="text-red-500" aria-label="required">*</span>
              </label>
              <div className="grid sm:grid-cols-2 gap-2" role="group">
                <p className="text-xs text-gray mb-2">Current selection: {formData.docType}</p>
                {docTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Document type clicked:', type);
                      setFormData((prev) => {
                        console.log('Setting docType from', prev.docType, 'to', type);
                        return { ...prev, docType: type };
                      });
                      announceToScreenReader(`Document type set to ${type}`, 'polite');
                    }}
                    aria-pressed={formData.docType === type}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-dark/20 ${
                      formData.docType === type
                        ? 'bg-primary-dark text-white border-primary-dark shadow-sm'
                        : 'bg-white border-border hover:border-primary-dark/30 hover:bg-primary-soft/20'
                    }`}
                    disabled={isLoading}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {errors.docType && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" aria-hidden="true" /> {errors.docType}
                </p>
              )}
            </div>
          </div>
        )}
      </Card>

      {/* Document Details */}
      <Card className="overflow-hidden">
        <button
          type="button"
          onClick={() => {
            toggleSection('details');
            announceToScreenReader(
              `${expandedSections.details ? 'Collapsed' : 'Expanded'} Document Details section`,
              'polite'
            );
          }}
          className="w-full flex items-center justify-between p-5 hover:bg-primary-soft/50 transition"
          aria-expanded={expandedSections.details}
          aria-controls="details-section"
        >
          <h3 className="text-sm font-semibold text-dark">Document Details</h3>
          <ChevronDown
            className={`w-4 h-4 text-gray transition-transform ${expandedSections.details ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>

        {expandedSections.details && (
          <div id="details-section" className="border-t border-border px-5 py-4 space-y-4">
            {/* Languages */}
            <div>
              <label className="block text-sm font-medium text-dark mb-2">
                Languages <span className="text-red-500" aria-label="required">*</span>
              </label>
              <div className="flex flex-wrap gap-2" role="group">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => {
                      toggleLanguage(lang);
                      announceToScreenReader(
                        `${formData.languages.includes(lang) ? 'Removed' : 'Added'} ${lang}`,
                        'polite'
                      );
                    }}
                    aria-pressed={formData.languages.includes(lang)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                      formData.languages.includes(lang)
                        ? 'bg-primary-dark text-white border-primary-dark'
                        : 'bg-white border-border hover:border-primary-dark/30'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              {errors.languages && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" aria-hidden="true" /> {errors.languages}
                </p>
              )}
            </div>

            {/* Writing Style */}
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">
                Writing Style <span className="text-red-500" aria-label="required">*</span>
              </label>
              <div className="grid sm:grid-cols-3 gap-2" role="group">
                {writingStyles.map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, writingStyle: style }));
                      announceToScreenReader(`Writing style set to ${style}`, 'polite');
                    }}
                    aria-pressed={formData.writingStyle === style}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition ${
                      formData.writingStyle === style
                        ? 'bg-primary-dark text-white border-primary-dark'
                        : 'bg-white border-border hover:border-primary-dark/30'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
              {errors.writingStyle && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" aria-hidden="true" /> {errors.writingStyle}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">
                Document Description <span className="text-red-500" aria-label="required">*</span>
                <span className="text-xs text-gray ml-1" aria-live="polite">
                  ({formData.description.length}/500)
                </span>
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => {
                  if (e.target.value.length <= 500) {
                    setFormData((prev) => ({ ...prev, description: e.target.value }));
                    errors.description && setErrors((prev) => ({ ...prev, description: '' }));
                  }
                }}
                placeholder="Describe what this document is and what context the AI should know..."
                rows={3}
                className={`w-full px-4 py-2.5 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 transition resize-none ${
                  errors.description
                    ? 'border-red-300 focus:ring-red-200'
                    : 'border-border focus:ring-primary-dark/20 focus:border-primary-dark'
                }`}
                aria-invalid={!!errors.description}
                aria-describedby={errors.description ? 'description-error' : 'description-hint'}
              />
              {errors.description ? (
                <p id="description-error" className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" aria-hidden="true" /> {errors.description}
                </p>
              ) : (
                <p id="description-hint" className="text-xs text-gray mt-1">
                  10-500 characters, helps AI understand context
                </p>
              )}
            </div>
          </div>
        )}
      </Card>

      {/* Target Fields */}
      <Card className="overflow-hidden">
        <button
          type="button"
          onClick={() => {
            toggleSection('fields');
            announceToScreenReader(
              `${expandedSections.fields ? 'Collapsed' : 'Expanded'} Target Fields to Extract section`,
              'polite'
            );
          }}
          className="w-full flex items-center justify-between p-5 hover:bg-primary-soft/50 transition"
          aria-expanded={expandedSections.fields}
          aria-controls="fields-section"
        >
          <h3 className="text-sm font-semibold text-dark">Target Fields to Extract</h3>
          <ChevronDown
            className={`w-4 h-4 text-gray transition-transform ${expandedSections.fields ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>

        {expandedSections.fields && (
          <div id="fields-section" className="border-t border-border px-5 py-4 space-y-3">
            <label className="block text-sm font-medium text-dark">
              Field Names <span className="text-red-500" aria-label="required">*</span>
              <span className="text-xs text-gray ml-1">(comma-separated, max 20 fields)</span>
            </label>
            <textarea
              id="targetFields"
              value={formData.targetFields}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, targetFields: e.target.value }));
                errors.targetFields && setErrors((prev) => ({ ...prev, targetFields: '' }));
              }}
              placeholder="e.g., Full_Name, Date_of_Birth, ID_Number, Address, Phone_Number"
              rows={3}
              className={`w-full px-4 py-2.5 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 transition resize-none font-mono text-xs ${
                errors.targetFields
                  ? 'border-red-300 focus:ring-red-200'
                  : 'border-border focus:ring-primary-dark/20 focus:border-primary-dark'
              }`}
              aria-invalid={!!errors.targetFields}
              aria-describedby={errors.targetFields ? 'targetFields-error' : 'targetFields-count'}
            />
            <div id="targetFields-count" className="text-xs text-gray" aria-live="polite">
              Fields: <span className="font-medium">{parseTargetFields(formData.targetFields).length}</span> / 20
            </div>
            {errors.targetFields && (
              <p id="targetFields-error" className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" aria-hidden="true" /> {errors.targetFields}
              </p>
            )}
          </div>
        )}
      </Card>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary-dark hover:bg-primary-deep disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold py-3 rounded-lg transition-all shadow-sm shadow-primary-dark/20"
        aria-busy={isLoading}
      >
        {isLoading ? 'Setting up...' : 'Setup & Continue to Upload'}
      </button>

      <div className="text-xs text-gray text-center mt-2">
        Tip: Use <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-dark">Ctrl+Enter</kbd> to submit
      </div>
    </form>
  );
}
