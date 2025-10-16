import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const services = [
    { name: 'Business Consulting', href: '/services/business-consulting' },
    { name: 'Employment Consulting', href: '/services/employment-consulting' },
    { name: 'Visa Consulting', href: '/services/visa-consulting' },
    { name: 'Design & Development', href: '/services/design-development' },
    { name: 'Staffing Services', href: '/services/staffing-services' },
  ];

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Career', href: '/career' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="relative bg-slate-900 text-white" role="contentinfo">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="mb-6">
              <img src="/clyrox.jpg" alt="Clyrox Logo" className="h-12" />
            </div>
            <p className="text-white/70 mb-6">
              Your trusted partner for business consulting, employment solutions, visa services, and digital innovation.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="backdrop-blur-xl bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="backdrop-blur-xl bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="backdrop-blur-xl bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="backdrop-blur-xl bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.href}>
                  <a 
                    href={service.href} 
                    className="text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-white/70" />
                <span className="text-white/70">123 Business Street, Suite 100, City, State 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 text-white/70" />
                <a 
                  href="tel:+1234567890" 
                  className="text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 text-white/70" />
                <a 
                  href="mailto:info@clyrox.com" 
                  className="text-white/70 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
                >
                  info@clyrox.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} Clyrox. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a 
                href="/privacy-policy" 
                className="text-white/60 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
              >
                Privacy Policy
              </a>
              <a 
                href="/terms-of-service" 
                className="text-white/60 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}