'use client'

import { useState, useEffect } from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div<{ visible: boolean }>`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 999;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) => (visible ? 'translateY(0)' : 'translateY(20px)')};
  transition: opacity 0.3s, transform 0.3s;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
`;

const OfferButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #d9534f;
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.875rem;
  transition: transform 0.2s, background-color 0.2s;
  
  @media (min-width: 768px) {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
  }
  
  &:hover {
    transform: translateY(-3px);
    background-color: #c9302c;
  }
  
  .icon {
    font-size: 1.25rem;
  }
`;

const FloatingOfferButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Show button after scrolling a bit
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Also show after 5 seconds regardless of scroll
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);
  
  // Your affiliate link
  const affiliateLink = "https://www.jdoqocy.com/click-101433563-14548500";
  
  return (
    <ButtonContainer visible={isVisible}>
      <OfferButton 
        href={affiliateLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="icon">🔥</span>
        <span>50% Off All House Plans - Limited Time!</span>
      </OfferButton>
    </ButtonContainer>
  );
};

export default FloatingOfferButton;