'use client';

import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const PageDescription = styled.p`
  font-size: 1.125rem;
  color: var(--color-text-light);
  max-width: 800px;
`;

const FilterSection = styled.div`
  background-color: #f9fafb;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
`;

const FilterTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const FilterGroup = styled.div``;

const FilterLabel = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const PlanCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

const PlanImageContainer = styled.div`
  position: relative;
  height: 200px;
`;

const PlanDetails = styled.div`
  padding: 1.5rem;
`;

const PlanTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const PlanSpecs = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: var(--color-text-light);
  font-size: 0.875rem;
`;

const PlanDescription = styled.p`
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: var(--color-text-light);
`;

const PlanFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PlanPrice = styled.span`
  font-weight: 700;
  font-size: 1.25rem;
`;

const ViewDetailsLink = styled.a`
  color: var(--color-primary);
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default function HousePlansPage() {
  // Updated house plan data with reliable image URLs
  const housePlans = [
    {
      id: '1',
      name: 'Modern Farmhouse Plan',
      beds: 4,
      baths: 2.5,
      sqft: 2800,
      description: 'Spacious modern farmhouse with open concept living and large kitchen island.',
      price: 795,
      image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      slug: 'modern-farmhouse-1',
      affiliateLink: 'https://www.dpbolvw.net/click-101433563-14548500?url=https%3A%2F%2Fwww.architecturaldesigns.com%2Fhouse-plans%2F4-bed-modern-farmhouse-plan-14682rk'
    },
    {
      id: '2',
      name: 'Craftsman Bungalow',
      beds: 3,
      baths: 2,
      sqft: 1950,
      description: 'Classic craftsman with covered front porch and detailed woodwork throughout.',
      price: 695,
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 
      slug: 'craftsman-bungalow-1',
      affiliateLink: 'https://www.dpbolvw.net/click-101433563-14548500?url=https%3A%2F%2Fwww.architecturaldesigns.com%2Fhouse-plans%2F3-bed-craftsman-bungalow-42624db'
    },
    {
      id: '3',
      name: 'Contemporary Ranch',
      beds: 3,
      baths: 2.5,
      sqft: 2100,
      description: 'Single-level living with modern design elements and open floor plan.',
      price: 745,
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      slug: 'contemporary-ranch-1',
      affiliateLink: 'https://www.dpbolvw.net/click-101433563-14548500?url=https%3A%2F%2Fwww.architecturaldesigns.com%2Fhouse-plans%2F3-bed-modern-ranch-home-plan-430029ly'
    },
    {
      id: '4',
      name: 'Colonial Two-Story',
      beds: 4,
      baths: 3.5,
      sqft: 3200,
      description: 'Traditional colonial with grand entrance and formal dining room.',
      price: 895,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      slug: 'colonial-two-story-1',
      affiliateLink: 'https://www.dpbolvw.net/click-101433563-14548500?url=https%3A%2F%2Fwww.architecturaldesigns.com%2Fhouse-plans%2F4-bed-colonial-home-plan-29891ht'
    },
    {
      id: '5',
      name: 'Small Cottage',
      beds: 2,
      baths: 1,
      sqft: 1200,
      description: 'Charming cottage ideal for first-time homebuyers or empty nesters.',
      price: 595,
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      slug: 'small-cottage-1',
      affiliateLink: 'https://www.dpbolvw.net/click-101433563-14548500?url=https%3A%2F%2Fwww.architecturaldesigns.com%2Fhouse-plans%2Ftiny-house-plan-with-2-bedrooms-51758hz'
    },
    {
      id: '6',
      name: 'Modern Minimalist',
      beds: 3,
      baths: 2.5,
      sqft: 2400,
      description: 'Clean lines and minimalist design with floor-to-ceiling windows.',
      price: 845,
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      slug: 'modern-minimalist-1',
      affiliateLink: 'https://www.dpbolvw.net/click-101433563-14548500?url=https%3A%2F%2Fwww.architecturaldesigns.com%2Fhouse-plans%2F3-bed-modern-house-plan-with-open-concept-layout-25402tf'
    }
  ];

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>House Plans</PageTitle>
        <PageDescription>
          Browse our collection of beautiful house plans in various styles and sizes. 
          Find the perfect design for your dream home.
        </PageDescription>
      </PageHeader>
      
      <FilterSection>
        <FilterTitle>Filter House Plans</FilterTitle>
        <FilterGrid>
          <FilterGroup>
            <FilterLabel htmlFor="bedrooms">Bedrooms</FilterLabel>
            <FilterSelect id="bedrooms">
              <option value="">Any</option>
              <option value="1">1+ Bedrooms</option>
              <option value="2">2+ Bedrooms</option>
              <option value="3">3+ Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
              <option value="5">5+ Bedrooms</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel htmlFor="bathrooms">Bathrooms</FilterLabel>
            <FilterSelect id="bathrooms">
              <option value="">Any</option>
              <option value="1">1+ Bathrooms</option>
              <option value="2">2+ Bathrooms</option>
              <option value="3">3+ Bathrooms</option>
              <option value="4">4+ Bathrooms</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel htmlFor="sqft">Square Feet</FilterLabel>
            <FilterSelect id="sqft">
              <option value="">Any</option>
              <option value="1000">1,000+ sqft</option>
              <option value="1500">1,500+ sqft</option>
              <option value="2000">2,000+ sqft</option>
              <option value="2500">2,500+ sqft</option>
              <option value="3000">3,000+ sqft</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel htmlFor="style">Style</FilterLabel>
            <FilterSelect id="style">
              <option value="">Any</option>
              <option value="craftsman">Craftsman</option>
              <option value="farmhouse">Modern Farmhouse</option>
              <option value="ranch">Ranch</option>
              <option value="contemporary">Contemporary</option>
              <option value="colonial">Colonial</option>
              <option value="cottage">Cottage</option>
            </FilterSelect>
          </FilterGroup>
        </FilterGrid>
      </FilterSection>
      
      <PlansGrid>
        {housePlans.map(plan => (
          <PlanCard key={plan.id}>
            <PlanImageContainer>
              <img
                src={plan.image}
                alt={plan.name}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  position: 'absolute'
                }}
              />
            </PlanImageContainer>
            
            <PlanDetails>
              <PlanTitle>{plan.name}</PlanTitle>
              <PlanSpecs>
                <span>{plan.beds} Bed</span>
                <span>{plan.baths} Bath</span>
                <span>{plan.sqft.toLocaleString()} sqft</span>
              </PlanSpecs>
              <PlanDescription>{plan.description}</PlanDescription>
              <PlanFooter>
                <PlanPrice>${plan.price}</PlanPrice>
                <ViewDetailsLink 
                  href={plan.affiliateLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View Details →
                </ViewDetailsLink>
              </PlanFooter>
            </PlanDetails>
          </PlanCard>
        ))}
      </PlansGrid>
    </PageContainer>
  );
}