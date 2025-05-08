import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Parse the request URL
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '12', 10);
  
  // Generate mock popular plans with reliable images
  const plans = [];
  
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
      images: [
        {
          id: `img-${i}`,
          // Use Picsum for reliable images
          url: `https://picsum.photos/seed/${id}/800/600`,
          alt: `Modern Farmhouse Plan ${i}`,
          isPrimary: true,
          type: 'exterior'
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
      pricing: {
        basePrice: 695 + (i * 50),
        pdfPrice: 695 + (i * 50),
        cadPrice: 1195 + (i * 100),
        packages: []
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  return NextResponse.json(plans);
}