import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { blogPosts } from '../data/blog-posts';
import SeoHead from '../components/SEO/SeoHead';
import { AFFILIATE_LINKS } from '../constants/links';
import Breadcrumbs from '../components/navigation/Breadcrumbs';
import ReactMarkdown from 'react-markdown';
import Button from '../components/ui/Button';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const PostTitle = styled.h1`
  font-size: 2.5rem;
  margin: 1rem 0;
  line-height: 1.2;
`;

const PostMeta = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const FeaturedImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const PostContent = styled.div`
  line-height: 1.8;
  font-size: 1.1rem;
  
  p {
    margin-bottom: 1.5rem;
  }
  
  h2 {
    font-size: 1.8rem;
    margin: 2rem 0 1rem;
  }
  
  h3 {
    font-size: 1.4rem;
    margin: 1.5rem 0 1rem;
  }
  
  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }

  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.primary};
    padding-left: 1rem;
    font-style: italic;
    margin: 1.5rem 0;
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const CTABox = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundAlt || '#f5f7fa'};
  border-radius: 8px;
  padding: 2rem;
  margin: 3rem 0;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.borderLight || '#e0e0e0'};
`;

const CTAHeading = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const CTAText = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
`;

const StyledLink = styled.a`
  text-decoration: none;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 2rem 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const GridImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
`;

const FeaturedPlan = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const PlanImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    width: 300px;
    margin-bottom: 0;
    margin-right: 1.5rem;
  }
`;

const PlanContent = styled.div`
  flex: 1;
`;

const PlanTitle = styled.h3`
  margin-bottom: 0.5rem;
`;

