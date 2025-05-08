'use client'

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { usePlanUseCases } from '../../adapters/context/AppContext';
import { Plan } from '../../core/domain/entities';

const Section = styled.section`
  padding: 4rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  
  &:after {
    content: "";
    display: block;
    width: 80px;
    height: 3px;
    background-color: #4a6741;
    margin: 0.5rem auto 0;
  }
`;

const PlanGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const PlanCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const PlanInfo = styled.div`
  padding: 1.5rem;
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  
  .plan-meta {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    color: #666;
  }
  
  .price {
    font-weight: 600;
    color: #4a6741;
    margin-bottom: 1rem;
  }
  
  .plan-link {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: transparent;
    border: 1px solid #4a6741;
    color: #4a6741;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s;
    
    &:hover {
      background-color: #4a6741;
      color: white;
    }
  }
`;

const FeaturedPlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const planUseCases = usePlanUseCases();
  
  useEffect(() => {
    const loadPlans = async () => {
      try {
        const featuredPlans = await planUseCases.getFeaturedPlans('house', 6);
        setPlans(featuredPlans);
      } catch (error) {
        console.error('Failed to load featured plans:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadPlans();
  }, [planUseCases]);
  
  return (
    <Section>
      <SectionTitle>Featured House Plans</SectionTitle>
      
      {loading ? (
        <p>Loading featured plans...</p>
      ) : (
        <PlanGrid>
          {plans.map(plan => (
            <PlanCard key={plan.id}>
              <Link href={`/house-plans/${plan.slug}`}>
                <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3' }}>
                  <Image 
                    src={plan.images[0]?.url || '/placeholder.jpg'} 
                    alt={plan.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </Link>
              <PlanInfo>
                <h3>{plan.name}</h3>
                <div className="plan-meta">
                  <span>Plan #{plan.planNumber}</span>
                  <span>{plan.style}</span>
                </div>
                <div className="plan-meta">
                  <span>{plan.details.bedrooms} beds</span>
                  <span>{plan.details.bathrooms} baths</span>
                  <span>{plan.details.squareFeet.toLocaleString()} sq ft</span>
                </div>
                <div className="price">${plan.pricing.basePrice.toLocaleString()}</div>
                <Link 
                  href={planUseCases.generateAffiliateLink(plan, 'home-featured')} 
                  className="plan-link"
                  onClick={() => planUseCases.trackAffiliateLinkClick(plan.id, plan.category, 'home-featured')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Plan
                </Link>
              </PlanInfo>
            </PlanCard>
          ))}
        </PlanGrid>
      )}
    </Section>
  );
};

export default FeaturedPlans;