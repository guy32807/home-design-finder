export interface Plan {
  id: string;
  name: string;
  description: string;
  style?: string;
  images: {
    thumbnail: string;
    main: string;
    floorPlan?: string;
    gallery?: string[];
  };
  details: {
    bedrooms: number;
    bathrooms: number;
    stories: number;
    garageSize?: number;
    squareFeet: number;
  };
  features?: string[];
  pricing: {
    basePrice: number;
    pdfPrice?: number;
    cadPrice?: number;
    fiveSetPrice?: number;
  };
  popularity: number;
}

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  savedPlans?: string[];
  recentlyViewed?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishDate: string;
  author: string;
  category: string;
  image: string;
  tags?: string[];
}