import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blog-posts';
import ImageWithFallback from '../components/ui/ImageWithFallback';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  font-family: ${({ theme }) => theme.typography.headingFontFamily};
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const BlogCard = styled.article`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const BlogImage = styled(ImageWithFallback)`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const BlogContent = styled.div`
  padding: 1.5rem;
`;

const BlogTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  font-family: ${({ theme }) => theme.typography.headingFontFamily};
`;

const BlogMeta = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 1rem;
`;

const BlogExcerpt = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ReadMoreLink = styled(Link)`
  display: inline-block;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  
  &:hover {
    text-decoration: underline;
  }
`;

const BlogPage: React.FC = () => {
  return (
    <Container>
      <PageTitle>Home Design Blog</PageTitle>
      <BlogGrid>
        {blogPosts.map(post => (
          <BlogCard key={post.id}>
            <BlogImage src={post.featuredImage} alt={post.title} />
            <BlogContent>
              <BlogTitle>{post.title}</BlogTitle>
              <BlogMeta>{post.date} | By {post.author}</BlogMeta>
              <BlogExcerpt>{post.excerpt}</BlogExcerpt>
              <ReadMoreLink to={`/blog/${post.slug}`}>Read More →</ReadMoreLink>
            </BlogContent>
          </BlogCard>
        ))}
      </BlogGrid>
    </Container>
  );
};

export default BlogPage;