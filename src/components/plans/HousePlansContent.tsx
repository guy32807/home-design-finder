'use client'

import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import PlanCard from './PlanCard';
import { Plan } from '../../core/domain/entities';

const HousePlansContainer = styled.div`
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
  
  .filter-options {
    display: flex;
    gap: 1rem;
    
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
  
  select {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .search-link {
    background-color: #4a6741;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    text-decoration: none;
    
    &:hover {
      background-color: #3a5231;
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

interface HousePlansContentProps {
  plans: Plan[];
}

const HousePlansContent: React.FC<HousePlansContentProps> = ({ plans }) => {
  const [style, setStyle] = useState('');
  const [size, setSize] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  
  return (
    <HousePlansContainer>
      <PageHeader>
        <h1>House Plans</h1>
        <div className="breadcrumbs">
          <Link href="/">Home</Link> &gt; House Plans
        </div>
      </PageHeader>
      
      <FilterBar>
        <div className="filter-options">
          <select 
            aria-label="Style" 
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          >
            <option value="">All Styles</option>
            <option value="farmhouse">Farmhouse</option>
            <option value="modern">Modern</option>
            <option value="craftsman">Craftsman</option>
            <option value="ranch">Ranch</option>
            <option value="cottage">Cottage</option>
          </select>
          
          <select 
            aria-label="Square Feet"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="">Any Size</option>
            <option value="1000-1500">1000-1500 sq ft</option>
            <option value="1500-2000">1500-2000 sq ft</option>
            <option value="2000-2500">2000-2500 sq ft</option>
            <option value="2500-3000">2500-3000 sq ft</option>
            <option value="3000+">3000+ sq ft</option>
          </select>
          
          <select 
            aria-label="Bedrooms"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          >
            <option value="">Any Bedrooms</option>
            <option value="1">1+ Bedroom</option>
            <option value="2">2+ Bedrooms</option>
            <option value="3">3+ Bedrooms</option>
            <option value="4">4+ Bedrooms</option>
            <option value="5">5+ Bedrooms</option>
          </select>
        </div>
        
        <Link href="/search" className="search-link">
          Advanced Search
        </Link>
      </FilterBar>
      
      <PlansGrid>
        {plans.map(plan => (
          <PlanCard 
            key={plan.id} 
            plan={plan} 
            affiliateType="house-plans-gallery"
          />
        ))}
      </PlansGrid>
    </HousePlansContainer>
  );
};

export default HousePlansContent;