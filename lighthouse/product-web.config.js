module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:8081',
        'http://localhost:8081/home',
        'http://localhost:8081/settings',
      ],
      numberOfRuns: 3,
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
        // More lenient for Expo web as it's not fully optimized for web yet
        'categories:performance': ['warn', { minScore: 0.7 }],
        'categories:accessibility': ['warn', { minScore: 0.85 }],
        'categories:best-practices': ['warn', { minScore: 0.85 }],
        'categories:seo': ['warn', { minScore: 0.8 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 3000 }],
        'speed-index': ['warn', { maxNumericValue: 5000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 4000 }],
        'time-to-interactive': ['warn', { maxNumericValue: 6000 }],
        'total-blocking-time': ['warn', { maxNumericValue: 750 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.15 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};