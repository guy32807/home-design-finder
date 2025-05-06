import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SeoHead from '../components/SEO/SeoHead';
import Breadcrumbs from '../components/navigation/Breadcrumbs';
import HousePlanCard from '../components/house-plans/HousePlanCard';
import Filters from '../components/house-plans/Filters';
import FAQ from '../components/content/FAQ';
import { AFFILIATE_LINKS } from '../constants/links';
import Button from '../components/ui/Button'; // Import the Button component

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin: 1.5rem 0;
  color: ${({ theme }) => theme.colors.primary};
`;

const PageDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text};
  max-width: 800px;
`;

const FiltersContainer = styled.div`
  margin-bottom: 2rem;
`;

const HousePlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ViewMoreLink = styled.a`
  display: inline-block;
  text-decoration: none;
  margin: 2rem auto;
`;

const ViewMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

interface HousePlan {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  stories: number;
  squareFeet: number;
  architect: string;
  features: string[];
  style: string;
}

const HousePlansPage: React.FC = () => {
  const [housePlans, setHousePlans] = useState<HousePlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    minBeds: 0,
    maxBeds: 10,
    minBaths: 0,
    maxBaths: 10,
    minSize: 0,
    maxSize: 10000,
    styles: [] as string[],
    stories: [] as number[],
  });

  useEffect(() => {
    // Mock data - in a real app, this would be an API call
    const mockPlans: HousePlan[] = [
      {
        id: 'plan1',
        name: 'Modern Farmhouse',
        description: 'Beautiful modern farmhouse with open concept and large kitchen.',
        image: 'https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        price: 1250,
        bedrooms: 4,
        bathrooms: 3.5,
        stories: 2,
        squareFeet: 2800,
        architect: 'Smith Designers',
        features: ['Open concept', 'Home office', 'Large kitchen'],
        style: 'Farmhouse'
      },
      {
        id: 'plan2',
        name: 'Craftsman Bungalow',
        description: 'Classic craftsman style with modern amenities and energy efficiency.',
        image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        price: 950,
        bedrooms: 3,
        bathrooms: 2,
        stories: 1,
        squareFeet: 1800,
        architect: 'Heritage Homes',
        features: ['Covered porch', 'Built-in shelving', 'Energy efficient'],
        style: 'Craftsman'
      },
      {
        id: 'plan3',
        name: 'Contemporary Glass House',
        description: 'Stunning minimalist design with walls of glass and indoor-outdoor living.',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        price: 1750,
        bedrooms: 3,
        bathrooms: 3,
        stories: 1,
        squareFeet: 2200,
        architect: 'Modern Designs Co.',
        features: ['Floor-to-ceiling windows', 'Smart home technology', 'Infinity pool'],
        style: 'Contemporary'
      },
      {
        id: 'plan4',
        name: 'Colonial Estate',
        description: 'Traditional colonial with elegant details and spacious rooms.',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        price: 1450,
        bedrooms: 5,
        bathrooms: 4,
        stories: 2,
        squareFeet: 3500,
        architect: 'Classic Home Designs',
        features: ['Formal dining room', 'Library', 'Grand staircase'],
        style: 'Colonial'
      },
      {
        id: 'plan5',
        name: 'Mediterranean Villa',
        description: 'Elegant Mediterranean style with courtyard and terracotta roof.',
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        price: 1650,
        bedrooms: 4,
        bathrooms: 3.5,
        stories: 1,
        squareFeet: 3000,
        architect: 'Mediterranean Designs',
        features: ['Courtyard', 'Outdoor kitchen', 'Terracotta roof'],
        style: 'Mediterranean'
      },
      {
        id: 'plan6',
        name: 'Urban Townhouse',
        description: 'Modern townhouse perfect for city living with rooftop deck.',
        image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        price: 1050,
        bedrooms: 3,
        bathrooms: 2.5,
        stories: 3,
        squareFeet: 2000,
        architect: 'Urban Living Designs',
        features: ['Rooftop deck', 'Garage', 'City views'],
        style: 'Modern'
      }
    ];
    
    // Simulate API call
    setTimeout(() => {
      setHousePlans(mockPlans);
      setLoading(false);
    }, 500);
  }, []);

  const faqItems = [
    {
      question: "How do I purchase a house plan?",
      answer: "You can purchase any house plan by clicking the 'View Plan Details' button. This will take you to our partner site where you can complete your purchase and access all the plan details and blueprints."
    },
    {
      question: "Can house plans be modified?",
      answer: "Yes, most of our house plans can be modified to suit your specific needs. When viewing a plan, you'll see modification options available. Modifications may include changing room dimensions, adding or removing features, or adjusting the exterior style."
    },
    {
      question: "What's included in a typical house plan package?",
      answer: "A standard house plan package includes foundation plans, floor plans, exterior elevations, cross-sections, electrical layouts, and a complete set of construction details. Premium packages may also include 3D renderings, material lists, and cost-to-build estimates."
    },
    {
      question: "How long does it take to receive my house plan?",
      answer: "Digital PDF house plans are typically delivered via email within 1-2 business days after purchase. Printed plans may take 3-5 business days plus shipping time, depending on your location."
    },
    {
      question: "Do your house plans meet current building codes?",
      answer: "Our house plans are designed to meet widely accepted building standards. However, local building codes vary by region, so you may need to have the plans reviewed by a local professional to ensure compliance with your specific area's requirements."
    }
  ];

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'House Plans', path: '/house-plans', isLast: true }
  ];

  const handleFilterChange = (newFilters: any) => {
    setFilters({...filters, ...newFilters});
    // In a real app, you would fetch filtered results here
  };

  const morePlansLink = AFFILIATE_LINKS.housePlans;

  return (
    <PageContainer>
      <SeoHead 
        title="Beautiful House Plans & Home Designs | Home Design Finder"
        description="Browse our collection of stunning house plans and architectural designs for your dream home. Find floor plans by style, size, and features."
        url="https://homedesignfinder.com/#/house-plans"
        image="https://homedesignfinder.com/images/house-plans-collection.jpg"
        keywords="house plans, home designs, floor plans, architectural designs, modern house plans, farmhouse plans"
      />
      
      {breadcrumbItems && <Breadcrumbs items={breadcrumbItems} />}
      
      <PageTitle>House Plans & Home Designs</PageTitle>
      <PageDescription>
        Discover your dream home with our curated collection of house plans. From modern farmhouses to craftsman bungalows, 
        we have designs to suit every lifestyle, preference, and budget. All our plans are customizable to your specific needs.
      </PageDescription>
      
      <FiltersContainer>
        <Filters onFilterChange={handleFilterChange} />
      </FiltersContainer>
      
      {loading ? (
        <div>Loading house plans...</div>
      ) : (
        <>
          <HousePlansGrid>
            {housePlans.map(plan => (
              <HousePlanCard 
                key={plan.id}
                id={plan.id}
                name={plan.name}
                image={plan.image}
                price={plan.price}
                bedrooms={plan.bedrooms}
                bathrooms={plan.bathrooms}
                squareFeet={plan.squareFeet}
                description={plan.description}
                architect={plan.architect}
                style={plan.style}
              />
            ))}
          </HousePlansGrid>
          
          <ViewMoreContainer>
            <ViewMoreLink 
              href={morePlansLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button $primary>
                View More Plans
              </Button>
            </ViewMoreLink>
          </ViewMoreContainer>
        </>
      )}
      
      <FAQ items={faqItems} title="Frequently Asked Questions About House Plans" />
    </PageContainer>
  );
};

export default HousePlansPage;
