import { FileText, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';

const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Use Cases', href: '#users' },
    { label: 'API Documentation', href: '#' },
    { label: 'Integrations', href: '#' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press Kit', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Partners', href: '#' },
  ],
  Resources: [
    { label: 'Documentation', href: '#' },
    { label: 'Tutorials', href: '#' },
    { label: 'Community', href: '#' },
    { label: 'Status Page', href: '#' },
    { label: 'Changelog', href: '#' },
    { label: 'Help Center', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Security', href: '#' },
    { label: 'GDPR', href: '#' },
    { label: 'Data Processing', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: 'linear-gradient(135deg, #0F3D2E 0%, #0E5F4B 100%)' }}>
      {/* Newsletter section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-bold text-white mb-2">Stay updated with DRISHTI</h3>
              <p className="text-sm text-white/40">Get the latest product updates, industry insights, and tips delivered to your inbox.</p>
            </div>
            <div className="flex w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white/10 border border-white/10 rounded-l-xl px-5 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/50 transition"
              />
              <button className="bg-primary hover:bg-[#1ea34e] text-white font-semibold px-6 py-3.5 rounded-r-xl transition-colors flex items-center gap-2 text-sm">
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand column — spans 2 cols */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">DRISHTI</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              AI Powered Document Intelligence Platform. Transform physical documents into structured digital data using cutting-edge OCR and NLP technology.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-white/40">
                <Mail className="w-4 h-4 text-primary-light/60" />
                <span>hello@drishti.ai</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/40">
                <Phone className="w-4 h-4 text-primary-light/60" />
                <span>+91 22 4000 5000</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/40">
                <MapPin className="w-4 h-4 text-primary-light/60" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {[
                { label: 'X', href: '#' },
                { label: 'in', href: '#' },
                { label: 'GH', href: '#' },
                { label: 'YT', href: '#' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition text-xs font-bold"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white mb-5 text-sm">{title}</h4>
              <ul className="space-y-3 text-sm text-white/40">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="hover:text-white transition">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/25">© 2024 DRISHTI Technologies Pvt. Ltd. All rights reserved.</p>
            <div className="flex items-center gap-6 text-xs text-white/25">
              <a href="#" className="hover:text-white/50 transition">Privacy</a>
              <a href="#" className="hover:text-white/50 transition">Terms</a>
              <a href="#" className="hover:text-white/50 transition">Cookies</a>
              <a href="#" className="hover:text-white/50 transition">Security</a>
            </div>
            <p className="text-xs text-white/25">
              Built with ❤️ in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
