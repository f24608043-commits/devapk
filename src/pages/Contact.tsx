import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageSquare, ShieldCheck, ExternalLink, Loader2 } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Container } from '@/components/ui/Container';
import { MainLayout } from '@/layouts/MainLayout';
import { generateContactMessage, openWhatsApp, type ContactFormData } from '@/lib/whatsapp';

// Simple WhatsApp SVG icon component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface FormErrors {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const validateContactForm = (data: ContactFormData): FormErrors => {
  const errors: FormErrors = {};
  if (!data.fullName.trim()) errors.fullName = 'Full name is required';
  if (!data.phoneNumber.trim()) errors.phoneNumber = 'Phone number is required';
  else if (data.phoneNumber.replace(/\D/g, '').length < 7) errors.phoneNumber = 'Enter a valid phone number';
  if (!data.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Enter a valid email';
  if (!data.subject.trim()) errors.subject = 'Subject is required';
  if (!data.message.trim()) errors.message = 'Message is required';
  return errors;
};

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    subject: 'Maxillofacial Consultation',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Small delay for UX polish
    await new Promise(resolve => setTimeout(resolve, 800));

    const message = generateContactMessage(formData);
    openWhatsApp(message);

    setIsSubmitting(false);
    setShowSuccess(true);
    setFormData({ fullName: '', phoneNumber: '', email: '', subject: 'Maxillofacial Consultation', message: '' });
    setErrors({});
    setTimeout(() => setShowSuccess(false), 4000);
  };

  const InputError = ({ message }: { message?: string }) =>
    message ? (
      <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-xs font-semibold mt-1 ml-1">
        {message}
      </motion.p>
    ) : null;

  return (
    <MainLayout>
      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-[#25D366] text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-bold"
          >
            <WhatsAppIcon className="w-6 h-6" />
            Message sent to WhatsApp!
          </motion.div>
        )}
      </AnimatePresence>

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
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-on-surface-variant ml-1">Full Name</label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          value={formData.fullName}
                          onChange={(e) => handleChange('fullName', e.target.value)}
                          className={`w-full bg-surface-container-low border-2 ${errors.fullName ? 'border-red-400' : 'border-transparent'} rounded-xl p-4 focus:ring-2 focus:ring-secondary transition-all outline-none`}
                        />
                        <InputError message={errors.fullName} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-on-surface-variant ml-1">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+92 333 1234567"
                          value={formData.phoneNumber}
                          onChange={(e) => handleChange('phoneNumber', e.target.value)}
                          className={`w-full bg-surface-container-low border-2 ${errors.phoneNumber ? 'border-red-400' : 'border-transparent'} rounded-xl p-4 focus:ring-2 focus:ring-secondary transition-all outline-none`}
                        />
                        <InputError message={errors.phoneNumber} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-on-surface-variant ml-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={`w-full bg-surface-container-low border-2 ${errors.email ? 'border-red-400' : 'border-transparent'} rounded-xl p-4 focus:ring-2 focus:ring-secondary transition-all outline-none`}
                      />
                      <InputError message={errors.email} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-on-surface-variant ml-1">Nature of Inquiry</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => handleChange('subject', e.target.value)}
                        className={`w-full bg-surface-container-low border-2 ${errors.subject ? 'border-red-400' : 'border-transparent'} rounded-xl p-4 focus:ring-2 focus:ring-secondary transition-all outline-none appearance-none`}
                      >
                        <option>Maxillofacial Consultation</option>
                        <option>Routine Checkup</option>
                        <option>Orthodontics</option>
                        <option>Emergency Care</option>
                        <option>Other</option>
                      </select>
                      <InputError message={errors.subject} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-on-surface-variant ml-1">Your Message</label>
                      <textarea
                        rows={4}
                        placeholder="How can we help you today?"
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        className={`w-full bg-surface-container-low border-2 ${errors.message ? 'border-red-400' : 'border-transparent'} rounded-xl p-4 focus:ring-2 focus:ring-secondary transition-all outline-none resize-none`}
                      ></textarea>
                      <InputError message={errors.message} />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#25D366] hover:bg-[#1ebe5d] disabled:opacity-70 disabled:cursor-not-allowed text-white py-5 rounded-xl font-bold text-lg hover:scale-[1.01] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <WhatsAppIcon className="w-5 h-5" />
                          Send via WhatsApp
                        </>
                      )}
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
                          <p className="text-xl font-bold">+92 333 6070227</p>
                        </div>
                      </div>
                      <a href="https://wa.me/923336070227" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-colors group">
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
              <iframe
                src="https://maps.google.com/maps?q=NMDC+Dental+Clinic,+Rawalpindi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                title="Google Maps Location"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/50 max-w-sm">
                <h4 className="text-2xl font-bold text-primary mb-2">Getting Here</h4>
                <p className="text-on-surface-variant mb-6">
                  Valet parking is available at the main entrance for all surgical consultations.
                </p>
                <a 
                  href="https://maps.app.goo.gl/kZbK5j4cCv7USKMK8?g_st=aw" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-secondary font-bold hover:gap-3 transition-all"
                >
                  Open in Google Maps
                  <ExternalLink className="w-5 h-5" />
                </a>
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
