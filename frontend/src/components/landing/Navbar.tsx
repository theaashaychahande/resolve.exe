import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Menu, X, ArrowRight } from 'lucide-react';

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
      ? 'bg-primary-deep/95 backdrop-blur-lg border-b border-white/10 shadow-lg py-1'
      : 'bg-primary-deep/80 backdrop-blur-md border-b border-white/5 py-2'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <FileText className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">DRISHTI</span>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-white/60 hover:text-white dark:text-gray-300 dark:hover:text-white transition cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/dashboard"
              className="text-sm font-medium text-white/70 hover:text-white dark:text-gray-300 dark:hover:text-white transition px-4 py-2"
            >
              Sign In
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary-dark text-white font-bold px-5 py-2.5 rounded-lg shadow-lg shadow-primary/25 transition-all text-sm"
            >
              Try It Now — Free <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white/70 dark:text-gray-300"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenu && (
        <div className="md:hidden bg-primary-deep dark:bg-gray-900 border-t border-white/10 dark:border-gray-700/50 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block text-sm text-white/60 hover:text-white dark:text-gray-300 dark:hover:text-white cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/dashboard"
            className="block w-full text-center text-sm font-medium text-white bg-primary px-5 py-2.5 rounded-lg"
          >
            Start Free
          </Link>
        </div>
      )}
    </nav>
  );
}
