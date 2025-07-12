#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Required environment variables for production
const requiredEnvVars = {
	production: [
		"NEXT_PUBLIC_GA_MEASUREMENT_ID",
		"NEXT_PUBLIC_FIREBASE_PROJECT_ID",
		"NEXT_PUBLIC_API_URL",
	],
	development: [],
};

// Check if .env file exists
const envPath = path.join(__dirname, "..", ".env");
const envExamplePath = path.join(__dirname, "..", ".env.example");

if (!fs.existsSync(envPath) && process.env.NODE_ENV === "production") {
	console.error("❌ .env file not found in production!");
	console.error("Please create a .env file based on .env.example");
	process.exit(1);
}

// Validate required variables
const env = process.env.NODE_ENV || "development";
const required = requiredEnvVars[env] || [];
const missing = [];

for (const varName of required) {
	if (!process.env[varName]) {
		missing.push(varName);
	}
}

if (missing.length > 0) {
	console.error("❌ Missing required environment variables:");
	missing.forEach((varName) => {
		console.error(`  - ${varName}`);
	});
	console.error("\nPlease set these variables in your .env file or environment");
	process.exit(1);
}

// Warn about example values
const exampleValues = ["G-XXXXXXXXXX", "your-api-key-here", ""];
const warnings = [];

for (const [key, value] of Object.entries(process.env)) {
	if (key.startsWith("NEXT_PUBLIC_") && exampleValues.includes(value)) {
		warnings.push(key);
	}
}

if (warnings.length > 0) {
	console.warn("⚠️  Environment variables with example values:");
	warnings.forEach((varName) => {
		console.warn(`  - ${varName}`);
	});
	console.warn("\nMake sure to update these with real values before deploying");
}

console.log("✅ Environment validation passed!");