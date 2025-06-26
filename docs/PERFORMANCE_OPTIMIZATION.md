# Performance Optimization Guide

## Bundle Size Analysis

### Current State
- **docs-site**: ~1.1MB (static export)
- **main-site**: Build issues with React Native dependencies
- **product**: Expo app with 38 dependencies

## Implemented Optimizations

### 1. Code Splitting (Next.js Apps)

#### docs-site/next.config.ts
```typescript
experimental: {
  optimizePackageImports: ['@braingame/bgui', '@braingame/utils'],
},
webpack: (config) => {
  // Enable tree shaking
  config.optimization.usedExports = true;
  config.optimization.sideEffects = false;

  // Split chunks for better caching
  config.optimization.splitChunks = {
    chunks: 'all',
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
        priority: 20,
      },
      common: {
        name: 'common',
        minChunks: 2,
        chunks: 'all',
        priority: 10,
        reuseExistingChunk: true,
      },
    },
  };

  return config;
},
```

### 2. Bundle Analysis
- Added `@next/bundle-analyzer` to visualize bundle composition
- Run `npm run analyze` in any Next.js app to generate reports

### 3. Dynamic Imports
Use dynamic imports for heavy components:

```typescript
// Instead of
import { HeavyComponent } from '@braingame/bgui';

// Use
const HeavyComponent = dynamic(() => 
  import('@braingame/bgui').then(mod => mod.HeavyComponent)
);
```

## Pending Optimizations

### 1. Fix React Native Web Compatibility
- Main-site requires proper webpack configuration for @expo/vector-icons
- Consider creating web-specific builds of BGUI components

### 2. Mobile App Optimization (Product)
- Implement Hermes engine for better performance
- Use React Native's lazy loading patterns
- Optimize asset loading with expo-asset

### 3. Image Optimization
- Implement next/image for automatic optimization
- Use WebP format with fallbacks
- Lazy load images below the fold

### 4. Font Optimization
- Subset fonts to reduce size
- Use font-display: swap for better perceived performance
- Consider variable fonts for flexibility

## Performance Monitoring

### 1. Lighthouse CI Integration
```yaml
# .github/workflows/lighthouse.yml
- name: Run Lighthouse CI
  uses: treosh/lighthouse-ci-action@v9
  with:
    urls: |
      https://braingame.com
      https://docs.braingame.com
    budgetPath: ./budget.json
```

### 2. Performance Budgets
Create `budget.json`:
```json
{
  "timings": [
    {
      "metric": "first-contentful-paint",
      "budget": 1000
    },
    {
      "metric": "largest-contentful-paint", 
      "budget": 2500
    }
  ],
  "resourceSizes": [
    {
      "resourceType": "script",
      "budget": 300
    },
    {
      "resourceType": "total",
      "budget": 1000
    }
  ]
}
```

## Best Practices

1. **Lazy Load Components**
   - Use React.lazy() for route-based code splitting
   - Implement Suspense boundaries with loading states

2. **Optimize Dependencies**
   - Audit with `npm ls --depth=0`
   - Remove unused dependencies
   - Use lighter alternatives when possible

3. **Asset Optimization**
   - Compress images with appropriate quality
   - Use SVGs for icons
   - Implement responsive images

4. **Caching Strategy**
   - Use consistent chunk naming
   - Implement service workers for offline support
   - Set appropriate cache headers

5. **Monitoring**
   - Track Core Web Vitals
   - Set up Real User Monitoring (RUM)
   - Regular performance audits