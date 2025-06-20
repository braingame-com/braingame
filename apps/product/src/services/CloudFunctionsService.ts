/**
 * Cloud Functions Service
 * Serverless backend integration with Firebase Functions
 * Advanced error handling, retry logic, and data persistence
 * Enterprise-grade cloud architecture
 */

import { getFirebaseConfig, CLOUD_FUNCTIONS, SHEETS_CONFIG, API_CONFIG } from '../config/firebase';

export interface CloudFunctionResponse<T = any> {
	success: boolean;
	data?: T;
	error?: string;
	statusCode?: number;
	timestamp: string;
}

export interface SheetDataEntry {
	key: string;
	value: string | number | boolean;
}

export interface AnalyticsEvent {
	event: string;
	userId?: string;
	sessionId: string;
	timestamp: string;
	properties?: Record<string, any>;
}

class CloudFunctionsService {
	private config = getFirebaseConfig();
	private sessionId = this.generateSessionId();

	/**
	 * Generate unique session ID
	 */
	private generateSessionId(): string {
		return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
	}

	/**
	 * Make HTTP request with retry logic and error handling
	 */
	private async makeRequest<T>(
		endpoint: string,
		options: RequestInit,
		retryCount = 0
	): Promise<CloudFunctionResponse<T>> {
		const url = `${this.config.functionsUrl}/${endpoint}`;
		const timestamp = new Date().toISOString();

		try {
			// Create request with timeout
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

			const response = await fetch(url, {
				...options,
				signal: controller.signal,
				headers: {
					'Content-Type': 'application/json',
					'X-Session-ID': this.sessionId,
					'X-Timestamp': timestamp,
					...options.headers,
				},
			});

			clearTimeout(timeoutId);

			// Handle response
			if (response.ok) {
				const data = await response.text();
				return {
					success: true,
					data: data as T,
					statusCode: response.status,
					timestamp,
				};
			} else {
				throw new Error(`HTTP ${response.status}: ${response.statusText}`);
			}
		} catch (error) {
			console.error(`Cloud function error (attempt ${retryCount + 1}):`, error);

			// Retry logic with exponential backoff
			if (retryCount < API_CONFIG.RETRY_ATTEMPTS - 1) {
				const delay = API_CONFIG.RETRY_DELAY * Math.pow(API_CONFIG.RETRY_MULTIPLIER, retryCount);
				console.log(`Retrying in ${delay}ms...`);
				
				await new Promise(resolve => setTimeout(resolve, delay));
				return this.makeRequest<T>(endpoint, options, retryCount + 1);
			}

			// Final failure
			return {
				success: false,
				error: error instanceof Error ? error.message : 'Unknown error occurred',
				statusCode: 500,
				timestamp,
			};
		}
	}

	/**
	 * Send data to Google Sheets via Firebase Function
	 */
	async sendToGoogleSheets(
		sheetName: keyof typeof SHEETS_CONFIG.SHEETS,
		data: SheetDataEntry[]
	): Promise<CloudFunctionResponse> {
		console.log(`Sending data to ${sheetName} sheet:`, data);

		const endpoint = `${CLOUD_FUNCTIONS.SEND_TO_SHEETS}?sheetName=${sheetName}`;
		
		return this.makeRequest(endpoint, {
			method: 'POST',
			body: JSON.stringify(data),
		});
	}

	/**
	 * Track analytics event
	 */
	async trackAnalytics(event: AnalyticsEvent): Promise<CloudFunctionResponse> {
		console.log('Tracking analytics event:', event);

		return this.makeRequest(CLOUD_FUNCTIONS.USER_ANALYTICS, {
			method: 'POST',
			body: JSON.stringify({
				...event,
				sessionId: this.sessionId,
			}),
		});
	}

