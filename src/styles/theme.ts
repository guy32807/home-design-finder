import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    primary: '#3a5a40', // Forest green - architectural/home design feel
    primaryHover: '#344e41',
    primaryLight: '#a3b18a',
    primaryDark: '#344e41',
    secondary: '#588157',
    accent: '#dad7cd',
    accentHover: '#c9c7b8',
    success: '#52b788',
    warning: '#ffb703',
    danger: '#e63946',
    background: '#ffffff',
    backgroundAlt: '#f8f9fa',
    text: '#2f3e46',
    textLight: '#6c757d',
    border: '#dee2e6',
    borderLight: '#f1f1f1',
    borderDark: '#ced4da',
  },
  typography: {
    fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: '16px',
    headingFontFamily: "'Playfair Display', serif",
    headingFontWeight: 600,
    headingLineHeight: 1.3,
    baseLineHeight: 1.5,
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '4rem',
    xxl: '8rem',
  },
  breakpoints: {
    xs: '480px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
    large: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    round: '50%',
  },
  transitions: {
    fast: 'all 0.1s ease',
    medium: 'all 0.2s ease',
    slow: 'all 0.3s ease',
    short: 'all 0.1s ease',
    long: 'all 0.5s ease',
  },
  fontSizes: {
    small: '0.875rem',
    body: '1rem',
    h1: '2.5rem',
    h2: '2rem',
    h3: '1.5rem',
    h4: '1.25rem',
  },
};

export default theme;