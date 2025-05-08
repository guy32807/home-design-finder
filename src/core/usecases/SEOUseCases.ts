import { Plan, BlogPost } from '../domain/entities';
import { ISEOService } from '../domain/interfaces';

export class SEOUseCases {
  constructor(
    private seoService: ISEOService
  ) {}

  /**
   * Generate metadata for a plan page
   */
  generatePlanMetadata(plan: Plan, baseUrl: string): {
    title: string;
    description: string;
    ogImage: string;
    canonicalUrl: string;
    structuredData: string;
  } {
    const planUrl = `${baseUrl}/house-plans/${plan.slug}`;
    const imageUrl = plan.images.find(img => img.isPrimary)?.url || plan.images[0]?.url || '';
    
    const structuredData = this.seoService.generatePlanStructuredData({
      name: plan.name,
      description: plan.description,
      price: plan.pricing.basePrice,
      imageUrl,
      url: planUrl,
      planNumber: plan.planNumber,
      features: plan.features,
    });
    
    return {
      title: `${plan.name} - Plan #${plan.planNumber}`,
      description: plan.description.substring(0, 160) + (plan.description.length > 160 ? '...' : ''),
      ogImage: imageUrl,
      canonicalUrl: this.seoService.generateCanonicalUrl(`/house-plans/${plan.slug}`),
      structuredData,
    };
  }

  /**
   * Generate metadata for a blog post
   */
  generateBlogPostMetadata(post: BlogPost, baseUrl: string): {
    title: string;
    description: string;
    ogImage: string;
    canonicalUrl: string;
    structuredData: string;
  } {
    const postUrl = `${baseUrl}/blog/${post.slug}`;
    
    const structuredData = this.seoService.generateBlogStructuredData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      authorName: post.author.name,
      publishDate: post.publishDate,
      updatedDate: post.updatedDate,
      imageUrl: post.featuredImage || '',
      url: postUrl,
    });
    
    return {
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt.substring(0, 160) + (post.excerpt.length > 160 ? '...' : ''),
      ogImage: post.seo?.ogImage || post.featuredImage || '',
      canonicalUrl: post.seo?.canonicalUrl || this.seoService.generateCanonicalUrl(`/blog/${post.slug}`),
      structuredData,
    };
  }

  /**
   * Generate metadata for a category page
   */
  generateCategoryMetadata(
    category: string, 
    description: string, 
    imageUrl?: string
  ): {
    title: string;
    description: string;
    ogImage?: string;
    canonicalUrl: string;
  } {
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
    
    return {
      title: `${categoryName} Plans - Home Design Finder`,
      description: description.substring(0, 160) + (description.length > 160 ? '...' : ''),
      ogImage: imageUrl,
      canonicalUrl: this.seoService.generateCanonicalUrl(`/${category}-plans`),
    };
  }
}