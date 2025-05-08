'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Plan } from '../../core/domain/entities';
import { usePlanUseCases } from '../../adapters/context/AppContext';
import PlanCard from '../plans/PlanCard';
import FallbackImage from '../common/FallbackImage';

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

const SearchHeader = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2.25rem;
    margin-bottom: 0.75rem;
    color: #333;
  }
  
  p {
    color: #666;
  }
`;

const SearchFilters = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const FiltersForm = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  
  label {
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  select, input {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    
    &:focus {
      outline: none;
      border-color: #4a6741;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  button {
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .search-button {
    background-color: #4a6741;
    color: white;
    border: none;
    
    &:hover {
      background-color: #3a5231;
    }
  }
  
  .reset-button {
    background-color: transparent;
    color: #666;
    border: 1px solid #ddd;
    
    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const ResultsCount = styled.div`
  font-size: 0.875rem;
  color: #666;
`;

const SortControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  label {
    font-size: 0.875rem;
    color: #666;
  }
  
  select {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    
    &:focus {
      outline: none;
      border-color: #4a6741;
    }
  }
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  p {
    color: #666;
    margin-bottom: 1.5rem;
  }
  
  .suggestions {
    margin-top: 2rem;
    
    h3 {
      font-size: 1.25rem;
      margin-bottom: 1rem;
      color: #333;
    }
    
    ul {
      list-style: none;
      padding: 0;
      text-align: left;
      max-width: 500px;
      margin: 0 auto;
      
      li {
        margin-bottom: 0.5rem;
        
        a {
          color: #4a6741;
          text-decoration: none;
          
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
`;

