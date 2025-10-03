import { expect, test } from "@playwright/test";

test("showcase page loads", async ({ page }) => {
	await page.goto("/showcase");
	const main = page.getByTestId("docs-main");
	await expect(main.getByText("Component Showcase", { exact: true })).toBeVisible();
	await expect(main.getByText("Interactive primitives", { exact: true })).toBeVisible();
	await expect(main.getByText("Navigation patterns", { exact: true })).toBeVisible();
});
