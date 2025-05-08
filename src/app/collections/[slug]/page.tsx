'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';

// Mock data - in a real app, this would come from an API
const collectionsData = {
  'barndominium': {
    id: '3',
    name: 'Barndominium Collection',
    slug: 'barndominium',
    description: 'Modern farmhouse living with open spaces, soaring ceilings, and industrial elements.',
    fullDescription: `
      <p>Barndominiums have surged in popularity for their spacious, open floor plans and distinctive aesthetic that combines rustic charm with modern amenities. These designs typically feature metal exteriors, high ceilings, and large, open living areas.</p>
      <p>Originally inspired by converting barns into living spaces, today's barndominium plans are purpose-built homes that offer incredible design flexibility, energy efficiency, and that unmistakable farmhouse-industrial character.</p>
      <p>Browse our collection of barndominium house plans featuring various sizes and layouts to find the perfect blend of rustic charm and modern convenience for your lifestyle.</p>
    `,
    image: 'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?auto=format&fit=crop&w=1600&q=80',
    category: 'By Style'
  },
  'craftsman': {
    id: '4',
    name: 'Craftsman Style Homes',
    slug: 'craftsman',
    description: 'Timeless designs featuring handcrafted details, natural materials, and cozy porches.',
    fullDescription: `
      <p>Craftsman house plans celebrate the beauty of natural materials and handcrafted details. Born from the Arts and Crafts movement of the early 20th century, these designs feature distinctive elements like low-pitched rooflines, wide eave overhangs, exposed beams, and front porches with tapered columns.</p>
      <p>Inside, you'll find built-in furniture, prominent fireplaces, and an open layout that creates a warm, inviting atmosphere. Our collection of Craftsman house plans ranges from compact bungalows to spacious family homes, all sharing that timeless character.</p>
      <p>These homes continue to be one of America's most beloved architectural styles, offering both aesthetic beauty and practical, comfortable living spaces.</p>
    `,
    image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1600&q=80',
    category: 'By Style'
  },
  'energy-efficient': {
    id: '5',
    name: 'Energy-Efficient Designs',
    slug: 'energy-efficient',
    description: 'Sustainable houses that minimize environmental impact while maximizing comfort.',
    fullDescription: `
      <p>Our energy-efficient house plans are designed with sustainability in mind, incorporating features that reduce energy consumption, minimize environmental impact, and create healthier living environments.</p>
      <p>These homes typically include high-performance insulation, energy-efficient windows, optimal solar orientation, and often incorporate renewable energy systems. Many designs also feature passive heating and cooling strategies that work with natural elements rather than against them.</p>
      <p>Beyond their environmental benefits, these homes offer significant long-term savings through reduced utility costs while providing exceptional comfort through improved temperature regulation and air quality.</p>
    `,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    category: 'By Feature'
  },
  'small-house-plans': {
    id: '1',
    name: 'Small House Plans',
    slug: 'small-house-plans',
    description: 'Efficient layouts under 1,500 square feet, perfect for minimalists or first-time homeowners.',
    fullDescription: `
      <p>Small house plans offer efficient living in compact footprints under 1,500 square feet. These designs maximize every square inch with smart layouts, multi-functional spaces, and built-in storage solutions.</p>
      <p>Despite their modest size, these homes offer comfortable living with open floor plans that create an airy feel. Many include space-saving features like built-in furniture, lofts, and multi-purpose rooms.</p>
      <p>Small house plans are perfect for those looking to minimize their environmental footprint, reduce maintenance and utility costs, or build on a limited budget. They're also ideal for vacation homes, downsizing, or building on smaller urban lots.</p>
    `,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80',
    category: 'By Size'
  },
  'open-concept': {
    id: '2',
    name: 'Open Concept Floor Plans',
    slug: 'open-concept',
    description: 'Spacious, flowing layouts with minimal walls between living, dining, and kitchen areas.',
    fullDescription: `
      <p>Open concept floor plans eliminate the traditional barriers between common living spaces, creating a free-flowing environment that enhances the sense of space and natural light throughout the home.</p>
      <p>These designs typically feature a seamless connection between the kitchen, dining, and living areas, making them perfect for entertaining and family interaction. Large islands often serve as transition points between functional zones.</p>
      <p>The open design allows for flexibility in furniture arrangement and space usage, while also maintaining sightlines throughout the main living areas. This collection includes designs for various home sizes, from cozy cottages to spacious modern residences.</p>
    `,
    image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=1600&q=80',
    category: 'By Layout'
  },
  'mid-century': {
    id: '6',
    name: 'Mid-Century Modern',
    slug: 'mid-century',
    description: 'Clean lines, large windows, and seamless indoor-outdoor living spaces.',
    fullDescription: `
      <p>Mid-Century Modern house plans capture the essence of the post-war architectural movement with their clean lines, integration with nature, and emphasis on functionality.</p>
      <p>These designs typically feature flat or low-pitched roofs, large windows that bring the outdoors in, open floor plans, and a minimalist aesthetic. Many incorporate natural materials like wood and stone alongside modern elements like glass and steel.</p>
      <p>The continued popularity of Mid-Century Modern design speaks to its timeless appeal and the way these homes effortlessly blend style with practical, comfortable living spaces.</p>
    `,
    image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1600&q=80',
    category: 'By Style'
  },
  'outdoor-living': {
    id: '7',
    name: 'Outdoor Living Focus',
    slug: 'outdoor-living',
    description: 'Designs that maximize the connection between indoor and outdoor spaces.',
    fullDescription: `
      <p>Our outdoor living-focused house plans are designed to blur the boundary between interior and exterior spaces, creating seamless transitions to patios, porches, decks, and landscapes.</p>
      <p>These homes typically feature large sliding or folding glass doors, covered outdoor rooms, summer kitchens, and thoughtful orientation to capture views and optimize outdoor enjoyment regardless of weather conditions.</p>
      <p>Perfect for those who love to entertain or simply enjoy connecting with nature, these designs prioritize the outdoor experience while maintaining all the comfort and functionality you expect in a modern home.</p>
    `,
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1600&q=80',
    category: 'By Feature'
  },
  'modern-farmhouse': {
    id: '8',
    name: 'Modern Farmhouse',
    slug: 'modern-farmhouse',
    description: 'Contemporary designs with classic farmhouse elements like gabled roofs and large porches.',
    fullDescription: `
      <p>Modern Farmhouse plans combine traditional farmhouse elements with contemporary features for a fresh take on rural-inspired living. These designs typically feature gabled roofs, board and batten or lap siding, large front porches, and comfortable, casual interiors.</p>
      <p>Inside, you'll find open-concept living spaces, large kitchen islands, and a blend of rustic elements with clean modern finishes. The aesthetic strikes a perfect balance between cozy and contemporary, with plenty of character and charm.</p>
      <p>This popular style works well in both rural and suburban settings, offering flexible living spaces that adapt to changing family needs while maintaining a timeless, inviting appearance.</p>
    `,
    image: 'https://images.unsplash.com/photo-1531129568237-063854508d31?auto=format&fit=crop&w=1600&q=80',
    category: 'By Style'
  },
  'ranch-style': {
    id: '9',
    name: 'Ranch Style Homes',
    slug: 'ranch-style',
    description: 'Single-story living with open floor plans, easy indoor-outdoor access, and great accessibility.',
    fullDescription: `
      <p>Ranch style house plans offer single-level living with an emphasis on functionality, accessibility, and casual comfort. These horizontal designs typically feature low-pitched rooflines, attached garages, and an easy connection to outdoor living spaces.</p>
      <p>Modern ranch plans often incorporate open-concept interiors, split bedroom layouts for privacy, and large windows to bring in natural light. Their single-story nature makes them ideal for aging in place, families with young children, or anyone who prefers the convenience of no-stair living.</p>
      <p>From modest starter homes to sprawling luxury ranches, this versatile style adapts to various sizes and regional influences while maintaining its signature accessibility and connection to the landscape.</p>
    `,
    image: 'https://images.unsplash.com/photo-1595521969233-8f3216b7ff4f?auto=format&fit=crop&w=1600&q=80',
    category: 'By Style'
  }
};

const CollectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`;

const Breadcrumbs = styled.nav`
  display: flex;
  margin-bottom: 2rem;
  font-size: 0.875rem;
`;

const BreadcrumbLink = styled(Link)`
  color: var(--color-primary);
  &:hover {
    text-decoration: underline;
  }
`;

const BreadcrumbSeparator = styled.span`
  margin: 0 0.5rem;
  color: var(--color-text-light);
`;

const CollectionHeader = styled.div`
  margin-bottom: 3rem;
`;

const CollectionTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-text);
`;

const CollectionDescription = styled.p`
  font-size: 1.125rem;
  color: var(--color-text-light);
  max-width: 800px;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #10b981; /* Green color */
  color: #ffffff !important;
  font-weight: 700;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  text-decoration: none !important;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #059669;
    color: #ffffff !important;
  }
  
  &::after {
    content: "→";
    margin-left: 0.5rem;
    font-size: 1.125rem;
  }
`;

const FeaturedImage = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 640px) {
    height: 250px;
  }
`;

const CollectionContent = styled.div`
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--color-text);
  margin-bottom: 3rem;
  
  p {
    margin-bottom: 1.5rem;
  }
`;

export default function CollectionDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  // Get collection data or use default if not found
  const collection = collectionsData[slug as keyof typeof collectionsData];
  
  // If collection doesn't exist, throw a 404
  if (!collection) {
    notFound();
  }
  
  const affiliateLink = "https://www.kqzyfj.com/click-9083409-14053933";
  
  return (
    <CollectionContainer>
      <Breadcrumbs>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
        <BreadcrumbSeparator>›</BreadcrumbSeparator>
        <BreadcrumbLink href="/collections">Collections</BreadcrumbLink>
        <BreadcrumbSeparator>›</BreadcrumbSeparator>
        <span>{collection.name}</span>
      </Breadcrumbs>
      
      <CollectionHeader>
        <CollectionTitle>{collection.name}</CollectionTitle>
        <CollectionDescription>{collection.description}</CollectionDescription>
        <CTAButton 
          href={`${affiliateLink}&url=https%3A%2F%2Fwww.architecturaldesigns.com%2Fcollections%2F${collection.slug}`} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          View All {collection.name}
        </CTAButton>
      </CollectionHeader>
      
      <FeaturedImage>
        <img 
          src={collection.image} 
          alt={collection.name}
        />
      </FeaturedImage>
      
      <CollectionContent dangerouslySetInnerHTML={{ __html: collection.fullDescription }} />
      
      <CTAButton 
        href={`${affiliateLink}&url=https%3A%2F%2Fwww.architecturaldesigns.com%2Fcollections%2F${collection.slug}`} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        Browse {collection.name}
      </CTAButton>
    </CollectionContainer>
  );
}