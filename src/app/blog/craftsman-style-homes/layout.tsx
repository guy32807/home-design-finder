import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Craftsman Style Homes: A Complete Guide',
  description: 'Explore the rich history, key features, and enduring appeal of Craftsman architecture. Learn about different styles, maintenance tips, and modern interpretations.',
  keywords: ['craftsman homes', 'craftsman architecture', 'arts and crafts movement', 'bungalow', 'craftsman style', 'house design', 'architectural styles'],
  openGraph: {
    title: 'Craftsman Style Homes: A Complete Guide',
    description: 'Explore the rich history, key features, and enduring appeal of Craftsman architecture. Learn about different styles, maintenance tips, and modern interpretations.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Beautiful Craftsman Style Home',
      },
    ],
    type: 'article',
    publishedTime: '2023-04-22T00:00:00Z',
    authors: ['Home Design Finder'],
    tags: ['Craftsman', 'Architecture', 'Home Design', 'Arts and Crafts', 'Bungalow', 'House Plans'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Craftsman Style Homes: A Complete Guide',
    description: 'Explore the rich history, key features, and enduring appeal of Craftsman architecture.',
    images: ['https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function CraftsmanBlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="craftsman-blog-layout">
      {children}
    </div>
  );
}