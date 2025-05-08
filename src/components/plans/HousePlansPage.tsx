'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import styled from 'styled-components';
import PlanCard from './PlanCard';
import FallbackImage from '../common/FallbackImage';
import { Plan } from '../../core/domain/entities';
import { usePlanUseCases } from '../../adapters/context/AppContext';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const BreadcrumbNav = styled.div`
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: #666;
  
  a {
    color: #4a6741;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
    color: #333;
  }
  
  p {
    color: #666;
    max-width: 800px;
    line-height: 1.6;
  }
`;

const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FilterSection = styled.div`
  flex: 1;
  min-width: 200px;
  
  @media (max-width: 768px) {
    min-width: 100%;
  }
  
  h3 {
    font-size: 1rem;
    margin-bottom: 0.75rem;
    color: #333;
  }
`;

const FilterOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  
  label {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    cursor: pointer;
    padding: 0.375rem 0.75rem;
    border-radius: 20px;
    background-color: white;
    border: 1px solid #ddd;
    transition: all 0.2s;
    
    &:hover {
      border-color: #4a6741;
    }
    
    &.active {
      background-color: #4a6741;
      color: white;
      border-color: #4a6741;
    }
    
    input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }
  }
`;

const SortAndResultsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const ResultCount = styled.div`
  font-size: 0.875rem;
  color: #666;
`;

const SortOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  label {
    font-size: 0.875rem;
    color: #666;
  }
  
  select {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: white;
    
    &:focus {
      outline: none;
      border-color: #4a6741;
    }
  }
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const AffiliatePromoBanner = styled.div`
  margin: 3rem 0;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  height: 200px;
  
  .banner-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background: linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%);
    color: white;
    text-align: center;
    
    h2 {
      font-size: 1.75rem;
      margin-bottom: 1rem;
    }
    
    p {
      margin-bottom: 1.5rem;
      max-width: 600px;
    }
    
    .promo-button {
      display: inline-block;
      background-color: #d9534f;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      font-weight: 600;
      text-decoration: none;
      transition: background-color 0.2s, transform 0.2s;
      
      &:hover {
        background-color: #c9302c;
        transform: translateY(-3px);
      }
    }
  }
`;

const PaginationContainer = styled.div`
  margin: 3rem 0;
  display: flex;
  justify-content: center;
