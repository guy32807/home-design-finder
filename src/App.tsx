import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import HousePlansPage from './pages/HousePlansPage';
import StylesPage from './pages/StylesPage';
import GlobalStyle from './styles/GlobalStyle';
import CustomThemeProvider from './components/theme/CustomThemeProvider';

// Define a React component type
type ReactComponent = React.ComponentType<any>;

// Create a proper type for NotFoundPage component
const NotFoundPage: ReactComponent = (() => {
  try {
    // This approach allows us to handle if the file doesn't exist
    return require('./pages/NotFoundPage').default;
  } catch (e) {
    // Fallback component if NotFoundPage doesn't exist
    return () => (
      <div style={{ textAlign: 'center', padding: '50px 20px' }}>
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
      </div>
    );
  }
})();

// Try to import BlogPage, if it exists
const BlogPage: ReactComponent | null = (() => {
  try {
    const BlogPageModule = require('./pages/BlogPage');
    return BlogPageModule.default;
  } catch (e) {
    // No blog page, that's fine
    console.warn('BlogPage not found, skipping route');
    return null;
  }
})();

// Try to import i18n
try {
  require('./i18n');
} catch (e) {
  console.warn('i18n initialization failed', e);
}

const helmetContext = {};

const App: React.FC = () => {
  return (
    <HelmetProvider context={helmetContext}>
      <CustomThemeProvider>
        <GlobalStyle />
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/house-plans" element={<HousePlansPage />} />
              <Route path="/styles" element={<StylesPage />} />
              
              {/* Include BlogPage only if it exists */}
              {BlogPage && <Route path="/blog" element={<BlogPage />} />}
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </CustomThemeProvider>
    </HelmetProvider>
  );
};

export default App;
