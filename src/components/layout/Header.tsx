import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { AFFILIATE_LINKS } from '../../constants/links';

const HeaderContainer = styled.header`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoLink = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-family: ${({ theme }) => theme.typography.headingFontFamily};
  
  &:hover {
    text-decoration: none;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  flex-direction: column;
  gap: 0.3rem;

  span {
    display: block;
    width: 1.5rem;
    height: 0.2rem;
    background-color: ${({ theme }) => theme.colors.text};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }
`;

const NavLinks = styled.ul<{ isOpen: boolean }>`
  display: flex;
  gap: 2rem;
  list-style: none;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    background-color: white;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const NavItem = styled.li``;

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

const AffiliateLink = styled.a`
  text-decoration: none;
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderContainer>
      <NavContainer>
        <LogoContainer>
          <LogoLink to="/">Home Design Finder</LogoLink>
        </LogoContainer>
        
        <MenuButton onClick={toggleMenu} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </MenuButton>
        
        <NavLinks isOpen={isMenuOpen}>
          <NavItem>
            <NavLink to="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/house-plans">House Plans</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/blog">Blog</NavLink>
          </NavItem>
          <NavItem>
            <AffiliateLink 
              href={AFFILIATE_LINKS.main} 
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button $primary>
                Find Plans
              </Button>
            </AffiliateLink>
          </NavItem>
        </NavLinks>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header;