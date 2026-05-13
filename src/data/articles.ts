export interface Article {
  id: string;
  title: string;
  category: 'Surgery Prep' | 'Oral Hygiene' | 'Technology' | 'Patient Care';
  readTime: string;
  author: string;
  description: string;
  image: string;
  content?: string;
}

export const articles: Article[] = [
  {
    id: 'wisdom-teeth',
    title: 'Understanding Wisdom Teeth Extraction: A Guide',
    category: 'Surgery Prep',
    readTime: '8 min read',
    author: 'Dr. Nazir',
    description: 'Preparing for your first oral surgery can be daunting. We break down the procedure, recovery timeline, and what to expect during the healing process.',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'flossing-science',
    title: 'The Micro-Science of Daily Flossing',
    category: 'Oral Hygiene',
    readTime: '5 min read',
    author: 'Dr. Jonas Suherman',
    description: 'Why flossing is the most overlooked aspect of cardiovascular health. Discover how gum health impacts your entire body\'s well-being.',
    image: 'https://images.unsplash.com/photo-1460672314991-c19a095021da?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'digital-dentistry',
    title: 'Digital Dentistry: The Future of Scans',
    category: 'Technology',
    readTime: '12 min read',
    author: 'Editorial Team',
    description: 'Exploring how 3D intraoral scanning has replaced traditional impressions, providing 99.9% accuracy for crowns and veneers.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop'
  }
];
