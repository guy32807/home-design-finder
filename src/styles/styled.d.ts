import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryDark: string;
      primaryLight: string;
      primaryLightest: string;
      primaryHover: string;
      secondary: string;
      secondaryDark: string;
      accent: string;
      accentHover: string;
      text: string;
      textLight: string;
      background: string;
      backgroundAlt: string;
      border: string;
      borderLight: string;
      borderDark: string;
      error: string;
      danger: string;
      success: string;
      warning: string;
    };
    typography: {
      bodyFontFamily: string;
      headingFontFamily: string;
      fontFamily: string;
      fontSize: string;
      headingFontWeight: number;
      headingLineHeight: number;
      baseLineHeight: number;
    };
    fonts: {
      body: string;
      heading: string;
    };
    fontSizes: {
      small: string;
      medium: string;
      large: string;
      xlarge: string;
      xxlarge: string;
      xxxlarge: string;
    };
    fontWeights: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    borderRadius: {
      small: string;
      medium: string;
      large: string;
      round: string;
    };
    shadows: {
      small: string;
      medium: string;
      large: string;
    };
    transitions: {
      fast: string;
      medium: string;
      slow: string;
      short: string;  // Add this
      long: string;   // Add this
    };
  }
}