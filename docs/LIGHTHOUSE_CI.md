# Lighthouse CI Performance Monitoring

## Overview

Lighthouse CI is integrated into our CI/CD pipeline to automatically monitor and enforce performance standards for all our web applications. It runs on every pull request and provides feedback on Core Web Vitals and other performance metrics.

## What Gets Monitored

### Applications

#### 1. Main Site (Next.js marketing site)
- Homepage (`/`)
- Features page (`/features`)
- Pricing page (`/pricing`)
- **Port**: 3000
- **Config**: `lighthouse/main-site.config.js`

#### 2. Docs Site (Next.js documentation)
- Homepage (`/`)
- Docs page (`/docs`)
- API page (`/api`)
- **Port**: 3001
- **Config**: `lighthouse/docs-site.config.js`

#### 3. Product Web (Expo web version)
- Homepage (`/`)
- Home page (`/home`)
- Settings page (`/settings`)
- **Port**: 8081
- **Config**: `lighthouse/product-web.config.js`
- **Note**: More lenient thresholds due to Expo web limitations

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

### Site-Specific Configurations
Each site has its own configuration file in the `lighthouse/` directory:
- `lighthouse/main-site.config.js` - Main marketing site
- `lighthouse/docs-site.config.js` - Documentation site  
- `lighthouse/product-web.config.js` - Expo web app

### Configuration Structure
```javascript
module.exports = {
  ci: {
    collect: {
      url: [/* URLs to test */],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        chromeFlags: '--headless',
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        // Performance thresholds per site
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
- Starts all three servers on different ports
- Runs Lighthouse tests for each site
- Aggregates results and posts PR comment
- Uploads results as artifacts

## Viewing Results

### In Pull Requests
- Lighthouse CI will comment on PRs with performance metrics for all three sites
- Results show average scores per site with expandable details for each page
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
# Install Lighthouse CLI (done automatically by script)
npm install -g @lhci/cli

# Test all sites
pnpm lighthouse

# Test specific site
pnpm lighthouse main    # Main site only
pnpm lighthouse docs    # Docs site only  
pnpm lighthouse product # Product web only

# Or use the script directly
./scripts/lighthouse-local.sh [main|docs|product|all]
```

The script will:
1. Build each site
2. Start the server on the appropriate port
3. Run Lighthouse tests
4. Save results in `.lighthouseci/`

## Future Enhancements

1. **Historical Tracking**: Set up Lighthouse CI server for trend analysis
2. **Budget Tracking**: Implement performance budgets per site
3. **Mobile Testing**: Add mobile viewport testing configurations
4. **Production Monitoring**: Run after deployments to production
5. **Differential Testing**: Compare PR branch vs base branch scores
6. **Custom Metrics**: Add app-specific performance metrics

## Resources

- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse Performance Scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/)