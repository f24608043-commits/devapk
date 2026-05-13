import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { HeroSection } from '@/components/sections/home/HeroSection';
import { ServicesPreview } from '@/components/sections/home/ServicesPreview';
import { SpecialistsSection } from '@/components/sections/home/SpecialistsSection';
import { TestimonialsSection } from '@/components/sections/home/TestimonialsSection';
import { CTASection } from '@/components/sections/home/CTASection';

const Home = () => {
  return (
    <MainLayout>
      <HeroSection />
      <ServicesPreview />
      <SpecialistsSection />
      <TestimonialsSection />
      <CTASection />
    </MainLayout>
  );
};

export default Home;
