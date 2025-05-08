'use client'

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { useCollectionUseCases } from '../../adapters/context/AppContext';
import { PopulatedCollection } from '../../core/domain/entities';

const Section = styled.section`
  padding: 5rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  
  &:after {
    content: "";
    display: block;
    width: 80px;
    height: 3px;
    background-color: #4a6741;
    margin: 0.5rem auto 0;
  }
`;

const CollectionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const CollectionImage = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  height: 100%;
  min-height: 300px;
`;

const CollectionInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
  
  p {
    color: #666;
    line-height: 1.7;
    margin-bottom: 2rem;
  }
  
  .collection-link {
    display: inline-block;
    background-color: #4a6741;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 600;
    transition: background-color 0.2s;
    width: fit-content;
    
    &:hover {
      background-color: #3a5231;
    }
  }
  
  .stats {
    display: flex;
    gap: 2rem;
    margin-top: 2rem;
    
    .stat {
      text-align: center;
      
      .number {
        font-size: 2rem;
        font-weight: 700;
        color: #4a6741;
      }
      
      .label {
        font-size: 0.9rem;
        color: #666;
      }
    }
  }
`;

// Mock data since we don't have a CollectionRepository implementation yet
const mockCollection: PopulatedCollection = {
  id: 'collection1',
  name: 'Energy-Efficient Home Designs',
  slug: 'energy-efficient-homes',
  description: 'Our collection of energy-efficient house plans features designs that minimize environmental impact while maximizing comfort. These homes incorporate sustainable materials, optimal insulation, and smart layouts to reduce energy consumption and utility costs.',
  image: 'https://placehold.co/800x600/e8e8e8/2a2a2a?text=Energy+Efficient+Homes',
  plans: [], // Would contain populated plan objects
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
};

const CollectionHighlight = () => {
  const [collection, setCollection] = useState<PopulatedCollection | null>(null);
  const [loading, setLoading] = useState(true);
  const collectionUseCases = useCollectionUseCases();
  
  useEffect(() => {
    const loadCollection = async () => {
      try {
        // In a production app, this would fetch real data
        // const featuredCollection = await collectionUseCases.getCollectionBySlug('energy-efficient-homes');
        
        // For now, we'll use the mock data
        setCollection(mockCollection);
      } catch (error) {
        console.error('Failed to load collection:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadCollection();
  }, [collectionUseCases]);
  
  if (loading) {
    return <Section><p>Loading collection...</p></Section>;
  }
  
  if (!collection) {
    return null;
  }
  
  return (
    <Section>
      <SectionTitle>Featured Collection</SectionTitle>
      
      <CollectionContainer>
        <CollectionImage>
          <Image 
            src={collection.image || '/placeholder.jpg'} 
            alt={collection.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </CollectionImage>
        
        <CollectionInfo>
          <h3>{collection.name}</h3>
          <p>{collection.description}</p>
          
          <Link 
            href={`/collections/${collection.slug}`} 
            className="collection-link"
          >
            Explore Collection
          </Link>
          
          <div className="stats">
            <div className="stat">
              <div className="number">25+</div>
              <div className="label">House Plans</div>
            </div>
            <div className="stat">
              <div className="number">40%</div>
              <div className="label">Energy Savings</div>
            </div>
            <div className="stat">
              <div className="number">$0</div>
              <div className="label">Carbon Footprint</div>
            </div>
          </div>
        </CollectionInfo>
      </CollectionContainer>
    </Section>
  );
};

export default CollectionHighlight;