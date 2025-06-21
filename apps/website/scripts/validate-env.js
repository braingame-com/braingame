#!/usr/bin/env node

/**
 * Environment Variable Validation Script for Website
 * Validates Next.js environment variables against schema
 */

const { validateEnv, WebsiteEnvSchema } = require("@braingame/utils");
const chalk = require("chalk");

// Colored output helpers
const log = {
	info: (msg) => console.log(chalk.blue("[INFO]"), msg),
	success: (msg) => console.log(chalk.green("[SUCCESS]"), msg),
	warning: (msg) => console.log(chalk.yellow("[WARNING]"), msg),
	error: (msg) => console.log(chalk.red("[ERROR]"), msg),
};

// Validate environment
log.info("Validating website environment variables...\n");

const result = validateEnv(WebsiteEnvSchema, process.env, {
	reportMissing: true,
	checkSecurity: true,
});

// Report validation results
if (result.success) {
	log.success("✅ Environment validation passed!\n");

	// Show validated values (masked for security)
	console.log(chalk.bold("Validated Configuration:"));
	Object.entries(result.data).forEach(([key, value]) => {
		const displayValue = key.includes("KEY") || key.includes("SECRET") ? "***" : value;
		console.log(`  ${key}: ${chalk.cyan(displayValue)}`);
	});
} else {
	log.error("❌ Environment validation failed!\n");

	// Show errors
	console.log(chalk.bold("Errors:"));
	result.errors.forEach((error) => {
		console.log(`  • ${error}`);
	});
}

// Show warnings if any
if (result.warnings.length > 0) {
	console.log("\n" + chalk.bold("Warnings:"));
	result.warnings.forEach((warning) => {
		log.warning(`  • ${warning}`);
	});
}

// Exit with appropriate code
process.exit(result.success ? 0 : 1);
