import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { getAffiliateLink, getPlanLink, getCategoryLink } from '../constants/links';
import { HOUSE_PLAN_IMAGES } from '../constants/images';
import ImageWithFallback from '../components/ui/ImageWithFallback';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Hero = styled.section`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                    url('https://www.architecturaldesigns.com/assets/img/about-us.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 8rem 0;
  text-align: center;
  margin-bottom: 3rem;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  font-family: ${({ theme }) => theme.typography.headingFontFamily};
  font-weight: 700;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.25rem;
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: ${({ theme }) => theme.typography.headingFontFamily};
`;

const FeaturedSection = styled.section`
  padding: 3rem 0;
`;

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const PlanCard = styled(Card)`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const PlanImage = styled(ImageWithFallback)`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const PlanDetails = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const PlanTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  font-family: ${({ theme }) => theme.typography.headingFontFamily};
`;

const PlanPrice = styled.p`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const PlanMeta = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.875rem;
`;

const PlanDescription = styled.p`
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const ViewAllLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 2rem;
  font-weight: 500;
`;

const HowItWorks = styled.section`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  padding: 4rem 0;
  margin: 3rem 0;
`;

const StepsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const Step = styled.div`
  text-align: center;
`;

const StepIcon = styled.div`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const StepTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  font-family: ${({ theme }) => theme.typography.headingFontFamily};
`;

const StepDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
`;

const TestimonialsSection = styled.section`
  padding: 4rem 0;
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const TestimonialCard = styled(Card)`
  display: flex;
  flex-direction: column;
`;

const TestimonialText = styled.p`
  margin-bottom: 1.5rem;
  font-style: italic;
`;

const TestimonialAuthor = styled.div`
  font-weight: 600;
  margin-top: auto;
`;

const CTA = styled.section`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 4rem 0;
  text-align: center;
  margin: 3rem 0;
`;

const CTATitle = styled.h2`
  font-size: 2.25rem;
  margin-bottom: 1.5rem;
  font-family: ${({ theme }) => theme.typography.headingFontFamily};
`;

const CTADescription = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled(Button)`
  font-size: 1.125rem;
  padding: 1rem 2rem;
