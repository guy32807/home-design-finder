import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Small House Plans with Big Impact',
  description: 'Discover clever designs that maximize space and functionality in more compact footprints. Explore modern cottages, urban micro-homes, and space-efficient floor plans.',
  keywords: ['small house plans', 'compact home designs', 'tiny homes', 'efficient floor plans', 'small footprint houses', 'space-saving design'],
  openGraph: {
    title: 'Small House Plans with Big Impact',
    description: 'Clever designs that maximize space and functionality in more compact footprints.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Beautiful Small House Design',
      },
    ],
    type: 'article',
    publishedTime: '2023-04-08T00:00:00Z',
    authors: ['Home Design Finder'],
    tags: ['Small Houses', 'Compact Living', 'Home Design', 'Space Efficiency', 'Architecture'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Small House Plans with Big Impact',
    description: 'Clever designs that maximize space and functionality in more compact footprints.',
    images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function SmallHousePlansBlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="small-house-plans-blog-layout">
      {children}
    </div>
  );
}