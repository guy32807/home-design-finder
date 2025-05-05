import React from 'react';
import styled from 'styled-components';
import Button from '../ui/Button'; // Import the Button component
import { AFFILIATE_LINKS } from '../../constants/links';

export interface HousePlanCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  description: string;
  architect: string;
  style: string;
}

const Card = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: transform 0.3s ease;
  background-color: #fff;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 220px;
`;

const PlanImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlanContent = styled.div`
  padding: 1.25rem;
`;

const PlanName = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  font-family: ${({ theme }) => theme.typography.headingFontFamily};
`;

const PlanFeatures = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const Feature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FeatureValue = styled.span`
  font-weight: bold;
  margin-bottom: 0.25rem;
`;

const FeatureLabel = styled.span`
  color: ${({ theme }) => theme.colors.textLight};
`;

const PlanPrice = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const PlanActions = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledLink = styled.a`
  text-decoration: none;
`;

const HousePlanCard: React.FC<HousePlanCardProps> = ({
  id,
  name,
  image,
  price,
  bedrooms,
  bathrooms,
  squareFeet,
  description,
  architect,
  style
}) => {
  // Format price to USD with comma separators
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
  
  // Create affiliate link with plan ID
  const planAffiliateLink = `${AFFILIATE_LINKS.housePlans}?plan=${id}`;
  
  return (
    <Card>
      <ImageContainer>
        <PlanImage src={image} alt={name} />
      </ImageContainer>
      <PlanContent>
        <PlanName>{name}</PlanName>
        <PlanFeatures>
          <Feature>
            <FeatureValue>{bedrooms}</FeatureValue>
            <FeatureLabel>Beds</FeatureLabel>
          </Feature>
          <Feature>
            <FeatureValue>{bathrooms}</FeatureValue>
            <FeatureLabel>Baths</FeatureLabel>
          </Feature>
          <Feature>
            <FeatureValue>{squareFeet.toLocaleString()}</FeatureValue>
            <FeatureLabel>Sq Ft</FeatureLabel>
          </Feature>
        </PlanFeatures>
        <PlanPrice>{formattedPrice}</PlanPrice>
        <PlanActions>
          <StyledLink 
            href={planAffiliateLink} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button $primary>View Plan Details</Button>
          </StyledLink>
        </PlanActions>
      </PlanContent>
    </Card>
  );
};

export default HousePlanCard;