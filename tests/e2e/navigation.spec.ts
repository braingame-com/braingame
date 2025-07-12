import { test, expect } from '@playwright/test';

test.describe('Documentation Site Navigation', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Brain Game UI Documentation/);
    await expect(page.locator('h1')).toContainText('Brain Game UI');
  });

  test('should navigate through sidebar links', async ({ page }) => {
    await page.goto('/');
    
    // Check sidebar is visible
    const sidebar = page.locator('.sidebar');
    await expect(sidebar).toBeVisible();

    // Navigate to Colors page
    await page.click('text=Colors');
    await expect(page).toHaveURL('/design/colors');
    await expect(page.locator('h1')).toContainText('Color System');

    // Navigate to Icon component
    await page.click('text=Icon');
    await expect(page).toHaveURL('/components/primitives/icon');
    await expect(page.locator('h1')).toContainText('Icon');

    // Navigate to Alert component
    await page.click('text=Alert');
    await expect(page).toHaveURL('/components/feedback/alert');
    await expect(page.locator('h1')).toContainText('Alert');
  });

  test('should highlight active navigation item', async ({ page }) => {
    await page.goto('/components/primitives/button');
    
    const activeLink = page.locator('.sidebar__link--active');
    await expect(activeLink).toContainText('Button');
    await expect(activeLink).toHaveCSS('color', /rgb/);
  });

  test('should have working header links', async ({ page }) => {
    await page.goto('/');
    
    const header = page.locator('.header');
    await expect(header).toBeVisible();
    
    // Check logo/home link
    const homeLink = header.locator('a').first();
    await homeLink.click();
    await expect(page).toHaveURL('/');
  });
});

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should toggle mobile menu', async ({ page }) => {
    await page.goto('/');
    
    // Mobile menu should be hidden initially
    const sidebar = page.locator('.sidebar');
    await expect(sidebar).toBeHidden();

    // Click menu button
    const menuButton = page.locator('[aria-label="Toggle menu"]');
    await menuButton.click();
    
    // Sidebar should be visible
    await expect(sidebar).toBeVisible();

    // Click outside to close
    await page.click('body', { position: { x: 10, y: 10 } });
    await expect(sidebar).toBeHidden();
  });
});