import { Star, Quote } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

const testimonials = [
  {
    name: 'Dr. Rajesh Sharma',
    role: 'Chief Medical Officer',
    org: 'City Hospital, Mumbai',
    avatar: 'RS',
    color: '#1F7A63',
    rating: 5,
    text: 'DRISHTI has transformed how we handle patient records. What used to take our staff 30 minutes per patient now takes seconds. The accuracy of data extraction from prescriptions and lab reports is remarkable.',
    stat: '30 min → 2 sec',
    statLabel: 'Per patient record',
  },
  {
    name: 'Priya Deshmukh',
    role: 'District Collector',
    org: 'Pune District Office',
    avatar: 'PD',
    color: '#3B82F6',
    rating: 5,
    text: 'Processing land records and citizen applications was our biggest bottleneck. With DRISHTI, we\'ve digitized over 50,000 documents in just 3 months. The multilingual support for Marathi documents is excellent.',
    stat: '50,000+',
    statLabel: 'Documents digitized',
  },
  {
    name: 'Amit Kulkarni',
    role: 'Finance Director',
    org: 'TechServe Solutions',
    avatar: 'AK',
    color: '#F59E0B',
    rating: 5,
    text: 'Our accounts team processes hundreds of invoices daily. DRISHTI extracts all key fields — vendor name, amounts, GST numbers — with 99% accuracy. It has reduced our invoice processing cost by 75%.',
    stat: '75%',
    statLabel: 'Cost reduction',
  },
  {
    name: 'Advocate Sunita Rao',
    role: 'Senior Partner',
    org: 'Rao & Associates Law Firm',
    avatar: 'SR',
    color: '#8B5CF6',
    rating: 5,
    text: 'Legal document processing requires extreme precision. DRISHTI handles court orders, agreements, and affidavits with impressive accuracy. Our case preparation time has been cut by half.',
    stat: '50%',
    statLabel: 'Faster case prep',
  },
  {
    name: 'Prof. Meena Iyer',
    role: 'Registrar',
    org: 'National University, Delhi',
    avatar: 'MI',
    color: '#EF4444',
    rating: 5,
    text: 'During admissions season, we receive thousands of certificates and mark sheets. DRISHTI processes them all automatically — verifying details, extracting grades, and populating our database seamlessly.',
    stat: '5,000+',
    statLabel: 'Admissions processed/season',
  },
  {
    name: 'Vikram Joshi',
    role: 'CTO',
    org: 'DataPrime Analytics',
    avatar: 'VJ',
    color: '#0F3D2E',
    rating: 5,
    text: 'The API integration was seamless. We embedded DRISHTI into our existing workflow in under a day. The JSON output is clean, well-structured, and exactly what our downstream systems need.',
    stat: '< 1 day',
    statLabel: 'Integration time',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32 bg-primary-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Testimonials"
          title="Trusted by Industry Leaders"
          description="See how organizations across India are transforming their document workflows with DRISHTI's AI-powered intelligence."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-gray-100 mb-4" />
              
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-gray leading-relaxed mb-6 flex-1">"{t.text}"</p>

              {/* Stat highlight */}
              <div className="bg-primary-soft rounded-xl p-4 mb-6">
                <p className="text-2xl font-extrabold text-black">{t.stat}</p>
                <p className="text-xs text-gray font-medium">{t.statLabel}</p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: t.color }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-black">{t.name}</p>
                  <p className="text-xs text-gray">{t.role}</p>
                  <p className="text-[10px] text-primary-dark font-medium">{t.org}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
