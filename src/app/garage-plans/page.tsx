'use client';

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

const ViewDetailsButton = styled.a`
  display: inline-block;
  background-color: var(--color-primary);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
  text-decoration: none;
  
  &:hover {
    background-color: var(--color-primary-dark);
  }
`;

export default function GaragePlansPage() {
  // Updated garage plan data with reliable images of houses with garages
  const garagePlans = [
    {
      id: 'g1',
      name: 'RV Garage with Apartment',
      cars: 1,
      rvBay: true,
      sqft: 1200,
      description: 'Spacious RV garage with a comfortable apartment above for guests or rental.',
      price: 595,
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', // House with large garage
      affiliateLink: 'https://www.dpbolvw.net/click-101433563-14548500?url=https%3A%2F%2Fwww.architecturaldesigns.com%2Fhouse-plans%2Frv-garage-with-1-bedroom-apartment-above-20128ga'
    },
    {
      id: 'g2',
      name: '3-Car Detached Garage',
      cars: 3,
      rvBay: false,
      sqft: 900,
      description: 'Detached three-car garage with extra storage space and workshop area.',
      price: 495,
      image: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', // House with 3-car garage
      affiliateLink: 'https://www.dpbolvw.net/click-101433563-14548500?url=https%3A%2F%2Fwww.architecturaldesigns.com%2Fhouse-plans%2F3-car-detached-garage-plan-with-loft-14631rk'
    },
    {
      id: 'g3',
      name: '2-Car Garage with Workshop',
      cars: 2,
      rvBay: false,
      sqft: 720,
      description: 'Two-car garage with attached workshop perfect for DIY projects.',
      price: 395,
      image: 'https://images.unsplash.com/photo-1592928302636-c83163b41274?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', // House with double garage
      affiliateLink: 'https://www.dpbolvw.net/click-101433563-14548500?url=https%3A%2F%2Fwww.architecturaldesigns.com%2Fhouse-plans%2F2-car-garage-with-workshop-and-half-bath-62636dj'
    },
    {
      id: 'g4',
      name: 'Carriage House Garage',
      cars: 2,
      rvBay: false,
      sqft: 1400,
      description: 'Charming carriage house design with two-car garage below and living space above.',
      price: 695,
      image: 'https://images.unsplash.com/photo-1625602812206-5ec545ca1231?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', // Carriage house style
      affiliateLink: 'https://www.dpbolvw.net/click-101433563-14548500?url=https%3A%2F%2Fwww.architecturaldesigns.com%2Fhouse-plans%2Fcarriage-house-plan-with-2-car-garage-and-rv-bay-26627td'
    },
    {
      id: 'g5',
      name: 'RV Garage with Shop',
      cars: 2,
      rvBay: true,
      sqft: 1600,
      description: 'Large garage with dedicated RV bay and workshop area for projects or storage.',
      price: 595,
      image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', // House with large garage
      affiliateLink: 'https://www.dpbolvw.net/click-101433563-14548500?url=https%3A%2F%2Fwww.architecturaldesigns.com%2Fhouse-plans%2Frv-garage-plan-with-workshop-and-half-bath-62665dj'
    },
    {
      id: 'g6',
      name: '4-Car Garage with Loft',
      cars: 4,
      rvBay: false,
      sqft: 1800,
      description: 'Spacious four-car garage with loft space for storage or potential conversion.',
      price: 795,
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', // House with multiple garage bays
      affiliateLink: 'https://www.dpbolvw.net/click-101433563-14548500?url=https%3A%2F%2Fwww.architecturaldesigns.com%2Fhouse-plans%2F4-car-garage-plan-with-loft-space-22057sl'
    }
  ];

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>Garage Plans</PageTitle>
        <PageDescription>
          Browse our collection of garage plans from simple car storage to multi-purpose spaces with workshops, 
          apartments, and RV storage. Find the perfect garage for your needs.
        </PageDescription>
      </PageHeader>
      
      <FilterSection>
        <FilterTitle>Filter Garage Plans</FilterTitle>
        <FilterGrid>
          <FilterGroup>
            <FilterLabel htmlFor="cars">Car Capacity</FilterLabel>
            <FilterSelect id="cars">
              <option value="">Any</option>
              <option value="1">1+ Cars</option>
              <option value="2">2+ Cars</option>
              <option value="3">3+ Cars</option>
              <option value="4">4+ Cars</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel htmlFor="feature">Features</FilterLabel>
            <FilterSelect id="feature">
              <option value="">Any</option>
              <option value="rv">RV Bay</option>
              <option value="apartment">Apartment</option>
              <option value="workshop">Workshop</option>
              <option value="loft">Loft</option>
            </FilterSelect>
          </FilterGroup>
          
          <FilterGroup>
            <FilterLabel htmlFor="sqft">Square Feet</FilterLabel>
            <FilterSelect id="sqft">
              <option value="">Any</option>
              <option value="500">500+ sqft</option>
              <option value="1000">1,000+ sqft</option>
              <option value="1500">1,500+ sqft</option>
              <option value="2000">2,000+ sqft</option>
            </FilterSelect>
          </FilterGroup>
        </FilterGrid>
      </FilterSection>
      
      <PlansGrid>
        {garagePlans.map(plan => (
          <PlanCard key={plan.id}>
            <PlanImageContainer>
              <Image
                src={plan.image}
                alt={plan.name}
                fill
                style={{ objectFit: 'cover' }}
              />
            </PlanImageContainer>
            
            <PlanDetails>
              <PlanTitle>{plan.name}</PlanTitle>
              <PlanSpecs>
                <span>{plan.cars} Car{plan.cars > 1 ? 's' : ''}</span>
                {plan.rvBay && <span>RV Bay</span>}
                <span>{plan.sqft.toLocaleString()} sqft</span>
              </PlanSpecs>
              <PlanDescription>{plan.description}</PlanDescription>
              <PlanFooter>
                <PlanPrice>${plan.price}</PlanPrice>
                <ViewDetailsButton 
                  href={plan.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Plan Details
                </ViewDetailsButton>
              </PlanFooter>
            </PlanDetails>
          </PlanCard>
        ))}
      </PlansGrid>
    </PageContainer>
  );
}