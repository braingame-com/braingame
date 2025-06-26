#!/usr/bin/env node

/**
 * Simple environment validation script for CI/CD
 *
 * Exits with code 0 if all required environment variables are present
 * Exits with code 1 if any are missing
 *
 * Usage in CI/CD:
 *   node scripts/validate-env.js
 */

const fs = require("fs");
const path = require("path");

// Define required environment variables per environment
const REQUIRED_VARS = {
	common: ["NODE_ENV"],
	production: ["SENTRY_DSN", "API_BASE_URL", "FIREBASE_PROJECT_ID"],
	development: [],
	test: [],
};

function validateEnv() {
	const nodeEnv = process.env.NODE_ENV || "development";
	const errors = [];

	console.log(`Validating environment variables for ${nodeEnv}...`);

	// Check common variables
	REQUIRED_VARS.common.forEach((varName) => {
		if (!process.env[varName]) {
			errors.push(`Missing required variable: ${varName}`);
		}
	});

	// Check environment-specific variables
	const envSpecificVars = REQUIRED_VARS[nodeEnv] || [];
	envSpecificVars.forEach((varName) => {
		if (!process.env[varName]) {
			errors.push(`Missing required variable for ${nodeEnv}: ${varName}`);
		}
	});

	// Report results
	if (errors.length > 0) {
		console.error("\n❌ Environment validation failed:");
		errors.forEach((error) => console.error(`  - ${error}`));
		console.error("\nPlease set the missing environment variables and try again.");
		process.exit(1);
	}

	console.log("✅ All required environment variables are set");

	// Additional warnings for production
	if (nodeEnv === "production") {
		const warnings = [];

		if (process.env.ENABLE_DEBUG_MODE === "true") {
			warnings.push("Debug mode is enabled in production");
		}

		if (!process.env.AMPLITUDE_API_KEY && !process.env.ANALYTICS_KEY) {
			warnings.push("No analytics configured for production");
		}

		if (warnings.length > 0) {
			console.log("\n⚠️  Production warnings:");
			warnings.forEach((warning) => console.log(`  - ${warning}`));
		}
	}

	process.exit(0);
}

// Run validation
validateEnv();
