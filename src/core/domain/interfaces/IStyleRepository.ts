import { Style } from '../entities';

/**
 * Interface for architectural style data access operations
 */
export interface IStyleRepository {
  /**
   * Get a style by its ID
   */
  getStyleById(id: string): Promise<Style | null>;
  
  /**
   * Get a style by its slug
   */
  getStyleBySlug(slug: string): Promise<Style | null>;
  
  /**
   * Get all architectural styles
   */
  getAllStyles(): Promise<Style[]>;
  
  /**
   * Get popular architectural styles
   */
  getPopularStyles(limit?: number): Promise<Style[]>;
}