import { IPlanRepository } from '@/core/domain/interfaces';
import { 
  Plan, 
  PlanCategory, 
  PlanFilter, 
  PlanSearchResult, 
  PlanDetails,
  PlanDimensions,
  PlanImage,
  PlanPricing
} from '@/core/domain/entities';

/**
 * Mock implementation of Plan Repository for development
 */
export class MockPlanRepository implements IPlanRepository {
  private plans: Plan[] = [];
  
  constructor() {
    // Initialize with some sample data
    this.initializeSampleData();
  }
  
  private initializeSampleData(): void {
    const createPlan = (
      id: string,
      planNumber: string,
      name: string,
      category: PlanCategory,
      style: string,
      details: Partial<PlanDetails>,
      dimensions: Partial<PlanDimensions>,
      price: number,
      description: string,
      features: string[] = []
    ): Plan => {
      // Generate a slug from the name
      const slug = name.toLowerCase().replace(/\s+/g, '-');
      
      // Create standardized images
      const images: PlanImage[] = [
        {
          id: `${id}-1`,
          url: `https://placehold.co/800x600/e8e8e8/333333?text=${encodeURIComponent(name)}`,
          alt: `${name} - Exterior`,
          type: 'exterior',
          isPrimary: true,
          sortOrder: 1
        },
        {
          id: `${id}-2`,
          url: `https://placehold.co/800x600/e8e8e8/333333?text=${encodeURIComponent(name+' Floor Plan')}`,
          alt: `${name} - Floor Plan`,
          type: 'floor-plan',
          sortOrder: 2
        },
        {
          id: `${id}-3`,
          url: `https://placehold.co/800x600/e8e8e8/333333?text=${encodeURIComponent(name+' Interior')}`,
          alt: `${name} - Interior`,
          type: 'interior',
          sortOrder: 3
        }
      ];
      
      const fullDetails: PlanDetails = {
        squareFeet: details.squareFeet || 2000,
        bedrooms: details.bedrooms || 3,
        bathrooms: details.bathrooms || 2,
        stories: details.stories || 1,
        garages: details.garages || 2,
        ...details
      };
      
      const fullDimensions: PlanDimensions = {
        width: dimensions.width || 50,
        depth: dimensions.depth || 70,
        totalSquareFeet: dimensions.totalSquareFeet || details.squareFeet || 2000,
        ...dimensions
      };
      
      const pricing: PlanPricing = {
        basePrice: price,
        pdfPrice: price,
        cadPrice: price * 1.5,
        packagePrice: price * 2,
        currency: 'USD'
      };
      
      return {
        id,
        planNumber,
        name,
        slug,
        description,
        features,
        details: fullDetails,
        dimensions: fullDimensions,
        images,
        pricing,
        category,
        style,
        tags: [style, category, `${fullDetails.bedrooms} bedroom`],
        createdAt: new Date(),
        updatedAt: new Date()
      };
    };
    
    this.plans = [
      createPlan(
        'plan1',
        'AD-1234',
        'Modern Farmhouse',
        'house',
        'Farmhouse',
        { squareFeet: 2850, bedrooms: 4, bathrooms: 3.5, stories: 2, garages: 2 },
        { width: 65, depth: 80, totalSquareFeet: 2850 },
        1295,
        'This beautiful modern farmhouse plan combines traditional charm with contemporary amenities. The open floor plan features a spacious kitchen with island that flows into the great room, perfect for entertaining.',
        [
          'Open concept living',
          'First floor master suite',
          'Large walk-in pantry',
          'Bonus room above garage',
          'Covered back porch'
        ]
      ),
      createPlan(
        'plan2',
        'AD-5678',
        'Cozy Cottage',
        'house',
        'Cottage',
        { squareFeet: 1850, bedrooms: 3, bathrooms: 2, stories: 1, garages: 2 },
        { width: 50, depth: 70, totalSquareFeet: 1850 },
        995,
        'Charming cottage with an efficient layout that maximizes living space. Features include a welcoming front porch, open kitchen and living area, and a private master suite.',
        [
          'Welcoming front porch',
          'Efficient, open layout',
          'Split bedroom design',
          'Breakfast nook',
          'Laundry room'
        ]
      ),
      createPlan(
        'plan3',
        'AD-9012',
        'Luxury Ranch',
        'house',
        'Ranch',
        { squareFeet: 2200, bedrooms: 3, bathrooms: 2.5, stories: 1, garages: 3 },
        { width: 80, depth: 60, totalSquareFeet: 2200 },
        1195,
        'Single-story living at its finest, this luxury ranch offers an open floor plan, high ceilings, and a seamless indoor-outdoor living experience with a large covered patio.',
        [
          'Single-story living',
          'Vaulted ceilings',
          'Large kitchen island',
          'Covered outdoor living area',
          'Three-car garage'
        ]
      ),
      createPlan(
        'plan4',
        'AD-3456',
        'Modern Masterpiece',
        'house',
        'Modern',
        { squareFeet: 3500, bedrooms: 5, bathrooms: 4.5, stories: 2, garages: 3 },
        { width: 70, depth: 85, totalSquareFeet: 3500 },
        1495,
        'Cutting-edge design meets practical living in this contemporary home. Features include clean lines, abundant natural light, and an emphasis on sustainable building practices.',
        [
          'Energy-efficient design',
          'Floor-to-ceiling windows',
          'Home office/study',
          'Media room',
          'Smart home technology'
        ]
      ),
      createPlan(
        'plan5',
        'AD-7890',
        'Two-Car Garage with Apartment',
        'garage',
        'Traditional',
        { squareFeet: 1200, bedrooms: 1, bathrooms: 1, stories: 2, garages: 2 },
        { width: 30, depth: 24, totalSquareFeet: 1200 },
        495,
        'This two-car garage plan includes a complete apartment upstairs, perfect for guests, rental income, or a home office. The garage features ample space for vehicles and storage.',
        [
          'Full apartment upstairs',
          'Two-car garage',
          'Storage area',
          'Full kitchen',
          'Separate entrance'
        ]
      ),
      createPlan(
        'plan6',
        'AD-2345',
        'Craftsman Bungalow',
        'house',
        'Craftsman',
        { squareFeet: 2100, bedrooms: 4, bathrooms: 3, stories: 1.5, garages: 2 },
        { width: 60, depth: 70, totalSquareFeet: 2100 },
        1095,
        'Classic craftsman details and modern functionality combine in this charming bungalow. The thoughtful design features built-ins, window seats, and other traditional craftsman elements.',
        [
          'Classic craftsman details',
          'Built-in cabinetry',
          'Covered front porch',
          'Window seats',
          'Breakfast nook'
        ]
      )
    ];
  }
  
