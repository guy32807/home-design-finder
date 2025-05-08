'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { useParams } from 'next/navigation';
import { useShare } from '../../../context/ShareContext';

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

export default function HousePlanDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { setCurrentPlan } = useShare();
  
  const planData = {
    id: '1',
    name: 'Modern Farmhouse Plan #4291',
    slug: 'modern-farmhouse-1',
    description: 'This beautiful modern farmhouse plan offers the perfect blend of contemporary and rustic elements. The open floor plan creates a seamless flow between the kitchen, dining, and living areas, making it ideal for family gatherings and entertaining. Large windows throughout fill the home with natural light, while the covered back porch extends your living space to the outdoors.',
    mainImage: 'https://picsum.photos/seed/house1detail/800/500',
    beds: 4,
    baths: 2.5,
    stories: 2,
    garages: 2,
    sqft: 2800,
    width: 60,
    depth: 72,
    price: 795,
    affiliateLink: 'https://www.dpbolvw.net/click-101433563-14548500?url=https%3A%2F%2Fwww.architecturaldesigns.com%2Fhouse-plans%2F4-bed-modern-farmhouse-plan-14682rk',
    features: [
      'Open concept floor plan',
      'Large kitchen island',
      'Walk-in pantry',
      'Mudroom with built-in storage',
      'First floor guest suite',
      'Large primary suite with spa-like bathroom',
      'Covered back porch',
      'Bonus room above garage',
      'Walk-in closets in all bedrooms',
      'Home office space'
    ],
    exteriorStyles: ['Modern Farmhouse', 'Craftsman', 'Traditional']
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Update the share context with current plan data
    if (planData) {
      setCurrentPlan({
        name: planData.name,
        description: planData.description.substring(0, 100) + '...',
        image: planData.mainImage,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/house-plans/${planData.slug}`
      });
    }
    
    return () => {
      // Clear the share context when leaving the page
      setCurrentPlan(null);
    };
  }, [planData, setCurrentPlan]);

  return (
    <Container>
      <Breadcrumbs>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
        <BreadcrumbSeparator>›</BreadcrumbSeparator>
        <BreadcrumbLink href="/house-plans">House Plans</BreadcrumbLink>
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
                <PlanSpecValue>{planData.sqft.toLocaleString()}</PlanSpecValue>
                <PlanSpecLabel>Square Feet</PlanSpecLabel>
              </PlanSpecItem>
              <PlanSpecItem>
                <PlanSpecValue>{planData.beds}</PlanSpecValue>
                <PlanSpecLabel>Bedrooms</PlanSpecLabel>
              </PlanSpecItem>
              <PlanSpecItem>
                <PlanSpecValue>{planData.baths}</PlanSpecValue>
                <PlanSpecLabel>Bathrooms</PlanSpecLabel>
              </PlanSpecItem>
              <PlanSpecItem>
                <PlanSpecValue>{planData.stories}</PlanSpecValue>
                <PlanSpecLabel>Stories</PlanSpecLabel>
              </PlanSpecItem>
              <PlanSpecItem>
                <PlanSpecValue>{planData.garages}</PlanSpecValue>
                <PlanSpecLabel>Garage Bays</PlanSpecLabel>
              </PlanSpecItem>
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
            
            <div>
              <FeaturesSectionTitle>Available Styles</FeaturesSectionTitle>
              <div>
                {planData.exteriorStyles.map((style, index) => (
                  <div key={index} style={{ marginBottom: '0.5rem' }}>
                    {style}
                  </div>
                ))}
              </div>
            </div>
            
            <ContactInfo>
              <p>Questions about this plan?</p>
              <p style={{ marginTop: '0.5rem' }}>Visit the designer's website for more details</p>
            </ContactInfo>
          </PlanPricingCard>
        </PlanSidebar>
      </PlanDetailGrid>
    </Container>
  );
}