import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import theme from './styles/theme';
import './styles/global.css';

const helmetContext = {}; // Create context object

const App: React.FC = () => {
  return (
    <HelmetProvider context={helmetContext}>
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              {/* Add more routes here as you develop other pages */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
