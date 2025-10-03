import { expect, test } from "@playwright/test";

test("showcase page displays BGUI components", async ({ page }) => {
	await page.goto("/showcase");
	const main = page.getByTestId("docs-main");
	await expect(main.getByText("Component Showcase", { exact: true })).toBeVisible();
	await expect(main.getByRole("button", { name: "Primary" })).toBeVisible();
	await expect(main.getByText("Feedback & media", { exact: true })).toBeVisible();
});
