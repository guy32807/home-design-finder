import { IImageService } from '../../core/domain/interfaces/IImageService';

export class ImageService implements IImageService {
  private readonly baseUrl: string;
  private readonly cdnUrl: string;
  
  constructor(baseUrl: string = '/api', cdnUrl: string = 'https://cdn.example.com') {
    this.baseUrl = baseUrl;
    this.cdnUrl = cdnUrl;
    console.log('ImageService initialized');
  }

  /**
   * Optimize an image and return the optimized URL
   */
  async optimizeImage(
    originalUrl: string, 
    width: number, 
    height?: number
    // Remove unused parameter
    // options?: any
  ): Promise<string> {
    // In a real implementation, this would call an image optimization service
    // For now, we'll just return a mock optimized URL
    
    // If the image is already on our CDN, return it with optimization parameters
    if (originalUrl.startsWith(this.cdnUrl)) {
      return `${originalUrl}?w=${width}${height ? `&h=${height}` : ''}`;
    }
    
    // For external images, we'd proxy through our optimization service
    return `${this.baseUrl}/api/optimize-image?src=${encodeURIComponent(originalUrl)}&width=${width}${height ? `&height=${height}` : ''}`;
  }

  /**
   * Get responsive image sources for different screen sizes
   */
  getResponsiveSources(originalUrl: string): { [key: string]: string } {
    return {
      small: this.getImageUrlSync(originalUrl, 640),
      medium: this.getImageUrlSync(originalUrl, 1024),
      large: this.getImageUrlSync(originalUrl, 1920)
    };
  }

  /**
   * Synchronous method to get the image URL without optimization
   * (used for static rendering)
   */
  getImageUrlSync(originalUrl: string, width: number, height?: number): string {
    // If the image is already on our CDN, return it with optimization parameters
    if (originalUrl.startsWith(this.cdnUrl)) {
      return `${originalUrl}?w=${width}${height ? `&h=${height}` : ''}`;
    }
    
    // For external images, we'd normally proxy through our optimization service
    // But since this is sync, we'll just return the original for now
    // Remove unused variable
    // const url = originalUrl;
    return originalUrl;
  }
}