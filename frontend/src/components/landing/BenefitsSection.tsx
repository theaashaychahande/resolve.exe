import { Zap, UserMinus, Target, FolderOpen, TrendingUp, Clock, Shield, Globe } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

const benefits = [
  {
    icon: Zap,
    title: 'Faster Processing',
    desc: 'Process documents 10x faster than manual data entry. Our AI pipeline handles complex documents in under 2 seconds.',
    stat: '10x',
    statLabel: 'Faster',
    color: '#22C55E',
  },
  {
    icon: UserMinus,
    title: 'Reduced Manual Work',
    desc: 'Eliminate 80% of repetitive data entry tasks with intelligent automation. Free your team for higher-value work.',
    stat: '80%',
    statLabel: 'Less Manual Work',
    color: '#3B82F6',
  },
  {
    icon: Target,
    title: 'Higher Accuracy',
    desc: 'AI-powered extraction achieves 98.5%+ accuracy — significantly outperforming manual data entry error rates.',
    stat: '98.5%',
    statLabel: 'Accuracy',
    color: '#F59E0B',
  },
  {
    icon: FolderOpen,
    title: 'Organized Records',
    desc: 'Every document is cataloged, searchable, and instantly accessible. No more lost files or disorganized folders.',
    stat: '100%',
    statLabel: 'Digital',
    color: '#8B5CF6',
  },
];

const additionalBenefits = [
  { icon: TrendingUp, title: 'Scalable Infrastructure', desc: 'Handle 10 or 10,000 documents — our cloud infrastructure scales automatically.' },
  { icon: Clock, title: '24/7 Processing', desc: 'Documents are processed around the clock with no downtime or delays.' },
  { icon: Shield, title: 'Compliance Ready', desc: 'Built-in data retention policies and compliance with Indian data protection laws.' },
  { icon: Globe, title: 'Cloud Native', desc: 'Access from anywhere, on any device. No software installation required.' },
];

export default function BenefitsSection() {
  return (
    <section
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0F3D2E 0%, #0E5F4B 50%, #1F7A63 100%)' }}
    >
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-white/[0.02] rounded-full" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-white/[0.02] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Benefits"
          title="Why Organizations Choose DRISHTI"
          description="Measurable improvements in speed, accuracy, and efficiency from day one. See the impact across your entire document workflow."
          dark
        />

        {/* Main benefit cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.12] transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors" style={{ background: b.color + '20' }}>
                <b.icon className="w-7 h-7" style={{ color: b.color }} />
              </div>
              
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-4xl font-extrabold" style={{ color: b.color }}>{b.stat}</span>
                <span className="text-sm text-white/40 font-medium">{b.statLabel}</span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-3">{b.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Additional benefits */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {additionalBenefits.map((b, i) => (
            <div key={i} className="flex items-start gap-4 bg-white/[0.04] rounded-xl p-5 border border-white/5 hover:bg-white/[0.08] transition-all">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <b.icon className="w-5 h-5 text-primary-light" />
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm mb-1">{b.title}</h4>
                <p className="text-xs text-white/40 leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison bar */}
        <div className="mt-16 bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-10">
          <h3 className="text-xl font-bold text-white text-center mb-8">Manual vs DRISHTI Processing</h3>
          <div className="space-y-6 max-w-3xl mx-auto">
            {[
              { label: 'Processing Speed', manual: '15 min/doc', drishti: '< 2 sec/doc', manualWidth: 12, drishtiWidth: 95 },
              { label: 'Data Accuracy', manual: '85-90%', drishti: '98.5%+', manualWidth: 55, drishtiWidth: 98 },
              { label: 'Cost per Document', manual: '₹50-100', drishti: '₹2-5', manualWidth: 80, drishtiWidth: 15 },
              { label: 'Scalability', manual: 'Limited', drishti: 'Unlimited', manualWidth: 25, drishtiWidth: 100 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-white/70 font-medium">{item.label}</span>
                  <div className="flex items-center gap-6 text-xs">
                    <span className="text-white/30">Manual: {item.manual}</span>
                    <span className="text-primary font-semibold">DRISHTI: {item.drishti}</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-white/20 rounded-full transition-all duration-1000" style={{ width: `${item.manualWidth}%` }} />
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary-dark to-primary rounded-full transition-all duration-1000" style={{ width: `${item.drishtiWidth}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
