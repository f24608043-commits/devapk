import React from 'react';
import { Container } from '@/components/ui/Container';
import { FadeIn } from '@/components/animations/FadeIn';
import { Shield, Cpu, Sparkles, Activity } from 'lucide-react';

export const SpecialistsSection = () => {
  return (
    <section className="bg-surface section-padding overflow-hidden">
      <Container className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
        <FadeIn direction="right" className="md:col-span-5 relative">
          <div className="rounded-[2rem] overflow-hidden shadow-2xl relative border-8 border-white">
            <img 
              className="w-full object-cover aspect-[3/4]" 
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop" 
              alt="Elite Dental Clinic Interior"
            />
            <div className="absolute bottom-0 inset-x-0 p-8 glass-panel m-4 rounded-2xl">
              <p className="italic text-navy font-medium">
                "Our mission is to redefine the dental experience through extreme clinical precision and uncompromising patient comfort."
              </p>
              <p className="mt-4 font-bold text-brandRed">— Brig. Dr. Nazir</p>
            </div>
          </div>
        </FadeIn>

        <div className="md:col-span-7 space-y-12">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl text-navy">The NMDC Distinction</h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <Feature 
              icon={<Shield size={24} />} 
              title="Precision" 
              desc="Military-grade surgical standards ensuring the highest level of procedural safety and outcome predictability." 
            />
            <Feature 
              icon={<Cpu size={24} />} 
              title="Technology" 
              desc="Equipped with state-of-the-art 3D imaging and AI-driven diagnostic tools for non-invasive treatment planning." 
            />
            <Feature 
              icon={<Sparkles size={24} />} 
              title="Hospitality" 
              desc="Experience-focused care designed to eliminate anxiety, featuring private recovery suites and calming interiors." 
            />
            <Feature 
              icon={<Activity size={24} />} 
              title="Holistic" 
              desc="Personalized care plans that consider your overall health, facial aesthetics, and long-term functional stability." 
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

const Feature = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <FadeIn className="space-y-4">
    <div className="flex items-center gap-3">
      <div className="text-brandRed bg-brandRed/10 p-2 rounded-lg">
        {icon}
      </div>
      <h4 className="text-xl text-navy">{title}</h4>
    </div>
    <p className="text-muted leading-relaxed">{desc}</p>
  </FadeIn>
);
