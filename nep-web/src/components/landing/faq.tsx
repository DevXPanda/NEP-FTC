'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';

const faqs = [
  {
    question: 'What is NKTech Enterprises and who is it for?',
    answer:
      'NKTech Enterprises is a comprehensive enterprise resource planning system designed for manufacturing, distribution, and service companies. It is ideal for mid-sized to large organizations looking for a unified, scalable platform to manage their operations.',
  },
  {
    question: 'How does the modular architecture work?',
    answer:
      'Each business capability (inventory, manufacturing, sales, etc.) is an independent module with its own database schema. You can deploy only the modules you need and add more as your business grows — without disrupting existing operations.',
  },
  {
    question: 'What does multi-tenant support mean?',
    answer:
      'Multi-tenancy allows a single NKTech Enterprises instance to serve multiple organizations (tenants) with complete data isolation. Each tenant has its own data, users, and configurations while sharing the same infrastructure, reducing costs and simplifying management.',
  },
  {
    question: 'Is NKTech Enterprises secure enough for enterprise use?',
    answer:
      'Absolutely. NKTech Enterprises implements enterprise-grade security including JWT-based authentication, refresh token rotation, role-based access control, session management, and full audit trails. All data is encrypted in transit and at rest.',
  },
  {
    question: 'Can NKTech Enterprises integrate with existing systems?',
    answer:
      'Yes. NKTech Enterprises provides RESTful APIs and event-driven messaging (RabbitMQ) for seamless integration with third-party systems, legacy ERPs, e-commerce platforms, payment gateways, and other enterprise tools.',
  },
  {
    question: 'What deployment options are available?',
    answer:
      'NKTech Enterprises supports cloud deployment (AWS, Azure, GCP), on-premise installation, and hybrid configurations. It is containerized with Docker and Kubernetes-ready for scalable, resilient deployments.',
  },
  {
    question: 'How long does implementation take?',
    answer:
      'Typical implementation takes 4–12 weeks depending on the number of modules and complexity of your operations. Our modular approach allows phased rollouts so you can start seeing value within the first few weeks.',
  },
  {
    question: 'What kind of support is available?',
    answer:
      'We offer dedicated implementation support, training, and ongoing technical support. Enterprise clients receive priority support with guaranteed response times, a dedicated account manager, and access to our engineering team.',
  },
];

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`border rounded-2xl overflow-hidden bg-white transition-all duration-350 ${isOpen ? 'border-brand-500/20 shadow-md shadow-brand-500/5' : 'border-gray-150 shadow-sm hover:shadow-card'}`}>
      <button
        onClick={onToggle}
        className="flex items-center justify-between gap-4 w-full px-6 py-5.5 text-left group"
        aria-expanded={isOpen}
      >
        <span className={`text-base font-bold transition-colors duration-300 ${isOpen ? 'text-brand-600' : 'text-gray-900 group-hover:text-brand-600'}`}>
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${isOpen ? 'bg-brand-50 text-brand-600' : 'bg-gray-50 text-gray-400 group-hover:bg-gray-100'}`}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-6 pb-6 text-sm text-gray-500 leading-relaxed font-normal border-t border-gray-50/50 pt-2.5">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-gray-50/30">
      <div className="container-main max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="FAQ"
          title="Frequently Asked Questions"
          description="Everything you need to know about NKTech Enterprises and how it can transform your enterprise operations."
        />

        <div className="space-y-3.5">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
            >
              <FaqItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
