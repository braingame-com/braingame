"use client";

import { useEffect, useRef } from "react";
import type { ViewStyle } from "react-native";
import { Animated } from "react-native";

interface LoadingSkeletonProps {
	width?: number | `${number}%`;
	height?: number | `${number}%`;
	borderRadius?: number;
	style?: ViewStyle;
}

export function LoadingSkeleton({
	width = "100%",
	height = 20,
	borderRadius = 4,
	style,
}: LoadingSkeletonProps) {
	const shimmerAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const animation = Animated.loop(
			Animated.sequence([
				Animated.timing(shimmerAnim, {
					toValue: 1,
					duration: 1000,
					useNativeDriver: true,
				}),
				Animated.timing(shimmerAnim, {
					toValue: 0,
					duration: 1000,
					useNativeDriver: true,
				}),
			]),
		);

		animation.start();
		return () => animation.stop();
	}, [shimmerAnim]);

	const opacity = shimmerAnim.interpolate({
		inputRange: [0, 1],
		outputRange: [0.3, 0.7],
	});

	return (
		<Animated.View
			style={[
				{
					width,
					height,
					borderRadius,
					backgroundColor: "#333",
					opacity,
				},
				style,
			]}
		/>
	);
}
