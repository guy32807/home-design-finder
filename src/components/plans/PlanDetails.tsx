'use client'

import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { usePlanUseCases, useUserUseCases } from '../../adapters/context/AppContext';
import { Plan, PlanImage } from '../../core/domain/entities';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const BreadcrumbNav = styled.nav`
  margin-bottom: 2rem;
  
  ul {
    display: flex;
    list-style: none;
    padding: 0;
    
    li {
      &:not(:last-child)::after {
        content: '>';
        margin: 0 0.5rem;
        color: #999;
      }
      
      a {
        color: #4a6741;
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
        }
      }
      
      &:last-child {
        color: #666;
      }
    }
  }
`;

const PlanHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
  
  .plan-title {
    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }
    
    .plan-number {
      color: #666;
      font-size: 1.1rem;
    }
  }
  
  .price-box {
    background-color: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    
    .price {
      font-size: 2rem;
      font-weight: 700;
      color: #4a6741;
      margin-bottom: 1rem;
    }
    
    .buy-button {
      display: block;
      width: 100%;
      background-color: #4a6741;
      color: white;
      padding: 0.75rem 1rem;
      border-radius: 4px;
      text-align: center;
      text-decoration: none;
      font-weight: 600;
      transition: background-color 0.2s;
      margin-bottom: 1rem;
      
      &:hover {
        background-color: #3a5231;
      }
    }
    
    .package-note {
      font-size: 0.9rem;
      color: #666;
      text-align: center;
    }
  }
`;

const ImageGallery = styled.div`
  margin-bottom: 3rem;
  
  .main-image {
    position: relative;
    width: 100%;
    height: 500px;
    margin-bottom: 1rem;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .thumbnails {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.5rem;
    
    .thumbnail {
      position: relative;
      height: 80px;
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;
      
      &.active {
        border: 2px solid #4a6741;
      }
    }
  }
`;

const PlanContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const PlanDescription = styled.div`
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  p {
    line-height: 1.7;
    color: #444;
    margin-bottom: 1.5rem;
  }
  
  .features {
    margin-top: 2rem;
    
    h3 {
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }
    
    ul {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 0.75rem;
      padding-left: 1.5rem;
      
      li {
        line-height: 1.5;
        color: #444;
      }
    }
  }
`;

const PlanDetailsBox = styled.div`
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  
  h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #333;
  }
  
  .detail-list {
    list-style: none;
    padding: 0;
    
    li {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem 0;
      border-bottom: 1px solid #e1e1e1;
      
      &:last-child {
        border-bottom: none;
      }
      
      .label {
        color: #666;
      }
      
      .value {
        font-weight: 600;
        color: #333;
      }
    }
  }
  
  .dimensions {
    margin-top: 2rem;
    
    h3 {
      margin-bottom: 1rem;
    }
  }
`;

const RelatedPlans = styled.section`
  margin-top: 4rem;
  
  h2 {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .plan-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
  }
