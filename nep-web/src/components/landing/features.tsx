'use client';

import {
  Blocks,
  Users,
  ShieldCheck,
  BarChart3,
  Workflow,
  Package,
  Factory,
  ShoppingCart,
  Truck,
  DollarSign,
  Cloud,
  Zap,
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { AnimatedCard } from '@/components/ui/animated-card';

const features = [
  {
    icon: Blocks,
    title: 'Modular Architecture',
    description: 'Each business capability is an independent module. Deploy only what you need and scale as you grow.',
  },
  {
    icon: Users,
    title: 'Multi-Tenant Platform',
    description: 'Serve multiple organizations from a single instance with complete data isolation per tenant.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Authentication',
    description: 'Enterprise-grade JWT authentication with refresh tokens, session management, and role-based access.',
  },
  {
    icon: Factory,
    title: 'Manufacturing ERP',
    description: 'End-to-end production planning with BOMs, work orders, routing, and shop floor control.',
  },
  {
    icon: Package,
    title: 'Inventory Management',
    description: 'Track stock in real-time across warehouses with automated reorder points and batch tracking.',
  },
  {
    icon: ShoppingCart,
    title: 'Purchase Management',
    description: 'Streamlined procurement with RFQs, vendor comparison, purchase orders, and GRN workflows.',
  },
  {
    icon: Truck,
    title: 'Sales & Dispatch',
    description: 'Complete order-to-cash cycle with quotations, sales orders, dispatch, and delivery management.',
  },
  {
    icon: DollarSign,
    title: 'Finance & Accounting',
    description: 'General ledger, accounts payable/receivable, invoicing, tax management, and financial reporting.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description: 'Live dashboards and customizable reports that provide instant insights across all business functions.',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description: 'Automate approval chains, notifications, and repetitive tasks to boost operational efficiency.',
  },
  {
    icon: Zap,
    title: 'API-First Design',
    description: 'RESTful APIs with event-driven messaging. Integrate seamlessly with third-party systems.',
  },
  {
    icon: Cloud,
    title: 'Cloud Deployment',
    description: 'Containerized deployment with Kubernetes orchestration. Run on any cloud or on-premise.',
  },
];

export function Features() {
  return (
    <section id="features" className="section-padding bg-white">
      <div className="container-main px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Features"
          title="Built for Enterprise Scale"
          description="NKTech Enterprises combines powerful features with clean architecture to deliver a platform that grows with your business."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {features.map((feature, i) => (
            <AnimatedCard
              key={feature.title}
              delay={i * 0.03}
              className="p-6 sm:p-7 group hover:border-brand-500/20 hover:shadow-card-hover transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-50/80 text-brand-600 flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-all duration-350 shadow-inner group-hover:shadow-md group-hover:shadow-brand-600/10">
                <feature.icon className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2.5 group-hover:text-brand-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed font-normal">
                {feature.description}
              </p>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
