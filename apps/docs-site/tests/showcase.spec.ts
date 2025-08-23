import { expect, test } from "@playwright/test";

test("showcase page loads", async ({ page }) => {
	// Navigate to the showcase page
	await page.goto("http://localhost:3001/showcase");

	// Wait for the page to load and check for the main heading
	await expect(page.locator("h1")).toContainText("BGUI Component Showcase");

	// Check that key sections are visible
	await expect(page.locator("text=Buttons")).toBeVisible();
	await expect(page.locator("text=Text Inputs")).toBeVisible();
	await expect(page.locator("text=Toggles")).toBeVisible();

	// Take a screenshot for debugging
	await page.screenshot({ path: "showcase-page.png" });
});
