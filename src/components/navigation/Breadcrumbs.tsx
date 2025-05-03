import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  label: string;
  path: string;
  isLast?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  baseUrl?: string;
}

const BreadcrumbsContainer = styled.nav`
  padding: 0.75rem 0;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
`;

const BreadcrumbsList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;
  
  &:not(:last-child)::after {
    content: "/";
    margin: 0 0.5rem;
    color: #aaa;
  }
`;

const BreadcrumbLink = styled(Link)`
  color: #3498db;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const CurrentPage = styled.span`
  color: #777;
`;

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ 
  items, 
  baseUrl = 'https://guy32807.github.io/architectural-designs-affiliate'
}) => {
  // Generate structured data for breadcrumbs
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.label,
      'item': item.isLast ? undefined : `${baseUrl}${item.path}`
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <BreadcrumbsContainer aria-label="breadcrumb">
        <BreadcrumbsList>
          {items.map((item, index) => (
            <BreadcrumbItem key={index}>
              {item.isLast ? (
                <CurrentPage>{item.label}</CurrentPage>
              ) : (
                <BreadcrumbLink to={item.path}>{item.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbsList>
      </BreadcrumbsContainer>
    </>
  );
};

export default Breadcrumbs;