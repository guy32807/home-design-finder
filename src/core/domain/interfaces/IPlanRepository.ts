import { Plan, PlanCategory, PlanFilter, PlanSearchResult } from '../entities';

/**
 * Interface for plan data access operations
 */
export interface IPlanRepository {
  /**
   * Get a plan by its ID
   */
  getPlanById(id: string): Promise<Plan | null>;
  
  /**
   * Get a plan by its plan number
   */
  getPlanByNumber(planNumber: string): Promise<Plan | null>;
  
  /**
   * Get a plan by its slug
   */
  getPlanBySlug(slug: string): Promise<Plan | null>;
  
  /**
   * Search for plans with filters
   */
  searchPlans(filter: PlanFilter): Promise<PlanSearchResult>;
  
  /**
   * Get featured plans
   */
  getFeaturedPlans(category?: PlanCategory, limit?: number): Promise<Plan[]>;
  
  /**
   * Get related plans to a specific plan
   */
  getRelatedPlans(planId: string, limit?: number): Promise<Plan[]>;
  
  /**
   * Get popular plans
   */
  getPopularPlans(category?: PlanCategory, limit?: number): Promise<Plan[]>;
  
  /**
   * Get plans by style
   */
  getPlansByStyle(style: string, limit?: number, offset?: number): Promise<PlanSearchResult>;
  
  /**
   * Get plans by category
   */
  getPlansByCategory(category: PlanCategory, limit?: number, offset?: number): Promise<PlanSearchResult>;
  
  /**
   * Get new plans
   */
  getNewPlans(limit?: number): Promise<Plan[]>;
}