import { IBlogRepository } from '@/core/domain/interfaces';
import { BlogPost, BlogCategory, Author } from '@/core/domain/entities';

/**
 * Mock implementation of Blog Repository for development
 */
export class MockBlogRepository implements IBlogRepository {
  private posts: BlogPost[] = [];
  private categories: BlogCategory[] = [];
  private authors: Author[] = [];
  
  constructor() {
    // Initialize with sample data
    this.initializeSampleData();
  }
  
  private initializeSampleData(): void {
    // Create sample authors
    this.authors = [
      {
        id: 'author1',
        name: 'Jane Architect',
        bio: 'Jane is a licensed architect with over 15 years of experience in residential design.',
        avatar: 'https://placehold.co/200x200/e8e8e8/333333?text=Jane+Architect',
        role: 'Senior Architect'
      },
      {
        id: 'author2',
        name: 'Mark Builder',
        bio: 'Mark has been in the construction industry for 20 years and specializes in custom home building.',
        avatar: 'https://placehold.co/200x200/e8e8e8/333333?text=Mark+Builder',
        role: 'Construction Expert'
      }
    ];
    
    // Create sample categories
    this.categories = [
      {
        id: 'category1',
        name: 'Home Design',
        slug: 'home-design',
        description: 'Tips and trends for home design and architecture.'
      },
      {
        id: 'category2',
        name: 'Building Tips',
        slug: 'building-tips',
        description: 'Practical advice for the home building process.'
      },
      {
        id: 'category3',
        name: 'Interior Decor',
        slug: 'interior-decor',
        description: 'Ideas and inspiration for decorating your home.'
      }
    ];
    
    // Create sample posts
    this.posts = [
      {
        id: 'post1',
        title: '10 Features to Consider in Your Farmhouse Plan',
        slug: 'farmhouse-plan-features',
        excerpt: 'Explore the essential elements that make a farmhouse design functional and beautiful.',
        content: `
# 10 Features to Consider in Your Farmhouse Plan

Farmhouse style homes have surged in popularity, combining rustic charm with modern functionality. If you're considering building a farmhouse, here are ten features that will enhance both the aesthetic appeal and livability of your home.

## 1. Wrap-Around Porch

A quintessential feature of farmhouse design, a wrap-around porch creates a welcoming entrance and provides additional outdoor living space. It's perfect for rocking chairs, porch swings, and enjoying your surroundings in any weather.

## 2. Open Concept Layout

Modern farmhouses typically feature open floor plans that connect the kitchen, dining, and living areas. This layout facilitates family togetherness and makes entertaining easy.

## 3. Apron-Front Sink

Also known as a farmhouse sink, this deep, wide sink is both functional and a design focal point. Originally designed to accommodate large pots and pans, it remains practical for today's cooking needs.

## 4. Exposed Beams

Exposed ceiling beams add architectural interest and authentic rustic character. Whether real wood or faux beams, they create visual warmth and dimension.

## 5. Board and Batten Siding

This distinctive exterior siding alternates wide boards with narrow wooden strips (battens), creating a textured, vertical pattern that's characteristic of farmhouse architecture.

## 6. Mudroom

A practical necessity, a well-designed mudroom provides storage for coats, boots, and outdoor gear while preventing dirt from being tracked through the house.

## 7. Walk-In Pantry

Ample storage is essential in a farmhouse kitchen. A walk-in pantry provides space for food storage, small appliances, and kitchen overflow.

## 8. Sliding Barn Doors

Functional and decorative, interior sliding barn doors save space and add authentic farmhouse character. They're perfect for pantries, laundry rooms, or en-suite bathrooms.

## 9. Natural Materials

Incorporating natural materials like wood floors, stone accents, and metal fixtures creates an authentic farmhouse feel that connects to the style's rural roots.

## 10. Multi-Purpose Rooms

Flexible spaces that can adapt to changing family needs—like a home office that converts to a guest room or a bonus room above the garage—maximize your home's functionality.

When selecting a farmhouse plan, consider which of these features matter most to you and look for designs that incorporate them. The ideal farmhouse blends rustic charm with the practical amenities modern families need.
        `,
        author: this.authors[0],
        category: this.categories[0],
        tags: ['farmhouse', 'home design', 'architecture', 'floor plans'],
        featuredImage: 'https://placehold.co/1200x630/e8e8e8/333333?text=Farmhouse+Features',
        gallery: [
          'https://placehold.co/800x600/e8e8e8/333333?text=Farmhouse+Porch',
          'https://placehold.co/800x600/e8e8e8/333333?text=Farmhouse+Kitchen',
          'https://placehold.co/800x600/e8e8e8/333333?text=Farmhouse+Interior'
        ],
        relatedPlanIds: ['plan1', 'plan6'],
        publishDate: new Date('2023-09-15'),
        status: 'published',
        seo: {
          title: '10 Essential Farmhouse Plan Features | Home Design Finder',
          description: 'Discover the 10 must-have features to include in your farmhouse plan for the perfect blend of rustic charm and modern functionality.',
          keywords: ['farmhouse plan', 'home design', 'rustic features', 'modern farmhouse']
        }
      },
      {
        id: 'post2',
        title: 'Building Your Home: 5 Common Mistakes to Avoid',
        slug: 'home-building-mistakes',
        excerpt: 'Learn about the most common pitfalls in the home building process and how to avoid them.',
        content: `
# Building Your Home: 5 Common Mistakes to Avoid

Building a custom home is an exciting journey, but it can also be fraught with challenges. By being aware of common mistakes, you can navigate the process more smoothly and avoid costly errors. Here are five pitfalls to watch out for when building your dream home.

## 1. Inadequate Budgeting

One of the most common mistakes is underestimating the total cost of building. Beyond the base construction costs, remember to budget for:

- Site preparation and landscaping
- Permits and fees
- Interior finishes and upgrades
- Appliances and fixtures
- Unexpected challenges and changes

**Solution**: Add a 10-15% contingency fund to your initial budget and get detailed quotes from multiple builders.

## 2. Choosing the Wrong Builder

Your builder can make or break your home building experience. A poor choice may result in quality issues, delays, or even legal disputes.

**Solution**: Research thoroughly, check references, verify licenses and insurance, and interview multiple candidates. Don't make your decision based solely on price.

## 3. Overlooking the Importance of the Floor Plan

A floor plan that doesn't align with your lifestyle can lead to daily frustration once you move in.

**Solution**: Consider your daily routines, future needs, furniture placement, and traffic flow when reviewing floor plans. Visualize yourself living in the space before finalizing the design.

## 4. Neglecting Energy Efficiency

Energy-efficient features may increase upfront costs but save money in the long run through reduced utility bills.

**Solution**: Invest in good insulation, energy-efficient windows, and high-efficiency HVAC systems. Consider the long-term value of sustainable building practices.

## 5. Making Too Many Changes During Construction

Change orders during the building process can significantly increase costs and cause delays.

**Solution**: Take time during the planning phase to finalize as many details as possible. Create a detailed specification sheet and stick to it unless absolutely necessary.

Building a home is likely one of the largest investments you'll make. By avoiding these common mistakes, you can ensure the process goes more smoothly and results in a home that meets your expectations both functionally and financially.
        `,
        author: this.authors[1],
        category: this.categories[1],
        tags: ['home building', 'construction tips', 'building mistakes', 'custom homes'],
        featuredImage: 'https://placehold.co/1200x630/e8e8e8/333333?text=Home+Building+Tips',
        publishDate: new Date('2023-10-05'),
        status: 'published',
        seo: {
          title: '5 Common Home Building Mistakes and How to Avoid Them',
          description: 'Learn how to navigate the home building process successfully by avoiding these 5 common and costly mistakes.'
        }
      },
      {
        id: 'post3',
        title: 'Small Space Design: Making the Most of Your Square Footage',
        slug: 'small-space-design-tips',
        excerpt: 'Clever design strategies to maximize functionality and style in smaller homes.',
        content: `
# Small Space Design: Making the Most of Your Square Footage

Smaller homes offer numerous advantages, from lower maintenance costs to reduced environmental impact. The challenge lies in creating spaces that feel open, functional, and personalized within limited square footage. Here are proven strategies to maximize both functionality and style in your small home.

## Embrace Multifunctional Furniture

When space is at a premium, each piece of furniture should earn its keep by serving multiple purposes:

- Sofa beds or Murphy beds for guest accommodations
- Ottoman storage that doubles as seating
- Expandable dining tables that can be compact for daily use
- Nesting tables that can be separated when needed

## Utilize Vertical Space

Thinking vertically can dramatically increase your storage capacity:

- Floor-to-ceiling bookshelves
- Hanging pot racks in kitchens
- Wall-mounted desks and shelving
- Over-door organizers
- High cabinets for seasonal items

## Create Visual Openness

Design choices can make small spaces feel larger:

- Light, neutral color schemes with strategic pops of color
- Mirrors to reflect light and create the illusion of depth
- Glass or lucite furniture that doesn't visually block space
- Consistent flooring throughout to create flow
- Strategic lighting to eliminate dark corners

## Customize Built-Ins

Custom storage solutions maximize every inch:

- Under-stair storage drawers or shelving
- Window seats with storage beneath
- Built-in banquettes for dining areas
- Custom closet systems that utilize the full height and depth

## Eliminate Excess

Small spaces require disciplined editing:

- Implement a "one in, one out" policy for new purchases
- Choose quality over quantity in furnishings
- Digitize papers, photos, and media when possible
- Select decorative items thoughtfully and sparingly

## Open Up Floor Plans Where Possible

Removing non-structural walls can transform small, chopped-up spaces:

- Consider replacing walls with islands or peninsulas
- Use half-walls or glass partitions where privacy is needed
- Create distinct areas through furniture arrangement rather than walls

Small homes don't have to feel cramped or limiting. With thoughtful design and strategic organization, they can be just as comfortable and functional as larger spaces—while offering the benefits of lower costs and easier maintenance.
        `,
        author: this.authors[0],
        category: this.categories[2],
        tags: ['small homes', 'space saving', 'interior design', 'storage solutions'],
        featuredImage: 'https://placehold.co/1200x630/e8e8e8/333333?text=Small+Space+Design',
        relatedPlanIds: ['plan2'],
        publishDate: new Date('2023-10-20'),
        status: 'published'
      }
    ];
  }
  
