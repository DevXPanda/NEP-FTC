'use client';

import { motion } from 'framer-motion';
import { Shield, Blocks, Zap, Workflow, KeyRound, Cloud, Landmark, Settings2, Code, Activity } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';

const stats = [
  {
    icon: Blocks,
    value: '14+',
    label: 'Modules',
    description: 'Independent core capability modules deployed dynamically.',
  },
  {
    icon: Settings2,
    value: '25+',
    label: 'Services',
    description: 'Decoupled domain services processing high transactional flows.',
  },
  {
    icon: Landmark,
    value: '120+',
    label: 'Database Tables',
    description: 'Granular relational schemas built with multi-tenant scopes.',
  },
  {
    icon: Code,
    value: '450+',
    label: 'API Endpoints',
    description: 'Durable REST and messaging endpoints for integrations.',
  },
  {
    icon: Activity,
    value: '80+',
    label: 'Supported Business Processes',
    description: 'Preconfigured industrial manufacturing and accounting pathways.',
  },
];

const whyChooseItems = [
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Guaranteed authentication chains with granular session checks.',
  },
  {
    icon: Blocks,
    title: 'Modular Deployment',
    description: 'Launch individual business capability schemas as needed.',
  },
  {
    icon: Zap,
    title: 'API-First Architecture',
    description: 'Fully integrated REST contracts and topic exchanges.',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description: 'Trigger approvals, alert signals, and routing events instantly.',
  },
  {
    icon: KeyRound,
    title: 'Role-Based Access Control',
    description: 'Secure identities scoped precisely to their operational unit.',
  },
  {
    icon: Cloud,
    title: 'Cloud Ready',
    description: 'Run anywhere with cloud-native packaging and configs.',
  },
  {
    icon: Landmark,
    title: 'High Scalability',
    description: 'Engineered for high transactional throughput and concurrency.',
  },
  {
    icon: Activity,
    title: 'Real-Time Monitoring',
    description: 'Track database workloads, connection health, and node availability.',
  },
];

export function WhyChoose() {
  return (
    <section className="section-padding bg-gray-50/20">
      <div className="container-main px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Statistics section */}
        <div>
          <SectionHeading
            badge="Platform Statistics"
            title="Enterprise Capabilities at Scale"
            description="Verified platform benchmarks demonstrating NKTech Enterprises operational compliance and readiness."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="relative bg-white rounded-2xl border border-gray-150 p-6 text-center shadow-sm hover:shadow-card-hover hover:border-brand-500/20 transition-all duration-300 group cursor-default"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-50/80 text-brand-600 flex items-center justify-center mx-auto mb-5 group-hover:bg-brand-600 group-hover:text-white transition-all duration-350 shadow-inner group-hover:shadow-md group-hover:shadow-brand-600/10">
                  <stat.icon className="w-6.5 h-6.5" />
                </div>
                <div className="text-2xl font-black text-gray-900 mb-1 leading-none tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[10px] font-bold text-brand-600 uppercase tracking-widest mb-3">
                  {stat.label}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed font-normal">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why Choose NKTech Enterprises section */}
        <div id="why-choose" className="pt-12 border-t border-gray-200/60">
          <SectionHeading
            badge="Why Us"
            title="Why Enterprises Choose NKTech Enterprises"
            description="Our core structural design criteria make us the preferred modernization partner."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {whyChooseItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="bg-white rounded-2xl border border-gray-150 p-6 sm:p-7 min-h-[220px] flex flex-col justify-between shadow-sm hover:shadow-card-hover hover:border-brand-500/20 transition-all duration-300 group cursor-default"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-50/80 text-brand-600 flex items-center justify-center mb-5 group-hover:bg-brand-600 group-hover:text-white transition-all duration-350 shadow-inner group-hover:shadow-md group-hover:shadow-brand-600/10">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
