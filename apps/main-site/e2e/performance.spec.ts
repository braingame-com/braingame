import { expect, test } from "@playwright/test";

test.describe("Performance", () => {
	test("should load within acceptable time", async ({ page }) => {
		const startTime = Date.now();
		await page.goto("/");
		await page.waitForLoadState("networkidle");
		const loadTime = Date.now() - startTime;

		// Page should load within 3 seconds
		expect(loadTime).toBeLessThan(3000);
	});

	test("should have good Core Web Vitals", async ({ page }) => {
		await page.goto("/");

		// Measure Largest Contentful Paint (LCP)
		const lcp = await page.evaluate(() => {
			return new Promise<number>((resolve) => {
				new PerformanceObserver((list) => {
					const entries = list.getEntries();
					const lastEntry = entries[entries.length - 1];
					resolve(lastEntry.startTime);
				}).observe({ entryTypes: ["largest-contentful-paint"] });
			});
		});

		// LCP should be under 2.5s for good performance
		expect(lcp).toBeLessThan(2500);

		// Measure First Input Delay (FID) - simulated
		const fidStart = Date.now();
		await page.click("body");
		const fidEnd = Date.now();
		const fid = fidEnd - fidStart;

		// FID should be under 100ms for good performance
		expect(fid).toBeLessThan(100);

		// Measure Cumulative Layout Shift (CLS)
		const cls = await page.evaluate(() => {
			return new Promise<number>((resolve) => {
				let clsScore = 0;
				new PerformanceObserver((list) => {
					for (const entry of list.getEntries()) {
						if (!(entry as any).hadRecentInput) {
							clsScore += (entry as any).value;
						}
					}
					resolve(clsScore);
				}).observe({ entryTypes: ["layout-shift"] });

				// Wait a bit to collect layout shifts
				setTimeout(() => resolve(clsScore), 1000);
			});
		});

		// CLS should be under 0.1 for good performance
		expect(cls).toBeLessThan(0.1);
	});

	test("should have optimized images", async ({ page }) => {
		await page.goto("/");

		// Check all images
		const images = await page.$$("img");
		for (const img of images) {
			// Check if image has loading attribute
			const loading = await img.getAttribute("loading");
			expect(["lazy", "eager"]).toContain(loading);

			// Check if image has proper dimensions
			const width = await img.getAttribute("width");
			const height = await img.getAttribute("height");
			expect(width || height).toBeTruthy();

			// Check if image has alt text
			const alt = await img.getAttribute("alt");
			expect(alt).toBeTruthy();
		}
	});

	test("should have efficient resource loading", async ({ page }) => {
		const resources: Array<{ url: string; size: number }> = [];

		page.on("response", async (response) => {
			const url = response.url();
			const headers = response.headers();
			const size = Number.parseInt(headers["content-length"] || "0");

			resources.push({
				url,
				size,
			});
		});

		const startTime = Date.now();
		await page.goto("/");
		await page.waitForLoadState("networkidle");
		const loadTime = Date.now() - startTime;

		// Check JavaScript bundle sizes
		const jsBundles = resources.filter((r) => r.url.includes(".js"));
		const totalJsSize = jsBundles.reduce((sum, bundle) => sum + bundle.size, 0);

		// Total JS should be under 500KB for good performance
		expect(totalJsSize).toBeLessThan(500 * 1024);

		// Check overall load time instead of individual resource timing
		expect(loadTime).toBeLessThan(5000); // 5s total load time
	});

	test("should minimize layout shifts", async ({ page }) => {
		await page.goto("/");

		// Wait for initial load
		await page.waitForLoadState("networkidle");

		// Measure layout stability during interaction
		const initialPositions = await page.evaluate(() => {
			const elements = document.querySelectorAll("*");
			return Array.from(elements).map((el) => {
				const rect = el.getBoundingClientRect();
				return {
					tag: el.tagName,
					top: rect.top,
					left: rect.left,
				};
			});
		});

		// Interact with the page
		await page.getByPlaceholder("Enter your email").fill("test@example.com");
		await page.waitForTimeout(100);

		// Check if elements moved
		const finalPositions = await page.evaluate(() => {
			const elements = document.querySelectorAll("*");
			return Array.from(elements).map((el) => {
				const rect = el.getBoundingClientRect();
				return {
					tag: el.tagName,
					top: rect.top,
					left: rect.left,
				};
			});
		});

		// Count significant layout shifts
		let shifts = 0;
		for (let i = 0; i < Math.min(initialPositions.length, finalPositions.length); i++) {
			const initial = initialPositions[i];
			const final = finalPositions[i];
			if (
				initial.tag === final.tag &&
				(Math.abs(initial.top - final.top) > 5 || Math.abs(initial.left - final.left) > 5)
			) {
				shifts++;
			}
		}

		// Should have minimal layout shifts
		expect(shifts).toBeLessThan(5);
	});

	test("should use efficient caching headers", async ({ page }) => {
		const responses: Array<{ url: string; cacheControl: string | null }> = [];

		page.on("response", (response) => {
			responses.push({
				url: response.url(),
				cacheControl: response.headers()["cache-control"],
			});
		});

		await page.goto("/");
		await page.waitForLoadState("networkidle");

		// Check static assets have proper caching
		const staticAssets = responses.filter(
			(r) => r.url.includes("/_next/static/") || r.url.includes(".js") || r.url.includes(".css"),
		);

		for (const asset of staticAssets) {
			expect(asset.cacheControl).toBeTruthy();
			// Should have long cache duration for static assets
			expect(asset.cacheControl).toMatch(/max-age=\d{5,}/);
		}
	});
});
