import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '5 Energy-Efficient Home Designs',
  description: 'Explore sustainable house plans that reduce energy consumption without sacrificing comfort or style. Discover passive solar, net-zero, compact modern, earth-sheltered, and prefab eco-home designs.',
  keywords: ['energy-efficient homes', 'sustainable house plans', 'green building', 'passive solar', 'net-zero energy', 'eco-friendly homes'],
  openGraph: {
    title: '5 Energy-Efficient Home Designs',
    description: 'Explore sustainable house plans that reduce energy consumption without sacrificing comfort or style.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Modern Energy-Efficient Home',
      },
    ],
    type: 'article',
    publishedTime: '2023-04-15T00:00:00Z',
    authors: ['Home Design Finder'],
    tags: ['Energy-Efficient', 'Sustainable', 'Green Building', 'Eco-Friendly', 'House Plans'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '5 Energy-Efficient Home Designs',
    description: 'Explore sustainable house plans that reduce energy consumption without sacrificing comfort or style.',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function EnergyEfficientBlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="energy-efficient-blog-layout">
      {children}
    </div>
  );
}