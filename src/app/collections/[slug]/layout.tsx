import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Collection | Home Design Finder',
  description: 'Browse our curated collection of house plans that match your style and needs.',
  keywords: ['house plans', 'home designs', 'floor plans', 'architectural designs'],
  openGraph: {
    title: 'House Plan Collection | Home Design Finder',
    description: 'Browse our curated collection of house plans that match your style and needs.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'House Plan Collection',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'House Plan Collection | Home Design Finder',
    description: 'Browse our curated collection of house plans that match your style and needs.',
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function CollectionDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="collection-detail-layout">
      {children}
    </div>
  );
}