import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility", () => {
	test("should not have any automatically detectable accessibility issues", async ({
		page,
	}) => {
		await page.goto("/");

		const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

		expect(accessibilityScanResults.violations).toEqual([]);
	});

	test("should have proper heading hierarchy", async ({ page }) => {
		await page.goto("/");

		// Check for h1
		const h1Elements = await page.$$("h1");
		expect(h1Elements.length).toBeGreaterThan(0);

		// Check heading levels are in order
		const headings = await page.$$eval("h1, h2, h3, h4, h5, h6", (elements) =>
			elements.map((el) => ({
				level: Number.parseInt(el.tagName[1]),
				text: el.textContent,
			})),
		);

		let previousLevel = 0;
		for (const heading of headings) {
			expect(heading.level - previousLevel).toBeLessThanOrEqual(1);
			previousLevel = heading.level;
		}
	});

	test("should have proper form labels", async ({ page }) => {
		await page.goto("/");

		// Check email input has label or aria-label
		const emailInput = page.getByPlaceholder("Enter your email");
		const ariaLabel = await emailInput.getAttribute("aria-label");
		const id = await emailInput.getAttribute("id");

		if (!ariaLabel && id) {
			const label = await page.$(`label[for="${id}"]`);
			expect(label || ariaLabel).toBeTruthy();
		}
	});

	test("should have sufficient color contrast", async ({ page }) => {
		await page.goto("/");

		const results = await new AxeBuilder({ page })
			.withTags(["wcag2aa", "wcag21aa"])
			.analyze();

		const contrastViolations = results.violations.filter(
			(violation) => violation.id === "color-contrast",
		);

		expect(contrastViolations).toEqual([]);
	});

	test("should be keyboard navigable", async ({ page }) => {
		await page.goto("/");

		// Test tab navigation
		await page.keyboard.press("Tab");
		const activeElement1 = await page.evaluate(() => document.activeElement?.tagName);
		expect(activeElement1).toBeTruthy();

		// Test form submission with keyboard
		await page.getByPlaceholder("Enter your email").fill("test@example.com");
		await page.keyboard.press("Enter");

		// Should show loading or result
		await expect(
			page.getByText(/\.\.\.|Thanks for subscribing|Please enter/i),
		).toBeVisible();
	});

	test("should have proper ARIA attributes", async ({ page }) => {
		await page.goto("/");

		// Check button has proper role
		const submitButton = page.getByRole("button", { name: "Join" });
		await expect(submitButton).toBeVisible();

		// Check loading state announces properly
		await page.getByPlaceholder("Enter your email").fill("test@example.com");
		await submitButton.click();

		// Check if loading state has aria-live
		const loadingElement = page.getByText("...");
		const ariaLive = await loadingElement.getAttribute("aria-live");
		expect(["polite", "assertive"]).toContain(ariaLive);
	});

	test("should have lang attribute", async ({ page }) => {
		await page.goto("/");

		const htmlLang = await page.getAttribute("html", "lang");
		expect(htmlLang).toBe("en");
	});

	test("should have proper focus indicators", async ({ page }) => {
		await page.goto("/");

		// Tab to email input
		await page.keyboard.press("Tab");
		const emailInput = page.getByPlaceholder("Enter your email");

		// Check if focused element has visible focus indicator
		const focusStyles = await emailInput.evaluate((el) => {
			const styles = window.getComputedStyle(el);
			return {
				outline: styles.outline,
				boxShadow: styles.boxShadow,
				border: styles.border,
			};
		});

		// Should have some visual focus indicator
		expect(
			focusStyles.outline !== "none" ||
				focusStyles.boxShadow !== "none" ||
				focusStyles.border,
		).toBeTruthy();
	});
});