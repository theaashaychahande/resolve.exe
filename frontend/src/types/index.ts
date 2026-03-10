import type { LucideIcon } from 'lucide-react';

/** Sidebar / navigation item */
export interface NavItem {
  to: string;
  icon: LucideIcon;
  label: string;
  end?: boolean;
}

/** Extracted document record */
export interface DocumentRecord {
  id: number;
  docName: string;
  name: string;
  date: string;
  idNumber: string;
  status: 'Completed' | 'Processing' | 'Failed';
}

/** Export history entry */
export interface ExportRecord {
  id: number;
  name: string;
  format: 'CSV' | 'JSON';
  date: string;
  size: string;
  records: number;
}

/** Recent document entry (dashboard) */
export interface RecentDocument {
  name: string;
  type: string;
  status: string;
  time: string;
}

/** Stats card data */
export interface StatItem {
  label: string;
  value: string;
  change: string;
  up: boolean;
  icon: LucideIcon;
  color: string;
}

/** Document context form data */
export interface DocumentContext {
  docName: string;
  docType: string;
  languages: string[];
  writingStyle: 'Printed' | 'Handwritten' | 'Mixed';
  description?: string;
  targetFields: string[];
}

/** Upload session with context and files */
export interface UploadSession {
  id: string;
  context: DocumentContext | null;
  files: UploadedFile[];
  createdAt: Date;
}

/** Individual uploaded file with extraction data */
export interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  status: 'ready' | 'processing' | 'done' | 'failed';
  extractedData?: ExtractedData;
  errorMessage?: string;
}

/** Extracted data from a document */
export interface ExtractedData {
  docName: string;
  name: string;
  date: string;
  idNumber: string;
  fields: Record<string, string>;
}
