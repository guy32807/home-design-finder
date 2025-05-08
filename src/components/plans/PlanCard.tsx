'use client'

import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Plan } from '../../core/domain/entities';
import { usePlanUseCases } from '../../adapters/context/AppContext';
import FallbackImage from '../common/FallbackImage';

const Card = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const PlanTagContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const PlanTag = styled.span`
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  font-weight: 500;
`;

const PlanDetails = styled.div`
  padding: 1.25rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const PlanName = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #333;
  
  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      color: #4a6741;
    }
  }
`;

const PlanMetrics = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: #666;
`;

const PlanPrice = styled.div`
  font-weight: 700;
  color: #4a6741;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
`;

const PrimaryButton = styled.a`
  display: inline-block;
  background-color: #d9534f;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.875rem;
  text-align: center;
  flex: 1;
  transition: background-color 0.2s, transform 0.2s;
  
  &:hover {
    background-color: #c9302c;
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-block;
  background-color: transparent;
  color: #4a6741;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #4a6741;
  text-decoration: none;
  font-size: 0.875rem;
  text-align: center;
  flex: 1;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f5f8f5;
  }
`;

interface PlanCardProps {
  plan: Plan;
  affiliateType?: string;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, affiliateType = 'plan-card' }) => {
  const planUseCases = usePlanUseCases();
  
  const handleBuyClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Don't prevent default so the link navigation happens normally
    try {
      // Track the click for analytics
      await planUseCases.trackAffiliateLinkClick(
        plan.id,
        plan.category || 'uncategorized',
        affiliateType
      );
    } catch (error) {
      console.error('Error tracking affiliate click:', error);
    }
  };
  
  // Get main image or use fallback
  const mainImage = 
    plan.images?.find(img => img.isPrimary) || 
    plan.images?.[0] || 
    { url: `https://placehold.co/600x400?text=${encodeURIComponent(plan.name)}`, alt: plan.name };
  
  // Generate affiliate link
  const affiliateUrl = planUseCases.generateAffiliateLink(plan, affiliateType);
  
  // Calculate basic metrics for display
  const { squareFeet, bedrooms, bathrooms, stories } = plan.details || {};
  const price = plan.pricing?.basePrice ? `$${plan.pricing.basePrice}` : 'Contact for pricing';
  
  // Determine if plan has special features
  const hasBasement = plan.details?.hasBasement;
  const isPopular = true; // In a real app, this would be based on actual data
  
  return (
    <Card>
      <ImageContainer>
        <PlanTagContainer>
          {isPopular && <PlanTag>Popular</PlanTag>}
          {hasBasement && <PlanTag>Basement</PlanTag>}
        </PlanTagContainer>
        
        <Link href={`/house-plans/${plan.slug}`}>
          <FallbackImage 
            src={mainImage.url} 
            alt={mainImage.alt || plan.name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fallbackSrc={`https://placehold.co/600x400?text=${encodeURIComponent(plan.name)}`}
          />
        </Link>
      </ImageContainer>
      
      <PlanDetails>
        <PlanName>
          <Link href={`/house-plans/${plan.slug}`}>
            {plan.name}
          </Link>
        </PlanName>
        
        <PlanMetrics>
          {squareFeet && <span>{squareFeet} sq ft</span>}
          {bedrooms && <span>{bedrooms} bed</span>}
          {bathrooms && <span>{bathrooms} bath</span>}
          {stories && <span>{stories} story</span>}
        </PlanMetrics>
        
        <PlanPrice>{price}</PlanPrice>
        
        <ButtonContainer>
          <PrimaryButton 
            href={affiliateUrl} 
            onClick={handleBuyClick}
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy Plan
          </PrimaryButton>
          
          <SecondaryButton href={`/house-plans/${plan.slug}`}>
            Details
          </SecondaryButton>
        </ButtonContainer>
      </PlanDetails>
    </Card>
  );
};

export default PlanCard;