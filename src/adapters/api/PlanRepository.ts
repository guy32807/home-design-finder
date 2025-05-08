import { Plan, PlanFilter, PlanImage, PlanSearchResult } from '../../core/domain/entities';
import { IPlanRepository } from '../../core/domain/interfaces/IPlanRepository';
import { getPopularPlans as fetchPopularPlans } from '../../lib/plans';

// Sample plans data
const samplePlans: Plan[] = [
  {
    id: '1001',
    name: 'The Oakwood',
    description: 'Charming farmhouse plan with open concept living',
    style: 'Modern Farmhouse',
    images: {
      thumbnail: 'https://picsum.photos/seed/plan1/300/200',
      main: 'https://picsum.photos/seed/plan1/800/600',
      floorPlan: 'https://picsum.photos/seed/floorplan1/800/600',
      gallery: [
        'https://picsum.photos/seed/p1g1/800/600',
        'https://picsum.photos/seed/p1g2/800/600',
        'https://picsum.photos/seed/p1g3/800/600'
      ]
    },
    details: {
      bedrooms: 4,
      bathrooms: 2.5,
      stories: 2,
      garageSize: 2,
      squareFeet: 2500
    },
    features: ['Open Floor Plan', 'Master on Main', 'Farmhouse Sink', 'Covered Porch'],
    pricing: {
      basePrice: 1200,
      pdfPrice: 1000,
      cadPrice: 1800,
      fiveSetPrice: 1500
    },
    popularity: 95
  },
  {
    id: '1002',
    name: 'Craftsman Corner',
    description: 'Traditional craftsman with detailed woodwork and cozy interior',
    style: 'Craftsman',
    images: {
      thumbnail: 'https://picsum.photos/seed/plan2/300/200',
      main: 'https://picsum.photos/seed/plan2/800/600',
      floorPlan: 'https://picsum.photos/seed/floorplan2/800/600',
      gallery: [
        'https://picsum.photos/seed/p2g1/800/600',
        'https://picsum.photos/seed/p2g2/800/600',
        'https://picsum.photos/seed/p2g3/800/600'
      ]
    },
    details: {
      bedrooms: 3,
      bathrooms: 2,
      stories: 1,
      garageSize: 2,
      squareFeet: 1800
    },
    features: ['Built-in Bookcases', 'Covered Front Porch', 'Stone Fireplace'],
    pricing: {
      basePrice: 950,
      pdfPrice: 800,
      cadPrice: 1600,
      fiveSetPrice: 1200
    },
    popularity: 85
  },
  {
    id: '1003',
    name: 'Rancho Relaxo',
    description: 'Single-level ranch with flowing indoor-outdoor spaces',
    style: 'Ranch',
    images: {
      thumbnail: 'https://picsum.photos/seed/plan3/300/200',
      main: 'https://picsum.photos/seed/plan3/800/600',
      floorPlan: 'https://picsum.photos/seed/floorplan3/800/600',
      gallery: [
        'https://picsum.photos/seed/p3g1/800/600',
        'https://picsum.photos/seed/p3g2/800/600',
        'https://picsum.photos/seed/p3g3/800/600'
      ]
    },
    details: {
      bedrooms: 3,
      bathrooms: 2,
      stories: 1,
      garageSize: 2,
      squareFeet: 1600
    },
    features: ['Open Floor Plan', 'Patio', 'Sliding Glass Doors'],
    pricing: {
      basePrice: 900,
      pdfPrice: 750,
      cadPrice: 1500,
      fiveSetPrice: 1100
    },
    popularity: 80
  },
  {
    id: '1004',
    name: 'Modern Marvel',
    description: 'Contemporary design with clean lines and energy efficiency',
    style: 'Contemporary',
    images: {
      thumbnail: 'https://picsum.photos/seed/plan4/300/200',
      main: 'https://picsum.photos/seed/plan4/800/600',
      floorPlan: 'https://picsum.photos/seed/floorplan4/800/600',
      gallery: [
        'https://picsum.photos/seed/p4g1/800/600',
        'https://picsum.photos/seed/p4g2/800/600',
        'https://picsum.photos/seed/p4g3/800/600'
      ]
    },
    details: {
      bedrooms: 4,
      bathrooms: 3.5,
      stories: 2,
      garageSize: 2,
      squareFeet: 2800
    },
    features: ['Floor-to-Ceiling Windows', 'Smart Home System', 'Energy Star Rated'],
    pricing: {
      basePrice: 1500,
      pdfPrice: 1200,
      cadPrice: 2000,
      fiveSetPrice: 1800
    },
    popularity: 90
  },
  {
    id: '1005',
    name: 'Classic Colonial',
    description: 'Traditional two-story home with formal and casual spaces',
    style: 'Traditional',
    images: {
      thumbnail: 'https://picsum.photos/seed/plan5/300/200',
      main: 'https://picsum.photos/seed/plan5/800/600',
      floorPlan: 'https://picsum.photos/seed/floorplan5/800/600',
      gallery: [
        'https://picsum.photos/seed/p5g1/800/600',
        'https://picsum.photos/seed/p5g2/800/600',
        'https://picsum.photos/seed/p5g3/800/600'
      ]
    },
    details: {
      bedrooms: 4,
      bathrooms: 2.5,
      stories: 2,
      garageSize: 2,
      squareFeet: 2600
    },
    features: ['Formal Dining Room', 'Study/Office', 'Center Hall'],
    pricing: {
      basePrice: 1100,
      pdfPrice: 900,
      cadPrice: 1700,
      fiveSetPrice: 1300
    },
    popularity: 75
  },
  {
    id: '1006',
    name: 'Cozy Cottage',
    description: 'Charming cottage with storybook details and efficient layout',
    style: 'Cottage',
    images: {
      thumbnail: 'https://picsum.photos/seed/plan6/300/200',
      main: 'https://picsum.photos/seed/plan6/800/600',
      floorPlan: 'https://picsum.photos/seed/floorplan6/800/600',
      gallery: [
        'https://picsum.photos/seed/p6g1/800/600',
        'https://picsum.photos/seed/p6g2/800/600',
        'https://picsum.photos/seed/p6g3/800/600'
      ]
    },
    details: {
      bedrooms: 2,
      bathrooms: 2,
      stories: 1.5,
      garageSize: 1,
      squareFeet: 1200
    },
    features: ['Window Seat', 'Built-in Bookshelves', 'Picket Fence'],
    pricing: {
      basePrice: 800,
      pdfPrice: 650,
      cadPrice: 1400,
      fiveSetPrice: 1000
    },
    popularity: 70
  },
  {
    id: '1007',
    name: 'Mediterranean Villa',
    description: 'Luxury Mediterranean with courtyard and indoor-outdoor flow',
    style: 'Mediterranean',
    images: {
      thumbnail: 'https://picsum.photos/seed/plan7/300/200',
      main: 'https://picsum.photos/seed/plan7/800/600',
      floorPlan: 'https://picsum.photos/seed/floorplan7/800/600',
      gallery: [
        'https://picsum.photos/seed/p7g1/800/600',
        'https://picsum.photos/seed/p7g2/800/600',
        'https://picsum.photos/seed/p7g3/800/600'
      ]
    },
    details: {
      bedrooms: 4,
      bathrooms: 3.5,
      stories: 1,
      garageSize: 3,
      squareFeet: 3000
    },
    features: ['Courtyard', 'Arched Doorways', 'Stucco Exterior', 'Tile Roof'],
    pricing: {
      basePrice: 1600,
      pdfPrice: 1300,
      cadPrice: 2200,
      fiveSetPrice: 1900
    },
    popularity: 65
  },
  {
    id: '1008',
    name: 'Cape Cod Classic',
    description: 'Traditional New England style with efficient use of space',
    style: 'Cape Cod',
    images: {
      thumbnail: 'https://picsum.photos/seed/plan8/300/200',
      main: 'https://picsum.photos/seed/plan8/800/600',
      floorPlan: 'https://picsum.photos/seed/floorplan8/800/600',
      gallery: [
        'https://picsum.photos/seed/p8g1/800/600',
        'https://picsum.photos/seed/p8g2/800/600',
        'https://picsum.photos/seed/p8g3/800/600'
      ]
    },
    details: {
      bedrooms: 3,
      bathrooms: 2,
      stories: 1.5,
      garageSize: 1,
      squareFeet: 1700
    },
    features: ['Dormers', 'Central Chimney', 'Shutters'],
    pricing: {
      basePrice: 950,
      pdfPrice: 800,
      cadPrice: 1600,
      fiveSetPrice: 1200
    },
    popularity: 60
  }
];

