import React from 'react';
import styled from 'styled-components';
import SeoHead from '../components/SEO/SeoHead';
import Breadcrumbs from '../components/navigation/Breadcrumbs';
import { getCategoryLink } from '../constants/links';
import Card from '../components/ui/Card';
import ImageWithFallback from '../components/ui/ImageWithFallback';
import { HOUSE_PLAN_IMAGES } from '../constants/images';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.headingFontFamily};
`;

const PageDescription = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const StylesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const StyleCard = styled(Card)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const StyleImage = styled(ImageWithFallback)`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const StyleContent = styled.div`
  padding: 1.5rem;
`;

const StyleName = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const StyleDescription = styled.p`
  font-size: 0.9rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
`;

const ViewLink = styled.a`
  display: inline-block;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 500;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

// House style data
const houseStyles = [
  {
    id: 'modern-farmhouse',
    name: 'Modern Farmhouse',
    description: 'Combines traditional farmhouse aesthetics with modern design elements for a warm, functional living space.',
    image: HOUSE_PLAN_IMAGES.MODERN_FARMHOUSE_1,
    features: ['Gabled roofs', 'Large porches', 'Mixed materials', 'Open floor plans']
  },
  {
    id: 'craftsman',
    name: 'Craftsman',
    description: 'Known for its handcrafted details, natural materials, and exposed beams. Emphasizes artisan craftsmanship.',
    image: HOUSE_PLAN_IMAGES.CRAFTSMAN_1,
    features: ['Low-pitched roofs', 'Wide eaves', 'Tapered columns', 'Built-in furniture']
  },
  {
    id: 'ranch',
    name: 'Ranch',
    description: 'Single-story homes with an open, casual layout. Perfect for those who want ease of mobility and indoor/outdoor living.',
    image: HOUSE_PLAN_IMAGES.RANCH_1,
    features: ['Single-story', 'Open floor plans', 'Low-pitched roofs', 'Attached garages']
  },
  {
    id: 'contemporary',
    name: 'Contemporary',
    description: 'Sleek, minimalist designs with clean lines and large windows. Emphasizes open spaces and natural light.',
    image: HOUSE_PLAN_IMAGES.CONTEMPORARY_1,
    features: ['Asymmetrical forms', 'Large windows', 'Flat or shed roofs', 'Minimal ornamentation']
  },
  {
    id: 'cottage',
    name: 'Cottage',
    description: 'Charming, smaller homes with cozy features. Evokes a comfortable, storybook feeling with traditional elements.',
    image: HOUSE_PLAN_IMAGES.COTTAGE_1,
    features: ['Steep roof pitches', 'Arched doorways', 'Smaller footprint', 'Intimate spaces']
  },
  {
    id: 'traditional',
    name: 'Traditional',
    description: 'Classic designs that blend elements from different historical styles for a timeless, elegant appeal.',
    image: HOUSE_PLAN_IMAGES.TRADITIONAL_1,
    features: ['Symmetrical facades', 'Formal entry halls', 'Detailed moldings', 'Defined rooms']
  },
  {
    id: 'mediterranean',
    name: 'Mediterranean',
    description: 'Inspired by seaside villas, featuring stucco exteriors, tile roofs, and warm, earthy colors.',
    image: HOUSE_PLAN_IMAGES.MEDITERRANEAN_1,
    features: ['Stucco exteriors', 'Clay tile roofs', 'Arched doorways', 'Iron details']
  },
  {
    id: 'colonial',
    name: 'Colonial',
    description: 'Symmetrical, balanced designs with a formal appearance, often featuring columns and a centered front door.',
    image: HOUSE_PLAN_IMAGES.COLONIAL_1,
    features: ['Symmetrical facades', 'Columns', 'Multi-pane windows', 'Central entry']
  }
];

const StylesPage: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Design Styles', path: '/styles', isLast: true }
  ];
  
  return (
    <PageContainer>
      <SeoHead 
        title="Home Design Styles & Architectural Styles | Architectural Designs"
        description="Explore popular home design styles and find the perfect architectural style for your dream home. From Modern Farmhouse to Contemporary, Ranch to Craftsman."
        keywords="home design styles, architectural styles, modern farmhouse, craftsman, ranch, contemporary, cottage, house styles"
      />
      
      {breadcrumbItems && <Breadcrumbs items={breadcrumbItems} />}
      
      <PageTitle>Home Design Styles</PageTitle>
      <PageDescription>
        Explore our collection of home design styles to find the perfect architectural style for your dream home. 
        Each style has unique characteristics that reflect different aesthetics, lifestyles, and building traditions.
      </PageDescription>
      
      <StylesGrid>
        {houseStyles.map(style => (
          <StyleCard key={style.id}>
            <StyleImage 
              src={style.image} 
              alt={`${style.name} style house`} 
            />
            <StyleContent>
              <StyleName>{style.name}</StyleName>
              <StyleDescription>{style.description}</StyleDescription>
              <ViewLink 
                href={getCategoryLink(`house-plans/${style.id}`, `styles_page_${style.id}`)} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View {style.name} Plans →
              </ViewLink>
            </StyleContent>
          </StyleCard>
        ))}
      </StylesGrid>
    </PageContainer>
  );
};

export default StylesPage;