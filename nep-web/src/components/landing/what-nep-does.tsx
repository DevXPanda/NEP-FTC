'use client';

import {
  Factory,
  Package,
  ShoppingCart,
  DollarSign,
  Users,
  UserCircle,
  Truck,
  TrendingUp,
  ClipboardCheck,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { AnimatedCard } from '@/components/ui/animated-card';

const capabilities = [
  {
    icon: Factory,
    title: 'Manufacturing',
    description: 'Plan, schedule, and track production processes with real-time visibility across your shop floor.',
  },
  {
    icon: Package,
    title: 'Inventory',
    description: 'Manage stock levels, warehouses, and material flow with automatic reorder point tracking.',
  },
  {
    icon: ShoppingCart,
    title: 'Purchase',
    description: 'Streamline procurement with vendor management, purchase orders, and approval workflows.',
  },
  {
    icon: Truck,
    title: 'Sales & Dispatch',
    description: 'Handle sales orders, dispatch schedules, and delivery tracking from quote to fulfillment.',
  },
  {
    icon: ClipboardCheck,
    title: 'Quality',
    description: 'Ensure product quality with inspection checklists, non-conformance reports, and audit trails.',
  },
  {
    icon: DollarSign,
    title: 'Finance',
    description: 'Complete financial management with ledgers, invoicing, tax compliance, and reporting.',
  },
  {
    icon: Users,
    title: 'Human Resources',
    description: 'Manage employees, attendance, payroll, and organizational hierarchy in one place.',
  },
  {
    icon: UserCircle,
    title: 'Customers',
    description: 'Track customer relationships, communication history, and satisfaction metrics.',
  },
  {
    icon: Truck,
    title: 'Vendors',
    description: 'Maintain vendor profiles, performance ratings, contracts, and payment terms.',
  },
  {
    icon: TrendingUp,
    title: 'Analytics',
    description: 'Interactive dashboards and reports providing real-time insights across every business function.',
  },
];

export function WhatNepDoes() {
  return (
    <section id="about" className="section-padding bg-gray-50/30">
      <div className="container-main px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Platform Overview"
          title="Unifying the Modern Enterprise"
          description="NKTech Enterprises unifies manufacturing, inventory, purchasing, sales, finance, human resources, quality control, customers, vendors, and business analytics inside a single enterprise-ready ecosystem."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {capabilities.map((cap, i) => (
            <AnimatedCard
              key={cap.title}
              delay={i * 0.03}
              className="p-5 sm:p-6 group hover:border-brand-500/20 hover:shadow-card-hover transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-brand-50/80 text-brand-600 flex items-center justify-center mb-4.5 group-hover:bg-brand-600 group-hover:text-white transition-all duration-350 shadow-inner group-hover:shadow-md group-hover:shadow-brand-600/10">
                <cap.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">
                {cap.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-normal">
                {cap.description}
              </p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
