import { 
  Collection, 
  PopulatedCollection 
} from '../domain/entities';
import { 
  ICollectionRepository, 
  ICacheService, 
  IAffiliateService 
} from '../domain/interfaces';

export class CollectionUseCases {
  constructor(
    private collectionRepository: ICollectionRepository,
    private cacheService: ICacheService,
    private affiliateService: IAffiliateService
  ) {}

  /**
   * Get a collection by its slug with plans populated
   */
  async getCollectionBySlug(slug: string): Promise<PopulatedCollection | null> {
    const cacheKey = `populated_collection_${slug}`;
    
    const cachedCollection = await this.cacheService.get<PopulatedCollection>(cacheKey);
    if (cachedCollection) {
      return cachedCollection;
    }
    
    const collection = await this.collectionRepository.getPopulatedCollectionBySlug(slug);
    
    if (collection) {
      await this.cacheService.set(cacheKey, collection, 3600);
    }
    
    return collection;
  }

  /**
   * Get all active collections
   */
  async getAllCollections(limit?: number, offset?: number): Promise<Collection[]> {
    const cacheKey = `all_collections_${limit || 'all'}_${offset || 0}`;
    
    const cachedCollections = await this.cacheService.get<Collection[]>(cacheKey);
    if (cachedCollections) {
      return cachedCollections;
    }
    
    const collections = await this.collectionRepository.getAllCollections(limit, offset);
    
    // Cache for 2 hours as collections don't change frequently
    await this.cacheService.set(cacheKey, collections, 7200);
    
    return collections;
  }

  /**
   * Get featured collections
   */
  async getFeaturedCollections(limit: number = 4): Promise<Collection[]> {
    const cacheKey = `featured_collections_${limit}`;
    
    const cachedCollections = await this.cacheService.get<Collection[]>(cacheKey);
    if (cachedCollections) {
      return cachedCollections;
    }
    
    const collections = await this.collectionRepository.getFeaturedCollections(limit);
    
    await this.cacheService.set(cacheKey, collections, 7200);
    
    return collections;
  }

  /**
   * Generate affiliate link for a collection
   */
  generateCollectionAffiliateLink(collectionId: string, source: string): string {
    return this.affiliateService.generateCollectionLink(collectionId, source);
  }
}