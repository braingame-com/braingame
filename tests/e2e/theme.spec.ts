import { test, expect } from '@playwright/test';

test.describe('Theme and Styling', () => {
  test('should load custom fonts', async ({ page }) => {
    await page.goto('/');
    
    // Check Lexend font is loaded
    const bodyText = page.locator('body');
    await expect(bodyText).toHaveCSS('font-family', /Lexend/);
    
    // Check Roboto Mono for code blocks
    const codeBlock = page.locator('.code-block code').first();
    if (await codeBlock.count() > 0) {
      await expect(codeBlock).toHaveCSS('font-family', /Roboto Mono|monospace/);
    }
  });

  test('should apply Material Icons font', async ({ page }) => {
    await page.goto('/components/primitives/icon');
    
    // Check Material Icons Round is loaded
    const icons = page.locator('.material-icons-round');
    await expect(icons.first()).toBeVisible();
  });

  test('should have proper CSS variables', async ({ page }) => {
    await page.goto('/');
    
    // Check root CSS variables are defined
    const rootStyles = await page.evaluate(() => {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);
      return {
        primaryColor: computedStyle.getPropertyValue('--color-primary'),
        fontBody: computedStyle.getPropertyValue('--font-body'),
        spacingUnit: computedStyle.getPropertyValue('--space-1'),
      };
    });
    
    expect(rootStyles.primaryColor).toBeTruthy();
    expect(rootStyles.fontBody).toContain('Lexend');
    expect(rootStyles.spacingUnit).toBeTruthy();
  });

  test('should support dark mode toggle', async ({ page }) => {
    await page.goto('/');
    
    // Look for theme toggle button
    const themeToggle = page.locator('[aria-label*="theme"], [aria-label*="Theme"]');
    if (await themeToggle.count() > 0) {
      // Get initial background color
      const initialBg = await page.evaluate(() => {
        return getComputedStyle(document.body).backgroundColor;
      });
      
      // Toggle theme
      await themeToggle.click();
      
      // Check background color changed
      const newBg = await page.evaluate(() => {
        return getComputedStyle(document.body).backgroundColor;
      });
      
      expect(newBg).not.toBe(initialBg);
    }
  });
});

test.describe('Animation and Motion', () => {
  test('should have smooth transitions', async ({ page }) => {
    await page.goto('/components/primitives/button');
    
    // Check button has transition
    const button = page.locator('.button').first();
    await expect(button).toHaveCSS('transition', /all/);
  });

  test('should respect animation duration tokens', async ({ page }) => {
    await page.goto('/');
    
    // Check CSS variables for animation durations
    const durations = await page.evaluate(() => {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);
      return {
        micro: computedStyle.getPropertyValue('--duration-micro'),
        small: computedStyle.getPropertyValue('--duration-small'),
        medium: computedStyle.getPropertyValue('--duration-medium'),
        macro: computedStyle.getPropertyValue('--duration-macro'),
      };
    });
    
    expect(durations.micro).toBe('100ms');
    expect(durations.small).toBe('150ms');
    expect(durations.medium).toBe('300ms');
    expect(durations.macro).toBe('450ms');
  });
});

test.describe('Responsive Design', () => {
  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check layout adapts
    const sidebar = page.locator('.sidebar');
    await expect(sidebar).toBeHidden(); // Should be hidden on mobile by default
    
    // Check content is readable
    const content = page.locator('.layout__content');
    await expect(content).toBeVisible();
  });

  test('should be responsive on tablet', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    // Check layout
    const sidebar = page.locator('.sidebar');
    const content = page.locator('.layout__content');
    
    await expect(sidebar).toBeVisible();
    await expect(content).toBeVisible();
  });

  test('should handle wide screens', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    // Check max-width constraints
    const content = page.locator('.layout__content');
    const box = await content.boundingBox();
    
    // Content should have max-width constraint
    expect(box?.width).toBeLessThanOrEqual(1200);
  });
});