import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@braingame/bgui';
import { useCloudFunctions } from '../../hooks/useCloudFunctions';
import { PulseAnimation } from '../LoadingAnimations';
import { cloudStatusStyles } from './styles';

interface CloudStatusProps {
	showDetails?: boolean;
	autoTest?: boolean;
	testInterval?: number;
}

/**
 * Cloud Status Component
 * Real-time cloud connectivity indicator
 * Shows connection status, latency, and error states
 */
export const CloudStatus: React.FC<CloudStatusProps> = ({
	showDetails = false,
	autoTest = false,
	testInterval = 30000, // 30 seconds
}) => {
	const { loading, error, testConnection, getConfig } = useCloudFunctions();
	const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'connected' | 'disconnected'>('unknown');
	const [lastCheck, setLastCheck] = useState<Date | null>(null);
	const [latency, setLatency] = useState<number | null>(null);

	/**
	 * Test cloud connection with latency measurement
	 */
	const performConnectionTest = async () => {
		const startTime = Date.now();
		const result = await testConnection();
		const endTime = Date.now();
		
		setLastCheck(new Date());
		setLatency(endTime - startTime);
		setConnectionStatus(result.success ? 'connected' : 'disconnected');
	};

	/**
	 * Auto-test connection periodically
	 */
	useEffect(() => {
		if (autoTest) {
			performConnectionTest();
			
			const interval = setInterval(performConnectionTest, testInterval);
			return () => clearInterval(interval);
		}
	}, [autoTest, testInterval]);

	/**
	 * Get status color
	 */
	const getStatusColor = (): string => {
		if (loading) return '#ff9500'; // Orange for loading
		switch (connectionStatus) {
			case 'connected': return '#00a550'; // Green
			case 'disconnected': return '#ff6b35'; // Red
			default: return '#666'; // Gray for unknown
		}
	};

	/**
	 * Get status text
	 */
	const getStatusText = (): string => {
		if (loading) return 'Testing...';
		switch (connectionStatus) {
			case 'connected': return 'Connected';
			case 'disconnected': return 'Disconnected';
			default: return 'Unknown';
		}
	};

	/**
	 * Get status icon
	 */
	const getStatusIcon = (): string => {
		if (loading) return '⏳';
		switch (connectionStatus) {
			case 'connected': return '✅';
			case 'disconnected': return '❌';
			default: return '❓';
		}
	};

	/**
	 * Format last check time
	 */
	const formatLastCheck = (): string => {
		if (!lastCheck) return 'Never';
		const now = new Date();
		const diff = now.getTime() - lastCheck.getTime();
		const seconds = Math.floor(diff / 1000);
		const minutes = Math.floor(seconds / 60);
		
		if (minutes > 0) return `${minutes}m ago`;
		return `${seconds}s ago`;
	};

	/**
	 * Get latency text with color
	 */
	const getLatencyInfo = () => {
		if (!latency) return { text: 'N/A', color: '#666' };
		
		let color = '#00a550'; // Green
		if (latency > 2000) color = '#ff6b35'; // Red for >2s
		else if (latency > 1000) color = '#ff9500'; // Orange for >1s
		
		return {
			text: `${latency}ms`,
			color,
		};
	};

	const config = getConfig();
	const latencyInfo = getLatencyInfo();

	return (
		<View style={cloudStatusStyles.container}>
			{/* Main Status Indicator */}
			<TouchableOpacity
				onPress={performConnectionTest}
				style={[
					cloudStatusStyles.statusIndicator,
					{ backgroundColor: `${getStatusColor()}20` },
					{ borderColor: getStatusColor() },
				]}
				disabled={loading}
			>
				<View style={cloudStatusStyles.statusContent}>
					{loading ? (
						<PulseAnimation size={16} color={getStatusColor()}>
							<Text style={cloudStatusStyles.statusIcon}>⏳</Text>
						</PulseAnimation>
					) : (
						<Text style={cloudStatusStyles.statusIcon}>
							{getStatusIcon()}
						</Text>
					)}
					
					<Text style={[cloudStatusStyles.statusText, { color: getStatusColor() }]}>
						{getStatusText()}
					</Text>
				</View>
			</TouchableOpacity>

			{/* Detailed Information */}
			{showDetails && (
				<View style={cloudStatusStyles.detailsContainer}>
					{/* Connection Details */}
					<View style={cloudStatusStyles.detailRow}>
						<Text style={cloudStatusStyles.detailLabel}>Environment:</Text>
						<Text style={cloudStatusStyles.detailValue}>
							{config.projectId.includes('production') ? 'Production' : 
							 config.projectId.includes('staging') ? 'Staging' : 'Development'}
						</Text>
					</View>

					<View style={cloudStatusStyles.detailRow}>
						<Text style={cloudStatusStyles.detailLabel}>Last Check:</Text>
						<Text style={cloudStatusStyles.detailValue}>
							{formatLastCheck()}
						</Text>
					</View>

					<View style={cloudStatusStyles.detailRow}>
						<Text style={cloudStatusStyles.detailLabel}>Latency:</Text>
						<Text style={[cloudStatusStyles.detailValue, { color: latencyInfo.color }]}>
							{latencyInfo.text}
						</Text>
					</View>

					<View style={cloudStatusStyles.detailRow}>
						<Text style={cloudStatusStyles.detailLabel}>Region:</Text>
						<Text style={cloudStatusStyles.detailValue}>
							{config.region}
						</Text>
					</View>

					{/* Error Information */}
					{error && (
						<View style={cloudStatusStyles.errorContainer}>
							<Text style={cloudStatusStyles.errorTitle}>Error:</Text>
							<Text style={cloudStatusStyles.errorText}>{error}</Text>
						</View>
					)}

					{/* Manual Test Button */}
					<TouchableOpacity
						onPress={performConnectionTest}
						style={cloudStatusStyles.testButton}
						disabled={loading}
					>
						<Text style={cloudStatusStyles.testButtonText}>
							{loading ? 'Testing...' : 'Test Connection'}
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};