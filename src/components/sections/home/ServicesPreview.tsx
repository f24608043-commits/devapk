import React from 'react';
import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer } from '@/components/animations/StaggerContainer';
import { ArrowUpRight, Microscope, Sparkles, HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ServicesPreview = () => {
  return (
    <section className="section-padding bg-white">
      <Container>
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl text-navy mb-4">Elite Clinical Excellence</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              Providing a comprehensive range of dental solutions with advanced technology and artistic precision.
            </p>
          </FadeIn>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[700px]">
          {/* Main Card */}
          <FadeIn className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl bg-navy">
            <img 
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop" 
              alt="Surgery"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent"></div>
            <div className="relative h-full flex flex-col justify-end p-10">
              <span className="bg-brandRed px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white w-fit mb-4">Core Specialty</span>
              <h3 className="text-3xl md:text-4xl text-white mb-4">Maxillofacial Surgery</h3>
              <p className="text-white/70 mb-6 max-w-md">Expert treatment for complex facial, jaw, and oral conditions led by military-grade surgical precision.</p>
              <Link to="/services" className="flex items-center gap-2 font-bold text-white group/link">
                Learn more
                <ArrowUpRight size={20} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>

          {/* Secondary Cards */}
          <FadeIn className="md:col-span-2 glass-panel p-8 rounded-3xl flex flex-col justify-between group cursor-pointer hover:border-brandRed/30 transition-all card-hover">
            <div className="flex justify-between items-start">
              <div className="bg-surface p-4 rounded-2xl text-brandRed">
                <Sparkles size={32} />
              </div>
              <ArrowUpRight size={24} className="text-navy/20 group-hover:text-brandRed transition-colors" />
            </div>
            <div>
              <h3 className="text-2xl text-navy mb-2">Cosmetic Dentistry</h3>
              <p className="text-muted">Porcelain veneers, smile makeovers, and laser whitening for a radiant confidence.</p>
            </div>
          </FadeIn>

          <FadeIn className="glass-panel p-8 rounded-3xl flex flex-col justify-between group cursor-pointer hover:border-brandRed/30 transition-all card-hover">
            <div className="bg-surface p-4 rounded-2xl text-brandRed w-fit mb-4">
              <Microscope size={32} />
            </div>
            <div>
              <h3 className="text-xl text-navy mb-2">Dental Implants</h3>
              <p className="text-muted text-sm">Permanent tooth restoration using Swiss technology.</p>
            </div>
          </FadeIn>

          <FadeIn className="glass-panel p-8 rounded-3xl flex flex-col justify-between group cursor-pointer hover:border-brandRed/30 transition-all card-hover">
            <div className="bg-surface p-4 rounded-2xl text-brandRed w-fit mb-4">
              <HeartPulse size={32} />
            </div>
            <div>
              <h3 className="text-xl text-navy mb-2">Preventive Care</h3>
              <p className="text-muted text-sm">Routine checkups & cleaning to maintain your oral health.</p>
            </div>
          </FadeIn>
        </StaggerContainer>
      </Container>
    </section>
  );
};
