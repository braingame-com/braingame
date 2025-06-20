import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import { LineGraph, type GraphPoint } from 'react-native-graph';
import { Text } from '@braingame/bgui';
import type { DataPoint } from '../../services/AnalyticsService';
import { analyticsService } from '../../services/AnalyticsService';
import { analyticsChartStyles } from './styles';

const { width: screenWidth } = Dimensions.get('window');

interface AnalyticsChartProps {
	data: DataPoint[];
	title?: string;
	theme?: 'mindset' | 'video' | 'performance';
	height?: number;
	animated?: boolean;
	showPoints?: boolean;
	enablePanGesture?: boolean;
}

/**
 * Analytics Chart Component
 * Advanced line graph with interactive features and animations
 * Built on react-native-graph with custom styling
 * Ported from bg1 React to React Native with enhancements
 */
export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
	data,
	title,
	theme = 'performance',
	height = 200,
	animated = true,
	showPoints = true,
	enablePanGesture = true,
}) => {
	const [selectedPoint, setSelectedPoint] = useState<GraphPoint | null>(null);

	/**
	 * Convert DataPoint[] to GraphPoint[] for react-native-graph
	 */
	const graphPoints: GraphPoint[] = data.map(point => ({
		value: point.value,
		date: point.date,
	}));

	/**
	 * Handle point selection
	 */
	const handlePointSelected = (point: GraphPoint) => {
		setSelectedPoint(point);
	};

	/**
	 * Handle gesture start
	 */
	const handleGestureStart = () => {
		// Optional: Add haptic feedback or other gesture start behaviors
	};

	/**
	 * Handle gesture end
	 */
	const handleGestureEnd = () => {
		// Optional: Add cleanup or gesture end behaviors
	};

	/**
	 * Format value for display
	 */
	const formatValue = (value: number): string => {
		if (theme === 'video') {
			return analyticsService.formatValue(value, 'time');
		} else if (theme === 'mindset') {
			return analyticsService.formatValue(value, 'percentage');
		}
		return analyticsService.formatValue(value, 'count');
	};

	/**
	 * Format date for display
	 */
	const formatDate = (date: Date): string => {
		return date.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
		});
	};

	if (graphPoints.length === 0) {
		return (
			<View style={[analyticsChartStyles.container, { height }]}>
				<View style={analyticsChartStyles.emptyState}>
					<Text style={analyticsChartStyles.emptyStateText}>
						No data available
					</Text>
				</View>
			</View>
		);
	}

	const chartColor = analyticsService.getChartColor(theme);
	const gradientColors = analyticsService.getGradientColors(theme);

	return (
		<View style={[analyticsChartStyles.container, { height: height + 60 }]}>
			{/* Chart Title */}
			{title && (
				<Text style={analyticsChartStyles.title}>
					{title}
				</Text>
			)}

			{/* Selected Point Display */}
			{selectedPoint && (
				<View style={analyticsChartStyles.selectedPointContainer}>
					<Text style={analyticsChartStyles.selectedValue}>
						{formatValue(selectedPoint.value)}
					</Text>
					<Text style={analyticsChartStyles.selectedDate}>
						{formatDate(selectedPoint.date)}
					</Text>
				</View>
			)}

			{/* Chart Container */}
			<View style={[analyticsChartStyles.chartContainer, { height }]}>
				<LineGraph
					points={graphPoints}
					animated={animated}
					color={chartColor}
					gradientFillColors={[gradientColors.top, gradientColors.bottom]}
					enablePanGesture={enablePanGesture}
					onPointSelected={handlePointSelected}
					onGestureStart={handleGestureStart}
					onGestureEnd={handleGestureEnd}
					enableFadeInMask={true}
					style={{
						width: screenWidth - 40,
						height,
					}}
					TopAxisLabel={showPoints ? () => (
						<Text style={analyticsChartStyles.axisLabel}>
							{selectedPoint ? formatValue(selectedPoint.value) : ''}
						</Text>
					) : undefined}
					BottomAxisLabel={showPoints ? () => (
						<Text style={analyticsChartStyles.axisLabel}>
							{selectedPoint ? formatDate(selectedPoint.date) : ''}
						</Text>
					) : undefined}
				/>
			</View>

			{/* Chart Summary */}
			<View style={analyticsChartStyles.summaryContainer}>
				<View style={analyticsChartStyles.summaryItem}>
					<Text style={analyticsChartStyles.summaryLabel}>Min</Text>
					<Text style={analyticsChartStyles.summaryValue}>
						{formatValue(Math.min(...graphPoints.map(p => p.value)))}
					</Text>
				</View>
				<View style={analyticsChartStyles.summaryItem}>
					<Text style={analyticsChartStyles.summaryLabel}>Avg</Text>
					<Text style={analyticsChartStyles.summaryValue}>
						{formatValue(
							graphPoints.reduce((sum, p) => sum + p.value, 0) / graphPoints.length
						)}
					</Text>
				</View>
				<View style={analyticsChartStyles.summaryItem}>
					<Text style={analyticsChartStyles.summaryLabel}>Max</Text>
					<Text style={analyticsChartStyles.summaryValue}>
						{formatValue(Math.max(...graphPoints.map(p => p.value)))}
					</Text>
				</View>
			</View>
		</View>
	);
};