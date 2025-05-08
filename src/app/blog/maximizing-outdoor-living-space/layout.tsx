import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Maximizing Your Outdoor Living Space',
  description: 'Design ideas for creating functional and beautiful outdoor areas that extend your living space. Learn about outdoor rooms, climate adaptation, and small space solutions.',
  keywords: ['outdoor living space', 'patio design', 'outdoor kitchen', 'outdoor rooms', 'backyard design', 'landscape design'],
  openGraph: {
    title: 'Maximizing Your Outdoor Living Space',
    description: 'Design ideas for creating functional and beautiful outdoor areas that extend your living space.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Beautiful Outdoor Living Space',
      },
    ],
    type: 'article',
    publishedTime: '2023-03-14T00:00:00Z',
    authors: ['Home Design Finder'],
    tags: ['Outdoor Living', 'Home Design', 'Patios', 'Landscape Design', 'Outdoor Kitchens'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maximizing Your Outdoor Living Space',
    description: 'Design ideas for creating functional and beautiful outdoor areas that extend your living space.',
    images: ['https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function OutdoorLivingBlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="outdoor-living-blog-layout">
      {children}
    </div>
  );
}