'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { useParams } from 'next/navigation';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Breadcrumbs = styled.nav`
  margin-bottom: 1.5rem;
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

const PlanDetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const PlanMainContent = styled.div``;

const PlanSidebar = styled.div``;

const PlanImageGallery = styled.div`
  position: relative;
  height: 400px;
  margin-bottom: 1.5rem;
  border-radius: 0.5rem;
  overflow: hidden;
`;

const PlanInfoSection = styled.div`
  margin-bottom: 2rem;
`;

const PlanTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const PlanSpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const PlanSpecItem = styled.div`
  background-color: #f9fafb;
  padding: 1rem;
  border-radius: 0.25rem;
  text-align: center;
`;

const PlanSpecValue = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

const PlanSpecLabel = styled.div`
  font-size: 0.875rem;
  color: var(--color-text-light);
`;

const PlanDescription = styled.p`
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const PlanFeatures = styled.div`
  margin-bottom: 2rem;
`;

const FeaturesSectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FeatureCheck = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
`;

const PlanPricingCard = styled.div`
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  position: sticky;
  top: 2rem;
`;

const PlanPrice = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const BuyButton = styled.a`
  display: block;
  width: 100%;
  background-color: var(--color-primary);
  color: white;
  font-weight: 500;
  padding: 0.75rem 1rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  margin-bottom: 1rem;
  text-align: center;
  text-decoration: none;
  
  &:hover {
    background-color: var(--color-primary-dark);
  }
`;

const SaveButton = styled.button`
  width: 100%;
  background-color: white;
  color: var(--color-text);
  font-weight: 500;
  padding: 0.75rem 1rem;
  border-radius: 0.25rem;
  border: 1px solid #d1d5db;
  cursor: pointer;
  margin-bottom: 1.5rem;
  
  &:hover {
    background-color: #f9fafb;
  }
`;

const ContactInfo = styled.div`
  font-size: 0.875rem;
  color: var(--color-text-light);
  margin-top: 1rem;
`;

// Garage plans data
const garagePlans = {
  'rv-garage-with-apartment': {
    id: 'g1',
    name: 'RV Garage with Apartment',
    slug: 'rv-garage-with-apartment',
    description: 'This versatile plan provides a generous RV garage with a comfortable apartment above. The apartment includes a full kitchen, living area, bedroom, and bathroom, making it perfect for guests, rental income, or extended family. The garage space offers plenty of room for your RV plus additional storage.',
    mainImage: 'https://picsum.photos/seed/garage1detail/800/500',
    cars: 1,
    rvBay: true,
    sqft: {
      garage: 800,
      apartment: 400,
      total: 1200
    },
    width: 36,
    depth: 44,
    price: 595,
    affiliateLink: 'https://www.dpbolvw.net/click-101433563-14548500?url=https%3A%2F%2Fwww.architecturaldesigns.com%2Fhouse-plans%2Frv-garage-with-1-bedroom-apartment-above-20128ga',
    features: [
      'RV bay with 14-foot ceiling height',
      'One bedroom apartment upstairs',
      'Full kitchen in apartment',
      'Full bathroom with tub/shower combo',
      'Separate entrance to apartment',
      'Storage area in garage',
      'Workbench space',
      'Washer/dryer hookups in apartment',
      'Open concept living in apartment',
      'Optional deck or balcony available'
    ]
  },
  '3-car-detached-garage': {
    id: 'g2',
    name: '3-Car Detached Garage',
    slug: '3-car-detached-garage',
    description: 'This spacious three-car detached garage provides ample space for vehicles and includes additional storage and a workshop area. The thoughtful design offers versatility for car enthusiasts, hobbyists, or anyone needing extra space.',
    mainImage: 'https://picsum.photos/seed/garage2detail/800/500',
    cars: 3,
    rvBay: false,
    sqft: {
      garage: 900,
      storage: 0,
      total: 900
    },
    width: 36,
    depth: 25,
    price: 495,
    affiliateLink: 'https://www.dpbolvw.net/click-101433563-14548500?url=https%3A%2F%2Fwww.architecturaldesigns.com%2Fhouse-plans%2F3-car-detached-garage-plan-with-loft-14631rk',
    features: [
      'Three-car design',
      'Workshop area',
      'Extra storage space',
      'Optional loft space',
      'Multiple garage door options',
      'High ceilings',
      'Optional windows for natural light',
      'Multiple exterior style options',
      'Easy to build design',
      'Matches various home styles'
    ]
  },
  // Add other garage plans as needed
};

