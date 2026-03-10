import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#users', label: 'Use Cases' },
];

const scrollToSection = (href: string) => {
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll for premium navbar effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
    setMobileMenu(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#0A231A] shadow-lg py-1.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#2D5444] flex items-center justify-center shadow-lg shadow-[#2D5444]/10">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">DRISHTI</span>
          </div>

          {/* Desktop nav links - Centered */}
          <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[15px] font-medium text-white hover:text-white transition cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              to="/dashboard"
              className="text-[15px] font-medium text-white hover:text-white/80 transition"
            >
              Sign In
            </Link>
            <a
              href="http://localhost:8501"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#2D5444] hover:bg-[#1b3a2f] text-white font-bold px-8 py-2.5 rounded-xl shadow-lg shadow-[#2D5444]/10 transition-all text-[15px]"
            >
              Start Free
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white/70"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenu && (
        <div className="md:hidden bg-primary-deep border-t border-white/10 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block text-sm text-white/60 hover:text-white cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <a
            href="http://localhost:8501"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center text-sm font-medium text-white bg-[#2D5444] px-5 py-2.5 rounded-lg"
          >
            Start Free
          </a>
        </div>
      )}
    </nav>
  );
}
