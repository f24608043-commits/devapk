export interface Review {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
  treatment: string;
  galleryImages?: string[];
}

export const reviews: Review[] = [
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    role: 'Patient',
    treatment: 'Invisalign & Teeth Whitening',
    rating: 5,
    content: "The level of care at NMDC is unparalleled. Brig. Dr. Nazir explained every step of my treatment. I've never felt more comfortable in a dental chair. My transformation has truly changed how I present myself to the world.",
    image: 'https://i.pravatar.cc/150?u=sarahj',
    galleryImages: [
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop'
    ]
  },
  {
    id: 'michael-chen',
    name: 'Michael Chen',
    role: 'Patient',
    treatment: 'Maxillofacial Surgery',
    rating: 5,
    content: "Choosing NMDC for my corrective jaw surgery was the best decision. The surgical precision combined with the hospitality-driven care made my recovery smooth. I highly recommend the team for any complex dental needs.",
    image: 'https://i.pravatar.cc/150?u=michaelc',
    galleryImages: [
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop'
    ]
  }
];
