import { BlogPost, BlogCategory } from '../entities';

/**
 * Interface for blog post data access operations
 */
export interface IBlogRepository {
  /**
   * Get a blog post by its ID
   */
  getBlogPostById(id: string): Promise<BlogPost | null>;
  
  /**
   * Get a blog post by its slug
   */
  getBlogPostBySlug(slug: string): Promise<BlogPost | null>;
  
  /**
   * Get all published blog posts
   */
  getAllPublishedPosts(limit?: number, offset?: number): Promise<{
    posts: BlogPost[];
    total: number;
  }>;
  
  /**
   * Get blog posts by category
   */
  getPostsByCategory(categorySlug: string, limit?: number, offset?: number): Promise<{
    posts: BlogPost[];
    total: number;
    category: BlogCategory;
  }>;
  
  /**
   * Get blog posts by tag
   */
  getPostsByTag(tag: string, limit?: number, offset?: number): Promise<{
    posts: BlogPost[];
    total: number;
  }>;
  
  /**
   * Get related blog posts
   */
  getRelatedPosts(postId: string, limit?: number): Promise<BlogPost[]>;
  
  /**
   * Get all blog categories
   */
  getAllCategories(): Promise<BlogCategory[]>;
  
  /**
   * Get a blog category by slug
   */
  getCategoryBySlug(slug: string): Promise<BlogCategory | null>;
  
  /**
   * Get featured blog posts
   */
  getFeaturedPosts(limit?: number): Promise<BlogPost[]>;
}