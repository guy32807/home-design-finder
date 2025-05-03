const fs = require('fs');
const path = require('path');

// Configuration
const outputPath = "./public";

// Create basic SVG for favicon
const createFaviconFiles = () => {
  // Create simple SVG favicon
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
    <rect width="64" height="64" fill="#3a5a40"/>
    <polygon points="32,8 8,30 12,30 12,52 52,52 52,30 56,30" fill="none" stroke="white" stroke-width="3"/>
    <text x="32" y="38" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">HD</text>
  </svg>`;

  // Ensure output directory exists
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  // Write SVG file
  const svgPath = path.join(outputPath, 'favicon.svg');
  fs.writeFileSync(svgPath, svgContent);
  console.log('Created favicon.svg');

  // Create manifest.json
  const manifest = {
    "short_name": "Home Design",
    "name": "Home Design Finder",
    "icons": [
      {
        "src": "favicon.ico",
        "sizes": "64x64 32x32 24x24 16x16",
        "type": "image/x-icon"
      },
      {
        "src": "favicon.svg",
        "sizes": "any",
        "type": "image/svg+xml"
      }
    ],
    "start_url": ".",
    "display": "standalone",
    "theme_color": "#3a5a40",
    "background_color": "#ffffff"
  };

  fs.writeFileSync(
    path.join(outputPath, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  console.log('Created manifest.json');

  console.log('All favicon files created successfully!');
}

createFaviconFiles();