const AffiliatePromo = styled.div`
  margin: 3rem 0;
  position: relative;
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  
  .promo-content {
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
    
    a {
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
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const Pagination = styled.div`
  display: flex;
  gap: 0.5rem;
  
  button {
    width: 40px;
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

interface SearchParams {
  q: string;
  bedrooms: string;
  bathrooms: string;
  floors: string;
  style: string;
  sqft: string;
}

interface SearchResultsPageProps {
  initialPlans: Plan[];
  searchParams: SearchParams;
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ initialPlans, searchParams }) => {
  const router = useRouter();
  const planUseCases = usePlanUseCases();
  
  // State
  const [searchTerm, setSearchTerm] = useState(searchParams.q);
  const [bedroomsFilter, setBedroomsFilter] = useState(searchParams.bedrooms);
  const [bathroomsFilter, setBathroomsFilter] = useState(searchParams.bathrooms);
  const [floorsFilter, setFloorsFilter] = useState(searchParams.floors);
  const [styleFilter, setStyleFilter] = useState(searchParams.style);
  const [sqftFilter, setSqftFilter] = useState(searchParams.sqft);
  const [sortOrder, setSortOrder] = useState('popular');
  
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [filteredPlans, setFilteredPlans] = useState<Plan[]>(initialPlans);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const plansPerPage = 12;
  
  // Apply filters whenever they change
  useEffect(() => {
    setLoading(true);
    
    // Client-side filtering
    let filtered = [...plans];
    
    // Apply filters
    if (searchParams.q) {
      const searchLower = searchParams.q.toLowerCase();
      filtered = filtered.filter(
        plan => 
          plan.name.toLowerCase().includes(searchLower) ||
          plan.description?.toLowerCase().includes(searchLower) ||
          plan.style?.toLowerCase().includes(searchLower) ||
          plan.planNumber?.toLowerCase().includes(searchLower)
      );
    }
    
    if (searchParams.bedrooms) {
      filtered = filtered.filter(
        plan => plan.details?.bedrooms >= parseInt(searchParams.bedrooms)
      );
    }
    
    if (searchParams.bathrooms) {
      filtered = filtered.filter(
        plan => plan.details?.bathrooms >= parseInt(searchParams.bathrooms)
      );
    }
    
    if (searchParams.floors) {
      filtered = filtered.filter(
        plan => plan.details?.stories === parseInt(searchParams.floors)
      );
    }
    
    if (searchParams.style) {
      filtered = filtered.filter(
        plan => plan.style?.toLowerCase() === searchParams.style.toLowerCase()
      );
    }
    
    if (searchParams.sqft) {
      if (searchParams.sqft.includes('-')) {
        const [min, max] = searchParams.sqft.split('-').map(Number);
        filtered = filtered.filter(
          plan => 
            plan.details?.squareFeet >= min && 
            plan.details?.squareFeet <= max
        );
      } else if (searchParams.sqft.startsWith('under-')) {
        const max = parseInt(searchParams.sqft.replace('under-', ''));
        filtered = filtered.filter(
          plan => plan.details?.squareFeet <= max
        );
      } else if (searchParams.sqft.endsWith('+')) {
        const min = parseInt(searchParams.sqft.replace('+', ''));
        filtered = filtered.filter(
          plan => plan.details?.squareFeet >= min
        );
      }
    }
    
    // Apply sorting
    if (sortOrder === 'price-low') {
      filtered.sort((a, b) => (a.pricing?.basePrice || 0) - (b.pricing?.basePrice || 0));
    } else if (sortOrder === 'price-high') {
      filtered.sort((a, b) => (b.pricing?.basePrice || 0) - (a.pricing?.basePrice || 0));
    } else if (sortOrder === 'sqft-small') {
      filtered.sort((a, b) => (a.details?.squareFeet || 0) - (b.details?.squareFeet || 0));
    } else if (sortOrder === 'sqft-large') {
      filtered.sort((a, b) => (b.details?.squareFeet || 0) - (a.details?.squareFeet || 0));
    }
    
    setFilteredPlans(filtered);
    setLoading(false);
  }, [plans, searchParams, sortOrder]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Build the search query
    const params = new URLSearchParams();
    if (searchTerm) params.append('q', searchTerm);
    if (bedroomsFilter) params.append('bedrooms', bedroomsFilter);
    if (bathroomsFilter) params.append('bathrooms', bathroomsFilter);
    if (floorsFilter) params.append('floors', floorsFilter);
    if (styleFilter) params.append('style', styleFilter);
    if (sqftFilter) params.append('sqft', sqftFilter);
    
    // Redirect to search results with new params
    router.push(`/search?${params.toString()}`);
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setBedroomsFilter('');
    setBathroomsFilter('');
    setFloorsFilter('');
    setStyleFilter('');
    setSqftFilter('');
    router.push('/search');
  };
  
  // Pagination logic
  const indexOfLastPlan = page * plansPerPage;
  const indexOfFirstPlan = indexOfLastPlan - plansPerPage;
  const currentPlans = filteredPlans.slice(indexOfFirstPlan, indexOfLastPlan);
  const totalPages = Math.ceil(filteredPlans.length / plansPerPage);
  
  // Generate pagination numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  // Create a descriptive search title
  const getSearchTitle = () => {
    const parts = [];
    
    if (searchParams.q) parts.push(`"${searchParams.q}"`);
    if (searchParams.bedrooms) parts.push(`${searchParams.bedrooms}+ Bedroom`);
    if (searchParams.bathrooms) parts.push(`${searchParams.bathrooms}+ Bathroom`);
    if (searchParams.floors) parts.push(`${searchParams.floors} Story`);
    if (searchParams.style) parts.push(searchParams.style);
    
    if (searchParams.sqft) {
      if (searchParams.sqft.includes('-')) {
        const [min, max] = searchParams.sqft.split('-');
        parts.push(`${min}-${max} sq ft`);
      } else if (searchParams.sqft.startsWith('under-')) {
        parts.push(`Under ${searchParams.sqft.replace('under-', '')} sq ft`);
      } else if (searchParams.sqft.endsWith('+')) {
        parts.push(`Over ${searchParams.sqft.replace('+', '')} sq ft`);
      }
    }
    
    if (parts.length > 0) {
      return parts.join(' ');
    }
    
    return 'All House Plans';
  };
  
  // Your affiliate link
  const affiliateLink = "https://www.jdoqocy.com/click-101433563-14548500";
  
  return (
    <Container>
      <BreadcrumbNav>
        <Link href="/">Home</Link> &gt; Search Results
      </BreadcrumbNav>
      
      <SearchHeader>
        <h1>Search Results: {getSearchTitle()}</h1>
        <p>Use the filters below to refine your search.</p>
      </SearchHeader>
      
      <SearchFilters>
        <FiltersForm onSubmit={handleSearch}>
          <FormGroup>
            <label htmlFor="search-term">Search</label>
            <input 
              type="text" 
              id="search-term"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search plans..."
            />
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="bedrooms">Bedrooms</label>
            <select 
              id="bedrooms"
              value={bedroomsFilter}
              onChange={(e) => setBedroomsFilter(e.target.value)}
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="bathrooms">Bathrooms</label>
            <select 
              id="bathrooms"
              value={bathroomsFilter}
              onChange={(e) => setBathroomsFilter(e.target.value)}
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="1.5">1.5+</option>
              <option value="2">2+</option>
              <option value="2.5">2.5+</option>
              <option value="3">3+</option>
            </select>
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="floors">Stories</label>
            <select 
              id="floors"
              value={floorsFilter}
              onChange={(e) => setFloorsFilter(e.target.value)}
            >
              <option value="">Any</option>
              <option value="1">1 Story</option>
              <option value="2">2 Stories</option>
              <option value="3">3+ Stories</option>
            </select>
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="style">Style</label>
            <select 
              id="style"
              value={styleFilter}
              onChange={(e) => setStyleFilter(e.target.value)}
            >
              <option value="">Any Style</option>
              <option value="modern-farmhouse">Modern Farmhouse</option>
              <option value="craftsman">Craftsman</option>
              <option value="ranch">Ranch</option>
              <option value="contemporary">Contemporary</option>
              <option value="traditional">Traditional</option>
              <option value="cottage">Cottage</option>
            </select>
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="sqft">Square Feet</label>
            <select 
              id="sqft"
              value={sqftFilter}
              onChange={(e) => setSqftFilter(e.target.value)}
            >
              <option value="">Any Size</option>
              <option value="under-1000">Under 1,000</option>
              <option value="1000-1500">1,000-1,500</option>
              <option value="1500-2000">1,500-2,000</option>
              <option value="2000-2500">2,000-2,500</option>
              <option value="2500-3000">2,500-3,000</option>
              <option value="3000+">Over 3,000</option>
            </select>
          </FormGroup>
          
          <ButtonGroup>
            <button type="submit" className="search-button">
              Search Plans
            </button>
            <button type="button" className="reset-button" onClick={resetFilters}>
              Reset Filters
            </button>
          </ButtonGroup>
        </FiltersForm>
      </SearchFilters>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>Searching for plans...</p>
        </div>
      ) : filteredPlans.length === 0 ? (
        <NoResults>
          <h2>No Plans Match Your Search Criteria</h2>
          <p>Try adjusting your filters or browse our popular house plan categories below.</p>
          
          <div className="suggestions">
            <h3>Popular Categories</h3>
            <ul>
              <li><Link href="/styles/modern-farmhouse">Modern Farmhouse Plans</Link></li>
              <li><Link href="/styles/craftsman">Craftsman House Plans</Link></li>
              <li><Link href="/collections/small-house-plans">Small House Plans</Link></li>
              <li><Link href="/collections/open-concept">Open Concept Floor Plans</Link></li>
              <li><Link href="/collections/with-basement">House Plans with Basement</Link></li>
            </ul>
          </div>
        </NoResults>
      ) : (
        <>
          <ResultsHeader>
            <ResultsCount>
              Showing {indexOfFirstPlan + 1}-{Math.min(indexOfLastPlan, filteredPlans.length)} of {filteredPlans.length} plans
            </ResultsCount>
            
            <SortControls>
              <label htmlFor="sort-order">Sort by:</label>
              <select 
                id="sort-order"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="sqft-small">Square Feet (Small to Large)</option>
                <option value="sqft-large">Square Feet (Large to Small)</option>
              </select>
            </SortControls>
          </ResultsHeader>
          
          <ResultsGrid>
            {currentPlans.map(plan => (
              <PlanCard 
                key={plan.id} 
                plan={plan} 
                affiliateType="search-results"
              />
            ))}
          </ResultsGrid>
          
          <AffiliatePromo>
            <FallbackImage 
              src="https://picsum.photos/seed/offer/1200/400"
              alt="Special offer on house plans"
              fill
              style={{ objectFit: 'cover' }}
              fallbackSrc="https://placehold.co/1200x400?text=Special+Offer"
            />
            <div className="promo-content">
              <h2>50% Off All House Plans - Limited Time Offer!</h2>
              <a 
                href={affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Claim Your Discount Now
              </a>
            </div>
          </AffiliatePromo>
          
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

export default SearchResultsPage;