const fs = require('fs');
const path = require('path');

// Import your blog posts data
// Note: We need to adjust this since we're in CommonJS not ESM
const blogPostsData = require('../src/data/blog-posts');
const blogPosts = blogPostsData.blogPosts;

// Base URL
const baseUrl = 'https://homedesignfinder.com';

// Current date in YYYY-MM-DD format for lastmod
const today = new Date().toISOString().split('T')[0];

// Create the sitemap XML
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/#/house-plans</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/#/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;

// Add this entry in your sitemap generation
sitemap += `  <url>
    <loc>${baseUrl}/#/styles</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;

// Add entries for each blog post
blogPosts.forEach(post => {
  sitemap += `  <url>
    <loc>${baseUrl}/#/blog/${post.slug}</loc>
    <lastmod>${post.date || today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
});

// Close the sitemap
sitemap += `</urlset>`;

// Write the sitemap file
fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
console.log('Sitemap generated!');