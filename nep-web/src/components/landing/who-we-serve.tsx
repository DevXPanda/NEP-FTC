'use client';

import {
  Factory,
  Flame,
  Construction,
  ShoppingBag,
  Truck,
  Warehouse,
  HardHat,
  Apple,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { AnimatedCard } from '@/components/ui/animated-card';

const industries = [
  {
    icon: Factory,
    title: 'Manufacturing',
    description: 'Optimize shop floor management, bill of materials (BOM), work orders, and routing for lean operations.',
  },
  {
    icon: Flame,
    title: 'Chemical',
    description: 'Streamline raw material formulations, batch processing, and safety compliance configurations.',
  },
  {
    icon: Construction,
    title: 'Wall Putty',
    description: 'Optimize process mixing speeds, packaging batches, bag tracking, and multi-tenant warehouse distribution.',
  },
  {
    icon: ShoppingBag,
    title: 'Retail',
    description: 'Synchronize retail stores, channels, POS platforms, and fulfillment locations in real-time.',
  },
  {
    icon: Truck,
    title: 'Distribution',
    description: 'Control massive volume catalog inventories, pricing groups, bulk orders, and dispatch flows.',
  },
  {
    icon: Warehouse,
    title: 'Warehousing',
    description: 'Manage zone maps, automated storage/retrieval paths, stock adjustments, and cycle counting.',
  },
  {
    icon: HardHat,
    title: 'Construction Materials',
    description: 'Monitor aggregate procurement, costing sheets, transport dispatches, and material dispatch runs.',
  },
  {
    icon: Apple,
    title: 'FMCG',
    description: 'Handle high-velocity inventory turns, expiry dates, batch tracing, and distributor billing schemas.',
  },
];

export function WhoWeServe() {
  return (
    <section id="industries" className="section-padding bg-white">
      <div className="container-main px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Industries Served"
          title="Tailored Solutions for Your Sector"
          description="NKTech Enterprises provides flexible enterprise architectures designed to adapt to the regulatory and workflow demands of major industries."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {industries.map((ind, i) => (
            <AnimatedCard
              key={ind.title}
              delay={i * 0.04}
              className="p-6 sm:p-7 group cursor-default hover:border-brand-500/20 hover:shadow-card-hover transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-50/80 text-brand-600 flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-all duration-350 shadow-inner group-hover:shadow-md group-hover:shadow-brand-600/10">
                <ind.icon className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2.5 group-hover:text-brand-600 transition-colors">
                {ind.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed font-normal">
                {ind.description}
              </p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
