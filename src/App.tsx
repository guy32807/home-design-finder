import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ReactSnapHashRouter from './ReactSnapHashRouter'; // Import the custom router
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import HousePlansPage from './pages/HousePlansPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import NotFoundPage from './pages/NotFoundPage';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';

function App() {
  return (
    <ThemeProvider theme={theme as any}>
      <GlobalStyles />
      <ReactSnapHashRouter> {/* Replace HashRouter with ReactSnapHashRouter */}
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/house-plans" element={<HousePlansPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </ReactSnapHashRouter>
    </ThemeProvider>
  );
}

export default App;
