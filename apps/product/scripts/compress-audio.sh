#!/bin/bash
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
