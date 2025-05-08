'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import FallbackImage from '../common/FallbackImage';
import PlanCard from '../plans/PlanCard';
import { Plan } from '../../core/domain/entities';

// Define all styled components
const Container = styled.div`
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

const Hero = styled.div`
  position: relative;
  height: 350px;
  margin-bottom: 2rem;
  border-radius: 8px;
  overflow: hidden;
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 2rem;
    color: white;
    
    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      
      @media (max-width: 768px) {
        font-size: 2rem;
      }
    }
    
    p {
      max-width: 800px;
      opacity: 0.9;
    }
  }
`;

const StyleInfo = styled.div`
  margin-bottom: 2rem;
  
  .style-description {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
    
    @media (min-width: 768px) {
      grid-template-columns: 2fr 1fr;
    }
    
    .main-content {
      line-height: 1.6;
      color: #333;
      
      h2 {
        font-size: 1.75rem;
        margin-bottom: 1rem;
        color: #333;
      }
      
      p {
        margin-bottom: 1rem;
      }
    }
    
    .side-content {
      .quick-facts {
        background-color: #f8f9fa;
        border-radius: 8px;
        padding: 1.5rem;
        
        h3 {
          font-size: 1.25rem;
          margin-bottom: 1rem;
          color: #333;
        }
        
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          
          li {
            padding: 0.5rem 0;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            
            &:last-child {
              border-bottom: none;
            }
            
            span {
              &:first-child {
                font-weight: 600;
                color: #333;
              }
              
              &:last-child {
                color: #666;
              }
            }
          }
        }
      }
    }
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

interface CollectionDetail {
  id: string;
  name: string;
  slug: string;
  description: string;
  fullDescription: string;
  image: string;
  category: string;
}

interface CollectionDetailPageProps {
  collection: CollectionDetail;
  initialPlans: Plan[];
}

