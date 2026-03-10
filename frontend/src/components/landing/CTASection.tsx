import { Link } from 'react-router-dom';
import { ArrowRight, Clock, FileText, Shield, Zap, Check } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 lg:py-32 bg-primary-soft">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl px-8 sm:px-16 py-16 sm:py-24 shadow-2xl shadow-primary-deep/20 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0F3D2E 0%, #0E5F4B 40%, #1F7A63 100%)',
          }}
        >
          {/* Dot grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.03] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/[0.03] rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-primary-light text-xs font-semibold px-5 py-2.5 rounded-full mb-8 border border-white/10">
              <Clock className="w-3.5 h-3.5" /> Get started in under 2 minutes
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Start Automating Document
              <br className="hidden sm:block" /> Processing Today
            </h2>

            <p className="text-white/50 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Join 500+ organizations across India using DRISHTI to transform their document
              workflows. From hospitals to government offices — automate, digitize, and accelerate.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2.5 bg-primary hover:bg-[#1ea34e] text-white font-bold px-10 py-5 rounded-xl shadow-xl shadow-primary/30 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/40 text-lg group"
              >
                Try It Now — Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold px-10 py-5 rounded-xl border border-white/20 transition-all hover:-translate-y-0.5 text-lg"
              >
                View Pricing
              </a>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/40 mb-12">
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> Free forever plan</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> No credit card needed</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> Setup in 2 minutes</span>
            </div>

            {/* Bottom features */}
            <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {[
                { icon: FileText, label: '50+ Document Types', desc: 'IDs, invoices, certificates & more' },
                { icon: Zap, label: 'Instant Processing', desc: 'Results in under 2 seconds' },
                { icon: Shield, label: 'Enterprise Security', desc: 'AES-256 encryption standard' },
              ].map((f, i) => (
                <div key={i} className="bg-white/[0.06] rounded-xl p-4 border border-white/5">
                  <f.icon className="w-5 h-5 text-primary-light mx-auto mb-2" />
                  <p className="text-xs font-semibold text-white mb-0.5">{f.label}</p>
                  <p className="text-[10px] text-white/40">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
