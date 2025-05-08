'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const CollectionsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`;

const PageHeader = styled.div`
  margin-bottom: 3rem;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-text);
`;

const PageDescription = styled.p`
  font-size: 1.125rem;
  color: var(--color-text-light);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const CollectionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const CollectionCard = styled.div`
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  background-color: white;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
`;

const CollectionImageContainer = styled.div`
  position: relative;
  height: 240px;
  overflow: hidden;
`;

const CollectionImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
  
  ${CollectionCard}:hover & {
    transform: scale(1.05);
  }
`;

const CollectionContent = styled.div`
  padding: 1.5rem;
`;

const CollectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-text);
`;

const CollectionDescription = styled.p`
  font-size: 0.95rem;
  color: var(--color-text-light);
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const CollectionLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  font-weight: 500;
  color: var(--color-primary);
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
  
  &::after {
    content: "→";
    margin-left: 0.25rem;
    transition: transform 0.2s;
  }
  
  &:hover::after {
    transform: translateX(3px);
  }
`;

// Collection data
const collections = [
  {
    id: 'barndominium',
    title: 'Barndominium Collection',
    description: 'Modern farmhouse living with open spaces, soaring ceilings, and industrial elements. Perfect for those seeking a rustic yet contemporary lifestyle.',
    imageUrl: 'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?auto=format&fit=crop&w=800&q=80',
    planCount: 47,
    priceRange: '$500 - $1,200'
  },
  {
    id: 'craftsman',
    title: 'Craftsman Style Homes',
    description: 'Timeless designs featuring handcrafted details, natural materials, and cozy porches. The perfect blend of comfort, character, and craftsmanship.',
    imageUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
    planCount: 68,
    priceRange: '$600 - $1,500'
  },
  {
    id: 'energy-efficient',
    title: 'Energy-Efficient Designs',
    description: 'Sustainable houses that minimize environmental impact while maximizing comfort. Features include passive solar elements and high-performance insulation.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    planCount: 35,
    priceRange: '$700 - $1,800'
  },
  {
    id: 'small-house-plans',
    title: 'Small House Plans',
    description: 'Compact designs that pack maximum functionality into minimal square footage. Ideal for first-time homebuyers, empty nesters, or anyone embracing simpler living.',
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80',
    planCount: 52,
    priceRange: '$400 - $900'
  },
  {
    id: 'mid-century',
    title: 'Mid-Century Modern',
    description: 'Clean lines, large windows, and seamless indoor-outdoor living spaces define these timeless designs inspired by mid-20th century architecture.',
    imageUrl: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=800&q=80',
    planCount: 29,
    priceRange: '$800 - $1,700'
  },
  {
    id: 'open-concept',
    title: 'Open Concept Layouts',
    description: 'Flowing spaces that eliminate barriers between kitchen, dining, and living areas. Perfect for family interaction and entertaining.',
    imageUrl: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80',
    planCount: 73,
    priceRange: '$600 - $1,400'
  },
  {
    id: 'outdoor-living',
    title: 'Outdoor Living Focus',
    description: 'Designs that maximize the connection between indoor and outdoor spaces with features like covered patios, outdoor kitchens, and seamless transitions.',
    imageUrl: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&q=80',
    planCount: 44,
    priceRange: '$700 - $1,600'
  },
  {
    id: 'modern-farmhouse',
    title: 'Modern Farmhouse',
    description: 'Contemporary designs with classic farmhouse elements like gabled roofs, board and batten siding, and large front porches.',
    imageUrl: 'https://images.unsplash.com/photo-1531129568237-063854508d31?auto=format&fit=crop&w=800&q=80',
    planCount: 58,
    priceRange: '$650 - $1,500'
  },
  {
    id: 'ranch-style',
    title: 'Ranch Style Homes',
    description: 'Single-story living with open floor plans, easy indoor-outdoor access, and great accessibility. Perfect for families of all ages.',
    imageUrl: 'https://images.unsplash.com/photo-1595521969233-8f3216b7ff4f?auto=format&fit=crop&w=800&q=80',
    planCount: 62,
    priceRange: '$550 - $1,300'
  }
];

export default function CollectionsPage() {
  return (
    <CollectionsContainer>
      <PageHeader>
        <PageTitle>Architectural Design Collections</PageTitle>
        <PageDescription>
          Explore our curated collections of house plans organized by style, features, and living concepts. 
          Find the perfect design to match your lifestyle and preferences.
        </PageDescription>
      </PageHeader>
      
      <CollectionsGrid>
        {collections.map((collection) => (
          <CollectionCard key={collection.id}>
            <CollectionImageContainer>
              <CollectionImage 
                src={collection.imageUrl} 
                alt={collection.title} 
              />
            </CollectionImageContainer>
            <CollectionContent>
              <CollectionTitle>{collection.title}</CollectionTitle>
              <CollectionDescription>
                {collection.description}
              </CollectionDescription>
              <CollectionLink href={`/collections/${collection.id}`}>
                View Collection
              </CollectionLink>
            </CollectionContent>
          </CollectionCard>
        ))}
      </CollectionsGrid>
    </CollectionsContainer>
  );
}