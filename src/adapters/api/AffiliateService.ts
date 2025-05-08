import { IAffiliateService } from '../../core/domain/interfaces/IAffiliateService';
import { Plan } from '../../core/domain/entities';

export class AffiliateService implements IAffiliateService {
  private readonly affiliateId: string;
  private readonly baseUrl: string;
  
  constructor(
    affiliateId: string = '101433563-14548500',
    baseUrl: string = 'https://www.jdoqocy.com/click'
  ) {
    this.affiliateId = affiliateId;
    this.baseUrl = baseUrl;
    
    console.log(`AffiliateService initialized with ID: ${affiliateId}`);
  }

  /**
   * Generate an affiliate link for a plan
   */
  generateAffiliateLink(plan: Plan, linkType: string): string {
    // Use the actual CJ affiliate link format
    // https://www.jdoqocy.com/click-101433563-14548500
    const affiliateUrl = `${this.baseUrl}-${this.affiliateId}`;
    
    // Add additional parameters for tracking
    const url = new URL(affiliateUrl);
    
    // Add the product ID if available
    if (plan.planNumber) {
      url.searchParams.append('product', plan.planNumber);
    }
    
    // Add link type for different placement tracking
    url.searchParams.append('type', linkType);
    
    // Add timestamp for uniqueness in tracking
    url.searchParams.append('t', new Date().getTime().toString());
    
    const externalUrl = url.toString();
    console.log(`Generated affiliate link: ${externalUrl}`);
    return externalUrl;
  }

  /**
   * Track an affiliate link click
   */
  async trackAffiliateLinkClick(
    planId: string, 
    planCategory: string, 
    linkType: string
  ): Promise<void> {
    try {
      console.log(`Tracking affiliate click: planId=${planId}, category=${planCategory}, linkType=${linkType}, affiliateId=${this.affiliateId}`);
      
      // In a real implementation, you would send this tracking data to your analytics service
      const trackingData = {
        planId,
        planCategory,
        linkType,
        affiliateId: this.affiliateId,
        timestamp: new Date().toISOString(),
        referrer: typeof window !== 'undefined' ? document.referrer : 'server-side',
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'server-side'
      };
      
      console.log('Tracking data:', trackingData);
      
      // In real implementation, send to your analytics endpoint
      // For now we just log it, but you could implement an API route
      // await fetch('/api/track-affiliate', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(trackingData)
      // });
    } catch (error) {
      console.error('Error tracking affiliate click:', error);
    }
  }
}