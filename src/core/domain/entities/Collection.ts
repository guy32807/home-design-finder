import { Plan } from './Plan';

/**
 * Represents a curated collection of plans
 */
export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  planIds: string[];
  featuredPlanIds?: string[];
  sortOrder?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * A collection with populated plan objects
 */
export interface PopulatedCollection extends Omit<Collection, 'planIds' | 'featuredPlanIds'> {
  plans: Plan[];
  featuredPlans?: Plan[];
}