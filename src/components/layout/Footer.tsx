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
            <Link to="/" className="text-xl font-manrope font-extrabold text-navy mb-6 block">
              NMDC<span className="text-brandRed">Dental</span>
            </Link>
            <p className="text-muted mb-6 leading-relaxed">
              Precision maxillofacial and aesthetic dental care for a global clientele. Led by elite surgical expertise.
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
                <span>123 Healthcare Plaza, Suite 500<br/>Medical District</span>
              </li>
              <li className="flex items-center gap-3 text-muted">
                <Phone size={20} className="text-brandRed shrink-0" />
                <span>+1 (555) DENTAL-HELP</span>
              </li>
              <li className="flex items-center gap-3 text-muted">
                <Clock size={20} className="text-brandRed shrink-0" />
                <span>Mon - Sat: 9am - 7pm</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border text-center text-muted text-sm">
          © {new Date().getFullYear()} NMDC Dental Clinic. All Rights Reserved.
        </div>
      </Container>
    </footer>
  );
};
