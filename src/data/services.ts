export interface Service {
  id: string;
  title: string;
  category: 'maxillofacial' | 'cosmetic' | 'restorative' | 'preventive';
  description: string;
  longDescription: string;
  icon: string;
  image: string;
}

export const services: Service[] = [
  {
    id: 'maxillofacial-surgery',
    title: 'Maxillofacial Surgery',
    category: 'maxillofacial',
    description: 'Expert treatment for complex facial, jaw, and oral conditions.',
    longDescription: 'Our maxillofacial surgery department, led by board-certified specialists, provides advanced interventions for jaw alignment, facial trauma, and complex reconstructive procedures. We utilize state-of-the-art 3D imaging for precise planning and execution.',
    icon: 'Microscope',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'dental-implants',
    title: 'Dental Implants',
    category: 'restorative',
    description: 'Permanent, natural-looking tooth replacement solutions.',
    longDescription: 'Restore your smile and function with our premium dental implant systems. We use high-grade titanium and ceramic components to ensure long-lasting durability and a natural appearance that blends seamlessly with your existing teeth.',
    icon: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'cosmetic-dentistry',
    title: 'Cosmetic Dentistry',
    category: 'cosmetic',
    description: 'Smile makeovers including veneers and gum contouring.',
    longDescription: 'Achieve the smile of your dreams with our cosmetic dentistry services. From porcelain veneers to professional teeth whitening, we combine artistry with clinical precision to enhance your natural beauty and boost your confidence.',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1460672314991-c19a095021da?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'root-canal',
    title: 'Root Canal Therapy',
    category: 'restorative',
    description: 'Precision endodontic care using microscopic technology.',
    longDescription: 'Save your natural teeth and alleviate pain with our expert root canal therapy. We use microscopic technology and advanced techniques to ensure a painless experience and highly successful outcomes for even the most complex cases.',
    icon: 'Activity',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'teeth-whitening',
    title: 'Teeth Whitening',
    category: 'cosmetic',
    description: 'Professional-grade systems for safe, immediate brightness.',
    longDescription: 'Our professional teeth whitening systems deliver safe and long-lasting results in a single visit. We use high-concentration whitening agents and advanced light-activation technology to remove deep stains and revitalize your smile.',
    icon: 'Sun',
    image: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?q=80&w=2066&auto=format&fit=crop'
  }
];
