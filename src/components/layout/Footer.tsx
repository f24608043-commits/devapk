import React from 'react';
import { Container } from '../ui/Container';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-border pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <a href="https://nexagrowthsolution.com" target="_blank" rel="noopener noreferrer" className="text-xl font-manrope font-extrabold text-navy mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-brandRed" fill="currentColor"><path d="M7 2C4.24 2 2 4.24 2 7c0 2.85 1.69 5.85 3.25 8.24C6.84 17.63 8.29 19.57 9 21c.35.7.78 1 1.25 1 .53 0 .91-.38 1.05-1 .28-1.22.52-2.95.7-4.15.22-1.4.77-2.85 2-2.85s1.78 1.45 2 2.85c.18 1.2.42 2.93.7 4.15.14.62.52 1 1.05 1 .47 0 .9-.3 1.25-1 .71-1.43 2.16-3.37 3.75-5.76C21.31 12.85 22 9.85 22 7c0-2.76-2.24-5-5-5-1.6 0-3.03.76-3.95 1.94C12.62 3.1 12.33 3 12 3s-.62.1-.95.25L11.05 3.94C10.03 2.76 8.6 2 7 2z" /></svg>
              NMDC
            </a>
            <p className="text-muted mb-6 leading-relaxed">
              Premium maxillofacial and aesthetic dental care in Rawalpindi, Pakistan. Led by elite surgical expertise and dedicated to your oral health.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-all">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-navy mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-muted hover:text-brandRed transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-muted hover:text-brandRed transition-colors">Our Services</Link></li>
              <li><Link to="/reviews" className="text-muted hover:text-brandRed transition-colors">Patient Stories</Link></li>
              <li><Link to="/education" className="text-muted hover:text-brandRed transition-colors">Dental Education</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-navy mb-6">Services</h4>
            <ul className="space-y-4">
              <li><Link to="/services" className="text-muted hover:text-brandRed transition-colors">Maxillofacial Surgery</Link></li>
              <li><Link to="/services" className="text-muted hover:text-brandRed transition-colors">Cosmetic Dentistry</Link></li>
              <li><Link to="/services" className="text-muted hover:text-brandRed transition-colors">Dental Implants</Link></li>
              <li><Link to="/services" className="text-muted hover:text-brandRed transition-colors">Teeth Whitening</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-navy mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted">
                <MapPin size={20} className="text-brandRed shrink-0" />
                <span>123 Healthcare Plaza, Suite 500<br />Medical District</span>
              </li>
              <li className="flex items-center gap-3 text-muted">
                <Phone size={20} className="text-brandRed shrink-0" />
                <span>+92 333 6070227</span>
              </li>
              <li className="flex items-center gap-3 text-muted">
                <Clock size={20} className="text-brandRed shrink-0" />
                <span>Mon - Sat: 9am - 7pm</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-muted text-sm flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
          <a href="https://nexagrowthsolution.com" target="_blank" rel="noopener noreferrer" className="hover:text-brandRed transition-colors">© 2026 NMDC Dental Clinic. All Rights Reserved.</a>
          <span className="hidden md:inline">|</span>
          <span>
            A product by <a href="https://rexcore-web-main-fc0lifhzl-abdullahfayyaz21s-projects.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-brandRed transition-colors">Rex Core Solution</a>
          </span>
        </div>
      </Container>
    </footer>
  );
};
