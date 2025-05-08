import { PlanCategory } from './Plan';

/**
 * Represents search/filter criteria for plans
 */
export interface PlanFilter {
  category?: PlanCategory;
  style?: string;
  squareFeetMin?: number;
  squareFeetMax?: number;
  bedroomsMin?: number;
  bedroomsMax?: number;
  bathroomsMin?: number;
  bathroomsMax?: number;
  stories?: number[];
  garages?: number[];
  width?: number;
  depth?: number;
  priceMin?: number;
  priceMax?: number;
  features?: string[];
  hasBasement?: boolean;
  keywords?: string;
  sortBy?: 'newest' | 'popular' | 'price_low_high' | 'price_high_low' | 'square_feet_low_high' | 'square_feet_high_low';
  page?: number;
  limit?: number;
}

/**
 * Results from a filtered search
 */
export interface PlanSearchResult {
  items: PlanSearchItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Simplified plan item for search results
 */
export interface PlanSearchItem {
  id: string;
  planNumber: string;
  name: string;
  slug: string;
  category: PlanCategory;
  style: string;
  squareFeet: number;
  bedrooms: number;
  bathrooms: number;
  stories: number;
  garages: number;
  price: number;
  imageUrl: string;
}