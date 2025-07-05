import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  test('should load homepage quickly', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Homepage should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('should have optimized images', async ({ page }) => {
    await page.goto('/');
    
    // Check images have appropriate formats
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const src = await img.getAttribute('src');
      
      if (src) {
        // Check for modern formats or optimization
        const hasModernFormat = src.match(/\.(webp|avif)$/) || 
                               src.includes('_next/image') || 
                               src.includes('optimized');
        
        // Images should be optimized
        expect(hasModernFormat || src.startsWith('data:')).toBeTruthy();
      }
    }
  });

  test('should lazy load below-the-fold content', async ({ page }) => {
    await page.goto('/components/primitives/icon');
    
    // Check for lazy loading attributes
    const lazyImages = page.locator('img[loading="lazy"]');
    const lazyCount = await lazyImages.count();
    
    // Some images should be lazy loaded
    expect(lazyCount).toBeGreaterThan(0);
  });

  test('should have efficient CSS', async ({ page }) => {
    await page.goto('/');
    
    // Check CSS is minified and bundled
    const styleSheets = await page.evaluate(() => {
      return Array.from(document.styleSheets).map(sheet => ({
        href: sheet.href,
        rules: sheet.cssRules?.length || 0
      }));
    });
    
    // Should have consolidated stylesheets
    expect(styleSheets.length).toBeLessThan(10);
  });

  test('should cache static assets', async ({ page }) => {
    // First visit
    await page.goto('/');
    
    // Check network requests for caching headers
    const responses: any[] = [];
    page.on('response', response => {
      if (response.url().includes('.css') || 
          response.url().includes('.js') || 
          response.url().includes('.woff')) {
        responses.push({
          url: response.url(),
          cacheControl: response.headers()['cache-control'],
          status: response.status()
        });
      }
    });
    
    // Navigate to trigger asset loading
    await page.goto('/components/primitives/button');
    
    // Check cache headers
    const cachedAssets = responses.filter(r => 
      r.cacheControl && r.cacheControl.includes('max-age')
    );
    
    expect(cachedAssets.length).toBeGreaterThan(0);
  });

  test('should handle route transitions smoothly', async ({ page }) => {
    await page.goto('/');
    
    // Measure navigation time
    const startTime = Date.now();
    await page.click('text=Button');
    await page.waitForLoadState('networkidle');
    const navTime = Date.now() - startTime;
    
    // Navigation should be fast (under 1 second)
    expect(navTime).toBeLessThan(1000);
  });

  test('should not have memory leaks', async ({ page }) => {
    await page.goto('/');
    
    // Get initial memory usage
    const initialMemory = await page.evaluate(() => {
      if ('memory' in performance) {
        return (performance as any).memory.usedJSHeapSize;
      }
      return 0;
    });
    
    // Navigate through several pages
    const pages = [
      '/components/primitives/button',
      '/components/inputs/textinput',
      '/components/layout/modal',
      '/components/feedback/alert',
      '/design/colors'
    ];
    
    for (const path of pages) {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
    }
    
    // Return to homepage
    await page.goto('/');
    
    // Force garbage collection if available
    await page.evaluate(() => {
      if ('gc' in window) {
        (window as any).gc();
      }
    });
    
    // Check memory hasn't grown excessively
    const finalMemory = await page.evaluate(() => {
      if ('memory' in performance) {
        return (performance as any).memory.usedJSHeapSize;
      }
      return 0;
    });
    
    if (initialMemory > 0 && finalMemory > 0) {
      const memoryGrowth = finalMemory - initialMemory;
      // Memory growth should be reasonable (less than 50MB)
      expect(memoryGrowth).toBeLessThan(50 * 1024 * 1024);
    }
  });

  test('should have minimal layout shifts', async ({ page }) => {
    await page.goto('/');
    
    // Wait for initial load
    await page.waitForLoadState('networkidle');
    
    // Observe layout shifts
    const cls = await page.evaluate(() => {
      return new Promise(resolve => {
        let clsValue = 0;
        const observer = new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            if ((entry as any).entryType === 'layout-shift') {
              clsValue += (entry as any).value;
            }
          }
        });
        
        observer.observe({ entryTypes: ['layout-shift'] });
        
        // Observe for 2 seconds
        setTimeout(() => {
          observer.disconnect();
          resolve(clsValue);
        }, 2000);
      });
    });
    
    // CLS should be less than 0.1 (good)
    expect(cls).toBeLessThan(0.1);
  });
});

test.describe('Bundle Size', () => {
  test('should have reasonable JavaScript bundle size', async ({ page }) => {
    const jsFiles: any[] = [];
    
    page.on('response', response => {
      if (response.url().endsWith('.js') && response.status() === 200) {
        jsFiles.push({
          url: response.url(),
          size: parseInt(response.headers()['content-length'] || '0')
        });
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Calculate total JS size
    const totalSize = jsFiles.reduce((sum, file) => sum + file.size, 0);
    
    // Total JS should be under 500KB for initial load
    expect(totalSize).toBeLessThan(500 * 1024);
  });

  test('should use code splitting', async ({ page }) => {
    const chunks: string[] = [];
    
    page.on('response', response => {
      if (response.url().includes('_next/static/chunks')) {
        chunks.push(response.url());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const initialChunks = [...chunks];
    
    // Navigate to a different page
    await page.click('text=Modal');
    await page.waitForLoadState('networkidle');
    
    // Should have loaded additional chunks
    expect(chunks.length).toBeGreaterThan(initialChunks.length);
  });
});