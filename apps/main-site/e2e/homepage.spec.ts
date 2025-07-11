import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/");
	});

	test("should display all main elements", async ({ page }) => {
		// Check title
		await expect(page.getByText("Brain Game")).toBeVisible();

		// Check subtitle
		await expect(
			page.getByText("A new era of personal development technology is coming soon."),
		).toBeVisible();

		// Check form elements
		await expect(page.getByPlaceholder("Enter your email")).toBeVisible();
		await expect(page.getByRole("button", { name: "Join" })).toBeVisible();

		// Check GitHub link
		await expect(page.getByText("View on GitHub")).toBeVisible();
	});

	test("should handle successful email subscription", async ({ page }) => {
		// Fill email
		await page.getByPlaceholder("Enter your email").fill("test@example.com");

		// Click submit
		await page.getByRole("button", { name: "Join" }).click();

		// Wait for loading state
		await expect(page.getByText("...")).toBeVisible();

		// Wait for success message (mocked in dev)
		await expect(page.getByText(/Thanks for subscribing|check your email/i)).toBeVisible({
			timeout: 10000,
		});
	});

	test("should validate email format", async ({ page }) => {
		// Try invalid email
		await page.getByPlaceholder("Enter your email").fill("invalid-email");
		await page.getByRole("button", { name: "Join" }).click();

		// Check for error message
		await expect(page.getByText(/Please enter your email address/i)).toBeVisible();
	});

	test("should handle empty email submission", async ({ page }) => {
		// Click submit without entering email
		await page.getByRole("button", { name: "Join" }).click();

		// Check for validation message
		await expect(page.getByText(/Please enter your email address/i)).toBeVisible();
	});

	test("should navigate to GitHub", async ({ page }) => {
		// Click GitHub link
		const githubLink = page.getByText("View on GitHub");
		await expect(githubLink).toHaveAttribute(
			"href",
			"https://github.com/braingame-com/braingame",
		);
	});

	test("should be responsive", async ({ page }) => {
		// Test mobile viewport
		await page.setViewportSize({ width: 375, height: 667 });
		await expect(page.getByText("Brain Game")).toBeVisible();
		await expect(page.getByPlaceholder("Enter your email")).toBeVisible();

		// Test tablet viewport
		await page.setViewportSize({ width: 768, height: 1024 });
		await expect(page.getByText("Brain Game")).toBeVisible();

		// Test desktop viewport
		await page.setViewportSize({ width: 1920, height: 1080 });
		await expect(page.getByText("Brain Game")).toBeVisible();
	});

	test("should have proper focus management", async ({ page }) => {
		// Tab through interactive elements
		await page.keyboard.press("Tab");
		await expect(page.getByPlaceholder("Enter your email")).toBeFocused();

		await page.keyboard.press("Tab");
		await expect(page.getByRole("button", { name: "Join" })).toBeFocused();

		await page.keyboard.press("Tab");
		await expect(page.getByText("View on GitHub")).toBeFocused();
	});

	test("should submit form with Enter key", async ({ page }) => {
		// Fill email
		const emailInput = page.getByPlaceholder("Enter your email");
		await emailInput.fill("test@example.com");

		// Press Enter
		await emailInput.press("Enter");

		// Check that form was submitted
		await expect(page.getByText("...")).toBeVisible();
	});
});