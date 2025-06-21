/**
 * Environment validation utilities for Brain Game
 *
 * Provides type-safe environment variable validation using Zod schemas
 * with support for React Native and Next.js applications.
 *
 * @example
 * ```typescript
 * import { validateProductAppEnv, createEnvConfig, ProductAppEnvSchema } from '@braingame/utils/env';
 *
 * // Validate current environment
 * const result = validateProductAppEnv();
 * if (!result.success) {
 *   console.error('Environment validation failed:', result.errors);
 * }
 *
 * // Create type-safe config
 * const config = createEnvConfig(ProductAppEnvSchema);
 * console.log(config.API_BASE_URL); // Type-safe access
 * ```
 */

// Convenience re-exports
export { z } from "zod";
// Schema exports
export {
	type ProductAppEnv,
	ProductAppEnvSchema,
	type ProductionEnv,
	ProductionEnvSchema,
	type WebsiteEnv,
	WebsiteEnvSchema,
} from "./schemas";
// Validator exports
export {
	createEnvConfig,
	type EnvValidationOptions,
	type EnvValidationResult,
	validateAppEnv,
	validateEnv,
	validateProductAppEnv,
	validateProductionEnv,
	validateWebsiteEnv,
} from "./validator";