  async getBlogPostById(id: string): Promise<BlogPost | null> {
    const post = this.posts.find(p => p.id === id);
    return post || null;
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const post = this.posts.find(p => p.slug === slug);
    return post || null;
  }
  
  async getAllPublishedPosts(limit?: number, offset?: number): Promise<{
    posts: BlogPost[];
    total: number;
  }> {
    const publishedPosts = this.posts.filter(p => p.status === 'published')
      .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
    
    const start = offset || 0;
    const end = limit ? start + limit : undefined;
    const paginatedPosts = publishedPosts.slice(start, end);
    
    return {
      posts: paginatedPosts,
      total: publishedPosts.length
    };
  }
  
  async getPostsByCategory(categorySlug: string, limit?: number, offset?: number): Promise<{
    posts: BlogPost[];
    total: number;
    category: BlogCategory;
  }> {
    const category = this.categories.find(c => c.slug === categorySlug);
    if (!category) {
      throw new Error(`Category with slug "${categorySlug}" not found`);
    }
    
    const categoryPosts = this.posts
      .filter(p => p.status === 'published' && p.category.id === category.id)
      .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
    
    const start = offset || 0;
    const end = limit ? start + limit : undefined;
    const paginatedPosts = categoryPosts.slice(start, end);
    
    return {
      posts: paginatedPosts,
      total: categoryPosts.length,
      category
    };
  }
  
