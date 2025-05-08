'use client'

import styled from 'styled-components';
import Image from 'next/image';
import { useAnalyticsUseCases } from '../../adapters/context/AppContext';

const HeroContainer = styled.section`
  position: relative;
  height: 70vh;
  min-height: 500px;
  overflow: hidden;
`;

const HeroContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%);
  color: white;
  
  h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
    max-width: 600px;
  }
  
  p {
    font-size: 1.2rem;
    max-width: 500px;
    margin-bottom: 2rem;
  }
`;

const CTAButton = styled.a`
  display: inline-block;
  background-color: #4a6741;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: background-color 0.2s;
  width: fit-content;
  
  &:hover {
    background-color: #3a5231;
  }
`;

const HeroSection = () => {
  const analyticsUseCases = useAnalyticsUseCases();
  
  const handleCTAClick = async () => {
    try {
      const affiliateLink = await analyticsUseCases.trackAndGenerateAffiliateLink(
        'home-hero', // Using a placeholder ID for general link
        'general',   // Category
        'home-hero', // Source
        undefined,   // Session ID would be populated in production
        undefined,   // User ID would be populated in production
        'desktop'    // Device type would be determined dynamically
      );
      
      // In a real application, you might use this link or redirect to it
      console.log('Generated affiliate link:', affiliateLink);
      
      // For now, we're just tracking the click, not actually redirecting
    } catch (error) {
      console.error('Failed to track affiliate link click:', error);
    }
  };
  
  return (
    <HeroContainer>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Image 
          src="https://placehold.co/1920x1080/e8e8e8/2a2a2a?text=Dream+Home+Design"
          alt="Beautiful home design" 
          fill
          style={{ objectFit: 'cover' }}
          priority
          sizes="100vw"
        />
      </div>
      <HeroContent>
        <h1>Find Your Dream Home Design</h1>
        <p>Browse thousands of beautiful house plans and find the perfect design for your family</p>
        <CTAButton 
          href="/house-plans"
          onClick={handleCTAClick}
        >
          Explore House Plans
        </CTAButton>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;