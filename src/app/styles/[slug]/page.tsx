'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

// Define the styles data with affiliate links
const styles = {
  'craftsman': {
    name: 'Craftsman',
    slug: 'craftsman',
    description: 'Craftsman style homes feature natural materials, wide front porches, exposed rafters, and handcrafted details.',
    image: 'https://picsum.photos/seed/craftsman/800/400',
    characteristics: {
      exterior: 'Low-pitched roofs, wide eaves, exposed rafters, tapered columns, natural materials',
      interior: 'Open floor plans, built-in furniture, natural woodwork, handcrafted details'
    },
    plans: [
      {
        id: 'c1',
        name: 'Craftsman Bungalow',
        beds: 3,
        baths: 2,
        sqft: 1950,
        price: 695,
        image: 'https://picsum.photos/seed/craftsman1/600/400',
        affiliateLink: 'https://www.dpbolvw.net/click-101433563-14548500?url=https%3A%2F%2Fwww.architecturaldesigns.com%2Fhouse-plans%2F3-bed-craftsman-bungalow-42624db'
      },
      {
        id: 'c2',
        name: 'Craftsman Cottage',
        beds: 2,
        baths: 2,
        sqft: 1650,
        price: 595,
        image: 'https://picsum.photos/seed/craftsman2/600/400',
        affiliateLink: 'https://www.dpbolvw.net/click-101433563-14548500?url=https%3A%2F%2Fwww.architecturaldesigns.com%2Fhouse-plans%2F2-bed-craftsman-cottage-24392tw'
      },
      {
        id: 'c3',
        name: 'Modern Craftsman',
        beds: 4,
        baths: 3,
        sqft: 2400,
        price: 795,
        image: 'https://picsum.photos/seed/craftsman3/600/400',
        affiliateLink: 'https://www.dpbolvw.net/click-101433563-14548500?url=https%3A%2F%2Fwww.architecturaldesigns.com%2Fhouse-plans%2F4-bed-modern-craftsman-with-open-concept-living-23702jd'
      }
    ]
  },
  'modern-farmhouse': {
    name: 'Modern Farmhouse',
    slug: 'modern-farmhouse',
    description: 'Modern Farmhouse designs blend contemporary features with rustic farmhouse elements for comfort and style.',
    image: 'https://picsum.photos/seed/farmhouse/800/400',
    characteristics: {
      exterior: 'Gable roofs, board and batten siding, metal accents, large windows, covered porches',
      interior: 'Open concept, neutral colors, wood elements, farmhouse sink, shiplap'
    },
    plans: [
      {
        id: 'mf1',
        name: 'Modern Farmhouse Plan',
        beds: 4,
        baths: 2.5,
        sqft: 2800,
        price: 795,
        image: 'https://picsum.photos/seed/farmhouse1/600/400',
        affiliateLink: 'https://www.dpbolvw.net/click-101433563-14548500?url=https%3A%2F%2Fwww.architecturaldesigns.com%2Fhouse-plans%2F4-bed-modern-farmhouse-plan-14682rk'
      },
      {
        id: 'mf2',
        name: 'Compact Farmhouse',
        beds: 3,
        baths: 2,
        sqft: 2100,
        price: 745,
        image: 'https://picsum.photos/seed/farmhouse2/600/400',
        affiliateLink: 'https://www.dpbolvw.net/click-101433563-14548500?url=https%3A%2F%2Fwww.architecturaldesigns.com%2Fhouse-plans%2F3-bed-compact-modern-farmhouse-plan-14701rk'
      }
    ]
  }
  // Add other styles as needed
};

export default function StylePage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const style = styles[slug];
  
  // This would be replaced with a redirect to a 404 page
  if (!style) {
    return <div>Style not found</div>;
  }
  
  return (
    <Container>
      <Breadcrumbs>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
        <BreadcrumbSeparator>›</BreadcrumbSeparator>
        <BreadcrumbLink href="/styles">Styles</BreadcrumbLink>
        <BreadcrumbSeparator>›</BreadcrumbSeparator>
        <span>{style.name}</span>
      </Breadcrumbs>
      
      <StyleHero>
        <StyleHeroImage>
          <Image 
            src={style.image} 
            alt={`${style.name} Style House`}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </StyleHeroImage>
        
        <StyleHeroContent>
          <StyleTitle>{style.name} House Plans</StyleTitle>
          <StyleDescription>{style.description}</StyleDescription>
          
          <CharacteristicsGrid>
            <CharacteristicsCard>
              <CharacteristicsTitle>Exterior Features</CharacteristicsTitle>
              <CharacteristicsText>{style.characteristics.exterior}</CharacteristicsText>
            </CharacteristicsCard>
            <CharacteristicsCard>
              <CharacteristicsTitle>Interior Features</CharacteristicsTitle>
              <CharacteristicsText>{style.characteristics.interior}</CharacteristicsText>
            </CharacteristicsCard>
          </CharacteristicsGrid>
        </StyleHeroContent>
      </StyleHero>
      
      <PlansSection>
        <SectionTitle>Popular {style.name} House Plans</SectionTitle>
        <PlansGrid>
          {style.plans.map(plan => (
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
                  <span>{plan.beds} Bed</span>
                  <span>{plan.baths} Bath</span>
                  <span>{plan.sqft.toLocaleString()} sqft</span>
                </PlanSpecs>
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
      </PlansSection>
    </Container>
  );
}

// Define all the styled components needed
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

const StyleHero = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const StyleHeroImage = styled.div`
  position: relative;
  height: 400px;
`;

const StyleHeroContent = styled.div`
  padding: 1.5rem;
`;

const StyleTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const StyleDescription = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const CharacteristicsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const CharacteristicsCard = styled.div`
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  border-radius: 0.375rem;
`;

const CharacteristicsTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

const CharacteristicsText = styled.p`
  color: var(--color-text-light);
`;

const PlansSection = styled.section`
  margin-top: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
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