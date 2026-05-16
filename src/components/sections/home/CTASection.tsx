import React from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/animations/FadeIn';
import { Calendar, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CTASection = () => {
  return (
    <section className="pb-24">
      <Container>
        <FadeIn className="relative rounded-3xl md:rounded-[3rem] overflow-hidden bg-navy p-8 md:p-12 lg:p-20 text-center md:text-left shadow-2xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-manrope text-white mb-4 md:mb-6 leading-tight">Ready to Experience Elite Care?</h2>
              <p className="text-base md:text-xl text-white/70 leading-relaxed">
                Join our family of satisfied patients today. We offer flexible scheduling and personalized treatment plans for every patient.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Link 
                to="/appointment"
                className="btn-primary px-8 py-4 text-lg bg-brandRed hover:bg-brandRed/90 text-white border-none flex items-center justify-center gap-2 rounded-full"
              >
                <Calendar size={20} />
                Book Your Visit
              </Link>
              <Link 
                to="/contact"
                className="btn-outline px-8 py-4 text-lg border-white/20 text-white hover:bg-white/10 flex items-center justify-center gap-2 rounded-full backdrop-blur-sm"
              >
                <Phone size={20} />
                Emergency? Call Now
              </Link>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
};
