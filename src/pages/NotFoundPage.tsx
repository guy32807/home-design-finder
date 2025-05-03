import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SeoHead from '../components/SEO/SeoHead';

const NotFoundContainer = styled.div`
  max-width: 800px;
  margin: 4rem auto;
  text-align: center;
  padding: 0 1rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text};
`;

const HomeButton = styled(Link)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    text-decoration: none;
  }
`;

const PlansButton = styled(Link)`
  display: inline-block;
  background-color: white;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  margin-left: 1rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryLightest};
    text-decoration: none;
  }
`;

const NotFoundPage: React.FC = () => {
  return (
    <NotFoundContainer>
      <SeoHead 
        title="Page Not Found | Architectural Designs"
        description="Sorry, the page you are looking for could not be found. Browse our collection of house plans instead."
      />
      
      <Title>404</Title>
      <Subtitle>Oops! The page you're looking for doesn't exist.</Subtitle>
      
      <p>
        Sorry, but the page you were trying to view does not exist. 
        It might have been moved, renamed, or it never existed at all.
      </p>
      
      <div>
        <HomeButton to="/">Go Home</HomeButton>
        <PlansButton to="/house-plans">Browse House Plans</PlansButton>
      </div>
    </NotFoundContainer>
  );
};

export default NotFoundPage;