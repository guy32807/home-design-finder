'use client'

import { useState, useRef } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Plan } from '../../core/domain/entities';
import { usePlanUseCases } from '../../adapters/context/AppContext';
import FallbackImage from '../common/FallbackImage';
import PlanCard from './PlanCard';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const BreadcrumbNav = styled.div`
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  color: #666;
  
  a {
    color: #4a6741;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const PlanHeader = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
    color: #333;
  }
  
  .plan-code {
    color: #666;
    font-size: 1rem;
    font-weight: normal;
    margin-left: 1rem;
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 992px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const GallerySection = styled.div`
  margin-bottom: 2rem;
`;

const MainImageContainer = styled.div`
  position: relative;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    height: 500px;
  }
`;

const ThumbnailsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 0.75rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
`;

const Thumbnail = styled.div<{ isActive: boolean }>`
  position: relative;
  height: 60px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid ${({ isActive }) => (isActive ? '#4a6741' : 'transparent')};
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
  }
  
  @media (min-width: 768px) {
    height: 70px;
  }
`;

const PlanDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const DetailsCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const DetailsHeader = styled.div`
  background-color: #4a6741;
  color: white;
  padding: 1rem 1.5rem;
  font-weight: 600;
  font-size: 1.125rem;
`;

const DetailsContent = styled.div`
  padding: 1.5rem;
`;

const SpecsList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  
  .spec-item {
    display: flex;
    flex-direction: column;
    
    .spec-label {
      font-size: 0.875rem;
      color: #666;
    }
    
    .spec-value {
      font-size: 1.125rem;
      font-weight: 600;
      color: #333;
    }
  }
`;

const PlanDescription = styled.div`
  line-height: 1.6;
  color: #333;
  
  p {
    margin-bottom: 1rem;
  }
`;

const PurchaseOptions = styled.div`
  margin-bottom: 1.5rem;
`;

const PurchaseOptionsList = styled.div`
  display: grid;
  gap: 1rem;
`;

const PurchaseOption = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  
  h4 {
    font-size: 1.125rem;
    margin: 0 0 0.5rem;
    color: #333;
  }
  
  p {
    font-size: 0.875rem;
    color: #666;
    margin: 0;
  }
  
  .price {
    font-size: 1.25rem;
    font-weight: 700;
    color: #4a6741;
    margin-top: 0.5rem;
  }
  
  .buy-button {
    display: inline-block;
    background-color: #d9534f;
    color: white;
    font-weight: 600;
    text-align: center;
    padding: 0.75rem 1.25rem;
    border-radius: 4px;
    text-decoration: none;
    transition: background-color 0.2s, transform 0.2s;
    
    &:hover {
      background-color: #c9302c;
      transform: translateY(-2px);
    }
    
    @media (min-width: 768px) {
      min-width: 150px;
    }
  }
  
  .best-value {
    background-color: rgba(74, 103, 65, 0.1);
    color: #4a6741;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.5rem;
    border-radius: 20px;
    display: inline-block;
    margin-bottom: 0.5rem;
  }
`;

const FeaturesList = styled.ul`
  columns: 1;
  margin: 0;
  padding-left: 1.5rem;
  
  li {
    margin-bottom: 0.5rem;
  }
  
  @media (min-width: 768px) {
    columns: 2;
  }
`;

const TabsContainer = styled.div`
  margin: 3rem 0;
`;

const TabsNav = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    height: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #ddd;
  }
`;

const Tab = styled.button<{ isActive: boolean }>`
  padding: 0.75rem 1.25rem;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: ${({ isActive }) => (isActive ? '600' : '400')};
  color: ${({ isActive }) => (isActive ? '#4a6741' : '#666')};
  cursor: pointer;
  border-bottom: 2px solid ${({ isActive }) => (isActive ? '#4a6741' : 'transparent')};
  white-space: nowrap;
  
  &:hover {
    color: #4a6741;
  }
`;

const TabContent = styled.div`
  line-height: 1.6;
`;

const RelatedPlansSection = styled.div`
  margin: 3rem 0;
  
  h2 {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
    color: #333;
  }
`;

const RelatedPlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const CallToAction = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  margin: 3rem 0;
  
  h2 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  p {
    max-width: 700px;
    margin: 0 auto 1.5rem;
    color: #666;
  }
  
  .cta-button {
    display: inline-block;
    background-color: #d9534f;
    color: white;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    text-decoration: none;
    transition: background-color 0.2s, transform 0.2s;
    
    &:hover {
      background-color: #c9302c;
      transform: translateY(-2px);
    }
  }
`;

interface PlanDetailPageProps {
  plan: Plan;
}

