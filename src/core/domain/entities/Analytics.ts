/**
 * Represents an affiliate link click event
 */
export interface AffiliateLinkClick {
  id: string;
  planId?: string;
  planNumber?: string;
  category: string;
  source: string;
  timestamp: Date;
  sessionId?: string;
  userId?: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrer?: string;
}

/**
 * Represents a page view event
 */
export interface PageView {
  id: string;
  path: string;
  title: string;
  timestamp: Date;
  sessionId?: string;
  userId?: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  duration?: number;
  referrer?: string;
}

/**
 * Represents a search event
 */
export interface SearchEvent {
  id: string;
  query: string;
  filters?: Record<string, any>;
  resultsCount: number;
  timestamp: Date;
  sessionId?: string;
  userId?: string;
}