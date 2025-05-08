import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '10 Stunning New Home Designs for 2023 | Trends and Innovations',
  description: 'Discover the latest home design trends of 2023, from modern farmhouses to sustainable ranches. Explore innovative floor plans and architectural features.',
  openGraph: {
    title: '10 Stunning New Home Designs for 2023 | Trends and Innovations',
    description: 'Discover the latest home design trends of 2023, from modern farmhouses to sustainable ranches. Explore innovative floor plans and architectural features.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Modern Farmhouse Design',
      },
    ],
    type: 'article',
    publishedTime: '2023-05-07T00:00:00Z',
    authors: ['Home Design Finder'],
    tags: ['Home Design', 'Architecture', 'House Plans', '2023 Trends', 'Modern Farmhouse', 'Ranch Homes', 'Sustainability'],
  },
};

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="blog-post-layout">
      {children}
    </div>
  );
}