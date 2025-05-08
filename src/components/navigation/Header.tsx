'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Image from 'next/image';

const HeaderContainer = styled.header`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderTop = styled.div`
  background-color: #4a6741;
  padding: 0.5rem 0;
  color: white;
  text-align: center;
  font-size: 0.875rem;
  
  a {
    color: white;
    text-decoration: underline;
    font-weight: bold;
    
    &:hover {
      text-decoration: none;
    }
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  
  a {
    color: #4a6741;
    text-decoration: none;
    display: flex;
    align-items: center;
    
    span {
      margin-left: 0.5rem;
    }
  }
`;

const DesktopNav = styled.div`
  display: none;
  
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }
  
  nav {
    display: flex;
    gap: 1.5rem;
    
    a {
      color: #333;
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem 0;
      position: relative;
      
      &:after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: #4a6741;
        transition: width 0.3s;
      }
      
      &:hover {
        color: #4a6741;
        
        &:after {
          width: 100%;
        }
      }
    }
  }
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  color: #333;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem;
  margin-left: 1rem;
  
  &:hover {
    color: #4a6741;
  }
  
  span {
    margin-left: 0.25rem;
  }
`;

const MobileNavButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileNav = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 75%;
  max-width: 300px;
  height: 100vh;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease;
  padding: 2rem;
  
  .close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 2rem 0 0;
    
    li {
      margin-bottom: 1.5rem;
      
      a {
        color: #333;
        text-decoration: none;
        font-size: 1.2rem;
        display: block;
        padding: 0.5rem 0;
        
        &:hover {
          color: #4a6741;
        }
      }
    }
  }
  
  .mobile-affiliate-button {
    display: block;
    background-color: #d9534f;
    color: white;
    padding: 0.75rem;
    border-radius: 4px;
    text-align: center;
    font-weight: 600;
    margin-top: 2rem;
  }
`;

const Backdrop = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s, visibility 0.3s;
`;

const SearchOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1002;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s, visibility 0.3s;
  padding: 1rem;
`;

const SearchForm = styled.form`
  width: 100%;
  max-width: 600px;
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  position: relative;
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #333;
  }
  
  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.25rem;
    cursor: pointer;
  }
  
  input {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 1rem;
    
    &:focus {
      outline: none;
      border-color: #4a6741;
    }
  }
  
  button {
    width: 100%;
    padding: 0.75rem;
    background-color: #4a6741;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    
    &:hover {
      background-color: #3a5231;
    }
  }
`;

const Header = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const toggleMobileNav = () => {
    setIsMobileNavOpen(prev => !prev);
  };
  
  const closeMobileNav = () => {
    setIsMobileNavOpen(false);
  };
  
  const toggleSearch = () => {
    setIsSearchOpen(prev => !prev);
  };
  
  const closeSearch = () => {
    setIsSearchOpen(false);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
      closeSearch();
    }
  };
  
  // Close mobile nav and search on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMobileNav();
        closeSearch();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Your affiliate link
  const affiliateLink = "https://www.jdoqocy.com/click-101433563-14548500";
  
  return (
    <HeaderContainer>
      {/* <HeaderTop>
        <a 
          href={affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Architectural Design
        </a>
      </HeaderTop> */}
      
      <NavContainer>
        <Logo>
          <Link href="/">
            <Image 
              src="/logo.svg" 
              alt="Home Design Finder" 
              width={40} 
              height={40}
              onError={(e) => {
                e.currentTarget.src = '/favicon.ico';
              }}
            />
            <span>Home Design Finder</span>
          </Link>
        </Logo>
        
        <DesktopNav>
          <nav>
            <Link href="/styles">Styles</Link>
            <Link href="/collections">Collections</Link>
            <Link href="/house-plans">House Plans</Link>
            <Link href="/garage-plans">Garage Plans</Link>
            <Link href="/blog">Blog</Link>
            <Link href="https://www.jdoqocy.com/click-101433563-14548500" target="_blank" rel="noopener noreferrer">
              Buy Plans
</Link>
          </nav>
          
          <SearchButton onClick={toggleSearch}>
            🔍 <span>Search</span>
          </SearchButton>
        </DesktopNav>
        
        <MobileNavButton onClick={toggleMobileNav}>
          ☰
        </MobileNavButton>
      </NavContainer>
      
      <MobileNav isOpen={isMobileNavOpen}>
        <button className="close-button" onClick={closeMobileNav}>✕</button>
        <ul>
          <li><Link href="/styles" onClick={closeMobileNav}>Styles</Link></li>
          <li><Link href="/collections" onClick={closeMobileNav}>Collections</Link></li>
          <li><Link href="/house-plans" onClick={closeMobileNav}>House Plans</Link></li>
          <li><Link href="/garage-plans" onClick={closeMobileNav}>Garage Plans</Link></li>
          <li><Link href="/blog" onClick={closeMobileNav}>Blog</Link></li>
          <li><Link href="/search" onClick={closeMobileNav}>Search</Link></li>
        </ul>
        
        {/* <a 
          href={affiliateLink}
          className="mobile-affiliate-button"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMobileNav}
        >
          Get 50% Off Plans - Limited Time!
        </a> */}
      </MobileNav>
      
      <SearchOverlay isOpen={isSearchOpen} onClick={closeSearch}>
        <SearchForm onClick={(e) => e.stopPropagation()} onSubmit={handleSearchSubmit}>
          <button type="button" className="close-button" onClick={closeSearch}>
            ✕
          </button>
          <h2>Search House Plans</h2>
          <input 
            type="text" 
            placeholder="Enter a search term or plan number" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          <button type="submit">Search</button>
        </SearchForm>
      </SearchOverlay>
      
      <Backdrop isOpen={isMobileNavOpen} onClick={closeMobileNav} />
    </HeaderContainer>
  );
};

export default Header;