	/**
	 * Send mindset training data
	 */
	async saveMindsetData(
		section: 'vision' | 'affirmations' | 'reminders' | 'images' | 'journal' | 'performance',
		data: SheetDataEntry[]
	): Promise<CloudFunctionResponse> {
		const sheetMapping = {
			vision: 'VISION',
			affirmations: 'AFFIRMATIONS',
			reminders: 'REMINDERS', 
			images: 'IMAGES',
			journal: 'JOURNAL',
			performance: 'PERFORMANCE',
		} as const;

		const sheetName = sheetMapping[section];
		return this.sendToGoogleSheets(sheetName, data);
	}

	/**
	 * Save video engagement data
	 */
	async saveVideoData(videoData: {
		videoId: string;
		title: string;
		watchTime: number;
		completed: boolean;
		timestamp: string;
	}): Promise<CloudFunctionResponse> {
		const data: SheetDataEntry[] = [
			{ key: 'videoId', value: videoData.videoId },
			{ key: 'title', value: videoData.title },
			{ key: 'watchTime', value: videoData.watchTime },
			{ key: 'completed', value: videoData.completed },
			{ key: 'timestamp', value: videoData.timestamp },
		];

		return this.sendToGoogleSheets('VIDEOS', data);
	}

	/**
	 * Save analytics dashboard data
	 */
	async saveAnalyticsData(metrics: {
		mindsetScore: number;
		videoTime: number;
		streakCount: number;
		completionRate: number;
		timestamp: string;
	}): Promise<CloudFunctionResponse> {
		const data: SheetDataEntry[] = [
			{ key: 'mindsetScore', value: metrics.mindsetScore },
			{ key: 'videoTime', value: metrics.videoTime },
			{ key: 'streakCount', value: metrics.streakCount },
			{ key: 'completionRate', value: metrics.completionRate },
			{ key: 'timestamp', value: metrics.timestamp },
		];

		return this.sendToGoogleSheets('ANALYTICS', data);
	}

	/**
	 * Batch multiple operations
	 */
	async batchOperations(
		operations: Array<{
			type: 'sheets' | 'analytics';
			sheetName?: keyof typeof SHEETS_CONFIG.SHEETS;
			data: SheetDataEntry[] | AnalyticsEvent;
		}>
	): Promise<CloudFunctionResponse[]> {
		const promises = operations.map(async (operation) => {
			if (operation.type === 'sheets' && operation.sheetName) {
				return this.sendToGoogleSheets(operation.sheetName, operation.data as SheetDataEntry[]);
			} else if (operation.type === 'analytics') {
				return this.trackAnalytics(operation.data as AnalyticsEvent);
			}
			throw new Error('Invalid operation type');
		});

		return Promise.all(promises);
	}

	/**
	 * Test cloud function connectivity
	 */
	async testConnection(): Promise<CloudFunctionResponse> {
		console.log('Testing cloud function connectivity...');
		
		return this.makeRequest('health', {
			method: 'GET',
		});
	}

	/**
	 * Get current configuration
	 */
	getConfig() {
		return {
			...this.config,
			sessionId: this.sessionId,
		};
	}

	/**
	 * Format data for Google Sheets
	 */
	formatForSheets(data: Record<string, any>): SheetDataEntry[] {
		return Object.entries(data).map(([key, value]) => ({
			key,
			value: value?.toString() || '',
		}));
	}

	/**
	 * Create analytics event
	 */
	createAnalyticsEvent(
		event: string,
		properties?: Record<string, any>,
		userId?: string
	): AnalyticsEvent {
		return {
			event,
			userId,
			sessionId: this.sessionId,
			timestamp: new Date().toISOString(),
			properties,
		};
	}

	/**
	 * Handle offline operations (queue for later)
	 */
	async queueOfflineOperation(operation: {
		type: string;
		data: any;
		timestamp: string;
	}): Promise<void> {
		// In a real implementation, this would use AsyncStorage or SQLite
		// to queue operations when offline
		console.log('Queueing offline operation:', operation);
	}

	/**
	 * Process queued offline operations
	 */
	async processOfflineQueue(): Promise<void> {
		// In a real implementation, this would process the offline queue
		// when connectivity is restored
		console.log('Processing offline queue...');
	}
}

export const cloudFunctionsService = new CloudFunctionsService();