'use client';

import { motion } from 'framer-motion';

const companies = [
  {
    name: 'ABC Industries',
    color: 'text-blue-600',
    logo: (
      <svg className="w-5.5 h-5.5 mr-2 text-blue-500 group-hover:scale-105 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      </svg>
    ),
  },
  {
    name: 'Horizon Labs',
    color: 'text-amber-600',
    logo: (
      <svg className="w-5.5 h-5.5 mr-2 text-amber-500 group-hover:scale-105 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    name: 'NextGen Systems',
    color: 'text-indigo-600',
    logo: (
      <svg className="w-5.5 h-5.5 mr-2 text-indigo-500 group-hover:scale-105 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
      </svg>
    ),
  },
  {
    name: 'Prime Logistics',
    color: 'text-teal-600',
    logo: (
      <svg className="w-5.5 h-5.5 mr-2 text-teal-500 group-hover:scale-105 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    name: 'Zenith Global',
    color: 'text-emerald-600',
    logo: (
      <svg className="w-5.5 h-5.5 mr-2 text-emerald-500 group-hover:scale-105 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
      </svg>
    ),
  },
  {
    name: 'Summit Corp',
    color: 'text-rose-600',
    logo: (
      <svg className="w-5.5 h-5.5 mr-2 text-rose-500 group-hover:scale-105 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
      </svg>
    ),
  },
  {
    name: 'Quantum Dist',
    color: 'text-cyan-600',
    logo: (
      <svg className="w-5.5 h-5.5 mr-2 text-cyan-500 group-hover:scale-105 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  {
    name: 'Apex Networks',
    color: 'text-violet-600',
    logo: (
      <svg className="w-5.5 h-5.5 mr-2 text-violet-500 group-hover:scale-105 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

export function TrustedBy() {
  return (
    <section className="py-10 bg-gray-50/50 border-y border-gray-150/60 overflow-hidden">
      <div className="container-main px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6"
        >
          Illustrative Fictional Enterprise Deployments
        </motion.p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 md:gap-8 items-center justify-items-center">
          {companies.map((comp, i) => (
            <motion.div
              key={comp.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="flex items-center justify-center opacity-65 hover:opacity-100 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center text-xs font-bold select-none font-sans">
                {comp.logo}
                <span className={`whitespace-nowrap transition-colors duration-300 ${comp.color} tracking-wider`}>
                  {comp.name.split(' ')[0]}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
