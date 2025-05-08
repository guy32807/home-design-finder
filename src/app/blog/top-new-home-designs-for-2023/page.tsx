'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { Metadata } from 'next';

const BlogContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`;

const BlogHeader = styled.div`
  margin-bottom: 2rem;
`;

const Breadcrumbs = styled.nav`
  display: flex;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
`;

const BreadcrumbLink = styled(Link)`
  color: var(--color-primary);
  &:hover {
    text-decoration: underline;
  }
`;

const BreadcrumbSeparator = styled.span`
  margin: 0 0.5rem;
  color: var(--color-text-light);
`;

const BlogTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--color-text);
`;

const PublishDate = styled.div`
  font-size: 0.875rem;
  color: var(--color-text-light);
  margin-bottom: 1.5rem;
`;

const FeaturedImage = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
  overflow: hidden;
  
  @media (max-width: 640px) {
    height: 250px;
  }
`;

const BlogContent = styled.div`
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--color-text);
  
  h2 {
    font-size: 1.75rem;
    font-weight: 600;
    margin: 2rem 0 1rem;
  }
  
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 1.5rem 0 1rem;
  }
  
  p {
    margin-bottom: 1.5rem;
  }
  
  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  a {
    color: var(--color-primary);
    text-decoration: underline;
  }
  
  blockquote {
    border-left: 4px solid var(--color-primary);
    padding-left: 1rem;
    font-style: italic;
    margin: 1.5rem 0;
  }
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #10b981; /* Green color */
  color: #ffffff !important; /* White text with !important to override inheritance */
  font-weight: 700;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  text-decoration: none !important; /* Prevent underline from link styling */
  margin: 1rem 0 2rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #059669; /* Darker green for hover */
    color: #ffffff !important; /* Ensure text stays white on hover */
  }
  
  &::after {
    content: "→";
    margin-left: 0.5rem;
    font-size: 1.125rem;
  }
`;

const RelatedPlansSection = styled.div`
  margin-top: 3rem;
`;

const RelatedPlansTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const RelatedPlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const RelatedPlanCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const RelatedPlanImage = styled.div`
  position: relative;
  height: 150px;
`;

const RelatedPlanTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  padding: 1rem;
  margin: 0;
`;

const ShareSection = styled.div`
  margin: 2.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ShareTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ShareButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const ShareButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f3f4f6;
  color: var(--color-text);
  transition: background-color 0.2s;
  
  &:hover {
    background-color: var(--color-primary);
    color: white;
  }
`;

