import { test, expect } from '@playwright/test';

test('showcase page displays BGUI components', async ({ page }) => {
  // Navigate to the showcase page
  await page.goto('http://localhost:3001/showcase');
  
  // Wait for the main title to be visible
  await expect(page.locator('h1').first()).toBeVisible();
  
  // Check that it contains the main title
  await expect(page.locator('h1').first()).toHaveText('BGUI Component Showcase');
  
  // Check that various components are present
  await expect(page.locator('h2').first()).toBeVisible();
  await expect(page.locator('button').first()).toBeVisible();
  await expect(page.locator('input').first()).toBeVisible();
  
  // Take a screenshot for debugging
  await page.screenshot({ path: 'showcase-components.png' });
});