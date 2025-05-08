'use client';

import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

const Hero = styled.section`
  position: relative;
`;

const HeroContainer = styled.div`
  position: relative;
  height: 600px;
  width: 100%;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeroContent = styled.div`
  text-align: center;
  color: white;
  padding: 0 1rem;
  max-width: 64rem;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroText = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const PrimaryButton = styled(Link)`
  background-color: var(--color-primary);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-size: 1.125rem;
  font-weight: 500;
  
  &:hover {
    background-color: var(--color-primary-dark);
  }
`;

const SecondaryButton = styled(Link)`
  background-color: white;
  color: #1f2937;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-size: 1.125rem;
  font-weight: 500;
  
  &:hover {
    background-color: #f3f4f6;
  }
`;

const Section = styled.section`
  padding: 4rem 1rem;
`;

const SectionAlt = styled(Section)`
  background-color: #f3f4f6;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 3rem;
`;

export default function Home() {
  return (
    <div>
      <Hero>
        <HeroContainer>
          <Image
            src="https://picsum.photos/seed/homehero/1600/900"
            alt="Beautiful home exterior"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
          <HeroOverlay>
            <HeroContent>
              <HeroTitle>Find Your Perfect Home Design</HeroTitle>
              <HeroText>Browse thousands of beautiful house plans to find your dream home</HeroText>
              <HeroButtons>
                <PrimaryButton href="/house-plans">
                  Browse House Plans
                </PrimaryButton>
                <SecondaryButton href="/styles">
                  Explore Styles
                </SecondaryButton>
              </HeroButtons>
            </HeroContent>
          </HeroOverlay>
        </HeroContainer>
      </Hero>

      {/* Additional sections would go here */}
    </div>
  );
}
