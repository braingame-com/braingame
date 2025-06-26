# Documentation Site

Static documentation site hosted at docs.braingame.dev.

## Quick Start

```bash
cd apps/docs-site
npm install
npm run dev
```

Runs at http://localhost:3003

## Build & Deploy

```bash
# Build static files
npm run build

# Deploy to Firebase
npm run deploy
```

## Configuration

### Firebase Hosting

```json
{
  "hosting": {
    "public": "dist",
    "site": "braingame-docs"
  }
}
```

### Environment

```env
VITE_SITE_URL=https://docs.braingame.dev
```

## Structure

```
apps/docs-site/
├── src/
│   ├── pages/      Documentation pages
│   ├── components/ Shared components
│   └── styles/     Global styles
└── public/         Static assets
```

## Adding Documentation

1. Create markdown file in `src/pages/`
2. Add to navigation in `src/config/nav.ts`
3. Deploy changes

## Custom Domain

Domain configured in Firebase Console:
- docs.braingame.dev → braingame-docs.web.app