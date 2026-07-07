'use client';

import { motion } from 'framer-motion';
import {
  KeyRound,
  ShieldAlert,
  Package,
  Warehouse,
  Factory,
  ShoppingCart,
  Receipt,
  Truck,
  DollarSign,
  ArrowDown,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';

const steps = [
  { icon: KeyRound, title: 'Identity', description: 'Centralize user accounts and authentication credentials' },
  { icon: ShieldAlert, title: 'IAM', description: 'Configure granular roles, scopes, and permissions' },
  { icon: Package, title: 'Product', description: 'Define catalog items, assemblies, and BOM definitions' },
  { icon: Warehouse, title: 'Inventory', description: 'Manage raw materials, lot batches, and zone levels' },
  { icon: Factory, title: 'Manufacturing', description: 'Route work orders and record shop floor diagnostics' },
  { icon: ShoppingCart, title: 'Purchase', description: 'Handle vendor procurement cycles and RFQs' },
  { icon: Receipt, title: 'Sales', description: 'Process customer quotations and sales contracts' },
  { icon: Truck, title: 'Dispatch', description: 'Track shipping logs and fulfillment dispatch runs' },
  { icon: DollarSign, title: 'Finance', description: 'Reconcile automated general ledgers and invoicing' },
];

export function Workflow() {
  return (
    <section className="section-padding bg-gray-50/20">
      <div className="container-main px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Platform Architecture"
          title="Seamless Modular Flow"
          description="NKTech Enterprises connects modules dynamically, passing secure transactional contexts from core identities down to financial summaries."
        />

        <div className="relative max-w-5xl mx-auto mt-16">
          {/* Central Timeline Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-8 w-0.5 bg-gradient-to-b from-brand-500 via-indigo-400 to-brand-200 -translate-x-1/2" />

          <div className="space-y-12 relative">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={step.title}
                  className={`flex flex-col md:flex-row items-stretch md:items-center relative ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node Icon/Dot */}
                  <div className="absolute left-6 md:left-1/2 top-6 md:top-1/2 w-8 h-8 rounded-full bg-white border-2 border-brand-500 shadow-md -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-600 animate-pulse" />
                  </div>

                  {/* Card Block */}
                  <div className="w-full md:w-[calc(50%-2rem)] ml-14 md:ml-0">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.6, delay: i * 0.05 }}
                      className="bg-white rounded-2xl border border-gray-150 p-6 shadow-sm hover:shadow-card-hover transition-all duration-300 hover:border-brand-500/20 group cursor-default"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-50/80 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-all duration-350 shadow-inner">
                          <step.icon className="w-5.5 h-5.5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1.5">
                            <span className="text-[10px] font-bold text-brand-600 bg-brand-50 border border-brand-100 px-2 py-0.5 rounded-full">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <h3 className="text-base font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-500 leading-relaxed font-normal">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Horizontal line connector for desktop */}
                  <div className="hidden md:block w-8" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
