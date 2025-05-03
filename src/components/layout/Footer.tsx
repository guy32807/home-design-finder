import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SOCIAL_LINKS } from '../../constants/links';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.text};
  color: white;
  padding: 3rem 0 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  margin-bottom: 1.5rem;
`;

const FooterHeading = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.typography.headingFontFamily};
`;

const FooterLink = styled(Link)`
  display: block;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: 0.5rem;
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: white;
    text-decoration: none;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: white;
  font-size: 1.5rem;
  transition: color 0.2s;
  
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.accent};
`;

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterHeading>Home Design Finder</FooterHeading>
          <p>{t('footer.description', 'Discover beautiful house plans and architectural designs for your dream home.')}</p>
          <SocialLinks>
            <SocialLink href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </SocialLink>
            <SocialLink href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </SocialLink>
            <SocialLink href={SOCIAL_LINKS.pinterest} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-pinterest"></i>
            </SocialLink>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterHeading>{t('footer.quickLinks', 'Quick Links')}</FooterHeading>
          <FooterLink to="/">{t('nav.home', 'Home')}</FooterLink>
          <FooterLink to="/house-plans">{t('nav.housePlans', 'House Plans')}</FooterLink>
          <FooterLink to="/styles">{t('nav.styles', 'Design Styles')}</FooterLink>
          <FooterLink to="/blog">{t('nav.blog', 'Blog')}</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterHeading>{t('footer.popular', 'Popular Designs')}</FooterHeading>
          <FooterLink to="/house-plans/modern">Modern House Plans</FooterLink>
          <FooterLink to="/house-plans/farmhouse">Farmhouse Plans</FooterLink>
          <FooterLink to="/house-plans/cabin">Cabin Plans</FooterLink>
          <FooterLink to="/house-plans/tiny-house">Tiny House Plans</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterHeading>{t('footer.about', 'About Us')}</FooterHeading>
          <FooterLink to="/about">{t('footer.aboutUs', 'About Us')}</FooterLink>
          <FooterLink to="/privacy">{t('footer.privacy', 'Privacy Policy')}</FooterLink>
          <FooterLink to="/terms">{t('footer.terms', 'Terms of Service')}</FooterLink>
          <FooterLink to="/contact">{t('footer.contact', 'Contact Us')}</FooterLink>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        © {currentYear} Home Design Finder. {t('footer.rights', 'All rights reserved.')}
        <p className="affiliate-disclosure">
          {t('footer.disclosure', 'This website contains affiliate links. We may earn a commission if you make a purchase through our links.')}
        </p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;