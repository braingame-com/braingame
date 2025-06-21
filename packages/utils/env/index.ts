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

// Schema exports
export {
	ProductAppEnvSchema,
	WebsiteEnvSchema,
	ProductionEnvSchema,
	type ProductAppEnv,
	type WebsiteEnv,
	type ProductionEnv,
} from "./schemas";

// Validator exports
export {
	validateEnv,
	validateProductAppEnv,
	validateWebsiteEnv,
	validateProductionEnv,
	validateAppEnv,
	createEnvConfig,
	type EnvValidationResult,
	type EnvValidationOptions,
} from "./validator";

// Convenience re-exports
export { z } from "zod";