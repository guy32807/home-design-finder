/**
 * Interface for caching operations
 */
export interface ICacheService {
  /**
   * Get a value from cache
   */
  get<T>(key: string): Promise<T | null>;
  
  /**
   * Set a value in cache
   */
  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
  
  /**
   * Delete a value from cache
   */
  delete(key: string): Promise<void>;
  
  /**
   * Check if a key exists in cache
   */
  has(key: string): Promise<boolean>;
  
  /**
   * Clear all cache
   */
  clear(): Promise<void>;
}