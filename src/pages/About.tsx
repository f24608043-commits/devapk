import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Award, Users, Heart, Star, Microscope, Clock } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer } from '@/components/animations/StaggerContainer';
import { Container } from '@/components/ui/Container';
import { MainLayout } from '@/layouts/MainLayout';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-surface-container-low">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="right">
              <div className="space-y-6">
                <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-semibold text-sm tracking-wider uppercase">
                  Our Legacy
                </span>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
                  Redefining Dental <br />
                  <span className="text-secondary">Precision & Care.</span>
                </h1>
                <p className="text-base md:text-lg text-on-surface-variant max-w-xl">
                  NMDC Dental & Maxillofacial Clinic was founded on the principle of bringing 
                  military-grade precision and elite clinical excellence to the world of modern dentistry.
                </p>
                <div className="flex flex-wrap gap-6 pt-4">
                  <div className="flex items-center gap-2">
                    <Award className="text-secondary w-5 h-5" />
                    <span className="font-semibold">25+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="text-secondary w-5 h-5" />
                    <span className="font-semibold">50,000+ Smiles</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left">
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <img 
                    src="/about-clinic.jpg" 
                    alt="Luxury Clinic Interior" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-[240px]">
                  <p className="text-primary font-bold italic">
                    "We don't just treat teeth; we care for people through science and empathy."
                  </p>
                  <p className="mt-2 text-sm text-secondary font-bold">— Brig. Dr. Nazir</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <Container>
          <StaggerContainer>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
              {[
                { label: 'Patient Satisfaction', value: '98%' },
                { label: 'Successful Implants', value: '15k+' },
                { label: 'Clinical Staff', value: '25+' },
                { label: 'Years of Excellence', value: '25' },
              ].map((stat, index) => (
                <FadeIn key={index}>
                  <div className="space-y-2">
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-container">{stat.value}</div>
                    <div className="text-on-primary/60 text-[10px] md:text-sm uppercase tracking-widest">{stat.label}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </section>

      {/* Leadership Section */}
      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <FadeIn direction="right">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4]">
                  <img 
                    src="/dr-nazir.jpg" 
                    alt="Brig. Dr. Nazir" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </FadeIn>
            </div>
            <div className="lg:col-span-7 space-y-8">
              <FadeIn direction="left">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-5xl font-bold text-primary">Clinical Leadership</h2>
                  <h3 className="text-xl text-secondary font-semibold">Brig. Dr. Nazir — Founder & Chief Surgeon</h3>
                </div>
                <p className="text-lg text-on-surface-variant leading-relaxed">
                  With over two decades of experience in maxillofacial surgery and advanced restorative dentistry, 
                  Dr. Nazir has pioneered several non-invasive techniques that are now standard at NMDC. 
                  His background in military medicine instilled a culture of discipline, precision, and 
                  unwavering ethics that defines every procedure we perform.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                  {[
                    { icon: Shield, title: 'Uncompromising Ethics', desc: 'Patient-first approach in every diagnosis.' },
                    { icon: Target, title: 'Clinical Precision', desc: 'Surgical accuracy at the micron level.' },
                    { icon: Microscope, title: 'Research Driven', desc: 'Utilizing latest evidence-based protocols.' },
                    { icon: Heart, title: 'Compassionate Care', desc: 'Gentle handling of even complex cases.' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="bg-secondary/10 p-3 rounded-xl h-fit">
                        <item.icon className="text-secondary w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-primary">{item.title}</h4>
                        <p className="text-sm text-on-surface-variant">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* The NMDC Distinction */}
      <section className="py-24 bg-surface-container-low overflow-hidden">
        <Container>
          <div className="text-center mb-12 md:mb-16">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">The NMDC Distinction</h2>
              <p className="mt-4 text-on-surface-variant max-w-2xl mx-auto">
                What sets us apart is our commitment to merging high-end technology with a boutique patient experience.
              </p>
            </FadeIn>
          </div>

          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Microscope,
                  title: 'Advanced Technology',
                  desc: 'From 3D intraoral scans to AI-guided implantology, we use the future of dentistry today.',
                },
                {
                  icon: Star,
                  title: 'Luxury Environment',
                  desc: 'Our clinic is designed to feel like a premium lounge, significantly reducing dental anxiety.',
                },
                {
                  icon: Clock,
                  title: 'Time Efficiency',
                  desc: 'We value your time. Our streamlined workflows ensure minimal waiting and faster recovery.',
                },
              ].map((item, index) => (
                <FadeIn key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-outline-variant/30 hover:border-secondary transition-colors group">
                  <div className="bg-primary/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-4">{item.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed">{item.desc}</p>
                </FadeIn>
              ))}
            </div>
          </StaggerContainer>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <Container>
          <div className="bg-primary rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/30 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2"></div>
            </div>
            
            <FadeIn className="relative z-10 space-y-6 md:space-y-8">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Experience the Future of <br className="hidden md:block" />
                Dental Excellence.
              </h2>
              <p className="text-on-primary/70 text-base md:text-lg max-w-2xl mx-auto">
                Ready to transform your smile with the care you deserve? 
                Join our community of satisfied patients and experience the difference.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/appointment" className="w-full sm:w-auto bg-secondary text-white px-8 md:px-10 py-3 md:py-4 rounded-xl font-bold hover:scale-105 transition-transform text-center">
                  Book Your Consult
                </Link>
                <Link to="/contact" className="w-full sm:w-auto bg-white/10 text-white border border-white/20 px-8 md:px-10 py-3 md:py-4 rounded-xl font-bold hover:bg-white/20 transition-colors text-center">
                  Contact Us
                </Link>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>
    </MainLayout>
  );
};

export default About;
