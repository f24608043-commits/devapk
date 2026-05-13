import React, { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/animations/FadeIn';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah J.',
    role: 'Implants Patient',
    content: 'The surgical expertise here is unmatched. Brig. Dr. Nazir performed my complex implant procedure with such care. I felt zero anxiety throughout.',
    image: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    name: 'Michael R.',
    role: 'Cosmetic Patient',
    content: 'Not just a clinic, but a place of healing. The luxury environment and friendly staff made me look forward to my dental visits.',
    image: 'https://i.pravatar.cc/150?u=michael'
  },
  {
    name: 'Emma W.',
    role: 'Oral Surgery Patient',
    content: 'Efficient, precise, and professional. My wisdom tooth extraction was much faster and painless than I ever imagined possible.',
    image: 'https://i.pravatar.cc/150?u=emma'
  }
];

export const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding bg-white overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <FadeIn className="max-w-xl">
            <h2 className="text-4xl md:text-5xl text-navy mb-4">Patient Experiences</h2>
            <p className="text-muted text-lg">Hear from those who have transformed their smiles and regained their confidence with us.</p>
          </FadeIn>
          
          <div className="flex gap-4">
            <button 
              onClick={prev}
              className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:bg-navy hover:text-white transition-all active:scale-95"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={next}
              className="w-14 h-14 rounded-full border border-border flex items-center justify-center hover:bg-navy hover:text-white transition-all active:scale-95"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[0, 1, 2].map((offset) => {
                const index = (activeIndex + offset) % testimonials.length;
                const item = testimonials[index];
                const isCenter = offset === 1;

                return (
                  <div 
                    key={index}
                    className={clsx(
                      'p-10 rounded-[2.5rem] transition-all duration-500 border border-border',
                      isCenter ? 'bg-navy text-white shadow-2xl scale-105 z-10' : 'bg-surface text-navy'
                    )}
                  >
                    <div className="flex gap-1 mb-8">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} fill={isCenter ? '#FFFFFF' : '#D32F2F'} className={isCenter ? 'text-white' : 'text-brandRed'} />
                      ))}
                    </div>
                    <p className={clsx(
                      'text-xl font-medium mb-10 leading-relaxed italic',
                      isCenter ? 'text-white' : 'text-navy'
                    )}>
                      "{item.content}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-border overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-lg">{item.name}</div>
                        <div className={clsx(
                          'text-xs uppercase tracking-widest font-semibold',
                          isCenter ? 'text-white/60' : 'text-muted'
                        )}>
                          {item.role}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
};

import { clsx } from 'clsx';
