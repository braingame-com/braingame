# Marketing Site

Enterprise-grade marketing website for Brain Game.

## Features

- **Performance**: 100/100 Lighthouse score
- **Email Collection**: Firebase Firestore integration  
- **Analytics**: Plausible privacy-first tracking
- **A/B Testing**: Variant testing framework
- **i18n**: Multi-language support

## Quick Start

```bash
cd apps/main-site
npm install
npm run dev
```

Runs at http://localhost:3002

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Firebase

## Project Structure

```
apps/main-site/
├── app/                  Next.js app directory
│   ├── [locale]/        Localized routes
│   ├── api/             API routes
│   └── layout.tsx       Root layout
├── components/          React components
├── lib/                 Utilities
├── messages/            i18n translations
└── public/              Static assets
```

## Environment Variables

```env
# Firebase
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=

# Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=braingame.app

# Testing
ENABLE_AB_TESTING=true
```

## Email Collection

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for configuration.

## Internationalization

Add translations in `messages/{locale}.json`:

```json
{
  "hero": {
    "title": "Welcome to Brain Game",
    "cta": "Get Started"
  }
}
```

## A/B Testing

Define variants:

```typescript
const heroVariants = {
  control: { headline: "Original" },
  variant: { headline: "New Copy" }
};
```

Track conversions:

```typescript
trackConversion('hero_cta_click', variantId);
```

## Performance Optimization

- Image optimization with next/image
- Font subsetting and preloading
- Critical CSS extraction
- Component lazy loading
- Static page generation

## Deployment

### Production Build

```bash
npm run build
npm start
```

### Vercel Deployment

```bash
vercel --prod
```

### Firebase Hosting

```bash
npm run build
firebase deploy --only hosting:main-site
```

## Monitoring

- **Performance**: Web Vitals tracking
- **Errors**: Sentry integration
- **Analytics**: Plausible dashboard
- **Uptime**: Better Uptime monitoring

## SEO

- Structured data (JSON-LD)
- Dynamic meta tags
- XML sitemap generation
- Robots.txt configuration
- Open Graph optimization

## Testing

```bash
npm test              # Unit tests
npm run test:e2e      # Playwright tests
npm run lighthouse    # Performance audit
```