'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

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
  width: 100%;
  height: 400px;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
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
  background-color: #10b981; /* Green color to match the blog page */
  color: #ffffff !important; /* White text with !important to override any inheritance */
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

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 2rem 0;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const GalleryImage = styled.div`
  height: 200px;
  border-radius: 0.25rem;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function CraftsmanStyleHomesBlogPost() {
  const publishDate = "April 22, 2023";
  const affiliateLink = "https://www.kqzyfj.com/click-9083409-14053933";
  
  return (
    <BlogContainer>
      <BlogHeader>
        <Breadcrumbs>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
          <BreadcrumbSeparator>›</BreadcrumbSeparator>
          <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
          <BreadcrumbSeparator>›</BreadcrumbSeparator>
          <span>Craftsman Style Homes</span>
        </Breadcrumbs>
        
        <BlogTitle>Craftsman Style Homes: A Complete Guide</BlogTitle>
        <PublishDate>Published on {publishDate} • Last Updated: April 2023</PublishDate>
      </BlogHeader>
      
      <FeaturedImage>
        <img 
          src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1600&q=80" 
          alt="Beautiful Craftsman Style Home Exterior"
        />
      </FeaturedImage>
      
      <BlogContent>
        <p>
          Craftsman style homes remain one of America's most beloved architectural designs, prized for their 
          handcrafted details, natural materials, and warm, inviting character. Born from the Arts and Crafts movement 
          of the early 20th century, these distinctive homes represent more than just a building style—they embody 
          a philosophy celebrating craftsmanship, simplicity, and a connection to nature.
        </p>
        
        <p>
          This comprehensive guide explores everything you need to know about Craftsman architecture, from its 
          rich history to identifying key features, popular variations, and tips for maintaining these classic 
          American homes.
        </p>
        
        <h2>The History and Philosophy of Craftsman Architecture</h2>
        <p>
          The Craftsman movement emerged in the United States around 1905 as a reaction against the ornate, 
          mass-produced elements of Victorian architecture and the Industrial Revolution. Influenced by the 
          British Arts and Crafts movement led by William Morris and John Ruskin, American designers like 
          Gustav Stickley championed a return to handcraftsmanship, simplicity, and the use of local natural 
          materials.
        </p>
        
        <p>
          Stickley popularized the style through his magazine, "The Craftsman," which featured house plans and 
          promoted the ideology that homes should be built with integrity, simplicity, and craftsmanship. The style 
          quickly resonated with middle-class Americans who valued quality construction and a connection to nature.
        </p>
        
        <p>
          Unlike the elaborate Victorian homes that preceded them, Craftsman houses were designed to be practical, 
          economical, and harmonious with their surroundings. They featured open floor plans, built-in furniture, 
          and natural materials that celebrated the beauty of craftsmanship.
        </p>
        
        <h2>Key Features of Craftsman Style Homes</h2>
        <p>
          Craftsman homes are immediately recognizable by their distinctive architectural elements. Here are the 
          defining features that set them apart:
        </p>
        
        <h3>Exterior Features</h3>
        <ul>
          <li><strong>Low-Pitched Rooflines</strong> - Usually gabled or hipped, with wide eave overhangs</li>
          <li><strong>Exposed Rafter Tails</strong> - Visible structural elements under the eaves</li>
          <li><strong>Decorative Knee Braces</strong> - Supporting the gables and overhangs</li>
          <li><strong>Substantial, Tapered Columns</strong> - Often set on stone or brick piers extending to ground level</li>
          <li><strong>Expansive Front Porches</strong> - Designed as extensions of the living space</li>
          <li><strong>Mixed Materials</strong> - Combinations of stone, brick, wood siding, and shingles</li>
          <li><strong>Handcrafted Stone or Woodwork</strong> - Reflecting the movement's emphasis on craftsmanship</li>
          <li><strong>Earth-Toned Colors</strong> - Harmonizing with natural surroundings</li>
        </ul>
        
        <ImageGallery>
          <GalleryImage>
            <img 
              src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80" 
              alt="Craftsman Home with Front Porch"
            />
          </GalleryImage>
          <GalleryImage>
            <img 
              src="https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?auto=format&fit=crop&w=800&q=80" 
              alt="Craftsman Interior with Wood Detailing"
            />
          </GalleryImage>
          <GalleryImage>
            <img 
              src="https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=800&q=80" 
              alt="Craftsman Style Built-In Cabinetry"
            />
          </GalleryImage>
        </ImageGallery>
        
        <h3>Interior Features</h3>
        <ul>
          <li><strong>Open Floor Plans</strong> - Flowing spaces that promote family interaction</li>
          <li><strong>Built-In Furniture</strong> - Bookcases, window seats, and cabinetry</li>
          <li><strong>Prominent Fireplaces</strong> - Often featuring handcrafted tile or stonework</li>
          <li><strong>Natural Materials</strong> - Abundant use of wood, stone, and handmade tile</li>
          <li><strong>Beamed Ceilings</strong> - Exposing structural elements as decorative features</li>
          <li><strong>Extensive Woodwork</strong> - Including wainscoting, crown molding, and plate rails</li>
          <li><strong>Stained Glass</strong> - In windows and light fixtures, often with nature motifs</li>
          <li><strong>Warm Color Palette</strong> - Earth tones complementing the natural materials</li>
        </ul>
        
        <h2>Popular Variations of Craftsman Style Homes</h2>
        <p>
          While sharing core principles, Craftsman architecture evolved into several distinct variations across the country:
        </p>
        
        <h3>Bungalow Craftsman</h3>
        <p>
          The most common type, these modest one to one-and-a-half-story homes featured low-pitched roofs and expansive front 
          porches. They became incredibly popular in growing suburbs of the early 20th century due to their affordability 
          and style. California bungalows often featured redwood siding and were adapted to the warmer climate.
        </p>
        
        <h3>Prairie Style</h3>
        <p>
          Developed by Frank Lloyd Wright and the Chicago school of architects, Prairie style homes emphasized horizontal 
          lines, flat or hipped roofs with broad eaves, and rows of windows. While distinct from classic Craftsman designs, 
          they shared the Arts and Crafts philosophy of organic architecture and craftsmanship.
        </p>
        
        <h3>Four-Square</h3>
        <p>
          These homes featured a simple, box-like design with four roughly equal-sized rooms on each floor, a low-hipped 
          roof, and a front porch spanning the width of the house. They incorporated Craftsman details while providing more 
          space for growing families.
        </p>
        
        <h3>Tudor Revival Craftsman</h3>
        <p>
          This variation incorporated Tudor elements like steeply pitched roofs and decorative half-timbering while 
          maintaining Craftsman characteristics such as natural materials and exposed structural elements.
        </p>
        
        <CTAButton href={affiliateLink} target="_blank" rel="noopener noreferrer">
          Browse Craftsman House Plans
        </CTAButton>
        
        <h2>The Enduring Legacy and Modern Interpretations</h2>
        <p>
          Though the original Craftsman movement peaked between 1905 and 1930, its influence continues to resonate in American 
          architecture. After decades of modernist and minimalist trends, homeowners rediscovered the charm and quality of 
          Craftsman homes in the late 20th century, leading to a revival that continues today.
        </p>
        
        <p>
          Modern interpretations blend traditional Craftsman elements with contemporary amenities and building techniques:
        </p>
        
        <ul>
          <li><strong>Neo-Craftsman Homes</strong> - New constructions that honor traditional features while incorporating modern 
          floor plans and energy-efficient systems</li>
          
          <li><strong>Craftsman-Inspired Designs</strong> - Contemporary homes that borrow select elements like columns, porches, 
          and natural materials</li>
          
          <li><strong>Craftsman Renovations</strong> - Thoughtful updates to historic homes that preserve character while adding 
          modern functionality</li>
        </ul>
        
        <h2>Living in and Maintaining a Craftsman Home</h2>
        <p>
          Owning a Craftsman home offers unique joys and responsibilities. These houses were built to last, with quality 
          materials and construction techniques that have stood the test of time. However, maintaining their historic 
          character requires special attention:
        </p>
        
        <h3>Preservation Considerations</h3>
        <ul>
          <li><strong>Research Your Home's History</strong> - Understanding original details helps guide authentic restorations</li>
          
          <li><strong>Respect Original Materials</strong> - Repair rather than replace whenever possible</li>
          
          <li><strong>Use Period-Appropriate Colors</strong> - Earth tones like olive green, russet, brown, and muted blues</li>
          
          <li><strong>Preserve Woodwork</strong> - Avoid painting over original stained wood elements</li>
          
          <li><strong>Retain Original Windows</strong> - Historic windows can be made energy-efficient without replacement</li>
        </ul>
        
        <h3>Updating for Modern Living</h3>
        <p>
          Craftsman homes can be sensitively updated to accommodate contemporary lifestyles:
        </p>
        
        <ul>
          <li><strong>Kitchen Expansions</strong> - Often accomplished by incorporating adjacent pantries or small rooms</li>
          
          <li><strong>Bathroom Updates</strong> - Adding modern fixtures while preserving period details like subway tile and hexagonal floor tiles</li>
          
          <li><strong>Energy Efficiency</strong> - Adding insulation, weather-stripping, and updating systems without compromising architectural integrity</li>
          
          <li><strong>Thoughtful Additions</strong> - Designing new spaces that complement and honor the original architecture</li>
        </ul>
        
        <h2>Why Craftsman Homes Remain Popular Today</h2>
        <p>
          The enduring appeal of Craftsman architecture stems from qualities that transcend trends:
        </p>
        
        <ul>
          <li><strong>Human Scale and Comfort</strong> - These homes feel welcoming and proportioned to human needs</li>
          
          <li><strong>Connection to Nature</strong> - From materials to porches to garden integration, Craftsman homes bridge indoor and outdoor living</li>
          
          <li><strong>Quality and Authenticity</strong> - The emphasis on craftsmanship resonates in an era of mass production</li>
          
          <li><strong>Versatility</strong> - The style adapts well to different regions, lot sizes, and homeowner needs</li>
          
          <li><strong>Community Integration</strong> - Front porches and pedestrian-friendly designs promote neighborhood connection</li>
        </ul>
        
        <CTAButton href={affiliateLink} target="_blank" rel="noopener noreferrer">
          Explore Craftsman Home Designs
        </CTAButton>
        
        <h2>Conclusion: The Timeless Appeal of Craftsman Architecture</h2>
        <p>
          Craftsman homes represent a uniquely American architectural tradition that continues to resonate with homeowners 
          seeking quality, character, and connection. Whether you're restoring a historic bungalow, building a new home with 
          Craftsman inspiration, or simply appreciating these architectural gems in your neighborhood, understanding their 
          history and features deepens appreciation for their enduring legacy.
        </p>
        
        <p>
          These homes remind us that good design isn't just about aesthetics—it's about creating spaces that support how we 
          live, connecting us to natural materials, and celebrating the value of craftsmanship. In a rapidly changing world, 
          the principles behind Craftsman architecture offer timeless lessons about building homes that truly nurture the 
          human spirit.
        </p>
      </BlogContent>
    </BlogContainer>
  );
}