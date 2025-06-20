import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withRepeat,
	withTiming,
	interpolate,
	Easing,
} from 'react-native-reanimated';
import { skeletonLoaderStyles } from './styles';

interface SkeletonLoaderProps {
	width?: number | string;
	height?: number | string;
	borderRadius?: number;
	style?: any;
}

/**
 * Skeleton Loader Component
 * Smooth shimmer animation for loading states
 * Advanced gradient animation using React Native Reanimated
 */
export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
	width = '100%',
	height = 20,
	borderRadius = 8,
	style,
}) => {
	const shimmerPosition = useSharedValue(-1);

	/**
	 * Start shimmer animation
	 */
	useEffect(() => {
		shimmerPosition.value = withRepeat(
			withTiming(1, {
				duration: 1500,
				easing: Easing.ease,
			}),
			-1,
			false
		);
	}, [shimmerPosition]);

	/**
	 * Animated shimmer style
	 */
	const animatedShimmerStyle = useAnimatedStyle(() => {
		const translateX = interpolate(
			shimmerPosition.value,
			[-1, 1],
			[-200, 200]
		);

		return {
			transform: [{ translateX }],
		};
	});

	/**
	 * Container style
	 */
	const containerStyle = [
		skeletonLoaderStyles.container,
		{
			width,
			height,
			borderRadius,
		},
		style,
	];

	return (
		<View style={containerStyle}>
			<Animated.View
				style={[
					skeletonLoaderStyles.shimmer,
					animatedShimmerStyle,
				]}
			/>
		</View>
	);
};

/**
 * Skeleton Card Component
 * Pre-built skeleton for card layouts
 */
export const SkeletonCard: React.FC = () => (
	<View style={skeletonLoaderStyles.card}>
		<SkeletonLoader height={120} borderRadius={12} />
		<View style={skeletonLoaderStyles.cardContent}>
			<SkeletonLoader height={16} width="80%" />
			<SkeletonLoader height={14} width="60%" style={{ marginTop: 8 }} />
			<SkeletonLoader height={12} width="40%" style={{ marginTop: 4 }} />
		</View>
	</View>
);

/**
 * Skeleton List Component
 * Multiple skeleton items for lists
 */
interface SkeletonListProps {
	count?: number;
	itemHeight?: number;
	spacing?: number;
}

export const SkeletonList: React.FC<SkeletonListProps> = ({
	count = 5,
	itemHeight = 60,
	spacing = 12,
}) => (
	<View>
		{Array.from({ length: count }).map((_, index) => (
			<View key={index} style={{ marginBottom: index < count - 1 ? spacing : 0 }}>
				<SkeletonLoader height={itemHeight} />
			</View>
		))}
	</View>
);