`;

const Pagination = styled.div`
  display: flex;
  gap: 0.5rem;
  
  button {
    min-width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ddd;
    background-color: white;
    border-radius: 4px;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover:not(.active, .disabled) {
      border-color: #4a6741;
      color: #4a6741;
    }
    
    &.active {
      background-color: #4a6741;
      color: white;
      border-color: #4a6741;
    }
    
    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

interface FilterState {
  bedrooms: string[];
  bathrooms: string[];
  stories: string[];
  styles: string[];
  sqftRange: string;
  sort: string;
}

interface HousePlansPageProps {
  initialPlans: Plan[];
}

const HousePlansPage: React.FC<HousePlansPageProps> = ({ initialPlans }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planUseCases = usePlanUseCases();
  
  const [filters, setFilters] = useState<FilterState>({
    bedrooms: [],
    bathrooms: [],
    stories: [],
    styles: [],
    sqftRange: '',
    sort: 'popular'
  });
  
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [filteredPlans, setFilteredPlans] = useState<Plan[]>(initialPlans);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const plansPerPage = 12;
  
  useEffect(() => {
    if (!searchParams) return;
    
    const bedroomsParam = searchParams.getAll('bedrooms');
    const bathroomsParam = searchParams.getAll('bathrooms');
    const storiesParam = searchParams.getAll('stories');
    const stylesParam = searchParams.getAll('styles');
    const sqftParam = searchParams.get('sqft') || '';
    const sortParam = searchParams.get('sort') || 'popular';
    
    setFilters({
      bedrooms: bedroomsParam,
      bathrooms: bathroomsParam,
      stories: storiesParam,
      styles: stylesParam,
      sqftRange: sqftParam,
      sort: sortParam
    });
  }, [searchParams]);
  
  useEffect(() => {
    setLoading(true);
    
    let filtered = [...plans];
    
    if (filters.bedrooms.length > 0) {
      filtered = filtered.filter(plan => 
        filters.bedrooms.some(count => {
          const beds = plan.details?.bedrooms || 0;
          const filterValue = parseInt(count.replace('+', ''));
          return count.includes('+') ? beds >= filterValue : beds === filterValue;
        })
      );
    }
    
    if (filters.sort === 'price-low') {
      filtered.sort((a, b) => (a.pricing?.basePrice || 0) - (b.pricing?.basePrice || 0));
    } else if (filters.sort === 'price-high') {
      filtered.sort((a, b) => (b.pricing?.basePrice || 0) - (a.pricing?.basePrice || 0));
    } else if (filters.sort === 'sqft-small') {
      filtered.sort((a, b) => (a.details?.squareFeet || 0) - (b.details?.squareFeet || 0));
    } else if (filters.sort === 'sqft-large') {
      filtered.sort((a, b) => (b.details?.squareFeet || 0) - (a.details?.squareFeet || 0));
    }
    
    setFilteredPlans(filtered);
    setLoading(false);
  }, [filters, plans]);
  
  const indexOfLastPlan = page * plansPerPage;
  const indexOfFirstPlan = indexOfLastPlan - plansPerPage;
  const currentPlans = filteredPlans.slice(indexOfFirstPlan, indexOfLastPlan);
  const totalPages = Math.ceil(filteredPlans.length / plansPerPage);
  
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  const affiliateLink = "https://www.jdoqocy.com/click-101433563-14548500";
  
  return (
    <PageContainer>
      <BreadcrumbNav>
        <Link href="/">Home</Link> &gt; House Plans
      </BreadcrumbNav>
      
      <PageHeader>
        <h1>House Plans</h1>
        <p>
          Browse our collection of beautiful house plans in various styles, sizes, and features 
          to find your dream home design. Use the filters below to narrow down your search.
        </p>
      </PageHeader>
      
      <FilterBar>
        <FilterSection>
          <h3>Bedrooms</h3>
          <FilterOptions>
            {['1', '2', '3', '4', '5+'].map((count) => (
              <label 
                key={`bed-${count}`}
                className={filters.bedrooms.includes(count) ? 'active' : ''}
              >
                <input 
                  type="checkbox" 
                  checked={filters.bedrooms.includes(count)}
                  onChange={() => setFilters(prev => ({
                    ...prev,
                    bedrooms: prev.bedrooms.includes(count)
                      ? prev.bedrooms.filter(v => v !== count)
                      : [...prev.bedrooms, count]
                  }))}
                />
                {count}
              </label>
            ))}
          </FilterOptions>
        </FilterSection>
        
        <FilterSection>
          <h3>Bathrooms</h3>
          <FilterOptions>
            {['1', '1.5', '2', '2.5', '3+'].map((count) => (
              <label 
                key={`bath-${count}`}
                className={filters.bathrooms.includes(count) ? 'active' : ''}
              >
                <input 
                  type="checkbox" 
                  checked={filters.bathrooms.includes(count)}
                  onChange={() => setFilters(prev => ({
                    ...prev,
                    bathrooms: prev.bathrooms.includes(count)
                      ? prev.bathrooms.filter(v => v !== count)
                      : [...prev.bathrooms, count]
                  }))}
                />
                {count}
              </label>
            ))}
          </FilterOptions>
        </FilterSection>
        
        <FilterSection>
          <h3>Stories</h3>
          <FilterOptions>
            {['1', '1.5', '2', '3+'].map((count) => (
              <label 
                key={`story-${count}`}
                className={filters.stories.includes(count) ? 'active' : ''}
              >
                <input 
                  type="checkbox" 
                  checked={filters.stories.includes(count)}
                  onChange={() => setFilters(prev => ({
                    ...prev,
                    stories: prev.stories.includes(count)
                      ? prev.stories.filter(v => v !== count)
                      : [...prev.stories, count]
                  }))}
                />
                {count}
              </label>
            ))}
          </FilterOptions>
        </FilterSection>
        
        <FilterSection>
          <h3>Styles</h3>
          <FilterOptions>
            {['Modern Farmhouse', 'Craftsman', 'Ranch', 'Contemporary', 'Traditional'].map((style) => (
              <label 
                key={`style-${style}`}
                className={filters.styles.includes(style) ? 'active' : ''}
              >
                <input 
                  type="checkbox" 
                  checked={filters.styles.includes(style)}
                  onChange={() => setFilters(prev => ({
                    ...prev,
                    styles: prev.styles.includes(style)
                      ? prev.styles.filter(v => v !== style)
                      : [...prev.styles, style]
                  }))}
                />
                {style}
              </label>
            ))}
          </FilterOptions>
        </FilterSection>
      </FilterBar>
      
      <SortAndResultsBar>
        <ResultCount>
          {loading ? 'Loading plans...' : `${filteredPlans.length} plans found`}
        </ResultCount>
        
        <SortOptions>
          <label htmlFor="sort-options">Sort by:</label>
          <select 
            id="sort-options"
            value={filters.sort}
            onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price (Low to High)</option>
            <option value="price-high">Price (High to Low)</option>
            <option value="sqft-small">Square Feet (Small to Large)</option>
            <option value="sqft-large">Square Feet (Large to Small)</option>
          </select>
        </SortOptions>
      </SortAndResultsBar>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Loading house plans...</p>
        </div>
      ) : filteredPlans.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>No plans found matching your criteria. Try adjusting your filters.</p>
        </div>
      ) : (
        <>
          <PlansGrid>
            {currentPlans.map(plan => (
              <PlanCard 
                key={plan.id} 
                plan={plan} 
                affiliateType="house-plans-page"
              />
            ))}
          </PlansGrid>
          
          {filteredPlans.length > 6 && (
            <AffiliatePromoBanner>
              <FallbackImage 
                src="https://picsum.photos/seed/promo/1200/400"
                alt="Special offer on house plans"
                fill
                style={{ objectFit: 'cover' }}
                fallbackSrc="https://placehold.co/1200x400?text=Special+Offer"
              />
              <div className="banner-content">
                <h2>Limited Time Offer: 50% Off All House Plans</h2>
                <p>Get complete construction blueprints for any house plan at half the price! Offer ends soon.</p>
                <a 
                  href={affiliateLink}
                  className="promo-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get 50% Off Now
                </a>
              </div>
            </AffiliatePromoBanner>
          )}
          
          {totalPages > 1 && (
            <PaginationContainer>
              <Pagination>
                <button 
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  className={page === 1 ? 'disabled' : ''}
                  disabled={page === 1}
                  aria-label="Previous page"
                >
                  &lt;
                </button>
                
                {pageNumbers.map(number => (
                  <button
                    key={number}
                    onClick={() => setPage(number)}
                    className={page === number ? 'active' : ''}
                    aria-label={`Page ${number}`}
                    aria-current={page === number ? 'page' : undefined}
                  >
                    {number}
                  </button>
                ))}
                
                <button 
                  onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                  className={page === totalPages ? 'disabled' : ''}
                  disabled={page === totalPages}
                  aria-label="Next page"
                >
                  &gt;
                </button>
              </Pagination>
            </PaginationContainer>
          )}
        </>
      )}
    </PageContainer>
  );
};

export default HousePlansPage;