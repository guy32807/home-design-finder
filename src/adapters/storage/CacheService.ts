import { ICacheService } from '../../core/domain/interfaces';

/**
 * In-memory cache service implementation
 * In production, you might use Redis or another distributed cache solution
 */
export class CacheService implements ICacheService {
  private cache: Map<string, { value: any; expiry: number | null }> = new Map();
  
  async get<T>(key: string): Promise<T | null> {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }
    
    // Check if the item has expired
    if (item.expiry && item.expiry < Date.now()) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value as T;
  }
  
  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    const expiry = ttlSeconds ? Date.now() + (ttlSeconds * 1000) : null;
    this.cache.set(key, { value, expiry });
  }
  
  async delete(key: string): Promise<void> {
    this.cache.delete(key);
  }
  
  async has(key: string): Promise<boolean> {
    const item = this.cache.get(key);
    
    if (!item) {
      return false;
    }
    
    // Check if the item has expired
    if (item.expiry && item.expiry < Date.now()) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }
  
  async clear(): Promise<void> {
    this.cache.clear();
  }
}