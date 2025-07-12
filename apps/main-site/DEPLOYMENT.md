# Main Site Deployment Guide

## Overview

The Brain Game main site is a Next.js application configured for static export and deployed to Firebase Hosting.

## Prerequisites

1. **Environment Variables**: Copy `.env.example` to `.env` and fill in all required values
2. **Firebase CLI**: Install with `npm install -g firebase-tools`
3. **Firebase Project**: Ensure you have access to the Firebase project

## Local Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production locally
pnpm build:production
```

## Build Process

### Standard Build
```bash
pnpm build
```

### Production Build
```bash
pnpm build:production
```

This command:
1. Sets NODE_ENV to production
2. Runs Next.js build with optimizations
3. Generates sitemap
4. Creates robots.txt
5. Validates output

### Analyze Bundle Size
```bash
pnpm build:analyze
```

Opens a visual representation of the bundle to identify optimization opportunities.

## Deployment

### Manual Deployment

1. **Build the site**:
   ```bash
   pnpm build:production
   ```

2. **Deploy to Firebase**:
   ```bash
   pnpm deploy
   ```

### Automated Deployment

Deployments happen automatically when:
- Code is merged to `main` branch
- Changes affect `apps/main-site/**`, `packages/bgui/**`, or `packages/utils/**`

### Preview Deployments

Create a preview channel:
```bash
pnpm preview
```

This creates a temporary URL for testing before production deployment.

## Environment Variables

### Required for Production

- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: Google Analytics ID
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: Firebase project ID
- `NEXT_PUBLIC_API_URL`: Backend API URL

### Optional

- `NEXT_PUBLIC_ENABLE_ANALYTICS`: Enable/disable analytics (default: true)
- `NEXT_PUBLIC_ENABLE_COOKIE_CONSENT`: Show cookie consent (default: true)
- `NEXT_PUBLIC_ENABLE_ERROR_TRACKING`: Enable error tracking (default: true)

## Production Checklist

Before deploying to production:

- [ ] Run `pnpm validate:env` to check environment variables
- [ ] Run `pnpm lint` and fix any issues
- [ ] Run `pnpm typecheck` and fix any type errors
- [ ] Test build locally with `pnpm build:production`
- [ ] Check bundle size with `pnpm build:analyze`
- [ ] Verify all URLs in sitemap
- [ ] Test on multiple devices/browsers
- [ ] Verify analytics is working
- [ ] Check error boundary behavior
- [ ] Test offline functionality

## Monitoring

### Health Check
- Available at: `https://braingame.dev/health.json`
- Returns: `{"status": "healthy", "service": "braingame-main-site"}`

### Analytics
- View in Google Analytics dashboard
- Key metrics: Page views, bounce rate, conversion rate

### Error Tracking
- Errors are logged to Google Analytics events
- In production, consider adding Sentry for detailed error tracking

## Rollback

If issues occur after deployment:

1. **Quick rollback in Firebase Console**:
   - Go to Firebase Hosting
   - Click "View all releases"
   - Find previous release
   - Click "Rollback"

2. **Via CLI**:
   ```bash
   firebase hosting:rollback
   ```

## Performance Optimization

1. **Bundle Size**: Keep main bundle under 200KB
2. **Lazy Loading**: Components are code-split automatically
3. **Caching**: Static assets cached for 1 year
4. **CDN**: Firebase Hosting provides global CDN

## Security

- CSP headers configured in `firebase.json`
- Environment variables validated before build
- No sensitive data in client-side code
- HTTPS enforced by Firebase Hosting

## Troubleshooting

### Build Failures

1. Check environment variables: `pnpm validate:env`
2. Clear cache: `pnpm clean`
3. Check Node version: Should be 20+
4. Verify dependencies: `pnpm install --frozen-lockfile`

### Deployment Failures

1. Check Firebase authentication: `firebase login`
2. Verify project: `firebase use <project-id>`
3. Check GitHub Actions logs for automated deployments
4. Ensure Firebase quota not exceeded

### Performance Issues

1. Run bundle analyzer: `pnpm build:analyze`
2. Check for large dependencies
3. Verify image optimization
4. Review React DevTools Profiler