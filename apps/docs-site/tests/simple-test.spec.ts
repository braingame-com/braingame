import { expect, test } from "@playwright/test";

test.describe("Docs Site Basic Tests", () => {
	test("homepage loads correctly", async ({ page }) => {
		const response = await page.goto("/");
		expect(response?.status()).toBe(200);
		await page.waitForLoadState("networkidle");

		await expect(page).toHaveTitle(/Brain Game UI Documentation/);
		await expect(page.getByTestId("docs-header")).toBeVisible();
		await expect(page.getByTestId("docs-main")).toBeVisible();
	});

	test("showcase page renders highlight cards", async ({ page }) => {
		await page.goto("/showcase");
		await page.waitForLoadState("networkidle");
		const main = page.getByTestId("docs-main");
		await expect(main.getByText("Component Showcase", { exact: true })).toBeVisible();
		await expect(main.getByText("Interactive primitives", { exact: true })).toBeVisible();
	});

	test("button documentation page loads", async ({ page }) => {
		await page.goto("/components/primitives/button");
		await expect(
			page.getByTestId("docs-main").getByText("Button", { exact: false }).first(),
		).toBeVisible();
	});

	test("dark mode toggle exists", async ({ page }) => {
		await page.goto("/");
		await expect(page.getByRole("button", { name: "Toggle theme" })).toBeVisible();
	});

	test("fonts are applied", async ({ page }) => {
		await page.goto("/");
		const bodyStyles = await page.evaluate(() => {
			const computed = window.getComputedStyle(document.body);
			return computed.fontFamily;
		});
		expect(bodyStyles).toContain("Lexend");
	});
});
