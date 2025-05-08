/**
 * Represents a user of the application
 */
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  savedPlans?: string[];
  recentlyViewed?: RecentlyViewedItem[];
  preferences?: UserPreferences;
  createdAt: Date;
  lastLoginAt?: Date;
}

/**
 * Recently viewed plan
 */
export interface RecentlyViewedItem {
  planId: string;
  viewedAt: Date;
}

/**
 * User preferences
 */
export interface UserPreferences {
  squareFeetRange?: [number, number];
  preferredStyles?: string[];
  bedroomsPreferred?: number;
  bathroomsPreferred?: number;
  garagesPreferred?: number;
  notifications?: boolean;
}