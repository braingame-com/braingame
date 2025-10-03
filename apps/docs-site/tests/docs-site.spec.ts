import { expect, test } from "@playwright/test";

const desktopViewport = { width: 1280, height: 720 } as const;
const mobileViewport = { width: 390, height: 844 } as const;

test.describe("Docs Site", () => {
	test.use({ viewport: desktopViewport });

	test("homepage loads without errors", async ({ page }) => {
		await page.goto("/");

		await expect(page.getByTestId("docs-header")).toBeVisible();
		await expect(page.getByTestId("docs-navigation")).toBeVisible();
		await expect(page.getByTestId("docs-main")).toBeVisible();

		await expect(page.getByTestId("docs-navigation").getByText("Button")).toBeVisible();
	});

	test("dark mode toggle works", async ({ page }) => {
		await page.goto("/");

		const initialTheme = await page.evaluate(() =>
			document.documentElement.getAttribute("data-theme"),
		);

		const themeToggle = page.getByRole("button", { name: "Toggle theme" });
		await expect(themeToggle).toBeVisible();
		await themeToggle.click();

		const newTheme = await page.evaluate(() => document.documentElement.getAttribute("data-theme"));
		expect(newTheme).not.toBe(initialTheme);

		await page.reload();
		const persistedTheme = await page.evaluate(() =>
			document.documentElement.getAttribute("data-theme"),
		);
		expect(persistedTheme).toBe(newTheme);
	});

	test("showcase page displays all components", async ({ page }) => {
		await page.goto("/showcase");

		const main = page.getByTestId("docs-main");
		await expect(main.getByText("Component Showcase", { exact: true })).toBeVisible();
		await expect(main.getByText("Interactive primitives", { exact: true })).toBeVisible();
		await expect(main.getByText("Navigation patterns", { exact: true })).toBeVisible();
	});

	test("component documentation pages load", async ({ page }) => {
		const componentPages = [
			{ path: "/components/primitives/button", title: "Button" },
			{ path: "/components/primitives/typography", title: "Typography" },
			{ path: "/components/primitives/link", title: "Link" },
		];

		for (const { path, title } of componentPages) {
			await page.goto(path);
			await expect(page).toHaveURL(path);
			await expect(
				page.getByTestId("docs-main").getByText(title, { exact: false }).first(),
			).toBeVisible();
			await expect(page.getByTestId("props-table")).toBeVisible();
		}
	});

	test("sidebar navigation works on desktop", async ({ page }) => {
		await page.goto("/");

		await page.getByTestId("docs-navigation").getByText("Button").click();

		await expect(page).toHaveURL(/\/components\/primitives\/button/);
		await expect(
			page.getByTestId("docs-main").getByText("Button", { exact: false }).first(),
		).toBeVisible();
	});

	test("design pages load correctly", async ({ page }) => {
		await page.goto("/design/colors");

		const main = page.getByTestId("docs-main");
		await expect(main.getByText("Primary palette")).toBeVisible();
		await expect(main.getByText("primaryContainer", { exact: true })).toBeVisible();
	});

	test("no console errors across key routes", async ({ page }) => {
		const errors: string[] = [];

		page.on("console", (msg) => {
			if (msg.type() === "error") {
				errors.push(msg.text());
			}
		});

		await page.goto("/");
		await page.goto("/showcase");
		await page.goto("/components/primitives/button");

		expect(errors).toHaveLength(0);
	});

	test.describe("mobile navigation", () => {
		test.use({ viewport: mobileViewport });

		test("drawer opens and navigates", async ({ page }) => {
			await page.goto("/");

			await expect(page.locator('[data-testid="docs-navigation"]')).toHaveCount(0);

			const menuButton = page.getByRole("button", { name: "Open navigation" });
			await menuButton.click();

			const modal = page.getByTestId("docs-navigation-modal");
			await expect(modal).toBeVisible();

			await page.getByTestId("docs-navigation-modal").getByText("Container").click();

			await expect(page).toHaveURL(/\/components\/layout\/container/);
			await expect(modal).toBeHidden();
		});
	});
});
