import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, ClipboardList, CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, Stethoscope, Microscope, Loader2, X } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Container } from '@/components/ui/Container';
import { MainLayout } from '@/layouts/MainLayout';
import { generateAppointmentMessage, openWhatsApp, type AppointmentFormData } from '@/lib/whatsapp';

// Simple WhatsApp SVG icon component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface StepErrors {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  date?: string;
  time?: string;
  urgency?: string;
}

const validateStep1 = (data: typeof initialFormData): StepErrors => {
  const errors: StepErrors = {};
  if (!data.name.trim()) errors.name = 'Patient name is required';
  if (!data.phone.trim()) errors.phone = 'Phone number is required';
  else if (data.phone.replace(/\D/g, '').length < 7) errors.phone = 'Enter a valid phone number';
  if (!data.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Enter a valid email address';
  return errors;
};

const validateStep2 = (data: typeof initialFormData): StepErrors => {
  const errors: StepErrors = {};
  if (!data.service) errors.service = 'Please select a service';
  if (!data.date) errors.date = 'Please select a preferred date';
  if (!data.time) errors.time = 'Please select a time slot';
  if (!data.urgency) errors.urgency = 'Please select urgency level';
  return errors;
};

const initialFormData = {
  name: '',
  phone: '',
  email: '',
  service: 'Checkup',
  date: '',
  time: 'Morning (09:00 AM - 12:00 PM)',
  urgency: 'Normal',
  notes: ''
};

const Appointment = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ ...initialFormData });
  const [errors, setErrors] = useState<StepErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const steps = [
    { id: 1, title: 'Patient Details', icon: User, desc: 'Identification' },
    { id: 2, title: 'Service & Time', icon: Calendar, desc: 'Select care' },
    { id: 3, title: 'Review', icon: ClipboardList, desc: 'Final summary' }
  ];

  const handleNext = () => {
    if (step === 1) {
      const stepErrors = validateStep1(formData);
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        return;
      }
    }
    if (step === 2) {
      const stepErrors = validateStep2(formData);
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        return;
      }
    }
    setErrors({});
    setStep(prev => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setErrors({});
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof StepErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const appointmentData: AppointmentFormData = {
      patientName: formData.name,
      phoneNumber: formData.phone,
      email: formData.email,
      selectedServices: formData.service,
      date: formData.date,
      timeSlot: formData.time,
      urgency: formData.urgency,
      message: formData.notes || 'None',
    };

    const message = generateAppointmentMessage(appointmentData);
    openWhatsApp(message);

    setIsSubmitting(false);
    setShowSuccessModal(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    setFormData({ ...initialFormData });
    setStep(1);
  };

  const InputError = ({ message }: { message?: string }) =>
    message ? (
      <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-xs font-semibold mt-1 ml-1">
        {message}
      </motion.p>
    ) : null;

  return (
    <MainLayout>
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={handleCloseSuccess}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={handleCloseSuccess} className="absolute top-4 right-4 text-on-surface-variant/40 hover:text-on-surface-variant transition-colors">
                <X className="w-6 h-6" />
              </button>
              <div className="w-20 h-20 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <WhatsAppIcon className="w-10 h-10 text-[#25D366]" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-3">Appointment Sent!</h3>
              <p className="text-on-surface-variant mb-8 leading-relaxed">
                Your appointment request has been sent via WhatsApp. Our team will confirm your booking shortly.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleCloseSuccess}
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 transition-colors"
                >
                  Book Another Appointment
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                                onChange={(e) => handleChange('name', e.target.value)}
                                className={`w-full h-14 px-5 bg-surface-container-low border-2 ${errors.name ? 'border-red-400' : 'border-transparent'} rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all`}
                                placeholder="e.g. Johnathan Doe"
                              />
                              <InputError message={errors.name} />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Phone Number</label>
                              <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                                className={`w-full h-14 px-5 bg-surface-container-low border-2 ${errors.phone ? 'border-red-400' : 'border-transparent'} rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all`}
                                placeholder="+92 333 1234567"
                              />
                              <InputError message={errors.phone} />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Email Address</label>
                              <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                className={`w-full h-14 px-5 bg-surface-container-low border-2 ${errors.email ? 'border-red-400' : 'border-transparent'} rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all`}
                                placeholder="john.doe@example.com"
                              />
                              <InputError message={errors.email} />
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
                                type="button"
                                onClick={() => handleChange('service', s.id)}
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
                          <InputError message={errors.service} />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Preferred Date</label>
                              <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => handleChange('date', e.target.value)}
                                className={`w-full h-14 px-5 bg-surface-container-low border-2 ${errors.date ? 'border-red-400' : 'border-transparent'} rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all`}
                              />
                              <InputError message={errors.date} />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Preferred Time</label>
                              <select
                                value={formData.time}
                                onChange={(e) => handleChange('time', e.target.value)}
                                className={`w-full h-14 px-5 bg-surface-container-low border-2 ${errors.time ? 'border-red-400' : 'border-transparent'} rounded-2xl focus:ring-2 focus:ring-secondary outline-none transition-all appearance-none`}
                              >
                                <option>Morning (09:00 AM - 12:00 PM)</option>
                                <option>Afternoon (12:00 PM - 04:00 PM)</option>
                                <option>Evening (04:00 PM - 07:00 PM)</option>
                              </select>
                              <InputError message={errors.time} />
                            </div>
                          </div>

                          {/* Urgency Level */}
                          <div className="space-y-3 pt-2">
                            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Urgency Level</label>
                            <div className="flex flex-wrap gap-3">
                              {['Normal', 'Moderate', 'Urgent', 'Emergency'].map((level) => (
                                <button
                                  key={level}
                                  type="button"
                                  onClick={() => handleChange('urgency', level)}
                                  className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all border-2 ${formData.urgency === level
                                      ? level === 'Emergency' ? 'border-red-500 bg-red-500/10 text-red-600 ring-2 ring-red-200'
                                        : level === 'Urgent' ? 'border-orange-500 bg-orange-500/10 text-orange-600 ring-2 ring-orange-200'
                                          : 'border-secondary bg-secondary/10 text-secondary ring-2 ring-secondary/20'
                                      : 'border-outline-variant/30 text-on-surface-variant hover:border-secondary/40'
                                    }`}
                                >
                                  {level === 'Emergency' && '🚨 '}{level === 'Urgent' && '⚠️ '}{level}
                                </button>
                              ))}
                            </div>
                            <InputError message={errors.urgency} />
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
                              <div>
                                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Phone</p>
                                <p className="font-bold text-lg text-primary">{formData.phone || 'Not provided'}</p>
                              </div>
                              <div>
                                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Urgency</p>
                                <p className={`font-bold text-lg ${formData.urgency === 'Emergency' ? 'text-red-600' : formData.urgency === 'Urgent' ? 'text-orange-500' : 'text-primary'}`}>
                                  {formData.urgency}
                                </p>
                              </div>
                            </div>
                            <div className="pt-6 border-t border-outline-variant/30">
                              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1">Additional Notes</label>
                              <textarea
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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
                            type="button"
                            onClick={handleBack}
                            disabled={isSubmitting}
                            className="flex-1 md:flex-none px-8 py-4 rounded-xl font-bold border border-outline-variant/30 hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                          >
                            <ArrowLeft className="w-5 h-5" />
                            Back
                          </button>
                        )}
                        {step < 3 ? (
                          <button
                            type="button"
                            onClick={handleNext}
                            className="flex-1 md:flex-none bg-primary text-white px-10 py-4 rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3"
                          >
                            Next Step
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={handleConfirm}
                            disabled={isSubmitting}
                            className="flex-1 md:flex-none bg-[#25D366] hover:bg-[#1ebe5d] disabled:opacity-70 disabled:cursor-not-allowed text-white px-10 py-4 rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              <>
                                <WhatsAppIcon className="w-5 h-5" />
                                Confirm via WhatsApp
                              </>
                            )}
                          </button>
                        )}
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
