import { Link } from 'react-router-dom';
import {
  FileText,
  Upload,
  Check,
  ArrowRight,
  Star,
  Shield,
  Target,
  TrendingUp,
  ChevronRight,
  Zap,
  Brain,
  Globe,
  BarChart3,
  Users,
  Clock,
  Sparkles,
} from 'lucide-react';

const trustLogos = ['Tata Health', 'MahaGov', 'AIIMS', 'Reliance', 'Infosys', 'Wipro'];

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden pt-16"
      style={{
        background: 'linear-gradient(135deg, #0F3D2E 0%, #0E5F4B 40%, #1F7A63 100%)',
      }}
    >
      {/* Animated background elements */}
      <div className="absolute top-20 right-20 w-[700px] h-[700px] bg-primary/8 rounded-full blur-3xl animate-pulse-soft" />
      <div
        className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-primary-light/6 rounded-full blur-3xl animate-pulse-soft"
        style={{ animationDelay: '2s' }}
      />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-white/3 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '3s' }} />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Diagonal lines */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
        backgroundSize: '40px 40px',
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left — Text content */}
          <div className="animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-primary-light text-xs font-semibold px-5 py-2.5 rounded-full mb-8 border border-white/10">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen AI Document Intelligence</span>
              <span className="bg-primary/30 text-white text-[10px] px-2 py-0.5 rounded-full ml-1">NEW</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.1] mb-7 tracking-tight">
              Transform Documents
              <br />
              into <span className="relative">
                <span className="text-primary">Structured Data</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M1 5.5C47 2 153 2 199 5.5" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
              <br />
              with AI
            </h1>

            <p className="text-lg lg:text-xl text-white/60 leading-relaxed mb-10 max-w-xl">
              Upload documents and instantly extract critical information using AI-powered OCR and NLP. 
              Automate your entire document processing workflow — from intake to structured output — in seconds.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2.5 bg-primary hover:bg-[#1ea34e] text-white font-bold px-9 py-4.5 rounded-xl shadow-xl shadow-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5 text-base"
              >
                Start Free — No Credit Card <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/dashboard/upload"
                className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/15 text-white font-semibold px-8 py-4.5 rounded-xl border border-white/20 transition-all hover:-translate-y-0.5 text-base"
              >
                <Upload className="w-5 h-5" /> Upload Document
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/40">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-primary" /> Free forever plan
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-primary" /> No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-primary" /> 50+ document types
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-primary" /> 3 languages supported
              </span>
            </div>

            {/* Mini social proof */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2.5">
                {[0,1,2,3,4].map((i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-[#0E5F4B] flex items-center justify-center text-[10px] font-bold text-white" style={{ background: ['#22C55E','#1F7A63','#0F3D2E','#34D399','#0E5F4B'][i] }}>
                    {['RK','AP','SM','JD','NS'][i]}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 mb-0.5">
                  {[0,1,2,3,4].map(i => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-xs text-white/40"><span className="text-white/70 font-semibold">500+</span> organizations trust DRISHTI</p>
              </div>
            </div>
          </div>

          {/* Right — Dashboard preview */}
          <div className="animate-slide-in-right stagger-2 hidden lg:block">
            <div className="relative">
              {/* Main dashboard card */}
              <div className="bg-white rounded-2xl shadow-2xl shadow-black/25 overflow-hidden border border-white/20">
                {/* Browser chrome */}
                <div className="bg-[#0B2E22] px-5 py-3.5 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28CA42]" />
                  <div className="ml-3 flex-1 bg-white/10 rounded-md px-3 py-1">
                    <span className="text-[10px] text-white/40 font-medium">app.drishti.ai/dashboard</span>
                  </div>
                </div>

                <div className="p-5 space-y-4 bg-[#FAFBFC]">
                  {/* Welcome bar */}
                  <div className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm">
                    <div>
                      <p className="text-xs font-semibold text-gray-800">Welcome back, Rahul 👋</p>
                      <p className="text-[10px] text-gray-400">Here's your processing overview for today</p>
                    </div>
                    <div className="bg-green-50 text-green-600 text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Live
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-4 gap-2.5">
                    {[
                      { label: 'Total Docs', value: '2,847', change: '+12%', icon: FileText, color: '#1F7A63' },
                      { label: 'Today', value: '148', change: '+8%', icon: TrendingUp, color: '#3B82F6' },
                      { label: 'Accuracy', value: '98.5%', change: '+2.1%', icon: Target, color: '#F59E0B' },
                      { label: 'Users', value: '34', change: '+5', icon: Users, color: '#8B5CF6' },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm"
                      >
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: s.color + '15' }}>
                            <s.icon className="w-2.5 h-2.5" style={{ color: s.color }} />
                          </div>
                          <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wider">
                            {s.label}
                          </p>
                        </div>
                        <p className="text-lg font-bold text-gray-800">{s.value}</p>
                        <p className="text-[9px] font-semibold mt-0.5" style={{ color: s.color }}>{s.change}</p>
                      </div>
                    ))}
                  </div>

                  {/* Chart */}
                  <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[11px] text-gray-700 font-semibold">
                        Processing Trend
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">7D</span>
                        <span className="text-[9px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-semibold">30D</span>
                        <span className="text-[9px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">90D</span>
                      </div>
                    </div>
                    <div className="h-28 flex items-end gap-1">
                      {[35, 52, 45, 68, 42, 75, 58, 82, 65, 78, 70, 88, 55, 92, 72, 85].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm transition-all duration-500"
                          style={{
                            height: `${h}%`,
                            background: `linear-gradient(to top, #1F7A63, #22C55E)`,
                            opacity: 0.5 + h / 200,
                          }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-[8px] text-gray-300">Jan 1</span>
                      <span className="text-[8px] text-gray-300">Jan 15</span>
                      <span className="text-[8px] text-gray-300">Jan 30</span>
                    </div>
                  </div>

                  {/* Recent docs table */}
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-50">
                      <p className="text-[11px] text-gray-700 font-semibold">Recent Extractions</p>
                      <span className="text-[9px] text-green-600 font-semibold cursor-pointer hover:underline">View All →</span>
                    </div>
                    {[
                      { doc: 'Aadhaar Card — Rahul Sharma', status: 'done', time: '2m ago', type: 'ID' },
                      { doc: 'PAN Card — Priya Patel', status: 'processing', time: '5m ago', type: 'Tax' },
                      { doc: 'Invoice #1847 — Tata Motors', status: 'done', time: '12m ago', type: 'Invoice' },
                      { doc: 'Birth Certificate — Amit K.', status: 'done', time: '18m ago', type: 'Cert' },
                    ].map((item) => (
                      <div
                        key={item.doc}
                        className="flex items-center gap-3 px-4 py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50/50"
                      >
                        <div
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            item.status === 'done' ? 'bg-green-500' : 'bg-amber-400 animate-pulse'
                          }`}
                        />
                        <span className="text-[10px] text-gray-700 font-medium flex-1 truncate">{item.doc}</span>
                        <span className="text-[8px] text-gray-300 bg-gray-50 px-1.5 py-0.5 rounded">{item.type}</span>
                        <span className="text-[9px] text-gray-400">{item.time}</span>
                        <ChevronRight className="w-3 h-3 text-gray-300" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating card — bottom-left */}
              <div className="absolute -bottom-6 -left-8 bg-white rounded-xl shadow-2xl border border-gray-100 px-5 py-4 animate-float z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-deep to-primary-dark flex items-center justify-center shadow-lg">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">AI Extraction</p>
                    <p className="text-xs text-gray-400">98.5% accuracy rate</p>
                    <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-1.5">
                      <div className="w-[98%] h-full bg-gradient-to-r from-primary-dark to-primary rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge — top-right */}
              <div
                className="absolute -top-4 -right-4 bg-primary text-white rounded-xl shadow-xl shadow-primary/30 px-4 py-3 animate-float z-10"
                style={{ animationDelay: '1.5s' }}
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <div>
                    <span className="text-xs font-bold block">Enterprise Secure</span>
                    <span className="text-[9px] text-white/60">AES-256 Encryption</span>
                  </div>
                </div>
              </div>

              {/* Floating — languages */}
              <div
                className="absolute top-1/3 -left-10 bg-white rounded-xl shadow-xl border border-gray-100 px-4 py-3 animate-float z-10"
                style={{ animationDelay: '2.5s' }}
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary-dark" />
                  <div>
                    <p className="text-[10px] font-bold text-gray-700">3 Languages</p>
                    <p className="text-[9px] text-gray-400">EN • HI • MR</p>
                  </div>
                </div>
              </div>

              {/* Processing notification */}
              <div
                className="absolute bottom-1/4 -right-6 bg-white rounded-xl shadow-xl border border-gray-100 px-4 py-3 animate-float z-10"
                style={{ animationDelay: '3s' }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-700">Extraction Complete</p>
                    <p className="text-[9px] text-gray-400">15 fields extracted</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative border-t border-white/10 bg-white/[0.03] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              { value: '10K+', label: 'Documents Processed', icon: FileText },
              { value: '98.5%', label: 'Extraction Accuracy', icon: Target },
              { value: '500+', label: 'Organizations', icon: Users },
              { value: '<2s', label: 'Processing Time', icon: Clock },
              { value: '3', label: 'Languages Supported', icon: Globe },
              { value: '50+', label: 'Document Types', icon: Brain },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-5 h-5 text-primary-light/70" />
                </div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white mb-1">{stat.value}</p>
                <p className="text-xs text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trusted by section */}
      <div className="relative border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-xs text-white/25 uppercase tracking-widest font-medium mb-6">Trusted by leading organizations across India</p>
          <div className="flex items-center justify-center flex-wrap gap-x-12 gap-y-4">
            {trustLogos.map((name) => (
              <div key={name} className="flex items-center gap-2 text-white/20 hover:text-white/40 transition-colors">
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm font-bold tracking-wide">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
