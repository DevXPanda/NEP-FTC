'use client';

import { motion } from 'framer-motion';
import {
  KeyRound,
  Boxes,
  Factory,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  LineChart,
  BrainCircuit,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';

const roadmapSteps = [
  {
    phase: 'Phase 1',
    title: 'Identity & Security',
    description: 'Establish enterprise multi-tenancy, JWT-based security, and access controls.',
    icon: KeyRound,
    status: 'Released',
    badgeColor: 'bg-green-50 text-green-700 border-green-200',
  },
  {
    phase: 'Phase 2',
    title: 'Inventory & Materials',
    description: 'Deploy real-time warehouse inventory, material tracking, and stock flow logs.',
    icon: Boxes,
    status: 'Released',
    badgeColor: 'bg-green-50 text-green-700 border-green-200',
  },
  {
    phase: 'Phase 3',
    title: 'Manufacturing Execution',
    description: 'Introduce work order planning, routing metrics, and shop floor diagnostics.',
    icon: Factory,
    status: 'In Progress',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    phase: 'Phase 4',
    title: 'Procurement & Sales',
    description: 'Launch purchasing requests, vendor tracking, sales workflows, and dispatch.',
    icon: ShoppingCart,
    status: 'Q3 2026',
    badgeColor: 'bg-gray-100 text-gray-700 border-gray-200',
  },
  {
    phase: 'Phase 5',
    title: 'Unified Finance & Ledger',
    description: 'Centralize general ledgers, accounts payable/receivable, invoicing, and tax.',
    icon: DollarSign,
    status: 'Q4 2026',
    badgeColor: 'bg-gray-100 text-gray-700 border-gray-200',
  },
  {
    phase: 'Phase 6',
    title: 'CRM & Client Pipeline',
    description: 'Incorporate contact lifecycle management, quotation flows, and client scoring.',
    icon: TrendingUp,
    status: 'Q1 2027',
    badgeColor: 'bg-gray-100 text-gray-700 border-gray-200',
  },
  {
    phase: 'Phase 7',
    title: 'Analytics & Dashboards',
    description: 'Build robust visual charts, real-time KPI engines, and custom summaries.',
    icon: LineChart,
    status: 'Q2 2027',
    badgeColor: 'bg-gray-100 text-gray-700 border-gray-200',
  },
  {
    phase: 'Phase 8',
    title: 'AI Business Intelligence',
    description: 'Leverage predictive material restocking forecasts and demand forecasting models.',
    icon: BrainCircuit,
    status: 'Q3 2027',
    badgeColor: 'bg-gray-100 text-gray-700 border-gray-200',
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="section-padding bg-white">
      <div className="container-main px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Product Vision"
          title="Platform Roadmap"
          description="NKTech Enterprises is built on a long-term, phased architectural evolution blueprint. See our scheduled modular capabilities."
        />

        <div className="relative max-w-3xl mx-auto pl-6 sm:pl-8 mt-12">
          {/* Glowing vertical line */}
          <div className="absolute left-0 top-2 bottom-6 w-0.5 bg-gradient-to-b from-brand-500 via-indigo-400 to-gray-200" />

          {roadmapSteps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.04 }}
              className="relative mb-10 last:mb-0 pl-6 sm:pl-8"
            >
              {/* Bullet icon */}
              <span className="absolute -left-[37px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-white text-brand-600 border border-brand-200 shadow-md z-10 hover:border-brand-500 hover:text-brand-700 transition-colors">
                <step.icon className="w-4 h-4" />
              </span>

              {/* Step Card */}
              <div className="bg-white rounded-2xl border border-gray-150 p-6 shadow-sm hover:shadow-card-hover hover:border-brand-500/20 transition-all duration-300 group cursor-default">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-brand-600 bg-brand-50 border border-brand-100 px-2.5 py-0.5 rounded-full">
                      {step.phase}
                    </span>
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
                      {step.title}
                    </h3>
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${step.badgeColor}`}>
                    {step.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
