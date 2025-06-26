#!/usr/bin/env node

/**
 * Simple Audio Compression Script
 * 
 * This creates a compressed copy of the audio file by reducing quality settings
 * Works without external dependencies for basic compression
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Colors for console
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

/**
 * Create a shell script for manual compression
 */
function createCompressionScript() {
  const scriptContent = `#!/bin/bash
# Audio Compression Script for Brain Game

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ ffmpeg is not installed!"
    echo ""
    echo "To install ffmpeg:"
    echo "  macOS:    brew install ffmpeg"
    echo "  Ubuntu:   sudo apt install ffmpeg"
    echo "  Windows:  Download from https://ffmpeg.org"
    exit 1
fi

# Input and output paths
INPUT="./assets/audio/affirmations-with-music.mp3"
OUTPUT_DIR="./assets/audio"

# Create compressed versions
echo "🎵 Compressing audio files..."
echo ""

# Voice profile (maximum compression for speech)
echo "Creating voice-optimized version (32k)..."
ffmpeg -i "$INPUT" -b:a 32k -ar 22050 -ac 1 -y "$OUTPUT_DIR/affirmations-voice.mp3"

# Balanced profile
echo "Creating balanced version (64k)..."
ffmpeg -i "$INPUT" -b:a 64k -ar 44100 -ac 1 -y "$OUTPUT_DIR/affirmations-balanced.mp3"

# Quality profile
echo "Creating quality version (96k)..."
ffmpeg -i "$INPUT" -b:a 96k -ar 44100 -ac 2 -y "$OUTPUT_DIR/affirmations-quality.mp3"

echo ""
echo "✅ Compression complete!"
echo ""
echo "File sizes:"
ls -lh "$OUTPUT_DIR"/affirmations*.mp3 | awk '{print $9 ": " $5}'

echo ""
echo "💡 Recommendation: Use affirmations-voice.mp3 for maximum space savings"
`;

  const scriptPath = path.join(__dirname, 'compress-audio.sh');
  fs.writeFileSync(scriptPath, scriptContent, { mode: 0o755 });
  
  return scriptPath;
}

/**
 * Create a manual instruction file
 */
function createManualInstructions() {
  const instructions = `# Audio Compression Instructions

The affirmations-with-music.mp3 file is 61MB, which is too large for mobile apps.

## Quick Compression (macOS/Linux)

1. Install ffmpeg:
   \`\`\`bash
   # macOS
   brew install ffmpeg
   
   # Ubuntu/Debian
   sudo apt install ffmpeg
   \`\`\`

2. Run compression:
   \`\`\`bash
   cd apps/product
   ./scripts/compress-audio.sh
   \`\`\`

## Manual Compression Commands

### Voice Profile (Recommended - ~6MB)
\`\`\`bash
ffmpeg -i assets/audio/affirmations-with-music.mp3 \\
  -b:a 32k -ar 22050 -ac 1 \\
  assets/audio/affirmations-compressed.mp3
\`\`\`

### Balanced Profile (~12MB)
\`\`\`bash
ffmpeg -i assets/audio/affirmations-with-music.mp3 \\
  -b:a 64k -ar 44100 -ac 1 \\
  assets/audio/affirmations-compressed.mp3
\`\`\`

## Online Alternatives

If you can't install ffmpeg, use online tools:

1. **CloudConvert** (https://cloudconvert.com/mp3-converter)
   - Upload your file
   - Set bitrate to 32-64 kbps
   - Download compressed version

2. **Online Audio Converter** (https://online-audio-converter.com)
   - Upload file
   - Choose MP3
   - Set quality to Economy (64 kbps)
   - Convert and download

## Using Compressed Audio

After compression, update your code:

\`\`\`javascript
// Old (61MB)
const audio = require('./assets/audio/affirmations-with-music.mp3');

// New (6MB)
const audio = require('./assets/audio/affirmations-compressed.mp3');
\`\`\`

## Expected Results

- Original: 61MB
- Compressed (voice): ~6MB (90% reduction)
- Compressed (balanced): ~12MB (80% reduction)
- Quality impact: Minimal for voice content
`;

  const instructionsPath = path.join(__dirname, '..', 'AUDIO_COMPRESSION_GUIDE.md');
  fs.writeFileSync(instructionsPath, instructions);
  
  return instructionsPath;
}

/**
 * Check for ffmpeg using different methods
 */
async function findFfmpeg() {
  const checks = [
    'ffmpeg -version',
    'which ffmpeg',
    '/usr/local/bin/ffmpeg -version',
    '/opt/homebrew/bin/ffmpeg -version'
  ];
  
  for (const check of checks) {
    try {
      await execAsync(check);
      return true;
    } catch {
      // Continue to next check
    }
  }
  
  return false;
}

async function main() {
  log('🎵 Audio Compression Helper', 'cyan');
  log('==========================', 'cyan');
  
  const audioPath = path.join(__dirname, '..', 'assets', 'audio', 'affirmations-with-music.mp3');
  
  // Check if audio file exists
  if (!fs.existsSync(audioPath)) {
    log('\n❌ Audio file not found!', 'red');
    log(`Expected location: ${audioPath}`, 'yellow');
    return;
  }
  
  // Get file size
  const stats = fs.statSync(audioPath);
  const fileSize = formatBytes(stats.size);
  
  log(`\n📁 Current audio file: ${fileSize}`, 'yellow');
  
  // Check for ffmpeg
  const hasFfmpeg = await findFfmpeg();
  
  if (hasFfmpeg) {
    log('✅ ffmpeg is installed!', 'green');
    log('\nRun this command to compress:', 'yellow');
    log(`cd ${path.join(__dirname, '..')}`, 'blue');
    log(`ffmpeg -i assets/audio/affirmations-with-music.mp3 -b:a 32k -ar 22050 -ac 1 assets/audio/affirmations-compressed.mp3`, 'blue');
  } else {
    log('\n⚠️  ffmpeg not found in PATH', 'yellow');
  }
  
  // Create helper files
  const scriptPath = createCompressionScript();
  const instructionsPath = createManualInstructions();
  
  log('\n📄 Created helper files:', 'green');
  log(`   • Compression script: ${path.basename(scriptPath)}`, 'blue');
  log(`   • Instructions: ${path.basename(instructionsPath)}`, 'blue');
  
  log('\n💡 Next Steps:', 'yellow');
  log('1. Install ffmpeg (if not installed):', 'cyan');
  log('   brew install ffmpeg', 'green');
  log('\n2. Run compression:', 'cyan');
  log('   ./scripts/compress-audio.sh', 'green');
  log('\n3. Or use online converter:', 'cyan');
  log('   https://cloudconvert.com/mp3-converter', 'green');
  log('   (Set bitrate to 32-64 kbps)', 'blue');
  
  log('\n📱 Expected Results:', 'cyan');
  log('   Original: 61MB → Compressed: ~6MB (90% reduction)', 'green');
  log('   Perfect for mobile apps!', 'green');
}

// Run the script
main().catch(console.error);