#!/usr/bin/env node

/**
 * Environment validation script for Brain Game Product App
 * Validates that all required environment variables are properly configured
 */

const { validateProductAppEnv, validateProductionEnv } = require("@braingame/utils/env");
const fs = require("fs");
const path = require("path");

// Colors for console output
const colors = {
	green: "\x1b[32m",
	red: "\x1b[31m",
	yellow: "\x1b[33m",
	blue: "\x1b[34m",
	reset: "\x1b[0m",
	bold: "\x1b[1m",
};

function log(color, message) {
	console.log(`${color}${message}${colors.reset}`);
}

function logSection(title) {
	console.log(`\n${colors.blue}${colors.bold}=== ${title} ===${colors.reset}`);
}

async function validateEnvironment() {
	logSection("Brain Game Product App - Environment Validation");

	// Check if .env files exist
	const envFiles = [".env", ".env.local", ".env.development", ".env.production"];
	const existingEnvFiles = envFiles.filter((file) => fs.existsSync(path.join(process.cwd(), file)));

	if (existingEnvFiles.length === 0) {
		log(colors.yellow, "⚠️  No .env files found. Using .env.example as reference.");
		log(colors.blue, "Create .env.local from .env.example for development.");
	} else {
		log(colors.green, `✅ Found environment files: ${existingEnvFiles.join(", ")}`);
	}

	// Load environment variables
	try {
		require("dotenv").config({ path: ".env.local" });
		require("dotenv").config({ path: ".env" });
	} catch (error) {
		// dotenv not installed, use process.env
	}

	// Validate current environment
	console.log("\n🔍 Validating current environment...");
	const result = validateProductAppEnv(process.env, { logResults: false });

	if (result.success) {
		log(colors.green, "✅ Environment validation passed!");

		// Show warnings if any
		if (result.warnings && result.warnings.length > 0) {
			console.log("\n⚠️  Warnings:");
			result.warnings.forEach((warning) => {
				log(colors.yellow, `  - ${warning}`);
			});
		}

		// Show configuration summary
		console.log("\n📋 Configuration Summary:");
		const env = result.data;
		console.log(`  App Name: ${env.APP_NAME}`);
		console.log(`  Version: ${env.APP_VERSION}`);
		console.log(`  Environment: ${env.NODE_ENV}`);
		console.log(`  API URL: ${env.API_BASE_URL}`);
		console.log(`  Analytics: ${env.ENABLE_ANALYTICS ? "Enabled" : "Disabled"}`);
		console.log(`  Error Reporting: ${env.ENABLE_ERROR_REPORTING ? "Enabled" : "Disabled"}`);
		console.log(`  Debug Mode: ${env.ENABLE_DEBUG_MODE ? "Enabled" : "Disabled"}`);
	} else {
		log(colors.red, "❌ Environment validation failed!");
		console.log("\nErrors:");
		result.errors?.forEach((error) => {
			log(colors.red, `  - ${error}`);
		});
		console.log("\n💡 Fix these issues and run validation again.");
		process.exit(1);
	}

	// Additional production validation if in production
	if (process.env.NODE_ENV === "production") {
		console.log("\n🏭 Running production-specific validation...");
		const prodResult = validateProductionEnv(process.env, { logResults: false });

		if (prodResult.success) {
			log(colors.green, "✅ Production validation passed!");
		} else {
			log(colors.red, "❌ Production validation failed!");
			console.log("\nProduction errors:");
			prodResult.errors?.forEach((error) => {
				log(colors.red, `  - ${error}`);
			});
			process.exit(1);
		}
	}

	// Show next steps
	console.log("\n🚀 Next Steps:");
	if (process.env.NODE_ENV === "development") {
		console.log("  • Start development: npm run dev");
		console.log("  • Run tests: npm run test");
		console.log("  • Build app: npm run build");
	} else {
		console.log("  • Ensure all production secrets are properly configured");
		console.log("  • Run deployment checks");
		console.log("  • Monitor application startup");
	}

	console.log("\n✨ Environment validation complete!\n");
}

// Run validation
validateEnvironment().catch((error) => {
	log(colors.red, `\n❌ Validation script failed: ${error.message}`);
	process.exit(1);
});
