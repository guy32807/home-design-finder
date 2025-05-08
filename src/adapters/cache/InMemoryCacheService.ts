import { ICacheService } from '@/core/domain/interfaces';

type CacheItem<T> = {
  value: T;
  expiresAt: number | null;
};

/**
 * Simple in-memory cache implementation
 */
export class InMemoryCacheService implements ICacheService {
  private cache: Map<string, CacheItem<any>> = new Map();
  
  async get<T>(key: string): Promise<T | null> {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }
    
    // Check if item is expired
    if (item.expiresAt !== null && item.expiresAt < Date.now()) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value as T;
  }
  
  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    const expiresAt = ttlSeconds ? Date.now() + (ttlSeconds * 1000) : null;
    this.cache.set(key, { value, expiresAt });
  }
  
  async delete(key: string): Promise<void> {
    this.cache.delete(key);
  }
  
  async has(key: string): Promise<boolean> {
    const item = this.cache.get(key);
    
    if (!item) {
      return false;
    }
    
    // Check if item is expired
    if (item.expiresAt !== null && item.expiresAt < Date.now()) {
      this.cache.delete(key);
      return false;
    }
    
    return true;
  }
  
  async clear(): Promise<void> {
    this.cache.clear();
  }
}