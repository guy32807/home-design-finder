import React from 'react';
import styled from 'styled-components';
import { getAffiliateLink } from '../../constants/links';
import { Link, NavLink } from 'react-router-dom'; // Import both Link and NavLink

interface HousePlanCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  description: string;
  architect: string;
  style: string;
}

const Card = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: white;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  height: 220px;
  overflow: hidden;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const StyleTag = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const Content = styled.div`
  padding: 1.25rem;
`;

const Name = styled.h3`
  font-size: 1.25rem;
  margin: 0 0 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const Architect = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0 0 1rem;
`;

const Features = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const Feature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FeatureValue = styled.span`
  font-weight: 600;
  font-size: 1.1rem;
`;

const FeatureLabel = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const Price = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 0.75rem;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.25rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ViewButton = styled.a`
  display: block;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  padding: 0.75rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryDark};
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 1rem;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 100;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const MobileNavLink = styled(NavLink)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  padding: 0.75rem 0;
  font-weight: 500;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  
  &:last-of-type {
    border-bottom: none;
  }
  
  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MobileButton = styled.button`
  margin-top: 0.75rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const HousePlanCard: React.FC<HousePlanCardProps> = ({
  id,
  name,
  image,
  price,
  bedrooms,
  bathrooms,
  squareFeet,
  description,
  architect,
  style
}) => {
  return (
    <Card>
      <ImageContainer>
        <Image src={image} alt={name} />
        <StyleTag>{style}</StyleTag>
      </ImageContainer>
      <Content>
        <Name>{name}</Name>
        <Architect>by {architect}</Architect>
        
        <Features>
          <Feature>
            <FeatureValue>{bedrooms}</FeatureValue>
            <FeatureLabel>Beds</FeatureLabel>
          </Feature>
          <Feature>
            <FeatureValue>{bathrooms}</FeatureValue>
            <FeatureLabel>Baths</FeatureLabel>
          </Feature>
          <Feature>
            <FeatureValue>{squareFeet.toLocaleString()}</FeatureValue>
            <FeatureLabel>Sq Ft</FeatureLabel>
          </Feature>
        </Features>
        
        <Price>${price}</Price>
        <Description>{description}</Description>
        
        <ViewButton 
          href={getAffiliateLink(id, 'house_plan_card')} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          View Plan Details
        </ViewButton>
      </Content>
    </Card>
  );
};

export default HousePlanCard;