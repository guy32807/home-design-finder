import { Plan } from '../core/domain/entities';

// Mock data for demonstration
const mockPlans: Plan[] = Array.from({ length: 10 }, (_, i) => {
  const id = `plan-${i + 1}`;
  const number = `AD-${10000 + i + 1}`;
  const name = `Modern Farmhouse Plan ${i + 1}`;
  const slug = `modern-farmhouse-plan-${i + 1}`;
  
  return {
    id,
    planNumber: number,
    name,
    slug,
    style: 'Modern Farmhouse',
    category: 'Single Family',
    images: [
      {
        id: `img-${i}-1`,
        url: `https://picsum.photos/seed/${id}-1/800/600`,
        alt: `${name} Exterior`,
        isPrimary: true,
        type: 'exterior'
      },
      {
        id: `img-${i}-2`,
        url: `https://picsum.photos/seed/${id}-2/800/600`,
        alt: `${name} Floor Plan`,
        isPrimary: false,
        type: 'floorplan'
      },
      {
        id: `img-${i}-3`,
        url: `https://picsum.photos/seed/${id}-3/800/600`,
        alt: `${name} Interior`,
        isPrimary: false,
        type: 'interior'
      }
    ],
    details: {
      squareFeet: 1800 + (i * 200),
      bedrooms: 3 + (i % 3),
      bathrooms: 2 + (i % 2),
      stories: 1 + (i % 2),
      garages: 2,
      hasBasement: i % 3 === 0,
      foundation: i % 2 === 0 ? 'Slab' : 'Crawl Space',
      width: 40 + (i * 2),
      depth: 60 + (i * 2),
      features: [
        'Open concept living',
        'Large kitchen island',
        'Master suite on main floor',
        'Walk-in closets',
        'Covered porch'
      ]
    },
    description: `This beautiful ${name} offers an open concept living area, perfect for entertaining. 
                 The large kitchen includes a center island and walk-in pantry. The master suite features 
                 a spa-like bathroom and walk-in closet. Additional bedrooms provide plenty of space for 
                 family or guests. A covered porch extends the living area outdoors.`,
    pricing: {
      basePrice: 695 + (i * 50),
      pdfPrice: 695 + (i * 50),
      cadPrice: 1195 + (i * 100),
      packages: []
    },
    createdAt: new Date(),
    updatedAt: new Date()
  };
});

export async function getPlanBySlug(slug: string): Promise<Plan | null> {
  // In a real app, this would query a database or API
  const plan = mockPlans.find(p => p.slug === slug);
  return plan || null;
}

export async function getPopularPlans(limit: number = 12): Promise<Plan[]> {
  // Create a set of mock plans
  const plans: Plan[] = [];
  
  for (let i = 1; i <= limit; i++) {
    const id = `plan-${i}`;
    const slug = `modern-farmhouse-plan-${i}`;
    
    plans.push({
      id,
      planNumber: `AD-${10000 + i}`,
      name: `Modern Farmhouse Plan ${i}`,
      slug,
      style: 'Modern Farmhouse',
      category: 'Single Family',
      description: `This beautiful home design offers an open concept living area, perfect for entertaining. 
                   The large kitchen includes a center island and walk-in pantry. The master suite features 
                   a spa-like bathroom and walk-in closet.`,
      features: [
        'Open concept floor plan',
        'Large master suite',
        'Walk-in pantry',
        'Covered porch',
        'Bonus room'
      ],
      images: [
        {
          id: `img-${i}-1`,
          url: `https://picsum.photos/seed/${id}-1/800/600`,
          alt: `Modern Farmhouse Plan ${i} Exterior`,
          isPrimary: true,
          type: 'exterior'
        },
        {
          id: `img-${i}-2`,
          url: `https://picsum.photos/seed/${id}-2/800/600`,
          alt: `Modern Farmhouse Plan ${i} Floor Plan`,
          isPrimary: false,
          type: 'floorplan'
        }
      ],
      details: {
        squareFeet: 1800 + (i * 200),
        bedrooms: 3 + (i % 3),
        bathrooms: 2 + (i % 2),
        stories: 1 + (i % 2),
        garages: 2,
        hasBasement: i % 3 === 0,
        foundation: i % 2 === 0 ? 'Slab' : 'Crawl Space'
      },
      dimensions: {
        width: 40 + (i * 2),
        depth: 60 + (i * 2),
        firstFloorSquareFeet: 1800,
        secondFloorSquareFeet: 600,
        basementSquareFeet: 0,
        garageSquareFeet: 400
      },
      pricing: {
        basePrice: 695 + (i * 50),
        pdfPrice: 695 + (i * 50),
        cadPrice: 1195 + (i * 100),
        packages: [
          {
            name: 'PDF Set',
            price: 695 + (i * 50),
            description: 'Complete PDF files for building'
          },
          {
            name: 'CAD Set',
            price: 1195 + (i * 100),
            description: 'Customizable CAD files'
          }
        ]
      },
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
  
  return plans;
}