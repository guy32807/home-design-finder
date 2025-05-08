import { ICollectionRepository, IPlanRepository } from '@/core/domain/interfaces';
import { Collection, PopulatedCollection } from '@/core/domain/entities';

/**
 * Mock implementation of Collection Repository for development
 */
export class MockCollectionRepository implements ICollectionRepository {
  private collections: Collection[] = [];
  private planRepository: IPlanRepository;
  
  constructor(planRepository: IPlanRepository) {
    this.planRepository = planRepository;
    
    // Initialize with sample data
    this.initializeSampleData();
  }
  
  private initializeSampleData(): void {
    this.collections = [
      {
        id: 'collection1',
        name: 'Best Selling Plans',
        slug: 'best-selling-plans',
        description: 'Our most popular house plans that customers love.',
        image: 'https://placehold.co/800x600/e8e8e8/333333?text=Best+Selling+Plans',
        planIds: ['plan1', 'plan3', 'plan4', 'plan6'],
        featuredPlanIds: ['plan1', 'plan4'],
        sortOrder: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'collection2',
        name: 'Farmhouse Collection',
        slug: 'farmhouse-collection',
        description: 'Beautiful farmhouse designs combining traditional charm with modern amenities.',
        image: 'https://placehold.co/800x600/e8e8e8/333333?text=Farmhouse+Collection',
        planIds: ['plan1', 'plan6'],
        featuredPlanIds: ['plan1'],
        sortOrder: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'collection3',
        name: 'Small Home Designs',
        slug: 'small-home-designs',
        description: 'Efficient and stylish homes under 2000 square feet.',
        image: 'https://placehold.co/800x600/e8e8e8/333333?text=Small+Home+Designs',
        planIds: ['plan2', 'plan6'],
        featuredPlanIds: ['plan2'],
        sortOrder: 3,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'collection4',
        name: 'Garage Plans',
        slug: 'garage-plans',
        description: 'Functional garage plans with and without living spaces.',
        image: 'https://placehold.co/800x600/e8e8e8/333333?text=Garage+Plans',
        planIds: ['plan5'],
        featuredPlanIds: ['plan5'],
        sortOrder: 4,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }
  
  async getCollectionById(id: string): Promise<Collection | null> {
    const collection = this.collections.find(c => c.id === id);
    return collection || null;
  }
  
  async getCollectionBySlug(slug: string): Promise<Collection | null> {
    const collection = this.collections.find(c => c.slug === slug);
    return collection || null;
  }
  
  async getAllCollections(limit?: number, offset?: number): Promise<Collection[]> {
    const start = offset || 0;
    const end = limit ? start + limit : undefined;
    
    return this.collections
      .filter(c => c.isActive)
      .sort((a, b) => (a.sortOrder || 999) - (b.sortOrder || 999))
      .slice(start, end);
  }
  
  async getPopulatedCollection(id: string): Promise<PopulatedCollection | null> {
    const collection = await this.getCollectionById(id);
    if (!collection) {
      return null;
    }
    
    return this.populateCollection(collection);
  }
  
  async getPopulatedCollectionBySlug(slug: string): Promise<PopulatedCollection | null> {
    const collection = await this.getCollectionBySlug(slug);
    if (!collection) {
      return null;
    }
    
    return this.populateCollection(collection);
  }
  
  async getFeaturedCollections(limit?: number): Promise<Collection[]> {
    // For simplicity, return all active collections sorted by order
    return this.collections
      .filter(c => c.isActive)
      .sort((a, b) => (a.sortOrder || 999) - (b.sortOrder || 999))
      .slice(0, limit);
  }
  
  private async populateCollection(collection: Collection): Promise<PopulatedCollection> {
    // Get all the plans for this collection
    const planPromises = collection.planIds.map(
      id => this.planRepository.getPlanById(id)
    );
    const plans = await Promise.all(planPromises);
    
    // Get featured plans if any
    let featuredPlans = undefined;
    if (collection.featuredPlanIds && collection.featuredPlanIds.length > 0) {
      const featuredPlanPromises = collection.featuredPlanIds.map(
        id => this.planRepository.getPlanById(id)
      );
      const featuredPlanResults = await Promise.all(featuredPlanPromises);
      featuredPlans = featuredPlanResults.filter(p => p !== null);
    }
    
    return {
      ...collection,
      plans: plans.filter(p => p !== null),
      featuredPlans: featuredPlans as any
    } as PopulatedCollection;
  }
}