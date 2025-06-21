import type { z } from "zod";
import { ProductAppEnvSchema, ProductionEnvSchema, WebsiteEnvSchema } from "./schemas";

/**
 * Environment validation result
 */
export interface EnvValidationResult<T = unknown> {
	success: boolean;
	data?: T;
	errors?: string[];
	warnings?: string[];
}

/**
 * Environment validation options
 */
export interface EnvValidationOptions {
	/** Whether to throw on validation failure */
	throwOnError?: boolean;
	/** Whether to log validation results */
	logResults?: boolean;
	/** Custom logger function */
	logger?: (message: string) => void;
}

/**
 * Validates environment variables against a Zod schema
 */
export function validateEnv<T>(
	schema: z.ZodSchema<T>,
	env: Record<string, string | undefined> = process.env,
	options: EnvValidationOptions = {},
): EnvValidationResult<T> {
	const { throwOnError = false, logResults = true, logger = console.log } = options;

	try {
		// Parse and validate the environment
		const result = schema.safeParse(env);

		if (result.success) {
			if (logResults) {
				logger("✅ Environment validation passed");
			}
			return {
				success: true,
				data: result.data,
				warnings: checkForWarnings(result.data, env),
			};
		}
		const errors = result.error.errors.map((err) => `${err.path.join(".")}: ${err.message}`);

		if (logResults) {
			logger("❌ Environment validation failed:");
			errors.forEach((error) => logger(`  - ${error}`));
		}

		const validationResult: EnvValidationResult<T> = {
			success: false,
			errors,
		};

		if (throwOnError) {
			throw new Error(`Environment validation failed:\n${errors.join("\n")}`);
		}

		return validationResult;
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : "Unknown validation error";

		if (logResults) {
			logger(`❌ Environment validation error: ${errorMessage}`);
		}

		const validationResult: EnvValidationResult<T> = {
			success: false,
			errors: [errorMessage],
		};

		if (throwOnError) {
			throw error;
		}

		return validationResult;
	}
}

/**
 * Check for potential warnings in environment configuration
 */
function checkForWarnings<T>(_data: T, env: Record<string, string | undefined>): string[] {
	const warnings: string[] = [];

	// Check for default/example values that should be changed
	const dangerousDefaults = [
		"your-secret-here",
		"your-api-key-here",
		"your-sentry-dsn-here",
		"your-amplitude-key-here",
		"your_api_key_here",
		"your_project_id",
		"your_sender_id",
		"your_app_id",
		"your-super-secure-jwt-secret-here",
		"your-32-character-encryption-key",
	];

	for (const [key, value] of Object.entries(env)) {
		if (value && dangerousDefaults.some((dangerous) => value.includes(dangerous))) {
			warnings.push(`${key} appears to contain a default/example value`);
		}
	}

	// Check for missing optional but recommended variables
	const recommendedVars = ["SENTRY_DSN", "ANALYTICS_KEY"];
	for (const varName of recommendedVars) {
		if (!env[varName] || env[varName] === "") {
			warnings.push(`${varName} is not set (recommended for production)`);
		}
	}

	// Check for development settings in production
	if (env.NODE_ENV === "production") {
		const devSettings = [
			"FLIPPER_ENABLED",
			"REACTOTRON_ENABLED",
			"DEV_MENU_ENABLED",
			"ENABLE_DEBUG_MODE",
		];

		for (const setting of devSettings) {
			if (env[setting] === "true") {
				warnings.push(`${setting} is enabled in production (security risk)`);
			}
		}
	}

	return warnings;
}

/**
 * Validates React Native Product App environment
 */
export function validateProductAppEnv(
	env: Record<string, string | undefined> = process.env,
	options?: EnvValidationOptions,
) {
	return validateEnv(ProductAppEnvSchema, env, options);
}

/**
 * Validates Next.js Website environment
 */
export function validateWebsiteEnv(
	env: Record<string, string | undefined> = process.env,
	options?: EnvValidationOptions,
) {
	return validateEnv(WebsiteEnvSchema, env, options);
}

/**
 * Validates production environment with stricter requirements
 */
export function validateProductionEnv(
	env: Record<string, string | undefined> = process.env,
	options?: EnvValidationOptions,
) {
	return validateEnv(ProductionEnvSchema, env, options);
}

/**
 * Validates environment with automatic schema detection
 */
export function validateAppEnv(
	appType: "product" | "website",
	env: Record<string, string | undefined> = process.env,
	options?: EnvValidationOptions,
) {
	switch (appType) {
		case "product":
			return validateProductAppEnv(env, options);
		case "website":
			return validateWebsiteEnv(env, options);
		default:
			throw new Error(`Unknown app type: ${appType}`);
	}
}

/**
 * Creates a type-safe environment configuration
 */
export function createEnvConfig<T>(
	schema: z.ZodSchema<T>,
	env: Record<string, string | undefined> = process.env,
): T {
	const result = validateEnv(schema, env, { throwOnError: true });
	return result.data as T;
}
