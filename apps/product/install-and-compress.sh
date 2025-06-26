#!/bin/bash

# Install ffmpeg and compress audio script
echo "🎬 Installing ffmpeg and compressing audio..."
echo ""

# Check if ffmpeg is already installed
if command -v ffmpeg &> /dev/null; then
    echo "✅ ffmpeg is already installed!"
else
    echo "📦 Installing ffmpeg via Homebrew..."
    brew install ffmpeg
    echo "✅ ffmpeg installed successfully!"
fi

echo ""
echo "🎵 Compressing audio file..."

# Navigate to the correct directory
cd "$(dirname "$0")/.."

# Compress the audio file
ffmpeg -i assets/audio/affirmations-with-music.mp3 \
    -b:a 32k -ar 22050 -ac 1 -y \
    assets/audio/affirmations-compressed.mp3

# Check if compression was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Compression successful!"
    echo ""
    
    # Show file sizes
    ORIGINAL_SIZE=$(ls -lh assets/audio/affirmations-with-music.mp3 | awk '{print $5}')
    COMPRESSED_SIZE=$(ls -lh assets/audio/affirmations-compressed.mp3 | awk '{print $5}')
    
    echo "📊 Results:"
    echo "   Original:    $ORIGINAL_SIZE"
    echo "   Compressed:  $COMPRESSED_SIZE"
    echo ""
    echo "💡 Next step: Update your code to use 'affirmations-compressed.mp3'"
else
    echo "❌ Compression failed. Please check the error messages above."
fi