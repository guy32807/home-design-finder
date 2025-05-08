import { Plan } from '../entities';

export interface IAffiliateService {
  /**
   * Generate an affiliate link for a plan
   */
  generateAffiliateLink(plan: Plan, linkType: string): string;
  
  /**
   * Track an affiliate link click
   */
  trackAffiliateLinkClick(planId: string, planCategory: string, linkType: string): Promise<void>;
}