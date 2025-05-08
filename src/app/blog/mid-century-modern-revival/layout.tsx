import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Return of Mid-Century Modern Design',
  description: 'Why this iconic architectural style is experiencing a major revival in today\'s home designs, and how contemporary architects are reinterpreting its principles.',
  keywords: ['mid-century modern', 'architectural styles', 'home design', 'mid-century revival', 'modern house plans'],
  openGraph: {
    title: 'The Return of Mid-Century Modern Design',
    description: 'Why this iconic architectural style is experiencing a major revival in today\'s home designs.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Mid-Century Modern Home Design',
      },
    ],
    type: 'article',
    publishedTime: '2023-03-29T00:00:00Z',
    authors: ['Home Design Finder'],
    tags: ['Mid-Century Modern', 'Architecture', 'Home Design', 'Interior Design', 'House Plans'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Return of Mid-Century Modern Design',
    description: 'Why this iconic architectural style is experiencing a major revival in today\'s home designs.',
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function MidCenturyModernBlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mid-century-modern-blog-layout">
      {children}
    </div>
  );
}