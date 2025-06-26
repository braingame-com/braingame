# Assets Directory

This directory contains shared brand assets and resources used across the Brain Game monorepo.

## 📁 Asset Locations

Brain Game uses a distributed asset structure organized by purpose:

### 1. Shared Assets (`/assets/`)
- **Purpose**: Brand assets used across all applications
- **Contents**: 
  - `logo.png` - Main Brain Game logo

### 2. Application-Specific Assets

#### Product App (`/apps/product/assets/`)
- **App Icons**: `icon.png`, `adaptive-icon.png`, `splash-icon.png`, `favicon.png`
- **Audio Content**: Affirmations and motivational audio in `/audio/`
- **Visual Content**: Motivational images in `/images-section/`
- **Development Assets**: `/apps/product/src/assets/` for placeholders

#### Main Site (`/apps/main-site/public/`)
- **Web Icons**: SVG icons for UI components
- **Format**: Optimized SVG for web performance

#### Documentation (`/docs/assets/`)
- **Purpose**: Diagrams, screenshots, and visual aids for documentation
- **Note**: Create subdirectories as needed (e.g., `/docs/assets/diagrams/`)

## 🎨 Asset Guidelines

### File Formats

| Asset Type | Preferred Format | Alternative | Notes |
|------------|-----------------|-------------|--------|
| Photos | `.webp` | `.jpg`, `.jpeg` | Use WebP for better compression |
| Icons | `.svg` | `.png` | SVG for scalability |
| App Icons | `.png` | - | Required for mobile apps |
| Audio | `.mp3` | `.m4a` | Compress for mobile |
| Diagrams | `.svg` | `.png` | Editable formats preferred |

### Naming Conventions

```
✅ Good Examples:
- user-avatar-placeholder.png
- success-audio-track.mp3
- app-icon-1024x1024.png
- dashboard-screenshot.webp

❌ Avoid:
- IMG_12345.jpg
- untitled-1.png
- NewImage.PNG
- my image.jpg (spaces)
```

### Size Guidelines

#### Mobile App Assets
- **App Icon**: 1024×1024px (iOS), 512×512px (Android)
- **Splash Screen**: 1242×2436px (iOS), 1920×1080px (Android)
- **In-app Images**: Max 2048px on longest side
- **Thumbnails**: 200×200px to 400×400px

#### Web Assets
- **Hero Images**: 1920×1080px max
- **Content Images**: 800×600px standard
- **Icons**: 24×24px, 32×32px, 48×48px
- **Logos**: Provide multiple sizes

### Optimization Requirements

1. **Compression**: 
   - Images: Use tools like `imageoptim` or `squoosh`
   - Target: < 100KB for web images, < 500KB for hero images

2. **Performance**:
   - Lazy load non-critical images
   - Use responsive images with srcset
   - Provide 2x versions for retina displays

3. **Accessibility**:
   - Include alt text for all images
   - Ensure sufficient color contrast
   - Avoid text in images when possible

## 📂 Directory Structure

```
/assets/                     # Shared brand assets
├── logo.png                # Main logo
└── README.md              # This file

/apps/product/assets/       # Product app assets
├── audio/                  # Audio content
├── images/                 # App icons
└── images-section/         # Content images

/apps/main-site/public/     # Website assets
└── *.svg                   # UI icons

/docs/assets/              # Documentation assets
├── diagrams/              # Architecture diagrams
├── screenshots/           # UI screenshots
└── videos/                # Demo videos
```

## 🔧 Asset Management

### Adding New Assets

1. **Determine Location**: 
   - Shared across apps? → `/assets/`
   - App-specific? → `/apps/[app-name]/assets/`
   - Documentation? → `/docs/assets/`

2. **Optimize Before Adding**:
   ```bash
   # Images
   npx squoosh-cli --webp auto image.jpg
   
   # SVGs
   npx svgo input.svg -o output.svg
   ```

3. **Follow Naming Convention**:
   - Use lowercase
   - Separate words with hyphens
   - Include dimensions for sized assets
   - Be descriptive but concise

### Asset Workflow

1. **Design Phase**: Create assets in highest quality
2. **Export Phase**: Export in required formats and sizes
3. **Optimization Phase**: Compress and optimize
4. **Integration Phase**: Add to appropriate directory
5. **Documentation Phase**: Update relevant READMEs

## 🛠️ Tools & Resources

### Recommended Tools

- **Image Optimization**: 
  - [Squoosh](https://squoosh.app/) - Web-based optimizer
  - [ImageOptim](https://imageoptim.com/) - Mac app
  - [TinyPNG](https://tinypng.com/) - Online compression

- **SVG Optimization**:
  - [SVGO](https://github.com/svg/svgo) - Command line tool
  - [SVGOMG](https://jakearchibald.github.io/svgomg/) - Web interface

- **Icon Generation**:
  - [App Icon Generator](https://appicon.co/) - Mobile app icons
  - [RealFaviconGenerator](https://realfavicongenerator.net/) - Favicon sets

### Scripts

```bash
# Find large assets
find . -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" | xargs ls -lh | awk '$5 ~ /M/ {print $5, $9}'

# Convert images to WebP
for img in *.{jpg,jpeg,png}; do
  npx squoosh-cli --webp auto "$img"
done
```

## 📋 Checklist for New Assets

- [ ] Asset is in the correct directory
- [ ] File is properly named (lowercase, hyphens)
- [ ] Image is optimized (< 100KB for web)
- [ ] Multiple sizes provided if needed
- [ ] Alt text documented
- [ ] License/attribution noted if required
- [ ] Added to .gitignore if generated

## 📄 Licensing

Ensure all assets are either:
1. Created in-house
2. Properly licensed for commercial use
3. Attributed according to license requirements

Document any third-party assets in `ATTRIBUTIONS.md`.