import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
  Share2,
  MessageSquareShare,
} from 'lucide-react';

const footerLinks = {
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Careers', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Press Kit', href: '#' },
  ],
  product: [
    { label: 'Features Grid', href: '#features' },
    { label: 'Modules Showcase', href: '#modules' },
    { label: 'Architecture Specs', href: '#about' },
    { label: 'Release Notes', href: '#' },
  ],
  solutions: [
    { label: 'Discrete Manufacturing', href: '#solutions' },
    { label: 'Chemical Processing', href: '#solutions' },
    { label: 'Wall Putty Production', href: '#solutions' },
    { label: 'FMCG Distribution', href: '#solutions' },
  ],
  industries: [
    { label: 'Heavy Manufacturing', href: '#industries' },
    { label: 'Retail & Outlets', href: '#industries' },
    { label: 'Warehousing Hubs', href: '#industries' },
    { label: 'Construction Materials', href: '#industries' },
  ],
  resources: [
    { label: 'Documentation', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'System Status', href: '#' },
    { label: 'Integrations', href: '#' },
  ],
};

const socialLinks = [
  { icon: Globe, href: '#', label: 'Website' },
  { icon: ExternalLink, href: '#', label: 'Blog' },
  { icon: Share2, href: '#', label: 'Social' },
  { icon: MessageSquareShare, href: '#', label: 'Community' },
];

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 border-t border-gray-900">
      <div className="container-main px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 lg:gap-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <div className="flex-shrink-0 w-10 h-10 bg-[#3A6582] rounded-lg flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 transition-transform duration-300">
                <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Left vertical of N */}
                  <path d="M6 5H10V23H6V5Z" fill="#EAEAEA" />
                  {/* Diagonal of N */}
                  <path d="M6 5H10L20 23H16L6 5Z" fill="#E06A24" />
                  {/* Shared middle vertical of N & K */}
                  <path d="M20 5H24V23H20V5Z" fill="#EAEAEA" />
                  {/* K top slant */}
                  <path d="M24 14L29.5 5H34.5L27.5 15.5L24 14Z" fill="#EAEAEA" />
                  {/* K bottom slant */}
                  <path d="M25.5 13.5L34.5 23H29.5L23 15.5L25.5 13.5Z" fill="#EAEAEA" />
                  {/* Lowercase tech text */}
                  <text x="20" y="34" fill="#EAEAEA" fontSize="9.5" fontFamily="var(--font-sans), sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="0.8">tech</text>
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white select-none">
                <span className="font-extrabold">Enterprises</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs mb-6 text-gray-500 font-normal">
              NKTech Enterprise Platform — a unified ERP solution for modern
              manufacturing, distribution, and service enterprises.
            </p>

            {/* Contact info */}
            <div className="space-y-3 text-sm mb-8 font-medium">
              <div className="flex items-center gap-2.5 hover:text-white transition-colors duration-250 cursor-pointer">
                <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span>contact@nktech.com</span>
              </div>
              <div className="flex items-center gap-2.5 hover:text-white transition-colors duration-250 cursor-pointer">
                <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span>089208 77101</span>
              </div>
              <div className="flex items-start gap-2.5 hover:text-white transition-colors duration-250 cursor-pointer">
                <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                <span>3rd Floor, ITHUM TOWER, 307B, A A-40, Sector 62, Noida, Uttar Pradesh 201301</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-5">
                {title.charAt(0).toUpperCase() + title.slice(1)}
              </h3>
              <ul className="space-y-3 font-normal text-sm">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-500 hover:text-white transition-colors duration-250"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-900/80 mt-6 pt-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright, Privacy & Terms */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-600 font-medium">
              <span>&copy; {new Date().getFullYear()} NKTech. All rights reserved.</span>
              <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-400 transition-colors">Terms & Conditions</a>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl bg-gray-900 border border-gray-800/60 hover:bg-brand-600 text-gray-500 hover:text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
