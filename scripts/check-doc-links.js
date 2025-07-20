#!/usr/bin/env node

/**
 * Documentation Link Checker
 * 
 * This script scans all markdown files in the repository and checks for broken links.
 * It validates relative file paths and reports any broken references.
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

// Directories to skip
const IGNORE_DIRS = [
  'node_modules',
  '.git',
  'dist',
  'build',
  'out',
  '.next',
  '.turbo',
  'coverage',
  'playwright-report',
  'test-results'
];

/**
 * Recursively find all files matching a pattern
 * @param {string} dir - Directory to search
 * @param {string} pattern - File pattern to match
 * @param {Array} files - Accumulator for found files
 * @returns {Array} Array of file paths
 */
function findFiles(dir, pattern, files = []) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Skip ignored directories
        if (!IGNORE_DIRS.includes(entry.name)) {
          findFiles(fullPath, pattern, files);
        }
      } else if (entry.isFile() && entry.name.endsWith(pattern)) {
        files.push(fullPath);
      }
    }
  } catch (err) {
    // Ignore permission errors
  }
  
  return files;
}

/**
 * Extract markdown links from content
 * @param {string} content - File content
 * @returns {Array} Array of link objects with text and url
 */
function extractLinks(content) {
  const links = [];
  // Match [text](url) pattern
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  
  while ((match = linkRegex.exec(content)) !== null) {
    const url = match[2];
    // Only check relative file links, not URLs or anchors
    if (!url.startsWith('http') && !url.startsWith('#') && !url.startsWith('mailto:')) {
      links.push({
        text: match[1],
        url: url.split('#')[0], // Remove anchor part
        line: content.substring(0, match.index).split('\n').length
      });
    }
  }
  
  return links;
}

/**
 * Check if a file exists
 * @param {string} basePath - Base path of the markdown file
 * @param {string} linkPath - Relative path from the link
 * @returns {boolean} True if file exists
 */
function checkFileExists(basePath, linkPath) {
  const resolvedPath = path.resolve(path.dirname(basePath), linkPath);
  return fs.existsSync(resolvedPath);
}

/**
 * Main function to check all documentation links
 */
function checkDocumentationLinks() {
  console.log(`${colors.blue}🔍 Checking documentation links...${colors.reset}\n`);
  
  const rootDir = path.resolve(__dirname, '..');
  const markdownFiles = findFiles(rootDir, '.md');
  
  let totalLinks = 0;
  let brokenLinks = 0;
  const errors = [];
  
  markdownFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const links = extractLinks(content);
    
    links.forEach(link => {
      totalLinks++;
      if (!checkFileExists(file, link.url)) {
        brokenLinks++;
        const relativePath = path.relative(rootDir, file);
        errors.push({
          file: relativePath,
          line: link.line,
          text: link.text,
          url: link.url
        });
      }
    });
  });
  
  // Report results
  if (brokenLinks > 0) {
    console.log(`${colors.red}❌ Found ${brokenLinks} broken links:${colors.reset}\n`);
    
    // Group errors by file
    const errorsByFile = {};
    errors.forEach(error => {
      if (!errorsByFile[error.file]) {
        errorsByFile[error.file] = [];
      }
      errorsByFile[error.file].push(error);
    });
    
    // Display errors grouped by file
    Object.entries(errorsByFile).forEach(([file, fileErrors]) => {
      console.log(`${colors.yellow}${file}${colors.reset}`);
      fileErrors.forEach(error => {
        console.log(`  Line ${error.line}: [${error.text}] -> ${colors.red}${error.url}${colors.reset}`);
      });
      console.log('');
    });
    
    console.log(`${colors.red}Summary: ${brokenLinks} broken links out of ${totalLinks} total links${colors.reset}`);
    process.exit(1);
  } else {
    console.log(`${colors.green}✅ All ${totalLinks} documentation links are valid!${colors.reset}`);
    process.exit(0);
  }
}

// Handle command line arguments
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Documentation Link Checker

Usage: node scripts/check-doc-links.js [options]

Options:
  --help, -h     Show this help message
  --quiet, -q    Only show errors, not progress

This script scans all markdown files and checks for broken relative links.
It will exit with code 1 if any broken links are found.
`);
  process.exit(0);
}

// Run the checker
checkDocumentationLinks();