/**
 * Environment Configuration
 *
 * This file centralizes all environment-dependent configuration values
 * and provides type-safe access to environment variables.
 */

import { createEnvConfig, ProductAppEnvSchema } from "@braingame/utils";

// Create the validated environment configuration
export const env = createEnvConfig(ProductAppEnvSchema);

/**
 * App Configuration
 */
export const APP_CONFIG = {
	name: env.APP_NAME,
	version: env.APP_VERSION,
	environment: env.NODE_ENV,
	isProduction: env.NODE_ENV === "production",
	isDevelopment: env.NODE_ENV === "development",
	isTest: env.NODE_ENV === "test",
} as const;

/**
 * API Configuration
 */
export const API_CONFIG = {
	baseUrl: env.API_BASE_URL,
	timeout: env.API_TIMEOUT,
	retryAttempts: env.API_RETRY_ATTEMPTS,
} as const;

/**
 * Authentication Configuration
 */
export const AUTH_CONFIG = {
	jwtSecret: env.JWT_SECRET,
	sessionTimeout: env.SESSION_TIMEOUT,
	encryptionKey: env.ENCRYPTION_KEY,
	// Storage keys
	storageKeys: {
		authToken: "@braingame/auth_token",
		userData: "@braingame/user_data",
		refreshToken: "@braingame/refresh_token",
	},
} as const;

/**
 * Analytics Configuration
 */
export const ANALYTICS_CONFIG = {
	enabled: env.ENABLE_ANALYTICS,
	debugMode: env.ENABLE_DEBUG_MODE,
	providers: {
		analytics: env.ANALYTICS_KEY,
		sentry: env.SENTRY_DSN,
		amplitude: env.AMPLITUDE_API_KEY,
	},
	// Storage keys
	storageKeys: {
		enabled: "@braingame/analytics_enabled",
		lastLaunch: "@braingame/last_launch",
		userId: "@braingame/analytics_user_id",
	},
} as const;

/**
 * Error Tracking Configuration
 */
export const ERROR_CONFIG = {
	enabled: env.ENABLE_ERROR_REPORTING,
	sentryDsn: env.SENTRY_DSN,
	maxLocalLogs: 100,
	// Storage keys
	storageKeys: {
		errorLogs: "@braingame/error_logs",
		errorCount: "@braingame/error_count",
	},
} as const;

/**
 * Performance Configuration
 */
export const PERFORMANCE_CONFIG = {
	enabled: env.ENABLE_PERFORMANCE_MONITORING,
	bundleAnalyzer: env.BUNDLE_ANALYZER_ENABLED,
	// Timeouts and limits
	screenLoadTimeout: 5000,
	apiCallTimeout: env.API_TIMEOUT,
	maxRetryAttempts: env.API_RETRY_ATTEMPTS,
} as const;

/**
 * Developer Tools Configuration
 */
export const DEV_TOOLS_CONFIG = {
	flipperEnabled: env.FLIPPER_ENABLED,
	reactotronEnabled: env.REACTOTRON_ENABLED,
	devMenuEnabled: env.DEV_MENU_ENABLED,
	bundleAnalyzerEnabled: env.BUNDLE_ANALYZER_ENABLED,
} as const;

/**
 * Deep Linking Configuration
 */
export const DEEP_LINKING_CONFIG = {
	prefixes: [
		"braingame://",
		"https://app.braingame.dev",
		"https://app.braingame.com",
		"https://braingame.com",
	] as string[],
	// URL patterns for different environments
	webUrls: {
		production: "https://app.braingame.com",
		development: "https://app.braingame.dev",
		local: "http://localhost:3000",
	},
} as const;

/**
 * Storage Configuration
 * Centralized storage keys to avoid duplication
 */
export const STORAGE_KEYS = {
	// Authentication
	auth: {
		token: "@braingame/auth_token",
		refreshToken: "@braingame/refresh_token",
		userData: "@braingame/user_data",
	},
	// User preferences
	preferences: {
		theme: "@braingame/theme",
		accessibility: "@braingame/accessibility_settings",
		notifications: "@braingame/notification_settings",
		language: "@braingame/language",
	},
	// Analytics
	analytics: {
		enabled: "@braingame/analytics_enabled",
		lastLaunch: "@braingame/last_launch",
		userId: "@braingame/analytics_user_id",
		sessionId: "@braingame/session_id",
	},
	// Error tracking
	errors: {
		logs: "@braingame/error_logs",
		count: "@braingame/error_count",
		lastError: "@braingame/last_error",
	},
	// App state
	app: {
		onboardingCompleted: "@braingame/onboarding_completed",
		firstLaunch: "@braingame/first_launch",
		lastVersion: "@braingame/last_version",
	},
	// Content
	content: {
		downloadedVideos: "@braingame/downloaded_videos",
		affirmations: "@braingame/affirmations",
		visionGoals: "@braingame/vision_goals",
	},
} as const;

/**
 * Network Configuration
 */
export const NETWORK_CONFIG = {
	retryAttempts: env.API_RETRY_ATTEMPTS,
	retryDelay: 1000, // milliseconds
	timeout: env.API_TIMEOUT,
	maxConcurrentRequests: 5,
} as const;

/**
 * Cache Configuration
 */
export const CACHE_CONFIG = {
	defaultTTL: 3600000, // 1 hour in milliseconds
	maxCacheSize: 50 * 1024 * 1024, // 50MB
	cacheKeys: {
		userData: "cache:user:",
		videoData: "cache:video:",
		analyticsData: "cache:analytics:",
	},
} as const;

/**
 * Feature Flags
 */
export const FEATURE_FLAGS = {
	analytics: env.ENABLE_ANALYTICS,
	errorReporting: env.ENABLE_ERROR_REPORTING,
	debugMode: env.ENABLE_DEBUG_MODE,
	performanceMonitoring: env.ENABLE_PERFORMANCE_MONITORING,
	// Additional feature flags can be added here
	newDashboard: false,
	socialSharing: false,
	offlineMode: true,
} as const;

/**
 * Firebase Configuration
 */
export const FIREBASE_CONFIG = {
	functionUrl:
		env.FIREBASE_FUNCTION_URL ||
		(APP_CONFIG.isDevelopment
			? "https://us-central1-dev-dil.cloudfunctions.net/sendFormDataToGoogleSheets"
			: "https://us-central1-braingame-prod.cloudfunctions.net/sendFormDataToGoogleSheets"),
	region: env.FIREBASE_REGION,
} as const;

/**
 * Get the appropriate web URL based on the current environment
 */
export const getWebUrl = (): string => {
	if (APP_CONFIG.isProduction) {
		return DEEP_LINKING_CONFIG.webUrls.production;
	}
	if (APP_CONFIG.isDevelopment) {
		return DEEP_LINKING_CONFIG.webUrls.development;
	}
	return DEEP_LINKING_CONFIG.webUrls.local;
};

/**
 * Check if a feature is enabled
 */
export const isFeatureEnabled = (feature: keyof typeof FEATURE_FLAGS): boolean => {
	return FEATURE_FLAGS[feature] ?? false;
};

/**
 * Get storage key with optional suffix
 */
export const getStorageKey = (
	category: keyof typeof STORAGE_KEYS,
	key: string,
	suffix?: string,
): string => {
	const baseKey = STORAGE_KEYS[category][key as keyof (typeof STORAGE_KEYS)[typeof category]];
	return suffix ? `${baseKey}:${suffix}` : baseKey;
};
