'use client';

import {
  Package,
  UserCircle,
  Building2,
  Warehouse,
  Factory,
  ShoppingCart,
  ShieldCheck,
  Receipt,
  Truck,
  Wallet,
  Users,
  FileBarChart,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { AnimatedCard } from '@/components/ui/animated-card';

const modules = [
  {
    icon: Package,
    title: 'Product',
    description: 'Master product catalog, variants, BOMs, and categorization.',
    color: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600',
  },
  {
    icon: UserCircle,
    title: 'Customer',
    description: 'Customer profiles, contacts, communication, and credit limits.',
    color: 'bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600',
  },
  {
    icon: Building2,
    title: 'Vendor',
    description: 'Vendor profiles, ratings, contracts, and payment terms.',
    color: 'bg-rose-50 text-rose-600 group-hover:bg-rose-600',
  },
  {
    icon: Warehouse,
    title: 'Inventory',
    description: 'Multi-warehouse stock tracking, transfers, and cycle counts.',
    color: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600',
  },
  {
    icon: Factory,
    title: 'Manufacturing',
    description: 'Work orders, routing, shop floor control, and scheduling.',
    color: 'bg-orange-50 text-orange-600 group-hover:bg-orange-600',
  },
  {
    icon: ShoppingCart,
    title: 'Purchase',
    description: 'Vendor RFQs, purchase orders, approvals, and GRN tracking.',
    color: 'bg-violet-50 text-violet-600 group-hover:bg-violet-600',
  },
  {
    icon: ShieldCheck,
    title: 'Quality',
    description: 'Inspection plans, non-conformance reports, and audit trails.',
    color: 'bg-teal-50 text-teal-600 group-hover:bg-teal-600',
  },
  {
    icon: Receipt,
    title: 'Sales',
    description: 'Quotations, sales orders, pricing rules, and order tracking.',
    color: 'bg-pink-50 text-pink-600 group-hover:bg-pink-600',
  },
  {
    icon: Truck,
    title: 'Dispatch',
    description: 'Delivery scheduling, shipment tracking, and proof of delivery.',
    color: 'bg-amber-50 text-amber-600 group-hover:bg-amber-600',
  },
  {
    icon: Wallet,
    title: 'Finance',
    description: 'General ledger, AP/AR, invoicing, and tax management.',
    color: 'bg-green-50 text-green-600 group-hover:bg-green-600',
  },
  {
    icon: Users,
    title: 'HR',
    description: 'Employee records, attendance, payroll, and hierarchy.',
    color: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600',
  },
  {
    icon: FileBarChart,
    title: 'Reports',
    description: 'Custom dashboards, export capabilities, and business intelligence.',
    color: 'bg-sky-50 text-sky-600 group-hover:bg-sky-600',
  },
];

export function Modules() {
  return (
    <section id="modules" className="section-padding bg-gray-50/30">
      <div className="container-main px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Modules"
          title="Comprehensive Module Suite"
          description="Each module is an independent business capability — deploy what you need, scale as you grow."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {modules.map((mod, i) => (
            <AnimatedCard
              key={mod.title}
              delay={i * 0.03}
              className="p-6 sm:p-7 group cursor-default hover:border-brand-500/20 hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-350 shadow-inner group-hover:shadow-md ${mod.color} group-hover:text-white`}
                >
                  <mod.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">
                  {mod.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-normal">
                  {mod.description}
                </p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