  async getPlanById(id: string): Promise<Plan | null> {
    const plan = this.plans.find(p => p.id === id);
    return plan || null;
  }
  
  async getPlanByNumber(planNumber: string): Promise<Plan | null> {
    const plan = this.plans.find(p => p.planNumber === planNumber);
    return plan || null;
  }
  
  async getPlanBySlug(slug: string): Promise<Plan | null> {
    const plan = this.plans.find(p => p.slug === slug);
    return plan || null;
  }
  
  async searchPlans(filter: PlanFilter): Promise<PlanSearchResult> {
    let filteredPlans = [...this.plans];
    
    // Apply filters
    if (filter.category) {
      filteredPlans = filteredPlans.filter(p => p.category === filter.category);
    }
    
    if (filter.style) {
      filteredPlans = filteredPlans.filter(p => p.style.toLowerCase() === filter.style.toLowerCase());
    }
    
    if (filter.squareFeetMin) {
      filteredPlans = filteredPlans.filter(p => p.details.squareFeet >= (filter.squareFeetMin || 0));
    }
    
    if (filter.squareFeetMax) {
      filteredPlans = filteredPlans.filter(p => p.details.squareFeet <= (filter.squareFeetMax || Infinity));
    }
    
    if (filter.bedroomsMin) {
      filteredPlans = filteredPlans.filter(p => p.details.bedrooms >= (filter.bedroomsMin || 0));
    }
    
    if (filter.bathroomsMin) {
      filteredPlans = filteredPlans.filter(p => p.details.bathrooms >= (filter.bathroomsMin || 0));
    }
    
    if (filter.stories && filter.stories.length > 0) {
      filteredPlans = filteredPlans.filter(p => filter.stories?.includes(p.details.stories));
    }
    
    if (filter.garages && filter.garages.length > 0) {
      filteredPlans = filteredPlans.filter(p => filter.garages?.includes(p.details.garages));
    }
    
    if (filter.hasBasement) {
      filteredPlans = filteredPlans.filter(p => p.details.hasBasement === true);
    }
    
    if (filter.keywords) {
      const keywords = filter.keywords.toLowerCase();
      filteredPlans = filteredPlans.filter(p => 
        p.name.toLowerCase().includes(keywords) || 
        p.description.toLowerCase().includes(keywords) ||
        p.features.some(f => f.toLowerCase().includes(keywords))
      );
    }
    
    // Handle sorting
    if (filter.sortBy) {
      switch (filter.sortBy) {
        case 'newest':
          filteredPlans.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
          break;
        case 'price_low_high':
          filteredPlans.sort((a, b) => a.pricing.basePrice - b.pricing.basePrice);
          break;
        case 'price_high_low':
          filteredPlans.sort((a, b) => b.pricing.basePrice - a.pricing.basePrice);
          break;
        case 'square_feet_low_high':
          filteredPlans.sort((a, b) => a.details.squareFeet - b.details.squareFeet);
          break;
        case 'square_feet_high_low':
          filteredPlans.sort((a, b) => b.details.squareFeet - a.details.squareFeet);
          break;
        case 'popular':
        default:
          // For now, just keep the original order
          break;
      }
    }
    
    // Handle pagination
    const page = filter.page || 1;
    const limit = filter.limit || 10;
    const start = (page - 1) * limit;
    const end = start + limit;
    
    // Get paginated results
    const paginatedPlans = filteredPlans.slice(start, end);
    
    // Map to search results format
    const items = paginatedPlans.map(plan => ({
      id: plan.id,
      planNumber: plan.planNumber,
      name: plan.name,
      slug: plan.slug,
      category: plan.category,
      style: plan.style,
      squareFeet: plan.details.squareFeet,
      bedrooms: plan.details.bedrooms,
      bathrooms: plan.details.bathrooms,
      stories: plan.details.stories,
      garages: plan.details.garages,
      price: plan.pricing.basePrice,
      imageUrl: plan.images.find(img => img.isPrimary)?.url || plan.images[0]?.url || ''
    }));
    
    return {
      items,
      total: filteredPlans.length,
      page,
      limit,
      totalPages: Math.ceil(filteredPlans.length / limit)
    };
  }
  
