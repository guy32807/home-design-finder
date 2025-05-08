/**
 * Represents a house plan or design
 */
export interface Plan {
  id: string;
  planNumber: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  details: PlanDetails;
  dimensions: PlanDimensions;
  images: PlanImage[];
  pricing: PlanPricing;
  category: PlanCategory;
  style: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Details of a plan's layout and specifications
 */
export interface PlanDetails {
  squareFeet: number;
  bedrooms: number;
  bathrooms: number;
  stories: number;
  garages: number;
  hasBasement?: boolean;
  ceilingHeight?: number;
  foundation?: 'slab' | 'crawlspace' | 'basement' | 'pier and beam';
  roofStyle?: string;
  exteriorWall?: string;
  openConcept?: boolean;
  masterSuiteLocation?: 'first floor' | 'second floor' | 'split';
  mainEntryLocation?: string;
}

/**
 * Physical dimensions of a plan
 */
export interface PlanDimensions {
  width: number;
  depth: number;
  height?: number;
  totalSquareFeet: number;
  firstFloorSquareFeet?: number;
  secondFloorSquareFeet?: number;
  basementSquareFeet?: number;
  garageSquareFeet?: number;
  porchSquareFeet?: number;
  deckSquareFeet?: number;
}

/**
 * Information about plan images
 */
export interface PlanImage {
  id: string;
  url: string;
  alt: string;
  type: 'exterior' | 'interior' | 'floor-plan' | 'rendering' | 'elevation' | 'other';
  isPrimary?: boolean;
  sortOrder?: number;
}

/**
 * Pricing information for a plan
 */
export interface PlanPricing {
  basePrice: number;
  pdfPrice?: number;
  cadPrice?: number;
  studyPrice?: number;
  packagePrice?: number;
  discount?: number;
  isOnSale?: boolean;
  saleEndDate?: Date;
  currency: string;
}

/**
 * Possible categories for plans
 */
export type PlanCategory = 
  | 'house' 
  | 'garage' 
  | 'shed' 
  | 'cabin' 
  | 'tiny-home'
  | 'adu'
  | 'multi-family'
  | 'barn';