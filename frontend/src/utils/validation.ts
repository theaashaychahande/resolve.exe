import type { DocumentContext } from '@/types';

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Validate document context form
 */
export function validateDocumentContext(context: Partial<DocumentContext>): ValidationError[] {
  const errors: ValidationError[] = [];

  // Document name validation
  if (!context.docName?.trim()) {
    errors.push({ field: 'docName', message: 'Document name is required' });
  } else if (context.docName.trim().length < 2) {
    errors.push({ field: 'docName', message: 'Document name must be at least 2 characters' });
  } else if (context.docName.trim().length > 50) {
    errors.push({ field: 'docName', message: 'Document name must not exceed 50 characters' });
  }

  // Document type validation
  if (!context.docType) {
    errors.push({ field: 'docType', message: 'Document type is required' });
  }

  // Languages validation
  if (!context.languages || context.languages.length === 0) {
    errors.push({ field: 'languages', message: 'Select at least one language' });
  }

  // Writing style validation
  if (!context.writingStyle) {
    errors.push({ field: 'writingStyle', message: 'Writing style is required' });
  }

  // Description validation
  if (!context.description?.trim()) {
    errors.push({ field: 'description', message: 'Document description is required' });
  } else if (context.description.trim().length < 10) {
    errors.push({ field: 'description', message: 'Description must be at least 10 characters' });
  } else if (context.description.trim().length > 500) {
    errors.push({ field: 'description', message: 'Description must not exceed 500 characters' });
  }

  // Target fields validation
  if (!context.targetFields || context.targetFields.length === 0) {
    errors.push({ field: 'targetFields', message: 'Add at least one target field to extract' });
  }

  return errors;
}

/**
 * Validate file before upload
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];

  if (file.size > maxSize) {
    return { valid: false, error: `File size exceeds 10MB limit. Current: ${(file.size / (1024 * 1024)).toFixed(2)}MB` };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'File type not supported. Use JPG, PNG, WEBP, or PDF' };
  }

  return { valid: true };
}

/**
 * Validate multiple files
 */
export function validateFiles(files: File[]): { valid: boolean; errors: Map<string, string> } {
  const errors = new Map<string, string>();

  files.forEach((file) => {
    const validation = validateFile(file);
    if (!validation.valid && validation.error) {
      errors.set(file.name, validation.error);
    }
  });

  return { valid: errors.size === 0, errors };
}

/**
 * Parse target fields from comma-separated string
 */
export function parseTargetFields(input: string): string[] {
  return input
    .split(',')
    .map((field) => field.trim())
    .filter((field) => field.length > 0);
}

/**
 * Validate parsed target fields
 */
export function validateTargetFields(fields: string[]): { valid: boolean; error?: string } {
  if (fields.length === 0) {
    return { valid: false, error: 'At least one target field is required' };
  }

  if (fields.length > 20) {
    return { valid: false, error: 'Maximum 20 target fields allowed' };
  }

  const invalidField = fields.find((f) => f.length > 50);
  if (invalidField) {
    return { valid: false, error: `Field name too long: "${invalidField}" (max 50 characters)` };
  }

  return { valid: true };
}
