import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/animations/FadeIn';
import { articles, type Article } from '@/data/articles';
import { Search, PlayCircle, ArrowRight, Play, Clock, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Education = () => {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('educationActiveTab') || 'All Insights';
  });

  useEffect(() => {
    localStorage.setItem('educationActiveTab', activeTab);
  }, [activeTab]);

  const tabs = ['All Insights', 'Oral Hygiene', 'Surgery Prep', 'Orthodontics', 'Patient Care'];

  const filteredArticles = activeTab === 'All Insights' 
    ? articles 
    : articles.filter(a => a.category === activeTab);

  return (
    <MainLayout>
      {/* Hero */}
      <section className="bg-surface pt-20 pb-20">
        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <FadeIn>
                <span className="inline-block px-4 py-1.5 rounded-full bg-brandRed/10 text-brandRed font-bold text-xs uppercase tracking-wider border border-brandRed/20">
                  Patient Education Center
                </span>
                <h1 className="text-5xl md:text-7xl text-navy leading-tight mt-6">
                  Your Path to Clinical <br/>
                  <span className="text-brandRed">Understanding.</span>
                </h1>
                <p className="text-xl text-muted leading-relaxed max-w-xl">
                  Empowering our patients through evidence-based insights. Explore our curated library of clinical guides, surgical preparations, and preventive care wisdom.
                </p>
              </FadeIn>
            </div>
            
            <FadeIn direction="left" className="flex-1 w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-navy relative group">
              <iframe 
                className="w-full h-full" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="NMDC Education"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="absolute inset-0 bg-navy/40 group-hover:bg-transparent transition-all pointer-events-none flex flex-col justify-end p-8">
                <div className="glass-panel p-6 rounded-2xl">
                  <p className="text-brandRed font-bold text-xs uppercase tracking-widest mb-2">Featured Video</p>
                  <h3 className="text-2xl text-navy">Advanced Maxillofacial Solutions</h3>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Sticky Filters */}
      <section className="bg-white border-y border-border sticky top-16 z-40 py-6">
        <Container>
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
              <input 
                type="text" 
                placeholder="Search clinical topics..." 
                className="w-full pl-12 pr-6 py-3 bg-surface border-none rounded-xl focus:ring-2 focus:ring-brandRed/20 outline-none"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide w-full md:w-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={clsx(
                    'px-6 py-2 rounded-full font-bold whitespace-nowrap transition-all',
                    activeTab === tab 
                      ? 'bg-navy text-white shadow-lg' 
                      : 'bg-surface text-muted hover:bg-navy/5'
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Blog Grid */}
      <section className="section-padding bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </AnimatePresence>
          </div>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="bg-navy text-white section-padding relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-5 pointer-events-none">
          <PlayCircle size={400} className="absolute -right-20 -top-20" />
        </div>
        <Container className="relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl mb-8">Stay Informed. <br/><span className="text-brandRed">Smile Brighter.</span></h2>
            <p className="text-xl text-white/60 mb-10">
              Join 2,500+ patients who receive our monthly "Dental Digest" — the latest in oral health science and clinic updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-8 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:ring-2 focus:ring-brandRed outline-none"
              />
              <Button size="lg" className="bg-brandRed border-none hover:bg-brandRed/90">
                Subscribe Now
              </Button>
            </form>
          </div>
        </Container>
      </section>
    </MainLayout>
  );
};

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-border hover:shadow-2xl transition-all duration-500"
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="p-10 flex flex-col flex-1">
        <div className="flex items-center gap-4 mb-6">
          <span className="px-3 py-1 rounded-full bg-brandRed/5 text-brandRed font-bold text-[10px] uppercase tracking-widest">
            {article.category}
          </span>
          <span className="text-muted text-xs font-semibold flex items-center gap-1">
            <Clock size={14} />
            {article.readTime}
          </span>
        </div>
        <h3 className="text-2xl text-navy mb-4 group-hover:text-brandRed transition-colors leading-snug">
          {article.title}
        </h3>
        <p className="text-muted mb-8 line-clamp-3 leading-relaxed">
          {article.description}
        </p>
        <div className="mt-auto pt-8 border-t border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-xs font-bold text-navy border border-border">
              <User size={18} />
            </div>
            <span className="text-sm font-bold text-navy">{article.author}</span>
          </div>
          <button className="text-brandRed font-bold flex items-center gap-2 group/btn">
            Read More
            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.article>
  );
};

import { clsx } from 'clsx';
export default Education;
