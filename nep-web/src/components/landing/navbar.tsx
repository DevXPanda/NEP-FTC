'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Modules', href: '#modules' },
  { label: 'Industries', href: '#industries' },
  { label: 'Resources', href: '#solutions' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/75 backdrop-blur-lg border-b border-gray-200/50 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-main flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
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
          <span className="text-xl font-bold tracking-tight text-gray-900 select-none">
            <span className="text-[#1E384D] font-extrabold">Enterprises</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-3.5 py-1.5 text-sm font-medium text-gray-600 hover:text-brand-600 rounded-lg transition-colors group"
            >
              <span className="relative z-10">{link.label}</span>
              <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-brand-600 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            </a>
          ))}
        </div>

        {/* Desktop Login & CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-3.5 py-1.5 text-sm font-medium text-gray-600 hover:text-brand-600 rounded-lg transition-colors duration-[250ms]"
          >
            Login
          </Link>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-4.5 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-[10px] transition-all duration-[250ms] shadow-sm hover:shadow-md hover:shadow-brand-600/10 hover:-translate-y-0.5"
          >
            Request Demo
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100/80 transition-colors"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden fixed inset-x-0 top-16 bg-white/95 backdrop-blur-xl border-b border-gray-200/60 shadow-lg overflow-hidden z-40"
          >
            <div className="px-4 py-5 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-brand-600 hover:bg-brand-50/50 rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 mt-2 border-t border-gray-100 space-y-2">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-[10px] transition-colors duration-[250ms]"
                >
                  Login
                </Link>
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-4 py-3 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-[10px] transition-all duration-[250ms] shadow-sm"
                >
                  Request Demo
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
