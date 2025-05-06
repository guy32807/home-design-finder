import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoHeadProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  locale?: string;
  twitterCardType?: 'summary_large_image' | 'summary';
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleTags?: string[];
}

const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  keywords,
  image = 'https://homedesignfinder.com/images/home-design-social.jpg',
  url = 'https://homedesignfinder.com/',
  type = 'website',
  locale = 'en',
  twitterCardType = 'summary_large_image',
  articlePublishedTime,
  articleModifiedTime,
  articleTags,
}) => {
  // Set default values for SEO
  const pageTitle = title || 'Modern Architectural House Plans & Designs | Find Your Dream Home';
  const pageDescription = description || 'Discover beautiful architectural house plans and home designs perfectly suited for modern living. Find your dream home with our curated collection.';
  const pageKeywords = keywords || 'architectural designs, house plans, modern home designs, floor plans, custom home plans, residential architecture';
  
  // Create JSON-LD structured data for the organization
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Home Design Finder',
    description: 'Curated collection of architectural house plans and home designs',
    url: 'https://homedesignfinder.com/',
    logo: 'https://homedesignfinder.com/favicon/favicon-512x512.png',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@homedesignfinder.com',
      contactType: 'customer service'
    },
    sameAs: [
      'https://facebook.com/homedesignfinder',
      'https://twitter.com/homedesignfinder',
      'https://instagram.com/homedesignfinder',
      'https://pinterest.com/homedesignfinder'
    ]
  };
  
  // Create JSON-LD structured data for articles
  const articleStructuredData = type === 'article' ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: pageTitle,
    image: image,
    datePublished: articlePublishedTime,
    dateModified: articleModifiedTime || articlePublishedTime,
    author: {
      '@type': 'Organization',
      name: 'Home Design Finder'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Home Design Finder',
      logo: {
        '@type': 'ImageObject',
        url: 'https://homedesignfinder.com/logo.png'
      }
    },
    description: pageDescription,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    keywords: articleTags?.join(', ')
  } : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={url} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.svg" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#2c3e50" />

      {/* Language Meta Tags */}
      <html lang={locale} />
      <meta property="og:locale" content={locale} />
      <link rel="alternate" href={url} hrefLang="x-default" />
      <link rel="alternate" href={`${url}?lng=en`} hrefLang="en" />

      {/* Open Graph Meta Tags for Social Media */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Home Design Finder" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCardType} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={image} />
      
      {/* Article-specific Meta Tags */}
      {type === 'article' && articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {type === 'article' && articleModifiedTime && (
        <meta property="article:modified_time" content={articleModifiedTime} />
      )}
      {type === 'article' && articleTags && articleTags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}

      {/* Structured Data for Google Rich Results */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Article Structured Data if applicable */}
      {type === 'article' && (
        <script type="application/ld+json">
          {JSON.stringify(articleStructuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SeoHead;