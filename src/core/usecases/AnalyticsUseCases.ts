import { 
  IAnalyticsService, 
  IAffiliateService 
} from '../domain/interfaces';

export class AnalyticsUseCases {
  constructor(
    private analyticsService: IAnalyticsService,
    private affiliateService: IAffiliateService
  ) {}

  /**
   * Track an affiliate link click and generate the link
   */
  async trackAndGenerateAffiliateLink(
    planId: string, 
    category: string, 
    source: string,
    sessionId?: string,
    userId?: string,
    deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop'
  ): Promise<string> {
    // First track the click
    await this.analyticsService.trackAffiliateLinkClick({
      planId,
      category,
      source,
      sessionId,
      userId,
      deviceType,
    });
    
    // Then generate and return the link
    return this.affiliateService.generateLink(planId, category, source);
  }

  /**
   * Get affiliate click summary for a date range
   */
  async getAffiliateLinkClicksSummary(startDate: Date, endDate: Date): Promise<{
    total: number;
    byCategory: Record<string, number>;
    bySource: Record<string, number>;
    byDay: Record<string, number>;
  }> {
    return await this.analyticsService.getAffiliateLinkClicksSummary(startDate, endDate);
  }

  /**
   * Get page view summary for a date range
   */
  async getPageViewsSummary(startDate: Date, endDate: Date): Promise<{
    total: number;
    byPath: Record<string, number>;
    byDay: Record<string, number>;
  }> {
    return await this.analyticsService.getPageViewsSummary(startDate, endDate);
  }

  /**
   * Get popular search terms
   */
  async getPopularSearchTerms(limit: number = 20): Promise<Array<{term: string, count: number}>> {
    return await this.analyticsService.getPopularSearchTerms(limit);
  }
}