#!/usr/bin/env ts-node

import chalk from "chalk";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { z } from "zod";
import { ProductAppEnvSchema, WebsiteEnvSchema } from "../packages/utils/env/schemas";

/**
 * Environment Check Script
 *
 * Validates environment variables for all apps in the monorepo.
 * Ensures all required variables are set and valid before running apps.
 *
 * Usage:
 *   pnpm check:env              # Check all apps
 *   pnpm check:env product      # Check specific app
 *   pnpm check:env --fix        # Create missing .env files from .env.example
 */

interface AppConfig {
	name: string;
	path: string;
	schema: z.ZodSchema;
	envFile: string;
	exampleFile: string;
}

const APPS: AppConfig[] = [
	{
		name: "product",
		path: resolve(__dirname, "../apps/product"),
		schema: ProductAppEnvSchema,
		envFile: ".env",
		exampleFile: ".env.example",
	},
	{
		name: "main-site",
		path: resolve(__dirname, "../apps/main-site"),
		schema: WebsiteEnvSchema,
		envFile: ".env.local",
		exampleFile: ".env.example",
	},
	{
		name: "docs-site",
		path: resolve(__dirname, "../apps/docs-site"),
		schema: z.object({}), // Docs site doesn't require env vars
		envFile: ".env.local",
		exampleFile: ".env.example",
	},
];

function loadEnvFile(filePath: string): Record<string, string> {
	if (!existsSync(filePath)) {
		return {};
	}

	const content = readFileSync(filePath, "utf-8");
	const env: Record<string, string> = {};

	content.split("\n").forEach((line) => {
		const trimmedLine = line.trim();

		// Skip empty lines and comments
		if (!trimmedLine || trimmedLine.startsWith("#")) {
			return;
		}

		const [key, ...valueParts] = trimmedLine.split("=");
		if (key) {
			const value = valueParts.join("=").trim();
			// Remove quotes if present
			env[key.trim()] = value.replace(/^["']|["']$/g, "");
		}
	});

	return env;
}

function printError(message: string) {
	console.error(chalk.red("✗"), message);
}

function printSuccess(message: string) {
	console.log(chalk.green("✓"), message);
}

function printWarning(message: string) {
	console.log(chalk.yellow("⚠"), message);
}

function printInfo(message: string) {
	console.log(chalk.blue("ℹ"), message);
}

function checkApp(app: AppConfig, fix = false): boolean {
	console.log(chalk.bold(`\nChecking ${app.name}...`));

	const envPath = resolve(app.path, app.envFile);
	const examplePath = resolve(app.path, app.exampleFile);

	// Check if .env.example exists
	if (!existsSync(examplePath)) {
		printWarning(`No ${app.exampleFile} found at ${app.path}`);
	}

	// Check if .env file exists
	if (!existsSync(envPath)) {
		printError(`No ${app.envFile} found at ${app.path}`);

		if (fix && existsSync(examplePath)) {
			// Copy .env.example to .env
			const exampleContent = readFileSync(examplePath, "utf-8");
			require("fs").writeFileSync(envPath, exampleContent);
			printSuccess(`Created ${app.envFile} from ${app.exampleFile}`);
		} else {
			printInfo(`Run with --fix to create ${app.envFile} from ${app.exampleFile}`);
			return false;
		}
	}

	// Load and validate environment variables
	const env = loadEnvFile(envPath);

	try {
		// Parse with the schema
		const parsed = app.schema.parse(env);

		// Count total variables
		const totalVars = Object.keys(parsed).length;
		printSuccess(`All ${totalVars} environment variables are valid`);

		// Check for production-specific requirements
		if (env.NODE_ENV === "production") {
			checkProductionRequirements(app.name, env);
		}

		return true;
	} catch (error) {
		if (error instanceof z.ZodError) {
			printError("Environment validation failed:");

			error.errors.forEach((err) => {
				const path = err.path.join(".");
				const message = err.message;

				if (err.code === "invalid_type" && err.received === "undefined") {
					printError(`  ${path}: Missing required variable`);
				} else {
					printError(`  ${path}: ${message}`);
				}
			});

			// Show which variables are missing (only for object schemas)
			const schemaKeys = app.schema._def.typeName === "ZodObject" 
				? Object.keys(app.schema.shape || {})
				: [];
			const envKeys = Object.keys(env);
			const missingKeys = schemaKeys.filter((key) => !envKeys.includes(key));

			if (missingKeys.length > 0) {
				console.log(chalk.yellow("\nMissing variables:"));
				missingKeys.forEach((key) => {
					console.log(chalk.gray(`  - ${key}`));
				});
			}

			return false;
		}
		throw error;
	}
}

function checkProductionRequirements(appName: string, env: Record<string, string>) {
	console.log(chalk.bold("\nProduction checks:"));

	const warnings: string[] = [];

	// Check for default/example values
	if (env.JWT_SECRET && env.JWT_SECRET.length < 64) {
		warnings.push("JWT_SECRET should be at least 64 characters in production");
	}

	if (env.ENCRYPTION_KEY && env.ENCRYPTION_KEY === "12345678901234567890123456789012") {
		warnings.push("ENCRYPTION_KEY appears to be using the example value");
	}

	if (!env.SENTRY_DSN) {
		warnings.push("SENTRY_DSN should be configured for error tracking in production");
	}

	if (!env.ANALYTICS_KEY && !env.AMPLITUDE_API_KEY) {
		warnings.push("Analytics should be configured for production");
	}

	if (warnings.length > 0) {
		warnings.forEach((warning) => printWarning(warning));
	} else {
		printSuccess("All production requirements met");
	}
}

async function main() {
	const args = process.argv.slice(2);
	const fix = args.includes("--fix");
	const specificApp = args.find((arg) => !arg.startsWith("--"));

	console.log(chalk.bold.blue("🔍 Environment Configuration Check\n"));

	let appsToCheck = APPS;

	if (specificApp) {
		const app = APPS.find((a) => a.name === specificApp);
		if (!app) {
			printError(`Unknown app: ${specificApp}`);
			printInfo(`Available apps: ${APPS.map((a) => a.name).join(", ")}`);
			process.exit(1);
		}
		appsToCheck = [app];
	}

	let allValid = true;

	for (const app of appsToCheck) {
		const isValid = checkApp(app, fix);
		if (!isValid) {
			allValid = false;
		}
	}

	console.log(chalk.bold("\n📊 Summary:"));

	if (allValid) {
		printSuccess("All environment configurations are valid!");

		// Additional tips
		console.log(chalk.dim("\nTips:"));
		console.log(chalk.dim("  • Use different .env files for different environments"));
		console.log(chalk.dim("  • Never commit .env files to version control"));
		console.log(chalk.dim("  • Keep .env.example files up to date"));
		console.log(chalk.dim("  • Use strong, unique values for secrets in production"));
	} else {
		printError("Some environment configurations are invalid");
		printInfo("Fix the issues above and run this script again");
		process.exit(1);
	}
}

// Run the script
main().catch((error) => {
	console.error(chalk.red("Unexpected error:"), error);
	process.exit(1);
});