// Generate more plans by cloning and modifying the sample plans
const generatePlans = (count: number): Plan[] => {
  const plans: Plan[] = [...samplePlans];
  
  while (plans.length < count) {
    const sourcePlan = samplePlans[Math.floor(Math.random() * samplePlans.length)];
    const newId = (1000 + plans.length + 1).toString();
    
    const newPlan: Plan = {
      ...JSON.parse(JSON.stringify(sourcePlan)), // Deep clone
      id: newId,
      name: `${sourcePlan.name} ${plans.length % 5 === 0 ? 'Plus' : plans.length % 3 === 0 ? 'Deluxe' : 'Custom'}`,
      images: {
        ...sourcePlan.images,
        thumbnail: `https://picsum.photos/seed/plan${newId}/300/200`,
        main: `https://picsum.photos/seed/plan${newId}/800/600`,
      },
      details: {
        ...sourcePlan.details,
        squareFeet: sourcePlan.details.squareFeet + (Math.floor(Math.random() * 10) - 5) * 100,
        bedrooms: Math.max(1, sourcePlan.details.bedrooms + (Math.floor(Math.random() * 3) - 1)),
      },
      pricing: {
        ...sourcePlan.pricing,
        basePrice: sourcePlan.pricing.basePrice + (Math.floor(Math.random() * 10) - 5) * 50,
      },
      popularity: Math.max(1, Math.min(100, sourcePlan.popularity + (Math.floor(Math.random() * 20) - 10))),
    };
    
    plans.push(newPlan);
  }
  
  return plans;
};

