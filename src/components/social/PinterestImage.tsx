import React from 'react';
import styled from 'styled-components';

interface PinterestImageProps {
  originalImage: string;
  title: string;
  features?: string[];
  squareFeet?: number;
  beds?: number;
  baths?: number;
  logo?: string;
}

const PinterestCanvas = styled.div`
  width: 1000px;
  height: 1500px;
  position: relative;
  background-color: white;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, transparent 70%, rgba(0,0,0,0.7) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  color: white;
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  margin-bottom: 20px;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.5);
`;

const FeaturesList = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  
  svg {
    margin-right: 10px;
  }
`;

const InfoPanel = styled.div`
  background-color: #2c3e50;
  color: white;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TagLine = styled.div`
  font-size: 24px;
  margin-bottom: 15px;
  text-align: center;
`;

const Logo = styled.img`
  height: 60px;
  margin-top: 10px;
`;

const FeatureTag = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  padding: 8px 15px;
  margin: 0 5px 10px;
  font-size: 18px;
  display: inline-block;
`;

const FeatureTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 15px;
`;

const PinterestImage: React.FC<PinterestImageProps> = ({
  originalImage,
  title,
  features = [],
  squareFeet,
  beds,
  baths,
  logo = '/logo.png',
}) => {
  return (
    <PinterestCanvas>
      <ImageContainer>
        <Image src={originalImage} alt={title} />
        <Overlay>
          <Title>{title}</Title>
          <FeaturesList>
            {beds && (
              <Feature>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" />
                </svg>
                {beds} Bed{beds !== 1 ? 's' : ''}
              </Feature>
            )}
            
            {baths && (
              <Feature>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 7c0-1.1.9-2 2-2s2 .9 2 2h2c0-2.21-1.79-4-4-4S5 4.79 5 7h2zm5 6.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm-1-5C8.9 8.5 7 9.5 7 11h10c0-1.5-1.9-2.5-4-2.5h-2zm-3 1h8c1.1 0 2 .9 2 2v2h1v3H5v-3h1v-2c0-1.1.9-2 2-2z" />
                </svg>
                {baths} Bath{baths !== 1 ? 's' : ''}
              </Feature>
            )}
            
            {squareFeet && (
              <Feature>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 15h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2zm-3.5 0H15v2h-1.5zM7.5 7H9v2H7.5zM19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM5 11h2v2H5zm3.5 0H10v2H8.5z" />
                </svg>
                {squareFeet.toLocaleString()} sqft
              </Feature>
            )}
          </FeaturesList>
        </Overlay>
      </ImageContainer>
      
      <InfoPanel>
        <TagLine>Beautiful Home Plans & Architectural Designs</TagLine>
        
        <FeatureTags>
          {features.slice(0, 5).map((feature, index) => (
            <FeatureTag key={index}>{feature}</FeatureTag>
          ))}
        </FeatureTags>
        
        <Logo src={logo} alt="Architectural Designs Logo" />
      </InfoPanel>
    </PinterestCanvas>
  );
};

export default PinterestImage;