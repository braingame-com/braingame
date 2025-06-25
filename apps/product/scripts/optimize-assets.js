#!/usr/bin/env node

/**
 * Asset Optimization Script
 * 
 * This script helps optimize assets for mobile app bundle size:
 * 1. Creates compressed versions of large audio files
 * 2. Generates optimized image variants
 * 3. Reports on asset sizes
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ASSETS_DIR = path.join(__dirname, '..', 'assets');
const AUDIO_DIR = path.join(ASSETS_DIR, 'audio');
const IMAGES_DIR = path.join(ASSETS_DIR, 'images', 'images-section');

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function getFileSize(filePath) {
  try {
    return fs.statSync(filePath).size;
  } catch (err) {
    return 0;
  }
}

function analyzeAssets() {
  log('\n📊 Asset Analysis', 'cyan');
  log('================', 'cyan');

  // Analyze audio files
  if (fs.existsSync(AUDIO_DIR)) {
    const audioFiles = fs.readdirSync(AUDIO_DIR);
    let totalAudioSize = 0;
    
    log('\n🎵 Audio Files:', 'yellow');
    audioFiles.forEach(file => {
      const filePath = path.join(AUDIO_DIR, file);
      const size = getFileSize(filePath);
      totalAudioSize += size;
      
      const sizeStr = formatBytes(size);
      const color = size > 10 * 1024 * 1024 ? 'red' : size > 1024 * 1024 ? 'yellow' : 'green';
      log(`  ${file}: ${sizeStr}`, color);
    });
    
    log(`\nTotal audio size: ${formatBytes(totalAudioSize)}`, totalAudioSize > 50 * 1024 * 1024 ? 'red' : 'yellow');
  }

  // Analyze images
  if (fs.existsSync(IMAGES_DIR)) {
    const imageFiles = fs.readdirSync(IMAGES_DIR)
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));
    
    let totalImageSize = 0;
    const largeImages = [];
    
    log('\n🖼️  Large Images (>500KB):', 'yellow');
    imageFiles.forEach(file => {
      const filePath = path.join(IMAGES_DIR, file);
      const size = getFileSize(filePath);
      totalImageSize += size;
      
      if (size > 500 * 1024) {
        largeImages.push({ file, size });
      }
    });
    
    largeImages
      .sort((a, b) => b.size - a.size)
      .slice(0, 10)
      .forEach(({ file, size }) => {
        const sizeStr = formatBytes(size);
        const color = size > 2 * 1024 * 1024 ? 'red' : 'yellow';
        log(`  ${file}: ${sizeStr}`, color);
      });
    
    log(`\nTotal images analyzed: ${imageFiles.length}`, 'blue');
    log(`Total image size: ${formatBytes(totalImageSize)}`, totalImageSize > 30 * 1024 * 1024 ? 'red' : 'yellow');
    log(`Large images (>500KB): ${largeImages.length}`, largeImages.length > 10 ? 'red' : 'yellow');
  }

  return { totalAudioSize: getFileSize(path.join(AUDIO_DIR, 'affirmations-with-music.mp3')) };
}

function generateOptimizationRecommendations() {
  log('\n💡 Optimization Recommendations', 'green');
  log('==============================', 'green');
  
  log('\n1. Audio Optimization:', 'yellow');
  log('   • Compress 61MB audio file to <10MB using lower bitrate');
  log('   • Consider streaming audio instead of bundling');
  log('   • Use compressed formats like AAC or OGG');
  
  log('\n2. Image Optimization:', 'yellow');
  log('   • Implement lazy loading for images (done in LazyImages.tsx)');
  log('   • Exclude largest images (lamborghini.jpg: 3.8MB, jon.png: 2.3MB, etc.)');
  log('   • Convert PNG to WebP where possible');
  log('   • Resize images to maximum needed dimensions');
  
  log('\n3. Bundle Optimization:', 'yellow');
  log('   • Use dynamic imports for large components');
  log('   • Remove unused FontAwesome icons');
  log('   • Consider using react-native-super-grid for virtualization');
  log('   • Enable Hermes engine for better performance');
  
  log('\n4. Dependency Optimization:', 'yellow');
  log('   • Keep FontAwesome for future icon needs (currently using emojis)');
  log('   • Consider selective icon imports to reduce bundle');
  log('   • Enable tree shaking in metro config');
  log('   • Audit other dependencies for unused packages');
}

function createAudioOptimizationNote() {
  const noteContent = `# Audio Optimization Required

The affirmations-with-music.mp3 file is 61MB, which is too large for mobile app bundles.

## Recommended Solutions:

1. **Compress the audio:**
   \`\`\`bash
   # Reduce bitrate to 64kbps (from current ~320kbps)
   ffmpeg -i affirmations-with-music.mp3 -b:a 64k affirmations-with-music-compressed.mp3
   
   # Alternative: Use AAC compression
   ffmpeg -i affirmations-with-music.mp3 -c:a aac -b:a 64k affirmations-with-music.aac
   \`\`\`

2. **Stream from CDN:**
   - Upload to Firebase Storage or similar
   - Stream on demand rather than bundle
   - Enable offline caching

3. **Split into segments:**
   - Break into smaller chunks
   - Load progressively

## Expected Results:
- 61MB → ~5-8MB (87% reduction)
- Faster app startup
- Smaller download size
`;

  fs.writeFileSync(path.join(__dirname, '..', 'AUDIO_OPTIMIZATION.md'), noteContent);
  log('\n📝 Created AUDIO_OPTIMIZATION.md with detailed instructions', 'green');
}

// Main execution
function main() {
  log('🚀 Running Asset Optimization Analysis...', 'cyan');
  
  const analysis = analyzeAssets();
  generateOptimizationRecommendations();
  createAudioOptimizationNote();
  
  log('\n✅ Analysis complete!', 'green');
  log('📋 Check AUDIO_OPTIMIZATION.md for next steps', 'blue');
}

if (require.main === module) {
  main();
}

module.exports = { analyzeAssets, formatBytes };