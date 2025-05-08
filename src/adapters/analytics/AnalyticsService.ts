import { IAnalyticsService } from '@/core/domain/interfaces';
import { 
  AffiliateLinkClick, 
  PageView, 
  SearchEvent 
} from '@/core/domain/entities';

/**
 * In-memory implementation of analytics service for development
 * In production, this would connect to an analytics backend
 */
export class AnalyticsService implements IAnalyticsService {
  private affiliateClicks: Omit<AffiliateLinkClick, 'id'>[] = [];
  private pageViews: Omit<PageView, 'id'>[] = [];
  private searches: Omit<SearchEvent, 'id'>[] = [];
  
  constructor() {
    // In a real implementation, this might initialize a connection to an analytics service
    console.log('Analytics service initialized');
  }
  
  async trackAffiliateLinkClick(data: Omit<AffiliateLinkClick, 'id' | 'timestamp'>): Promise<void> {
    this.affiliateClicks.push({
      ...data,
      timestamp: new Date()
    });
    
    console.log(`Tracked affiliate link click: ${data.planId || 'general'} from ${data.source}`);
    
    // In a real implementation, this would send data to an analytics backend
  }
  
  async trackPageView(data: Omit<PageView, 'id' | 'timestamp'>): Promise<void> {
    this.pageViews.push({
      ...data,
      timestamp: new Date()
    });
    
    console.log(`Tracked page view: ${data.path}`);
    
    // In a real implementation, this would send data to an analytics backend
  }
  
  async trackSearch(data: Omit<SearchEvent, 'id' | 'timestamp'>): Promise<void> {
    this.searches.push({
      ...data,
      timestamp: new Date()
    });
    
    console.log(`Tracked search: "${data.query}" with ${data.resultsCount} results`);
    
    // In a real implementation, this would send data to an analytics backend
  }
  
  async getAffiliateLinkClicksSummary(startDate: Date, endDate: Date): Promise<{
    total: number;
    byCategory: Record<string, number>;
    bySource: Record<string, number>;
    byDay: Record<string, number>;
  }> {
    // Filter clicks by date range
    const filteredClicks = this.affiliateClicks.filter(click => 
      click.timestamp >= startDate && click.timestamp <= endDate
    );
    
    // Calculate totals
    const byCategory: Record<string, number> = {};
    const bySource: Record<string, number> = {};
    const byDay: Record<string, number> = {};
    
    filteredClicks.forEach(click => {
      // By category
      byCategory[click.category] = (byCategory[click.category] || 0) + 1;
      
      // By source
      bySource[click.source] = (bySource[click.source] || 0) + 1;
      
      // By day
      const day = click.timestamp.toISOString().split('T')[0];
      byDay[day] = (byDay[day] || 0) + 1;
    });
    
    return {
      total: filteredClicks.length,
      byCategory,
      bySource,
      byDay
    };
  }
  
  async getPageViewsSummary(startDate: Date, endDate: Date): Promise<{
    total: number;
    byPath: Record<string, number>;
    byDay: Record<string, number>;
  }> {
    // Filter page views by date range
    const filteredViews = this.pageViews.filter(view => 
      view.timestamp >= startDate && view.timestamp <= endDate
    );
    
    // Calculate totals
    const byPath: Record<string, number> = {};
    const byDay: Record<string, number> = {};
    
    filteredViews.forEach(view => {
      // By path
      byPath[view.path] = (byPath[view.path] || 0) + 1;
      
      // By day
      const day = view.timestamp.toISOString().split('T')[0];
      byDay[day] = (byDay[day] || 0) + 1;
    });
    
    return {
      total: filteredViews.length,
      byPath,
      byDay
    };
  }
  
  async getPopularSearchTerms(limit: number = 20): Promise<Array<{term: string, count: number}>> {
    // Count search terms
    const termCounts: Record<string, number> = {};
    
    this.searches.forEach(search => {
      if (search.query) {
        const normalizedTerm = search.query.toLowerCase().trim();
        termCounts[normalizedTerm] = (termCounts[normalizedTerm] || 0) + 1;
      }
    });
    
    // Convert to array and sort by count descending
    return Object.entries(termCounts)
      .map(([term, count]) => ({ term, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }
}