`;

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  
  // Function to track affiliate clicks
  const trackAffiliateClick = (source: string) => {
    console.log(`Affiliate link clicked: ${source}`);
    
    // Add your tracking code here
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore
      window.gtag('event', 'affiliate_click', {
        event_category: 'affiliate',
        event_label: source,
      });
    }
  };
  
  return (
    <>
      <Hero>
        <HeroContent>
          <HeroTitle>{t('home.hero.title', 'Find Your Perfect House Plan')}</HeroTitle>
          <HeroSubtitle>
            {t('home.hero.subtitle', 'Browse thousands of beautiful house plans and architectural designs to find your dream home.')}
          </HeroSubtitle>
          <HeroButtons>
            <Button 
              as="a" 
              href={getAffiliateLink('house-plans', 'hero_button')} 
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackAffiliateClick('hero_button')}
              $primary 
              $large
            >
              {t('home.hero.exploreButton', 'Explore House Plans')}
            </Button>
            <Button as={Link} to="/styles" $large>
              {t('home.hero.browseButton', 'Browse Styles')}
            </Button>
          </HeroButtons>
        </HeroContent>
      </Hero>
      
      <Container>
        <FeaturedSection>
          <SectionTitle>{t('home.featured.title', 'Featured House Plans')}</SectionTitle>
          <FeaturedGrid>
            {/* Featured Plan 1 */}
            <PlanCard>
              <PlanImage 
                src={HOUSE_PLAN_IMAGES.MODERN_FARMHOUSE_1} 
                alt="Modern Farmhouse Plan" 
              />
              <PlanDetails>
                <PlanTitle>Modern Farmhouse Plan</PlanTitle>
                <PlanPrice>From $950</PlanPrice>
                <PlanMeta>
                  <span>3-4 Beds</span>
                  <span>2.5 Baths</span>
                  <span>2,400 sq ft</span>
                </PlanMeta>
                <PlanDescription>
                  Beautiful modern farmhouse with open floor plan, spacious kitchen, and covered porch.
                </PlanDescription>
                <Button 
                  as="a" 
                  href={getPlanLink('23703JD', 'featured_farmhouse')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick('featured_farmhouse')}
                  $fullWidth
                >
                  View Plan
                </Button>
              </PlanDetails>
            </PlanCard>
            
            {/* Featured Plan 2 */}
            <PlanCard>
              <PlanImage 
                src={HOUSE_PLAN_IMAGES.RANCH_1} 
                alt="Modern Ranch Home" 
              />
              <PlanDetails>
                <PlanTitle>Modern Ranch Home</PlanTitle>
                <PlanPrice>From $850</PlanPrice>
                <PlanMeta>
                  <span>3 Beds</span>
                  <span>2 Baths</span>
                  <span>1,800 sq ft</span>
                </PlanMeta>
                <PlanDescription>
                  Single-level modern ranch with open concept living, stylish exterior, and practical layout.
                </PlanDescription>
                <Button 
                  as="a" 
                  href={getPlanLink('85245MS', 'featured_ranch')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick('featured_ranch')}
                  $fullWidth
                >
                  View Plan
                </Button>
              </PlanDetails>
            </PlanCard>
            
            {/* Featured Plan 3 */}
            <PlanCard>
              <PlanImage 
                src={HOUSE_PLAN_IMAGES.CONTEMPORARY_1} 
                alt="Contemporary Craftsman" 
              />
              <PlanDetails>
                <PlanTitle>Contemporary Craftsman</PlanTitle>
                <PlanPrice>From $1,100</PlanPrice>
                <PlanMeta>
                  <span>4 Beds</span>
                  <span>3.5 Baths</span>
                  <span>2,200 sq ft</span>
                </PlanMeta>
                <PlanDescription>
                  Stunning craftsman design with luxury features, bonus room, and high ceilings.
                </PlanDescription>
                <Button 
                  as="a" 
                  href={getPlanLink('610016MC', 'featured_craftsman')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackAffiliateClick('featured_craftsman')}
                  $fullWidth
                >
                  View Plan
                </Button>
              </PlanDetails>
            </PlanCard>
          </FeaturedGrid>
          
          <ViewAllLink to="/house-plans">
            {t('home.featured.viewAll', 'View All House Plans')} →
          </ViewAllLink>
        </FeaturedSection>
      </Container>
      
      <HowItWorks>
        <Container>
          <SectionTitle>{t('home.howItWorks.title', 'How It Works')}</SectionTitle>
          <StepsContainer>
            <Step>
              <StepIcon>
                <i className="fas fa-search"></i>
              </StepIcon>
              <StepTitle>{t('home.howItWorks.step1.title', 'Find a Plan')}</StepTitle>
              <StepDescription>
                {t('home.howItWorks.step1.description', 'Browse our extensive collection of house plans by style, size, and features.')}
              </StepDescription>
            </Step>
            
            <Step>
              <StepIcon>
                <i className="fas fa-pencil-ruler"></i>
              </StepIcon>
              <StepTitle>{t('home.howItWorks.step2.title', 'Customize')}</StepTitle>
              <StepDescription>
                {t('home.howItWorks.step2.description', 'Modify any plan to suit your needs with customization options.')}
              </StepDescription>
            </Step>
            
            <Step>
              <StepIcon>
                <i className="fas fa-home"></i>
              </StepIcon>
              <StepTitle>{t('home.howItWorks.step3.title', 'Build Your Dream')}</StepTitle>
              <StepDescription>
                {t('home.howItWorks.step3.description', 'Receive detailed blueprints and begin building your dream home.')}
              </StepDescription>
            </Step>
          </StepsContainer>
        </Container>
      </HowItWorks>
      
      <Container>
        <TestimonialsSection>
          <SectionTitle>{t('home.testimonials.title', 'What Our Customers Say')}</SectionTitle>
          <TestimonialGrid>
            <TestimonialCard>
              <TestimonialText>
                "We found the perfect plan for our family. The process was so easy, and the blueprints were comprehensive and detailed."
              </TestimonialText>
              <TestimonialAuthor>- Michael & Sarah Thompson</TestimonialAuthor>
            </TestimonialCard>
            
            <TestimonialCard>
              <TestimonialText>
                "The customization options saved us thousands compared to hiring an architect from scratch. We couldn't be happier with our new home."
              </TestimonialText>
              <TestimonialAuthor>- James Wilson</TestimonialAuthor>
            </TestimonialCard>
            
            <TestimonialCard>
              <TestimonialText>
                "Finding a house plan that matched our vision was simple. Our builder was impressed with the quality of the plans."
              </TestimonialText>
              <TestimonialAuthor>- Jennifer & David Miller</TestimonialAuthor>
            </TestimonialCard>
          </TestimonialGrid>
        </TestimonialsSection>
      </Container>
      
      <CTA>
        <Container>
          <CTATitle>{t('home.cta.title', 'Ready to Find Your Dream Home?')}</CTATitle>
          <CTADescription>
            {t('home.cta.description', 'Explore thousands of house plans from top architects and designers. Start building your future today.')}
          </CTADescription>
          <CTAButton 
            as="a" 
            href={getAffiliateLink('house-plans', 'cta_button')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAffiliateClick('cta_button')} 
            $primary 
            $large
          >
            {t('home.cta.button', 'Explore House Plans')}
          </CTAButton>
        </Container>
      </CTA>
    </>
  );
};

export default HomePage;