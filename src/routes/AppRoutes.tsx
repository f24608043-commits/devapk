import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Education from '@/pages/Education';
import Reviews from '@/pages/Reviews';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Appointment from '@/pages/Appointment';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/education" element={<Education />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/appointment" element={<Appointment />} />
    </Routes>
  );
};
