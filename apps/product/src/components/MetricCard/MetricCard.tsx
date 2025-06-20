import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@braingame/bgui';
import type { MetricCard as MetricCardType } from '../../services/AnalyticsService';
import { metricCardStyles } from './styles';

interface MetricCardProps {
	metric: MetricCardType;
	onPress?: (metric: MetricCardType) => void;
	size?: 'small' | 'medium' | 'large';
}

/**
 * Metric Card Component
 * Advanced analytics card with trends and visual indicators
 * Responsive design with interactive states
 * Ported from bg1 React to React Native with enhancements
 */
export const MetricCard: React.FC<MetricCardProps> = ({
	metric,
	onPress,
	size = 'medium',
}) => {
	
	/**
	 * Get trend indicator
	 */
	const getTrendIndicator = () => {
		if (!metric.trend || !metric.trendValue) return null;
		
		const indicators = {
			up: '↗',
			down: '↘',
			stable: '→',
		};

		const colors = {
			up: '#00a550',
			down: '#ff6b35',
			stable: '#666',
		};

		return (
			<View style={[
				metricCardStyles.trendContainer,
				{ backgroundColor: `${colors[metric.trend]}20` }
			]}>
				<Text style={[
					metricCardStyles.trendIndicator,
					{ color: colors[metric.trend] }
				]}>
					{indicators[metric.trend]}
				</Text>
				<Text style={[
					metricCardStyles.trendValue,
					{ color: colors[metric.trend] }
				]}>
					{metric.trendValue}
				</Text>
			</View>
		);
	};

	/**
	 * Handle card press
	 */
	const handlePress = () => {
		if (onPress) {
			onPress(metric);
		}
	};

	const CardContent = () => (
		<View style={[
			metricCardStyles.container,
			metricCardStyles[size],
			{ borderLeftColor: metric.color }
		]}>
			{/* Header */}
			<View style={metricCardStyles.header}>
				<View style={metricCardStyles.iconContainer}>
					<Text style={metricCardStyles.icon}>
						{metric.icon}
					</Text>
				</View>
				{getTrendIndicator()}
			</View>

			{/* Value */}
			<View style={metricCardStyles.valueContainer}>
				<Text style={[
					metricCardStyles.value,
					metricCardStyles[`${size}Value`]
				]}>
					{metric.value}
				</Text>
			</View>

			{/* Title and Subtitle */}
			<View style={metricCardStyles.textContainer}>
				<Text style={[
					metricCardStyles.title,
					metricCardStyles[`${size}Title`]
				]}>
					{metric.title}
				</Text>
				{metric.subtitle && (
					<Text style={[
						metricCardStyles.subtitle,
						metricCardStyles[`${size}Subtitle`]
					]}>
						{metric.subtitle}
					</Text>
				)}
			</View>

			{/* Color accent */}
			<View style={[
				metricCardStyles.colorAccent,
				{ backgroundColor: metric.color }
			]} />
		</View>
	);

	if (onPress) {
		return (
			<TouchableOpacity
				onPress={handlePress}
				activeOpacity={0.8}
				style={metricCardStyles.touchable}
			>
				<CardContent />
			</TouchableOpacity>
		);
	}

	return <CardContent />;
};