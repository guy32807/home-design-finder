'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

const BlogContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem;
`;

const BlogHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const BlogTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const BlogDescription = styled.p`
  font-size: 1.125rem;
  color: var(--color-text-light);
  max-width: 800px;
  margin: 0 auto;
`;

const FeaturedPost = styled.div`
  margin-bottom: 3rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const FeaturedPostImage = styled.div`
  position: relative;
  height: 400px;
  
  @media (max-width: 640px) {
    height: 250px;
  }
`;

const FeaturedPostContent = styled.div`
  padding: 2rem;
  background-color: white;
`;

const FeaturedPostTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const FeaturedPostExcerpt = styled.p`
  font-size: 1.125rem;
  color: var(--color-text-light);
  margin-bottom: 1.5rem;
`;

const FeaturedPostLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  background-color: #3b82f6; /* Explicit blue color instead of variable */
  color: #ffffff; /* Explicit white color */
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  text-decoration: none;
  
  &:hover {
    background-color: var(--color-primary-dark);
  }
  
  svg {
    margin-left: 0.5rem;
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const BlogCard = styled.div`
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const BlogCardImage = styled.div`
  position: relative;
  height: 200px;
`;

const BlogCardContent = styled.div`
  padding: 1.5rem;
  background-color: white;
`;

const BlogCardCategory = styled.div`
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`;

const BlogCardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  
  a {
    color: var(--color-text);
    text-decoration: none;
    
    &:hover {
      color: var(--color-primary);
    }
  }
`;

const BlogCardDate = styled.div`
  font-size: 0.875rem;
  color: var(--color-text-light);
`;

const ReadMoreLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  background-color: var(--color-primary);
  color: white; /* This ensures white text on colored background */
  font-weight: 500;
  margin-top: 1rem;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  text-decoration: none;
  
  &:hover {
    background-color: var(--color-primary-dark);
  }
  
  svg {
    margin-left: 0.5rem;
    width: 16px;
    height: 16px;
  }
`;

export default function BlogPage() {
  const blogPosts = [
    {
      id: 0,
      title: 'Barndominium Collection: The Ultimate Guide to Metal Building Homes',
      excerpt: 'Discover everything about barndominiums: costs, floor plans, pros and cons, financing options, and design ideas for these popular metal building homes.',
      category: 'Home Trends',
      date: 'May 7, 2023',
      image: 'https://images.unsplash.com/photo-1594494842689-58a8a28df7b7?auto=format&fit=crop&w=1000&q=80',
      slug: 'barndominium-collection-ultimate-guide',
      featured: true
    },
    {
      id: 1,
      title: '10 Stunning New Home Designs for 2023: Trends and Innovations',
      excerpt: 'Explore the latest architectural trends and innovative floor plans that are defining new home construction in 2023.',
      category: 'Design Trends',
      date: 'May 7, 2023',
      image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1000&q=80',
      slug: 'top-new-home-designs-for-2023',
      featured: false
    },
    {
      id: 2,
      title: 'Craftsman Style Homes: A Complete Guide',
      excerpt: 'Everything you need to know about Craftsman architecture, from history to key design elements.',
      category: 'Home Styles',
      date: 'April 22, 2023',
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=600&q=80',
      slug: 'craftsman-style-homes'
    },
    {
      id: 3,
      title: '5 Energy-Efficient Home Designs',
      excerpt: 'Sustainable house plans that reduce energy consumption without sacrificing comfort or style.',
      category: 'Sustainable Living',
      date: 'April 15, 2023',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
      slug: 'energy-efficient-home-designs'
    },
    {
      id: 4,
      title: 'Small House Plans with Big Impact',
      excerpt: 'Clever designs that maximize space and functionality in more compact footprints.',
      category: 'Small Homes',
      date: 'April 8, 2023',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80',
      slug: 'small-house-plans'
    },
    {
      id: 5,
      title: 'The Return of Mid-Century Modern Design',
      excerpt: 'Why this iconic architectural style is experiencing a major revival in today\'s home designs.',
      category: 'Design Trends',
      date: 'March 29, 2023',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
      slug: 'mid-century-modern-revival'
    },
    {
      id: 6,
      title: 'Open Concept vs. Traditional Floor Plans',
      excerpt: 'Weighing the pros and cons of open living spaces and more compartmentalized designs.',
      category: 'Floor Plans',
      date: 'March 21, 2023',
      image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=600&q=80',
      slug: 'open-concept-vs-traditional-floor-plans'
    },
    {
      id: 7,
      title: 'Maximizing Your Outdoor Living Space',
      excerpt: 'Design ideas for creating functional and beautiful outdoor areas that extend your living space.',
      category: 'Outdoor Living',
      date: 'March 14, 2023',
      image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=600&q=80',
      slug: 'maximizing-outdoor-living-space'
    }
  ];
  
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);
  
  return (
    <BlogContainer>
      <BlogHeader>
        <BlogTitle>Home Design Blog</BlogTitle>
        <BlogDescription>
          Discover insights, trends, and inspiration for your dream home. From architectural styles to 
          floor plan tips, our articles help you navigate the world of home design.
        </BlogDescription>
      </BlogHeader>
      
      {featuredPost && (
        <FeaturedPost>
          <FeaturedPostImage>
            <Image 
              src={featuredPost.image}
              alt={featuredPost.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </FeaturedPostImage>
          <FeaturedPostContent>
            <FeaturedPostTitle>{featuredPost.title}</FeaturedPostTitle>
            <FeaturedPostExcerpt>{featuredPost.excerpt}</FeaturedPostExcerpt>
            <FeaturedPostLink href={`/blog/${featuredPost.slug}`}>
              Read Article
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </FeaturedPostLink>
          </FeaturedPostContent>
        </FeaturedPost>
      )}
      
      <BlogGrid>
        {regularPosts.map(post => (
          <BlogCard key={post.id}>
            <BlogCardImage>
              <Image 
                src={post.image}
                alt={post.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </BlogCardImage>
            <BlogCardContent>
              <BlogCardCategory>{post.category}</BlogCardCategory>
              <BlogCardTitle>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </BlogCardTitle>
              <BlogCardDate>{post.date}</BlogCardDate>
              <ReadMoreLink href={`/blog/${post.slug}`}>
                Read Article
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </ReadMoreLink>
            </BlogCardContent>
          </BlogCard>
        ))}
      </BlogGrid>
    </BlogContainer>
  );
}