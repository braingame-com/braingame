#!/usr/bin/env ts-node
/**
 * Script to automatically apply error boundaries to screens
 * Run this to ensure all screens have proper error handling
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { glob } from "glob";

const SCREENS_DIR = path.join(__dirname, "../screens");
const ERROR_BOUNDARY_IMPORT =
	"import { withScreenErrorBoundary } from '@/components/ErrorBoundary';\n";

interface ScreenInfo {
	filePath: string;
	screenName: string;
	hasErrorBoundary: boolean;
	exportType: "default" | "named" | "none";
}

/**
 * Check if a file already has error boundary
 */
function hasErrorBoundary(content: string): boolean {
	return (
		content.includes("withScreenErrorBoundary") ||
		content.includes("withErrorBoundary") ||
		content.includes("ErrorBoundary")
	);
}

/**
 * Get screen name from file path
 */
function getScreenName(filePath: string): string {
	const fileName = path.basename(filePath, ".tsx");
	return fileName.replace(/Screen$/, "");
}

/**
 * Detect export type in file
 */
function detectExportType(content: string): ScreenInfo["exportType"] {
	if (/export\s+default\s+/.test(content)) {
		return "default";
	}
	if (/export\s+{\s*\w+\s*}/.test(content)) {
		return "named";
	}
	return "none";
}

/**
 * Apply error boundary to screen file
 */
function applyErrorBoundaryToFile(screenInfo: ScreenInfo): void {
	const content = fs.readFileSync(screenInfo.filePath, "utf-8");

	if (screenInfo.hasErrorBoundary) {
		console.log(`✓ ${screenInfo.screenName} already has error boundary`);
		return;
	}

	let newContent = content;

	// Add import if not exists
	if (!content.includes("@/components/ErrorBoundary")) {
		const importIndex = content.lastIndexOf("import");
		const nextLineIndex = content.indexOf("\n", importIndex);
		newContent =
			content.slice(0, nextLineIndex + 1) +
			ERROR_BOUNDARY_IMPORT +
			content.slice(nextLineIndex + 1);
	}

	// Apply error boundary based on export type
	if (screenInfo.exportType === "default") {
		// Find the component definition
		const componentMatch = content.match(/const\s+(\w+)\s*=\s*\(/);
		if (componentMatch) {
			const componentName = componentMatch[1];

			// Replace default export
			newContent = newContent.replace(
				/export\s+default\s+\w+;?/,
				`export default withScreenErrorBoundary(${componentName}, '${screenInfo.screenName}');`,
			);
		}
	} else if (screenInfo.exportType === "named") {
		// Handle named exports
		const exportMatch = content.match(/export\s+{\s*(\w+)\s*}/);
		if (exportMatch) {
			const componentName = exportMatch[1];

			// Create wrapped version
			const wrappedExport = `\nexport const ${componentName} = withScreenErrorBoundary(${componentName}Component, '${screenInfo.screenName}');\n`;

			// Rename original component
			newContent = newContent.replace(
				new RegExp(`const\\s+${componentName}\\s*=`),
				`const ${componentName}Component =`,
			);

			// Add wrapped export
			newContent = newContent.replace(
				/export\s+{\s*\w+\s*}/,
				`${wrappedExport}export { ${componentName} }`,
			);
		}
	}

	// Write updated content
	fs.writeFileSync(screenInfo.filePath, newContent);
	console.log(`✓ Applied error boundary to ${screenInfo.screenName}`);
}

/**
 * Analyze all screens
 */
function analyzeScreens(): ScreenInfo[] {
	const screenFiles = glob.sync(`${SCREENS_DIR}/**/*Screen.tsx`);
	const screens: ScreenInfo[] = [];

	for (const filePath of screenFiles) {
		const content = fs.readFileSync(filePath, "utf-8");
		const screenName = getScreenName(filePath);

		screens.push({
			filePath,
			screenName,
			hasErrorBoundary: hasErrorBoundary(content),
			exportType: detectExportType(content),
		});
	}

	return screens;
}

/**
 * Generate report
 */
function generateReport(screens: ScreenInfo[]): void {
	const total = screens.length;
	const withBoundary = screens.filter((s) => s.hasErrorBoundary).length;
	const withoutBoundary = total - withBoundary;

	console.log("\n📊 Error Boundary Coverage Report");
	console.log("================================");
	console.log(`Total screens: ${total}`);
	console.log(
		`With error boundary: ${withBoundary} (${((withBoundary / total) * 100).toFixed(1)}%)`,
	);
	console.log(
		`Without error boundary: ${withoutBoundary} (${((withoutBoundary / total) * 100).toFixed(1)}%)`,
	);

	if (withoutBoundary > 0) {
		console.log("\n⚠️  Screens missing error boundaries:");
		screens
			.filter((s) => !s.hasErrorBoundary)
			.forEach((s) => {
				console.log(`   - ${s.screenName}`);
			});
	}

	console.log("\n");
}

/**
 * Main function
 */
function main() {
	console.log("🔍 Analyzing screens for error boundaries...\n");

	const screens = analyzeScreens();
	generateReport(screens);

	const screensWithoutBoundary = screens.filter((s) => !s.hasErrorBoundary);

	if (screensWithoutBoundary.length === 0) {
		console.log("✅ All screens have error boundaries!");
		return;
	}

	// In CI, just report
	if (process.env.CI) {
		process.exit(1);
	}

	// In development, offer to fix
	if (process.argv.includes("--fix")) {
		console.log("🔧 Applying error boundaries...\n");

		for (const screen of screensWithoutBoundary) {
			try {
				applyErrorBoundaryToFile(screen);
			} catch (error) {
				console.error(`❌ Failed to process ${screen.screenName}:`, error);
			}
		}

		console.log("\n✅ Done! Please review the changes and test your screens.");
	} else {
		console.log("💡 Run with --fix flag to automatically apply error boundaries");
		console.log("   npm run apply-error-boundaries -- --fix");
	}
}

// Run the script
try {
	main();
} catch (error) {
	console.error(error);
}
