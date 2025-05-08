import { User, RecentlyViewedItem } from '../entities';

/**
 * Interface for user data access operations
 */
export interface IUserRepository {
  /**
   * Get a user by their ID
   */
  getUserById(id: string): Promise<User | null>;
  
  /**
   * Get a user by their email
   */
  getUserByEmail(email: string): Promise<User | null>;
  
  /**
   * Create a new user
   */
  createUser(user: Omit<User, 'id' | 'createdAt'>): Promise<User>;
  
  /**
   * Update a user
   */
  updateUser(id: string, userData: Partial<User>): Promise<User>;
  
  /**
   * Add a plan to user's saved plans
   */
  addSavedPlan(userId: string, planId: string): Promise<boolean>;
  
  /**
   * Remove a plan from user's saved plans
   */
  removeSavedPlan(userId: string, planId: string): Promise<boolean>;
  
  /**
   * Get a user's saved plans
   */
  getSavedPlans(userId: string): Promise<string[]>;
  
  /**
   * Add a plan to user's recently viewed
   */
  addRecentlyViewed(userId: string, planId: string): Promise<boolean>;
  
  /**
   * Get a user's recently viewed plans
   */
  getRecentlyViewed(userId: string, limit?: number): Promise<RecentlyViewedItem[]>;
  
  /**
   * Update user preferences
   */
  updatePreferences(userId: string, preferences: Partial<User['preferences']>): Promise<User>;
}