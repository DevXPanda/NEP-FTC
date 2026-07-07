'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';

export function Cta() {
  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-main px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-85px' }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden bg-gradient-to-r from-brand-900 via-indigo-950 to-brand-950 rounded-3xl p-8 sm:p-12 lg:p-16 text-center border border-white/10"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-500/20 rounded-full blur-[100px]" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Ready to Transform Your Enterprise?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-blue-100 leading-relaxed font-normal opacity-90">
              Join hundreds of enterprises that trust NKTech Enterprises to power their operations.
              Schedule a personalized demo and see how NKTech Enterprises can streamline your business.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:contact@nktech.com"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-brand-900 bg-white hover:bg-brand-50 rounded-[10px] shadow-sm hover:shadow-md hover:shadow-white/5 hover:-translate-y-0.5 transition-all duration-[250ms]"
              >
                <Calendar className="w-5 h-5 text-brand-600" />
                Schedule a Demo
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white border-2 border-white/20 hover:border-white/55 hover:bg-white/5 rounded-[10px] hover:-translate-y-0.5 transition-all duration-[250ms]"
              >
                Contact Sales
              </a>
              <a
                href="#modules"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white/90 border border-white/10 hover:bg-white/5 rounded-[10px] hover:-translate-y-0.5 transition-all duration-[250ms] group"
              >
                Explore the Platform
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
