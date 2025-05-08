import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Architectural Design Collections | Home Design Finder',
  description: 'Explore our curated collections of house plans organized by style, features, and living concepts. Find the perfect design for your dream home.',
  keywords: ['house plan collections', 'home design collections', 'architectural styles', 'house plan styles', 'floor plan collections'],
  openGraph: {
    title: 'Architectural Design Collections | Home Design Finder',
    description: 'Explore our curated collections of house plans organized by style, features, and living concepts.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'House Design Collections',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Architectural Design Collections | Home Design Finder',
    description: 'Explore our curated collections of house plans organized by style, features, and living concepts.',
    images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="collections-layout">
      {children}
    </div>
  );
}