const CollectionDetailPage: React.FC<CollectionDetailPageProps> = ({ collection, initialPlans }) => {
  const [filters, setFilters] = useState({
    bedrooms: [] as string[],
    bathrooms: [] as string[],
    stories: [] as string[],
    sqftRange: '',
    sort: 'popular'
  });
  
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [filteredPlans, setFilteredPlans] = useState<Plan[]>(initialPlans);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const plansPerPage = 12;
  
  // Apply filtering
  useEffect(() => {
    setLoading(true);
    
    // Filter plans based on selected filters
    let filtered = [...initialPlans];
    
    // Apply each filter
    if (filters.bedrooms.length > 0) {
      filtered = filtered.filter(plan => 
        filters.bedrooms.some(count => {
          const beds = plan.details?.bedrooms || 0;
          const filterValue = parseInt(count.replace('+', ''));
          return count.includes('+') ? beds >= filterValue : beds === filterValue;
        })
      );
    }
    
    if (filters.bathrooms.length > 0) {
      filtered = filtered.filter(plan => 
        filters.bathrooms.some(count => {
          const baths = plan.details?.bathrooms || 0;
          const filterValue = parseFloat(count.replace('+', ''));
          return count.includes('+') ? baths >= filterValue : baths === filterValue;
        })
      );
    }
    
    if (filters.stories.length > 0) {
      filtered = filtered.filter(plan => 
        filters.stories.some(count => {
          const storyCount = plan.details?.stories || 0;
          const filterValue = parseFloat(count.replace('+', ''));
          return count.includes('+') ? storyCount >= filterValue : storyCount === filterValue;
        })
      );
    }
    
    if (filters.sqftRange) {
      if (filters.sqftRange.includes('-')) {
        const [min, max] = filters.sqftRange.split('-').map(Number);
        filtered = filtered.filter(
          plan => 
            plan.details?.squareFeet >= min && 
            plan.details?.squareFeet <= max
        );
      } else if (filters.sqftRange.startsWith('under-')) {
        const max = parseInt(filters.sqftRange.replace('under-', ''));
        filtered = filtered.filter(
          plan => plan.details?.squareFeet <= max
        );
      } else if (filters.sqftRange.endsWith('+')) {
        const min = parseInt(filters.sqftRange.replace('+', ''));
        filtered = filtered.filter(
          plan => plan.details?.squareFeet >= min
        );
      }
    }
    
    // Apply sorting
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
  }, [filters, initialPlans]);
  
  const handleFilterChange = (category: keyof typeof filters, value: string) => {
    setFilters(prev => {
      // For multi-select filters
      if (Array.isArray(prev[category])) {
        const currentValues = prev[category] as string[];
        const newValues = currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value];
        
        return { ...prev, [category]: newValues };
      }
      
      // For single-select filters
      return { ...prev, [category]: value };
    });
    
    // Reset to first page when changing filters
    setPage(1);
  };
  
  // Get currently displayed plans based on pagination
  const indexOfLastPlan = page * plansPerPage;
  const indexOfFirstPlan = indexOfLastPlan - plansPerPage;
  const currentPlans = filteredPlans.slice(indexOfFirstPlan, indexOfLastPlan);
  const totalPages = Math.ceil(filteredPlans.length / plansPerPage);
  
  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  // Your affiliate link
  const affiliateLink = "https://www.jdoqocy.com/click-101433563-14548500";
  
  return (
    <Container>
      <BreadcrumbNav>
        <Link href="/">Home</Link> &gt; <Link href="/collections">Collections</Link> &gt; {collection.name}
      </BreadcrumbNav>
      
      <Hero>
        <FallbackImage 
          src={collection.image}
          alt={collection.name}
          fill
          style={{ objectFit: 'cover' }}
          fallbackSrc={`https://placehold.co/1200x500?text=${encodeURIComponent(collection.name)}`}
          priority
        />
        <div className="overlay">
          <h1>{collection.name}</h1>
          <p>{collection.description}</p>
        </div>
      </Hero>
      
      <StyleInfo>
        <div className="style-description">
          <div className="main-content">
            <h2>About This Collection</h2>
            <div dangerouslySetInnerHTML={{ __html: collection.fullDescription }} />
          </div>
          
          <div className="side-content">
            <div className="quick-facts">
              <h3>Collection Info</h3>
              <ul>
                <li>
                  <span>Category</span>
                  <span>{collection.category}</span>
                </li>
                <li>
                  <span>Available Plans</span>
                  <span>{filteredPlans.length}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </StyleInfo>
      
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
                  onChange={() => handleFilterChange('bedrooms', count)}
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
                  onChange={() => handleFilterChange('bathrooms', count)}
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
                  onChange={() => handleFilterChange('stories', count)}
                />
                {count}
              </label>
            ))}
          </FilterOptions>
        </FilterSection>
        
        <FilterSection>
          <h3>Square Feet</h3>
          <FilterOptions>
            <select
              value={filters.sqftRange}
              onChange={(e) => handleFilterChange('sqftRange', e.target.value)}
              style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="">Any Size</option>
              <option value="under-1000">Under 1,000</option>
              <option value="1000-1500">1,000-1,500</option>
              <option value="1500-2000">1,500-2,000</option>
              <option value="2000-2500">2,000-2,500</option>
              <option value="2500-3000">2,500-3,000</option>
              <option value="3000+">Over 3,000</option>
            </select>
          </FilterOptions>
        </FilterSection>
      </FilterBar>
      
      <SortAndResultsBar>
        <ResultCount>
          {loading ? 'Loading plans...' : `${filteredPlans.length} plans found in this collection`}
        </ResultCount>
        
        <SortOptions>
          <label htmlFor="sort-options">Sort by:</label>
          <select 
            id="sort-options"
            value={filters.sort}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
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
                affiliateType="collection-page"
              />
            ))}
          </PlansGrid>
          
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
    </Container>
  );
};

export default CollectionDetailPage;