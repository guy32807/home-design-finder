const CLICK_ID = '9083409';

// Map of tracking domains for CJ
const CJ_TRACKING_DOMAINS = {
  anrdoezrs: 'https://www.anrdoezrs.net/click-9083409-',
  dpbolvw: 'https://www.dpbolvw.net/click-9083409-',
  jdoqocy: 'https://www.jdoqocy.com/click-9083409-',
  kqzyfj: 'https://www.kqzyfj.com/click-9083409-',
  ftjcfx: 'https://www.ftjcfx.com/click-9083409-',
  tkqlhce: 'https://www.tkqlhce.com/click-9083409-'
};

// Architectural Designs affiliate link ID
const ARCHITECTURAL_DESIGNS_ID = '13800729';

// Base URL for destination links
const ARCHITECTURAL_DESIGNS_BASE_URL = 'https://www.architecturaldesigns.com';

// Main affiliate link pattern
export const AFFILIATE_LINKS = {
  // Base affiliate URL
  ARCHITECTURAL_DESIGNS: `${CJ_TRACKING_DOMAINS.tkqlhce}${ARCHITECTURAL_DESIGNS_ID}`,
};

/**
 * Generate an affiliate link to Architectural Designs
 * @param destination The destination path on architecturaldesigns.com
 * @param source The source of the referral for tracking
 * @param planId Optional plan ID for specific plans
 * @returns The affiliate link URL
 */
export const getAffiliateLink = (destination: string, source: string, planId?: string): string => {
  // Format the destination URL
  let destinationUrl = destination;
  
  // If the destination doesn't start with http or /, assume it's a relative path
  if (!destination.startsWith('http') && !destination.startsWith('/')) {
    destinationUrl = `/${destination}`;
  }
  
  // If it doesn't include the base domain, add it
  if (!destinationUrl.includes('architecturaldesigns.com')) {
    destinationUrl = `${ARCHITECTURAL_DESIGNS_BASE_URL}${destinationUrl}`;
  }
  
  // Encode the destination URL
  const encodedUrl = encodeURIComponent(destinationUrl);
  
  // Create the affiliate link with the url parameter
  let affiliateUrl = `${AFFILIATE_LINKS.ARCHITECTURAL_DESIGNS}?url=${encodedUrl}`;
  
  // Add tracking parameters
  affiliateUrl += `&utm_source=homedesignaffiliate&utm_medium=referral&utm_campaign=${source}`;
  
  // Add the plan ID as cjsku if provided
  if (planId) {
    affiliateUrl += `&cjsku=${planId}`;
  }
  
  return affiliateUrl;
};

/**
 * Generate a direct link to a specific house plan
 * @param planId The ID of the house plan
 * @param source The source of the referral for tracking
 * @returns The affiliate link URL
 */
export const getPlanLink = (planId: string, source: string): string => {
  // Format the plan URL path
  const planPath = `/house-plans/just-plain-charming-${planId}`;
  
  // Use the main function to generate the link
  return getAffiliateLink(planPath, source, planId);
};

/**
 * Generate a link to a specific category of house plans
 * @param category The category (farmhouse, modern, etc)
 * @param source The source of the referral for tracking
 * @returns The affiliate link URL
 */
export const getCategoryLink = (category: string, source: string): string => {
  // Format the category URL path
  const categoryPath = `/house-plans/${category}`;
  
  // Use the main function to generate the link
  return getAffiliateLink(categoryPath, source);
};

// Social media links
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/homedesignaffiliate',
  twitter: 'https://twitter.com/homedesigns',
  instagram: 'https://instagram.com/homedesigns',
  pinterest: 'https://pinterest.com/homedesigns'
};