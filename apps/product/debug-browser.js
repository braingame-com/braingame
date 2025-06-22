const { chromium } = require("playwright");

async function debugExpoApp() {
	console.log("🚀 Starting browser debugging for Expo app...");

	const browser = await chromium.launch({
		headless: false,
		devtools: true,
		args: ["--disable-web-security", "--disable-features=VizDisplayCompositor"],
	});

	const context = await browser.newContext();
	const page = await context.newPage();

	// Listen to all console messages
	page.on("console", (msg) => {
		const type = msg.type();
		const text = msg.text();
		const location = msg.location();

		console.log(`\n[${type.toUpperCase()}] ${text}`);
		if (location.url) {
			console.log(`  at ${location.url}:${location.lineNumber}:${location.columnNumber}`);
		}
	});

	// Listen to page errors (uncaught exceptions)
	page.on("pageerror", (error) => {
		console.log(`\n[UNCAUGHT ERROR] ${error.message}`);
		console.log(`Stack: ${error.stack}`);
	});

	// Listen to response errors
	page.on("response", (response) => {
		if (!response.ok()) {
			console.log(`\n[HTTP ERROR] ${response.status()} ${response.url()}`);
		}
	});

	// Listen to request failures
	page.on("requestfailed", (request) => {
		console.log(`\n[REQUEST FAILED] ${request.failure().errorText} ${request.url()}`);
	});

	console.log("📱 Navigating to Expo app at http://localhost:8087...");

	try {
		await page.goto("http://localhost:8087", { waitUntil: "networkidle" });
		console.log("✅ Page loaded successfully");

		// Wait for React to load and check for errors
		await page.waitForTimeout(3000);

		// Try to detect React errors
		const hasReactErrors = await page.evaluate(() => {
			return window.console.error.toString().includes("Invalid hook call");
		});

		if (hasReactErrors) {
			console.log("🔍 React hooks error detected!");
		}

		console.log("\n📋 Browser console is now being monitored. Press Ctrl+C to stop.");
		console.log("🌐 Browser window should be open for manual inspection.");

		// Keep the script running to capture logs
		await new Promise(() => {}); // Run indefinitely
	} catch (error) {
		console.error(`❌ Failed to load page: ${error.message}`);
	} finally {
		await browser.close();
	}
}

// Handle graceful shutdown
process.on("SIGINT", () => {
	console.log("\n👋 Shutting down browser debugging...");
	process.exit(0);
});

debugExpoApp().catch(console.error);
