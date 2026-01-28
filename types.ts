
export interface ServicePackage {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  image: string;
  category: 'Wedding' | 'Corporate' | 'Private';
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  location: string;
}

export interface AIPlanningResult {
  title: string;
  theme: string;
  checklist: string[];
  summary: string;
  estimatedVibe: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export interface CustomizationOptions {
  theme: string;
  layout: 'Traditional' | 'Open-Flow' | 'Intimate-Clusters' | 'Immersive-360';
  colorPalette: string;
}
