export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  featuredImage: string;
  categories: string[];
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}