/**
 * Interface for image processing operations
 */
export interface IImageService {
  /**
   * Get an optimized image URL with specified dimensions
   */
  getOptimizedImageUrl(url: string, width: number, height?: number, options?: {
    quality?: number;
    format?: 'webp' | 'jpeg' | 'png';
    fit?: 'cover' | 'contain' | 'fill';
  }): string;
  
  /**
   * Get responsive image srcset
   */
  getResponsiveSrcSet(url: string, widths: number[], options?: {
    quality?: number;
    format?: 'webp' | 'jpeg' | 'png';
  }): string;
  
  /**
   * Get image dimensions
   */
  getImageDimensions(url: string): Promise<{width: number; height: number}>;
}