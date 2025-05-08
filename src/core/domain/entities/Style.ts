/**
 * Represents an architectural style
 */
export interface Style {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  characteristics: string[];
  history?: string;
  popularEras?: string[];
  featuredPlanIds?: string[];
  relatedStyles?: string[];
  createdAt: Date;
  updatedAt: Date;
}