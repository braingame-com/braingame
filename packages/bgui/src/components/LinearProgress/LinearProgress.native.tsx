import type React from "react";
import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { theme } from "../../theme";
import type { LinearProgressProps } from "./LinearProgressProps";

/**
 * Native implementation of LinearProgress component
 *
 * Linear progress indicators display progress by animating along a fixed, horizontal track.
 * This implementation uses React Native's Animated API for smooth animations.
 */

export const LinearProgress: React.FC<LinearProgressProps> = ({
	color = "primary",
	variant = "soft",
	size = "md",
	determinate = false,
	value = 0,
	thickness = 6,
	"aria-label": ariaLabel = "Loading…",
	"aria-valuenow": ariaValueNow,
	"aria-valuemin": ariaValueMin = 0,
	"aria-valuemax": ariaValueMax = 100,
	style,
	testID,
}) => {
	const progressValue = useRef(new Animated.Value(0)).current;
	const indeterminateValue = useRef(new Animated.Value(0)).current;

	// Get variant styles from theme
	const getVariantStyles = () => {
		const variantKey =
			`${variant}-${color}` as keyof typeof theme.components.LinearProgress.variants;
		return (
			theme.components.LinearProgress.variants[variantKey] ||
			theme.components.LinearProgress.variants["soft-primary"]
		);
	};

	// Get size configurations
	const getSizeConfig = () => {
		const sizeConfigs = {
			sm: {
				height: 4,
				borderRadius: 2,
			},
			md: {
				height: 6,
				borderRadius: 3,
			},
			lg: {
				height: 8,
				borderRadius: 4,
			},
		};
		return sizeConfigs[size];
	};

	// Animation for determinate progress
	useEffect(() => {
		if (determinate) {
			Animated.timing(progressValue, {
				toValue: value,
				duration: 300,
				easing: Easing.out(Easing.ease),
				useNativeDriver: false,
			}).start();
		}
	}, [determinate, value, progressValue]);

	// Animation for indeterminate progress
	useEffect(() => {
		if (!determinate) {
			const animation = Animated.loop(
				Animated.sequence([
					Animated.timing(indeterminateValue, {
						toValue: 1,
						duration: 1000,
						easing: Easing.bezier(0.4, 0.0, 0.2, 1),
						useNativeDriver: false,
					}),
					Animated.timing(indeterminateValue, {
						toValue: 0,
						duration: 1000,
						easing: Easing.bezier(0.4, 0.0, 0.2, 1),
						useNativeDriver: false,
					}),
				]),
			);
			animation.start();
			return () => animation.stop();
		}
	}, [determinate, indeterminateValue]);

	const variantStyles = getVariantStyles();
	const sizeConfig = getSizeConfig();
	const progressHeight = thickness || sizeConfig.height;

	// Calculate progress width
	const progressWidth = determinate
		? progressValue.interpolate({
				inputRange: [0, 100],
				outputRange: ["0%", "100%"],
				extrapolate: "clamp",
			})
		: indeterminateValue.interpolate({
				inputRange: [0, 0.5, 1],
				outputRange: ["0%", "50%", "100%"],
				extrapolate: "clamp",
			});

	// Calculate indeterminate position
	const indeterminateTranslateX = indeterminateValue.interpolate({
		inputRange: [0, 1],
		outputRange: ["-100%", "100%"],
		extrapolate: "clamp",
	});

	// Track styles
	const trackStyles = [
		styles.track,
		{
			height: progressHeight,
			borderRadius: sizeConfig.borderRadius,
			backgroundColor: theme.colors.outline,
			opacity: 0.3,
		},
		style,
	];

	// Progress styles
	const progressStyles = [
		styles.progress,
		{
			height: progressHeight,
			borderRadius: sizeConfig.borderRadius,
			backgroundColor: variantStyles.color || theme.colors[color],
			width: determinate ? progressWidth : "50%",
			...(determinate ? {} : { transform: [{ translateX: indeterminateTranslateX }] }),
		},
	];

	return (
		<View
			style={trackStyles}
			testID={testID}
			accessibilityRole="progressbar"
			accessibilityLabel={ariaLabel}
			accessibilityValue={{
				min: ariaValueMin,
				max: ariaValueMax,
				now: ariaValueNow || (determinate ? value : undefined),
			}}
		>
			<Animated.View style={progressStyles} />
		</View>
	);
};

const styles = StyleSheet.create({
	track: {
		overflow: "hidden",
		position: "relative",
	},
	progress: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
	},
});
