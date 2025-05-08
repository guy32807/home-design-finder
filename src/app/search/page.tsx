import { Metadata } from 'next';
import SearchResultsPage from '../../components/search/SearchResultsPage';
import { PlanRepository } from '../../adapters/api/PlanRepository';
import { withSuspense } from '../../lib/pageWrappers';

export const metadata: Metadata = {
  title: 'Search House Plans | Find Your Dream Home Design',
  description: 'Search our collection of house plans by size, bedrooms, bathrooms, and features to find the perfect home design for your family.',
};

const SearchResultsWithSuspense = withSuspense(
  SearchResultsPage,
  {
    title: 'Searching for Plans',
    message: 'Please wait while we find the perfect house plans for you...'
  }
);

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Get search parameters from the URL
  const q = typeof searchParams.q === 'string' ? searchParams.q : '';
  const bedrooms = typeof searchParams.bedrooms === 'string' ? searchParams.bedrooms : '';
  const bathrooms = typeof searchParams.bathrooms === 'string' ? searchParams.bathrooms : '';
  const floors = typeof searchParams.floors === 'string' ? searchParams.floors : '';
  const style = typeof searchParams.style === 'string' ? searchParams.style : '';
  const sqft = typeof searchParams.sqft === 'string' ? searchParams.sqft : '';
  
  // Initialize repository and fetch plans
  const planRepository = new PlanRepository();
  const initialPlans = await planRepository.getPopularPlans(50);
  
  return (
    <SearchResultsWithSuspense 
      initialPlans={initialPlans}
      searchParams={{
        q,
        bedrooms,
        bathrooms,
        floors,
        style,
        sqft
      }}
    />
  );
}