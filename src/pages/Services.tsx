import React, { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Sparkles,
  Activity,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Clock,
  Microscope,
  Stethoscope,
  Smile,
  Info
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";


/* =========================================================
   TYPES
========================================================= */

type ServiceCategory =
  | "All Services"
  | "General Dentistry"
  | "Cosmetic Dentistry"
  | "Restorative Dentistry"
  | "Orthodontics"
  | "Oral Surgery"
  | "Maxillofacial Surgery"
  | "Preventive Care"
  | "Pediatric Dentistry"
  | "Emergency Care";

type Service = {
  id: string;
  category: ServiceCategory[];
  title: string;
  short: string;
  long: string;
  benefits: string[];
  procedure: string[];
  recovery: string;
  duration: string;
  image: string;
  type: "dental" | "maxillofacial";
};

/* =========================================================
   MOCK DATA
========================================================= */

const SERVICES_DATA: Service[] = [
  // --- DENTAL SERVICES ---
  {
    id: "d1",
    type: "dental",
    category: ["All Services", "General Dentistry", "Preventive Care"],
    title: "Dental Fillings",
    short: "Restore decayed teeth naturally.",
    long: "Premium composite tooth-colored fillings restore the strength and appearance of your teeth after decay removal. We use advanced materials that bond perfectly to your natural enamel, ensuring long-lasting and invisible repairs.",
    benefits: ["Natural appearance", "Preserves more tooth structure", "Mercury-free", "Bonds directly to tooth"],
    procedure: ["Local anesthesia application", "Removal of decayed material", "Cleaning of the area", "Application of composite resin", "Curing with specialized light", "Polishing for a smooth finish"],
    recovery: "Immediate. You can eat and drink normally once the anesthesia wears off.",
    duration: "45-60 minutes",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "d2",
    type: "dental",
    category: ["All Services", "General Dentistry", "Preventive Care"],
    title: "Scaling & Polishing",
    short: "Professional deep cleaning service.",
    long: "A crucial preventive treatment that removes plaque, tartar, and surface stains. Our gentle ultrasonic scaling ensures optimal gum health, prevents periodontal disease, and leaves your breath fresh and your smile bright.",
    benefits: ["Prevents gum disease", "Removes stubborn tartar", "Freshens breath", "Brightens smile by removing surface stains"],
    procedure: ["Initial examination", "Ultrasonic scaling to remove tartar", "Fine hand scaling", "Professional polishing"],
    recovery: "Immediate.",
    duration: "30-45 minutes",
    image: "https://images.unsplash.com/photo-1598256989800-fea5ce5146f5?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "d3",
    type: "dental",
    category: ["All Services", "Cosmetic Dentistry"],
    title: "Teeth Whitening",
    short: "Professional smile brightening treatments.",
    long: "Achieve a dazzling, bright smile with our advanced laser teeth whitening systems. We use clinically proven, safe whitening gels that penetrate the enamel to remove deep intrinsic stains without causing sensitivity.",
    benefits: ["Immediate visible results", "Safe for enamel", "Customized shade selection", "Boosts confidence"],
    procedure: ["Shade assessment", "Gum protection barrier applied", "Application of professional whitening gel", "Laser/LED light activation"],
    recovery: "Immediate. Avoid staining foods/drinks for 48 hours.",
    duration: "60-90 minutes",
    image: "https://images.unsplash.com/photo-1590664095641-7fa05f689813?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "d4",
    type: "dental",
    category: ["All Services", "Cosmetic Dentistry"],
    title: "Veneers & Smile Designing",
    short: "Porcelain shells for a perfect Hollywood smile.",
    long: "Ultra-thin, custom-made porcelain shells bonded to the front surface of your teeth to correct discoloration, minor misalignments, gaps, or worn enamel. They provide a permanent, Hollywood-level smile transformation.",
    benefits: ["Stain-resistant", "Corrects multiple aesthetic flaws at once", "Custom-crafted for a natural look", "Long-lasting durability"],
    procedure: ["Comprehensive consultation and smile design", "Minimal enamel preparation", "Digital impressions", "Final porcelain veneers bonded securely"],
    recovery: "Minimal to no downtime. Slight sensitivity may occur initially.",
    duration: "2-3 visits over 2 weeks",
    image: "https://images.unsplash.com/photo-1522844990619-4951c40f7eda?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "d5",
    type: "dental",
    category: ["All Services", "Restorative Dentistry", "Oral Surgery"],
    title: "Dental Implants",
    short: "Permanent replacement for missing teeth.",
    long: "State-of-the-art titanium posts surgically placed into the jawbone to act as artificial roots. They provide a permanent, sturdy foundation for custom crowns, bridges, or dentures, restoring 100% of your chewing function.",
    benefits: ["Looks and feels like natural teeth", "Prevents bone loss", "Does not affect adjacent teeth", "Can last a lifetime with proper care"],
    procedure: ["3D CBCT scan and digital planning", "Surgical placement of the implant post", "Healing period (osseointegration)", "Placement of the abutment", "Attaching the custom crown"],
    recovery: "3-7 days for initial surgical healing. 3-6 months for complete bone integration.",
    duration: "Multiple visits over 3-6 months",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "d6",
    type: "dental",
    category: ["All Services", "Restorative Dentistry"],
    title: "Root Canal Treatment",
    short: "Save infected teeth without extraction.",
    long: "Microscope-assisted endodontic therapy designed to save a severely infected or decayed tooth. We remove the infected pulp, thoroughly sanitize the root canals, and seal them to prevent future infections, all completely pain-free.",
    benefits: ["Saves the natural tooth", "Relieves severe dental pain", "Stops the spread of infection", "Highly successful long-term outcome"],
    procedure: ["Digital X-rays to assess infection", "Local anesthesia", "Removal of infected pulp tissue", "Cleaning and shaping of the root canals", "Filling and sealing the canals", "Placement of a protective crown"],
    recovery: "Mild tenderness for 1-2 days.",
    duration: "1-2 visits (60-90 mins each)",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "d7",
    type: "dental",
    category: ["All Services", "Orthodontics"],
    title: "Clear Aligners & Braces",
    short: "Invisible orthodontic correction.",
    long: "A virtually invisible, highly comfortable alternative to traditional metal braces. Using a series of custom-made, clear plastic trays, we gradually shift your teeth into their perfect position with computerized precision.",
    benefits: ["Virtually invisible", "Removable for eating and brushing", "More comfortable than traditional braces", "Fewer clinic visits required"],
    procedure: ["3D digital scan of your teeth", "Computerized treatment planning", "Fabrication of custom aligners", "Wearing aligners 22 hours/day", "Changing trays every 1-2 weeks"],
    recovery: "Minor pressure for a day or two when switching to a new tray.",
    duration: "6-18 months depending on complexity",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800" 
  },
  {
    id: "d8",
    type: "dental",
    category: ["All Services", "Pediatric Dentistry", "Preventive Care"],
    title: "Pediatric Dentistry",
    short: "Gentle dental care for children.",
    long: "Comprehensive, gentle dental care designed specifically for children. We focus on creating a positive, fear-free environment while teaching good oral hygiene habits and providing treatments to prevent early childhood caries.",
    benefits: ["Establishes positive dental habits early", "Prevents cavities", "Monitors proper jaw and tooth development", "Anxiety-free environment"],
    procedure: ["Gentle examination", "Child-friendly cleaning", "Fluoride varnish application", "Dental sealants on molars", "Oral hygiene education for parents and child"],
    recovery: "Immediate.",
    duration: "30-45 minutes",
    image: "https://images.unsplash.com/photo-1598256989800-fea5ce5146f5?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "d9",
    type: "dental",
    category: ["All Services", "Emergency Care"],
    title: "Emergency Dentistry",
    short: "Urgent care for trauma and pain.",
    long: "Immediate, high-priority treatment for severe dental pain, knocked-out (avulsed) teeth, severe fractures, or dental abscesses. Quick intervention is critical to saving the tooth and preventing systemic infection.",
    benefits: ["Immediate pain relief", "High chance of saving the natural tooth", "Prevents infection spread", "Restores aesthetics quickly"],
    procedure: ["Immediate priority assessment", "Pain management", "Reimplantation or stabilization of tooth", "Treatment of soft tissue injuries"],
    recovery: "Depends on the severity of the trauma.",
    duration: "Immediate / Varies",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800"
  },

  // --- MAXILLOFACIAL & ADVANCED ORAL SURGERY ---
  {
    id: "m1",
    type: "maxillofacial",
    category: ["All Services", "Maxillofacial Surgery", "Oral Surgery"],
    title: "Jaw Surgery (Orthognathic)",
    short: "Correct jaw alignment and function.",
    long: "Complex surgical intervention to correct severe irregularities of the jaw bones. This procedure realigns the jaws and teeth to improve their function (chewing, speaking, breathing) and dramatically enhances facial aesthetics.",
    benefits: ["Improves chewing, speaking, and breathing", "Corrects facial imbalances", "Relieves TMJ pain", "Resolves obstructive sleep apnea"],
    procedure: ["Extensive 3D digital planning", "Pre-surgical orthodontics", "Surgery performed under general anesthesia", "Repositioning of the jaw bones", "Securing with titanium plates/screws", "Post-surgical orthodontics"],
    recovery: "Initial healing 2-6 weeks. Complete healing up to a year.",
    duration: "Surgery takes 2-4 hours. Hospital stay 1-2 days.",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "m2",
    type: "maxillofacial",
    category: ["All Services", "Maxillofacial Surgery", "Emergency Care"],
    title: "Facial Trauma Surgery",
    short: "Treatment of facial injuries.",
    long: "Expert reconstructive surgery for facial injuries, including fractures of the jaw, cheek, nose, or eye socket. Our goal is to restore both the functional integrity and the aesthetic appearance of the face with minimal scarring.",
    benefits: ["Restores facial aesthetics", "Reestablishes proper bite and jaw function", "Minimizes long-term deformities", "Comprehensive multidisciplinary care"],
    procedure: ["Emergency assessment and stabilization", "CT imaging to evaluate fractures", "Surgical reduction of fractures", "Fixation with specialized mini-plates", "Soft tissue repair"],
    recovery: "Varies greatly depending on the extent of injury. Typically 4-8 weeks for bone healing.",
    duration: "Depends on trauma severity",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "m3",
    type: "maxillofacial",
    category: ["All Services", "Oral Surgery", "Maxillofacial Surgery"],
    title: "Wisdom Tooth & Impacted Tooth Surgery",
    short: "Safe surgical removal of impacted teeth.",
    long: "Advanced surgical extraction of wisdom teeth and other impacted teeth. We utilize minimally invasive techniques to ensure comfortable removal and rapid recovery while preventing damage to adjacent teeth and nerves.",
    benefits: ["Prevents infection and crowding", "Relieves pain and swelling", "Minimally invasive technique", "Faster recovery"],
    procedure: ["3D imaging assessment", "Local anesthesia or conscious sedation", "Gentle surgical extraction", "Suturing of the site", "Post-operative care instructions"],
    recovery: "3-7 days. Swelling peaks at 48 hours.",
    duration: "45-90 minutes",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "m4",
    type: "maxillofacial",
    category: ["All Services", "Maxillofacial Surgery"],
    title: "Facial Reconstruction",
    short: "Restore facial aesthetics and function.",
    long: "Reconstructive surgery following trauma, tumors, or congenital facial deformities. We employ state-of-the-art techniques and biomaterials to restore natural facial contours and functionality.",
    benefits: ["Restores normal appearance", "Improves psychological well-being", "Re-establishes function (breathing, speaking)"],
    procedure: ["Comprehensive consultation", "3D modeling and surgical planning", "Surgical reconstruction using grafts/implants", "Follow-up and rehabilitation"],
    recovery: "Several weeks to months depending on complexity.",
    duration: "Complex procedure, varies significantly",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "m5",
    type: "maxillofacial",
    category: ["All Services", "Maxillofacial Surgery"],
    title: "TMJ Treatment",
    short: "Relief from jaw joint pain.",
    long: "Comprehensive management of Temporomandibular Joint (TMJ) disorders. From conservative therapies like custom splints to advanced surgical interventions, we provide targeted relief from chronic jaw pain and clicking.",
    benefits: ["Alleviates chronic jaw pain", "Reduces headaches and neck pain", "Improves jaw mobility", "Prevents further joint damage"],
    procedure: ["Clinical and radiographic evaluation", "Custom splint fabrication", "Physical therapy guidance", "Minimally invasive joint surgery if required"],
    recovery: "Depends on the treatment approach.",
    duration: "Varies",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "m6",
    type: "maxillofacial",
    category: ["All Services", "Oral Surgery"],
    title: "Bone Grafting & Sinus Lifts",
    short: "Prepare your jaw for successful implants.",
    long: "Advanced grafting procedures designed to rebuild jawbone lost due to trauma, infection, or tooth loss. A sinus lift specifically adds bone to your upper jaw, creating a solid foundation for secure dental implants.",
    benefits: ["Enables successful implant placement", "Restores natural jawbone contours", "Prevents further bone loss", "Highly predictable results"],
    procedure: ["3D imaging assessment", "Local anesthesia", "Placement of bone graft material", "Protective membrane application", "Healing and integration period"],
    recovery: "1-2 weeks initial healing; 3-6 months for complete bone integration.",
    duration: "1-2 hours",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800"
  }
];

const FAQS = [
  {
    q: "Is dental implant surgery painful?",
    a: "Not at all. The procedure is performed under local anesthesia, ensuring you feel no pain during the surgery. Post-operative discomfort is usually minimal and easily managed with over-the-counter pain medication."
  },
  {
    q: "How long do veneers last?",
    a: "With proper care, high-quality porcelain veneers can last 10 to 15 years, or even longer. Good oral hygiene, regular dental check-ups, and avoiding habits like biting on hard objects help extend their lifespan."
  },
  {
    q: "What is the recovery after jaw surgery?",
    a: "Initial recovery takes about 2 to 6 weeks, during which you will be on a modified diet. Full bone healing can take up to a year. We provide comprehensive post-operative care plans to ensure a smooth recovery."
  },
  {
    q: "Are clear aligners effective?",
    a: "Yes, clear aligners are highly effective for correcting mild to moderate orthodontic issues, including crowding, spacing, and bite irregularities. Compliance (wearing them 22 hours a day) is key to success."
  },
  {
    q: "Is teeth whitening safe?",
    a: "Professional teeth whitening performed by a dentist is completely safe. We use specialized materials and techniques that protect your gums and enamel while effectively removing deep stains."
  },
  {
    q: "How often should scaling be done?",
    a: "We generally recommend professional scaling and polishing every 6 months. However, if you have a history of periodontal disease, we may advise more frequent visits, such as every 3 to 4 months."
  }
];

const CATEGORIES: ServiceCategory[] = [
  "All Services",
  "General Dentistry",
  "Cosmetic Dentistry",
  "Restorative Dentistry",
  "Orthodontics",
  "Oral Surgery",
  "Maxillofacial Surgery",
  "Preventive Care",
  "Pediatric Dentistry",
  "Emergency Care"
];

/* =========================================================
   COMPONENTS
========================================================= */

function FAQAccordion({ item, isOpen, onClick }: { item: typeof FAQS[0], isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
      >
        <h4 className="text-xl font-medium text-[#0B1F3A] group-hover:text-[#E63946] transition-colors">
          {item.q}
        </h4>
        <div className={`ml-4 flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-[#E63946] border-[#E63946] text-white rotate-180' : 'border-gray-300 text-gray-500 group-hover:border-[#E63946]'}`}>
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

function ServiceCard({ service, onClick }: { service: Service, onClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group bg-white rounded-2xl md:rounded-[24px] overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_20px_40px_-10px_rgba(11,31,58,0.1)] transition-all duration-500 flex flex-col cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-32 md:h-56 overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-white/90 backdrop-blur-sm px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-semibold text-[#0B1F3A] truncate max-w-[80%]">
          {service.category[1]}
        </div>
      </div>
      
      <div className="p-4 md:p-8 flex flex-col flex-grow">
        <h3 className="text-base md:text-2xl font-bold text-[#0B1F3A] mb-1 md:mb-3 group-hover:text-[#E63946] transition-colors leading-tight">
          {service.title}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-3 md:mb-6 flex-grow text-xs md:text-base line-clamp-2 md:line-clamp-none">
          {service.short}
        </p>
        <div className="flex items-center text-[#0B1F3A] font-medium text-xs md:text-base group/btn mt-auto">
          View Details
          <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get("category") as ServiceCategory;
  const initialCategory: ServiceCategory = (catParam && CATEGORIES.includes(catParam)) ? catParam : "All Services";
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>(initialCategory);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  React.useEffect(() => {
    const cat = searchParams.get("category") as ServiceCategory;
    if (cat && CATEGORIES.includes(cat)) {
      setActiveCategory(cat);
      // Wait a short bit for the page to render and scroll to services grid
      setTimeout(() => {
        document.getElementById('services-grid')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }, [searchParams]);

  const handleCategoryChange = (cat: ServiceCategory) => {
    setActiveCategory(cat);
    setSearchParams({ category: cat });
  };

  const filteredServices = SERVICES_DATA.filter((s) => s.category.includes(activeCategory));

  const dentalServices = filteredServices.filter(s => s.type === "dental");
  const maxillofacialServices = filteredServices.filter(s => s.type === "maxillofacial");

  return (
    <MainLayout>
    <div className="bg-white min-h-screen font-sans text-[#0B1F3A] selection:bg-[#E63946] selection:text-white">
      
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
                <Sparkles className="w-4 h-4 text-[#E63946]" />
                Premium Healthcare
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#0B1F3A] leading-[1.1] mb-6">
                Transformative Dental & <br /> Maxillofacial Care
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-lg">
                Advanced dentistry and facial surgery solutions designed for precision, comfort, and aesthetics. Experience healthcare at its highest standard.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-[#0B1F3A] text-white rounded-full font-bold hover:bg-[#1a365d] hover:shadow-lg transition-all flex items-center justify-center gap-2 group">
                  Book Appointment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => document.getElementById('services-grid')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-white text-[#0B1F3A] border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition-all flex items-center justify-center"
                >
                  Explore Services
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-15px_rgba(11,31,58,0.2)] bg-white border-[8px] border-white h-[350px] lg:h-[500px]"
            >
              <img 
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200" 
                alt="Modern Dental Clinic" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/40 to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FILTER TABS (Sticky)
      ========================================================= */}
      <section className="sticky top-20 z-40 bg-white/90 backdrop-blur-xl border-y border-gray-100 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 pt-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`relative flex-shrink-0 px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat ? "text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#0B1F3A] rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SERVICES GRID - PROPER BLOCKS
      ========================================================= */}
      <section id="services-grid" className="py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-24">
          
          {/* DENTAL SERVICES BLOCK */}
          <AnimatePresence>
            {dentalServices.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div className="text-center max-w-3xl mx-auto">
                  <h2 className="text-4xl font-bold text-[#0B1F3A] mb-4">Dental Services</h2>
                  <p className="text-gray-600 text-lg">Comprehensive dental care utilizing state-of-the-art technology to ensure your smile remains healthy and beautiful.</p>
                </div>
                
                <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                  <AnimatePresence mode="popLayout">
                    {dentalServices.map((service) => (
                      <ServiceCard 
                        key={service.id} 
                        service={service} 
                        onClick={() => setSelectedService(service)} 
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* MAXILLOFACIAL SERVICES BLOCK */}
          <AnimatePresence>
            {maxillofacialServices.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                <div className="text-center max-w-3xl mx-auto">
                  <h2 className="text-4xl font-bold text-[#0B1F3A] mb-4">Maxillofacial & Oral Surgery</h2>
                  <p className="text-gray-600 text-lg">Advanced surgical solutions delivered by expert surgeons for complex facial, jaw, and oral conditions.</p>
                </div>
                
                <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                  <AnimatePresence mode="popLayout">
                    {maxillofacialServices.map((service) => (
                      <ServiceCard 
                        key={service.id} 
                        service={service} 
                        onClick={() => setSelectedService(service)} 
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {filteredServices.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No services found in this category.</p>
            </div>
          )}

        </div>
      </section>

      {/* =========================================================
          TRUST SECTION
      ========================================================= */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-center">
            <div className="flex flex-col items-center p-6">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-[#0B1F3A]">
                <Activity className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-bold text-[#0B1F3A] mb-2">25+</h3>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">Years Experience</p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-[#0B1F3A]">
                <Stethoscope className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-bold text-[#0B1F3A] mb-2">12</h3>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">Certified Specialists</p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-[#0B1F3A]">
                <Microscope className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-bold text-[#0B1F3A] mb-2">100%</h3>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">Modern Tech</p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-[#0B1F3A]">
                <Smile className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-bold text-[#0B1F3A] mb-2">99%</h3>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">Patient Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FAQ SECTION
      ========================================================= */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1F3A] mb-4">Patient Questions</h2>
            <p className="text-lg text-gray-600">Common inquiries about our treatments and procedures.</p>
          </div>
          
          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 lg:p-12">
            {FAQS.map((faq, idx) => (
              <FAQAccordion 
                key={idx} 
                item={faq} 
                isOpen={openFAQ === idx} 
                onClick={() => setOpenFAQ(openFAQ === idx ? null : idx)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          APPOINTMENT CTA
      ========================================================= */}
      <section className="py-24 bg-[#0B1F3A] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Book Your Consultation Today
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Experience world-class dental and maxillofacial care tailored specifically for you in a premium environment.
          </p>
          <Link to="/appointment" className="inline-block px-10 py-5 bg-[#E63946] text-white rounded-full font-bold text-lg hover:bg-[#d62828] hover:shadow-[0_0_20px_rgba(230,57,70,0.4)] hover:-translate-y-1 transition-all duration-300">
            Schedule Appointment
          </Link>
        </div>
      </section>

      {/* =========================================================
          EXPANDED SERVICE MODAL
      ========================================================= */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedService(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[#0B1F3A]/60 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-white rounded-[32px] overflow-hidden shadow-2xl my-auto"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-[#0B1F3A] hover:bg-white hover:scale-105 transition-all shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-2/5 h-64 lg:h-auto relative">
                  <img 
                    src={selectedService.image} 
                    alt={selectedService.title} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 to-transparent lg:bg-gradient-to-r" />
                  <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 text-white">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider mb-3 inline-block">
                      {selectedService.category[1]}
                    </span>
                    <h2 className="text-3xl font-bold leading-tight">
                      {selectedService.title}
                    </h2>
                  </div>
                </div>

                <div className="w-full lg:w-3/5 p-8 lg:p-12 max-h-[80vh] overflow-y-auto hide-scrollbar">
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    {selectedService.long}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-50 p-4 rounded-2xl flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[#E63946] mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Duration</p>
                        <p className="text-[#0B1F3A] font-medium">{selectedService.duration}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl flex items-start gap-3">
                      <Activity className="w-5 h-5 text-[#E63946] mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Recovery</p>
                        <p className="text-[#0B1F3A] font-medium">{selectedService.recovery}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-[#0B1F3A] mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#E63946]" />
                      Key Benefits
                    </h4>
                    <ul className="space-y-3">
                      {selectedService.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600">
                          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-10">
                    <h4 className="text-xl font-bold text-[#0B1F3A] mb-4 flex items-center gap-2">
                      <Info className="w-5 h-5 text-[#E63946]" />
                      Procedure Overview
                    </h4>
                    <div className="space-y-4">
                      {selectedService.procedure.map((step, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0B1F3A] flex items-center justify-center font-bold text-sm shrink-0">
                            {i + 1}
                          </div>
                          <p className="text-gray-600 pt-1">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex justify-end">
                    <Link to="/appointment" className="px-8 py-4 bg-[#0B1F3A] text-white rounded-full font-bold hover:bg-[#E63946] hover:-translate-y-1 transition-all duration-300 shadow-md">
                      Book This Service
                    </Link>
                  </div>
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