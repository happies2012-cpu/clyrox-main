import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import LanguageSelector from './LanguageSelector';
import SearchBar from './SearchBar';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDashboardClick = () => {
    // Always navigate to admin dashboard
    navigate('/admin/dashboard');
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Career', href: '/career' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  // Close mobile menu when pressing Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-xl bg-slate-900/80 shadow-lg' : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a 
            href="/" 
            className="flex items-center"
            aria-label="Clyrox Home"
          >
            <img 
              src="/clyrox.jpg" 
              alt="Clyrox Logo" 
              className="h-10" 
              fetchPriority="high"
            />
          </a>

          <div className="hidden md:flex items-center gap-4">
            <SearchBar />
            <div className="flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-white/90 hover:text-white transition-colors relative group focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
                  aria-label={`Go to ${item.label} page`}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full group-focus:w-full" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <LanguageSelector />
              <DarkModeToggle />
              <button
                onClick={handleDashboardClick}
                className="backdrop-blur-xl bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-semibold border border-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Go to dashboard"
              >
                Dashboard
              </button>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <DarkModeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="backdrop-blur-xl bg-white/10 p-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-controls="mobile-menu"
              >
                {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden backdrop-blur-xl bg-slate-900/95 border-t border-white/10"
            id="mobile-menu"
            role="navigation"
          >
            <div className="p-4 border-b border-white/10">
              <SearchBar />
            </div>
            <nav className="flex flex-col px-6 py-4 gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-white/90 hover:text-white transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
                  aria-label={`Go to ${item.label} page`}
                >
                  {item.label}
                </a>
              ))}
              <div className="border-t border-white/20 pt-4 mt-2 flex flex-col gap-4">
                <button 
                  onClick={() => {
                    handleDashboardClick();
                    setIsOpen(false);
                  }} 
                  className="text-white/90 hover:text-white transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
                  aria-label="Go to dashboard"
                >
                  Dashboard
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}