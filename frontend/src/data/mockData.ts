import type { DocumentRecord, ExportRecord, RecentDocument } from '@/types';

// ─── Dashboard ──────────────────────────────────────────────

export const dashboardAreaData = [
  { name: 'Mon', docs: 45 },
  { name: 'Tue', docs: 62 },
  { name: 'Wed', docs: 58 },
  { name: 'Thu', docs: 89 },
  { name: 'Fri', docs: 73 },
  { name: 'Sat', docs: 42 },
  { name: 'Sun', docs: 35 },
];

export const dashboardBarData = [
  { name: 'Jan', success: 92, failed: 8 },
  { name: 'Feb', success: 95, failed: 5 },
  { name: 'Mar', success: 88, failed: 12 },
  { name: 'Apr', success: 97, failed: 3 },
  { name: 'May', success: 94, failed: 6 },
  { name: 'Jun', success: 98, failed: 2 },
];

export const recentDocs: RecentDocument[] = [
  { name: 'Aadhaar_Card_001.jpg', type: 'Identity', status: 'Completed', time: '2 min ago' },
  { name: 'Invoice_March_2024.pdf', type: 'Invoice', status: 'Completed', time: '15 min ago' },
  { name: 'Medical_Report.pdf', type: 'Medical', status: 'Processing', time: '32 min ago' },
  { name: 'PAN_Card_Scan.png', type: 'Identity', status: 'Completed', time: '1 hr ago' },
  { name: 'Contract_Draft.pdf', type: 'Legal', status: 'Failed', time: '2 hr ago' },
];

// ─── Data Extraction ────────────────────────────────────────

export const extractedDocuments: DocumentRecord[] = [
  { id: 1, docName: 'Aadhaar_Card_001.jpg', name: 'Rajesh Kumar', date: '2024-03-15', idNumber: 'XXXX-XXXX-4521', status: 'Completed' },
  { id: 2, docName: 'PAN_Card_Scan.png', name: 'Priya Sharma', date: '2024-03-14', idNumber: 'ABCPD1234F', status: 'Completed' },
  { id: 3, docName: 'Invoice_March.pdf', name: 'Tech Solutions Pvt', date: '2024-03-14', idNumber: 'INV-2024-1847', status: 'Completed' },
  { id: 4, docName: 'Medical_Report.pdf', name: 'Amit Patel', date: '2024-03-13', idNumber: 'MR-2024-0892', status: 'Processing' },
  { id: 5, docName: 'Driving_License.jpg', name: 'Sunita Devi', date: '2024-03-13', idNumber: 'DL-0420-2019-001', status: 'Completed' },
  { id: 6, docName: 'Birth_Certificate.pdf', name: 'Arjun Reddy', date: '2024-03-12', idNumber: 'BC-TS-2024-7721', status: 'Completed' },
  { id: 7, docName: 'Passport_Copy.jpg', name: 'Meera Nair', date: '2024-03-12', idNumber: 'K1234567', status: 'Failed' },
  { id: 8, docName: 'Voter_ID.png', name: 'Vikram Singh', date: '2024-03-11', idNumber: 'VTR-MH-2024-9012', status: 'Completed' },
];

// ─── Analytics ───────────────────────────────────────────────

export const dailyDocsData = [
  { day: 'Mon', docs: 45 },
  { day: 'Tue', docs: 62 },
  { day: 'Wed', docs: 58 },
  { day: 'Thu', docs: 89 },
  { day: 'Fri', docs: 73 },
  { day: 'Sat', docs: 42 },
  { day: 'Sun', docs: 35 },
];

export const docTypeData = [
  { name: 'Identity Cards', value: 35 },
  { name: 'Invoices', value: 25 },
  { name: 'Medical Reports', value: 18 },
  { name: 'Legal Documents', value: 12 },
  { name: 'Certificates', value: 10 },
];

export const PIE_COLORS = ['#1F7A63', '#22C55E', '#34D399', '#6EE7B7', '#A7F3D0'];

export const langDistData = [
  { name: 'English', value: 55 },
  { name: 'Hindi', value: 30 },
  { name: 'Marathi', value: 15 },
];

export const LANG_COLORS = ['#0F3D2E', '#1F7A63', '#34D399'];

export const monthlyTrendData = [
  { month: 'Jan', docs: 320, accuracy: 94 },
  { month: 'Feb', docs: 480, accuracy: 95 },
  { month: 'Mar', docs: 520, accuracy: 96 },
  { month: 'Apr', docs: 610, accuracy: 97 },
  { month: 'May', docs: 740, accuracy: 98 },
  { month: 'Jun', docs: 890, accuracy: 98.5 },
];

// ─── Export ──────────────────────────────────────────────────

export const exportHistory: ExportRecord[] = [
  { id: 1, name: 'All_Documents_March_2024.csv', format: 'CSV', date: '2024-03-15', size: '2.4 MB', records: 847 },
  { id: 2, name: 'Identity_Cards_Export.json', format: 'JSON', date: '2024-03-14', size: '1.8 MB', records: 312 },
  { id: 3, name: 'Invoices_Q1_2024.csv', format: 'CSV', date: '2024-03-12', size: '956 KB', records: 203 },
  { id: 4, name: 'Medical_Reports_Feb.json', format: 'JSON', date: '2024-03-10', size: '1.2 MB', records: 178 },
];
