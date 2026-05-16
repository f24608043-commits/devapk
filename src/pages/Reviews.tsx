import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer } from '@/components/animations/StaggerContainer';
import { reviews, type Review } from '@/data/reviews';
import { Star, Play, CloudUpload, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Reviews = () => {
  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover" 
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop" 
            alt="NMDC Reception"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/40 to-transparent"></div>
        </div>
        
        <Container className="relative z-10 w-full">
          <div className="max-w-2xl">
            <FadeIn>
              <span className="inline-block py-1 px-3 rounded-full bg-brandRed text-white font-bold text-xs uppercase tracking-widest mb-6">
                Patient Voices
              </span>
              <h1 className="text-5xl md:text-7xl text-white mb-6 leading-tight">
                Where Trust Meets <br/>
                <span className="text-brandRed">Precision Care.</span>
              </h1>
              <p className="text-xl text-white/80 mb-10 leading-relaxed">
                Read firsthand accounts of how Brig. Dr. Nazir and our specialist team are transforming smiles with maxillofacial excellence and compassionate dentistry.
              </p>
              
              <div className="glass-panel p-8 rounded-3xl flex items-center gap-6 max-w-sm">
                <div className="text-center">
                  <div className="text-4xl font-manrope font-bold text-navy">4.9</div>
                  <div className="flex text-brandRed mt-1">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                </div>
                <div className="h-12 w-px bg-border"></div>
                <div className="text-muted font-bold text-sm">Based on 1,200+ <br/>Patient Reviews</div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Success Stories */}
      <section className="section-padding bg-white">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <FadeIn>
                <h2 className="text-4xl md:text-5xl text-navy mb-4">Featured Success Stories</h2>
                <p className="text-lg text-muted">Every smile tells a story of confidence regained. Explore our patients' journeys through advanced dental care.</p>
              </FadeIn>
            </div>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* Form Section */}
      <section className="bg-surface section-padding">
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <FadeIn direction="right">
            <form className="bg-white p-6 md:p-10 lg:p-16 rounded-3xl md:rounded-[3rem] shadow-2xl space-y-6 md:space-y-8 border border-border">
              <div>
                <h3 className="text-3xl text-navy mb-2">Share Your Experience</h3>
                <p className="text-muted">Your feedback helps us maintain our standard of excellence.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-navy uppercase tracking-widest">Full Name</label>
                  <input className="w-full bg-surface border-none rounded-xl py-4 px-6 outline-none focus:ring-2 focus:ring-brandRed/20" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-navy uppercase tracking-widest">Treatment</label>
                  <select className="w-full bg-surface border-none rounded-xl py-4 px-6 outline-none focus:ring-2 focus:ring-brandRed/20">
                    <option>Maxillofacial Surgery</option>
                    <option>Dental Implants</option>
                    <option>Teeth Whitening</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-navy uppercase tracking-widest">Rating</label>
                <div className="flex gap-2 text-border hover:text-brandRed">
                  {[...Array(5)].map((_, i) => <Star key={i} size={32} className="cursor-pointer hover:fill-current" />)}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-navy uppercase tracking-widest">Your Story</label>
                <textarea className="w-full bg-surface border-none rounded-xl py-4 px-6 outline-none focus:ring-2 focus:ring-brandRed/20 min-h-[150px]" placeholder="How was your visit?"></textarea>
              </div>

              <div className="border-2 border-dashed border-border rounded-2xl md:rounded-3xl p-6 md:p-10 flex flex-col items-center justify-center bg-surface hover:bg-white transition-all cursor-pointer group text-center">
                <CloudUpload size={40} className="text-muted group-hover:text-brandRed mb-2 transition-colors" />
                <span className="text-muted font-bold">Drop image or click to upload</span>
              </div>

              <Button size="lg" className="w-full py-5 rounded-2xl shadow-xl shadow-brandRed/10">
                Submit Review
              </Button>
            </form>
          </FadeIn>

          <div className="space-y-12">
            <FadeIn direction="left" className="relative rounded-3xl overflow-hidden aspect-video shadow-2xl group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Clinic Video"
              />
              <div className="absolute inset-0 bg-navy/20 flex items-center justify-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-brandRed shadow-2xl group-hover:scale-110 transition-transform">
                  <Play size={40} fill="currentColor" />
                </div>
              </div>
            </FadeIn>

            <div className="grid grid-cols-3 gap-4 md:gap-8">
              <StatItem label="Satisfaction" value="98%" />
              <StatItem label="Happy Smiles" value="50k+" />
              <StatItem label="Experience" value="25yr" />
            </div>
          </div>
        </Container>
      </section>
    </MainLayout>
  );
};

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="glass-panel p-6 md:p-12 rounded-3xl md:rounded-[3rem] border border-border card-hover relative group">
    <div className="flex gap-4 md:gap-6 mb-6 md:mb-10 items-center">
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white shadow-xl overflow-hidden shrink-0">
        <img src={review.image} className="w-full h-full object-cover" alt={review.name} />
      </div>
      <div>
        <h3 className="text-xl md:text-2xl text-navy font-bold leading-tight">{review.name}</h3>
        <p className="text-brandRed font-bold text-xs md:text-sm">{review.treatment}</p>
      </div>
    </div>
    
    <div className="flex gap-1 text-brandRed mb-6 md:mb-8">
      {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} className="md:w-5 md:h-5" fill="currentColor" />)}
    </div>

    <p className="text-base md:text-xl text-navy italic leading-relaxed mb-6 md:mb-10">"{review.content}"</p>

    {review.galleryImages && (
      <div className="flex gap-3 md:gap-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 lg:translate-y-4 lg:group-hover:translate-y-0 overflow-x-auto pb-2 hide-scrollbar">
        {review.galleryImages.map((img, i) => (
          <div key={i} className="w-16 h-16 md:w-24 md:h-24 rounded-xl md:rounded-2xl overflow-hidden border border-border shrink-0">
            <img src={img} className="w-full h-full object-cover" alt="Review Gallery" />
          </div>
        ))}
      </div>
    )}
  </div>
);

const StatItem = ({ label, value }: { label: string, value: string }) => (
  <div className="text-center px-2">
    <div className="text-2xl md:text-4xl font-manrope font-bold text-navy mb-1">{value}</div>
    <div className="text-[10px] md:text-xs font-bold text-muted uppercase tracking-widest">{label}</div>
  </div>
);

import { clsx } from 'clsx';
export default Reviews;
