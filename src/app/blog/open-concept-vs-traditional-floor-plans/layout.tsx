import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Open Concept vs. Traditional Floor Plans',
  description: 'Weighing the pros and cons of open living spaces and more compartmentalized designs. Find the best floor plan approach for your lifestyle and needs.',
  keywords: ['open concept', 'traditional floor plans', 'home design', 'floor plan layout', 'open vs closed floor plans'],
  openGraph: {
    title: 'Open Concept vs. Traditional Floor Plans',
    description: 'Weighing the pros and cons of open living spaces and more compartmentalized designs.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Open Concept Living Space',
      },
    ],
    type: 'article',
    publishedTime: '2023-03-21T00:00:00Z',
    authors: ['Home Design Finder'],
    tags: ['Floor Plans', 'Home Design', 'Architecture', 'Interior Design', 'House Plans'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open Concept vs. Traditional Floor Plans',
    description: 'Weighing the pros and cons of open living spaces and more compartmentalized designs.',
    images: ['https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function OpenConceptVsTraditionalBlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="open-concept-vs-traditional-blog-layout">
      {children}
    </div>
  );
}