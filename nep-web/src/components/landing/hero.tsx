'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  display: 'swap',
});

export function Hero() {
  return (
    <section
      id="home"
      className={`${inter.className} relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient pt-36 pb-24`}
    >
      {/* Background decoration: light gradients + blurred circles + geometric lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Blurred circles */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-200/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-indigo-200/20 rounded-full blur-[140px]" />
        <div className="absolute -top-40 right-10 w-[400px] h-[400px] bg-cyan-100/25 rounded-full blur-[100px]" />
        
        {/* Subtle geometric lines / grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container-main px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-[1250px] mx-auto flex flex-col items-center">
          
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[42px] sm:text-[60px] lg:text-[76px] xl:text-[80px] font-bold tracking-tighter text-gray-900 leading-[1.08] max-w-[1050px] mx-auto text-center"
          >
            Transform Your Enterprise with One Unified Platform
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 text-[16px] md:text-[18px] lg:text-[22px] text-gray-600 leading-[1.7] max-w-[700px] mx-auto font-normal"
          >
            NKTech Enterprises seamlessly integrates Manufacturing, Inventory, Sales, Finance, HR, Procurement, and Real-Time Analytics into a single, high-performance modular system built for scaling operations.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 px-9 py-4 text-base font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-[10px] shadow-sm hover:shadow-md hover:shadow-brand-600/10 hover:-translate-y-0.5 transition-all duration-[250ms]"
            >
              Request Demo
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#modules"
              className="inline-flex items-center justify-center gap-2.5 px-9 py-4 text-base font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-200/80 rounded-[10px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-[250ms]"
            >
              Explore Platform
            </a>
          </motion.div>

          {/* Statistics Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-20 pt-10 border-t border-gray-200/40 w-full max-w-[800px] flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-16 md:gap-20"
          >
            {[
              { value: '14+', label: 'Integrated Modules' },
              { value: '99.99%', label: 'SLA Guarantee' },
              { value: '100%', label: 'Data Sovereignty' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center sm:items-start text-center sm:text-left group">
                <div className="text-3xl sm:text-4xl font-[900] text-gray-900 group-hover:text-brand-600 transition-colors tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-gray-500 mt-1 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
