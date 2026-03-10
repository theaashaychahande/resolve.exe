import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Download,
  FileJson,
  FileSpreadsheet,
  Calendar,
  CheckCircle2,
  Loader2,
  FileText,
  ArrowDownToLine,
  Upload,
} from 'lucide-react';
import Card from '@/components/ui/Card';
import StatusBadge from '@/components/ui/StatusBadge';
import { useUpload } from '@/context/UploadContext';
import {
  downloadCSV,
  downloadJSON,
  estimateExportSize,
  createExportEntry,
  type ExportEntry,
} from '@/utils/exportData';

export default function ExportPage() {
  const { allExtractedDocuments } = useUpload();
  const [selectedFormat, setSelectedFormat] = useState<'CSV' | 'JSON'>('CSV');
  const [dateRange, setDateRange] = useState('all');
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);
  const [exportHistory, setExportHistory] = useState<ExportEntry[]>([]);

  const handleExport = () => {
    if (allExtractedDocuments.length === 0) {
      alert('No extracted data to export. Please upload and process documents first.');
      return;
    }

    setExporting(true);
    setExported(false);

    setTimeout(() => {
      // Create export entry for history
      const entry = createExportEntry(allExtractedDocuments, selectedFormat);
      setExportHistory((prev) => [entry, ...prev]);

      // Download file
      if (selectedFormat === 'CSV') {
        downloadCSV(allExtractedDocuments);
      } else {
        downloadJSON(allExtractedDocuments);
      }

      setExporting(false);
      setExported(true);
      setTimeout(() => setExported(false), 3000);
    }, 1500);
  };

  // Empty state
  if (allExtractedDocuments.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-dark">Export Data</h1>
          <p className="text-sm text-gray mt-1">
            Export your extracted data in your preferred format.
          </p>
        </div>

        <Card className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-primary-soft flex items-center justify-center mb-4">
            <FileSpreadsheet className="w-8 h-8 text-primary-dark" />
          </div>
          <h3 className="text-lg font-semibold text-dark mb-1">No data to export</h3>
          <p className="text-sm text-gray mb-6 max-w-sm">
            You need to extract data from documents before you can export it.
          </p>
          <Link
            to="/dashboard/upload"
            className="inline-flex items-center gap-2 bg-primary-dark hover:bg-primary-deep text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-all"
          >
            <Upload className="w-4 h-4" />
            Upload & Extract Documents
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-dark">Export Data</h1>
        <p className="text-sm text-gray mt-1">
          Export your extracted data in your preferred format.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Export options */}
        <div className="lg:col-span-2 space-y-6">
          {/* Format selection */}
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-dark mb-4">Select Export Format</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedFormat('CSV')}
                className={`flex items-center gap-4 p-5 rounded-xl border-2 transition-all ${
                  selectedFormat === 'CSV'
                    ? 'border-primary-dark bg-primary-deep/5'
                    : 'border-border hover:border-gray-300'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    selectedFormat === 'CSV'
                      ? 'bg-gradient-to-br from-primary-deep to-primary-dark text-white shadow-lg'
                      : 'bg-primary-soft text-gray'
                  }`}
                >
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-dark">CSV Format</p>
                  <p className="text-xs text-gray">Comma separated values</p>
                </div>
                {selectedFormat === 'CSV' && (
                  <CheckCircle2 className="w-5 h-5 text-primary-dark ml-auto" />
                )}
              </button>

              <button
                onClick={() => setSelectedFormat('JSON')}
                className={`flex items-center gap-4 p-5 rounded-xl border-2 transition-all ${
                  selectedFormat === 'JSON'
                    ? 'border-primary-dark bg-primary-deep/5'
                    : 'border-border hover:border-gray-300'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    selectedFormat === 'JSON'
                      ? 'bg-gradient-to-br from-primary-deep to-primary-dark text-white shadow-lg'
                      : 'bg-primary-soft text-gray'
                  }`}
                >
                  <FileJson className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-dark">JSON Format</p>
                  <p className="text-xs text-gray">Structured JSON data</p>
                </div>
                {selectedFormat === 'JSON' && (
                  <CheckCircle2 className="w-5 h-5 text-primary-dark ml-auto" />
                )}
              </button>
            </div>
          </Card>

          {/* Date range */}
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-dark mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray" /> Date Range
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'all', label: 'All Time' },
                { value: 'today', label: 'Today' },
                { value: 'week', label: 'This Week' },
                { value: 'month', label: 'This Month' },
                { value: 'quarter', label: 'This Quarter' },
              ].map((r) => (
                <button
                  key={r.value}
                  onClick={() => setDateRange(r.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    dateRange === r.value
                      ? 'bg-primary-dark text-white'
                      : 'bg-primary-soft text-gray hover:bg-gray-200'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </Card>

          {/* Export button */}
          <button
            onClick={handleExport}
            disabled={exporting || allExtractedDocuments.length === 0}
            className="w-full bg-primary hover:bg-[#1ea34e] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
          >
            {exporting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Generating Export...
              </>
            ) : exported ? (
              <>
                <CheckCircle2 className="w-5 h-5" /> Export Ready — Download Now
              </>
            ) : (
              <>
                <Download className="w-5 h-5" /> Export as {selectedFormat}
              </>
            )}
          </button>
        </div>

        {/* Export summary sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-dark mb-4">Export Summary</h3>
            <div className="space-y-3">
              {[
                ['Format', selectedFormat],
                [
                  'Date Range',
                  dateRange === 'all'
                    ? 'All Time'
                    : dateRange.charAt(0).toUpperCase() + dateRange.slice(1),
                ],
                ['Total Records', allExtractedDocuments.length.toLocaleString()],
                [
                  'Estimated Size',
                  estimateExportSize(allExtractedDocuments, selectedFormat),
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0"
                >
                  <span className="text-sm text-gray">{label}</span>
                  <span className="text-sm font-medium text-dark">{value}</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="bg-primary-deep/5 border border-primary-dark/10 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-primary-deep mb-2">💡 Pro Tip</h4>
            <p className="text-xs text-gray leading-relaxed">
              Use JSON format for API integrations and CSV for spreadsheet analysis. Both formats
              include all extracted fields.
            </p>
          </div>
        </div>
      </div>

      {/* Export history */}
      {exportHistory.length > 0 && (
        <Card className="p-6">
          <h3 className="text-sm font-semibold text-dark mb-4">Recent Exports</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-3 text-xs font-medium text-gray uppercase tracking-wider">
                    File Name
                  </th>
                  <th className="text-left py-3 px-3 text-xs font-medium text-gray uppercase tracking-wider">
                    Format
                  </th>
                  <th className="text-left py-3 px-3 text-xs font-medium text-gray uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-left py-3 px-3 text-xs font-medium text-gray uppercase tracking-wider">
                    Size
                  </th>
                  <th className="text-left py-3 px-3 text-xs font-medium text-gray uppercase tracking-wider">
                    Records
                  </th>
                  <th className="text-left py-3 px-3 text-xs font-medium text-gray uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {exportHistory.map((e) => (
                  <tr
                    key={e.id}
                    className="border-t border-gray-50 hover:bg-primary-soft/50 transition"
                  >
                    <td className="py-3 px-3 font-medium text-dark flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary-dark flex-shrink-0" />
                      {e.filename}
                    </td>
                    <td className="py-3 px-3">
                      <StatusBadge status={e.format} />
                    </td>
                    <td className="py-3 px-3 text-gray">
                      {e.exportedAt.toLocaleDateString()}
                    </td>
                    <td className="py-3 px-3 text-gray">{e.size}</td>
                    <td className="py-3 px-3 text-gray">
                      {e.recordCount.toLocaleString()}
                    </td>
                    <td className="py-3 px-3">
                      <button
                        className="p-1.5 rounded-lg hover:bg-primary-deep/10 text-gray hover:text-primary-dark transition"
                        title="Download"
                      >
                        <ArrowDownToLine className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
