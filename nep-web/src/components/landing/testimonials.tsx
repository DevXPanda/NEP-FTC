'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';

const testimonials = [
  {
    quote:
      'NKTech Enterprises completely unified our operations. The transition from our siloed legacy database to their modular ERP allowed us to streamline manufacturing scheduling and material flow. Production bottlenecks dropped by 34% in the first quarter alone.',
    name: 'Rajesh Mehta',
    role: 'Chief Operating Officer',
    company: 'ABC Manufacturing Pvt. Ltd.',
    initials: 'RM',
  },
  {
    quote:
      'We managed our retail networks and multi-warehouse logistics from separate systems. NKTech Enterprises\' multi-tenant capability centralized all companies under a single platform. We now get consolidated financial reports instantly.',
    name: 'Sarah Chen',
    role: 'VP of Technology',
    company: 'Horizon Industries',
    initials: 'SC',
  },
  {
    quote:
      'NKTech Enterprises\' modular API-first architecture was simple to integrate with our custom dispatch interfaces. Our shipping turnarounds improved by 40% with zero downtime during migration. Outstanding enterprise-grade reliability.',
    name: 'Marcus Williams',
    role: 'Director of Operations',
    company: 'Zenith Engineering',
    initials: 'MW',
  },
];

export function Testimonials() {
  return (
    <section className="section-padding bg-white">
      <div className="container-main px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Testimonials"
          title="Proven Enterprise Value"
          description="Read how market-leading enterprises use the NKTech Enterprises platform to run their businesses efficiently."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-gray-150 shadow-sm p-6 sm:p-8 flex flex-col hover:shadow-card-hover hover:border-brand-500/20 transition-all duration-300 group cursor-default"
            >
              <Quote className="w-8 h-8 text-brand-200 group-hover:text-brand-500 mb-4 flex-shrink-0 transition-colors duration-300" />
              <p className="text-gray-600 leading-relaxed flex-1 text-sm sm:text-base font-normal">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-100">
                <div className="w-11 h-11 rounded-full bg-brand-50 text-brand-700 border border-brand-100 flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-inner">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
                    {t.name}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">
                    {t.role}, <span className="text-gray-600 font-semibold">{t.company}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
