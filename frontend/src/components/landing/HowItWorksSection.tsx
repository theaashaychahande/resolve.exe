import { Link } from 'react-router-dom';
import { Upload, Cpu, ClipboardList, BarChart3, ArrowRight, Check } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

const steps = [
  {
    step: '01',
    icon: Upload,
    title: 'Upload Document',
    desc: 'Drag and drop your documents, upload images and PDFs, or capture directly from your camera. We support 50+ document formats.',
    details: ['Drag & drop upload', 'Camera capture', 'Bulk upload supported', 'Auto format detection'],
    color: '#1F7A63',
  },
  {
    step: '02',
    icon: Cpu,
    title: 'AI Processes Document',
    desc: 'Our advanced AI pipeline analyzes your document using OCR, NLP, and computer vision to understand content and structure.',
    details: ['OCR text extraction', 'Layout analysis', 'Language detection', 'Quality enhancement'],
    color: '#3B82F6',
  },
  {
    step: '03',
    icon: ClipboardList,
    title: 'Extract Important Fields',
    desc: 'Key data fields are identified and extracted automatically — names, dates, IDs, amounts, addresses, and more.',
    details: ['Name & date extraction', 'ID number detection', 'Table parsing', 'Validation checks'],
    color: '#F59E0B',
  },
  {
    step: '04',
    icon: BarChart3,
    title: 'View Structured Dashboard',
    desc: 'Access your extracted data in a beautiful dashboard. Search, filter, analyze, and export to CSV, JSON, or via API.',
    details: ['Interactive dashboard', 'Search & filter', 'Export to CSV/JSON', 'API integration'],
    color: '#8B5CF6',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-[#0A1A14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="How It Works"
          title="From Document to Data in 4 Simple Steps"
          description="Our streamlined workflow takes your physical or digital documents and converts them into structured, searchable data in seconds."
          dark={true}
        />

        {/* Steps */}
        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-6 mb-16">
          {steps.map((s, i) => (
            <div key={i} className="relative group">
              {/* Connector arrow between steps (desktop) */}
              {i < 3 && (
                <div className="hidden lg:flex absolute top-16 -right-3 z-10">
                  <ArrowRight className="w-6 h-6 text-primary-dark/20" />
                </div>
              )}

              <div className="relative bg-white/5 rounded-2xl p-7 shadow-sm border border-white/10 hover:border-[#6BC16B]/20 hover:shadow-2xl hover:shadow-[#6BC16B]/5 transition-all duration-300 hover:-translate-y-2 h-full">
                {/* Step number watermark */}
                <span className="text-6xl font-black absolute top-3 right-4 opacity-[0.04]">
                  {s.step}
                </span>
                
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl text-white flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ background: s.color }}>
                  <s.icon className="w-7 h-7" />
                </div>
                
                {/* Step badge */}
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider mb-3 px-2.5 py-1 rounded-full" style={{ background: s.color + '12', color: s.color }}>
                  Step {s.step}
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed mb-5">{s.desc}</p>
                
                {/* Details checklist */}
                <ul className="space-y-2">
                  {s.details.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-xs text-white/40">
                      <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: s.color }} />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-white/5 rounded-2xl border border-white/10 shadow-sm p-8 lg:p-12 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full bg-[#6BC16B] animate-pulse" />
            <span className="text-sm font-semibold text-[#6BC16B]">Average processing time: under 10 seconds</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Ready to see it in action?</h3>
          <p className="text-sm text-white/40 mb-6 max-w-md mx-auto">Upload your first document and watch DRISHTI extract structured data in real-time. No signup required for your first 5 documents.</p>
          <Link 
            to="/dashboard/upload" 
            className="inline-flex items-center gap-2 bg-[#6BC16B] hover:bg-[#5bb05b] text-[#0B231A] font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-[#6BC16B]/10 transition-all hover:-translate-y-0.5"
          >
            TRY NOW! <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
