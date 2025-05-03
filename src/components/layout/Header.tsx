import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';
import { getAffiliateLink } from '../../constants/links';

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

const Header: React.FC = () => {
  const { t } = useTranslation();
  
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
            href={getAffiliateLink('house-plans', 'nav_button')} 
            target="_blank" 
            rel="noopener noreferrer" 
            $primary
          >
            {t('nav.findPlans', 'Find Plans')}
          </Button>
        </NavLinks>
        <MobileMenu>
          {/* Mobile menu implementation goes here */}
          <Button $small>Menu</Button>
        </MobileMenu>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;