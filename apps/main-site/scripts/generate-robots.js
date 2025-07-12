#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Generate robots.txt based on environment
const isProduction = process.env.NODE_ENV === "production";

const robotsContent = isProduction
	? `# Allow all crawlers
User-agent: *
Allow: /
Disallow: /api/
Disallow: /dev/

# Sitemap
Sitemap: https://braingame.dev/sitemap.xml
`
	: `# Disallow all crawlers in non-production
User-agent: *
Disallow: /
`;

// Write robots.txt to the out directory
const outDir = path.join(__dirname, "..", "out");
const robotsPath = path.join(outDir, "robots.txt");

// Ensure out directory exists
if (!fs.existsSync(outDir)) {
	fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(robotsPath, robotsContent);
console.log(`✅ Generated robots.txt for ${isProduction ? "production" : "development"}`);
