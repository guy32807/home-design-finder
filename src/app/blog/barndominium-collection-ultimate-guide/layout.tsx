import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Barndominium Collection: The Ultimate Guide to Metal Building Homes',
  description: 'Discover everything about barndominiums: costs, floor plans, pros and cons, financing options, and design ideas for these popular metal building homes.',
  keywords: ['barndominium', 'barndominium plans', 'metal building homes', 'pole barn homes', 'barndominium collection', 'barndominium cost', 'barndominium designs'],
  openGraph: {
    title: 'Barndominium Collection: The Ultimate Guide to Metal Building Homes',
    description: 'Discover everything about barndominiums: costs, floor plans, pros and cons, financing options, and design ideas for these popular metal building homes.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1594494842689-58a8a28df7b7?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Modern Barndominium with Large Windows',
      },
    ],
    type: 'article',
    publishedTime: '2023-05-07T00:00:00Z',
    authors: ['Home Design Finder'],
    tags: ['Barndominium', 'Metal Building Homes', 'Pole Barn Homes', 'Home Design', 'House Plans', 'Rural Living', 'Modern Farmhouse'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barndominium Collection: The Ultimate Guide to Metal Building Homes',
    description: 'Discover everything about barndominiums: costs, floor plans, pros and cons, financing options, and design ideas for these popular metal building homes.',
    images: ['https://images.unsplash.com/photo-1594494842689-58a8a28df7b7?auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function BarndominiumBlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="barndominium-blog-layout">
      {children}
    </div>
  );
}