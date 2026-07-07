'use client';

import {
  TrendingUp,
  Settings,
  Activity,
  GitBranch,
  Users2,
  FileCheck,
  Eye,
  TrendingDown,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { AnimatedCard } from '@/components/ui/animated-card';

const benefits = [
  {
    icon: TrendingDown,
    title: 'Reduce Manual Work',
    description: 'Automate repetitive workflows, invoicing, and inventory updates, reducing manual entry errors by up to 90%.',
  },
  {
    icon: Settings,
    title: 'Improve Productivity',
    description: 'Ensure teams collaborate on a single system of record, eliminating cross-department coordination lag.',
  },
  {
    icon: Activity,
    title: 'Real-Time Decision Making',
    description: 'Monitor key KPIs across production output, sales pipelines, and cash balances as they update live.',
  },
  {
    icon: GitBranch,
    title: 'Centralized Operations',
    description: 'Manage sales, procurement, production, inventory, and finance without transferring data between platforms.',
  },
  {
    icon: Users2,
    title: 'Better Collaboration',
    description: 'Share orders, engineering bills of material (BOM), and dispatch documents seamlessly across departments.',
  },
  {
    icon: FileCheck,
    title: 'Faster Reporting',
    description: 'Compile tax audits, quarterly P&L sheets, and operational summaries in minutes rather than days.',
  },
  {
    icon: Eye,
    title: 'Operational Transparency',
    description: 'Gain full end-to-end traceability of inventory items, purchase requisitions, and active work orders.',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Growth',
    description: 'Add legal entities, warehouses, and production facilities within a multi-tenant framework built to scale.',
  },
];

export function BusinessBenefits() {
  return (
    <section id="solutions" className="section-padding bg-gray-50/30">
      <div className="container-main px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Business Benefits"
          title="Drive Direct Bottom-Line Results"
          description="NKTech Enterprises replaces fragmented software solutions with a single platform optimized to deliver business outcomes and financial efficiency."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {benefits.map((ben, i) => (
            <AnimatedCard
              key={ben.title}
              delay={i * 0.04}
              className="p-6 sm:p-8 group cursor-default hover:border-brand-500/20 hover:shadow-card-hover transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-50/80 text-brand-600 flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-all duration-350 shadow-inner group-hover:shadow-md group-hover:shadow-brand-600/10">
                <ben.icon className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2.5 group-hover:text-brand-600 transition-colors">
                {ben.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed font-normal">
                {ben.description}
              </p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
