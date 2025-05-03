import React from 'react';
import { ThemeProvider } from 'styled-components';
import baseTheme from '../../styles/theme';

// Create a complete theme with all required properties
const completeTheme = {
  ...baseTheme,
  transitions: {
    ...baseTheme.transitions,
    short: '0.15s',
    long: '0.7s'
  },
  fontSizes: {
    ...baseTheme.fontSizes,
    // Add missing properties
    body: baseTheme.fontSizes.medium,
    h1: baseTheme.fontSizes.xxxlarge,
    h2: baseTheme.fontSizes.xxlarge,
    h3: baseTheme.fontSizes.xlarge,
    h4: baseTheme.fontSizes.large
  }
};

interface CustomThemeProviderProps {
  children: React.ReactNode;
}

const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({ children }) => {
  return <ThemeProvider theme={completeTheme}>{children}</ThemeProvider>;
};

export default CustomThemeProvider;