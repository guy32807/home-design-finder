import React, { useState } from 'react';
import styled from 'styled-components';

interface FiltersProps {
  onFilterChange: (filters: any) => void;
}

const FiltersContainer = styled.div`
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const FiltersHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const FiltersTitle = styled.h2`
  font-size: 1.25rem;
  margin: 0;
`;

const ToggleFiltersButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  
  &:hover {
    text-decoration: underline;
  }
  
  svg {
    margin-left: 0.5rem;
  }
`;

const FiltersGrid = styled.div<{ isVisible: boolean }>`
  display: ${props => props.isVisible ? 'grid' : 'none'};
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FilterGroup = styled.div`
  margin-bottom: 1rem;
`;

const FilterLabel = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

const RangeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RangeInput = styled.input`
  width: 100%;
  margin: 0.5rem 0;
`;

const RangeValues = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const CheckboxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  
  input {
    margin-right: 0.5rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ResetButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const ApplyButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [filters, setFilters] = useState({
    minBeds: 0,
    maxBeds: 5,
    minBaths: 0,
    maxBaths: 5,
    minSize: 500,
    maxSize: 5000,
    styles: [] as string[],
    stories: [] as number[],
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      // Handle checkbox
      if (name.startsWith('style-')) {
        const style = name.replace('style-', '');
        const newStyles = checked 
          ? [...filters.styles, style]
          : filters.styles.filter(s => s !== style);
        
        setFilters({...filters, styles: newStyles});
      } else if (name.startsWith('stories-')) {
        const stories = parseInt(name.replace('stories-', ''));
        const newStories = checked
          ? [...filters.stories, stories]
          : filters.stories.filter(s => s !== stories);
          
        setFilters({...filters, stories: newStories});
      }
    } else {
      // Handle range inputs
      setFilters({...filters, [name]: parseFloat(value)});
    }
  };
  
  const handleReset = () => {
    setFilters({
      minBeds: 0,
      maxBeds: 5,
      minBaths: 0,
      maxBaths: 5,
      minSize: 500,
      maxSize: 5000,
      styles: [],
      stories: [],
    });
  };
  
  const handleApply = () => {
    onFilterChange(filters);
  };
  
  const styles = [
    'Modern', 'Farmhouse', 'Craftsman', 'Contemporary', 
    'Colonial', 'Mediterranean', 'Ranch', 'Traditional'
  ];
  
  return (
    <FiltersContainer>
      <FiltersHeader>
        <FiltersTitle>Filter House Plans</FiltersTitle>
        <ToggleFiltersButton onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'Hide Filters' : 'Show Filters'}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d={isVisible 
              ? "M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
              : "M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            } />
          </svg>
        </ToggleFiltersButton>
      </FiltersHeader>
      
      <FiltersGrid isVisible={isVisible}>
        <FilterGroup>
          <FilterLabel>Bedrooms</FilterLabel>
          <RangeInput 
            type="range"
            min="0"
            max="10"
            step="1"
            name="maxBeds"
            value={filters.maxBeds}
            onChange={handleChange}
          />
          <RangeValues>
            <span>Any</span>
            <span>{filters.maxBeds}+ beds</span>
          </RangeValues>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Bathrooms</FilterLabel>
          <RangeInput 
            type="range"
            min="0"
            max="10"
            step="0.5"
            name="maxBaths"
            value={filters.maxBaths}
            onChange={handleChange}
          />
          <RangeValues>
            <span>Any</span>
            <span>{filters.maxBaths}+ baths</span>
          </RangeValues>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Square Footage</FilterLabel>
          <RangeInput 
            type="range"
            min="500"
            max="10000"
            step="100"
            name="maxSize"
            value={filters.maxSize}
            onChange={handleChange}
          />
          <RangeValues>
            <span>Any</span>
            <span>Up to {filters.maxSize.toLocaleString()} sqft</span>
          </RangeValues>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Home Style</FilterLabel>
          <CheckboxContainer>
            {styles.map(style => (
              <CheckboxLabel key={style}>
                <input 
                  type="checkbox"
                  name={`style-${style}`}
                  checked={filters.styles.includes(style)}
                  onChange={handleChange}
                />
                {style}
              </CheckboxLabel>
            ))}
          </CheckboxContainer>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>Stories</FilterLabel>
          <CheckboxContainer>
            <CheckboxLabel>
              <input 
                type="checkbox"
                name="stories-1"
                checked={filters.stories.includes(1)}
                onChange={handleChange}
              />
              1 Story
            </CheckboxLabel>
            <CheckboxLabel>
              <input 
                type="checkbox"
                name="stories-2"
                checked={filters.stories.includes(2)}
                onChange={handleChange}
              />
              2 Stories
            </CheckboxLabel>
            <CheckboxLabel>
              <input 
                type="checkbox"
                name="stories-3"
                checked={filters.stories.includes(3)}
                onChange={handleChange}
              />
              3+ Stories
            </CheckboxLabel>
          </CheckboxContainer>
        </FilterGroup>
      </FiltersGrid>
      
      {isVisible && (
        <ButtonContainer>
          <ResetButton onClick={handleReset}>Reset</ResetButton>
          <ApplyButton onClick={handleApply}>Apply Filters</ApplyButton>
        </ButtonContainer>
      )}
    </FiltersContainer>
  );
};

export default Filters;