  async getFeaturedPlans(category?: PlanCategory, limit: number = 6): Promise<Plan[]> {
    let filteredPlans = [...this.plans];
    
    if (category) {
      filteredPlans = filteredPlans.filter(p => p.category === category);
    }
    
    // For mock data, just return the first N plans as "featured"
    return filteredPlans.slice(0, limit);
  }
  
  async getRelatedPlans(planId: string, limit: number = 4): Promise<Plan[]> {
    const plan = await this.getPlanById(planId);
    if (!plan) {
      return [];
    }
    
    // Find plans with the same style or category
    const relatedPlans = this.plans.filter(p => 
      p.id !== planId && (p.style === plan.style || p.category === plan.category)
    );
    
    return relatedPlans.slice(0, limit);
  }
  
  async getPopularPlans(category?: PlanCategory, limit: number = 8): Promise<Plan[]> {
    let filteredPlans = [...this.plans];
    
    if (category) {
      filteredPlans = filteredPlans.filter(p => p.category === category);
    }
    
    // For mock data, just return plans in a different order
    return filteredPlans
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, limit);
  }
  
  async getPlansByStyle(style: string, limit: number = 10, offset: number = 0): Promise<PlanSearchResult> {
    const filteredPlans = this.plans.filter(p => 
      p.style.toLowerCase() === style.toLowerCase()
    );
    
    const paginatedPlans = filteredPlans.slice(offset, offset + limit);
    
    const items = paginatedPlans.map(plan => ({
      id: plan.id,
      planNumber: plan.planNumber,
      name: plan.name,
      slug: plan.slug,
      category: plan.category,
      style: plan.style,
      squareFeet: plan.details.squareFeet,
      bedrooms: plan.details.bedrooms,
      bathrooms: plan.details.bathrooms,
      stories: plan.details.stories,
      garages: plan.details.garages,
      price: plan.pricing.basePrice,
      imageUrl: plan.images.find(img => img.isPrimary)?.url || plan.images[0]?.url || ''
    }));
    
    return {
      items,
      total: filteredPlans.length,
      page: Math.floor(offset / limit) + 1,
      limit,
      totalPages: Math.ceil(filteredPlans.length / limit)
    };
  }
  
  async getPlansByCategory(category: PlanCategory, limit: number = 10, offset: number = 0): Promise<PlanSearchResult> {
    const filteredPlans = this.plans.filter(p => p.category === category);
    
    const paginatedPlans = filteredPlans.slice(offset, offset + limit);
    
    const items = paginatedPlans.map(plan => ({
      id: plan.id,
      planNumber: plan.planNumber,
      name: plan.name,
      slug: plan.slug,
      category: plan.category,
      style: plan.style,
      squareFeet: plan.details.squareFeet,
      bedrooms: plan.details.bedrooms,
      bathrooms: plan.details.bathrooms,
      stories: plan.details.stories,
      garages: plan.details.garages,
      price: plan.pricing.basePrice,
      imageUrl: plan.images.find(img => img.isPrimary)?.url || plan.images[0]?.url || ''
    }));
    
    return {
      items,
      total: filteredPlans.length,
      page: Math.floor(offset / limit) + 1,
      limit,
      totalPages: Math.ceil(filteredPlans.length / limit)
    };
  }
  
  async getNewPlans(limit: number = 8): Promise<Plan[]> {
    // For mock data, sort by "creation date" (which is just the order in our array)
    return [...this.plans]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
}