# Assets Guide

Asset management for the Brain Game monorepo.

## Asset Locations

```
braingame/
├── packages/bgui/assets/     Shared UI assets
├── apps/product/assets/      Mobile app assets
├── apps/main-site/public/    Marketing assets
└── docs/assets/              Documentation assets
```

## File Formats

| Type | Format | Usage | Max Size |
|------|--------|-------|----------|
| Photos | WebP | Web images | 200KB |
| Icons | SVG | Scalable graphics | 10KB |
| App Icons | PNG | Mobile app icons | 1MB |
| Audio | MP3 | Sound effects | 500KB |

## Naming Conventions

```
icon-arrow-left.svg       ✓ Correct
IconArrowLeft.svg         ✗ Wrong
arrow_left_icon.svg       ✗ Wrong
```

Rules:
- Lowercase only
- Hyphen-separated
- Descriptive names
- Include dimensions for raster images

## Size Guidelines

### Mobile Assets
- App Icon: 1024×1024 (iOS source)
- Splash Screen: 2732×2732 (centered)
- In-app images: max 2x resolution

### Web Assets
- Hero images: 1920×1080 max
- Thumbnails: 400×300
- Icons: 24×24, 48×48

## Optimization

### Before Adding Assets
1. Export at correct size
2. Optimize with tools
3. Test on devices
4. Check file size

### Tools
```bash
# WebP conversion
cwebp input.png -o output.webp -q 80

# SVG optimization
svgo input.svg -o output.svg

# PNG optimization
pngquant input.png -o output.png
```

### Scripts
```bash
# Find large assets
find . -name "*.png" -size +500k

# Convert images to WebP
for f in *.png; do cwebp "$f" -o "${f%.png}.webp"; done
```

## Accessibility

All images must have:
- Alt text for content images
- Empty alt="" for decorative images
- Proper contrast ratios
- Focus indicators for interactive elements

## Workflow

1. **Design** - Create in Figma/Sketch
2. **Export** - Use proper format/size
3. **Optimize** - Compress and validate
4. **Integrate** - Add to correct location
5. **Document** - Update asset inventory

## Checklist

- [ ] Correct format for use case
- [ ] Optimized file size
- [ ] Proper naming convention
- [ ] Accessibility attributes
- [ ] License documented
- [ ] Added to inventory

## Licensing

Track licenses in `assets-license.json`:
```json
{
  "hero-image.webp": {
    "source": "Unsplash",
    "license": "Unsplash License",
    "author": "John Doe",
    "url": "https://unsplash.com/photos/xxx"
  }
}
```