import { Collection, PopulatedCollection } from '../entities';

/**
 * Interface for collection data access operations
 */
export interface ICollectionRepository {
  /**
   * Get a collection by its ID
   */
  getCollectionById(id: string): Promise<Collection | null>;
  
  /**
   * Get a collection by its slug
   */
  getCollectionBySlug(slug: string): Promise<Collection | null>;
  
  /**
   * Get all active collections
   */
  getAllCollections(limit?: number, offset?: number): Promise<Collection[]>;
  
  /**
   * Get a populated collection (with plan objects)
   */
  getPopulatedCollection(id: string): Promise<PopulatedCollection | null>;
  
  /**
   * Get a populated collection by slug
   */
  getPopulatedCollectionBySlug(slug: string): Promise<PopulatedCollection | null>;
  
  /**
   * Get featured collections
   */
  getFeaturedCollections(limit?: number): Promise<Collection[]>;
}