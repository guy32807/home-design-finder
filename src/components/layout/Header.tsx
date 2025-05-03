import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';
import { getSiteAffiliateLink } from '../../constants/links';

const HeaderContainer = styled.header`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-family: ${({ theme }) => theme.typography.headingFontFamily};
  
  &:hover {
    text-decoration: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  
  &:hover, &.active {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`;

const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const MobileNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  padding: 1rem;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MobileNavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  
  &:hover, &.active {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`;

const MobileButton = styled(Button)`
  width: 100%;
`;

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">Home Design Finder</Logo>
        <NavLinks>
          <NavLink to="/">{t('nav.home', 'Home')}</NavLink>
          <NavLink to="/house-plans">{t('nav.housePlans', 'House Plans')}</NavLink>
          <NavLink to="/styles">{t('nav.styles', 'Design Styles')}</NavLink>
          <NavLink to="/blog">{t('nav.blog', 'Blog')}</NavLink>
          <Button 
            as="a" 
            href={getSiteAffiliateLink('house-plans', 'nav_button')} 
            target="_blank" 
            rel="noopener noreferrer" 
            $primary
          >
            {t('nav.findPlans', 'Find Plans')}
          </Button>
        </NavLinks>
        <MobileMenu>
          <Button $small onClick={toggleMobileMenu}>
            {mobileMenuOpen ? 'Close' : 'Menu'}
          </Button>
        </MobileMenu>
      </Nav>
      
      {mobileMenuOpen && (
        <MobileNavLinks>
          <MobileNavLink to="/" onClick={() => setMobileMenuOpen(false)}>
            {t('nav.home', 'Home')}
          </MobileNavLink>
          <MobileNavLink to="/house-plans" onClick={() => setMobileMenuOpen(false)}>
            {t('nav.housePlans', 'House Plans')}
          </MobileNavLink>
          <MobileNavLink to="/styles" onClick={() => setMobileMenuOpen(false)}>
            {t('nav.styles', 'Design Styles')}</MobileNavLink>
          <MobileNavLink to="/blog" onClick={() => setMobileMenuOpen(false)}>
            {t('nav.blog', 'Blog')}
          </MobileNavLink>
          <MobileButton 
            as="a"
            href={getSiteAffiliateLink('house-plans', 'mobile_nav_button')}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('nav.findPlans', 'Find Plans')}
          </MobileButton>
        </MobileNavLinks>
      )}
    </HeaderContainer>
  );
};

export default Header;