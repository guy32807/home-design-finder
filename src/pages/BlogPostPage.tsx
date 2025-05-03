import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams, Link, Navigate } from 'react-router-dom';
import { blogPosts } from '../data/blog-posts';
import { getAffiliateLink } from '../constants/links';
import ReactMarkdown from 'react-markdown';
import ImageWithFallback from '../components/ui/ImageWithFallback';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 1rem;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.textLight};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FeaturedImage = styled(ImageWithFallback)`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.typography.headingFontFamily};
`;

const Meta = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Content = styled.div`
  line-height: 1.8;
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.headingFontFamily};
    margin: 2rem 0 1rem;
  }
  
  p {
    margin-bottom: 1.5rem;
  }
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.primary};
    padding-left: 1rem;
    font-style: italic;
    margin: 2rem 0;
    color: ${({ theme }) => theme.colors.textLight};
  }
  
  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
`;

const RelatedPosts = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const RelatedTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-family: ${({ theme }) => theme.typography.headingFontFamily};
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
`;

const RelatedCard = styled(Link)`
  display: block;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  
  &:hover {
    text-decoration: none;
    h4 {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const RelatedImage = styled(ImageWithFallback)`
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 0.75rem;
`;

const RelatedPostTitle = styled.h4`
  font-size: 1rem;
  transition: color 0.2s;
`;

const Cta = styled.div`
  margin: 3rem 0;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: 8px;
  text-align: center;
`;

const CtaTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.typography.headingFontFamily};
`;

const CtaText = styled.p`
  margin-bottom: 1.5rem;
`;

const CtaButton = styled.a`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    text-decoration: none;
  }
`;

// Custom A component for Markdown that uses affiliate links
const CustomLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  if (href.includes('architecturaldesigns.com')) {
    const source = 'blog_content';
    return (
      <a href={getAffiliateLink(href, source)} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
};

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);
  
  // Use useEffect for SEO instead of Helmet
  useEffect(() => {
    if (post) {
      // Set document title
      document.title = post.seoTitle || post.title;
      
      // Set meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', post.seoDescription || post.excerpt);
      
      // Set meta keywords
      if (post.seoKeywords) {
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
          metaKeywords = document.createElement('meta');
          metaKeywords.setAttribute('name', 'keywords');
          document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute('content', post.seoKeywords.join(', '));
      }
      
      // Set Open Graph tags
      setOpenGraphTag('og:title', post.seoTitle || post.title);
      setOpenGraphTag('og:description', post.seoDescription || post.excerpt);
      setOpenGraphTag('og:image', post.featuredImage);
      setOpenGraphTag('og:type', 'article');
    }
    
    return () => {
      // Clean up effect (optional)
      document.title = 'Home Design Finder';
    };
  }, [post]);
  
  // Helper function to set Open Graph tags
  const setOpenGraphTag = (property: string, content: string) => {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', property);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };
  
  if (!post) {
    return <Navigate to="/blog" replace />;
  }
  
  // Get 3 related posts (excluding current post)
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id)
    .filter(p => p.categories.some(cat => post.categories.includes(cat)))
    .slice(0, 3);
  
  return (
    <>
      <Container>
        <BackLink to="/blog">← Back to all articles</BackLink>
        <FeaturedImage src={post.featuredImage} alt={post.title} />
        <Title>{post.title}</Title>
        <Meta>{post.date} | By {post.author}</Meta>
        
        <Content>
          <ReactMarkdown 
            components={{
              a: CustomLink as any
            }}
          >
            {post.content}
          </ReactMarkdown>
        </Content>
        
        <Cta>
          <CtaTitle>Find Your Perfect House Plan Today</CtaTitle>
          <CtaText>Browse thousands of beautiful home designs and find the perfect plan for your dream home.</CtaText>
          <CtaButton href={getAffiliateLink('house-plans', 'blog_post_cta')} target="_blank" rel="noopener noreferrer">
            Explore House Plans
          </CtaButton>
        </Cta>
        
        {relatedPosts.length > 0 && (
          <RelatedPosts>
            <RelatedTitle>You Might Also Like</RelatedTitle>
            <RelatedGrid>
              {relatedPosts.map(related => (
                <RelatedCard key={related.id} to={`/blog/${related.slug}`}>
                  <RelatedImage src={related.featuredImage} alt={related.title} />
                  <RelatedPostTitle>{related.title}</RelatedPostTitle>
                </RelatedCard>
              ))}
            </RelatedGrid>
          </RelatedPosts>
        )}
      </Container>
    </>
  );
};

export default BlogPostPage;