import { expect, test } from "@playwright/test";

test.describe("Docs Site Basic Tests", () => {
	test("homepage loads correctly", async ({ page }) => {
		// Navigate to homepage
		const response = await page.goto("http://localhost:3001/");

		// Check response is OK
		expect(response?.status()).toBe(200);

		// Wait for the page to be fully loaded
		await page.waitForLoadState("networkidle");

		// Check that the page title is correct
		await expect(page).toHaveTitle(/Brain Game UI Documentation/);

		// Check that main layout elements exist
		const header = page.locator(".layout__header");
		const sidebar = page.locator(".layout__sidebar");
		const main = page.locator(".layout__main");

		// Use count() to check existence instead of visibility
		// since elements might be hidden on mobile
		expect(await header.count()).toBeGreaterThan(0);
		expect(await sidebar.count()).toBeGreaterThan(0);
		expect(await main.count()).toBeGreaterThan(0);

		// Check content exists
		const content = await page.textContent("body");
		expect(content).toBeTruthy();
	});

	test("showcase page displays typography component", async ({ page }) => {
		await page.goto("http://localhost:3001/showcase");
		await page.waitForLoadState("networkidle");

		// Check for "hello world" text
		const helloWorld = page.getByText("hello world");
		await expect(helloWorld).toBeVisible();
	});

	test("button documentation page loads", async ({ page }) => {
		await page.goto("http://localhost:3001/components/primitives/button");
		await page.waitForLoadState("networkidle");

		// Check page has button-related content
		const heading = page.locator("h1").first();
		await expect(heading).toContainText("Button");
	});

	test("dark mode toggle exists", async ({ page }) => {
		await page.goto("http://localhost:3001/");
		await page.waitForLoadState("networkidle");

		// Check theme toggle button exists
		const themeToggle = page.locator('button[aria-label="Toggle theme"]');
		expect(await themeToggle.count()).toBeGreaterThan(0);
	});

	test("fonts are applied", async ({ page }) => {
		await page.goto("http://localhost:3001/");
		await page.waitForLoadState("networkidle");

		// Check that CSS is loaded and fonts are applied
		const bodyStyles = await page.evaluate(() => {
			const computed = window.getComputedStyle(document.body);
			return {
				fontFamily: computed.fontFamily,
				backgroundColor: computed.backgroundColor,
			};
		});

		// Check font family includes Lexend
		expect(bodyStyles.fontFamily).toContain("Lexend");
	});
});
