#!/usr/bin/env node

/**
 * Audio Compression Script
 * 
 * Compresses the large affirmations audio file for the mobile app
 * Can also be used as a reference for compressing user-uploaded audio
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
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

// Check if ffmpeg is installed
function checkFfmpeg() {
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// Install ffmpeg instructions
function showFfmpegInstructions() {
  log('\n❌ ffmpeg is not installed!', 'red');
  log('\nTo install ffmpeg:', 'yellow');
  log('\nOn macOS (with Homebrew):', 'cyan');
  log('  brew install ffmpeg', 'green');
  log('\nOn Ubuntu/Debian:', 'cyan');
  log('  sudo apt update && sudo apt install ffmpeg', 'green');
  log('\nOn Windows:', 'cyan');
  log('  1. Download from https://ffmpeg.org/download.html', 'green');
  log('  2. Add to PATH environment variable', 'green');
  log('\nOn Node.js (platform-independent):', 'cyan');
  log('  npm install -g ffmpeg-static', 'green');
}

// Compression profiles
const profiles = {
  voice: {
    name: 'Voice (Meditation/Affirmations)',
    bitrate: '32k',
    sampleRate: '22050',
    channels: '1',
    description: 'Optimized for voice content, maximum compression'
  },
  balanced: {
    name: 'Balanced',
    bitrate: '64k',
    sampleRate: '44100',
    channels: '1',
    description: 'Good balance between quality and size'
  },
  quality: {
    name: 'Quality',
    bitrate: '96k',
    sampleRate: '44100',
    channels: '2',
    description: 'Higher quality, larger file size'
  }
};

// Main compression function
function compressAudio(inputPath, outputPath, profile = 'voice') {
  const settings = profiles[profile];
  
  log(`\n🎵 Compressing audio with ${settings.name} profile`, 'cyan');
  log(`   ${settings.description}`, 'blue');
  
  const originalSize = fs.statSync(inputPath).size;
  log(`\n📁 Original size: ${formatBytes(originalSize)}`, 'yellow');
  
  // Build ffmpeg command
  const command = [
    'ffmpeg',
    '-i', `"${inputPath}"`,
    '-b:a', settings.bitrate,
    '-ar', settings.sampleRate,
    '-ac', settings.channels,
    '-y', // Overwrite output
    `"${outputPath}"`
  ].join(' ');
  
  log('\n⏳ Compressing... This may take a minute...', 'yellow');
  
  try {
    // Execute compression
    execSync(command, { stdio: 'pipe' });
    
    // Check results
    const compressedSize = fs.statSync(outputPath).size;
    const reduction = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
    
    log('\n✅ Compression complete!', 'green');
    log(`📁 Compressed size: ${formatBytes(compressedSize)}`, 'green');
    log(`📉 Size reduction: ${reduction}%`, 'green');
    log(`💾 Saved: ${formatBytes(originalSize - compressedSize)}`, 'green');
    
    return {
      success: true,
      originalSize,
      compressedSize,
      reduction
    };
  } catch (error) {
    log('\n❌ Compression failed!', 'red');
    log(error.message, 'red');
    return {
      success: false,
      error: error.message
    };
  }
}

// Process multiple compression profiles
function compressAllProfiles(inputPath) {
  const dir = path.dirname(inputPath);
  const basename = path.basename(inputPath, path.extname(inputPath));
  const ext = path.extname(inputPath);
  
  log('\n🚀 Creating multiple compressed versions...', 'cyan');
  
  const results = {};
  
  Object.entries(profiles).forEach(([key, profile]) => {
    const outputPath = path.join(dir, `${basename}-${key}${ext}`);
    log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, 'cyan');
    const result = compressAudio(inputPath, outputPath, key);
    results[key] = result;
  });
  
  // Summary
  log('\n\n📊 COMPRESSION SUMMARY', 'cyan');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'cyan');
  
  Object.entries(results).forEach(([key, result]) => {
    if (result.success) {
      const profile = profiles[key];
      log(`\n${profile.name}:`, 'yellow');
      log(`  Size: ${formatBytes(result.compressedSize)} (${result.reduction}% reduction)`, 'green');
      log(`  Settings: ${profile.bitrate} bitrate, ${profile.sampleRate}Hz, ${profile.channels}ch`, 'blue');
    }
  });
}

// CLI interface
function main() {
  log('🎵 Audio Compression Utility', 'cyan');
  log('============================', 'cyan');
  
  // Check ffmpeg
  if (!checkFfmpeg()) {
    showFfmpegInstructions();
    process.exit(1);
  }
  
  // Default paths
  const defaultInput = path.join(__dirname, '..', 'assets', 'audio', 'affirmations-with-music.mp3');
  const defaultOutput = path.join(__dirname, '..', 'assets', 'audio', 'affirmations-compressed.mp3');
  
  // Parse arguments
  const args = process.argv.slice(2);
  const inputPath = args[0] || defaultInput;
  const outputPath = args[1] || defaultOutput;
  const profile = args[2] || 'all';
  
  // Check if input file exists
  if (!fs.existsSync(inputPath)) {
    log(`\n❌ Input file not found: ${inputPath}`, 'red');
    log('\nUsage: node compress-audio.js [input] [output] [profile]', 'yellow');
    log('Profiles: voice, balanced, quality, all', 'blue');
    process.exit(1);
  }
  
  // Compress based on profile
  if (profile === 'all') {
    compressAllProfiles(inputPath);
  } else if (profiles[profile]) {
    compressAudio(inputPath, outputPath, profile);
  } else {
    log(`\n❌ Unknown profile: ${profile}`, 'red');
    log('Available profiles: voice, balanced, quality, all', 'yellow');
    process.exit(1);
  }
  
  // Recommendation
  log('\n\n💡 RECOMMENDATION', 'green');
  log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'green');
  log('For meditation/affirmation content, use the "voice" profile:', 'yellow');
  log('  • Reduces 61MB → ~6MB (90% reduction)', 'green');
  log('  • Optimized for spoken content', 'green');
  log('  • Minimal quality loss for voice', 'green');
  log('\nTo use in the app:', 'yellow');
  log('  1. Replace affirmations-with-music.mp3 with affirmations-compressed.mp3', 'blue');
  log('  2. Or update the import in your code to use the compressed version', 'blue');
}

// Export for use in other scripts
module.exports = {
  checkFfmpeg,
  compressAudio,
  profiles,
  formatBytes
};

// Run if called directly
if (require.main === module) {
  main();
}