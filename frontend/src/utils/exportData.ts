import type { ExtractedData } from '@/types';

/**
 * Convert extracted data to CSV format
 */
export function generateCSV(data: ExtractedData[]): string {
  if (data.length === 0) {
    return '';
  }

  // Get all unique field keys
  const allFields = new Set<string>();
  data.forEach((doc) => {
    Object.keys(doc.fields || {}).forEach((field) => allFields.add(field));
  });

  // Create header row
  const headers = ['docName', 'name', 'date', 'idNumber', ...Array.from(allFields).sort()];
  const headerRow = headers.map(escapeCSVField).join(',');

  // Create data rows
  const dataRows = data.map((doc) => {
    const row = [
      doc.docName,
      doc.name,
      doc.date,
      doc.idNumber,
      ...Array.from(allFields).map((field) => doc.fields[field] || ''),
    ];
    return row.map(escapeCSVField).join(',');
  });

  return [headerRow, ...dataRows].join('\n');
}

/**
 * Escape CSV field values
 */
function escapeCSVField(field: string): string {
  if (field === null || field === undefined) {
    return '';
  }

  const fieldStr = String(field);

  // Escape quotes and wrap in quotes if contains comma, newline, or quote
  if (fieldStr.includes(',') || fieldStr.includes('\n') || fieldStr.includes('"')) {
    return `"${fieldStr.replace(/"/g, '""')}"`;
  }

  return fieldStr;
}

/**
 * Convert extracted data to JSON format
 */
export function generateJSON(data: ExtractedData[]): string {
  return JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      totalRecords: data.length,
      data,
    },
    null,
    2
  );
}

/**
 * Download data as CSV file
 */
export function downloadCSV(data: ExtractedData[], filename: string = 'extracted_data.csv'): void {
  const csv = generateCSV(data);
  downloadFile(csv, filename, 'text/csv');
}

/**
 * Download data as JSON file
 */
export function downloadJSON(
  data: ExtractedData[],
  filename: string = 'extracted_data.json'
): void {
  const json = generateJSON(data);
  downloadFile(json, filename, 'application/json');
}

/**
 * Generic file download utility
 */
function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Get formatted file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Estimate export file size
 */
export function estimateExportSize(data: ExtractedData[], format: 'CSV' | 'JSON'): string {
  if (data.length === 0) return '0 B';

  let estimatedBytes = 0;

  if (format === 'CSV') {
    data.forEach((doc) => {
      estimatedBytes += doc.docName.length + doc.name.length + doc.date.length + doc.idNumber.length;
      Object.values(doc.fields || {}).forEach((val) => {
        estimatedBytes += String(val).length;
      });
      estimatedBytes += 50; // Account for commas and newlines
    });
  } else {
    // JSON estimate
    estimatedBytes = JSON.stringify({
      exportedAt: new Date().toISOString(),
      totalRecords: data.length,
      data,
    }).length;
  }

  return formatFileSize(estimatedBytes);
}

/**
 * Create export history entry
 */
export interface ExportEntry {
  id: string;
  filename: string;
  format: 'CSV' | 'JSON';
  recordCount: number;
  size: string;
  exportedAt: Date;
}

/**
 * Generate export entry
 */
export function createExportEntry(
  data: ExtractedData[],
  format: 'CSV' | 'JSON'
): ExportEntry {
  const timestamp = new Date().toISOString().split('T')[0];
  const filename =
    format === 'CSV'
      ? `extracted_data_${timestamp}.csv`
      : `extracted_data_${timestamp}.json`;

  return {
    id: `export_${Date.now()}`,
    filename,
    format,
    recordCount: data.length,
    size: estimateExportSize(data, format),
    exportedAt: new Date(),
  };
}
