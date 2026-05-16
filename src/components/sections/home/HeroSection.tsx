import React from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/animations/FadeIn';
import { ArrowRight, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-surface pt-20 pb-20">
      <Container className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
        <div className="space-y-8">
          <FadeIn direction="right" delay={0.2}>
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-panel rounded-full text-navy font-semibold text-xs uppercase tracking-wider">
              <ShieldCheck size={16} className="text-brandRed" />
              Elite Maxillofacial Expertise
            </div>
          </FadeIn>
          
          <FadeIn direction="right" delay={0.4}>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-manrope text-navy leading-[1.1]">
              Healthy Smiles <br/>
              <span className="text-brandRed">Begin Here.</span>
            </h1>
          </FadeIn>

          <FadeIn direction="right" delay={0.6}>
            <p className="text-base md:text-lg text-muted max-w-lg leading-relaxed">
              Experience advanced dentistry curated by Brig. Dr. Nazir. From premium maxillofacial surgery to aesthetic refinements, we blend clinical precision with hospitality-driven luxury.
            </p>
          </FadeIn>
          <FadeIn direction="right" delay={0.8} className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4">
            <Link to="/appointment" className="btn-primary px-6 py-3 md:px-8 md:py-4 text-base md:text-lg flex items-center justify-center gap-2 shadow-lg shadow-navy/10 w-full sm:w-auto">
              Schedule Consult
              <ArrowRight size={20} />
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Explore Services
            </Button>
          </FadeIn>

          <FadeIn direction="right" delay={1} className="flex items-center gap-4 pt-8">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-border overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Patient" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="text-muted">
              <span className="font-bold text-navy">2,500+</span> Happy Patients
            </div>
          </FadeIn>
        </div>

        <FadeIn direction="left" delay={0.5} className="relative">
          <div className="relative z-10 rounded-3xl md:rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-2xl shadow-navy/20 border-4 md:border-8 border-white">
            <img 
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop" 
              alt="Elite Dental Clinic" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Floating Cards */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute -top-10 -right-10 glass-panel p-6 rounded-2xl shadow-xl z-20 max-w-[200px]"
          >
            <div className="text-brandRed font-bold text-3xl">98%</div>
            <div className="text-muted text-xs font-semibold uppercase tracking-wider">Satisfaction Rate</div>
          </motion.div>

          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="absolute -bottom-6 -left-10 bg-navy text-white p-6 rounded-2xl shadow-xl z-20 flex items-center gap-4"
          >
            <div className="bg-brandRed p-3 rounded-full">
              <Heart size={20} className="text-white" />
            </div>
            <div>
              <div className="font-bold">24/7 Care</div>
              <div className="opacity-70 text-xs uppercase">Emergency Support</div>
            </div>
          </motion.div>

          {/* Background Decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brandRed/5 blur-[100px] -z-10 rounded-full"></div>
        </FadeIn>
      </Container>
    </section>
  );
};

import { motion } from 'framer-motion';
