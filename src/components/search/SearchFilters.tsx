'use client'

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PlanFilter } from '../../core/domain/entities';

const FiltersContainer = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
`;

const FilterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e1e1e1;
`;

const FilterGroup = styled.div`
  margin-bottom: 2rem;
  
  h4 {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`;

const TextInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const RangeInputs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  
  input {
    width: 50%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.5rem;
  
  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    
    input {
      margin-right: 0.5rem;
    }
  }
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    
    input {
      margin-right: 0.5rem;
    }
  }
`;

const ApplyButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #4a6741;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3a5231;
  }
`;

const ResetButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: transparent;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.75rem;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

interface SearchFiltersProps {
  initialFilter: PlanFilter;
  onFilterChange: (filter: PlanFilter) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ initialFilter, onFilterChange }) => {
  const [filter, setFilter] = useState<PlanFilter>(initialFilter);
  
  useEffect(() => {
    setFilter(initialFilter);
  }, [initialFilter]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkboxInput = e.target as HTMLInputElement;
      const { checked } = checkboxInput;
      
      if (name === 'stories') {
        const storiesValue = parseInt(value);
        const currentStories = filter.stories || [];
        
        if (checked && !currentStories.includes(storiesValue)) {
          setFilter({
            ...filter,
            stories: [...currentStories, storiesValue]
          });
        } else if (!checked && currentStories.includes(storiesValue)) {
          setFilter({
            ...filter,
            stories: currentStories.filter(s => s !== storiesValue)
          });
        }
      } else if (name === 'garages') {
        const garagesValue = parseInt(value);
        const currentGarages = filter.garages || [];
        
        if (checked && !currentGarages.includes(garagesValue)) {
          setFilter({
            ...filter,
            garages: [...currentGarages, garagesValue]
          });
        } else if (!checked && currentGarages.includes(garagesValue)) {
          setFilter({
            ...filter,
            garages: currentGarages.filter(g => g !== garagesValue)
          });
        }
      } else if (name === 'hasBasement') {
        setFilter({
          ...filter,
          hasBasement: checked
        });
      }
    } else if (name === 'keywords') {
      setFilter({
        ...filter,
        keywords: value
      });
    } else if (name === 'squareFeetMin') {
      setFilter({
        ...filter,
        squareFeetMin: value ? parseInt(value) : undefined
      });
    } else if (name === 'squareFeetMax') {
      setFilter({
        ...filter,
        squareFeetMax: value ? parseInt(value) : undefined
      });
    } else if (name === 'bedroomsMin') {
      setFilter({
        ...filter,
        bedroomsMin: value ? parseInt(value) : undefined
      });
    } else if (name === 'bedroomsMax') {
      setFilter({
        ...filter,
        bedroomsMax: value ? parseInt(value) : undefined
      });
    } else if (name === 'bathroomsMin') {
      setFilter({
        ...filter,
        bathroomsMin: value ? parseInt(value) : undefined
      });
    } else if (name === 'bathroomsMax') {
      setFilter({
        ...filter,
        bathroomsMax: value ? parseInt(value) : undefined
      });
    }
  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'category') {
      setFilter({
        ...filter,
        category: value as any
      });
    } else if (name === 'style') {
      setFilter({
        ...filter,
        style: value
      });
    }
  };
  
  const handleApplyFilters = () => {
    onFilterChange(filter);
  };
  
  const handleResetFilters = () => {
    const resetFilter: PlanFilter = {
      page: 1,
      limit: 12,
      sortBy: 'newest'
    };
    
    setFilter(resetFilter);
    onFilterChange(resetFilter);
  };
  
  return (
    <FiltersContainer>
      <FilterTitle>Filter Plans</FilterTitle>
      
      <FilterGroup>
        <h4>Keywords</h4>
        <TextInput 
          type="text" 
          name="keywords" 
          value={filter.keywords || ''} 
          onChange={handleInputChange}
          placeholder="Search by keywords"
        />
      </FilterGroup>
      
      <FilterGroup>
        <h4>Category</h4>
        <select 
          name="category" 
          value={filter.category || ''} 
          onChange={handleSelectChange}
          style={{ 
            width: '100%', 
            padding: '0.5rem', 
            border: '1px solid #ddd', 
            borderRadius: '4px'
          }}
        >
          <option value="">All Categories</option>
          <option value="house">House</option>
          <option value="garage">Garage</option>
          <option value="shed">Shed</option>
          <option value="cabin">Cabin</option>
          <option value="tiny-home">Tiny Home</option>
          <option value="adu">ADU</option>
          <option value="multi-family">Multi-Family</option>
          <option value="barn">Barn</option>
        </select>
      </FilterGroup>
      
      <FilterGroup>
        <h4>Style</h4>
        <select 
          name="style" 
          value={filter.style || ''} 
          onChange={handleSelectChange}
          style={{ 
            width: '100%', 
            padding: '0.5rem', 
            border: '1px solid #ddd', 
            borderRadius: '4px'
          }}
        >
          <option value="">All Styles</option>
          <option value="Farmhouse">Farmhouse</option>
          <option value="Craftsman">Craftsman</option>
          <option value="Ranch">Ranch</option>
          <option value="Modern">Modern</option>
          <option value="Country">Country</option>
          <option value="Cottage">Cottage</option>
          <option value="Traditional">Traditional</option>
          <option value="Contemporary">Contemporary</option>
        </select>
      </FilterGroup>
      
      <FilterGroup>
        <h4>Square Feet</h4>
        <RangeInputs>
          <input 
            type="number" 
            name="squareFeetMin" 
            value={filter.squareFeetMin || ''} 
            onChange={handleInputChange}
            placeholder="Min"
          />
          <input 
            type="number" 
            name="squareFeetMax" 
            value={filter.squareFeetMax || ''} 
            onChange={handleInputChange}
            placeholder="Max"
          />
        </RangeInputs>
      </FilterGroup>
      
      <FilterGroup>
        <h4>Bedrooms</h4>
        <RangeInputs>
          <input 
            type="number" 
            name="bedroomsMin" 
            value={filter.bedroomsMin || ''} 
            onChange={handleInputChange}
            placeholder="Min"
            min="0"
            max="10"
          />
          <input 
            type="number" 
            name="bedroomsMax" 
            value={filter.bedroomsMax || ''} 
            onChange={handleInputChange}
            placeholder="Max"
            min="0"
            max="10"
          />
        </RangeInputs>
      </FilterGroup>
      
      <FilterGroup>
        <h4>Stories</h4>
        <CheckboxGroup>
          <label>
            <input 
              type="checkbox" 
              name="stories" 
              value="1" 
              checked={filter.stories?.includes(1) || false}
              onChange={handleInputChange}
            />
            1 Story
          </label>
          <label>
            <input 
              type="checkbox" 
              name="stories" 
              value="2" 
              checked={filter.stories?.includes(2) || false}
              onChange={handleInputChange}
            />
            2 Story
          </label>
          <label>
            <input 
              type="checkbox" 
              name="stories" 
              value="3" 
              checked={filter.stories?.includes(3) || false}
              onChange={handleInputChange}
            />
            3+ Story
          </label>
        </CheckboxGroup>
      </FilterGroup>
      
      <FilterGroup>
        <h4>Garages</h4>
        <CheckboxGroup>
          <label>
            <input 
              type="checkbox" 
              name="garages" 
              value="0" 
              checked={filter.garages?.includes(0) || false}
              onChange={handleInputChange}
            />
            No Garage
          </label>
          <label>
            <input 
              type="checkbox" 
              name="garages" 
              value="1" 
              checked={filter.garages?.includes(1) || false}
              onChange={handleInputChange}
            />
            1 Car
          </label>
          <label>
            <input 
              type="checkbox" 
              name="garages" 
              value="2" 
              checked={filter.garages?.includes(2) || false}
              onChange={handleInputChange}
            />
            2 Car
          </label>
          <label>
            <input 
              type="checkbox" 
              name="garages" 
              value="3" 
              checked={filter.garages?.includes(3) || false}
              onChange={handleInputChange}
            />
            3+ Car
          </label>
        </CheckboxGroup>
      </FilterGroup>
      
      <FilterGroup>
        <h4>Features</h4>
        <label style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
          <input 
            type="checkbox" 
            name="hasBasement" 
            checked={filter.hasBasement || false}
            onChange={handleInputChange}
            style={{ marginRight: '0.5rem' }}
          />
          Basement
        </label>
      </FilterGroup>
      
      <ApplyButton onClick={handleApplyFilters}>
        Apply Filters
      </ApplyButton>
      
      <ResetButton onClick={handleResetFilters}>
        Reset Filters
      </ResetButton>
    </FiltersContainer>
  );
};

export default SearchFilters;