  async getPostsByTag(tag: string, limit?: number, offset?: number): Promise<{
    posts: BlogPost[];
    total: number;
  }> {
    const normalizedTag = tag.toLowerCase();
    const taggedPosts = this.posts
      .filter(p => 
        p.status === 'published' && 
        p.tags.some(t => t.toLowerCase() === normalizedTag)
      )
      .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
    
    const start = offset || 0;
    const end = limit ? start + limit : undefined;
    const paginatedPosts = taggedPosts.slice(start, end);
    
    return {
      posts: paginatedPosts,
      total: taggedPosts.length
    };
  }
  
  async getRelatedPosts(postId: string, limit?: number): Promise<BlogPost[]> {
    const post = await this.getBlogPostById(postId);
    if (!post) {
      return [];
    }
    
    // Find posts with the same category or shared tags
    const relatedPosts = this.posts
      .filter(p => 
        p.id !== postId && 
        p.status === 'published' &&
        (
          p.category.id === post.category.id ||
          p.tags.some(tag => post.tags.includes(tag))
        )
      )
      .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
    
    return relatedPosts.slice(0, limit || 3);
  }
  
  async getAllCategories(): Promise<BlogCategory[]> {
    return [...this.categories];
  }
  
  async getCategoryBySlug(slug: string): Promise<BlogCategory | null> {
    const category = this.categories.find(c => c.slug === slug);
    return category || null;
  }
  
  async getFeaturedPosts(limit?: number): Promise<BlogPost[]> {
    // For mock data, just return the most recent published posts
    const featuredPosts = this.posts
      .filter(p => p.status === 'published')
      .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
    
    return featuredPosts.slice(0, limit || 4);
  }
}