export class PlanRepository implements IPlanRepository {
  private allPlans: Plan[] = generatePlans(50);
  private apiBaseUrl: string;
  
  constructor(apiBaseUrl: string = '/api') {
    this.apiBaseUrl = apiBaseUrl;
    console.log('PlanRepository initialized with baseUrl:', apiBaseUrl);
  }

  async getPlanById(id: string): Promise<Plan | null> {
    return this.allPlans.find(plan => plan.id === id) || null;
  }

  async getPlanBySlug(slug: string): Promise<Plan | null> {
    console.log(`Fetching plan by slug: ${slug}`);
    
    // For development/demo purposes, return mock data
    // In production, you would fetch from your API
    const mockPlan = this.getMockPlanBySlug(slug);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return mockPlan;
  }

  private getMockPlanBySlug(slug: string): Plan | null {
    // Find a mock plan matching the slug
    return {
      id: '12345',
      planNumber: 'AD-' + slug.slice(0, 5).toUpperCase(),
      name: 'Beautiful ' + slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') + ' Plan',
      slug: slug,
      description: 'This beautiful house plan features modern amenities and spacious rooms, perfect for family living. The open concept design promotes togetherness while providing separate spaces for privacy when needed.',
      features: [
        'Open concept floor plan',
        'Large master suite',
        'Walk-in pantry',
        'Covered porch',
        'Bonus room',
        'Spacious kitchen with island',
        'Home office'
      ],
      style: 'Modern Farmhouse',
      category: 'Single Family',
      tags: ['farmhouse', 'modern', 'open concept'],
      images: [
        {
          id: 'img1',
          url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070',
          alt: 'Front elevation',
          isPrimary: true,
          type: 'exterior'
        },
        {
          id: 'img2',
          url: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=2065',
          alt: 'Kitchen view',
          isPrimary: false,
          type: 'interior'
        },
        {
          id: 'img3',
          url: 'https://images.unsplash.com/photo-1560440021-33f9b867899d?q=80&w=2065',
          alt: 'Living room',
          isPrimary: false,
          type: 'interior'
        }
      ],
      details: {
        squareFeet: 2450,
        bedrooms: 4,
        bathrooms: 2.5,
        stories: 2,
        garages: 2,
        hasBasement: false,
        foundation: 'Slab'
      },
      dimensions: {
        width: 54,
        depth: 60,
        firstFloorSquareFeet: 1600,
        secondFloorSquareFeet: 850,
        basementSquareFeet: 0,
        garageSquareFeet: 450
      },
      pricing: {
        basePrice: 795,
        pdfPrice: 795,
        cadPrice: 1295,
        packages: [
          {
            name: 'PDF Set',
            price: 795,
            description: 'PDF files for construction'
          },
          {
            name: 'CAD Set',
            price: 1295,
            description: 'CAD files for customization'
          },
          {
            name: 'Complete Set',
            price: 1495,
            description: 'Both PDF and CAD files'
          }
        ]
      },
      relatedPlans: [],
      createdAt: new Date('2023-01-15'),
      updatedAt: new Date('2023-07-22')
    };
  }

