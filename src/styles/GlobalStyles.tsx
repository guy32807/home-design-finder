'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --color-primary: #047857;
    --color-primary-dark: #065f46;
    --color-text: #333333;
    --color-text-light: #666666;
    --color-background: #ffffff;
    --color-border: #e5e7eb;
    --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
  }

  body {
    color: var(--color-text);
    background: var(--color-background);
    font-family: var(--font-family);
    line-height: 1.5;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    max-width: 100%;
    display: block;
  }
`;

export default GlobalStyles;