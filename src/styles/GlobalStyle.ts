import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  html, body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f9f9f9;
    color: #333;
    line-height: 1.6;
  }
  
  main {
    min-height: calc(100vh - 200px);
    padding-bottom: 3rem;
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    font-weight: 600;
    line-height: 1.3;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  a {
    color: #3498db;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;