  async searchPlans(filter: PlanFilter): Promise<PlanSearchResult> {
    try {
      // Build query string from filter
      const queryParams = new URLSearchParams();
      
      if (filter.keywords) queryParams.append('q', filter.keywords);
      if (filter.style) queryParams.append('style', filter.style);
      if (filter.category) queryParams.append('category', filter.category);
      if (filter.bedroomsMin !== undefined) queryParams.append('bedroomsMin', filter.bedroomsMin.toString());
      if (filter.bedroomsMax !== undefined) queryParams.append('bedroomsMax', filter.bedroomsMax.toString());
      if (filter.squareFeetMin !== undefined) queryParams.append('squareFeetMin', filter.squareFeetMin.toString());
      if (filter.squareFeetMax !== undefined) queryParams.append('squareFeetMax', filter.squareFeetMax.toString());
      if (filter.stories?.length) filter.stories.forEach(s => queryParams.append('stories', s.toString()));
      if (filter.garages?.length) filter.garages.forEach(g => queryParams.append('garages', g.toString()));
      if (filter.hasBasement !== undefined) queryParams.append('hasBasement', filter.hasBasement.toString());
      if (filter.sortBy) queryParams.append('sortBy', filter.sortBy);
      if (filter.page) queryParams.append('page', filter.page.toString());
      if (filter.limit) queryParams.append('limit', filter.limit.toString());
      
      const response = await fetch(`${this.apiBaseUrl}/plans/search?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }
      
      const data = await response.json();
      return {
        items: data.items.map(this.mapToSearchResult),
        total: data.total,
        page: data.page,
        totalPages: data.totalPages
      };
    } catch (error) {
      console.error('Error searching plans:', error);
      throw error;
    }
  }

  async getPopularPlans(limit: number = 10): Promise<Plan[]> {
    const sortedPlans = [...this.allPlans].sort((a, b) => b.popularity - a.popularity);
    return sortedPlans.slice(0, limit);
  }

  async getRecentPlans(limit: number): Promise<Plan[]> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/plans/recent?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch recent plans: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.map(this.mapToPlan);
    } catch (error) {
      console.error('Error fetching recent plans:', error);
      throw error;
    }
  }

  async getPlansByStyle(styleName: string, limit: number = 20): Promise<Plan[]> {
    const matchingPlans = this.allPlans.filter(
      plan => plan.style?.toLowerCase() === styleName.toLowerCase()
    );
    return matchingPlans.slice(0, limit);
  }

  async getPlansByBedrooms(bedroomCount: number, limit: number = 20): Promise<Plan[]> {
    const matchingPlans = this.allPlans.filter(
      plan => plan.details?.bedrooms === bedroomCount
    );
    return matchingPlans.slice(0, limit);
  }

  async searchPlansByCriteria(criteria: {
    minBeds?: number;
    maxBeds?: number;
    minBaths?: number;
    maxBaths?: number;
    minSqft?: number;
    maxSqft?: number;
    styles?: string[];
    features?: string[];
  }, limit: number = 20): Promise<Plan[]> {
    let filteredPlans = [...this.allPlans];
    
    if (criteria.minBeds !== undefined) {
      filteredPlans = filteredPlans.filter(p => (p.details?.bedrooms || 0) >= criteria.minBeds!);
    }
    
    if (criteria.maxBeds !== undefined) {
      filteredPlans = filteredPlans.filter(p => (p.details?.bedrooms || 0) <= criteria.maxBeds!);
    }
    
    if (criteria.minBaths !== undefined) {
      filteredPlans = filteredPlans.filter(p => (p.details?.bathrooms || 0) >= criteria.minBaths!);
    }
    
    if (criteria.maxBaths !== undefined) {
      filteredPlans = filteredPlans.filter(p => (p.details?.bathrooms || 0) <= criteria.maxBaths!);
    }
    
    if (criteria.minSqft !== undefined) {
      filteredPlans = filteredPlans.filter(p => (p.details?.squareFeet || 0) >= criteria.minSqft!);
    }
    
    if (criteria.maxSqft !== undefined) {
      filteredPlans = filteredPlans.filter(p => (p.details?.squareFeet || 0) <= criteria.maxSqft!);
    }
    
    if (criteria.styles && criteria.styles.length > 0) {
      filteredPlans = filteredPlans.filter(p => 
        p.style && criteria.styles!.some(s => p.style!.toLowerCase() === s.toLowerCase())
      );
    }
    
    if (criteria.features && criteria.features.length > 0) {
      filteredPlans = filteredPlans.filter(p => 
        p.features && criteria.features!.some(f => 
          p.features!.some(pf => pf.toLowerCase().includes(f.toLowerCase()))
        )
      );
    }
    
    return filteredPlans.slice(0, limit);
  }

  private mapToPlan(data: any): Plan {
    return {
      id: data.id,
      planNumber: data.planNumber,
      name: data.name,
      slug: data.slug,
      description: data.description,
      features: data.features,
      style: data.style,
      category: data.category,
      tags: data.tags,
      images: data.images.map((img: any) => this.mapToPlanImage(img)),
      details: {
        squareFeet: data.details.squareFeet,
        bedrooms: data.details.bedrooms,
        bathrooms: data.details.bathrooms,
        stories: data.details.stories,
        garages: data.details.garages,
        hasBasement: data.details.hasBasement,
        foundation: data.details.foundation
      },
      dimensions: {
        width: data.dimensions.width,
        depth: data.dimensions.depth,
        firstFloorSquareFeet: data.dimensions.firstFloorSquareFeet,
        secondFloorSquareFeet: data.dimensions.secondFloorSquareFeet,
        basementSquareFeet: data.dimensions.basementSquareFeet,
        garageSquareFeet: data.dimensions.garageSquareFeet
      },
      pricing: {
        basePrice: data.pricing.basePrice,
        pdfPrice: data.pricing.pdfPrice,
        cadPrice: data.pricing.cadPrice,
        packages: data.pricing.packages
      },
      relatedPlans: data.relatedPlans || [],
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt)
    };
  }

  private mapToPlanImage(data: any): PlanImage {
    return {
      id: data.id,
      url: data.url,
      alt: data.alt,
      isPrimary: data.isPrimary,
      type: data.type
    };
  }

  private mapToSearchResult(data: any): Plan {
    return {
      id: data.id,
      planNumber: data.planNumber,
      name: data.name,
      slug: data.slug,
      style: data.style,
      category: data.category,
      imageUrl: data.imageUrl,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      squareFeet: data.squareFeet,
      price: data.price
    } as any; // This any is needed because we're returning a subset of Plan
  }
}