const CLICK_ID = '101433563'; // Updated to your new ID

// Map of tracking domains for CJ
const CJ_TRACKING_DOMAINS = {
  anrdoezrs: `https://www.anrdoezrs.net/click-${CLICK_ID}-`,
  dpbolvw: `https://www.dpbolvw.net/click-${CLICK_ID}-`,
  jdoqocy: `https://www.jdoqocy.com/click-${CLICK_ID}-`,
  kqzyfj: `https://www.kqzyfj.com/click-${CLICK_ID}-`,
  ftjcfx: `https://www.ftjcfx.com/click-${CLICK_ID}-`,
  tkqlhce: `https://www.tkqlhce.com/click-${CLICK_ID}-`
};

// Architectural Designs affiliate link ID
const ARCHITECTURAL_DESIGNS_ID = '13731686';

// Base URL for destination links
const ARCHITECTURAL_DESIGNS_BASE_URL = 'https://www.architecturaldesigns.com';

/**
 * Social media links for the site
 */
export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/architecturaldesigns',
  twitter: 'https://twitter.com/architectdesigns',
  instagram: 'https://www.instagram.com/architectural_designs',
  pinterest: 'https://www.pinterest.com/architectdesigns',
  youtube: 'https://www.youtube.com/user/ArchitecturalDesigns'
};

/**
 * Affiliate program links
 */
export const AFFILIATE_LINKS = {
  main: `https://www.kqzyfj.com/click-${CLICK_ID}-13731686`,
  housePlans: `https://www.kqzyfj.com/click-${CLICK_ID}-13731686?u=https%3A%2F%2Fwww.architecturaldesigns.com%2Fhouse-plans`,
  // Add any other specific affiliate links here
};

/**
 * Generates an affiliate link for a house plan
 * @param planId The ID of the house plan
 * @param source The source of the click (for tracking)
 * @returns The complete affiliate link
 */
export const getAffiliateLink = (planId: string, source: string = 'general'): string => {
  // Base affiliate URL from Commission Junction
  const baseAffiliateUrl = `https://www.kqzyfj.com/click-${CLICK_ID}-13731686`;
  
  // Add tracking parameters
  let url = `${baseAffiliateUrl}`;
  
  // If specific plan ID is provided, add it as a parameter
  if (planId && planId !== 'house-plans') {
    url += `?u=https%3A%2F%2Fwww.architecturaldesigns.com%2Fplans%2F${planId}`;
  }
  
  // Add source tracking if available
  if (source && source !== 'general') {
    url += url.includes('?') ? `&s=${source}` : `?s=${source}`;
  }
  
  return url;
};

/**
 * Get general site affiliate link
 * @param category Optional category to link to
 * @param source Source of the click for tracking
 * @returns Affiliate link to the category or main site
 */
export const getSiteAffiliateLink = (category?: string, source: string = 'general'): string => {
  // Base affiliate URL from Commission Junction
  const baseAffiliateUrl = `https://www.kqzyfj.com/click-${CLICK_ID}-13731686`;
  
  let url = baseAffiliateUrl;
  
  // Add category if provided
  if (category) {
    url += `?u=https%3A%2F%2Fwww.architecturaldesigns.com%2F${category}`;
  }
  
  // Add source tracking
  if (source && source !== 'general') {
    url += url.includes('?') ? `&s=${source}` : `?s=${source}`;
  }
  
  return url;
};

/**
 * Get link to a specific house plan
 * This is an alias for getAffiliateLink to maintain compatibility 
 * with existing code that uses getPlanLink
 * 
 * @param planId The ID of the house plan
 * @param source Source of the click for tracking
 * @returns Affiliate link to the specific plan
 */
export const getPlanLink = (planId: string, source: string = 'general'): string => {
  return getAffiliateLink(planId, source);
};

/**
 * Get link to a specific category page
 * @param category The category to link to
 * @param source Source of the click for tracking
 * @returns Affiliate link to the category
 */
export const getCategoryLink = (category: string, source: string = 'general'): string => {
  return getSiteAffiliateLink(category, source);
};

/**
 * Get link to the "More Plans" page on Architectural Designs
 * @param source Source of the click for tracking
 * @returns Affiliate link to the house plans section
 */
export const getMorePlansLink = (source: string = 'load-more'): string => {
  return `https://www.kqzyfj.com/click-${CLICK_ID}-13731686?u=https%3A%2F%2Fwww.architecturaldesigns.com%2Fhouse-plans&s=${source}`;
};