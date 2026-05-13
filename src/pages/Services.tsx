import React, { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer } from '@/components/animations/StaggerContainer';
import { services, type Service } from '@/data/services';
import { faqs } from '@/data/faq';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Minus, ArrowRight } from 'lucide-react';

const Services = () => {
  const [filter, setFilter] = useState<Service['category'] | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredServices = filter === 'all' 
    ? services 
    : services.filter(s => s.category === filter);

  const categories = [
    { label: 'All Services', value: 'all' },
    { label: 'Maxillofacial', value: 'maxillofacial' },
    { label: 'Cosmetic', value: 'cosmetic' },
    { label: 'Restorative', value: 'restorative' },
    { label: 'Preventive', value: 'preventive' },
  ];

  return (
    <MainLayout>
      {/* Hero */}
      <section className="bg-surface pt-20 pb-20">
        <Container>
          <div className="max-w-3xl">
            <FadeIn>
              <span className="inline-block bg-brandRed/10 text-brandRed px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                Clinical Excellence
              </span>
              <h1 className="text-5xl md:text-6xl text-navy mb-8 leading-tight">
                Transformative Dental <br/>
                <span className="text-brandRed">Signature Services.</span>
              </h1>
              <p className="text-xl text-muted leading-relaxed">
                Experience a new standard of maxillofacial and cosmetic dentistry. Led by the expertise of Brig. Dr. Nazir, we combine surgical precision with aesthetic artistry.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Filter & Grid */}
      <section className="section-padding bg-white">
        <Container>
          <div className="flex flex-wrap gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value as any)}
                className={clsx(
                  'px-6 py-2 rounded-full font-semibold transition-all',
                  filter === cat.value 
                    ? 'bg-navy text-white shadow-lg' 
                    : 'bg-surface text-muted hover:bg-navy/5'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </AnimatePresence>
          </motion.div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-surface">
        <Container className="max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-navy mb-4">Patient Questions</h2>
            <p className="text-muted">Common inquiries about our specialized dental procedures.</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} title={faq.question} content={faq.answer} />
            ))}
          </div>
        </Container>
      </section>
    </MainLayout>
  );
};

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group glass-panel rounded-[2rem] overflow-hidden border border-border card-hover"
    >
      <div className="aspect-video overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brandRed bg-brandRed/5 px-3 py-1 rounded-full">
            {service.category}
          </span>
        </div>
        <h3 className="text-2xl text-navy mb-4">{service.title}</h3>
        <p className="text-muted mb-8 line-clamp-2">{service.description}</p>
        <button className="flex items-center gap-2 font-bold text-navy group/btn">
          View details
          <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

const AccordionItem = ({ title, content }: { title: string, content: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 text-left hover:bg-navy/5 transition-colors"
      >
        <span className="text-lg font-bold text-navy">{title}</span>
        {isOpen ? <Minus size={20} className="text-brandRed" /> : <Plus size={20} className="text-navy" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 text-muted leading-relaxed border-t border-border/50">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import { clsx } from 'clsx';
export default Services;