const PlanDetails = styled.p`
  margin-bottom: 1rem;
`;

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any | null>(null);
  
  useEffect(() => {
    // Find the post with the matching slug
    const foundPost = blogPosts.find(p => p.slug === slug);
    setPost(foundPost || null);
    
    // Scroll to top when post changes
    window.scrollTo(0, 0);
  }, [slug]);
  
  if (!post) {
    return (
      <Container>
        <h1>Post Not Found</h1>
        <p>Sorry, the blog post you're looking for doesn't exist.</p>
        <BackLink to="/blog">← Back to Blog</BackLink>
      </Container>
    );
  }
  
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: post.title, path: `/blog/${post.slug}`, isLast: true }
  ];

  return (
    <Container>
      <SeoHead
        title={post.seoTitle || `${post.title} | Home Design Finder Blog`}
        description={post.seoDescription || post.excerpt}
        keywords={post.seoKeywords?.join(', ')}
        image={post.featuredImage}
        type="article"
        articlePublishedTime={post.date}
        articleTags={post.tags}
      />
      
      <Breadcrumbs items={breadcrumbItems} />
      
      <PostTitle>{post.title}</PostTitle>
      <PostMeta>{post.date} | By {post.author}</PostMeta>
      
      <FeaturedImage src={post.featuredImage} alt={post.title} />
      
      <PostContent>
        {/* Mid-article CTA for ALL blog posts */}
        <CTABox>
          <CTAHeading>Discover Your Dream Home Design</CTAHeading>
          <CTAText>
            Browse thousands of beautiful house plans from top architects and designers.
            Find the perfect floor plan for your lifestyle and budget.
          </CTAText>
          <StyledLink 
            href={AFFILIATE_LINKS.housePlans}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button $primary $large>
              Explore House Plans
            </Button>
          </StyledLink>
        </CTABox>
        
        {/* If we have content in the data, use that */}
        {post.content && <ReactMarkdown>{post.content}</ReactMarkdown>}
        
        {/* For the specific Modern Farmhouse post, add a CTA */}
        {post.slug === 'modern-farmhouse-design-trend' && (
          <>
            <h2>What Makes Modern Farmhouse Design So Popular?</h2>
            <p>
              The modern farmhouse style has become one of the most sought-after design trends in recent years. 
              Combining rustic charm with contemporary clean lines, this style offers warmth, comfort, and timeless appeal.
            </p>
            
            <CTABox>
              <CTAHeading>Find Your Perfect Modern Farmhouse Plan</CTAHeading>
              <CTAText>
                Browse our curated collection of modern farmhouse designs featuring open floor plans, 
                farmhouse sinks, shiplap walls, and all the charming details you love.
              </CTAText>
              <StyledLink 
                href={`${AFFILIATE_LINKS.housePlans}?style=farmhouse`} 
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button $primary $large>
                  View Modern Farmhouse Plans
                </Button>
              </StyledLink>
            </CTABox>
            
            <h2>Featured Modern Farmhouse Plans</h2>
            <p>
              These standout designs exemplify the best elements of modern farmhouse style. 
              Each combines timeless farmhouse elements with contemporary features for comfortable family living.
            </p>
            
            <FeaturedPlan>
              <PlanImage 
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Modern Farmhouse Plan #1" 
              />
              <PlanContent>
                <PlanTitle>Modern Farmhouse with Wrap-Around Porch</PlanTitle>
                <PlanDetails>
                  3,200 sq ft • 4 bed • 3.5 bath • 2-story • 2-car garage
                </PlanDetails>
                <p>
                  This spacious design features an open concept layout, primary suite on the main floor, 
                  and a stunning wrap-around porch perfect for outdoor living.
                </p>
                <StyledLink 
                  href={AFFILIATE_LINKS.housePlans} 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginTop: '1rem', display: 'inline-block' }}
                >
                  <Button $primary>
                    View Plan Details
                  </Button>
                </StyledLink>
              </PlanContent>
            </FeaturedPlan>
            
            <FeaturedPlan>
              <PlanImage 
                src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Modern Farmhouse Plan #2" 
              />
              <PlanContent>
                <PlanTitle>Compact Modern Farmhouse</PlanTitle>
                <PlanDetails>
                  1,800 sq ft • 3 bed • 2 bath • 1-story • 2-car garage
                </PlanDetails>
                <p>
                  Perfect for smaller lots, this efficient design doesn't sacrifice style or comfort. 
                  Features include a vaulted great room, farmhouse kitchen with large island, and a cozy front porch.
                </p>
                <StyledLink 
                  href={AFFILIATE_LINKS.housePlans} 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginTop: '1rem', display: 'inline-block' }}
                >
                  <Button $primary>
                    View Plan Details
                  </Button>
                </StyledLink>
              </PlanContent>
            </FeaturedPlan>
            
            <h2>Modern Farmhouse Interior Design Gallery</h2>
            <p>
              Get inspired by these stunning modern farmhouse interiors that showcase the perfect blend of rustic charm and contemporary style.
            </p>
            
            <ImageGrid>
              <GridImage 
                src="https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Modern Farmhouse Kitchen" 
              />
              <GridImage 
                src="https://images.unsplash.com/photo-1594728613861-f71f4a34a01c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Modern Farmhouse Living Room" 
              />
              <GridImage 
                src="https://images.unsplash.com/photo-1595514535415-dae8970c1bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Modern Farmhouse Bathroom" 
              />
              <GridImage 
                src="https://images.unsplash.com/photo-1564078516393-cf04bd966897?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Modern Farmhouse Bedroom" 
              />
            </ImageGrid>
          </>
        )}
        
        {/* For choosing-perfect-house-plan blog post */}
        {post.slug === 'choosing-perfect-house-plan' && (
          <>
            <h2>How to Match Your Lifestyle with the Perfect Floor Plan</h2>
            <p>
              Your home should be as unique as your family. When choosing a house plan, consider how 
              you actually live day to day, not just what looks appealing in photos. Are you entertainers who need an 
              open concept? Do you work from home and require dedicated office space? These lifestyle questions 
              will guide you to a floor plan that truly works for your family.
            </p>
            
            <FeaturedPlan>
              <PlanImage 
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Family-Friendly Open Concept Plan" 
              />
              <PlanContent>
                <PlanTitle>Family-Friendly Open Concept</PlanTitle>
                <PlanDetails>
                  2,500 sq ft • 4 bed • 3 bath • Great for families with children
                </PlanDetails>
                <p>
                  Perfect for families who value togetherness, this open concept design keeps the kitchen, 
                  dining, and living areas connected while providing private bedrooms and a dedicated play space.
                </p>
                <StyledLink 
                  href={AFFILIATE_LINKS.housePlans} 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginTop: '1rem', display: 'inline-block' }}
                >
                  <Button $primary>
                    View Similar Plans
                  </Button>
                </StyledLink>
              </PlanContent>
            </FeaturedPlan>
            
            <h2>Budget Considerations When Selecting House Plans</h2>
            <p>
              Beyond the initial cost of purchasing plans, consider the long-term value and construction costs. 
              Complex rooflines, numerous corners, and custom features add expense. A well-designed, efficient 
              plan can save tens of thousands in building costs while still delivering the features you need.
            </p>
            
            {/* Add a CTA in the middle of the article */}
            <CTABox>
              <CTAHeading>Find Your Perfect House Plan Today</CTAHeading>
              <CTAText>Browse thousands of beautiful, customizable house plans that match your family's unique needs and style preferences.</CTAText>
              <StyledLink 
                href={AFFILIATE_LINKS.housePlans} 
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button $primary $large>
                  Explore House Plans
                </Button>
              </StyledLink>
            </CTABox>
            
            <FeaturedPlan>
              <PlanImage 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Cost-Effective Ranch Design" 
              />
              <PlanContent>
                <PlanTitle>Cost-Effective Ranch Design</PlanTitle>
                <PlanDetails>
                  1,800 sq ft • 3 bed • 2 bath • Budget-friendly construction
                </PlanDetails>
                <p>
                  This ranch-style home features a simple, efficient layout that maximizes every square foot, 
                  resulting in lower construction costs without sacrificing quality or comfort.
                </p>
                <StyledLink 
                  href={AFFILIATE_LINKS.housePlans} 
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginTop: '1rem', display: 'inline-block' }}
                >
                  <Button $primary>
                    View Similar Plans
                  </Button>
                </StyledLink>
              </PlanContent>
            </FeaturedPlan>
          </>
        )}
        
        {/* End-of-article CTA for ALL blog posts */}
        <CTABox>
          <CTAHeading>Ready to Find Your Dream Home Design?</CTAHeading>
          <CTAText>Architectural Designs offers thousands of house plans in every style and size. Start your journey to your perfect home today!</CTAText>
          <StyledLink 
            href={AFFILIATE_LINKS.main} 
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button $primary $large>
              Browse House Plans
            </Button>
          </StyledLink>
        </CTABox>
      </PostContent>
      
      <BackLink to="/blog">← Back to Blog</BackLink>
    </Container>
  );
};

export default BlogPostPage;