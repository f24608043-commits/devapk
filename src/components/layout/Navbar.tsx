import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Education', path: '/education' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={clsx(
      'sticky top-0 w-full z-50 transition-all duration-300',
      isScrolled ? 'bg-white/90 backdrop-blur-xl border-b border-border shadow-sm h-16' : 'bg-white/50 backdrop-blur-md h-20'
    )}>
      <Container className="flex justify-between items-center h-full">
        <Link to="/" className="text-2xl font-manrope font-extrabold text-navy flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-7 h-7 text-brandRed" fill="currentColor"><path d="M7 2C4.24 2 2 4.24 2 7c0 2.85 1.69 5.85 3.25 8.24C6.84 17.63 8.29 19.57 9 21c.35.7.78 1 1.25 1 .53 0 .91-.38 1.05-1 .28-1.22.52-2.95.7-4.15.22-1.4.77-2.85 2-2.85s1.78 1.45 2 2.85c.18 1.2.42 2.93.7 4.15.14.62.52 1 1.05 1 .47 0 .9-.3 1.25-1 .71-1.43 2.16-3.37 3.75-5.76C21.31 12.85 22 9.85 22 7c0-2.76-2.24-5-5-5-1.6 0-3.03.76-3.95 1.94C12.62 3.1 12.33 3 12 3s-.62.1-.95.25L11.05 3.94C10.03 2.76 8.6 2 7 2z" /></svg>
          NMDC
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => clsx(
                'nav-link transition-colors hover:text-brandRed',
                isActive && 'nav-link-active'
              )}
            >
              {link.name}
            </NavLink>
          ))}
          <Button size="sm" onClick={() => navigate('/appointment')}>
            Book Appointment
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-navy p-2 z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 w-full bg-white shadow-2xl border-b border-border pt-24 pb-12 px-6 md:hidden"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => clsx(
                      'text-xl font-bold text-navy py-2',
                      isActive && 'text-brandRed border-l-4 border-brandRed pl-4'
                    )}
                  >
                    {link.name}
                  </NavLink>
                ))}
                <Button className="w-full mt-4" onClick={() => { navigate('/appointment'); setIsMobileMenuOpen(false); }}>
                  Book Appointment
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
};
