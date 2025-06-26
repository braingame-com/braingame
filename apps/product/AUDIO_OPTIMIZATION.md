# Audio Optimization Required

The affirmations-with-music.mp3 file is 61MB, which is too large for mobile app bundles.

## Recommended Solutions:

1. **Compress the audio:**
   ```bash
   # Reduce bitrate to 64kbps (from current ~320kbps)
   ffmpeg -i affirmations-with-music.mp3 -b:a 64k affirmations-with-music-compressed.mp3
   
   # Alternative: Use AAC compression
   ffmpeg -i affirmations-with-music.mp3 -c:a aac -b:a 64k affirmations-with-music.aac
   ```

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
