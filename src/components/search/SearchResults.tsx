'use client'

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { usePlanUseCases } from '../../adapters/context/AppContext';
import { PlanFilter, PlanSearchResult } from '../../core/domain/entities';
import SearchFilters from './SearchFilters';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .breadcrumbs {
    color: #666;
    font-size: 0.9rem;
    
    a {
      color: #4a6741;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  .results-count {
    color: #666;
  }
  
  .sort-by {
    display: flex;
    align-items: center;
    
    label {
      margin-right: 0.5rem;
      color: #666;
    }
    
    select {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: white;
    }
  }
`;

const SearchLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 280px 1fr;
  }
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  
  button {
    padding: 0.5rem 1rem;
    margin: 0 0.25rem;
    border: 1px solid #ddd;
    background-color: white;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover:not(:disabled) {
      background-color: #f0f0f0;
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    &.active {
      background-color: #4a6741;
      color: white;
      border-color: #4a6741;
    }
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem 0;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    color: #666;
    margin-bottom: 2rem;
  }
  
  .home-link {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: #4a6741;
    color: white;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 600;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: #3a5231;
    }
  }
`;

const SearchResults = () => {
  const searchParams = useSearchParams();
  const planUseCases = usePlanUseCases();
  
  const [results, setResults] = useState<PlanSearchResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<PlanFilter>({
    page: 1,
    limit: 12,
    sortBy: 'newest'
  });
  
  useEffect(() => {
    if (!searchParams) return; // Add safety check
    
    // Parse search parameters
    const keywords = searchParams.get('q');
    const style = searchParams.get('style');
    const category = searchParams.get('category');
    const bedroomsMin = searchParams.get('beds_min');
    const bedroomsMax = searchParams.get('beds_max');
    const squareFeetMin = searchParams.get('sqft_min');
    const squareFeetMax = searchParams.get('sqft_max');
    const sortBy = searchParams.get('sort') as PlanFilter['sortBy'];
    
    // Build filter from search params
    const newFilter: PlanFilter = {
      page: 1,
      limit: 12,
      keywords: keywords || undefined,
      style: style || undefined,
      category: category as any || undefined,
      bedroomsMin: bedroomsMin ? parseInt(bedroomsMin) : undefined,
      bedroomsMax: bedroomsMax ? parseInt(bedroomsMax) : undefined,
      squareFeetMin: squareFeetMin ? parseInt(squareFeetMin) : undefined,
      squareFeetMax: squareFeetMax ? parseInt(squareFeetMax) : undefined,
      sortBy: sortBy || 'newest',
    };
    
    setFilter(newFilter);
    
    // Load search results
    const performSearch = async () => {
      setLoading(true);
      try {
        const searchResults = await planUseCases.searchPlans(newFilter);
        setResults(searchResults);
      } catch (error) {
        console.error('Failed to search plans:', error);
      } finally {
        setLoading(false);
      }
    };
    
    performSearch();
  }, [searchParams, planUseCases]);
  
  const handleFilterChange = (newFilter: PlanFilter) => {
    setFilter({...newFilter, page: 1});
    
    const search = async () => {
      setLoading(true);
      try {
        const searchResults = await planUseCases.searchPlans(newFilter);
        setResults(searchResults);
      } catch (error) {
        console.error('Failed to search plans:', error);
      } finally {
        setLoading(false);
      }
    };
    
    search();
  };
  
  const handlePageChange = (page: number) => {
    const newFilter = {...filter, page};
    setFilter(newFilter);
    
    const search = async () => {
      setLoading(true);
      try {
        const searchResults = await planUseCases.searchPlans(newFilter);
        setResults(searchResults);
      } catch (error) {
        console.error('Failed to search plans:', error);
      } finally {
        setLoading(false);
      }
    };
    
    search();
    
    // Scroll to top
    window.scrollTo({top: 0, behavior: 'smooth'});
  };
  
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortBy = event.target.value as PlanFilter['sortBy'];
    const newFilter = {...filter, sortBy, page: 1};
    setFilter(newFilter);
    
    const search = async () => {
      setLoading(true);
      try {
        const searchResults = await planUseCases.searchPlans(newFilter);
        setResults(searchResults);
      } catch (error) {
        console.error('Failed to search plans:', error);
      } finally {
        setLoading(false);
      }
    };
    
    search();
  };
  
  const renderPaginationButtons = () => {
    if (!results) return null;
    
    const {page, totalPages} = results;
    const buttons = [];
    
    // Previous button
    buttons.push(
      <button 
        key="prev" 
        onClick={() => handlePageChange(page - 1)}
        disabled={page <= 1}
      >
        &laquo;
      </button>
    );
    
    // Page buttons
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, page + 2);
    
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button 
          key={i} 
          onClick={() => handlePageChange(i)}
          className={i === page ? 'active' : ''}
        >
          {i}
        </button>
      );
    }
    
    // Next button
    buttons.push(
      <button 
        key="next" 
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= totalPages}
      >
        &raquo;
      </button>
    );
    
    return buttons;
  };
  
  return (
    <Container>
      <PageHeader>
        <h1>Search Results</h1>
        <div className="breadcrumbs">
          <Link href="/">Home</Link> &gt; Search{' '}
          {filter.keywords && <span>for &quot;{filter.keywords}&quot;</span>}
        </div>
      </PageHeader>
      
      <SearchLayout>
        <SearchFilters 
          initialFilter={filter} 
          onFilterChange={handleFilterChange} 
        />
        
        <div>
          {loading ? (
            <p>Loading results...</p>
          ) : results && results.items.length > 0 ? (
            <>
              <ResultsHeader>
                <div className="results-count">
                  {results.total} plans found
                </div>
                <div className="sort-by">
                  <label htmlFor="sort">Sort by:</label>
                  <select 
                    id="sort" 
                    value={filter.sortBy || 'newest'}
                    onChange={handleSortChange}
                  >
                    <option value="newest">Newest</option>
                    <option value="popular">Most Popular</option>
                    <option value="price_low_high">Price: Low to High</option>
                    <option value="price_high_low">Price: High to Low</option>
                    <option value="square_feet_low_high">Square Feet: Low to High</option>
                    <option value="square_feet_high_low">Square Feet: High to Low</option>
                  </select>
                </div>
              </ResultsHeader>
              
              <ResultsGrid>
                {results.items.map(plan => (
                  <PlanCard key={plan.id}>
                    <Link href={`/house-plans/${plan.slug}`}>
                      <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3' }}>
                        <Image 
                          src={plan.imageUrl || '/placeholder.jpg'} 
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
                        <span>{plan.bedrooms} beds</span>
                        <span>{plan.bathrooms} baths</span>
                        <span>{plan.squareFeet.toLocaleString()} sq ft</span>
                      </div>
                      <div className="price">${plan.price.toLocaleString()}</div>
                      <Link href={`/house-plans/${plan.slug}`} className="plan-link">
                        View Plan
                      </Link>
                    </PlanInfo>
                  </PlanCard>
                ))}
              </ResultsGrid>
              
              {results.totalPages > 1 && (
                <Pagination>
                  {renderPaginationButtons()}
                </Pagination>
              )}
            </>
          ) : (
            <NoResults>
              <h3>No plans match your search criteria</h3>
              <p>Try adjusting your filters or search with different keywords</p>
              <Link href="/" className="home-link">
                Go to Home Page
              </Link>
            </NoResults>
          )}
        </div>
      </SearchLayout>
    </Container>
  );
};

export default SearchResults;