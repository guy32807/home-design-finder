import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Design Blog | Tips, Trends & Inspiration',
  description: 'Explore our home design blog for the latest architectural trends, floor plan ideas, and design inspiration for your dream home.',
  openGraph: {
    title: 'Home Design Blog | Tips, Trends & Inspiration',
    description: 'Explore our home design blog for the latest architectural trends, floor plan ideas, and design inspiration for your dream home.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Home Design Blog',
      },
    ],
    type: 'website',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="blog-layout">
      {children}
    </div>
  );
}