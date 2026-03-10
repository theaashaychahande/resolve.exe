import {
  Brain,
  Globe,
  ClipboardList,
  LayoutDashboard,
  ShieldCheck,
  Zap,
  ArrowRight,
  FileText,
  BarChart3,
  Lock,
  Layers,
  Cpu,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/ui/SectionHeader';

const features = [
  {
    icon: Brain,
    title: 'AI Document Extraction',
    desc: 'Advanced machine learning models analyze your documents pixel by pixel, extracting text, tables, and key-value pairs with industry-leading accuracy. Handles handwriting, stamps, and low-quality scans.',
    gradient: 'from-primary-deep to-primary-dark',
    highlights: ['OCR + NLP Pipeline', 'Handwriting Recognition', 'Table Detection'],
  },
  {
    icon: Globe,
    title: 'Multi Language Support',
    desc: 'Process documents in English, Hindi, and Marathi with equal accuracy. Our multilingual AI models understand regional document formats and language-specific nuances.',
    gradient: 'from-primary-darker to-primary',
    highlights: ['English, Hindi, Marathi', 'Regional Formats', 'Script Detection'],
  },
  {
    icon: ClipboardList,
    title: 'Structured Data Output',
    desc: 'Convert unstructured documents into clean, validated JSON data ready for your databases, APIs, or downstream systems. Custom field mapping and schema support included.',
    gradient: 'from-primary to-primary-light',
    highlights: ['JSON & CSV Output', 'Custom Schemas', 'API Ready'],
  },
  {
    icon: LayoutDashboard,
    title: 'Smart Dashboard',
    desc: 'Powerful analytics dashboard to search, filter, and analyze extracted data. Visual charts, real-time processing stats, and customizable views for your team.',
    gradient: 'from-primary-deep to-primary',
    highlights: ['Real-time Analytics', 'Custom Filters', 'Team Views'],
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise Security',
    desc: 'Bank-grade AES-256 encryption for data at rest and in transit. Role-based access control, audit logs, and compliance with GDPR and Indian data protection standards.',
    gradient: 'from-primary-darker to-primary-dark',
    highlights: ['AES-256 Encryption', 'RBAC', 'Audit Trails'],
  },
  {
    icon: Zap,
    title: 'Lightning Fast Processing',
    desc: 'Process documents in under 2 seconds with our optimized AI pipeline. Batch upload hundreds of documents and get results in minutes, not hours.',
    gradient: 'from-primary to-primary-soft',
    highlights: ['<2s Processing', 'Batch Upload', 'Queue Management'],
  },
];

const showcaseFeatures = [
  { icon: FileText, label: 'Smart Document Recognition', desc: 'Auto-detect document type, orientation, and language before processing.' },
  { icon: Layers, label: 'Batch Processing', desc: 'Upload and process hundreds of documents simultaneously with queue management.' },
  { icon: BarChart3, label: 'Analytics & Reporting', desc: 'Track processing metrics, accuracy rates, and usage patterns over time.' },
  { icon: Lock, label: 'Secure Vault Storage', desc: 'Encrypted document storage with role-based access and retention policies.' },
  { icon: Cpu, label: 'Custom AI Models', desc: 'Train custom extraction models specific to your document types and formats.' },
  { icon: Globe, label: 'REST API Access', desc: 'Full API access for integration with your existing systems and workflows.' },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Features"
          title="Powerful Document Intelligence"
          description="Everything you need to automate document processing and extract structured data at scale. Built for enterprises, loved by small teams."
        />

        {/* Main 6 feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {features.map((f, i) => (
            <div
              key={i}
              className="group bg-primary-soft border border-gray-100 rounded-2xl p-8 hover:shadow-2xl hover:shadow-gray-200/60 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
            >
              {/* Background decoration on hover */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-[0.04] rounded-bl-full transition-opacity duration-500`} />

              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <f.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">{f.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">{f.desc}</p>

              {/* Feature highlights */}
              <div className="flex flex-wrap gap-2 mb-5">
                {f.highlights.map((h) => (
                  <span key={h} className="text-[10px] font-semibold bg-primary-soft text-primary-dark px-2.5 py-1 rounded-full">
                    {h}
                  </span>
                ))}
              </div>

              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2.5 bg-primary hover:bg-[#1ea34e] text-white font-bold px-10 py-5 rounded-xl shadow-xl shadow-primary/30 transition-all hover:-translate-y-0.5 text-lg"
              >
                Try It Now — Free <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ))}
        </div>

        {/* Product showcase grid */}
        <div className="relative bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-2xl overflow-hidden group/container">
          {/* Subtle background decoration */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl transition-transform duration-700 group-hover/container:scale-110" />

          <div className="relative">
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-black mb-3">And so much more...</h3>
              <p className="text-gray-600 max-w-lg mx-auto">Every tool your team needs for complete document intelligence, from intake to insight.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {showcaseFeatures.map((f, i) => (
                <div key={i} className="flex items-start gap-4 bg-primary-soft border border-primary-light hover:border-primary hover:bg-primary-light rounded-xl p-5 transition-all duration-300 group/item hover:-translate-y-1">
                  <div className="w-11 h-11 rounded-lg bg-primary-soft flex items-center justify-center flex-shrink-0 shadow-sm group-hover/item:scale-110 border border-primary">
                    <f.icon className="w-5 h-5 text-primary-dark" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black mb-1 text-sm">{f.label}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
