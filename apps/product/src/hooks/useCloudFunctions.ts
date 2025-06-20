import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { 
	cloudFunctionsService, 
	type CloudFunctionResponse, 
	type SheetDataEntry 
} from '../services/CloudFunctionsService';

export interface CloudOperationState {
	loading: boolean;
	error: string | null;
	lastResponse: CloudFunctionResponse | null;
}

/**
 * Cloud Functions Hook
 * React hook for managing cloud operations with loading states
 * Advanced error handling and user feedback
 */
export const useCloudFunctions = () => {
	const [state, setState] = useState<CloudOperationState>({
		loading: false,
		error: null,
		lastResponse: null,
	});

	/**
	 * Execute cloud operation with loading state management
	 */
	const executeOperation = useCallback(async <T>(
		operation: () => Promise<CloudFunctionResponse<T>>,
		options?: {
			showSuccessAlert?: boolean;
			showErrorAlert?: boolean;
			successMessage?: string;
			errorMessage?: string;
		}
	): Promise<CloudFunctionResponse<T>> => {
		const {
			showSuccessAlert = false,
			showErrorAlert = true,
			successMessage = 'Operation completed successfully!',
			errorMessage = 'Operation failed. Please try again.',
		} = options || {};

		setState(prev => ({ ...prev, loading: true, error: null }));

		try {
			const response = await operation();
			
			setState(prev => ({
				...prev,
				loading: false,
				lastResponse: response,
				error: response.success ? null : response.error || 'Unknown error',
			}));

			if (response.success) {
				if (showSuccessAlert) {
					Alert.alert('Success', successMessage);
				}
			} else {
				if (showErrorAlert) {
					Alert.alert('Error', response.error || errorMessage);
				}
			}

			return response;
		} catch (error) {
			const errorMsg = error instanceof Error ? error.message : 'Unknown error occurred';
			
			setState(prev => ({
				...prev,
				loading: false,
				error: errorMsg,
			}));

			if (showErrorAlert) {
				Alert.alert('Error', errorMsg);
			}

			return {
				success: false,
				error: errorMsg,
				timestamp: new Date().toISOString(),
			};
		}
	}, []);

	/**
	 * Save mindset training data
	 */
	const saveMindsetData = useCallback(async (
		section: 'vision' | 'affirmations' | 'reminders' | 'images' | 'journal' | 'performance',
		data: SheetDataEntry[],
		showAlert = true
	) => {
		return executeOperation(
			() => cloudFunctionsService.saveMindsetData(section, data),
			{
				showSuccessAlert: showAlert,
				successMessage: `${section.charAt(0).toUpperCase() + section.slice(1)} data saved successfully!`,
				errorMessage: `Failed to save ${section} data. Please try again.`,
			}
		);
	}, [executeOperation]);

	/**
	 * Save video engagement data
	 */
	const saveVideoData = useCallback(async (videoData: {
		videoId: string;
		title: string;
		watchTime: number;
		completed: boolean;
	}) => {
		return executeOperation(
			() => cloudFunctionsService.saveVideoData({
				...videoData,
				timestamp: new Date().toISOString(),
			}),
			{
				showSuccessAlert: false, // Don't show alert for video tracking
				showErrorAlert: false, // Don't annoy users with tracking errors
			}
		);
	}, [executeOperation]);

	/**
	 * Save analytics data
	 */
	const saveAnalyticsData = useCallback(async (metrics: {
		mindsetScore: number;
		videoTime: number;
		streakCount: number;
		completionRate: number;
	}) => {
		return executeOperation(
			() => cloudFunctionsService.saveAnalyticsData({
				...metrics,
				timestamp: new Date().toISOString(),
			}),
			{
				showSuccessAlert: false,
				showErrorAlert: false,
			}
		);
	}, [executeOperation]);

	/**
	 * Track analytics event
	 */
	const trackEvent = useCallback(async (
		event: string,
		properties?: Record<string, any>,
		userId?: string
	) => {
		const analyticsEvent = cloudFunctionsService.createAnalyticsEvent(
			event,
			properties,
			userId
		);

		return executeOperation(
			() => cloudFunctionsService.trackAnalytics(analyticsEvent),
			{
				showSuccessAlert: false,
				showErrorAlert: false,
			}
		);
	}, [executeOperation]);

	/**
	 * Test cloud connectivity
	 */
	const testConnection = useCallback(async () => {
		return executeOperation(
			() => cloudFunctionsService.testConnection(),
			{
				showSuccessAlert: true,
				successMessage: 'Cloud connection successful!',
				errorMessage: 'Unable to connect to cloud services.',
			}
		);
	}, [executeOperation]);

	/**
	 * Batch multiple operations
	 */
	const batchOperations = useCallback(async (
		operations: Array<{
			type: 'mindset' | 'video' | 'analytics';
			data: any;
		}>
	) => {
		const cloudOperations = operations.map(op => {
			switch (op.type) {
				case 'mindset':
					return {
						type: 'sheets' as const,
						sheetName: 'PERFORMANCE' as const,
						data: cloudFunctionsService.formatForSheets(op.data),
					};
				case 'video':
					return {
						type: 'sheets' as const,
						sheetName: 'VIDEOS' as const,
						data: cloudFunctionsService.formatForSheets(op.data),
					};
				case 'analytics':
					return {
						type: 'analytics' as const,
						data: cloudFunctionsService.createAnalyticsEvent('batch_analytics', op.data),
					};
				default:
					throw new Error(`Unknown operation type: ${op.type}`);
			}
		});

		return executeOperation(
			() => cloudFunctionsService.batchOperations(cloudOperations),
			{
				showSuccessAlert: true,
				successMessage: 'All data saved successfully!',
				errorMessage: 'Some operations failed. Please try again.',
			}
		);
	}, [executeOperation]);

	/**
	 * Clear error state
	 */
	const clearError = useCallback(() => {
		setState(prev => ({ ...prev, error: null }));
	}, []);

	/**
	 * Get cloud configuration
	 */
	const getConfig = useCallback(() => {
		return cloudFunctionsService.getConfig();
	}, []);

	return {
		// State
		loading: state.loading,
		error: state.error,
		lastResponse: state.lastResponse,

		// Operations
		saveMindsetData,
		saveVideoData,
		saveAnalyticsData,
		trackEvent,
		testConnection,
		batchOperations,

		// Utilities
		clearError,
		getConfig,
		executeOperation,
	};
};