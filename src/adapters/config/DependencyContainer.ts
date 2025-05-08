// Import interfaces
import {
  IPlanRepository,
  ICollectionRepository,
  IBlogRepository,
  ICacheService,
  IAnalyticsService,
  IAffiliateService,
  IImageService,
  ISEOService
} from '@/core/domain/interfaces';

// Import use cases
import {
  PlanUseCases,
  CollectionUseCases,
  BlogUseCases,
  UserUseCases,
  StyleUseCases,
  AnalyticsUseCases,
  SEOUseCases
} from '../../core/usecases';

// Import repositories and services
import { PlanRepository } from '../api/PlanRepository';
import { AffiliateService } from '../api/AffiliateService';
import { AnalyticsService } from '../analytics/AnalyticsService';
import { CacheService } from '../storage/CacheService';
import { SEOService } from '../api/SEOService';
import { ImageService } from '../api/ImageService';

/**
 * Dependency container for the application
 * This centralizes all dependency creation and injection
 */
export class DependencyContainer {
  // Services
  private cacheService: CacheService;
  private affiliateService: AffiliateService;
  private analyticsService: AnalyticsService;
  private imageService: ImageService;
  private seoService: SEOService;
  
  // Repositories
  private planRepository: PlanRepository;
  
  // Use cases
  private planUseCases: PlanUseCases;
  private collectionUseCases: CollectionUseCases;
  private blogUseCases: BlogUseCases;
  private userUseCases: UserUseCases;
  private styleUseCases: StyleUseCases;
  private analyticsUseCases: AnalyticsUseCases;
  private seoUseCases: SEOUseCases;
  
  constructor() {
    console.log('Initializing DependencyContainer');
    
    // Initialize services
    this.cacheService = new CacheService();
    this.affiliateService = this.setupAffiliateService();
    this.analyticsService = new AnalyticsService();
    this.imageService = new ImageService('/api', 'https://images.unsplash.com');
    this.seoService = new SEOService();
    
    // Initialize repositories
    this.planRepository = new PlanRepository('/api');
    
    // Initialize use cases
    this.planUseCases = new PlanUseCases(
      this.planRepository,
      this.analyticsService,
      this.affiliateService,
      this.cacheService
    );
    
    // For now, we'll initialize these with partial dependencies
    // In a complete implementation, you would inject all required dependencies
    this.collectionUseCases = new CollectionUseCases(
      {} as any, // collectionRepository would be implemented later
      this.cacheService,
      this.affiliateService
    );
    
    this.blogUseCases = new BlogUseCases(
      {} as any, // blogRepository would be implemented later
      this.cacheService,
      this.analyticsService
    );
    
    this.userUseCases = new UserUseCases(
      {} as any, // userRepository would be implemented later
      this.planRepository
    );
    
    this.styleUseCases = new StyleUseCases(
      {} as any, // styleRepository would be implemented later
      this.cacheService
    );
    
    this.analyticsUseCases = new AnalyticsUseCases(
      this.analyticsService,
      this.affiliateService
    );
    
    this.seoUseCases = new SEOUseCases(
      this.seoService
    );
  }
  
  private setupAffiliateService(): IAffiliateService {
    return new AffiliateService(
      'CJ_123456', // Replace with your Commission Junction affiliate ID
      'https://www.architecturaldesigns.com', // Real architectural designs site
      {
        utm_source: 'architectural-inspirations',
        utm_medium: 'affiliate',
        utm_campaign: 'house-plans',
        utm_content: 'clean-architecture-app'
      }
    );
  }
  
  // Getters for services
  getCacheService(): CacheService {
    return this.cacheService;
  }
  
  getAffiliateService(): AffiliateService {
    return this.affiliateService;
  }
  
  getAnalyticsService(): AnalyticsService {
    return this.analyticsService;
  }
  
  getImageService(): ImageService {
    return this.imageService;
  }
  
  getSEOService(): SEOService {
    return this.seoService;
  }
  
  // Getters for repositories
  getPlanRepository(): PlanRepository {
    return this.planRepository;
  }
  
  // Getters for use cases
  getPlanUseCases(): PlanUseCases {
    return this.planUseCases;
  }
  
  getCollectionUseCases(): CollectionUseCases {
    return this.collectionUseCases;
  }
  
  getBlogUseCases(): BlogUseCases {
    return this.blogUseCases;
  }
  
  getUserUseCases(): UserUseCases {
    return this.userUseCases;
  }
  
  getStyleUseCases(): StyleUseCases {
    return this.styleUseCases;
  }
  
  getAnalyticsUseCases(): AnalyticsUseCases {
    return this.analyticsUseCases;
  }
  
  getSEOUseCases(): SEOUseCases {
    return this.seoUseCases;
  }
}

// Create and export a singleton instance
export const dependencyContainer = new DependencyContainer();