const PlanDetailPage: React.FC<PlanDetailPageProps> = ({ plan }) => {
  const planUseCases = usePlanUseCases();
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('details');
  const mainImageRef = useRef<HTMLDivElement>(null);
  
  const handleThumbnailClick = (index: number) => {
    setSelectedImage(index);
    if (mainImageRef.current && window.innerWidth < 768) {
      mainImageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleBuyClick = async (purchaseType: string) => {
    try {
      await planUseCases.trackAffiliateLinkClick(
        plan.id,
        plan.category || 'uncategorized',
        purchaseType
      );
    } catch (error) {
      console.error('Error tracking affiliate click:', error);
    }
  };
  
  const pdfLink = planUseCases.generateAffiliateLink(plan, 'pdf-purchase');
  const cadLink = planUseCases.generateAffiliateLink(plan, 'cad-purchase');
  const packageLink = planUseCases.generateAffiliateLink(plan, 'package-purchase');
  
  const { squareFeet, bedrooms, bathrooms, stories, garages, foundation, hasBasement } = plan.details || {};
  const { width, depth } = plan.dimensions || {};
  
  const relatedPlans = Array.from({ length: 3 }, (_, i) => ({
    ...plan,
    id: `related-${i}`,
    name: `Related Plan ${i + 1}`,
    slug: `related-plan-${i + 1}`,
  }));
  
  return (
    <Container>
      <BreadcrumbNav>
        <Link href="/">Home</Link> &gt; <Link href="/house-plans">House Plans</Link> &gt; {plan.name}
      </BreadcrumbNav>
      
      <PlanHeader>
        <h1>
          {plan.name}
          <span className="plan-code">{plan.planNumber}</span>
        </h1>
      </PlanHeader>
      
      <MainContent>
        <div>
          <GallerySection>
            <MainImageContainer ref={mainImageRef}>
              <FallbackImage 
                src={plan.images?.[selectedImage]?.url || ''}
                alt={plan.images?.[selectedImage]?.alt || plan.name}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
                fallbackSrc={`https://placehold.co/800x500?text=${encodeURIComponent(plan.name)}`}
              />
            </MainImageContainer>
            
            <ThumbnailsContainer>
              {plan.images?.map((image, index) => (
                <Thumbnail 
                  key={image.id} 
                  isActive={index === selectedImage}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <FallbackImage 
                    src={image.url}
                    alt={image.alt || `${plan.name} - Image ${index + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="100px"
                    fallbackSrc={`https://placehold.co/100x100?text=Image+${index + 1}`}
                  />
                </Thumbnail>
              ))}
            </ThumbnailsContainer>
          </GallerySection>
          
          <TabsContainer>
            <TabsNav>
              <Tab 
                isActive={activeTab === 'details'}
                onClick={() => setActiveTab('details')}
              >
                Plan Details
              </Tab>
              <Tab 
                isActive={activeTab === 'features'}
                onClick={() => setActiveTab('features')}
              >
                Features
              </Tab>
              <Tab 
                isActive={activeTab === 'specs'}
                onClick={() => setActiveTab('specs')}
              >
                Specifications
              </Tab>
              <Tab 
                isActive={activeTab === 'faq'}
                onClick={() => setActiveTab('faq')}
              >
                FAQ
              </Tab>
            </TabsNav>
            
            <TabContent>
              {activeTab === 'details' && (
                <PlanDescription>
                  <p>{plan.description}</p>
                  <p>
                    This {plan.style} style home offers {bedrooms} bedrooms and {bathrooms} bathrooms
                    in {squareFeet} square feet of living space. The {stories}-story design includes
                    {garages ? ` a ${garages}-car garage` : ' no garage'} 
                    {hasBasement ? ' and a full basement.' : '.'}
                  </p>
                  <p>
                    The floor plan features an open concept living area that's perfect for entertaining,
                    with the kitchen opening to both the dining and living spaces. The master suite includes
                    a luxury bathroom and walk-in closet for added comfort and convenience.
                  </p>
                </PlanDescription>
              )}
              
              {activeTab === 'features' && (
                <div>
                  <h3>Key Features</h3>
                  <FeaturesList>
                    <li>Open concept living, kitchen, and dining areas</li>
                    <li>Master suite with walk-in closet and ensuite bath</li>
                    <li>Covered front porch</li>
                    <li>Spacious kitchen with island</li>
                    <li>Dedicated laundry room</li>
                    <li>Large windows for natural light</li>
                    <li>Flexible bonus space</li>
                    <li>Energy-efficient design</li>
                    {plan.features?.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </FeaturesList>
                </div>
              )}
              
              {activeTab === 'specs' && (
                <div>
                  <h3>Detailed Specifications</h3>
                  <SpecsList>
                    <div className="spec-item">
                      <span className="spec-label">Total Size</span>
                      <span className="spec-value">{squareFeet} sq ft</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Bedrooms</span>
                      <span className="spec-value">{bedrooms}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Bathrooms</span>
                      <span className="spec-value">{bathrooms}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Garage</span>
                      <span className="spec-value">{garages ? `${garages}-car` : 'None'}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Width</span>
                      <span className="spec-value">{width} ft</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Depth</span>
                      <span className="spec-value">{depth} ft</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Foundation</span>
                      <span className="spec-value">{foundation}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Basement</span>
                      <span className="spec-value">{hasBasement ? 'Yes' : 'No'}</span>
                    </div>
                  </SpecsList>
                </div>
              )}
              
              {activeTab === 'faq' && (
                <div>
                  <h3>Frequently Asked Questions</h3>
                  <div style={{ marginTop: '1rem' }}>
                    <h4>What's included with the house plans?</h4>
                    <p>You'll receive complete construction blueprints that include detailed floor plans, elevations, sections, and foundation plans needed to build your home.</p>
                    
                    <h4>Can I modify these plans?</h4>
                    <p>Yes! You can purchase a CAD package for customization, or we can work with you on custom modifications.</p>
                    
                    <h4>How long does it take to receive my plans?</h4>
                    <p>PDF plans are available for immediate download after purchase. Physical prints typically ship within 2-3 business days.</p>
                    
                    <h4>Are materials lists included?</h4>
                    <p>Yes, a comprehensive materials list is included with your house plan purchase.</p>
                  </div>
                </div>
              )}
            </TabContent>
          </TabsContainer>
        </div>
        
        <PlanDetails>
          <DetailsCard>
            <DetailsHeader>Plan Highlights</DetailsHeader>
            <DetailsContent>
              <SpecsList>
                <div className="spec-item">
                  <span className="spec-label">Size</span>
                  <span className="spec-value">{squareFeet} sq ft</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Beds</span>
                  <span className="spec-value">{bedrooms}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Baths</span>
                  <span className="spec-value">{bathrooms}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Floors</span>
                  <span className="spec-value">{stories}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Width</span>
                  <span className="spec-value">{width}′</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Depth</span>
                  <span className="spec-value">{depth}′</span>
                </div>
              </SpecsList>
            </DetailsContent>
          </DetailsCard>
          
          <PurchaseOptions>
            <PurchaseOptionsList>
              <PurchaseOption>
                <div>
                  <h4>PDF Plans</h4>
                  <p>Instant download, print-ready PDF files</p>
                  <div className="price">${plan.pricing?.pdfPrice || plan.pricing?.basePrice}</div>
                </div>
                <a 
                  href={pdfLink} 
                  className="buy-button"
                  onClick={() => handleBuyClick('pdf-purchase')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy PDF Plans
                </a>
              </PurchaseOption>
              
              <PurchaseOption>
                <div>
                  <h4>CAD Plans</h4>
                  <p>Editable CAD files for customization</p>
                  <div className="price">${plan.pricing?.cadPrice || (plan.pricing?.basePrice ? plan.pricing.basePrice * 2 : 'Call for pricing')}</div>
                </div>
                <a 
                  href={cadLink} 
                  className="buy-button"
                  onClick={() => handleBuyClick('cad-purchase')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy CAD Plans
                </a>
              </PurchaseOption>
              
              <PurchaseOption>
                <div>
                  <span className="best-value">BEST VALUE</span>
                  <h4>Complete Package</h4>
                  <p>PDF + CAD files, unlimited revisions support</p>
                  <div className="price">${plan.pricing?.cadPrice ? plan.pricing.cadPrice + 200 : 'Call for pricing'}</div>
                </div>
                <a 
                  href={packageLink} 
                  className="buy-button"
                  onClick={() => handleBuyClick('package-purchase')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy Complete Package
                </a>
              </PurchaseOption>
            </PurchaseOptionsList>
          </PurchaseOptions>
          
          <DetailsCard>
            <DetailsHeader>Need Help?</DetailsHeader>
            <DetailsContent style={{ textAlign: 'center' }}>
              <p style={{ marginBottom: '1rem' }}>
                Questions about this plan or need a custom modification?
              </p>
              <a 
                href="tel:1-800-555-1234"
                style={{ 
                  display: 'block',
                  color: '#4a6741',
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                  marginBottom: '1rem',
                  textDecoration: 'none'
                }}
              >
                Call 1-800-555-1234
              </a>
              <a 
                href="mailto:plans@homedesignfinder.com"
                style={{ 
                  color: '#4a6741',
                  textDecoration: 'underline'
                }}
              >
                Email Our Support Team
              </a>
            </DetailsContent>
          </DetailsCard>
        </PlanDetails>
      </MainContent>
      
      <RelatedPlansSection>
        <h2>Similar House Plans You Might Like</h2>
        <RelatedPlansGrid>
          {relatedPlans.map(relatedPlan => (
            <PlanCard 
              key={relatedPlan.id} 
              plan={relatedPlan} 
              affiliateType="related-plans"
            />
          ))}
        </RelatedPlansGrid>
      </RelatedPlansSection>
      
      <CallToAction>
        <h2>Ready to Build Your Dream Home?</h2>
        <p>
          Take the first step towards building your dream home with our professionally designed house plans. 
          All plans come with a 100% satisfaction guarantee and free modification estimates.
        </p>
        <a 
          href={packageLink}
          className="cta-button"
          onClick={() => handleBuyClick('footer-cta')}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get 50% Off This Plan Today
        </a>
      </CallToAction>
    </Container>
  );
};

export default PlanDetailPage;