# Lighthouse CI Performance Monitoring

## Overview

Lighthouse CI is integrated into our CI/CD pipeline to automatically monitor and enforce performance standards for our web applications. It runs on every pull request and provides feedback on Core Web Vitals and other performance metrics.

## What Gets Monitored

### Applications
- **Main Site** (Next.js marketing site)
  - Homepage (`/`)
  - Features page (`/features`)
  - Pricing page (`/pricing`)

### Metrics Tracked
- **Performance Score**: Overall performance rating (target: 80%+)
- **Accessibility Score**: Accessibility compliance (target: 90%+)
- **Best Practices Score**: Web best practices (target: 90%+)
- **SEO Score**: Search engine optimization (target: 90%+)

### Core Web Vitals
- **First Contentful Paint (FCP)**: < 2s
- **Speed Index**: < 4s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 5s
- **Total Blocking Time (TBT)**: < 500ms
- **Cumulative Layout Shift (CLS)**: < 0.1

## How It Works

1. **Build Phase**: The CI workflow builds all applications
2. **Server Start**: Next.js production server is started
3. **Lighthouse Runs**: Each URL is tested 3 times for consistency
4. **Assertions**: Results are checked against our thresholds
5. **Reporting**: Results are uploaded and linked in PR comments

## Configuration

### Lighthouse Configuration (`lighthouserc.js`)
```javascript
module.exports = {
  ci: {
    collect: {
      url: [/* URLs to test */],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        // Chrome settings for CI
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        // Performance thresholds
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

### GitHub Actions Integration
The Lighthouse CI job runs in `.github/workflows/ci.yml`:
- Depends on the build job completing successfully
- Downloads build artifacts
- Starts the Next.js server
- Runs Lighthouse tests
- Uploads results as artifacts

## Viewing Results

### In Pull Requests
- Lighthouse CI will comment on PRs with performance metrics
- Click the provided links to see detailed reports
- Compare scores against the base branch

### In GitHub Actions
- Check the "Lighthouse CI" job in the Actions tab
- Download the `lighthouse-results` artifact for detailed reports

## Handling Failures

### Performance Regressions
If Lighthouse CI fails due to performance regressions:

1. **Check the Report**: Review the detailed Lighthouse report
2. **Identify Issues**: Look for specific metrics that failed
3. **Common Fixes**:
   - Optimize images (use next/image, proper formats)
   - Reduce JavaScript bundle size
   - Implement code splitting
   - Add resource hints (preconnect, prefetch)
   - Optimize fonts loading

### Temporary Overrides
Currently, Lighthouse assertions are set to "warn" for most metrics (except accessibility) to allow gradual improvement. Failures won't block merges but will be flagged.

## Local Testing

To run Lighthouse locally before pushing:

```bash
# Install Lighthouse CLI
npm install -g @lhci/cli

# Build the main site
cd apps/main-site
pnpm build

# Start the server
pnpm start

# In another terminal, run Lighthouse
lhci autorun --config=../../lighthouserc.js
```

## Future Enhancements

1. **Add More Apps**: Monitor the docs site and other web apps
2. **Historical Tracking**: Set up Lighthouse CI server for trend analysis
3. **Budget Tracking**: Implement performance budgets
4. **Mobile Testing**: Add mobile viewport testing
5. **Production Monitoring**: Run after deployments to production

## Resources

- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse Performance Scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/)