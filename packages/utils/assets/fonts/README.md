# Font Assets

This directory contains the font files used throughout the Brain Game applications.

## Current Fonts

1. **Lexend-VariableFont_wght.ttf** - Primary font family (variable font supporting weights 100-900)
2. **RobotoMono-VariableFont_wght.ttf** - Monospace font (variable font supporting weights 100-900)

## Font Implementation Status

✅ **Lexend** - Fully integrated across all platforms
✅ **Roboto Mono** - Fully integrated across all platforms

### Platform-specific implementations:

**Web (Next.js apps)**
- Fonts loaded via `next/font/google` at build time
- No manual font files needed

**React Native**
- Fonts bundled locally for offline support
- Loaded via `expo-font` in App.tsx
- Total font bundle size: ~270KB

## Font Usage Guidelines

### Lexend (Primary Font)
- UI text, headings, body content
- Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- Usage: `fontFamily: "Lexend", fontWeight: "400"`

### Roboto Mono (Monospace)
- Code snippets, technical content, fixed-width requirements
- Weights: 400 (Regular), 500 (Medium), 700 (Bold)
- Usage: `fontFamily: "Roboto Mono", fontWeight: "400"`

## Variable Font Benefits
Both fonts use variable font technology, which means:
- Single file contains all weights
- Smaller bundle size vs multiple font files
- Smooth weight transitions for animations
- Better performance

## Future Considerations
- **Noto Sans**: May be added later for international character support
- Currently, system fonts handle i18n fallback adequately