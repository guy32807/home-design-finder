'use client'

import Link from 'next/link';
import styled from 'styled-components';
import FallbackImage from '../common/FallbackImage';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
  
  .breadcrumbs {
    color: #666;
    
    a {
      color: #4a6741;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const FilterOptions = styled.div`
  display: flex;
  gap: 1rem;
  
  select {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    
    select {
      width: 100%;
    }
  }
`;

const SearchLink = styled(Link)`
  background-color: #4a6741;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  
  &:hover {
    background-color: #3a5231;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const GarageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const GarageCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }
`;

const GarageImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const GarageDetails = styled.div`
  padding: 1.25rem;
  
  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
  
  .features {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.75rem;
    font-size: 0.875rem;
    color: #666;
  }
  
  .price {
    font-weight: 700;
    color: #4a6741;
    margin-bottom: 1rem;
  }
  
  .cta {
    display: inline-block;
    background-color: #4a6741;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    text-decoration: none;
    font-size: 0.875rem;
    
    &:hover {
      background-color: #3a5231;
    }
  }
`;

const IntroText = styled.div`
  margin-bottom: 2rem;
  line-height: 1.6;
  color: #444;
  max-width: 800px;
`;

const GaragePlansPage = () => {
  // Sample garage plans
  const garagePlans = [
    {
      id: '1',
      name: '2-Car Garage with Loft',
      imageUrl: 'https://picsum.photos/seed/garage1/800/600',
      cars: 2,
      squareFeet: 576,
      hasLoft: true,
      price: 295,
      slug: '2-car-garage-with-loft'
    },
    {
      id: '2',
      name: '3-Car Side Entry Garage',
      imageUrl: 'https://picsum.photos/seed/garage2/800/600',
      cars: 3,
      squareFeet: 864,
      hasLoft: false,
      price: 345,
      slug: '3-car-side-entry-garage'
    },
    {
      id: '3',
      name: 'Detached Workshop Garage',
      imageUrl: 'https://picsum.photos/seed/garage3/800/600',
      cars: 2,
      squareFeet: 624,
      hasLoft: false,
      price: 275,
      slug: 'detached-workshop-garage'
    },
    {
      id: '4',
      name: '1-Car Garage with Storage',
      imageUrl: 'https://picsum.photos/seed/garage4/800/600',
      cars: 1,
      squareFeet: 320,
      hasLoft: false,
      price: 195,
      slug: '1-car-garage-with-storage'
    },
    {
      id: '5',
      name: 'RV Garage with Apartment',
      imageUrl: 'https://picsum.photos/seed/garage5/800/600',
      cars: 1,
      squareFeet: 1200,
      hasLoft: true,
      price: 495,
      slug: 'rv-garage-with-apartment'
    },
    {
      id: '6',
      name: '4-Car Luxury Garage',
      imageUrl: 'https://picsum.photos/seed/garage6/800/600',
      cars: 4,
      squareFeet: 1320,
      hasLoft: false,
      price: 445,
      slug: '4-car-luxury-garage'
    },
  ];

  return (
    <Container>
      <PageHeader>
        <h1>Garage Plans</h1>
        <div className="breadcrumbs">
          <Link href="/">Home</Link> &gt; Garage Plans
        </div>
      </PageHeader>
      
      <IntroText>
        <p>
          Our garage plans range from simple one-car structures to elaborate multi-car designs with storage lofts or living quarters above. 
          Whether you need a basic garage for vehicle storage, a workshop space, or a combination garage-apartment, our collection offers 
          practical and stylish solutions to complement your home.
        </p>
      </IntroText>
      
      <FilterBar>
        <FilterOptions>
          <select aria-label="Garage Size">
            <option value="">Any Size</option>
            <option value="1">1-Car Garage</option>
            <option value="2">2-Car Garage</option>
            <option value="3">3-Car Garage</option>
            <option value="4+">4+ Car Garage</option>
          </select>
          
          <select aria-label="Features">
            <option value="">All Features</option>
            <option value="loft">With Loft</option>
            <option value="apartment">With Apartment</option>
            <option value="workshop">With Workshop</option>
            <option value="rv">RV Garage</option>
          </select>
          
          <select aria-label="Sort By">
            <option value="popular">Sort: Most Popular</option>
            <option value="newest">Sort: Newest</option>
            <option value="price-low">Sort: Price (Low to High)</option>
            <option value="price-high">Sort: Price (High to Low)</option>
          </select>
        </FilterOptions>
        
        <SearchLink href="/search?category=garage">
          Advanced Search
        </SearchLink>
      </FilterBar>
      
      <GarageGrid>
        {garagePlans.map(garage => (
          <GarageCard key={garage.id}>
            <GarageImageContainer>
              <Link href={`/garage-plans/${garage.slug}`}>
                <FallbackImage 
                  src={garage.imageUrl} 
                  alt={garage.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fallbackSrc={`https://placehold.co/600x400?text=${encodeURIComponent(garage.name)}`}
                />
              </Link>
            </GarageImageContainer>
            <GarageDetails>
              <h3>{garage.name}</h3>
              <div className="features">
                <span>{garage.cars}-Car</span>
                <span>{garage.squareFeet} sq ft</span>
                {garage.hasLoft && <span>With Loft</span>}
              </div>
              <div className="price">${garage.price}</div>
              <Link href={`/garage-plans/${garage.slug}`} className="cta">
                View Plan Details
              </Link>
            </GarageDetails>
          </GarageCard>
        ))}
      </GarageGrid>
    </Container>
  );
};

export default GaragePlansPage;