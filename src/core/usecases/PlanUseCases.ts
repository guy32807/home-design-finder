import { Plan, PlanFilter, PlanSearchResult } from '../domain/entities';
import { IPlanRepository } from '../domain/interfaces/IPlanRepository';
import { IAffiliateService } from '../domain/interfaces/IAffiliateService';
import { IAnalyticsService } from '../domain/interfaces/IAnalyticsService';
import { ICacheService } from '../domain/interfaces/ICacheService';

export class PlanUseCases {
  private planRepository: IPlanRepository;
  private affiliateService: IAffiliateService;
  private analyticsService: IAnalyticsService;
  private cacheService: ICacheService;

  constructor(
    planRepository: IPlanRepository,
    affiliateService: IAffiliateService,
    analyticsService: IAnalyticsService,
    cacheService: ICacheService
  ) {
    this.planRepository = planRepository;
    this.affiliateService = affiliateService;
    this.analyticsService = analyticsService;
    this.cacheService = cacheService;
  }

  /**
   * Get a plan by its slug
   */
  async getPlanBySlug(slug: string): Promise<Plan | null> {
    const cacheKey = `plan_slug_${slug}`;
    
    // Try to get from cache first
    const cachedPlan = await this.cacheService.get<Plan>(cacheKey);
    if (cachedPlan) {
      return cachedPlan;
    }
    
    // Get from repository if not in cache
    const plan = await this.planRepository.getPlanBySlug(slug);
    
    // Cache the result if found
    if (plan) {
      await this.cacheService.set(cacheKey, plan, 3600); // Cache for 1 hour
    }
    
    return plan;
  }

  /**
   * Get a plan by its plan number
   */
  async getPlanByNumber(planNumber: string): Promise<Plan | null> {
    const cacheKey = `plan_number_${planNumber}`;
    
    const cachedPlan = await this.cacheService.get<Plan>(cacheKey);
    if (cachedPlan) {
      return cachedPlan;
    }
    
    const plan = await this.planRepository.getPlanByNumber(planNumber);
    
    if (plan) {
      await this.cacheService.set(cacheKey, plan, 3600);
    }
    
    return plan;
  }

  /**
   * Search for plans with filtering
   */
  async searchPlans(filter: PlanFilter): Promise<PlanSearchResult> {
    // Generate a cache key based on the filter parameters
    const filterStr = JSON.stringify(filter);
    const cacheKey = `plan_search_${Buffer.from(filterStr).toString('base64')}`;
    
    const cachedResults = await this.cacheService.get<PlanSearchResult>(cacheKey);
    if (cachedResults) {
      return cachedResults;
    }
    
    const results = await this.planRepository.searchPlans(filter);
    
    // Track search for analytics
    this.analyticsService.trackSearch({
      query: filter.keywords || '',
      filters: filter,
      resultsCount: results.total,
      sessionId: '', // This would be populated in the implementation
      deviceType: 'desktop', // This would be determined in the implementation
    }).catch(error => console.error('Failed to track search:', error));
    
    // Cache results for a shorter period (15 minutes)
    await this.cacheService.set(cacheKey, results, 900);
    
    return results;
  }

  /**
   * Get featured plans by category
   */
  async getFeaturedPlans(category?: string, limit: number = 6): Promise<Plan[]> {
    const cacheKey = `featured_plans_${category || 'all'}_${limit}`;
    
    const cachedPlans = await this.cacheService.get<Plan[]>(cacheKey);
    if (cachedPlans) {
      return cachedPlans;
    }
    
    // Convert string category to PlanCategory type if provided
    const planCategory = category as any;
    const plans = await this.planRepository.getFeaturedPlans(planCategory, limit);
    
    // Cache for 2 hours as featured content changes less frequently
    await this.cacheService.set(cacheKey, plans, 7200);
    
    return plans;
  }

  /**
   * Get related plans for a specific plan
   */
  async getRelatedPlans(planId: string, limit: number = 4): Promise<Plan[]> {
    const cacheKey = `related_plans_${planId}_${limit}`;
    
    const cachedPlans = await this.cacheService.get<Plan[]>(cacheKey);
    if (cachedPlans) {
      return cachedPlans;
    }
    
    const plans = await this.planRepository.getRelatedPlans(planId, limit);
    
    await this.cacheService.set(cacheKey, plans, 3600);
    
    return plans;
  }

  /**
   * Generate an affiliate link for a plan
   */
  generateAffiliateLink(plan: Plan, linkType: string): string {
    try {
      // Fixed method name here
      return this.affiliateService.generateAffiliateLink(plan, linkType);
    } catch (error) {
      console.error('Error generating affiliate link:', error);
      // Fallback in case of error - create a basic link to the plan
      return `/house-plans/${plan.slug}`;
    }
  }

  /**
   * Track affiliate link click
   */
  async trackAffiliateLinkClick(planId: string, category: string, source: string): Promise<void> {
    await this.analyticsService.trackAffiliateLinkClick({
      planId,
      category,
      source,
      deviceType: 'desktop', // This would be determined in the implementation
    });
  }

  /**
   * Get new plans
   */
  async getNewPlans(limit: number = 8): Promise<Plan[]> {
    const cacheKey = `new_plans_${limit}`;
    
    const cachedPlans = await this.cacheService.get<Plan[]>(cacheKey);
    if (cachedPlans) {
      return cachedPlans;
    }
    
    const plans = await this.planRepository.getNewPlans(limit);
    
    // Cache for a shorter time as new plans may be added frequently
    await this.cacheService.set(cacheKey, plans, 1800); // 30 minutes
    
    return plans;
  }

  /**
   * Get popular plans
   */
  async getPopularPlans(category?: string, limit: number = 8): Promise<Plan[]> {
    const cacheKey = `popular_plans_${category || 'all'}_${limit}`;
    
    const cachedPlans = await this.cacheService.get<Plan[]>(cacheKey);
    if (cachedPlans) {
      return cachedPlans;
    }
    
    // Convert string category to PlanCategory type if provided
    const planCategory = category as any;
    const plans = await this.planRepository.getPopularPlans(planCategory, limit);
    
    await this.cacheService.set(cacheKey, plans, 3600);
    
    return plans;
  }
}