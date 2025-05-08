'use client'

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { useStyleUseCases } from '../../adapters/context/AppContext';
import { Style } from '../../core/domain/entities';

const Section = styled.section`
  padding: 5rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f8f9fa;
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

const SectionDescription = styled.p`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  color: #666;
  line-height: 1.6;
`;

const StylesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const StyleCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const StyleInfo = styled.div`
  padding: 1.25rem;
  text-align: center;
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 1rem;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .style-link {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: transparent;
    border: 1px solid #4a6741;
    color: #4a6741;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s;
    
    &:hover {
      background-color: #4a6741;
      color: white;
    }
  }
`;

// Mock data since we don't have a StyleRepository implementation yet
const mockStyles: Style[] = [
  {
    id: 'style1',
    name: 'Craftsman',
    slug: 'craftsman',
    description: 'Known for natural materials, wide porches, and exposed beams, Craftsman homes emphasize handcrafted details and craftsmanship.',
    image: 'https://placehold.co/800x600/e8e8e8/2a2a2a?text=Craftsman',
    characteristics: ['Wide porches', 'Exposed beams', 'Handcrafted details'],
    history: 'Emerged in the early 20th century as a reaction to the mass-produced elements of the Industrial Revolution.',
    popularEras: ['1900-1930'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'style2',
    name: 'Modern Farmhouse',
    slug: 'modern-farmhouse',
    description: 'Combines rustic charm with contemporary features for an updated take on the traditional farmhouse style.',
    image: 'https://placehold.co/800x600/e8e8e8/2a2a2a?text=Modern+Farmhouse',
    characteristics: ['Clean lines', 'Neutral colors', 'Mixed materials', 'Gabled roofs'],
    popularEras: ['2010s-Present'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'style3',
    name: 'Ranch',
    slug: 'ranch',
    description: 'Single-story homes with an open and casual layout that often features a low-pitched roof and large windows.',
    image: 'https://placehold.co/800x600/e8e8e8/2a2a2a?text=Ranch',
    characteristics: ['Single-story', 'Open floor plan', 'Low-pitched roof'],
    history: 'Became extremely popular in post-WWII America during the 1950s and 1960s.',
    popularEras: ['1950s-1970s'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'style4',
    name: 'Contemporary',
    slug: 'contemporary',
    description: 'Features clean lines, open floor plans, and large windows that bring the outdoors in with an emphasis on sustainability.',
    image: 'https://placehold.co/800x600/e8e8e8/2a2a2a?text=Contemporary',
    characteristics: ['Asymmetrical facades', 'Large windows', 'Eco-friendly materials'],
    popularEras: ['1970s-Present'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const PopularStyles = () => {
  const [styles, setStyles] = useState<Style[]>([]);
  const [loading, setLoading] = useState(true);
  const styleUseCases = useStyleUseCases();
  
  useEffect(() => {
    const loadStyles = async () => {
      try {
        // In a production app, this would fetch real data
        // const popularStyles = await styleUseCases.getPopularStyles(4);
        
        // For now, we'll use the mock data
        setStyles(mockStyles);
      } catch (error) {
        console.error('Failed to load popular styles:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadStyles();
  }, [styleUseCases]);
  
  return (
    <Section>
      <SectionTitle>Popular Architectural Styles</SectionTitle>
      <SectionDescription>
        Discover the unique characteristics of different architectural styles and find the perfect aesthetic for your dream home.
      </SectionDescription>
      
      {loading ? (
        <p>Loading popular styles...</p>
      ) : (
        <StylesGrid>
          {styles.map(style => (
            <StyleCard key={style.id}>
              <Link href={`/styles/${style.slug}`}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3' }}>
                  <Image 
                    src={style.image || '/placeholder.jpg'} 
                    alt={style.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
              </Link>
              <StyleInfo>
                <h3>{style.name}</h3>
                <p>{style.description}</p>
                <Link 
                  href={`/styles/${style.slug}`} 
                  className="style-link"
                >
                  Explore {style.name} Plans
                </Link>
              </StyleInfo>
            </StyleCard>
          ))}
        </StylesGrid>
      )}
    </Section>
  );
};

export default PopularStyles;