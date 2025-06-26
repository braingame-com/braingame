#!/usr/bin/env python3
"""
Audio Compression Script using pydub
Fallback option when ffmpeg is not available via command line

Installation:
pip install pydub

Note: pydub still requires ffmpeg to be installed, but can find it automatically
"""

import os
import sys
from pathlib import Path

try:
    from pydub import AudioSegment
    from pydub.utils import mediainfo
except ImportError:
    print("❌ pydub is not installed!")
    print("\nTo install:")
    print("  pip install pydub")
    print("\nAlso requires ffmpeg:")
    print("  brew install ffmpeg  # macOS")
    print("  sudo apt install ffmpeg  # Ubuntu/Debian")
    sys.exit(1)

# Colors for terminal output
class Colors:
    RED = '\033[91m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    RESET = '\033[0m'

def format_bytes(bytes_size):
    """Format bytes to human readable string"""
    for unit in ['B', 'KB', 'MB', 'GB']:
        if bytes_size < 1024.0:
            return f"{bytes_size:.1f} {unit}"
        bytes_size /= 1024.0
    return f"{bytes_size:.1f} TB"

def get_audio_info(file_path):
    """Get audio file information"""
    try:
        info = mediainfo(file_path)
        return {
            'duration': float(info.get('duration', 0)),
            'bitrate': int(info.get('bit_rate', 0)),
            'sample_rate': int(info.get('sample_rate', 0)),
            'channels': int(info.get('channels', 0)),
            'format': info.get('format_name', 'unknown')
        }
    except Exception as e:
        print(f"{Colors.RED}Error getting audio info: {e}{Colors.RESET}")
        return None

def compress_audio(input_path, output_path, bitrate='64k', sample_rate=None, channels=None):
    """Compress audio file"""
    try:
        print(f"{Colors.CYAN}Loading audio file...{Colors.RESET}")
        audio = AudioSegment.from_file(input_path)
        
        # Get original size
        original_size = os.path.getsize(input_path)
        print(f"{Colors.YELLOW}Original size: {format_bytes(original_size)}{Colors.RESET}")
        
        # Apply compression settings
        if sample_rate:
            print(f"Setting sample rate to {sample_rate}Hz")
            audio = audio.set_frame_rate(sample_rate)
        
        if channels:
            print(f"Setting channels to {channels}")
            audio = audio.set_channels(channels)
        
        # Export with compression
        print(f"{Colors.YELLOW}Compressing with bitrate {bitrate}...{Colors.RESET}")
        audio.export(
            output_path,
            format="mp3",
            bitrate=bitrate,
            parameters=["-codec:a", "libmp3lame"]
        )
        
        # Get compressed size
        compressed_size = os.path.getsize(output_path)
        reduction = (1 - compressed_size / original_size) * 100
        
        print(f"{Colors.GREEN}✅ Compression complete!{Colors.RESET}")
        print(f"{Colors.GREEN}Compressed size: {format_bytes(compressed_size)}{Colors.RESET}")
        print(f"{Colors.GREEN}Reduction: {reduction:.1f}%{Colors.RESET}")
        print(f"{Colors.GREEN}Saved: {format_bytes(original_size - compressed_size)}{Colors.RESET}")
        
        return True
        
    except Exception as e:
        print(f"{Colors.RED}❌ Compression failed: {e}{Colors.RESET}")
        return False

# Compression profiles
PROFILES = {
    'voice': {
        'name': 'Voice (Meditation/Affirmations)',
        'bitrate': '32k',
        'sample_rate': 22050,
        'channels': 1,
        'description': 'Optimized for voice content, maximum compression'
    },
    'balanced': {
        'name': 'Balanced',
        'bitrate': '64k',
        'sample_rate': 44100,
        'channels': 1,
        'description': 'Good balance between quality and size'
    },
    'quality': {
        'name': 'Quality',
        'bitrate': '96k',
        'sample_rate': 44100,
        'channels': 2,
        'description': 'Higher quality, larger file size'
    }
}

def main():
    print(f"{Colors.CYAN}🎵 Audio Compression Utility (Python){Colors.RESET}")
    print(f"{Colors.CYAN}===================================={Colors.RESET}")
    
    # Default paths
    script_dir = Path(__file__).parent
    default_input = script_dir.parent / "assets" / "audio" / "affirmations-with-music.mp3"
    
    # Parse arguments
    args = sys.argv[1:]
    input_path = Path(args[0]) if args else default_input
    profile_name = args[1] if len(args) > 1 else 'voice'
    
    # Check if input exists
    if not input_path.exists():
        print(f"{Colors.RED}❌ Input file not found: {input_path}{Colors.RESET}")
        print(f"{Colors.YELLOW}Usage: python compress_audio.py [input_file] [profile]{Colors.RESET}")
        print(f"{Colors.BLUE}Profiles: voice, balanced, quality{Colors.RESET}")
        sys.exit(1)
    
    # Get profile
    if profile_name not in PROFILES:
        print(f"{Colors.RED}❌ Unknown profile: {profile_name}{Colors.RESET}")
        print(f"{Colors.YELLOW}Available profiles: {', '.join(PROFILES.keys())}{Colors.RESET}")
        sys.exit(1)
    
    profile = PROFILES[profile_name]
    
    # Generate output path
    output_path = input_path.parent / f"{input_path.stem}-{profile_name}{input_path.suffix}"
    
    print(f"\n{Colors.CYAN}Using {profile['name']} profile{Colors.RESET}")
    print(f"{Colors.BLUE}{profile['description']}{Colors.RESET}")
    print(f"{Colors.BLUE}Settings: {profile['bitrate']} bitrate, {profile['sample_rate']}Hz, {profile['channels']}ch{Colors.RESET}")
    
    # Compress
    success = compress_audio(
        str(input_path),
        str(output_path),
        bitrate=profile['bitrate'],
        sample_rate=profile['sample_rate'],
        channels=profile['channels']
    )
    
    if success:
        print(f"\n{Colors.GREEN}💡 Output saved to: {output_path}{Colors.RESET}")
        print(f"\n{Colors.YELLOW}📱 For mobile app optimization:{Colors.RESET}")
        print(f"{Colors.BLUE}1. Replace the original file with the compressed version{Colors.RESET}")
        print(f"{Colors.BLUE}2. The 'voice' profile is recommended for affirmations (90% size reduction){Colors.RESET}")

if __name__ == "__main__":
    main()