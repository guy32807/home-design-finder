import { ISEOService } from '../../core/domain/interfaces';
import { SEOData } from '../../core/domain/entities';

/**
 * Service for generating SEO-related content
 */
export class SEOService implements ISEOService {
  private baseUrl: string;
  
  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  }
  
  generateMetaTags(data: SEOData): Record<string, string> {
    const metaTags: Record<string, string> = {};
    
    if (data.title) {
      metaTags['title'] = data.title;
    }
    
    if (data.description) {
      metaTags['description'] = data.description;
    }
    
    if (data.keywords && data.keywords.length > 0) {
      metaTags['keywords'] = data.keywords.join(', ');
    }
    
    if (data.canonicalUrl) {
      metaTags['canonical'] = data.canonicalUrl;
    }
    
    // Open Graph tags
    if (data.ogTitle || data.title) {
      metaTags['og:title'] = data.ogTitle || data.title || '';
    }
    
    if (data.ogDescription || data.description) {
      metaTags['og:description'] = data.ogDescription || data.description || '';
    }
    
    if (data.ogImage) {
      metaTags['og:image'] = data.ogImage;
    }
    
    return metaTags;
  }
  
  generatePlanStructuredData(plan: {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    url: string;
    planNumber: string;
    features: string[];
  }): string {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: plan.name,
      description: plan.description,
      sku: plan.planNumber,
      image: plan.imageUrl,
      url: plan.url,
      offers: {
        '@type': 'Offer',
        price: plan.price.toFixed(2),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: plan.url
      },
      brand: {
        '@type': 'Brand',
        name: 'Architectural Designs'
      }
    };
    
    return JSON.stringify(structuredData);
  }
  
  generateBlogStructuredData(blog: {
    title: string;
    excerpt: string;
    content: string;
    authorName: string;
    publishDate: Date;
    updatedDate?: Date;
    imageUrl: string;
    url: string;
  }): string {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: blog.title,
      description: blog.excerpt,
      image: blog.imageUrl,
      author: {
        '@type': 'Person',
        name: blog.authorName
      },
      publisher: {
        '@type': 'Organization',
        name: 'Home Design Finder',
        logo: {
          '@type': 'ImageObject',
          url: `${this.baseUrl}/logo.png`
        }
      },
      datePublished: blog.publishDate.toISOString(),
      dateModified: (blog.updatedDate || blog.publishDate).toISOString(),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': blog.url
      }
    };
    
    return JSON.stringify(structuredData);
  }
  
  generateCanonicalUrl(path: string): string {
    // Ensure path starts with a slash
    if (!path.startsWith('/')) {
      path = '/' + path;
    }
    
    return `${this.baseUrl}${path}`;
  }
}