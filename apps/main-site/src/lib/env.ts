// Environment configuration with type safety and validation

interface EnvConfig {
	// Analytics
	GA_MEASUREMENT_ID: string;

	// Firebase
	FIREBASE_API_KEY: string;
	FIREBASE_AUTH_DOMAIN: string;
	FIREBASE_PROJECT_ID: string;
	FIREBASE_STORAGE_BUCKET: string;
	FIREBASE_MESSAGING_SENDER_ID: string;
	FIREBASE_APP_ID: string;
	FIREBASE_MEASUREMENT_ID: string;

	// API
	API_URL: string;

	// Feature Flags
	ENABLE_ANALYTICS: boolean;
	ENABLE_COOKIE_CONSENT: boolean;
	ENABLE_ERROR_TRACKING: boolean;

	// Environment
	ENV: "development" | "staging" | "production";
	IS_PRODUCTION: boolean;
	IS_DEVELOPMENT: boolean;
}

function getEnvVar(key: string, defaultValue?: string): string {
	if (typeof window === "undefined") {
		// Server-side
		return process.env[key] || defaultValue || "";
	}

	// Client-side - Next.js prefixes public env vars with NEXT_PUBLIC_
	const publicKey = `NEXT_PUBLIC_${key}`;
	return process.env[publicKey] || defaultValue || "";
}

function getEnvBoolean(key: string, defaultValue = false): boolean {
	const value = getEnvVar(key);
	if (!value) return defaultValue;
	return value.toLowerCase() === "true";
}

// Create and validate environment configuration
function createEnvConfig(): EnvConfig {
	const env = getEnvVar("ENV", "development") as EnvConfig["ENV"];

	return {
		// Analytics
		GA_MEASUREMENT_ID: getEnvVar("GA_MEASUREMENT_ID", "G-XXXXXXXXXX"),

		// Firebase
		FIREBASE_API_KEY: getEnvVar("FIREBASE_API_KEY"),
		FIREBASE_AUTH_DOMAIN: getEnvVar("FIREBASE_AUTH_DOMAIN"),
		FIREBASE_PROJECT_ID: getEnvVar("FIREBASE_PROJECT_ID"),
		FIREBASE_STORAGE_BUCKET: getEnvVar("FIREBASE_STORAGE_BUCKET"),
		FIREBASE_MESSAGING_SENDER_ID: getEnvVar("FIREBASE_MESSAGING_SENDER_ID"),
		FIREBASE_APP_ID: getEnvVar("FIREBASE_APP_ID"),
		FIREBASE_MEASUREMENT_ID: getEnvVar("FIREBASE_MEASUREMENT_ID"),

		// API
		API_URL: getEnvVar("API_URL", "https://api.braingame.dev"),

		// Feature Flags
		ENABLE_ANALYTICS: getEnvBoolean("ENABLE_ANALYTICS", true),
		ENABLE_COOKIE_CONSENT: getEnvBoolean("ENABLE_COOKIE_CONSENT", true),
		ENABLE_ERROR_TRACKING: getEnvBoolean("ENABLE_ERROR_TRACKING", true),

		// Environment
		ENV: env,
		IS_PRODUCTION: env === "production",
		IS_DEVELOPMENT: env === "development",
	};
}

// Export singleton instance
export const env = createEnvConfig();

// Validate required environment variables in production
if (env.IS_PRODUCTION) {
	const requiredVars = ["GA_MEASUREMENT_ID", "FIREBASE_PROJECT_ID", "API_URL"];

	const missingVars = requiredVars.filter((key) => !getEnvVar(key));

	if (missingVars.length > 0) {
		console.error(`Missing required environment variables: ${missingVars.join(", ")}`);
	}
}
