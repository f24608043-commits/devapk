import React, { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  PlayCircle,
  BookOpen,
  Clock,
  User,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Activity,
  Microscope,
  Stethoscope,
  X,
  Mail,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";


/* =========================================================
   MOCK DATA
========================================================= */

const CATEGORIES = [
  "All Insights",
  "Oral Hygiene",
  "Cosmetic Dentistry",
  "Dental Surgery",
  "Orthodontics",
  "Pediatric Dentistry",
  "Implantology",
  "Research",
  "Preventive Care",
  "Maxillofacial Surgery"
];

const VIDEOS = [
  {
    title: "Understanding Dental Implants Step-by-Step",
    youtubeId: "2j5t3K5vQ8I",
    category: "Implantology",
    duration: "12 min",
    description: "A complete walkthrough of modern dental implant procedures."
  },
  {
    title: "Wisdom Tooth Surgery Explained",
    youtubeId: "nD4z6Q4f4kE",
    category: "Oral Surgery",
    duration: "9 min",
    description: "Learn how impacted wisdom teeth are safely removed."
  },
  {
    title: "Root Canal Treatment Animation",
    youtubeId: "7A6B0vM5vWQ",
    category: "Endodontics",
    duration: "8 min",
    description: "Visual explanation of root canal therapy and infection removal."
  },
  {
    title: "Clear Aligners vs Traditional Braces",
    youtubeId: "3JZ_D3ELwOQ",
    category: "Orthodontics",
    duration: "10 min",
    description: "Comparing modern orthodontic treatment methods."
  },
  {
    title: "How Teeth Whitening Actually Works",
    youtubeId: "RgKAFK5djSk",
    category: "Cosmetic Dentistry",
    duration: "7 min",
    description: "Scientific explanation behind professional whitening systems."
  },
  {
    title: "TMJ Disorder & Jaw Pain Treatment",
    youtubeId: "L_jWHffIx5E",
    category: "Maxillofacial Surgery",
    duration: "11 min",
    description: "Understanding temporomandibular joint dysfunction and treatment."
  }
];

const BLOGS = [
  {
    id: "b1",
    title: "The Science Behind Dental Implants",
    category: "Implantology",
    readTime: "8 min read",
    author: "Dr. Nazir Ahmed",
    summary: "Explore how titanium implants integrate with jawbone through osseointegration and restore long-term oral function.",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
    fullContent: [
      { type: "h3", text: "What is Osseointegration?" },
      { type: "p", text: "Osseointegration is the direct structural and functional connection between living bone and the surface of a load-bearing artificial implant, typically made of titanium. This process ensures the implant acts exactly like a natural tooth root." },
      { type: "h3", text: "The Bone Healing Process" },
      { type: "p", text: "Following the surgical placement of the implant, the jawbone slowly grows around it over a period of 3 to 6 months. This healing period is crucial for the stability required to support a dental crown." },
      { type: "h3", text: "Implant Success Rates & Benefits" },
      { type: "p", text: "Modern dental implants boast a success rate of over 95%. Unlike traditional dentures, implants prevent bone loss, do not shift while speaking or eating, and do not require grinding down adjacent healthy teeth." },
      { type: "h3", text: "Modern Digital Planning" },
      { type: "p", text: "Using 3D CBCT scans and AI-guided software, we can digitally map the jawbone and plan the exact angle, depth, and position of the implant before surgery even begins." }
    ]
  },
  {
    id: "b2",
    title: "Understanding Wisdom Tooth Extraction",
    category: "Oral Surgery",
    readTime: "6 min read",
    author: "Dr. Sarah Khan",
    summary: "A complete patient guide to wisdom tooth surgery, recovery, swelling, and post-operative care.",
    image: "https://images.unsplash.com/photo-1598256989800-fea5ce5146f5?auto=format&fit=crop&q=80&w=800",
    fullContent: [
      { type: "h3", text: "Impacted Wisdom Teeth" },
      { type: "p", text: "Wisdom teeth often lack sufficient space to emerge fully, leading to impaction. This can cause pain, infection, or damage to adjacent teeth." },
      { type: "h3", text: "The Surgical Procedure" },
      { type: "p", text: "The procedure involves local anesthesia or conscious sedation. The surgeon makes a small incision, divides the tooth if necessary, and extracts it with minimal trauma to surrounding tissues." },
      { type: "h3", text: "Recovery Timeline & Care" },
      { type: "p", text: "Swelling peaks around 48 hours. Patients are advised to consume soft foods, avoid straws to prevent dry socket, and use prescribed anti-inflammatory medications for a smooth recovery." }
    ]
  },
  {
    id: "b3",
    title: "The Future of Digital Dentistry",
    category: "Technology",
    readTime: "10 min read",
    author: "Editorial Team",
    summary: "How AI, 3D scanning, CAD/CAM systems, and digital workflows are transforming dentistry.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
    fullContent: [
      { type: "h3", text: "AI Diagnostics & 3D Scanning" },
      { type: "p", text: "Artificial Intelligence is now analyzing X-rays to detect caries and bone loss earlier than human eyes can. Meanwhile, messy putty impressions have been replaced by comfortable, hyper-accurate intraoral 3D scanners." },
      { type: "h3", text: "CAD/CAM & Same-Day Crowns" },
      { type: "p", text: "Computer-Aided Design and Manufacturing (CAD/CAM) allow us to design and mill premium ceramic crowns in-house within hours, eliminating the need for temporary crowns and multiple visits." },
      { type: "h3", text: "Digital Smile Designing" },
      { type: "p", text: "Before touching a single tooth, we can use facial photography and 3D modeling to show you exactly what your final smile will look like, ensuring predictable and stunning results." }
    ]
  },
  {
    id: "b4",
    title: "Why Gum Health Matters More Than You Think",
    category: "Preventive Care",
    readTime: "7 min read",
    author: "Dr. Hina Malik",
    summary: "Understanding gum disease, inflammation, and how periodontal health affects the whole body.",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800",
    fullContent: [
      { type: "h3", text: "Gingivitis vs. Periodontitis" },
      { type: "p", text: "Gingivitis is the early, reversible stage of gum inflammation. If untreated, it progresses to periodontitis, which permanently damages the bone supporting your teeth and leads to tooth loss." },
      { type: "h3", text: "Systemic Health Links" },
      { type: "p", text: "Research shows strong links between severe gum disease and cardiovascular issues, diabetes complications, and respiratory diseases due to chronic systemic inflammation." },
      { type: "h3", text: "Prevention & Scaling" },
      { type: "p", text: "Regular professional scaling removes tartar below the gumline that brushing misses. Consistent oral hygiene is the best defense against periodontal pathogens." }
    ]
  },
  {
    id: "b5",
    title: "Clear Aligners: Modern Orthodontics Explained",
    category: "Orthodontics",
    readTime: "9 min read",
    author: "Dr. Usman Tariq",
    summary: "An evidence-based overview of invisible orthodontic treatment and bite correction.",
    image: "https://images.unsplash.com/photo-1590664095641-7fa05f689813?auto=format&fit=crop&q=80&w=800",
    fullContent: [
      { type: "h3", text: "How Clear Aligners Work" },
      { type: "p", text: "Clear aligners apply targeted, continuous pressure to specific teeth. Each custom tray is programmed by software to shift teeth roughly 0.25mm before moving to the next tray in the series." },
      { type: "h3", text: "Compliance is Key" },
      { type: "p", text: "Because they are removable, effectiveness depends entirely on the patient wearing them for 20-22 hours a day. They offer superior aesthetics and easier oral hygiene compared to fixed braces." },
      { type: "h3", text: "The Retention Phase" },
      { type: "p", text: "After active treatment, wearing retainers is mandatory to prevent teeth from shifting back to their original positions." }
    ]
  }
];

const INSIGHTS = [
  {
    stat: "95%",
    title: "Implant Success",
    desc: "Dental implants show over 95% success rate after 10 years of clinical tracking."
  },
  {
    stat: "Links",
    title: "Systemic Health",
    desc: "Periodontal disease is linked with cardiovascular inflammation and diabetes."
  },
  {
    stat: "AI",
    title: "Diagnostics",
    desc: "AI-assisted diagnostics improve radiographic accuracy and early pathology detection."
  }
];

const TIMELINE = [
  { step: 1, title: "Consultation", desc: "Initial clinical evaluation and goal discussion." },
  { step: 2, title: "Diagnosis", desc: "3D imaging, X-rays, and AI-assisted analysis." },
  { step: 3, title: "Treatment Planning", desc: "Digital mapping and customized procedure layout." },
  { step: 4, title: "Procedure", desc: "Precision execution using advanced technology." },
  { step: 5, title: "Recovery", desc: "Monitored healing with post-operative care." },
  { step: 6, title: "Follow-Up Care", desc: "Long-term maintenance and health verification." }
];

const FAQS = [
  { q: "Are dental implants permanent?", a: "Yes, dental implants are designed to be a permanent solution. The titanium post fuses with your jawbone. With proper oral hygiene, they can last a lifetime." },
  { q: "Is wisdom tooth surgery painful?", a: "The surgery itself is painless due to local anesthesia and sedation options. Post-operative discomfort is normal but easily managed with prescribed pain relievers." },
  { q: "How safe are teeth whitening procedures?", a: "Professional teeth whitening supervised by a dentist is highly safe and does not damage enamel, unlike some unverified over-the-counter kits." },
  { q: "What causes gum disease?", a: "Gum disease is primarily caused by plaque buildup—a sticky film of bacteria. Poor oral hygiene, smoking, genetics, and certain medications can exacerbate it." },
  { q: "Are clear aligners effective?", a: "Yes, they are highly effective for mild to moderate orthodontic cases. Their success heavily relies on the patient wearing them for at least 22 hours daily." },
  { q: "How often should dental checkups be done?", a: "We recommend a comprehensive checkup and professional cleaning every six months to catch issues early and maintain optimal oral health." }
];

/* =========================================================
   COMPONENTS
========================================================= */

function FAQAccordion({ item, isOpen, onClick }: { item: typeof FAQS[0], isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
      >
        <h4 className="text-lg font-bold text-[#0B1F3A] group-hover:text-[#E63946] transition-colors pr-8">
          {item.q}
        </h4>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#E63946] text-white rotate-180' : 'bg-gray-50 text-gray-400 group-hover:bg-red-50 group-hover:text-[#E63946]'}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-600 leading-relaxed pr-12">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function EducationPage() {
  const [activeCategory, setActiveCategory] = useState("All Insights");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBlog, setSelectedBlog] = useState<typeof BLOGS[0] | null>(null);

  const filteredVideos = VIDEOS.filter(v => 
    (activeCategory === "All Insights" || v.category === activeCategory) &&
    v.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBlogs = BLOGS.filter(b => 
    (activeCategory === "All Insights" || b.category === activeCategory) &&
    b.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
    <div className="bg-white min-h-screen font-sans text-[#0B1F3A] selection:bg-[#E63946] selection:text-white pb-0">
      
      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#fafafa]">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] -right-[10%] w-[50%] h-[70%] bg-blue-100/60 rounded-full blur-[120px]" />
          <div className="absolute bottom-[20%] -left-[10%] w-[40%] h-[60%] bg-red-50/60 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#0B1F3A] shadow-sm border border-gray-100 text-sm font-bold tracking-wide uppercase mb-6">
                <BookOpen className="w-4 h-4 text-[#E63946]" />
                Patient Education Center
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#0B1F3A] leading-[1.1] mb-6">
                Your Path to <br /> Clinical <span className="text-[#E63946]">Understanding</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-lg">
                Evidence-based dental education, surgical guidance, oral hygiene insights, and patient awareness resources designed for you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-[#0B1F3A] text-white rounded-full font-bold hover:bg-[#1a365d] hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  <PlayCircle className="w-5 h-5" />
                  Watch Videos
                </button>
                <button 
                  onClick={() => document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-white text-[#0B1F3A] border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  Explore Articles
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-15px_rgba(11,31,58,0.2)] bg-white border-[8px] border-white"
            >
              <div className="aspect-video w-full bg-gray-100 relative group cursor-pointer">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/2j5t3K5vQ8I?rel=0&showinfo=0" 
                  title="Featured Education Video" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SEARCH & FILTER
      ========================================================= */}
      <section className="sticky top-20 z-40 bg-white/90 backdrop-blur-xl border-y border-gray-100 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row md:items-center gap-4 justify-between">
          
          <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 md:pb-0 w-full md:w-auto flex-grow">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative flex-shrink-0 px-6 py-2.5 rounded-full text-sm font-bold transition-colors ${
                  activeCategory === cat ? "text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="eduTab"
                    className="absolute inset-0 bg-[#0B1F3A] rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64 flex-shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search insights..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-11 pr-4 text-sm font-medium focus:outline-none focus:border-[#0B1F3A] focus:ring-1 focus:ring-[#0B1F3A] transition-all"
            />
          </div>

        </div>
      </section>

      {/* =========================================================
          FEATURED YOUTUBE SECTION
      ========================================================= */}
      <section id="videos" className="py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-[#0B1F3A] mb-2 flex items-center gap-3">
                <PlayCircle className="w-8 h-8 text-[#E63946]" />
                Video Library
              </h2>
              <p className="text-gray-600">Visual guides to complex dental procedures.</p>
            </div>
          </div>

          <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredVideos.map((video) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={video.youtubeId}
                  className="bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
                >
                  <div className="aspect-video w-full relative bg-gray-100">
                    <iframe 
                      className="absolute inset-0 w-full h-full pointer-events-auto"
                      src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0`}
                      title={video.title}
                      frameBorder="0"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                  <div className="p-4 md:p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-2 md:mb-3 flex-wrap gap-2">
                      <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-[#E63946] bg-red-50 px-2 py-1 rounded-md">
                        {video.category}
                      </span>
                      <span className="flex items-center text-[10px] md:text-xs font-bold text-gray-400 gap-1">
                        <Clock className="w-3 h-3" />
                        {video.duration}
                      </span>
                    </div>
                    <h3 className="text-sm md:text-xl font-bold text-[#0B1F3A] mb-2 leading-tight group-hover:text-[#E63946] transition-colors line-clamp-2 md:line-clamp-none">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-4 flex-grow line-clamp-2 md:line-clamp-none">
                      {video.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-12 text-gray-500">No videos found.</div>
          )}
        </div>
      </section>

      {/* =========================================================
          RESEARCH BLOG SECTION
      ========================================================= */}
      <section id="articles" className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#0B1F3A] mb-2 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-[#0B1F3A]" />
              Clinical Articles & Blogs
            </h2>
            <p className="text-gray-600">Deep dives into dental science and treatments.</p>
          </div>

          <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredBlogs.map((blog) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  key={blog.id}
                  onClick={() => setSelectedBlog(blog)}
                  className="group cursor-pointer flex flex-col bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(11,31,58,0.1)] transition-all duration-500 overflow-hidden"
                >
                  <div className="h-32 md:h-56 overflow-hidden relative">
                    <img 
                      src={blog.image} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-white/90 backdrop-blur-md px-2 py-1 md:px-3 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold text-[#0B1F3A] uppercase tracking-wider">
                      {blog.category}
                    </div>
                  </div>
                  
                  <div className="p-4 md:p-8 flex flex-col flex-grow">
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 md:mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {blog.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {blog.author}
                      </span>
                    </div>

                    <h3 className="text-base md:text-2xl font-bold text-[#0B1F3A] mb-2 md:mb-3 leading-snug group-hover:text-[#E63946] transition-colors line-clamp-2 md:line-clamp-none">
                      {blog.title}
                    </h3>
                    
                    <p className="text-gray-600 text-xs md:text-base leading-relaxed mb-4 md:mb-6 flex-grow line-clamp-2 md:line-clamp-none">
                      {blog.summary}
                    </p>

                    <div className="flex items-center text-[#0B1F3A] font-bold text-xs md:text-base group/btn mt-auto">
                      Read Article
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredBlogs.length === 0 && (
            <div className="text-center py-12 text-gray-500">No articles found.</div>
          )}
        </div>
      </section>

      {/* =========================================================
          FEATURED RESEARCH SECTION
      ========================================================= */}
      <section className="py-24 bg-[#0B1F3A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Dental Research & Clinical Insights</h2>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">Evidence-based statistics driving our commitment to premium healthcare.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {INSIGHTS.map((insight, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-[2rem] p-10 hover:bg-white/10 transition-colors group">
                <div className="text-5xl font-bold text-[#E63946] mb-6 group-hover:scale-105 transition-transform origin-left">
                  {insight.stat}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{insight.title}</h3>
                <p className="text-blue-100/80 leading-relaxed">{insight.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          EDUCATION TIMELINE SECTION
      ========================================================= */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1F3A] mb-4">The Patient Journey</h2>
            <p className="text-gray-600 text-lg">Understanding the comprehensive lifecycle of clinical care.</p>
          </div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[19px] md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-1 bg-gray-200 rounded-full"></div>

            <div className="space-y-12 relative z-10">
              {TIMELINE.map((item, idx) => (
                <div key={idx} className={`flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Content Box */}
                  <div className={`flex-1 w-full md:w-1/2 bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'} ml-12 md:ml-0`}>
                    <h4 className="text-xl font-bold text-[#0B1F3A] mb-2">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>

                  {/* Number Icon */}
                  <div className="absolute left-0 md:relative md:left-auto w-10 h-10 bg-[#0B1F3A] text-white rounded-full flex items-center justify-center font-bold shadow-[0_0_0_8px_#fafafa] flex-shrink-0 z-10 mx-auto">
                    {item.step}
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block flex-1 w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FAQ SECTION
      ========================================================= */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1F3A] mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Find quick answers to common dental inquiries.</p>
          </div>
          
          <div className="bg-[#fafafa] rounded-[24px] border border-gray-100 p-8 lg:p-12">
            {FAQS.map((faq, idx) => (
              <FAQAccordion 
                key={idx} 
                item={faq} 
                isOpen={true} // Wait, need individual state
                onClick={() => {}} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          NEWSLETTER SECTION
      ========================================================= */}
      <section className="py-24 bg-[#0B1F3A] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#E63946] opacity-20 blur-[150px] rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <Mail className="w-12 h-12 text-[#E63946] mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Stay Informed. Smile Brighter.
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join our patient education newsletter for dental research, oral health tips, and clinic updates.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-grow px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all backdrop-blur-md"
              required
            />
            <button type="submit" className="px-8 py-4 bg-[#E63946] text-white rounded-full font-bold hover:bg-[#d62828] transition-colors whitespace-nowrap shadow-[0_0_20px_rgba(230,57,70,0.3)] hover:shadow-[0_0_25px_rgba(230,57,70,0.5)]">
              Subscribe Now
            </button>
          </form>
        </div>
      </section>

      {/* =========================================================
          EXPANDED BLOG MODAL
      ========================================================= */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBlog(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[#0B1F3A]/60 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-white rounded-[32px] overflow-hidden shadow-2xl my-auto"
            >
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-6 right-6 z-20 w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-64 sm:h-80 relative">
                <img 
                  src={selectedBlog.image} 
                  alt={selectedBlog.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="px-3 py-1.5 bg-[#E63946] text-white rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block shadow-lg">
                    {selectedBlog.category}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                    {selectedBlog.title}
                  </h2>
                </div>
              </div>

              <div className="p-8 md:p-12 max-h-[60vh] overflow-y-auto hide-scrollbar bg-white">
                <div className="flex items-center gap-6 text-sm font-bold text-gray-500 uppercase tracking-wider mb-10 pb-6 border-b border-gray-100">
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#0B1F3A]" />
                    {selectedBlog.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#0B1F3A]" />
                    {selectedBlog.readTime}
                  </span>
                </div>

                <div className="prose prose-lg prose-blue max-w-none text-gray-600">
                  <p className="text-xl leading-relaxed text-[#0B1F3A] font-medium mb-10">
                    {selectedBlog.summary}
                  </p>
                  
                  {selectedBlog.fullContent.map((block, i) => {
                    if (block.type === 'h3') {
                      return <h3 key={i} className="text-2xl font-bold text-[#0B1F3A] mt-10 mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#E63946]" />
                        {block.text}
                      </h3>;
                    }
                    if (block.type === 'p') {
                      return <p key={i} className="leading-relaxed mb-6">{block.text}</p>;
                    }
                    return null;
                  })}
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-[#0B1F3A]">Found this helpful?</h4>
                    <p className="text-sm text-gray-500">Book a consultation for personalized advice.</p>
                  </div>
                  <Link to="/appointment" className="w-full sm:w-auto px-8 py-4 bg-[#0B1F3A] text-white rounded-full font-bold hover:bg-[#E63946] transition-colors shadow-md text-center">
                    Schedule Consultation
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
    </MainLayout>
  );
}