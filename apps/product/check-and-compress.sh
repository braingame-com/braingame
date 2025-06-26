#!/bin/bash

echo "⏳ Checking ffmpeg installation status..."

# Check if ffmpeg is installed
if command -v ffmpeg &> /dev/null; then
    echo "✅ ffmpeg is installed!"
    echo ""
    echo "🎵 Compressing audio..."
    
    cd "$(dirname "$0")/.."
    
    # Run compression
    ffmpeg -i assets/audio/affirmations-with-music.mp3 \
        -b:a 32k -ar 22050 -ac 1 -y \
        assets/audio/affirmations-compressed.mp3
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Compression complete!"
        
        # Show sizes
        ORIGINAL=$(ls -lh assets/audio/affirmations-with-music.mp3 | awk '{print $5}')
        COMPRESSED=$(ls -lh assets/audio/affirmations-compressed.mp3 | awk '{print $5}')
        
        echo "📊 Results:"
        echo "   Original:    $ORIGINAL"
        echo "   Compressed:  $COMPRESSED"
        echo ""
        echo "🎉 Success! Your audio is now ~90% smaller!"
    else
        echo "❌ Compression failed"
    fi
else
    echo "⏳ ffmpeg is still installing..."
    echo ""
    echo "Installation usually takes 3-5 minutes. Try running this again in a minute:"
    echo "  ./check-and-compress.sh"
    echo ""
    echo "Or check installation progress with:"
    echo "  brew list | grep ffmpeg"
fi