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
        <Link to="/" className="text-2xl font-manrope font-extrabold text-navy">
          NMDC<span className="text-brandRed">Dental</span>
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
