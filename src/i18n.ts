import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
const enTranslations = {
  meta: {
    title: 'Modern Architectural House Plans & Designs | Find Your Dream Home',
    description: 'Discover beautiful architectural house plans and home designs perfectly suited for modern living. Find your dream home with our curated collection.',
    keywords: 'architectural designs, house plans, modern home designs, floor plans, custom home plans, residential architecture'
  },
  nav: {
    home: 'Home',
    housePlans: 'House Plans',
    styles: 'Design Styles',
    blog: 'Blog',
    findPlans: 'Find Plans'
  },
  home: {
    hero: {
      title: 'Find Your Dream Home',
      subtitle: 'Discover beautiful architectural house plans perfectly suited for modern living',
      cta: 'Browse House Plans',
      exploreButton: 'Explore House Plans',
      browseButton: 'Browse Styles'
    },
    popularStyles: {
      title: 'Popular Home Styles',
      viewAll: 'View All Styles'
    },
    featured: {
      title: 'Featured House Plans',
      viewAll: 'View All House Plans'
    },
    howItWorks: {
      title: 'How It Works',
      step1: {
        title: 'Find a Plan',
        description: 'Browse our extensive collection of house plans by style, size, and features.'
      },
      step2: {
        title: 'Customize',
        description: 'Modify any plan to suit your needs with customization options.'
      },
      step3: {
        title: 'Build Your Dream',
        description: 'Receive detailed blueprints and begin building your dream home.'
      }
    },
    testimonials: {
      title: 'What Our Customers Say'
    },
    cta: {
      title: 'Ready to Find Your Dream Home?',
      description: 'Explore thousands of house plans from top architects and designers. Start building your future today.',
      button: 'Explore House Plans'
    }
  },
  housePlans: {
    title: 'House Plans & Home Designs',
    description: 'Discover your dream home with our curated collection of house plans. From modern farmhouses to craftsman bungalows, we have designs to suit every lifestyle, preference, and budget.',
    loadMore: 'Load More Plans'
  },
  filters: {
    title: 'Filter House Plans',
    hide: 'Hide Filters',
    show: 'Show Filters',
    bedrooms: 'Bedrooms',
    bathrooms: 'Bathrooms',
    squareFeet: 'Square Footage',
    homeStyle: 'Home Style',
    stories: 'Stories', // Rename this to avoid duplication
    any: 'Any',
    beds: 'beds',
    baths: 'baths',
    sqft: 'sqft',
    upTo: 'Up to',
    story: 'Story',
    storiesLabel: 'Stories', // Changed from "stories" to "storiesLabel"
    reset: 'Reset',
    apply: 'Apply Filters'
  },
  notFound: {
    title: '404',
    subtitle: 'Oops! The page you\'re looking for doesn\'t exist.',
    message: 'Sorry, but the page you were trying to view does not exist. It might have been moved, renamed, or it never existed at all.',
    goHome: 'Go Home',
    browsePlans: 'Browse House Plans'
  }
};

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      }
    },
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // React already escapes values
    }
  });

export default i18n;