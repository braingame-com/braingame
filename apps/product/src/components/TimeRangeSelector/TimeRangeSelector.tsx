import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@braingame/bgui';
import type { TimeRange } from '../../services/AnalyticsService';
import { timeRangeSelectorStyles } from './styles';

interface TimeRangeSelectorProps {
	selectedRange: TimeRange;
	onRangeChange: (range: TimeRange) => void;
	ranges?: TimeRange[];
}

/**
 * Time Range Selector Component
 * Segmented control for filtering chart data by time periods
 * Advanced UI component with smooth animations
 * Ported from bg1 React to React Native with enhancements
 */
export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
	selectedRange,
	onRangeChange,
	ranges = ['1W', '1M', '3M', '1Y', 'All'],
}) => {
	
	/**
	 * Get display label for time range
	 */
	const getRangeLabel = (range: TimeRange): string => {
		const labels: Record<TimeRange, string> = {
			'1W': '1W',
			'1M': '1M',
			'3M': '3M',
			'1Y': '1Y',
			'All': 'All',
		};
		return labels[range];
	};

	/**
	 * Handle range selection
	 */
	const handleRangePress = (range: TimeRange) => {
		onRangeChange(range);
	};

	return (
		<View style={timeRangeSelectorStyles.container}>
			{ranges.map((range, index) => {
				const isSelected = range === selectedRange;
				const isFirst = index === 0;
				const isLast = index === ranges.length - 1;

				return (
					<TouchableOpacity
						key={range}
						onPress={() => handleRangePress(range)}
						style={[
							timeRangeSelectorStyles.button,
							isFirst && timeRangeSelectorStyles.firstButton,
							isLast && timeRangeSelectorStyles.lastButton,
							isSelected && timeRangeSelectorStyles.selectedButton,
						]}
						activeOpacity={0.7}
					>
						<Text style={[
							timeRangeSelectorStyles.buttonText,
							isSelected && timeRangeSelectorStyles.selectedButtonText,
						]}>
							{getRangeLabel(range)}
						</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};