import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, ClipboardList, CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, Stethoscope, Microscope } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Container } from '@/components/ui/Container';
import { MainLayout } from '@/layouts/MainLayout';

const Appointment = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Checkup',
    date: '',
    time: 'Morning (09:00 AM - 12:00 PM)',
    notes: ''
  });

  const steps = [
    { id: 1, title: 'Patient Details', icon: User, desc: 'Identification' },
    { id: 2, title: 'Service & Time', icon: Calendar, desc: 'Select care' },
    { id: 3, title: 'Review', icon: ClipboardList, desc: 'Final summary' }
  ];

  const handleNext = () => setStep(prev => Math.min(prev + 1, 3));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <MainLayout>
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-surface-container-high via-surface-container-low to-background opacity-60"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-fixed/20 blur-[120px] rounded-full"></div>
      </div>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Sidebar: Progress & Context */}
            <div className="lg:col-span-4 space-y-12">
              <div className="space-y-6">
                <FadeIn direction="right">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-xs uppercase tracking-widest">
                    Appointment
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight mt-4">
                    Schedule Your <br />
                    <span className="text-secondary">Dental Care.</span>
                  </h1>
                  <p className="text-lg text-on-surface-variant max-w-sm">
                    Experience gentle, expert care delivered with clinical precision and personalized comfort.
                  </p>
                </FadeIn>
              </div>

              {/* Steps Indicator */}
              <div className="space-y-8">
                {steps.map((s) => (
                  <FadeIn key={s.id} direction="right" delay={s.id * 0.1}>
                    <div className="flex items-center gap-6 group">
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300
                        ${step >= s.id ? 'bg-primary text-white ring-4 ring-primary-fixed/30' : 'bg-surface-container text-on-surface-variant'}
                      `}>
                        {step > s.id ? <CheckCircle2 className="w-6 h-6" /> : s.id}
                      </div>
                      <div>
                        <h3 className={`font-bold transition-colors ${step >= s.id ? 'text-primary' : 'text-on-surface-variant'}`}>
                          {s.title}
                        </h3>
                        <p className="text-sm text-on-surface-variant/60">{s.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>

              {/* Trust Badge */}
              <FadeIn direction="right" delay={0.4}>
                <div className="bg-white p-8 rounded-3xl border border-outline-variant/30 shadow-xl space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-surface-container overflow-hidden">
                          <img 
                            src={`https://i.pravatar.cc/150?u=${i + 10}`} 
                            alt="Patient" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <span className="font-bold text-primary text-sm">Join 5,000+ Happy Patients</span>
                  </div>
                  <p className="text-sm text-on-surface-variant italic">
                    "Dr. Nazir's attention to detail changed my perspective on dental visits. Truly world-class."
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* Main Form Content */}
            <div className="lg:col-span-8">
              <FadeIn>
                <div className="bg-white/70 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/50">
                  <form onSubmit={(e) => e.preventDefault()} className="space-y-10">
                    
                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div 
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-8"
                        >
                          <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/20">
                            <User className="text-secondary w-6 h-6" />
                            <h2 className="text-2xl font-bold text-primary">Patient Identification</h2>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Full Name</label>
                              <input 
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full h-14 px-5 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all"
                                placeholder="e.g. Johnathan Doe"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Phone Number</label>
                              <input 
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                className="w-full h-14 px-5 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all"
                                placeholder="+1 (555) 000-0000"
                              />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Email Address</label>
                              <input 
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full h-14 px-5 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all"
                                placeholder="john.doe@example.com"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div 
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-8"
                        >
                          <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/20">
                            <Calendar className="text-secondary w-6 h-6" />
                            <h2 className="text-2xl font-bold text-primary">Service Selection</h2>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                              { id: 'Checkup', label: 'Checkup', icon: Stethoscope, desc: 'Routine cleaning' },
                              { id: 'Maxillofacial', label: 'Maxillofacial', icon: Microscope, desc: 'Specialized surgery' },
                              { id: 'Orthodontics', label: 'Orthodontics', icon: ShieldCheck, desc: 'Braces & Aligners' },
                            ].map((s) => (
                              <button
                                key={s.id}
                                onClick={() => setFormData({...formData, service: s.id})}
                                className={`
                                  p-6 rounded-2xl border-2 text-left transition-all
                                  ${formData.service === s.id ? 'border-secondary bg-secondary/5 ring-4 ring-secondary/10' : 'border-outline-variant/30 hover:border-secondary/50'}
                                `}
                              >
                                <s.icon className={`w-8 h-8 mb-4 ${formData.service === s.id ? 'text-secondary' : 'text-on-surface-variant'}`} />
                                <h4 className="font-bold text-primary">{s.label}</h4>
                                <p className="text-xs text-on-surface-variant/70 mt-1">{s.desc}</p>
                              </button>
                            ))}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Preferred Date</label>
                              <input 
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                                className="w-full h-14 px-5 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Preferred Time</label>
                              <select 
                                value={formData.time}
                                onChange={(e) => setFormData({...formData, time: e.target.value})}
                                className="w-full h-14 px-5 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all appearance-none"
                              >
                                <option>Morning (09:00 AM - 12:00 PM)</option>
                                <option>Afternoon (12:00 PM - 04:00 PM)</option>
                                <option>Evening (04:00 PM - 07:00 PM)</option>
                              </select>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div 
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-8"
                        >
                          <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/20">
                            <ClipboardList className="text-secondary w-6 h-6" />
                            <h2 className="text-2xl font-bold text-primary">Review Details</h2>
                          </div>
                          
                          <div className="bg-surface-container-low p-8 rounded-3xl space-y-6">
                            <div className="grid grid-cols-2 gap-8">
                              <div>
                                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Patient</p>
                                <p className="font-bold text-lg text-primary">{formData.name || 'Not provided'}</p>
                              </div>
                              <div>
                                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Service</p>
                                <p className="font-bold text-lg text-primary">{formData.service}</p>
                              </div>
                              <div>
                                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Date</p>
                                <p className="font-bold text-lg text-primary">{formData.date || 'Not selected'}</p>
                              </div>
                              <div>
                                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Time Preference</p>
                                <p className="font-bold text-lg text-primary">{formData.time.split(' (')[0]}</p>
                              </div>
                            </div>
                            <div className="pt-6 border-t border-outline-variant/30">
                              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Additional Notes</label>
                              <textarea 
                                value={formData.notes}
                                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                rows={3}
                                className="w-full mt-2 p-4 bg-white/50 border-none rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all resize-none"
                                placeholder="Any specific concerns or medical history..."
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                        <ShieldCheck className="text-secondary w-5 h-5" />
                        Your medical data is encrypted & secure.
                      </div>
                      <div className="flex items-center gap-4 w-full md:w-auto">
                        {step > 1 && (
                          <button 
                            onClick={handleBack}
                            className="flex-1 md:flex-none px-8 py-4 rounded-xl font-bold border border-outline-variant/30 hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2"
                          >
                            <ArrowLeft className="w-5 h-5" />
                            Back
                          </button>
                        )}
                        <button 
                          onClick={step === 3 ? undefined : handleNext}
                          className="flex-1 md:flex-none bg-primary text-white px-10 py-4 rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3"
                        >
                          {step === 3 ? 'Confirm Appointment' : 'Next Step'}
                          {step !== 3 && <ArrowRight className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>
    </MainLayout>
  );
};

export default Appointment;
