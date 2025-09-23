# Asset Guide

Use this guide whenever you add or update brand assets in the Brain Game workspace.

## Shared vs App-Specific Assets
- `assets/branding/` holds brand-wide primitives such as the canonical logos, favicons, and platform icons.
- `apps/product/assets/` stores Expo app icons, splash screens, audio, and motivational imagery.
- `apps/main-site/public/` contains marketing-specific SVGs and web-only imagery.
- `docs/assets/` is reserved for diagrams, screenshots, and supporting visuals in documentation.

## Formats & Naming
| Asset | Preferred Format | Notes |
| --- | --- | --- |
| Icons & logos | `.svg` (web), `.png` (native/app stores) | Provide @2x variants when rasterized |
| Photos & hero art | `.webp` | Keep under 500 KB; include alt text |
| Audio | `.mp3` | Normalize loudness before export |
| Diagrams | `.svg` | Ensure text is editable |

Name files in lowercase kebab-case (e.g., `dashboard-hero.webp`, `app-icon-1024.png`). Include dimensions when helpful.

## Size Targets
- Mobile icons: 1024×1024px (iOS), 512×512px (Android)
- Splash screens: 2436×1125px (portrait), 1920×1080px (landscape)
- Web hero imagery: ≤1920×1080px, <500 KB after compression
- Thumbnails & UI icons: 24–48px square

## Workflow Checklist
1. Decide if the asset is global or app-specific and place it accordingly.
2. Optimize before committing (`npx squoosh-cli`, `npx svgo`, or ImageOptim).
3. Validate accessibility (alt text, sufficient contrast, no text baked into images when avoidable).
4. Commit supporting documentation updates if usage changes.

## Useful Commands
```bash
# Find large raster assets (>1 MB)
find . -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" | xargs ls -lh | awk '$5 ~ /M/ {print $5, $9}'

# Convert all PNG/JPEG files in current folder to WebP
for img in *.{png,jpg,jpeg}; do npx squoosh-cli --webp auto "$img"; done
```

Keep `assets/` lean: archive unused imagery under `docs/assets/archive/` instead of deleting until design approves.
