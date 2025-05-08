import { 
  User, 
  Plan, 
  RecentlyViewedItem 
} from '../domain/entities';
import { 
  IUserRepository, 
  IPlanRepository 
} from '../domain/interfaces';

export class UserUseCases {
  constructor(
    private userRepository: IUserRepository,
    private planRepository: IPlanRepository
  ) {}

  /**
   * Save a plan to user's favorites
   */
  async savePlan(userId: string, planId: string): Promise<boolean> {
    return await this.userRepository.addSavedPlan(userId, planId);
  }

  /**
   * Remove a plan from user's favorites
   */
  async removeSavedPlan(userId: string, planId: string): Promise<boolean> {
    return await this.userRepository.removeSavedPlan(userId, planId);
  }

  /**
   * Get user's saved plans with full plan details
   */
  async getSavedPlansWithDetails(userId: string): Promise<Plan[]> {
    const savedPlanIds = await this.userRepository.getSavedPlans(userId);
    
    // Get full plan details for each saved plan
    const planPromises = savedPlanIds.map(id => this.planRepository.getPlanById(id));
    const plans = await Promise.all(planPromises);
    
    // Filter out any null plans (in case a plan was deleted)
    return plans.filter((plan): plan is Plan => plan !== null);
  }

  /**
   * Track a plan view in recently viewed
   */
  async addToRecentlyViewed(userId: string, planId: string): Promise<boolean> {
    return await this.userRepository.addRecentlyViewed(userId, planId);
  }

  /**
   * Get user's recently viewed plans with full plan details
   */
  async getRecentlyViewedWithDetails(userId: string, limit: number = 5): Promise<{
    plan: Plan;
    viewedAt: Date;
  }[]> {
    const recentItems = await this.userRepository.getRecentlyViewed(userId, limit);
    
    // Get full plan details for each recent item
    const planDetailsPromises = recentItems.map(async item => {
      const plan = await this.planRepository.getPlanById(item.planId);
      return { plan, viewedAt: item.viewedAt };
    });
    
    const results = await Promise.all(planDetailsPromises);
    
    // Filter out any items with null plans
    return results.filter(item => item.plan !== null) as {
      plan: Plan;
      viewedAt: Date;
    }[];
  }

  /**
   * Update user preferences
   */
  async updatePreferences(userId: string, preferences: Partial<User['preferences']>): Promise<User> {
    return await this.userRepository.updatePreferences(userId, preferences);
  }
}