import React from 'react';
import { Helmet } from 'react-helmet-async';

interface HousePlanStructuredDataProps {
  id: string;
  name: string; 
  description: string;
  image: string;
  price: number;
  currency?: string;
  bedrooms: number;
  bathrooms: number;
  stories?: number;
  squareFeet: number;
  architect: string;
  url: string;
  features?: string[];
  style?: string;
  yearBuilt?: number;
}

interface PropertyValue {
  '@type': 'PropertyValue';
  name: string;
  value: number | string | { '@type': string; value: number; unitCode: string };
}

const HousePlanStructuredData: React.FC<HousePlanStructuredDataProps> = ({
  id,
  name, 
  description,
  image,
  price,
  currency = 'USD',
  bedrooms,
  bathrooms,
  stories = 1,
  squareFeet,
  architect,
  url,
  features = [],
  style,
  yearBuilt,
}) => {
  // Create basic additional properties
  const additionalProperties: PropertyValue[] = [
    {
      '@type': 'PropertyValue',
      name: 'bedrooms',
      value: bedrooms
    },
    {
      '@type': 'PropertyValue',
      name: 'bathrooms',
      value: bathrooms
    },
    {
      '@type': 'PropertyValue',
      name: 'floorSize',
      value: {
        '@type': 'QuantitativeValue',
        value: squareFeet,
        unitCode: 'FTK'
      }
    },
    {
      '@type': 'PropertyValue',
      name: 'numberOfFloors',
      value: stories
    }
  ];

  // Add additional properties if they exist
  if (style) {
    additionalProperties.push({
      '@type': 'PropertyValue',
      name: 'architecturalStyle',
      value: style as string  // Use type assertion to fix the error
    });
  }

  if (yearBuilt) {
    additionalProperties.push({
      '@type': 'PropertyValue',
      name: 'yearBuilt',
      value: yearBuilt
    });
  }

  if (features && features.length > 0) {
    additionalProperties.push({
      '@type': 'PropertyValue',
      name: 'amenities',
      value: features.join(', ') as string  // Use type assertion to fix the error
    });
  }

  // Create real estate property structured data
  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name,
    description,
    image,
    sku: id,
    mpn: id,
    brand: {
      '@type': 'Brand',
      name: architect
    },
    category: 'House Plans',
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: currency,
      price,
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Architectural Designs'
      }
    },
    additionalProperty: additionalProperties
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default HousePlanStructuredData;