
import { ServicePackage, PortfolioItem, Review } from './types';

export const WHATSAPP_NUMBER = "1234567890"; // Replace with real number

export const SERVICES: ServicePackage[] = [
  {
    id: '1',
    name: 'Eternal Union',
    category: 'Wedding',
    price: 'From $2,500',
    description: 'Full-service luxury wedding planning from concept to execution.',
    features: ['Venue Selection', 'Floral Design', 'Guest Management', 'Day-of Coordination'],
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    name: 'Elite Corporate',
    category: 'Corporate',
    price: 'From $1,800',
    description: 'Professional event management for product launches and galas.',
    features: ['Branding Integration', 'AV & Staging', 'Catering Logistics', 'VIP Handling'],
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    name: 'Bespoke Celebration',
    category: 'Private',
    price: 'From $950',
    description: 'Intimate gatherings and birthday parties with a unique flair.',
    features: ['Custom Themes', 'Entertainment Booking', 'Personalized Decor', 'Mixology Services'],
    image: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=800'
  }
];

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'The Golden Gala',
    category: 'Corporate',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800',
    location: 'Metropolitan Museum'
  },
  {
    id: 'p2',
    title: 'Rustic Romance',
    category: 'Wedding',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
    location: 'Napa Valley Estates'
  },
  {
    id: 'p3',
    title: 'Neon Nights',
    category: 'Private',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800',
    location: 'The High Loft'
  },
  {
    id: 'p4',
    title: 'Azure Anniversary',
    category: 'Private',
    image: 'https://images.unsplash.com/photo-1470753937643-efad93c239fa?auto=format&fit=crop&q=80&w=800',
    location: 'Seaside Pavilion'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Alexandra Sterling',
    rating: 5,
    comment: 'BIM Event transformed our wedding into a literal fairytale. The attention to detail was beyond my wildest dreams!',
    date: 'Jan 2024',
    avatar: 'https://i.pravatar.cc/150?u=alex'
  },
  {
    id: 'r2',
    name: 'James Henderson',
    rating: 5,
    comment: 'Flawless execution for our corporate retreat. The tech integration and VIP handling were top-notch.',
    date: 'Feb 2024',
    avatar: 'https://i.pravatar.cc/150?u=james'
  },
  {
    id: 'r3',
    name: 'Sophia Chen',
    rating: 4,
    comment: 'Amazing theme customization! They really listened to our specific requests for the anniversary party.',
    date: 'Mar 2024',
    avatar: 'https://i.pravatar.cc/150?u=sophia'
  }
];

export const THEME_OPTIONS = [
  { name: 'Royal', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=300' },
  { name: 'Minimalist', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=300' },
  { name: 'Bohemian', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=300' },
  { name: 'Industrial', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=300' },
  { name: 'Futuristic', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=300' },
  { name: 'Vintage Chic', image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=300' },
  { name: 'Modern Luxury', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=300' },
  { name: 'Tropical Escape', image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=300' },
  { name: 'Solar Punk', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=300' },
  { name: 'Old Money', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=300' },
  { name: 'Dark Academia', image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=300' },
  { name: 'Desert Mirage', image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=300' }
] as const;

export const THEMES = THEME_OPTIONS.map(opt => opt.name);
export const LAYOUTS = ['Traditional', 'Open-Flow', 'Intimate-Clusters', 'Immersive-360'] as const;

export const COLORS = [
  { name: 'Champagne Gold', class: 'bg-[#C5A059]' },
  { name: 'Midnight Emerald', class: 'bg-[#004225]' },
  { name: 'Deep Royal Blue', class: 'bg-[#002366]' },
  { name: 'Rose Quartz', class: 'bg-[#F7CAC9]' },
  { name: 'Obsidian Slate', class: 'bg-[#2F2F2F]' }
];
