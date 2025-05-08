'use client'

import { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FallbackImage from '../common/FallbackImage';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const HeroSection = styled.div`
  position: relative;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    height: 500px;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 1rem;
  position: relative;
  z-index: 2;
  
  h1 {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    font-weight: 700;
    
    @media (max-width: 768px) {
      font-size: 2.25rem;
    }
  }
  
  p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    opacity: 0.9;
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const SearchContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormGroup = styled.div`
  flex: 1;
  min-width: 150px;
  
  label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  select, input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f8f9fa;
    
    &:focus {
      outline: none;
      border-color: #4a6741;
      box-shadow: 0 0 0 2px rgba(74, 103, 65, 0.2);
    }
  }
`;

const SubmitButton = styled.button`
  background-color: #d9534f;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
  
  &:hover {
    background-color: #c9302c;
  }
`;

const PopularSearches = styled.div`
  text-align: center;
  margin-top: 1rem;
  
  p {
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
    margin-bottom: 0.75rem;
  }
  
  a {
    display: inline-block;
    background: rgba(255, 255, 255, 0.15);
    color: white;
    padding: 0.5rem 1rem;
    margin: 0.25rem;
    border-radius: 50px;
    font-size: 0.875rem;
    text-decoration: none;
    transition: background 0.2s;
    
    &:hover {
      background: rgba(255, 255, 255, 0.25);
    }
  }
`;

const FeaturedSection = styled.div`
  padding: 3rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  
  h2 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  p {
    color: #666;
    margin-bottom: 2rem;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const CategoryCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }
`;

const CategoryImageContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
`;

const CategoryInfo = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  
  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
    color: #333;
  }
  
  p {
    font-size: 0.875rem;
    color: #666;
    margin-bottom: 1rem;
    text-align: left;
  }
  
  a {
    margin-top: auto;
    display: inline-block;
    color: #4a6741;
    font-weight: 600;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function HomePage() {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState({
    bedrooms: '',
    bathrooms: '',
    floors: '',
    style: '',
    sqft: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build query string from form values
    const params = new URLSearchParams();
    
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });
    
    router.push(`/search?${params.toString()}`);
  };
  
  const categories = [
    {
      title: 'Modern Farmhouse Plans',
      description: 'Contemporary designs with classic farmhouse elements, featuring open layouts and functional spaces.',
      image: 'https://picsum.photos/seed/farmhouse/800/600',
      link: '/styles/modern-farmhouse'
    },
    {
      title: 'Craftsman House Plans',
      description: 'Detailed architectural elements with exposed beams, covered porches, and handcrafted details.',
      image: 'https://picsum.photos/seed/craftsman/800/600',
      link: '/styles/craftsman'
    },
    {
      title: 'Garage Plans',
      description: 'From simple structures to complex designs with lofts, apartments, and workshops.',
      image: 'https://picsum.photos/seed/garage/800/600',
      link: '/garage-plans'
    },
    {
      title: 'Small House Plans',
      description: 'Efficient layouts under 1,500 square feet, perfect for minimalists or first-time homeowners.',
      image: 'https://picsum.photos/seed/small/800/600',
      link: '/collections/small-house-plans'
    }
  ];
  
  return (
    <HomeContainer>
      <HeroSection>
        <FallbackImage 
          src="https://picsum.photos/seed/homehero/1600/900"
          alt="Beautiful modern home exterior"
          fill
          style={{ objectFit: 'cover' }}
          priority
          fallbackSrc="https://placehold.co/1600x900?text=Beautiful+Home+Designs"
        />
        
        <HeroContent>
          <h1>Find Your Perfect House Plan</h1>
          <p>Browse thousands of house plans and find the perfect design for your dream home</p>
          
          <SearchContainer>
            <SearchForm onSubmit={handleSearch}>
              <FormRow>
                <FormGroup>
                  <label htmlFor="bedrooms">Bedrooms</label>
                  <select 
                    id="bedrooms" 
                    name="bedrooms"
                    value={searchParams.bedrooms}
                    onChange={handleInputChange}
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
                    name="bathrooms"
                    value={searchParams.bathrooms}
                    onChange={handleInputChange}
                  >
                    <option value="">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </FormGroup>
                
                <FormGroup>
                  <label htmlFor="floors">Floors</label>
                  <select 
                    id="floors" 
                    name="floors"
                    value={searchParams.floors}
                    onChange={handleInputChange}
                  >
                    <option value="">Any</option>
                    <option value="1">1 Story</option>
                    <option value="2">2 Story</option>
                    <option value="3">3+ Story</option>
                  </select>
                </FormGroup>
              </FormRow>
              
              <FormRow>
                <FormGroup>
                  <label htmlFor="style">Style</label>
                  <select 
                    id="style" 
                    name="style"
                    value={searchParams.style}
                    onChange={handleInputChange}
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
                    name="sqft"
                    value={searchParams.sqft}
                    onChange={handleInputChange}
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
              </FormRow>
              
              <SubmitButton type="submit">
                Search House Plans
              </SubmitButton>
            </SearchForm>
          </SearchContainer>
          
          <PopularSearches>
            <p>Popular searches:</p>
            <Link href="/collections/small-house-plans">Small House Plans</Link>
            <Link href="/collections/open-concept">Open Concept</Link>
            <Link href="/styles/modern-farmhouse">Modern Farmhouse</Link>
            <Link href="/collections/with-basement">With Basement</Link>
          </PopularSearches>
        </HeroContent>
      </HeroSection>
      
      <FeaturedSection>
        <h2>Find Your Dream Home Design</h2>
        <p>Explore our curated collections of home designs to find the perfect plan for your lifestyle.</p>
        
        <CategoryGrid>
          {categories.map((category, index) => (
            <CategoryCard key={index}>
              <CategoryImageContainer>
                <FallbackImage 
                  src={category.image}
                  alt={category.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  fallbackSrc={`https://placehold.co/800x600?text=${encodeURIComponent(category.title)}`}
                />
              </CategoryImageContainer>
              <CategoryInfo>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <Link href={category.link}>
                  Explore Plans →
                </Link>
              </CategoryInfo>
            </CategoryCard>
          ))}
        </CategoryGrid>
        
        <div style={{ marginTop: '3rem' }}>
          <a 
            href="https://www.jdoqocy.com/click-101433563-14548500"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-block',
              background: '#d9534f',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '4px',
              fontWeight: 'bold',
              textDecoration: 'none'
            }}
          >
            Get 50% Off All House Plans - Limited Time!
          </a>
        </div>
      </FeaturedSection>
    </HomeContainer>
  );
}