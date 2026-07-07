'use client';

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  align?: 'center' | 'left';
}

export function SectionHeading({
  badge,
  title,
  description,
  children,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={`mb-12 sm:mb-16 ${
        align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'
      }`}
    >
      {badge && (
        <span
          className={`inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-700 ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {badge}
        </span>
      )}
      <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed">
          {description}
        </p>
      )}
      {children}
    </motion.div>
  );
}
