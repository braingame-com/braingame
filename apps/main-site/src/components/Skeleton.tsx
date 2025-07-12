import { View } from "@braingame/bgui";
import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

interface SkeletonProps {
	width?: number | string;
	height?: number | string;
	borderRadius?: number;
	style?: Record<string, unknown>;
}

export function Skeleton({ width = "100%", height = 20, borderRadius = 4, style }: SkeletonProps) {
	const animatedValue = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const animation = Animated.loop(
			Animated.sequence([
				Animated.timing(animatedValue, {
					toValue: 1,
					duration: 1000,
					easing: Easing.inOut(Easing.ease),
					useNativeDriver: true,
				}),
				Animated.timing(animatedValue, {
					toValue: 0,
					duration: 1000,
					easing: Easing.inOut(Easing.ease),
					useNativeDriver: true,
				}),
			]),
		);

		animation.start();

		return () => {
			animation.stop();
		};
	}, [animatedValue]);

	const opacity = animatedValue.interpolate({
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

interface SkeletonTextProps {
	lines?: number;
	width?: (number | string)[];
	spacing?: number;
}

export function SkeletonText({ lines = 3, width, spacing = 8 }: SkeletonTextProps) {
	const defaultWidths = ["100%", "90%", "75%"];
	const widths = width || defaultWidths.slice(0, lines);

	return (
		<View>
			{Array.from({ length: lines }).map((_, index) => (
				<Skeleton
					key={`skeleton-line-${index}`}
					width={widths[index] || "100%"}
					height={16}
					style={{ marginBottom: index < lines - 1 ? spacing : 0 }}
				/>
			))}
		</View>
	);
}
