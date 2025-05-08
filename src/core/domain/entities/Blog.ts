/**
 * Represents a blog post
 */
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: Author;
  category: BlogCategory;
  tags: string[];
  featuredImage?: string;
  gallery?: string[];
  relatedPlanIds?: string[];
  publishDate: Date;
  updatedDate?: Date;
  status: 'draft' | 'published' | 'archived';
  seo?: SEOData;
}

/**
 * Author of content
 */
export interface Author {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  role?: string;
}

/**
 * Blog category
 */
export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

/**
 * SEO metadata for content
 */
export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
}