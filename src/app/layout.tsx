import { Metadata } from 'next';
import StyledComponentsRegistry from '../lib/styled-components-registry';
import GlobalStyles from '../styles/GlobalStyles';
import Header from '../components/navigation/Header';
import Footer from '../components/navigation/Footer';
import { ShareProvider } from '../context/ShareContext';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Home Design Finder | Beautiful House & Garage Plans',
    template: '%s | Home Design Finder'
  },
  description: 'Discover perfect house plans for your dream home. Browse our collection of craftsman, farmhouse, ranch, contemporary home designs and garage plans.',
  applicationName: 'Home Design Finder',
  keywords: ['house plans', 'home designs', 'floor plans', 'architectural designs', 'craftsman', 'farmhouse', 'modern farmhouse', 'garage plans', 'building plans'],
  authors: [{ name: 'Home Design Finder' }],
  creator: 'Home Design Finder',
  publisher: 'Home Design Finder',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Home Design Finder | Beautiful House & Garage Plans',
    description: 'Discover perfect house plans for your dream home. Browse our collection of craftsman, farmhouse, ranch, contemporary home designs and garage plans.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    siteName: 'Home Design Finder',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Beautiful House Designs',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Design Finder | Beautiful House & Garage Plans',
    description: 'Discover perfect house plans for your dream home. Browse our collection of craftsman, farmhouse, ranch, contemporary home designs.',
    images: ['https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80'],
    creator: '@homedesignfinder',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ShareProvider>
            <GlobalStyles />
            <Header />
            <main>
              {children}
            </main>
            <Footer />
          </ShareProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
