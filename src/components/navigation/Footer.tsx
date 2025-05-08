'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const FooterContainer = styled.footer`
  background-color: #1f2937;
  color: white;
  padding: 2rem 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const FooterSection = styled.div``;

const FooterHeading = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const FooterText = styled.p`
  color: #d1d5db;
`;

const FooterLinkList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FooterLinkItem = styled.li``;

const FooterLink = styled(Link)`
  color: #d1d5db;
  
  &:hover {
    color: white;
  }
`;

const SocialMediaContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialMediaIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: #374151;
  border-radius: 50%;
  color: white;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: var(--color-primary);
  }
`;

const FooterDivider = styled.div`
  border-top: 1px solid #374151;
  margin-top: 2rem;
  padding-top: 2rem;
  text-align: center;
  color: #d1d5db;
`;

const PrivacyLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

// Utility function to get share messages based on current page
const getShareMessage = (pathname: string) => {
  // Default message
  let message = "Check out these beautiful home designs at Home Design Finder!";
  let url = process.env.NEXT_PUBLIC_SITE_URL || "https://homedesignfinder.com";
  
  // House plan detail page
  if (pathname.startsWith('/house-plans/') && pathname.split('/').length > 2) {
    const slug = pathname.split('/')[2];
    const planName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    message = `I just found this gorgeous ${planName} on Home Design Finder! Perfect floor plan for my dream home. #DreamHome #HousePlans`;
    url = `${url}${pathname}`;
  }
  
  // Garage plan detail page
  else if (pathname.startsWith('/garage-plans/') && pathname.split('/').length > 2) {
    const slug = pathname.split('/')[2];
    const planName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    message = `Check out this ${planName} I found on Home Design Finder! Perfect solution for extra storage and vehicles. #GaragePlans #HomeDesign`;
    url = `${url}${pathname}`;
  }
  
  // Style-specific page
  else if (pathname.startsWith('/styles/') && pathname.split('/').length > 2) {
    const style = pathname.split('/')[2];
    const styleName = style.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    message = `Love the ${styleName} style homes on Home Design Finder! So many beautiful options for my future home. #${styleName.replace(' ', '')} #HouseDesign`;
    url = `${url}${pathname}`;
  }
  
  // General house plans page
  else if (pathname === '/house-plans') {
    message = "Browsing through beautiful house plans on Home Design Finder. So many amazing designs! #HousePlans #DreamHome";
    url = `${url}${pathname}`;
  }
  
  // General garage plans page
  else if (pathname === '/garage-plans') {
    message = "Looking at garage plans on Home Design Finder. Perfect for extra storage, workshop space, or vehicle protection! #GaragePlans #HomeDesign";
    url = `${url}${pathname}`;
  }
  
  return { message, url };
};

export default function Footer() {
  const pathname = usePathname();
  const [shareData, setShareData] = useState({ message: "", url: "" });
  
  useEffect(() => {
    setShareData(getShareMessage(pathname));
  }, [pathname]);
  
  const handleFacebookShare = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}&quote=${encodeURIComponent(shareData.message)}`, '_blank');
  };
  
  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.message)}&url=${encodeURIComponent(shareData.url)}`, '_blank');
  };
  
  const handlePinterestShare = () => {
    // Ideally, we'd get an image from the page, but for now we'll use a placeholder
    const imageUrl = "https://picsum.photos/seed/homedesign/800/600";
    window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareData.url)}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(shareData.message)}`, '_blank');
  };
  
  const handleLinkedInShare = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`, '_blank');
  };
  
  const handleEmailShare = () => {
    window.location.href = `mailto:?subject=Check out this home design&body=${encodeURIComponent(shareData.message + '\n\n' + shareData.url)}`;
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <FooterHeading>Home Design Finder</FooterHeading>
            <FooterText>Find your perfect home plan from our curated collection of designs.</FooterText>
            <SocialMediaContainer>
              <SocialMediaIcon onClick={handleFacebookShare} title="Share on Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </SocialMediaIcon>
              <SocialMediaIcon onClick={handleTwitterShare} title="Share on Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </SocialMediaIcon>
              <SocialMediaIcon onClick={handlePinterestShare} title="Share on Pinterest">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </SocialMediaIcon>
              <SocialMediaIcon onClick={handleLinkedInShare} title="Share on LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </SocialMediaIcon>
              <SocialMediaIcon onClick={handleEmailShare} title="Share via Email">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </SocialMediaIcon>
            </SocialMediaContainer>
          </FooterSection>
          
          <FooterSection>
            <FooterHeading>House Plans</FooterHeading>
            <FooterLinkList>
              <FooterLinkItem>
                <FooterLink href="/styles">Styles</FooterLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLink href="/collections">Collections</FooterLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLink href="/house-plans">House Plans</FooterLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLink href="/garage-plans">Garage Plans</FooterLink>
              </FooterLinkItem>
            </FooterLinkList>
          </FooterSection>
          
          <FooterSection>
            <FooterHeading>Resources</FooterHeading>
            <FooterLinkList>
              <FooterLinkItem>
                <FooterLink href="/blog">Blog</FooterLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLink href="/search">Search</FooterLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLink href="/about">About Us</FooterLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLink href="/contact">Contact</FooterLink>
              </FooterLinkItem>
            </FooterLinkList>
          </FooterSection>
          
          <FooterSection>
            <FooterHeading>Popular Styles</FooterHeading>
            <FooterLinkList>
              <FooterLinkItem>
                <FooterLink href="/styles/modern-farmhouse">Modern Farmhouse</FooterLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLink href="/styles/craftsman">Craftsman</FooterLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLink href="/styles/ranch">Ranch</FooterLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLink href="/styles/contemporary">Contemporary</FooterLink>
              </FooterLinkItem>
            </FooterLinkList>
          </FooterSection>
        </FooterGrid>
        
        <FooterDivider>
          <PrivacyLinks>
            <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
            <FooterLink href="/terms-of-service">Terms of Service</FooterLink>
            <FooterLink href="/affiliate-disclosure">Affiliate Disclosure</FooterLink>
          </PrivacyLinks>
          <p>&copy; {new Date().getFullYear()} Home Design Finder. All rights reserved.</p>
        </FooterDivider>
      </FooterContent>
    </FooterContainer>
  );
}