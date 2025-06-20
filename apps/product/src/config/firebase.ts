/**
 * Firebase Configuration
 * Cloud Functions integration with Google Sheets backend
 * Enterprise-grade serverless backend architecture
 * Ported from dev-dil with security enhancements
 */

export interface FirebaseConfig {
	projectId: string;
	region: string;
	functionsUrl: string;
}

/**
 * Firebase project configuration
 * Environment-specific settings for dev/staging/production
 */
export const getFirebaseConfig = (): FirebaseConfig => {
	const environment = process.env.EXPO_PUBLIC_ENVIRONMENT || 'development';
	
	switch (environment) {
		case 'production':
			return {
				projectId: 'braingame-production',
				region: 'us-central1',
				functionsUrl: 'https://us-central1-braingame-production.cloudfunctions.net',
			};
		case 'staging':
			return {
				projectId: 'braingame-staging',
				region: 'us-central1',
				functionsUrl: 'https://us-central1-braingame-staging.cloudfunctions.net',
			};
		case 'development':
		default:
			// Use dev-dil functions for development/testing
			return {
				projectId: 'dev-dil-d15f8',
				region: 'us-central1',
				functionsUrl: 'https://us-central1-dev-dil-d15f8.cloudfunctions.net',
			};
	}
};

/**
 * Available Firebase Cloud Functions
 */
export const CLOUD_FUNCTIONS = {
	SEND_TO_SHEETS: 'sendFormDataToGoogleSheets',
	USER_ANALYTICS: 'trackUserAnalytics',
	SEND_EMAIL: 'sendNotificationEmail',
	PROCESS_VIDEO: 'processVideoData',
} as const;

/**
 * Google Sheets configuration
 */
export const SHEETS_CONFIG = {
	SPREADSHEET_ID: '14IXDAi4ObqDk1Kj8zpQdwHX4N88c3Uf6zD6d4P6efyg',
	SHEETS: {
		VISION: 'Vision',
		AFFIRMATIONS: 'Affirmations', 
		REMINDERS: 'Reminders',
		IMAGES: 'Images',
		JOURNAL: 'Journal',
		PERFORMANCE: 'Performance',
		ANALYTICS: 'Analytics',
		VIDEOS: 'Videos',
		USER_ACTIVITY: 'UserActivity',
	},
} as const;

/**
 * API timeout and retry configuration
 */
export const API_CONFIG = {
	TIMEOUT: 30000, // 30 seconds
	RETRY_ATTEMPTS: 3,
	RETRY_DELAY: 1000, // 1 second
	RETRY_MULTIPLIER: 2, // Exponential backoff
} as const;