`;

interface PlanDetailsProps {
  plan: Plan;
}

const PlanDetails: React.FC<PlanDetailsProps> = ({ plan }) => {
  const [activeImage, setActiveImage] = useState<PlanImage>(
    plan.images.find(img => img.isPrimary) || plan.images[0]
  );
  const planUseCases = usePlanUseCases();
  const userUseCases = useUserUseCases();
  
  const handleThumbnailClick = (image: PlanImage) => {
    setActiveImage(image);
  };
  
  const handleBuyClick = async () => {
    try {
      // Track the affiliate link click
      await planUseCases.trackAffiliateLinkClick(
        plan.id, 
        plan.category, 
        'plan-details-buy'
      );
      
      // If we have a logged-in user, add the plan to recently viewed
      // This would be implemented in a real app
      // if (currentUser) {
      //   await userUseCases.addToRecentlyViewed(currentUser.id, plan.id);
      // }
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  };
  
  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };
  
  return (
    <Container>
      <BreadcrumbNav>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/house-plans">House Plans</Link></li>
          <li>{plan.name}</li>
        </ul>
      </BreadcrumbNav>
      
      <PlanHeader>
        <div className="plan-title">
          <h1>{plan.name}</h1>
          <div className="plan-number">Plan #{plan.planNumber}</div>
        </div>
        
        <div className="price-box">
          <div className="price">{formatPrice(plan.pricing.basePrice)}</div>
          <Link 
            href={planUseCases.generateAffiliateLink(plan, 'plan-details-buy')}
            className="buy-button"
            onClick={handleBuyClick}
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy Plans
          </Link>
          <p className="package-note">Complete package includes all formats</p>
        </div>
      </PlanHeader>
      
      <ImageGallery>
        <div className="main-image">
          <Image 
            src={activeImage.url} 
            alt={activeImage.alt} 
            fill 
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
        </div>
        
        <div className="thumbnails">
          {plan.images.map(image => (
            <div 
              key={image.id}
              className={`thumbnail ${activeImage.id === image.id ? 'active' : ''}`}
              onClick={() => handleThumbnailClick(image)}
            >
              <Image 
                src={image.url} 
                alt={image.alt} 
                fill 
                style={{ objectFit: 'cover' }}
                sizes="100px"
              />
            </div>
          ))}
        </div>
      </ImageGallery>
      
      <PlanContent>
        <PlanDescription>
          <h2>About This Plan</h2>
          <p>{plan.description}</p>
          
          <div className="features">
            <h3>Features</h3>
            <ul>
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </PlanDescription>
        
        <PlanDetailsBox>
          <h3>Quick Details</h3>
          <ul className="detail-list">
            <li>
              <span className="label">Style</span>
              <span className="value">{plan.style}</span>
            </li>
            <li>
              <span className="label">Square Feet</span>
              <span className="value">{plan.details.squareFeet.toLocaleString()}</span>
            </li>
            <li>
              <span className="label">Bedrooms</span>
              <span className="value">{plan.details.bedrooms}</span>
            </li>
            <li>
              <span className="label">Bathrooms</span>
              <span className="value">{plan.details.bathrooms}</span>
            </li>
            <li>
              <span className="label">Garage</span>
              <span className="value">{plan.details.garages}-Car</span>
            </li>
            <li>
              <span className="label">Stories</span>
              <span className="value">{plan.details.stories}</span>
            </li>
            <li>
              <span className="label">Basement</span>
              <span className="value">{plan.details.hasBasement ? 'Yes' : 'No'}</span>
            </li>
            <li>
              <span className="label">Foundation</span>
              <span className="value">{plan.details.foundation}</span>
            </li>
          </ul>
          
          <div className="dimensions">
            <h3>Dimensions</h3>
            <ul className="detail-list">
              <li>
                <span className="label">Width</span>
                <span className="value">{plan.dimensions.width} ft</span>
              </li>
              <li>
                <span className="label">Depth</span>
                <span className="value">{plan.dimensions.depth} ft</span>
              </li>
              <li>
                <span className="label">First Floor</span>
                <span className="value">{plan.dimensions.firstFloorSquareFeet?.toLocaleString() || 'N/A'} sq ft</span>
              </li>
              {plan.dimensions.secondFloorSquareFeet && plan.dimensions.secondFloorSquareFeet > 0 && (
                <li>
                  <span className="label">Second Floor</span>
                  <span className="value">{plan.dimensions.secondFloorSquareFeet.toLocaleString()} sq ft</span>
                </li>
              )}
              {plan.dimensions.basementSquareFeet && plan.dimensions.basementSquareFeet > 0 && (
                <li>
                  <span className="label">Basement</span>
                  <span className="value">{plan.dimensions.basementSquareFeet.toLocaleString()} sq ft</span>
                </li>
              )}
              <li>
                <span className="label">Garage</span>
                <span className="value">{plan.dimensions.garageSquareFeet?.toLocaleString() || 'N/A'} sq ft</span>
              </li>
            </ul>
          </div>
        </PlanDetailsBox>
      </PlanContent>
      
      {/* Related Plans section would be added here */}
      {/* <RelatedPlans>
        <h2>Similar Plans You Might Like</h2>
        <div className="plan-grid">
          {relatedPlans.map(plan => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </RelatedPlans> */}
    </Container>
  );
};

export default PlanDetails;