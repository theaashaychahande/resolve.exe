import { Link } from 'react-router-dom';
import { Check, HelpCircle, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'forever',
    desc: 'Perfect for individuals and small projects getting started with document processing.',
    features: [
      '50 documents / month',
      'Basic AI extraction',
      'English language only',
      'CSV export',
      'Email support',
      'Basic dashboard',
      '7-day data retention',
    ],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/ month',
    desc: 'For growing teams and businesses that need advanced extraction and multi-language support.',
    features: [
      '500 documents / month',
      'Advanced AI models',
      'English, Hindi & Marathi',
      'JSON & CSV export',
      'Priority email support',
      'Full analytics dashboard',
      'API access (1000 calls/mo)',
      'Custom field mapping',
      '90-day data retention',
      'Batch processing',
    ],
    cta: 'Start 14-Day Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/ month',
    desc: 'For large organizations with custom needs, compliance requirements, and high-volume processing.',
    features: [
      'Unlimited documents',
      'Custom AI models',
      'All languages supported',
      'All export formats + API',
      'Dedicated account manager',
      'Custom integrations',
      'Unlimited API calls',
      'SLA guarantee (99.9%)',
      'On-premise deployment',
      'Custom training & onboarding',
      'Unlimited data retention',
      'RBAC & audit logs',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const faqs = [
  {
    q: 'Can I switch plans anytime?',
    a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated.',
  },
  {
    q: 'What happens after the free trial?',
    a: 'After your 14-day Pro trial, you can continue with the Free plan or upgrade. No charges are applied without your consent.',
  },
  {
    q: 'Do you offer custom enterprise pricing?',
    a: 'Absolutely. For organizations processing more than 5,000 documents/month, we offer custom volume-based pricing. Contact our sales team.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. All data is encrypted with AES-256 at rest and TLS 1.3 in transit. We comply with GDPR and Indian data protection regulations.',
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Pricing"
          title="Simple, Transparent Pricing"
          description="Choose the plan that fits your needs. Start free, scale as you grow. All plans include core AI extraction capabilities."
        />

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
          {plans.map((p, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 flex flex-col ${
                p.popular
                  ? 'text-white shadow-2xl shadow-primary-deep/30 scale-[1.04] z-10'
                  : 'bg-white border border-gray-100 shadow-sm hover:shadow-xl'
              }`}
              style={
                p.popular
                  ? { background: 'linear-gradient(135deg, #0F3D2E 0%, #0E5F4B 50%, #1F7A63 100%)' }
                  : undefined
              }
            >
              {p.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-6 py-1.5 rounded-full shadow-lg shadow-primary/30">
                  Most Popular
                </span>
              )}

              <h3 className={`text-xl font-bold mb-1 ${p.popular ? 'text-white' : 'text-dark'}`}>
                {p.name}
              </h3>
              <p className={`text-sm mb-6 ${p.popular ? 'text-white/50' : 'text-gray'}`}>
                {p.desc}
              </p>

              <div className="flex items-baseline gap-1 mb-8">
                <span
                  className={`text-5xl font-extrabold ${p.popular ? 'text-white' : 'text-dark'}`}
                >
                  {p.price}
                </span>
                <span className={`text-sm ${p.popular ? 'text-white/50' : 'text-gray'}`}>
                  {p.period}
                </span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        p.popular ? 'bg-primary/20' : 'bg-primary/10'
                      }`}
                    >
                      <Check
                        className={`w-3 h-3 ${p.popular ? 'text-primary-light' : 'text-primary'}`}
                      />
                    </div>
                    <span className={p.popular ? 'text-white/80' : 'text-gray'}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/dashboard"
                className={`block text-center font-semibold py-4 rounded-xl transition-all text-sm ${
                  p.popular
                    ? 'bg-primary text-white hover:bg-[#1ea34e] shadow-lg shadow-primary/30'
                    : 'bg-primary-deep text-white hover:bg-primary-dark'
                }`}
              >
                {p.cta} {p.popular && <ArrowRight className="w-4 h-4 inline ml-1" />}
              </Link>
              
              {p.popular && (
                <p className="text-center text-[10px] text-white/40 mt-3">No credit card required</p>
              )}
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-dark text-center mb-8">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-primary-soft rounded-xl p-6 border border-gray-100">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-primary-dark flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-dark mb-2">{faq.q}</h4>
                    <p className="text-sm text-gray leading-relaxed">{faq.a}</p>
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
