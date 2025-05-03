import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        housePlans: 'House Plans',
        styles: 'Design Styles',
        blog: 'Blog',
        findPlans: 'Find Plans'
      },
      home: {
        hero: {
          title: 'Find Your Perfect House Plan',
          subtitle: 'Browse thousands of beautiful house plans and architectural designs to find your dream home.',
          exploreButton: 'Explore House Plans',
          browseButton: 'Browse Styles'
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
      footer: {
        description: 'Discover beautiful house plans and architectural designs for your dream home.',
        quickLinks: 'Quick Links',
        popular: 'Popular Designs',
        about: 'About Us',
        aboutUs: 'About Us',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        contact: 'Contact Us',
        rights: 'All rights reserved.',
        disclosure: 'This website contains affiliate links. We may earn a commission if you make a purchase through our links.'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;