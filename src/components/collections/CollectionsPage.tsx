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

const CategorySections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const CategorySection = styled.div`
  h2 {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
    color: #333;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #eee;
  }
`;

const CollectionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const CollectionCard = styled.div`
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

const CollectionImageContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
`;

const CollectionInfo = styled.div`
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
  
  .plan-count {
    font-size: 0.875rem;
    color: #4a6741;
    font-weight: 500;
    margin-bottom: 1rem;
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

const FeaturedCollection = styled.div`
  margin: 0 0 3rem;
  position: relative;
  height: 350px;
  border-radius: 8px;
  overflow: hidden;
  
  .content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    background: linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%);
    color: white;
    
    @media (min-width: 768px) {
      width: 50%;
    }
    
    h2 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    
    p {
      margin-bottom: 1.5rem;
      max-width: 500px;
      opacity: 0.9;
    }
    
    a {
      display: inline-block;
      background-color: #d9534f;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      font-weight: 600;
      text-decoration: none;
      align-self: flex-start;
      transition: background-color 0.2s;
      
      &:hover {
        background-color: #c9302c;
      }
    }
  }
`;

interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  planCount: number;
  category: string;
}

interface CollectionsPageProps {
  initialCollections: Collection[];
}

const CollectionsPage: React.FC<CollectionsPageProps> = ({ initialCollections }) => {
  const router = useRouter();
  const [collections] = useState<Collection[]>(initialCollections);
  
  // Group collections by category
  const collectionsByCategory = collections.reduce((acc, collection) => {
    if (!acc[collection.category]) {
      acc[collection.category] = [];
    }
    acc[collection.category].push(collection);
    return acc;
  }, {} as Record<string, Collection[]>);
  
  // Your affiliate link
  const affiliateLink = "https://www.jdoqocy.com/click-101433563-14548500";
  
  return (
    <Container>
      <BreadcrumbNav>
        <Link href="/">Home</Link> &gt; Collections
      </BreadcrumbNav>
      
      <PageHeader>
        <h1>House Plan Collections</h1>
        <p>
          Explore our curated collections of house plans organized by features, size, and special characteristics
          to find exactly what you're looking for in your dream home.
        </p>
      </PageHeader>
      
      <FeaturedCollection>
        <FallbackImage 
          src="https://picsum.photos/seed/modern/1200/500"
          alt="Featured Collection - Modern House Plans"
          fill
          style={{ objectFit: 'cover' }}
          fallbackSrc="https://placehold.co/1200x500?text=Modern+House+Plans"
          priority
        />
        <div className="content">
          <h2>New Modern House Plans</h2>
          <p>
            Discover our newest collection of modern house plans featuring clean lines,
            open layouts, and contemporary design elements.
          </p>
          <a href="/collections/modern-house-plans">
            Explore Modern Plans
          </a>
        </div>
      </FeaturedCollection>
      
      <CategorySections>
        {Object.entries(collectionsByCategory).map(([category, categoryCollections]) => (
          <CategorySection key={category}>
            <h2>{category}</h2>
            <CollectionsGrid>
              {categoryCollections.map(collection => (
                <CollectionCard key={collection.id}>
                  <CollectionImageContainer>
                    <Link href={`/collections/${collection.slug}`}>
                      <FallbackImage 
                        src={collection.image}
                        alt={collection.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        fallbackSrc={`https://placehold.co/600x400?text=${encodeURIComponent(collection.name)}`}
                      />
                    </Link>
                  </CollectionImageContainer>
                  
                  <CollectionInfo>
                    <h3>{collection.name}</h3>
                    <p>{collection.description}</p>
                    <div className="plan-count">{collection.planCount} plans available</div>
                    <Link href={`/collections/${collection.slug}`}>
                      View Collection →
                    </Link>
                  </CollectionInfo>
                </CollectionCard>
              ))}
            </CollectionsGrid>
          </CategorySection>
        ))}
      </CategorySections>
      
      <div style={{ 
        margin: '3rem 0', 
        padding: '2rem', 
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>Ready to Find Your Dream Home?</h2>
        <p style={{ 
          maxWidth: '700px', 
          margin: '0 auto 1.5rem',
          color: '#666'
        }}>
          Browse thousands of house plans and get complete construction blueprints
          at special discounted prices with our limited-time offer.
        </p>
        <a 
          href={affiliateLink}
          style={{ 
            display: 'inline-block',
            backgroundColor: '#d9534f',
            color: 'white',
            fontWeight: '600',
            padding: '0.75rem 1.5rem',
            borderRadius: '4px',
            textDecoration: 'none'
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get 50% Off All House Plans - Limited Time!
        </a>
      </div>
    </Container>
  );
};

export default CollectionsPage;