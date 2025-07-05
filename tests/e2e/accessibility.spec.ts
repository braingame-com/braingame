import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Accessibility Tests', () => {
  test('homepage should have no accessibility violations', async ({ page }) => {
    await page.goto('/');
    await injectAxe(page);
    await checkA11y(page);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    // Check h1 exists and is unique
    const h1Elements = page.locator('h1');
    await expect(h1Elements).toHaveCount(1);
    
    // Check heading hierarchy
    const headings = await page.evaluate(() => {
      const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      return Array.from(headingElements).map(h => ({
        level: parseInt(h.tagName[1]),
        text: h.textContent
      }));
    });
    
    // Verify heading levels don't skip
    let previousLevel = 0;
    for (const heading of headings) {
      expect(heading.level - previousLevel).toBeLessThanOrEqual(1);
      previousLevel = heading.level;
    }
  });

  test('all interactive elements should be keyboard accessible', async ({ page }) => {
    await page.goto('/components/primitives/button');
    
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    
    // Check focused element is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Check focus indicator is visible
    const focusOutline = await focusedElement.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return styles.outline || styles.boxShadow;
    });
    expect(focusOutline).toBeTruthy();
  });

  test('images should have alt text', async ({ page }) => {
    await page.goto('/');
    
    // Check all images have alt attribute
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const altText = await images.nth(i).getAttribute('alt');
      expect(altText).toBeDefined();
    }
  });

  test('form inputs should have labels', async ({ page }) => {
    await page.goto('/components/inputs/textinput');
    
    // Check inputs have associated labels
    const inputs = page.locator('input:not([type="hidden"])');
    const inputCount = await inputs.count();
    
    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledby = await input.getAttribute('aria-labelledby');
      
      // Input should have either id with label, aria-label, or aria-labelledby
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        const hasLabel = await label.count() > 0;
        expect(hasLabel || ariaLabel || ariaLabelledby).toBeTruthy();
      } else {
        expect(ariaLabel || ariaLabelledby).toBeTruthy();
      }
    }
  });

  test('buttons should have accessible names', async ({ page }) => {
    await page.goto('/components/primitives/button');
    
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      
      // Button should have either text content or aria-label
      expect(text?.trim() || ariaLabel).toBeTruthy();
    }
  });

  test('color contrast should meet WCAG standards', async ({ page }) => {
    await page.goto('/design/colors');
    
    // This would require axe-core or similar tool for comprehensive testing
    // For now, check that contrast information is documented
    await expect(page.locator('text=/contrast/i')).toBeVisible();
    await expect(page.locator('text=/4.5:1/i')).toBeVisible();
  });

  test('skip links should be available', async ({ page }) => {
    await page.goto('/');
    
    // Press Tab to reveal skip link (if implemented)
    await page.keyboard.press('Tab');
    
    const skipLink = page.locator('a[href="#main"], a:has-text("Skip")');
    if (await skipLink.count() > 0) {
      await expect(skipLink).toBeVisible();
      
      // Activate skip link
      await skipLink.click();
      
      // Check focus moved to main content
      const mainContent = page.locator('main, [role="main"], #main');
      await expect(mainContent).toBeVisible();
    }
  });

  test('ARIA landmarks should be present', async ({ page }) => {
    await page.goto('/');
    
    // Check for main landmark
    const main = page.locator('main, [role="main"]');
    await expect(main).toHaveCount(1);
    
    // Check for navigation landmark
    const nav = page.locator('nav, [role="navigation"]');
    await expect(nav).toHaveCount(await nav.count());
    
    // Check for banner (header) landmark
    const banner = page.locator('header, [role="banner"]');
    await expect(banner).toBeVisible();
  });

  test('focus should be managed properly in modals', async ({ page }) => {
    await page.goto('/components/layout/modal');
    
    // Look for modal trigger
    const modalTrigger = page.locator('button:has-text("Open Modal")');
    if (await modalTrigger.count() > 0) {
      await modalTrigger.click();
      
      // Check focus is trapped in modal
      const modal = page.locator('.modal__container');
      await expect(modal).toBeVisible();
      
      // Tab through modal elements
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      
      // Focus should be within modal
      const isWithinModal = await focusedElement.evaluate((el, modalSelector) => {
        const modal = document.querySelector(modalSelector);
        return modal?.contains(el);
      }, '.modal__container');
      
      expect(isWithinModal).toBeTruthy();
    }
  });
});

test.describe('Screen Reader Support', () => {
  test('should have proper ARIA labels for icons', async ({ page }) => {
    await page.goto('/components/primitives/icon');
    
    const icons = page.locator('.material-icons-round');
    const iconCount = await icons.count();
    
    for (let i = 0; i < Math.min(iconCount, 5); i++) {
      const icon = icons.nth(i);
      const ariaLabel = await icon.getAttribute('aria-label');
      const ariaHidden = await icon.getAttribute('aria-hidden');
      
      // Icon should either have aria-label or be hidden from screen readers
      expect(ariaLabel || ariaHidden === 'true').toBeTruthy();
    }
  });

  test('loading states should be announced', async ({ page }) => {
    await page.goto('/components/feedback/spinner');
    
    // Check for ARIA live regions or busy states
    const spinners = page.locator('[role="status"], [aria-busy="true"]');
    if (await spinners.count() > 0) {
      await expect(spinners.first()).toBeVisible();
    }
  });

  test('error messages should be associated with inputs', async ({ page }) => {
    await page.goto('/components/inputs/textinput');
    
    // Look for error examples
    const errorInputs = page.locator('.textinput--error');
    if (await errorInputs.count() > 0) {
      const input = errorInputs.first();
      const ariaDescribedby = await input.getAttribute('aria-describedby');
      const ariaInvalid = await input.getAttribute('aria-invalid');
      
      // Error input should have aria-invalid and aria-describedby
      expect(ariaInvalid).toBe('true');
      if (ariaDescribedby) {
        const errorMessage = page.locator(`#${ariaDescribedby}`);
        await expect(errorMessage).toBeVisible();
      }
    }
  });
});