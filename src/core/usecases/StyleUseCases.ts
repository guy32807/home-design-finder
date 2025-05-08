import { Style } from '../domain/entities';
import { 
  IStyleRepository, 
  ICacheService 
} from '../domain/interfaces';

export class StyleUseCases {
  constructor(
    private styleRepository: IStyleRepository,
    private cacheService: ICacheService
  ) {}

  /**
   * Get a style by its slug
   */
  async getStyleBySlug(slug: string): Promise<Style | null> {
    const cacheKey = `style_${slug}`;
    
    const cachedStyle = await this.cacheService.get<Style>(cacheKey);
    if (cachedStyle) {
      return cachedStyle;
    }
    
    const style = await this.styleRepository.getStyleBySlug(slug);
    
    if (style) {
      // Cache for a long time (6 hours) as styles rarely change
      await this.cacheService.set(cacheKey, style, 21600);
    }
    
    return style;
  }

  /**
   * Get all architectural styles
   */
  async getAllStyles(): Promise<Style[]> {
    const cacheKey = 'all_styles';
    
    const cachedStyles = await this.cacheService.get<Style[]>(cacheKey);
    if (cachedStyles) {
      return cachedStyles;
    }
    
    const styles = await this.styleRepository.getAllStyles();
    
    // Cache for a long time (6 hours) as styles rarely change
    await this.cacheService.set(cacheKey, styles, 21600);
    
    return styles;
  }

  /**
   * Get popular architectural styles
   */
  async getPopularStyles(limit: number = 8): Promise<Style[]> {
    const cacheKey = `popular_styles_${limit}`;
    
    const cachedStyles = await this.cacheService.get<Style[]>(cacheKey);
    if (cachedStyles) {
      return cachedStyles;
    }
    
    const styles = await this.styleRepository.getPopularStyles(limit);
    
    await this.cacheService.set(cacheKey, styles, 3600);
    
    return styles;
  }
}