import { 
  BlogPost, 
  BlogCategory 
} from '../domain/entities';
import { 
  IBlogRepository, 
  ICacheService, 
  IAnalyticsService 
} from '../domain/interfaces';

export class BlogUseCases {
  constructor(
    private blogRepository: IBlogRepository,
    private cacheService: ICacheService,
    private analyticsService: IAnalyticsService
  ) {}

  /**
   * Get a blog post by its slug
   */
  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const cacheKey = `blog_post_${slug}`;
    
    const cachedPost = await this.cacheService.get<BlogPost>(cacheKey);
    if (cachedPost) {
      return cachedPost;
    }
    
    const post = await this.blogRepository.getBlogPostBySlug(slug);
    
    if (post) {
      await this.cacheService.set(cacheKey, post, 3600);
      
      // Track page view for the blog post
      this.analyticsService.trackPageView({
        path: `/blog/${slug}`,
        title: post.title,
        sessionId: '', // This would be populated in the implementation
        deviceType: 'desktop', // This would be determined in the implementation
      }).catch(error => console.error('Failed to track page view:', error));
    }
    
    return post;
  }

  /**
   * Get all published blog posts with pagination
   */
  async getAllPublishedPosts(limit: number = 10, offset: number = 0): Promise<{
    posts: BlogPost[];
    total: number;
  }> {
    const cacheKey = `published_posts_${limit}_${offset}`;
    
    const cachedResult = await this.cacheService.get<{
      posts: BlogPost[];
      total: number;
    }>(cacheKey);
    
    if (cachedResult) {
      return cachedResult;
    }
    
    const result = await this.blogRepository.getAllPublishedPosts(limit, offset);
    
    // Cache for 30 minutes as blog posts may be published frequently
    await this.cacheService.set(cacheKey, result, 1800);
    
    return result;
  }

  /**
   * Get blog posts by category
   */
  async getPostsByCategory(categorySlug: string, limit: number = 10, offset: number = 0): Promise<{
    posts: BlogPost[];
    total: number;
    category: BlogCategory;
  }> {
    const cacheKey = `category_posts_${categorySlug}_${limit}_${offset}`;
    
    const cachedResult = await this.cacheService.get<{
      posts: BlogPost[];
      total: number;
      category: BlogCategory;
    }>(cacheKey);
    
    if (cachedResult) {
      return cachedResult;
    }
    
    const result = await this.blogRepository.getPostsByCategory(categorySlug, limit, offset);
    
    await this.cacheService.set(cacheKey, result, 1800);
    
    return result;
  }

  /**
   * Get all blog categories
   */
  async getAllCategories(): Promise<BlogCategory[]> {
    const cacheKey = 'all_blog_categories';
    
    const cachedCategories = await this.cacheService.get<BlogCategory[]>(cacheKey);
    if (cachedCategories) {
      return cachedCategories;
    }
    
    const categories = await this.blogRepository.getAllCategories();
    
    // Cache for longer (4 hours) as categories change rarely
    await this.cacheService.set(cacheKey, categories, 14400);
    
    return categories;
  }

  /**
   * Get related blog posts
   */
  async getRelatedPosts(postId: string, limit: number = 3): Promise<BlogPost[]> {
    const cacheKey = `related_posts_${postId}_${limit}`;
    
    const cachedPosts = await this.cacheService.get<BlogPost[]>(cacheKey);
    if (cachedPosts) {
      return cachedPosts;
    }
    
    const posts = await this.blogRepository.getRelatedPosts(postId, limit);
    
    await this.cacheService.set(cacheKey, posts, 3600);
    
    return posts;
  }

  /**
   * Get featured blog posts
   */
  async getFeaturedPosts(limit: number = 4): Promise<BlogPost[]> {
    const cacheKey = `featured_posts_${limit}`;
    
    const cachedPosts = await this.cacheService.get<BlogPost[]>(cacheKey);
    if (cachedPosts) {
      return cachedPosts;
    }
    
    const posts = await this.blogRepository.getFeaturedPosts(limit);
    
    await this.cacheService.set(cacheKey, posts, 3600);
    
    return posts;
  }
}