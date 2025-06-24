#!/usr/bin/env node

/**
 * Environment Variable Validation Script for Website
 * Validates Next.js environment variables against schema
 */

const { validateEnv, WebsiteEnvSchema } = require("@braingame/utils");

// Colors for console output
const colors = {
	blue: "\x1b[34m",
	green: "\x1b[32m",
	yellow: "\x1b[33m",
	red: "\x1b[31m",
	reset: "\x1b[0m",
};

// Colored output helpers
const log = {
	info: (msg) => console.log(`${colors.blue}[INFO]${colors.reset}`, msg),
	success: (msg) => console.log(`${colors.green}[SUCCESS]${colors.reset}`, msg),
	warning: (msg) => console.log(`${colors.yellow}[WARNING]${colors.reset}`, msg),
	error: (msg) => console.log(`${colors.red}[ERROR]${colors.reset}`, msg),
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
	console.log(`${colors.reset}\x1b[1mValidated Configuration:\x1b[0m`);
	Object.entries(result.data).forEach(([key, value]) => {
		const displayValue = key.includes("KEY") || key.includes("SECRET") ? "***" : value;
		console.log(`  ${key}: \x1b[36m${displayValue}${colors.reset}`);
	});
} else {
	log.error("❌ Environment validation failed!\n");

	// Show errors
	console.log(`${colors.reset}\x1b[1mErrors:\x1b[0m`);
	result.errors.forEach((error) => {
		console.log(`  • ${error}`);
	});
}

// Show warnings if any
if (result.warnings.length > 0) {
	console.log(`\n${colors.reset}\x1b[1mWarnings:\x1b[0m`);
	result.warnings.forEach((warning) => {
		log.warning(`  • ${warning}`);
	});
}

// Exit with appropriate code
process.exit(result.success ? 0 : 1);
