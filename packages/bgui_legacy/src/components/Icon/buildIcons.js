#!/usr/bin/env node

/**
 * Build script to generate icon registry from Material Symbols SVG files
 * This script reads SVG files and extracts their path data to create a registry
 */

const fs = require("node:fs").promises;
const path = require("node:path");

// Path to Material Symbols SVG files
const SVG_SOURCE_PATH = path.join(process.cwd(), "node_modules/@material-symbols/svg-400/rounded");
const OUTPUT_PATH = path.join(__dirname, "iconRegistry.ts");

// Common icons to include in the initial build (can be expanded)
const ICON_NAMES = [
	// Navigation
	"home",
	"menu",
	"close",
	"arrow_back",
	"arrow_forward",
	"chevron_left",
	"chevron_right",
	"expand_more",
	"expand_less",
	"more_vert",
	"more_horiz",

	// Actions
	"search",
	"favorite",
	"favorite_border",
	"share",
	"download",
	"upload",
	"delete",
	"edit",
	"save",
	"add",
	"remove",
	"check",
	"clear",
	"refresh",
	"sync",

	// Communication
	"mail",
	"call",
	"chat",
	"message",
	"notifications",
	"notifications_off",

	// Content
	"copy",
	"paste",
	"content_copy",
	"content_paste",
	"link",
	"attachment",

	// Media
	"play_arrow",
	"pause",
	"stop",
	"skip_next",
	"skip_previous",
	"volume_up",
	"volume_off",
	"image",
	"photo_camera",
	"videocam",
	"mic",
	"mic_off",

	// User
	"person",
	"people",
	"group",
	"account_circle",
	"login",
	"logout",

	// Status
	"info",
	"warning",
	"error",
	"check_circle",
	"cancel",
	"help",
	"help_outline",
	"visibility",
	"visibility_off",
	"lock",
	"lock_open",

	// Other common
	"settings",
	"dashboard",
	"calendar_today",
	"schedule",
	"location_on",
	"star",
	"star_border",
	"bookmark",
	"bookmark_border",
	"filter_list",
	"sort",

	// Additional useful icons
	"dark_mode",
	"light_mode",
	"language",
	"translate",
	"code",
	"bug_report",
	"analytics",
	"trending_up",
	"trending_down",
	"attach_money",
	"shopping_cart",
	"work",
	"school",
	"sports_esports",
	"fitness_center",
	"restaurant",
	"local_cafe",
];

async function extractSvgPath(svgContent) {
	// Extract the path data from the SVG
	const pathMatch = svgContent.match(/<path[^>]*d="([^"]+)"/);
	if (pathMatch?.[1]) {
		return pathMatch[1];
	}
	return null;
}

async function buildIconRegistry() {
	console.log("🏗️  Building icon registry...");

	const iconRegistry = {};
	const iconTypes = [];
	let successCount = 0;
	let errorCount = 0;

	for (const iconName of ICON_NAMES) {
		try {
			const svgPath = path.join(SVG_SOURCE_PATH, `${iconName}.svg`);
			const svgContent = await fs.readFile(svgPath, "utf-8");
			const pathData = await extractSvgPath(svgContent);

			if (pathData) {
				iconRegistry[iconName] = pathData;
				iconTypes.push(iconName);
				successCount++;
				console.log(`✅ ${iconName}`);
			} else {
				console.error(`❌ ${iconName} - Could not extract path data`);
				errorCount++;
			}
		} catch (error) {
			console.error(`❌ ${iconName} - ${error.message}`);
			errorCount++;
		}
	}

	// Generate TypeScript file
	const output = `/**
 * Auto-generated icon registry from Material Symbols SVG files
 * Generated on: ${new Date().toISOString()}
 * Icons included: ${successCount}
 */

export const iconRegistry = {
${Object.entries(iconRegistry)
	.map(([name, path]) => `  "${name}": "${path}"`)
	.join(",\n")}
} as const;

export type IconName = keyof typeof iconRegistry;

// Export list of available icons for documentation
export const availableIcons: IconName[] = [
${iconTypes.map((name) => `  "${name}"`).join(",\n")}
];
`;

	await fs.writeFile(OUTPUT_PATH, output);

	console.log(`
✨ Icon registry built successfully!
   - Icons processed: ${successCount}
   - Errors: ${errorCount}
   - Output: ${OUTPUT_PATH}
  `);
}

// Run the build
buildIconRegistry().catch((error) => {
	console.error("Failed to build icon registry:", error);
	process.exit(1);
});
