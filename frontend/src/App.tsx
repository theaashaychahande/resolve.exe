import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { UploadProvider } from '@/context/UploadContext';
import { ThemeProvider } from '@/context/ThemeContext';
import LandingPage from '@/pages/LandingPage';
import DashboardLayout from '@/components/layout/DashboardLayout';
import UploadPage from '@/pages/UploadPage';
import DataExtractionPage from '@/pages/DataExtractionPage';
import AnalyticsPage from '@/pages/AnalyticsPage';
import ExportPage from '@/pages/ExportPage';

export default function App() {
  return (
    <ThemeProvider>
      <UploadProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<UploadPage />} />
              <Route path="upload" element={<UploadPage />} />
              <Route path="data" element={<DataExtractionPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="export" element={<ExportPage />} />
            </Route>
          </Routes>
        </Router>
      </UploadProvider>
    </ThemeProvider>
  );
}
