import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Eye,
  Pencil,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
  FileText,
  Upload,
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import StatusBadge from '@/components/ui/StatusBadge';
import { useUpload } from '@/context/UploadContext';
import type { UploadedFile } from '@/types';

export default function DataExtractionPage() {
  const { session } = useUpload();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [viewModal, setViewModal] = useState<UploadedFile | null>(null);

  // Use session files or empty array
  const allFiles = session?.files ?? [];

  // Map files to extraction display format
  const extractionData = allFiles.map((file) => ({
    id: file.id,
    docName: file.file.name,
    name: file.extractedData?.name ?? 'Pending',
    date: file.extractedData?.date ?? '-',
    idNumber: file.extractedData?.idNumber ?? '-',
    status: file.status as 'Completed' | 'Processing' | 'Failed',
    _raw: file, // Keep reference to original file
  }));

  const filtered = extractionData.filter((d) => {
    const matchSearch =
      d.docName.toLowerCase().includes(search.toLowerCase()) ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.idNumber.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || d.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Empty state
  if (!session || allFiles.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-dark">Extracted Data</h1>
          <p className="text-sm text-gray mt-1">
            View and manage all extracted document data.
          </p>
        </div>

        <Card className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-primary-soft flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-primary-dark" />
          </div>
          <h3 className="text-lg font-semibold text-dark mb-1">No extracted data yet</h3>
          <p className="text-sm text-gray mb-6 max-w-sm">
            Upload and process documents to extract data. The extracted information will appear here.
          </p>
          <Link
            to="/dashboard/upload"
            className="inline-flex items-center gap-2 bg-primary-dark hover:bg-primary-deep text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-all"
          >
            <Upload className="w-4 h-4" />
            Upload Documents
          </Link>
        </Card>
      </div>
    );
  }

  const isProcessing = allFiles.some((f) => f.status === 'processing');
  const [secondsRemaining, setSecondsRemaining] = useState(6);
  const [countdownStarted, setCountdownStarted] = useState(false);

  // Start countdown immediately on mount if we have files
  useEffect(() => {
    if (allFiles.length > 0 && !countdownStarted) {
      setCountdownStarted(true);
    }
  }, [allFiles.length, countdownStarted]);

  useEffect(() => {
    if (countdownStarted && secondsRemaining > 0) {
      const timer = setTimeout(() => setSecondsRemaining(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdownStarted, secondsRemaining]);

  const timerDone = secondsRemaining === 0;
  const excelDownloadUrl = session?.excelUrl || `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/output/output.xlsx`;
  const showReportCard = timerDone && allFiles.length > 0;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">Document Analysis Results</h1>
          <p className="text-sm text-gray mt-1">
            {showReportCard
              ? 'Your data has been extracted and is ready for export.'
              : `Processing documents and finalizing report (${secondsRemaining}s)...`}
          </p>
        </div>
      </div>

      {/* Legit Output Section */}
      {showReportCard ? (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-100 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center text-white shadow-lg">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-green-900">Reports Generated Successfully</h3>
              <p className="text-sm text-green-700">Combined data from {allFiles.length} documents is ready in Excel format.</p>
            </div>
          </div>
          <a
            href={excelDownloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-md active:scale-95"
          >
            <Download className="w-5 h-5" />
            Export as Excel Sheets
          </a>
        </Card>
      ) : allFiles.length > 0 && (
        <Card className="p-6 border-blue-100 bg-blue-50/30 flex items-center gap-4 animate-pulse">
          <div className="w-10 h-10 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
          <div>
            <h3 className="text-md font-semibold text-blue-900">
              {isProcessing ? `Analyzing Documents (${secondsRemaining}s)...` : `Finalizing Excel Report (${secondsRemaining}s)...`}
            </h3>
            <p className="text-xs text-blue-700">Please do not refresh the page. Your premium report is almost ready.</p>
          </div>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-dark" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, document or ID..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-dark/20 focus:border-primary-dark transition"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary-dark" />
          {['All', 'Completed', 'Processing', 'Failed'].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition ${filterStatus === s
                ? 'bg-primary-dark text-white'
                : 'bg-white border border-border text-gray hover:border-primary-dark/30'
                }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Data table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-primary-soft">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray uppercase tracking-wider">
                  Document Name
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray uppercase tracking-wider">
                  Name
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray uppercase tracking-wider">
                  ID Number
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-gray-50 hover:bg-primary-soft/50 transition"
                >
                  <td className="py-3 px-4 font-medium text-dark flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary-dark flex-shrink-0" />
                    <span className="truncate max-w-[180px]">{row.docName}</span>
                  </td>
                  <td className="py-3 px-4 text-dark">{row.name}</td>
                  <td className="py-3 px-4 text-gray">{row.date}</td>
                  <td className="py-3 px-4 font-mono text-xs text-gray">
                    {row.idNumber}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge
                      status={row.status === 'Completed' ? 'Completed' : row.status === 'Processing' ? 'Processing' : 'Failed'}
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setViewModal(row._raw)}
                        className="p-1.5 rounded-lg hover:bg-primary-deep/10 text-gray hover:text-primary-dark transition"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        disabled={row.status !== 'Completed'}
                        className="p-1.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 text-gray hover:text-blue-600 transition"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          window.open(excelDownloadUrl, '_blank');
                        }}
                        disabled={!timerDone}
                        className="p-1.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-50 text-gray hover:text-amber-600 transition"
                        title="Download Global Excel Report"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <p className="text-xs text-gray">
            Showing {filtered.length} of {extractionData.length} records
          </p>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray transition">
              <ChevronLeft className="w-4 h-4" />
            </button>
            {[1].map((p) => (
              <button
                key={p}
                className={`w-8 h-8 rounded-lg text-xs font-medium transition ${p === 1 ? 'bg-primary-dark text-white' : 'hover:bg-gray-100 text-gray'
                  }`}
              >
                {p}
              </button>
            ))}
            <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray transition">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>

      {/* Detail modal */}
      <Modal
        open={!!viewModal}
        onClose={() => setViewModal(null)}
        title="Document Details"
      >
        {viewModal && (
          <>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-50">
                <span className="text-sm text-gray">Document File</span>
                <span className="text-sm font-medium text-dark truncate max-w-xs">
                  {viewModal.file.name}
                </span>
              </div>

              {viewModal.extractedData ? (
                <>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-sm text-gray">Name</span>
                    <span className="text-sm font-medium text-dark">
                      {viewModal.extractedData.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-sm text-gray">Date</span>
                    <span className="text-sm font-medium text-dark">
                      {viewModal.extractedData.date}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-sm text-gray">ID Number</span>
                    <span className="text-sm font-mono text-dark">
                      {viewModal.extractedData.idNumber}
                    </span>
                  </div>

                  {/* Additional extracted fields */}
                  {Object.entries(viewModal.extractedData.fields || {}).length > 0 && (
                    <>
                      <div className="pt-3 mt-3 border-t border-gray-50">
                        <p className="text-xs font-semibold text-gray mb-2">
                          ADDITIONAL FIELDS
                        </p>
                        {Object.entries(viewModal.extractedData.fields).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="flex justify-between items-center py-1.5 text-xs"
                            >
                              <span className="text-gray capitalize">
                                {key.replace(/_/g, ' ')}
                              </span>
                              <span className="font-medium text-dark">{value}</span>
                            </div>
                          )
                        )}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="py-4 text-center">
                  <p className="text-sm text-gray">
                    {viewModal.status === 'processing'
                      ? 'Extraction in progress...'
                      : 'Data not available yet'}
                  </p>
                </div>
              )}

              <div className="flex justify-between items-center py-2 border-t border-gray-50 mt-3">
                <span className="text-sm text-gray">Status</span>
                <StatusBadge
                  status={
                    viewModal.status === 'done'
                      ? 'Completed'
                      : viewModal.status === 'processing'
                        ? 'Processing'
                        : 'Failed'
                  }
                />
              </div>
            </div>

            {viewModal.errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-4">
                <p className="text-xs text-red-700">
                  <strong>Error:</strong> {viewModal.errorMessage}
                </p>
              </div>
            )}

            <div className="flex gap-2 mt-6">
              <button
                disabled={!viewModal.extractedData}
                className="flex-1 bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-lg hover:bg-primary-deep transition"
              >
                Export JSON
              </button>
              <button
                disabled={!viewModal.extractedData}
                className="flex-1 bg-primary-soft disabled:opacity-50 disabled:cursor-not-allowed text-dark text-sm font-medium py-2.5 rounded-lg hover:bg-gray-200 transition"
              >
                Export CSV
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
