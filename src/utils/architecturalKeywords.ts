export interface KeywordGroup {
  category: string;
  keywords: string[];
}

export const architecturalKeywords: KeywordGroup[] = [
  {
    category: 'House Styles',
    keywords: [
      'modern house plans',
      'contemporary home designs',
      'craftsman style house plans',
      'farmhouse floor plans',
      'colonial house designs',
      'mid-century modern house plans',
      'mediterranean villa designs',
      'traditional home plans',
      'ranch style house plans',
      'bungalow house designs',
      'victorian home plans',
      'minimalist house designs',
      'cottage floor plans',
      'cape cod house designs',
      'tudor style homes',
      'prairie style house plans'
    ]
  },
  {
    category: 'House Features',
    keywords: [
      'open floor plans',
      'master suite designs',
      'kitchen layouts',
      'home office floor plans',
      'energy efficient home designs',
      'garage plans',
      'basement designs',
      'outdoor living spaces',
      'small house plans',
      'luxury home designs',
      'multi-family house plans',
      'sustainable architecture',
      'accessible home designs',
      'tiny house plans',
      'ADU designs',
      'multigenerational floor plans'
    ]
  },
  {
    category: 'Exterior Features',
    keywords: [
      'porch designs',
      'exterior elevation plans',
      'roof designs',
      'modern facades',
      'eco-friendly exteriors',
      'stone veneer house plans',
      'siding options',
      'deck designs',
      'outdoor kitchen plans',
      'pool house designs',
      'courtyard layouts',
      'entry door designs',
      'garage door options',
      'sustainable landscaping',
      'driveway designs'
    ]
  },
  {
    category: 'Interior Features',
    keywords: [
      'kitchen design plans',
      'bathroom layout ideas',
      'living room designs',
      'main suite layouts',
      'walk-in closet designs',
      'home office layouts',
      'fireplace designs',
      'staircase layouts',
      'built-in bookshelf plans',
      'kitchen island designs',
      'pantry layouts',
      'mudroom plans',
      'laundry room designs',
      'open concept layouts',
      'loft designs'
    ]
  }
];

export const getKeywordsByCategory = (category: string): string[] => {
  const group = architecturalKeywords.find(g => g.category === category);
  return group ? group.keywords : [];
};

export const getAllKeywords = (): string[] => {
  return architecturalKeywords.reduce((acc, group) => [...acc, ...group.keywords], [] as string[]);
};

export const getRelatedKeywords = (mainKeyword: string, count: number = 5): string[] => {
  // Find which category the keyword belongs to
  const allKeywords = getAllKeywords();
  if (!allKeywords.includes(mainKeyword)) {
    return allKeywords.slice(0, count); // Return random keywords if main not found
  }
  
  let category = '';
  for (const group of architecturalKeywords) {
    if (group.keywords.includes(mainKeyword)) {
      category = group.category;
      break;
    }
  }
  
  // Get keywords from same category, excluding the main one
  const sameCategory = getKeywordsByCategory(category).filter(k => k !== mainKeyword);
  
  // If we don't have enough, add from other categories
  if (sameCategory.length >= count) {
    return sameCategory.slice(0, count);
  }
  
  // Add keywords from other categories to reach desired count
  const otherKeywords = allKeywords.filter(k => k !== mainKeyword && !sameCategory.includes(k));
  return [...sameCategory, ...otherKeywords].slice(0, count);
};