export default function NewHomeDesignsBlog() {
  const publishDate = "May 7, 2023";
  
  // Generate social media share links
  const pageUrl = "https://homedesignfinder.com/blog/top-new-home-designs-for-2023";
  const pageTitle = "10 Stunning New Home Designs for 2023 | Find Your Dream Home";
  
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`, '_blank');
  };
  
  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(pageTitle)}&url=${encodeURIComponent(pageUrl)}`, '_blank');
  };
  
  const shareOnPinterest = () => {
    const imageUrl = "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80";
    window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(pageUrl)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(pageTitle)}`, '_blank');
  };
  
  const shareViaEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(pageTitle)}&body=${encodeURIComponent(`I thought you might be interested in this article: ${pageUrl}`)}`;
  };
  
  return (
    <BlogContainer>
      <BlogHeader>
        <Breadcrumbs>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
          <BreadcrumbSeparator>›</BreadcrumbSeparator>
          <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
          <BreadcrumbSeparator>›</BreadcrumbSeparator>
          <span>10 Stunning New Home Designs for 2023</span>
        </Breadcrumbs>
        
        <BlogTitle>10 Stunning New Home Designs for 2023: Trends and Innovations</BlogTitle>
        <PublishDate>Published on {publishDate}</PublishDate>
      </BlogHeader>
      
      <FeaturedImage>
        <Image 
          src="https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1600&q=80" 
          alt="Modern Farmhouse Home Design"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </FeaturedImage>
      
      <BlogContent>
        <p>
          As we settle into 2023, the world of home design continues to evolve with exciting new architectural trends, 
          innovative floor plans, and thoughtful features that reflect our changing lifestyles. Whether you're 
          planning to build your dream home or simply exploring ideas for the future, staying informed about the 
          latest design trends can provide valuable inspiration.
        </p>
        
        <p>
          In this article, we'll explore ten stunning new home designs that are capturing attention in 2023, 
          from modern farmhouses to energy-efficient contemporary homes. Each of these designs offers a unique 
          blend of functionality, aesthetic appeal, and forward-thinking features to meet the needs of today's homeowners.
        </p>
        
        <h2>1. Modern Farmhouse with Flex Spaces</h2>
        <p>
          The modern farmhouse trend continues to dominate in 2023, but with a practical twist: flex spaces that can 
          adapt to changing needs. These homes feature the classic farmhouse elements we love—board and batten siding, 
          gabled roofs, and cozy front porches—combined with versatile interior spaces that can serve as home offices, 
          study areas, or guest accommodations.
        </p>
        <p>
          Key features include open concept living areas, large kitchen islands, and dedicated spaces for remote work. 
          Natural materials like wood and stone create warmth, while clean lines maintain a contemporary feel.
        </p>
        
        <h2>2. Sustainable Ranch Designs</h2>
        <p>
          Ranch homes are experiencing a renaissance with eco-friendly updates. These single-level homes now 
          incorporate sustainable features like solar panels, energy-efficient windows, and advanced insulation. 
          Their sprawling layouts provide ample space for families while eliminating the need for stairs—perfect 
          for accessibility and aging in place.
        </p>
        <p>
          Modern ranch designs often include indoor-outdoor living spaces, vaulted ceilings, and split bedroom 
          layouts for privacy. Their horizontal profiles blend beautifully with natural surroundings, making them 
          ideal for scenic lots.
        </p>
        
        <h2>3. Contemporary Minimalist Homes</h2>
        <p>
          For those who prefer a "less is more" approach, contemporary minimalist designs offer clean lines, 
          uncluttered spaces, and a focus on functionality. These homes feature large windows that flood interiors 
          with natural light, flat or low-pitched roofs, and thoughtfully designed storage solutions that maintain 
          the minimal aesthetic.
        </p>
        <p>
          Materials like concrete, glass, and metal create a sophisticated palette, while carefully selected 
          accent features provide visual interest without overwhelming the space.
        </p>
        
        <h2>4. Craftsman-Inspired New Builds</h2>
        <p>
          Craftsman designs continue to appeal to those who appreciate architectural character and handcrafted 
          details. Modern interpretations maintain the signature elements—exposed beams, tapered columns, and 
          built-in cabinetry—while incorporating open floor plans and contemporary amenities.
        </p>
        <p>
          These homes typically feature welcoming front porches, natural materials, and interiors rich with 
          millwork and trim details. Their thoughtful designs create a perfect balance of comfort and craftsmanship.
        </p>
        
        <CTAButton href="https://www.kqzyfj.com/click-9083409-13731632" target="_blank" rel="noopener noreferrer">
          Explore These Home Designs & More
        </CTAButton>
        
        <h2>5. Multi-Generational Living Designs</h2>
        <p>
          As more families embrace multi-generational living, home designs have evolved to accommodate this lifestyle. 
          These plans include primary suites on the main level plus secondary suites with private entrances, 
          kitchenettes, and living areas—perfect for adult children, aging parents, or rental income.
        </p>
        <p>
          Common areas are designed for gathering, with spacious kitchens and family rooms that can accommodate 
          larger groups. Thoughtful sound insulation and layout planning ensure privacy for all residents.
        </p>
        
        <h2>6. Cottage-Inspired Small Homes</h2>
        <p>
          For those embracing downsizing or seeking more affordable options, cottage-inspired designs offer charm 
          and efficiency in smaller footprints. These homes maximize every square foot with built-in storage, 
          multi-purpose rooms, and clever space-saving solutions.
        </p>
        <p>
          Despite their smaller size, these designs incorporate delightful details like window seats, built-in 
          bookshelves, and character-rich exteriors. Their efficient layouts reduce building costs and energy 
          usage without sacrificing comfort.
        </p>
        
        <h2>7. Modernized Mediterranean Villas</h2>
        <p>
          Mediterranean-inspired designs have been reimagined for contemporary living. These homes feature 
          stucco exteriors, tiled roofs, and arched elements combined with modern floor plans and energy-efficient 
          features.
        </p>
        <p>
          Indoor-outdoor living is emphasized with courtyards, covered patios, and large sliding doors that 
          create a seamless flow between spaces. Light color palettes and natural materials maintain the 
          Mediterranean aesthetic while feeling fresh and current.
        </p>
        
        <h2>8. Urban-Inspired Suburban Homes</h2>
        <p>
          As more people move from cities to suburbs, designs that blend urban sophistication with suburban space 
          have gained popularity. These homes feature vertical designs with rooftop decks, industrial-inspired 
          elements, and sleek finishes more commonly associated with urban lofts.
        </p>
        <p>
          Open concept living areas, home offices, and flexible spaces accommodate work-from-home arrangements, 
          while larger lots allow for outdoor living spaces that weren't possible in city dwellings.
        </p>
        
        <h2>9. Smart Homes with Integrated Technology</h2>
        <p>
          Technology integration has become a central feature in new home designs. These "smart homes" incorporate 
          advanced systems for climate control, security, lighting, and entertainment that can be controlled 
          remotely or through voice commands.
        </p>
        <p>
          Dedicated tech spaces, integrated charging stations, and pre-wiring for current and future technologies 
          ensure these homes will remain functional as technology evolves. Energy management systems help reduce 
          consumption and costs while maintaining comfort.
        </p>
        
        <h2>10. Outdoor Living-Focused Designs</h2>
        <p>
          After spending more time at home in recent years, homeowners are prioritizing outdoor living spaces. 
          New designs feature expansive covered porches, outdoor kitchens, fire pits, and seamless transitions 
          between indoor and outdoor areas.
        </p>
        <p>
          These homes are oriented to maximize natural views and privacy, with large windows and glass doors 
          that visually extend living spaces. Thoughtful landscaping and hardscaping create outdoor rooms that 
          function as extensions of the home.
        </p>
        
        <h2>Finding Your Perfect Home Design</h2>
        <p>
          When exploring these exciting new home designs, consider your family's unique needs, lifestyle, and 
          long-term goals. The perfect plan balances current trends with timeless elements that will serve you 
          well for years to come.
        </p>
        <p>
          Working with a professional can help you identify the features that will best suit your needs and 
          adapt designs to your specific requirements. Many home plan companies offer customization services 
          to modify existing plans, saving you the expense of completely custom designs while still creating 
          a home that's uniquely yours.
        </p>
        
        <CTAButton href="https://www.kqzyfj.com/click-9083409-13731632" target="_blank" rel="noopener noreferrer">
          Browse Thousands of House Plans
        </CTAButton>
        
        <p>
          Whether you're drawn to the warmth of a modern farmhouse, the efficiency of a minimalist design, or 
          the character of a craftsman home, today's new home plans offer innovative features and thoughtful 
          layouts to enhance your lifestyle. By exploring these trending designs, you're one step closer to 
          finding or creating the home of your dreams.
        </p>
      </BlogContent>
      
      <ShareSection>
        <ShareTitle>Share This Article</ShareTitle>
        <ShareButtons>
          <ShareButton onClick={shareOnFacebook} title="Share on Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </ShareButton>
          <ShareButton onClick={shareOnTwitter} title="Share on Twitter">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </ShareButton>
          <ShareButton onClick={shareOnPinterest} title="Share on Pinterest">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
            </svg>
          </ShareButton>
          <ShareButton onClick={shareViaEmail} title="Share via Email">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </ShareButton>
        </ShareButtons>
      </ShareSection>
      
      <RelatedPlansSection>
        <RelatedPlansTitle>You Might Also Like</RelatedPlansTitle>
        <RelatedPlansGrid>
          <RelatedPlanCard>
            <RelatedPlanImage>
              <Image
                src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=600&q=80"
                alt="Craftsman Home Plan"
                fill
                style={{ objectFit: 'cover' }}
              />
            </RelatedPlanImage>
            <RelatedPlanTitle>
              <Link href="/blog/craftsman-style-homes">Craftsman Style Homes: A Complete Guide</Link>
            </RelatedPlanTitle>
          </RelatedPlanCard>
          
          <RelatedPlanCard>
            <RelatedPlanImage>
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
                alt="Energy Efficient Home"
                fill
                style={{ objectFit: 'cover' }}
              />
            </RelatedPlanImage>
            <RelatedPlanTitle>
              <Link href="/blog/energy-efficient-home-designs">5 Energy-Efficient Home Designs</Link>
            </RelatedPlanTitle>
          </RelatedPlanCard>
          
          <RelatedPlanCard>
            <RelatedPlanImage>
              <Image
                src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80"
                alt="Small House Plans"
                fill
                style={{ objectFit: 'cover' }}
              />
            </RelatedPlanImage>
            <RelatedPlanTitle>
              <Link href="/blog/small-house-plans">Small House Plans with Big Impact</Link>
            </RelatedPlanTitle>
          </RelatedPlanCard>
        </RelatedPlansGrid>
      </RelatedPlansSection>
    </BlogContainer>
  );
}