export default function GaragePlanDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const planData = garagePlans[slug];
  
  // If plan not found, show a simple message
  // In a production app, you'd use notFound() here
  if (!planData) {
    return (
      <Container>
        <h1>Garage plan not found</h1>
        <p>Sorry, the garage plan you're looking for doesn't exist or has been moved.</p>
        <Link href="/garage-plans">Back to Garage Plans</Link>
      </Container>
    );
  }
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <Breadcrumbs>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
        <BreadcrumbSeparator>›</BreadcrumbSeparator>
        <BreadcrumbLink href="/garage-plans">Garage Plans</BreadcrumbLink>
        <BreadcrumbSeparator>›</BreadcrumbSeparator>
        <span>{planData.name}</span>
      </Breadcrumbs>
      
      <PlanDetailGrid>
        <PlanMainContent>
          <PlanImageGallery>
            <Image
              src={planData.mainImage}
              alt={planData.name}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </PlanImageGallery>
          
          <PlanInfoSection>
            <PlanTitle>{planData.name}</PlanTitle>
            
            <PlanSpecsGrid>
              <PlanSpecItem>
                <PlanSpecValue>{planData.sqft.total.toLocaleString()}</PlanSpecValue>
                <PlanSpecLabel>Total Square Feet</PlanSpecLabel>
              </PlanSpecItem>
              <PlanSpecItem>
                <PlanSpecValue>{planData.cars}</PlanSpecValue>
                <PlanSpecLabel>{planData.cars === 1 ? 'Car Bay' : 'Car Bays'}</PlanSpecLabel>
              </PlanSpecItem>
              {planData.rvBay && (
                <PlanSpecItem>
                  <PlanSpecValue>Yes</PlanSpecValue>
                  <PlanSpecLabel>RV Bay</PlanSpecLabel>
                </PlanSpecItem>
              )}
              {planData.sqft.apartment > 0 && (
                <PlanSpecItem>
                  <PlanSpecValue>{planData.sqft.apartment.toLocaleString()}</PlanSpecValue>
                  <PlanSpecLabel>Apartment Sq Ft</PlanSpecLabel>
                </PlanSpecItem>
              )}
              <PlanSpecItem>
                <PlanSpecValue>{planData.width}' × {planData.depth}'</PlanSpecValue>
                <PlanSpecLabel>Dimensions</PlanSpecLabel>
              </PlanSpecItem>
            </PlanSpecsGrid>
            
            <PlanDescription>{planData.description}</PlanDescription>
          </PlanInfoSection>
          
          <PlanFeatures>
            <FeaturesSectionTitle>Features & Amenities</FeaturesSectionTitle>
            <FeaturesGrid>
              {planData.features.map((feature, index) => (
                <FeatureItem key={index}>
                  <FeatureCheck>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </FeatureCheck>
                  <span>{feature}</span>
                </FeatureItem>
              ))}
            </FeaturesGrid>
          </PlanFeatures>
        </PlanMainContent>
        
        <PlanSidebar>
          <PlanPricingCard>
            <PlanPrice>${planData.price}</PlanPrice>
            <BuyButton 
              href={planData.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Architectural Designs
            </BuyButton>
            <SaveButton>Save to Favorites</SaveButton>
            
            <ContactInfo>
              <p>Questions about this garage plan?</p>
              <p style={{ marginTop: '0.5rem' }}>Visit the designer's website for more details</p>
            </ContactInfo>
          </PlanPricingCard>
        </PlanSidebar>
      </PlanDetailGrid>
    </Container>
  );
}