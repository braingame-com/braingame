module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3001',
        'http://localhost:3001/docs',
        'http://localhost:3001/api',
      ],
      numberOfRuns: 3,
      outputDir: '.lighthouseci/docs-site',
      settings: {
        preset: 'desktop',
        throttling: {
          cpuSlowdownMultiplier: 1,
        },
        chromeFlags: '--headless',
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'speed-index': ['warn', { maxNumericValue: 4000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'time-to-interactive': ['warn', { maxNumericValue: 5000 }],
        'total-blocking-time': ['warn', { maxNumericValue: 500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};