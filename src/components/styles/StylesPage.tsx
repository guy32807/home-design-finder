'use client'

import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import FallbackImage from '../common/FallbackImage';
import { useRouter } from 'next/navigation';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const BreadcrumbNav = styled.div`
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: #666;
  
  a {
    color: #4a6741;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
    color: #333;
  }
  
  p {
    color: #666;
    max-width: 800px;
    line-height: 1.6;
  }
`;

const StylesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const StyleCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }
`;

const StyleImageContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
`;

const StyleInfo = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  
  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
    color: #333;
  }
  
  p {
    font-size: 0.875rem;
    color: #666;
    margin-bottom: 1rem;
    text-align: left;
  }
  
  a {
    margin-top: auto;
    display: inline-block;
    color: #4a6741;
    font-weight: 600;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const PromoSection = styled.div`
  margin: 3rem 0;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  
  h2 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  p {
    max-width: 700px;
    margin: 0 auto 1.5rem;
    color: #666;
  }
  
  .promo-button {
    display: inline-block;
    background-color: #d9534f;
    color: white;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    text-decoration: none;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: #c9302c;
    }
  }
`;

interface HomeStyle {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  planCount: number;
}

interface StylesPageProps {
  initialStyles: HomeStyle[];
}

const StylesPage: React.FC<StylesPageProps> = ({ initialStyles }) => {
  const router = useRouter();
  const [styles] = useState<HomeStyle[]>(initialStyles);
  
  // Your affiliate link
  const affiliateLink = "https://www.jdoqocy.com/click-101433563-14548500";
  
  return (
    <Container>
      <BreadcrumbNav>
        <Link href="/">Home</Link> &gt; Home Styles
      </BreadcrumbNav>
      
      <PageHeader>
        <h1>Home Styles</h1>
        <p>
          Explore our curated collection of home styles to find the perfect aesthetic for your dream house.
          From traditional to modern, each style offers a unique character and design features.
        </p>
      </PageHeader>
      
      <StylesGrid>
        {styles.map(style => (
          <StyleCard key={style.id}>
            <StyleImageContainer>
              <Link href={`/styles/${style.slug}`}>
                <FallbackImage 
                  src={style.image}
                  alt={style.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fallbackSrc={`https://placehold.co/600x400?text=${encodeURIComponent(style.name)}`}
                />
              </Link>
            </StyleImageContainer>
            
            <StyleInfo>
              <h3>{style.name}</h3>
              <p>{style.description}</p>
              <p>{style.planCount} available plans</p>
              <Link href={`/styles/${style.slug}`}>
                View {style.name} Plans →
              </Link>
            </StyleInfo>
          </StyleCard>
        ))}
      </StylesGrid>
      
      <PromoSection>
        <h2>Find Your Dream Home Today</h2>
        <p>
          Browse thousands of house plans in various styles and get professional-grade 
          blueprints to build your perfect home at an affordable price.
        </p>
        <a 
          href={affiliateLink}
          className="promo-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get 50% Off All House Plans - Limited Time!
        </a>
      </PromoSection>
    </Container>
  );
};

export default StylesPage;