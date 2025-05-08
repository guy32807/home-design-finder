import { SEOData } from '../entities';

/**
 * Interface for SEO operations
 */
export interface ISEOService {
  /**
   * Generate meta tags for a page
   */
  generateMetaTags(data: SEOData): Record<string, string>;
  
  /**
   * Generate structured data for a plan
   */
  generatePlanStructuredData(
    plan: {
      name: string;
      description: string;
      price: number;
      imageUrl: string;
      url: string;
      planNumber: string;
      features: string[];
    }
  ): string;
  
  /**
   * Generate structured data for a blog post
   */
  generateBlogStructuredData(
    blog: {
      title: string;
      excerpt: string;
      content: string;
      authorName: string;
      publishDate: Date;
      updatedDate?: Date;
      imageUrl: string;
      url: string;
    }
  ): string;
  
  /**
   * Generate a canonical URL
   */
  generateCanonicalUrl(path: string): string;
}