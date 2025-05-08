import { Metadata } from 'next';
import StylesPage from '../../components/styles/StylesPage';
import { withSuspense } from '../../lib/pageWrappers';

export const metadata: Metadata = {
  title: 'House Plan Styles | Find Your Ideal Home Design',
  description: 'Explore various architectural styles from Modern Farmhouse to Craftsman, Ranch, and more to find the perfect design aesthetic for your dream home.',
};

// Mock data - in a real app, this would come from an API
const homeStyles = [
  {
    id: '1',
    name: 'Modern Farmhouse',
    slug: 'modern-farmhouse',
    description: 'Contemporary designs with classic farmhouse elements, featuring open layouts and functional spaces.',
    image: 'https://picsum.photos/seed/farmhouse/800/600',
    planCount: 124
  },
  {
    id: '2',
    name: 'Craftsman',
    slug: 'craftsman',
    description: 'Detailed architectural elements with exposed beams, covered porches, and handcrafted details.',
    image: 'https://picsum.photos/seed/craftsman/800/600',
    planCount: 98
  },
  {
    id: '3',
    name: 'Ranch',
    slug: 'ranch',
    description: 'Single-story homes with open floor plans, low-pitched roofs, and a focus on outdoor living.',
    image: 'https://picsum.photos/seed/ranch/800/600',
    planCount: 112
  },
  {
    id: '4',
    name: 'Contemporary',
    slug: 'contemporary',
    description: 'Clean lines, large windows, and modern materials define these cutting-edge home designs.',
    image: 'https://picsum.photos/seed/contemporary/800/600',
    planCount: 76
  },
  {
    id: '5',
    name: 'Traditional',
    slug: 'traditional',
    description: 'Timeless designs featuring symmetrical facades, classic proportions, and elegant details.',
    image: 'https://picsum.photos/seed/traditional/800/600',
    planCount: 105
  },
  {
    id: '6',
    name: 'Cottage',
    slug: 'cottage',
    description: 'Charming, cozy homes with storybook features, steep gables, and intimate spaces.',
    image: 'https://picsum.photos/seed/cottage/800/600',
    planCount: 64
  },
  {
    id: '7',
    name: 'Mediterranean',
    slug: 'mediterranean',
    description: 'Inspired by seaside villas with stucco exteriors, tiled roofs, and outdoor living spaces.',
    image: 'https://picsum.photos/seed/mediterranean/800/600',
    planCount: 58
  },
  {
    id: '8',
    name: 'Cape Cod',
    slug: 'cape-cod',
    description: 'Classic New England style with steep roofs, central chimneys, and symmetrical designs.',
    image: 'https://picsum.photos/seed/capecod/800/600',
    planCount: 42
  }
];

const StylesPageWithSuspense = withSuspense(
  StylesPage,
  {
    title: 'Loading Home Styles',
    message: 'Please wait while we load all available home styles...'
  }
);

export default function StylesPageWrapper() {
  return <StylesPageWithSuspense initialStyles={homeStyles} />;
}