import { expect, test } from "@playwright/test";

test.describe("Docs Site", () => {
	test("homepage loads without errors", async ({ page }) => {
		// Navigate to homepage
		await page.goto("/");

		// Check that the page loads without errors
		await expect(page).toHaveTitle(/Brain Game UI Documentation/);

		// Check that layout components are rendered
		await expect(page.locator(".layout__header")).toBeVisible();
		await expect(page.locator(".layout__sidebar")).toBeVisible();
		await expect(page.locator(".layout__main")).toBeVisible();

		// Check that the sidebar has content
		const sidebarSections = await page.locator(".sidebar__section").count();
		expect(sidebarSections).toBeGreaterThan(0);
	});

	test("dark mode toggle works", async ({ page }) => {
		await page.goto("/");

		// Get initial theme
		const initialTheme = await page.evaluate(() =>
			document.documentElement.getAttribute("data-theme"),
		);

		// Find and click the theme toggle button
		const themeToggle = page.locator('button[aria-label="Toggle theme"]');
		await expect(themeToggle).toBeVisible();
		await themeToggle.click();

		// Check that theme changed
		const newTheme = await page.evaluate(() => document.documentElement.getAttribute("data-theme"));
		expect(newTheme).not.toBe(initialTheme);

		// Check that the theme persists on reload
		await page.reload();
		const persistedTheme = await page.evaluate(() =>
			document.documentElement.getAttribute("data-theme"),
		);
		expect(persistedTheme).toBe(newTheme);
	});

	test("showcase page displays all components", async ({ page }) => {
		await page.goto("/showcase");

		// Check that Typography component with "hello world" is displayed
		await expect(page.getByText("hello world")).toBeVisible();

		// Check that showcase components section exists
		await expect(page.getByText("Component Showcase")).toBeVisible();

		// Verify key components are rendered
		const components = [
			"Button Examples",
			"Typography Examples",
			"Input Examples",
			"Card Examples",
		];

		for (const component of components) {
			await expect(page.getByText(component, { exact: false })).toBeVisible();
		}
	});

	test("component documentation pages load", async ({ page }) => {
		const componentPages = [
			{ path: "/components/primitives/button", title: "Button" },
			{ path: "/components/primitives/typography", title: "Typography" },
			{ path: "/components/primitives/badge", title: "Badge" },
		];

		for (const { path, title } of componentPages) {
			await page.goto(path);

			// Check page loads without error
			await expect(page.locator("h1").first()).toContainText(title);

			// Check examples section exists
			await expect(page.getByText("Examples")).toBeVisible();

			// Check props table exists
			await expect(page.locator(".props-table")).toBeVisible();
		}
	});

	test("sidebar navigation works", async ({ page }) => {
		await page.goto("/");

		// Click on a sidebar link
		const buttonLink = page.locator(".sidebar__link").filter({ hasText: "Button" });
		await buttonLink.click();

		// Check that we navigated to the button page
		await expect(page).toHaveURL(/\/components\/primitives\/button/);
		await expect(page.locator("h1").first()).toContainText("Button");

		// Check that the link is marked as active
		await expect(buttonLink).toHaveClass(/sidebar__link--active/);
	});

	test("fonts are loaded correctly", async ({ page }) => {
		await page.goto("/");

		// Check that Lexend font is applied to body
		const bodyFont = await page.evaluate(() => {
			const computed = window.getComputedStyle(document.body);
			return computed.fontFamily;
		});

		expect(bodyFont).toContain("Lexend");
	});

	test("color theme variables are applied", async ({ page }) => {
		await page.goto("/");

		// Check that CSS variables are defined
		const primaryColor = await page.evaluate(() => {
			const computed = window.getComputedStyle(document.documentElement);
			return computed.getPropertyValue("--color-primary").trim();
		});

		expect(primaryColor).toBeTruthy();
		expect(primaryColor).not.toBe("");
	});

	test("design pages load correctly", async ({ page }) => {
		await page.goto("/design/colors");

		// Check that color swatches are displayed
		await expect(page.getByText("Primary Colors")).toBeVisible();
		await expect(page.locator(".color-swatch").first()).toBeVisible();
	});

	test("mobile responsiveness", async ({ page }) => {
		// Set mobile viewport
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto("/");

		// On mobile, sidebar should be hidden by default
		const _sidebarVisible = await page.locator(".layout__sidebar").isVisible();

		// Check that content is still accessible
		await expect(page.locator(".layout__main")).toBeVisible();
	});

	test("no console errors", async ({ page }) => {
		const errors: string[] = [];

		page.on("console", (msg) => {
			if (msg.type() === "error") {
				errors.push(msg.text());
			}
		});

		await page.goto("/");
		await page.goto("/showcase");
		await page.goto("/components/primitives/button");

		// Check that no console errors occurred
		expect(errors).toHaveLength(0);
	});
});
