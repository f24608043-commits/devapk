import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, ShieldCheck, ExternalLink } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer } from '@/components/animations/StaggerContainer';
import { Container } from '@/components/ui/Container';
import { MainLayout } from '@/layouts/MainLayout';

const Contact = () => {
  return (
    <MainLayout>
      {/* Hero Header */}
      <section className="py-20 bg-surface-container-low">
        <Container>
          <div className="max-w-3xl">
            <FadeIn direction="right">
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-semibold text-sm tracking-wider uppercase mb-6">
                Get In Touch
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-primary leading-tight mb-6">
                Connect with Our <br />
                <span className="text-secondary">Specialists.</span>
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed">
                Whether you have a dental emergency or wish to consult Brig. Dr. Nazir about complex maxillofacial care, 
                our team is here to provide exceptional guidance.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Main Contact Section */}
      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-7">
              <FadeIn direction="right">
                <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl border border-outline-variant/30">
                  <h2 className="text-3xl font-bold text-primary mb-8">Send a Message</h2>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-on-surface-variant ml-1">Full Name</label>
                        <input 
                          type="text" 
                          placeholder="John Doe"
                          className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-secondary transition-all outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-on-surface-variant ml-1">Phone Number</label>
                        <input 
                          type="tel" 
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-secondary transition-all outline-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-on-surface-variant ml-1">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-secondary transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-on-surface-variant ml-1">Nature of Inquiry</label>
                      <select className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-secondary transition-all outline-none appearance-none">
                        <option>Maxillofacial Consultation</option>
                        <option>Routine Checkup</option>
                        <option>Orthodontics</option>
                        <option>Emergency Care</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-on-surface-variant ml-1">Your Message</label>
                      <textarea 
                        rows={4}
                        placeholder="How can we help you today?"
                        className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-secondary transition-all outline-none resize-none"
                      ></textarea>
                    </div>
                    <button className="w-full bg-primary text-white py-5 rounded-xl font-bold text-lg hover:bg-primary/90 hover:scale-[1.01] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2">
                      Send Consultation Request
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </FadeIn>
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-5 space-y-8">
              {/* Emergency Card */}
              <FadeIn direction="left">
                <div className="bg-primary text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                    <Phone className="w-32 h-32" />
                  </div>
                  <div className="relative z-10 space-y-6">
                    <span className="inline-block px-3 py-1 rounded-full bg-secondary-container/20 text-secondary-container text-xs font-bold uppercase tracking-wider italic animate-pulse">
                      Available 24/7
                    </span>
                    <h3 className="text-3xl font-bold">Immediate Support</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <div className="bg-secondary-container/20 p-3 rounded-xl">
                          <Phone className="text-secondary-container w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-on-primary/60 text-xs uppercase font-bold tracking-widest">Emergency Line</p>
                          <p className="text-xl font-bold">+1 (555) DENTAL-HELP</p>
                        </div>
                      </div>
                      <a href="#" className="flex items-center gap-4 p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-colors group">
                        <div className="bg-[#25D366] p-3 rounded-xl group-hover:scale-110 transition-transform">
                          <MessageSquare className="text-white w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[#25D366] text-xs uppercase font-bold tracking-widest">WhatsApp Chat</p>
                          <p className="text-xl font-bold">Message Us Directly</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Clinic Info */}
              <FadeIn direction="left" delay={0.2}>
                <div className="bg-surface-container-high p-8 rounded-[2rem] border border-outline-variant/30 space-y-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
                      <Clock className="text-secondary w-6 h-6" />
                      Clinic Hours
                    </h3>
                    <div className="space-y-3">
                      {[
                        { days: 'Monday - Friday', hours: '09:00 AM - 08:00 PM' },
                        { days: 'Saturday', hours: '10:00 AM - 04:00 PM' },
                        { days: 'Sunday', hours: 'Closed', closed: true },
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center pb-3 border-b border-outline-variant/30 last:border-0 last:pb-0">
                          <span className="text-on-surface-variant font-medium">{item.days}</span>
                          <span className={`font-bold ${item.closed ? 'text-error' : 'text-primary'}`}>
                            {item.hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
                      <MapPin className="text-secondary w-6 h-6" />
                      Our Location
                    </h3>
                    <p className="text-on-surface-variant leading-relaxed">
                      452 Medical Arts Plaza, Healthcare District<br />
                      Suite 200, Metropolis City
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* Map Section Placeholder */}
      <section className="pb-24">
        <Container>
          <FadeIn>
            <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl group border-4 border-white">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCncM6r6YpyZTCmQZUjHrz6Ts37-qNTM8gdse9JnCvPbhOXNQvKGOzCJiwOXMNPWU3wmViwkWs6Igebu8iC0IhiMnhK_ezBtdtcyGP2R6lcHsVmC_Qf2k-Fjq_gpzbJA1HAHt8IzvdiIhV3VRNkFh-jWwWjgctJWL5j21_SQSb8uPhEq-uTzL_J7MtOJh7fX_t0qXgCImjyCnLBmY1CNhFRI3FWxvNjpe8WaT0VGnGgbzJNOz9zZVad7BzNwMnLBXWZRCh8RRXS" 
                alt="Map View" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors"></div>
              
              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/50 max-w-sm">
                <h4 className="text-2xl font-bold text-primary mb-2">Getting Here</h4>
                <p className="text-on-surface-variant mb-6">
                  Valet parking is available at the main entrance for all surgical consultations.
                </p>
                <button className="flex items-center gap-2 text-secondary font-bold hover:gap-3 transition-all">
                  Open in Google Maps
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                  <MapPin className="text-white w-8 h-8" />
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-t border-outline-variant/30 bg-surface-container-lowest">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: 'Certified Care', desc: 'Global dental standards' },
              { icon: MessageSquare, title: '24/7 Support', desc: 'For surgical post-ops' },
              { icon: ShieldCheck, title: 'Patient Privacy', desc: 'Encrypted health records' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="bg-surface-container-high p-4 rounded-2xl">
                  <item.icon className="text-primary w-8 h-8" />
                </div>
                <div>
                  <h5 className="font-bold text-primary">{item.title}</h5>
                  <p className="text-on-surface-variant text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </MainLayout>
  );
};

export default Contact;
