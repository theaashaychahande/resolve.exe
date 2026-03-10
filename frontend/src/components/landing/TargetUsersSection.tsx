import { Building2, GraduationCap, Landmark, Briefcase, Scale, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

const users = [
  {
    icon: Building2,
    name: 'Hospitals & Healthcare',
    desc: 'Digitize patient records, prescriptions, lab reports, and insurance claims. Reduce paperwork and improve patient care with instant data access.',
    docs: ['Patient Records', 'Prescriptions', 'Lab Reports', 'Insurance Claims'],
    stat: '40% faster patient onboarding',
    color: '#1F7A63',
  },
  {
    icon: GraduationCap,
    name: 'Schools & Education',
    desc: 'Process mark sheets, certificates, admission forms, and transfer documents. Automate student record management across institutions.',
    docs: ['Mark Sheets', 'Certificates', 'Admission Forms', 'Transfer Documents'],
    stat: '60% reduction in admin time',
    color: '#3B82F6',
  },
  {
    icon: Landmark,
    name: 'Government Offices',
    desc: 'Handle identity documents, land records, permits, and official filings. Enable digital governance with automated document processing.',
    docs: ['Aadhaar Cards', 'Land Records', 'Permits', 'Official Filings'],
    stat: '10x faster public services',
    color: '#F59E0B',
  },
  {
    icon: Briefcase,
    name: 'Businesses & Enterprises',
    desc: 'Process invoices, contracts, purchase orders, and financial documents. Streamline accounts payable and vendor management workflows.',
    docs: ['Invoices', 'Contracts', 'Purchase Orders', 'Tax Documents'],
    stat: '80% cost reduction in data entry',
    color: '#8B5CF6',
  },
  {
    icon: Scale,
    name: 'Legal Departments',
    desc: 'Extract data from legal notices, court orders, agreements, and compliance documents. Accelerate legal research and case preparation.',
    docs: ['Legal Notices', 'Court Orders', 'Agreements', 'Compliance Docs'],
    stat: '3x faster case preparation',
    color: '#EF4444',
  },
];

export default function TargetUsersSection() {
  return (
    <section id="users" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Use Cases"
          title="Built for Every Industry"
          description="DRISHTI serves organizations of all sizes across multiple sectors. See how different industries benefit from AI-powered document intelligence."
        />

        <div className="space-y-6">
          {users.map((u, i) => (
            <div
              key={i}
              className="group bg-white border border-gray-100 rounded-2xl p-6 lg:p-8 hover:shadow-xl hover:border-gray-200 transition-all duration-300 overflow-hidden relative"
            >
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-40 h-40 rounded-bl-full opacity-[0.03] transition-opacity group-hover:opacity-[0.06]" style={{ background: u.color }} />
              
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Icon & Title */}
                <div className="flex items-center gap-5 lg:w-72 flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ background: u.color }}>
                    <u.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-dark">{u.name}</h3>
                    <p className="text-xs font-semibold mt-1" style={{ color: u.color }}>{u.stat}</p>
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{u.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {u.docs.map((d) => (
                      <span key={d} className="text-[10px] font-medium bg-primary-soft text-gray-900 px-3 py-1.5 rounded-full border border-gray-100">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden lg:flex items-center flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary-soft flex items-center justify-center group-hover:bg-primary-dark group-hover:text-white text-gray transition-all">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
