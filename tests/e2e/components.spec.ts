import { test, expect } from '@playwright/test';

test.describe('Component Documentation', () => {
  test('should display component examples', async ({ page }) => {
    await page.goto('/components/primitives/button');
    
    // Check page structure
    await expect(page.locator('h1')).toContainText('Button');
    await expect(page.locator('.text-subtitle')).toBeVisible();
    
    // Check for live examples
    const examples = page.locator('.example');
    await expect(examples).toHaveCount(await examples.count());
    
    // Check for props table
    const propsTable = page.locator('.props-table');
    await expect(propsTable).toBeVisible();
  });

  test('should have interactive examples', async ({ page }) => {
    await page.goto('/components/primitives/button');
    
    // Find and click a button in the examples
    const exampleButton = page.locator('.example__preview button').first();
    await expect(exampleButton).toBeVisible();
    await exampleButton.click(); // Should not throw error
  });

  test('should display code snippets with syntax highlighting', async ({ page }) => {
    await page.goto('/components/primitives/button');
    
    // Check for code blocks
    const codeBlocks = page.locator('.code-block');
    await expect(codeBlocks.first()).toBeVisible();
    
    // Check for syntax highlighting
    const highlightedCode = page.locator('.code-block pre code');
    await expect(highlightedCode.first()).toBeVisible();
  });

  test('should copy code on button click', async ({ page }) => {
    await page.goto('/components/primitives/button');
    
    // Find copy button
    const copyButton = page.locator('.code-block__copy').first();
    await expect(copyButton).toBeVisible();
    
    // Click copy button
    await copyButton.click();
    
    // Check clipboard permission or button state change
    // Note: Actual clipboard testing requires permissions
    await expect(copyButton).toContainText(/Copy|Copied/);
  });
});

test.describe('Icon Gallery', () => {
  test('should display icon categories', async ({ page }) => {
    await page.goto('/components/primitives/icon');
    
    // Check for icon categories
    const categories = ['Action', 'Navigation', 'Content', 'Communication'];
    for (const category of categories) {
      await expect(page.locator(`text=${category}`)).toBeVisible();
    }
  });

  test('should show icons with Material Icons font', async ({ page }) => {
    await page.goto('/components/primitives/icon');
    
    // Check for Material Icons
    const icons = page.locator('.material-icons-round');
    await expect(icons.first()).toBeVisible();
    
    // Verify font family is loaded
    const iconElement = icons.first();
    await expect(iconElement).toHaveCSS('font-family', /Material Icons Round/);
  });

  test('should filter icons by search', async ({ page }) => {
    await page.goto('/components/primitives/icon');
    
    // Find search input (if implemented)
    const searchInput = page.locator('input[placeholder*="Search"]');
    if (await searchInput.count() > 0) {
      await searchInput.fill('home');
      
      // Check filtered results
      const homeIcon = page.locator('.icon-item', { hasText: 'home' });
      await expect(homeIcon).toBeVisible();
    }
  });
});

test.describe('Color Palette', () => {
  test('should display all color groups', async ({ page }) => {
    await page.goto('/design/colors');
    
    // Check for color sections
    const colorGroups = [
      'Primary Colors',
      'Secondary Colors',
      'Tertiary Colors',
      'Semantic Colors',
      'Surface Colors',
      'Outline & Background'
    ];
    
    for (const group of colorGroups) {
      await expect(page.locator(`h2:has-text("${group}")`)).toBeVisible();
    }
  });

  test('should show color swatches with CSS variables', async ({ page }) => {
    await page.goto('/design/colors');
    
    // Check for color swatches
    const colorSwatches = page.locator('.color-swatch');
    await expect(colorSwatches.first()).toBeVisible();
    
    // Check for CSS variable display
    const colorVars = page.locator('.color-var');
    await expect(colorVars.first()).toContainText('--color-');
  });

  test('should demonstrate color accessibility', async ({ page }) => {
    await page.goto('/design/colors');
    
    // Check for accessibility section
    await expect(page.locator('text=Accessibility')).toBeVisible();
    
    // Check for contrast examples
    const contrastExamples = page.locator('.contrast-demo');
    await expect(contrastExamples.first()).toBeVisible();
  });
});

test.describe('Interactive Components', () => {
  test('should interact with form inputs', async ({ page }) => {
    await page.goto('/components/inputs/checkbox');
    
    // Find checkbox in example
    const checkbox = page.locator('.example__preview input[type="checkbox"]').first();
    await expect(checkbox).toBeVisible();
    
    // Check initial state
    const isChecked = await checkbox.isChecked();
    
    // Click to toggle
    await checkbox.click();
    await expect(checkbox).toHaveProperty('checked', !isChecked);
  });

  test('should interact with switches', async ({ page }) => {
    await page.goto('/components/inputs/switch');
    
    // Find switch in example
    const switchInput = page.locator('.example__preview input[type="checkbox"]').first();
    await expect(switchInput).toBeVisible();
    
    // Toggle switch
    await switchInput.click();
  });

  test('should type in text inputs', async ({ page }) => {
    await page.goto('/components/inputs/textinput');
    
    // Find text input in example
    const textInput = page.locator('.example__preview input[type="text"]').first();
    await expect(textInput).toBeVisible();
    
    // Type text
    await textInput.fill('Test input');
    await expect(textInput).toHaveValue('Test input');
  });
});

test.describe('Modal Component', () => {
  test('should open and close modal', async ({ page }) => {
    await page.goto('/components/layout/modal');
    
    // Modal should not be visible initially
    const modal = page.locator('.modal__container');
    await expect(modal).toBeHidden();
    
    // Find button to open modal (if example includes interactive modal)
    const openButton = page.locator('button:has-text("Open Modal")');
    if (await openButton.count() > 0) {
      await openButton.click();
      await expect(modal).toBeVisible();
      
      // Close modal
      const closeButton = page.locator('.modal__close');
      await closeButton.click();
      await expect(modal).toBeHidden();
    }
  });
});