import { AffiliateLinkClick, PageView, SearchEvent } from '../entities';

/**
 * Interface for analytics operations
 */
export interface IAnalyticsService {
  /**
   * Track an affiliate link click
   */
  trackAffiliateLinkClick(data: Omit<AffiliateLinkClick, 'id' | 'timestamp'>): Promise<void>;
  
  /**
   * Track a page view
   */
  trackPageView(data: Omit<PageView, 'id' | 'timestamp'>): Promise<void>;
  
  /**
   * Track a search event
   */
  trackSearch(data: Omit<SearchEvent, 'id' | 'timestamp'>): Promise<void>;
  
  /**
   * Get summary of affiliate link clicks
   */
  getAffiliateLinkClicksSummary(startDate: Date, endDate: Date): Promise<{
    total: number;
    byCategory: Record<string, number>;
    bySource: Record<string, number>;
    byDay: Record<string, number>;
  }>;
  
  /**
   * Get summary of page views
   */
  getPageViewsSummary(startDate: Date, endDate: Date): Promise<{
    total: number;
    byPath: Record<string, number>;
    byDay: Record<string, number>;
  }>;
  
  /**
   * Get popular search terms
   */
  getPopularSearchTerms(limit?: number): Promise<Array<{term: string, count: number}>>;
}