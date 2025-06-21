import { z } from "zod";

/**
 * Base environment schema with common variables
 */
const BaseEnvSchema = z.object({
	NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
	APP_NAME: z.string().min(1, "App name is required"),
	APP_VERSION: z.string().regex(/^\d+\.\d+\.\d+$/, "Version must be in semver format (x.y.z)"),
});

/**
 * API configuration schema
 */
const ApiConfigSchema = z.object({
	API_BASE_URL: z.string().url("API base URL must be a valid URL"),
	API_TIMEOUT: z.coerce.number().min(1000).max(60000).default(30000),
	API_RETRY_ATTEMPTS: z.coerce.number().min(0).max(10).default(3),
});

/**
 * Security configuration schema
 */
const SecurityConfigSchema = z.object({
	JWT_SECRET: z.string().min(32, "JWT secret must be at least 32 characters"),
	SESSION_TIMEOUT: z.coerce.number().min(300000).default(3600000), // Min 5 minutes
	ENCRYPTION_KEY: z.string().length(32, "Encryption key must be exactly 32 characters"),
});

/**
 * Analytics and monitoring schema
 */
const AnalyticsSchema = z.object({
	ANALYTICS_KEY: z.string().optional(),
	SENTRY_DSN: z.string().url().optional(),
	AMPLITUDE_API_KEY: z.string().optional(),
});

/**
 * Feature flags schema
 */
const FeatureFlagsSchema = z.object({
	ENABLE_ANALYTICS: z.coerce.boolean().default(false),
	ENABLE_ERROR_REPORTING: z.coerce.boolean().default(true),
	ENABLE_DEBUG_MODE: z.coerce.boolean().default(false),
	ENABLE_PERFORMANCE_MONITORING: z.coerce.boolean().default(true),
});

/**
 * Development tools schema
 */
const DevToolsSchema = z.object({
	FLIPPER_ENABLED: z.coerce.boolean().default(false),
	REACTOTRON_ENABLED: z.coerce.boolean().default(false),
	DEV_MENU_ENABLED: z.coerce.boolean().default(false),
	BUNDLE_ANALYZER_ENABLED: z.coerce.boolean().default(false),
});

/**
 * Firebase configuration schema
 */
const FirebaseSchema = z.object({
	FIREBASE_API_KEY: z.string().min(1, "Firebase API key is required"),
	FIREBASE_AUTH_DOMAIN: z
		.string()
		.regex(/^[\w-]+\.firebaseapp\.com$/, "Invalid Firebase auth domain"),
	FIREBASE_PROJECT_ID: z.string().min(1, "Firebase project ID is required"),
	FIREBASE_STORAGE_BUCKET: z
		.string()
		.regex(/^[\w-]+\.appspot\.com$/, "Invalid Firebase storage bucket"),
	FIREBASE_MESSAGING_SENDER_ID: z
		.string()
		.regex(/^\d+$/, "Firebase messaging sender ID must be numeric"),
	FIREBASE_APP_ID: z.string().min(1, "Firebase app ID is required"),
});

/**
 * React Native Product App Environment Schema
 * For the main mobile application
 */
export const ProductAppEnvSchema = BaseEnvSchema.merge(ApiConfigSchema)
	.merge(SecurityConfigSchema)
	.merge(AnalyticsSchema)
	.merge(FeatureFlagsSchema)
	.merge(DevToolsSchema);

/**
 * Next.js Website Environment Schema
 * For the marketing/web application
 */
export const WebsiteEnvSchema = z.object({
	// Next.js requires NEXT_PUBLIC_ prefix for client-side variables
	NEXT_PUBLIC_APP_NAME: z.string().min(1, "App name is required"),
	NEXT_PUBLIC_APP_VERSION: z.string().regex(/^\d+\.\d+\.\d+$/, "Version must be in semver format"),
	NEXT_PUBLIC_API_BASE_URL: z.string().url("API base URL must be a valid URL"),
	NEXT_PUBLIC_API_TIMEOUT: z.coerce.number().min(1000).max(60000).default(30000),
	NEXT_PUBLIC_ANALYTICS_KEY: z.string().optional(),
	NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
	NEXT_PUBLIC_ENABLE_ANALYTICS: z.coerce.boolean().default(false),
	NEXT_PUBLIC_ENABLE_ERROR_REPORTING: z.coerce.boolean().default(true),

	// Firebase config with NEXT_PUBLIC_ prefix
	NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1, "Firebase API key is required"),
	NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z
		.string()
		.regex(/^[\w-]+\.firebaseapp\.com$/, "Invalid Firebase auth domain"),
	NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1, "Firebase project ID is required"),
	NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z
		.string()
		.regex(/^[\w-]+\.appspot\.com$/, "Invalid Firebase storage bucket"),
	NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z
		.string()
		.regex(/^\d+$/, "Firebase messaging sender ID must be numeric"),
	NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1, "Firebase app ID is required"),

	// Server-side only variables (no NEXT_PUBLIC_ prefix)
	NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

/**
 * Production-specific validation
 * Stricter requirements for production environments
 */
export const ProductionEnvSchema = z.object({
	NODE_ENV: z.literal("production"),
	// All analytics must be enabled in production
	ENABLE_ANALYTICS: z.literal(true),
	ENABLE_ERROR_REPORTING: z.literal(true),
	ENABLE_DEBUG_MODE: z.literal(false),
	// Dev tools must be disabled in production
	FLIPPER_ENABLED: z.literal(false),
	REACTOTRON_ENABLED: z.literal(false),
	DEV_MENU_ENABLED: z.literal(false),
	// Security: No default/example values
	JWT_SECRET: z.string().min(64, "Production JWT secret must be at least 64 characters"),
	SENTRY_DSN: z.string().url("Sentry DSN is required in production"),
	ANALYTICS_KEY: z.string().min(1, "Analytics key is required in production"),
});

// Type exports for TypeScript
export type ProductAppEnv = z.infer<typeof ProductAppEnvSchema>;
export type WebsiteEnv = z.infer<typeof WebsiteEnvSchema>;
export type ProductionEnv = z.infer<typeof ProductionEnvSchema>;
