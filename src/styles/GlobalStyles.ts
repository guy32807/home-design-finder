import 'styled-components';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #333;
    background-color: #fff;
  }
  
  a {
    color: #3498db;
    text-decoration: none;
  }
  
  img {
    max-width: 100%;
  }
`;

export { GlobalStyles };
// Alternatively: export default GlobalStyles;

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryHover: string;
      primaryLight: string;
      primaryDark: string;
      secondary: string;
      accent: string;
      accentHover: string;
      success: string;
      warning: string;
      danger: string;
      background: string;
      backgroundAlt: string;
      text: string;
      textLight: string;
      border: string;
      borderLight: string;
      borderDark: string;
      [key: string]: string;
    };
    typography: {
      fontFamily: string;
      fontSize: string;
      headingFontFamily: string;
      headingFontWeight: number;
      headingLineHeight: number;
      baseLineHeight: number;
      [key: string]: string | number;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      [key: string]: string;
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      [key: string]: string;
    };
    shadows: {
      small: string;
      medium: string;
      large: string;
      [key: string]: string;
    };
    borderRadius: {
      small: string;
      medium: string;
      large: string;
      round: string;
      [key: string]: string;
    };
    transitions: {
      fast: string;
      medium: string;
      slow: string;
      short: string;
      long: string;
      [key: string]: string;
    };
    fontSizes: {
      small: string;
      body: string;
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      [key: string]: string;
    };
    [key: string]: any;
  }
}