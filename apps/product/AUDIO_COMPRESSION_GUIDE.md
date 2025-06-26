# Audio Compression Instructions

The affirmations-with-music.mp3 file is 61MB, which is too large for mobile apps.

## Quick Compression (macOS/Linux)

1. Install ffmpeg:
   ```bash
   # macOS
   brew install ffmpeg
   
   # Ubuntu/Debian
   sudo apt install ffmpeg
   ```

2. Run compression:
   ```bash
   cd apps/product
   ./scripts/compress-audio.sh
   ```

## Manual Compression Commands

### Voice Profile (Recommended - ~6MB)
```bash
ffmpeg -i assets/audio/affirmations-with-music.mp3 \
  -b:a 32k -ar 22050 -ac 1 \
  assets/audio/affirmations-compressed.mp3
```

### Balanced Profile (~12MB)
```bash
ffmpeg -i assets/audio/affirmations-with-music.mp3 \
  -b:a 64k -ar 44100 -ac 1 \
  assets/audio/affirmations-compressed.mp3
```

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

```javascript
// Old (61MB)
const audio = require('./assets/audio/affirmations-with-music.mp3');

// New (6MB)
const audio = require('./assets/audio/affirmations-compressed.mp3');
```

## Expected Results

- Original: 61MB
- Compressed (voice): ~6MB (90% reduction)
- Compressed (balanced): ~12MB (80% reduction)
- Quality impact: Minimal for voice content
