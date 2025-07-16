import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { theme } from "../../theme";
import type { CircularProgressProps } from "./CircularProgressProps";

/**
 * Native implementation of CircularProgress component
 *
 * Circular progress indicators display progress by animating along an invisible circular track.
 * This implementation uses react-native-svg for smooth circular animations.
 */

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const CircularProgress: React.FC<CircularProgressProps> = ({
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
	const rotationValue = useRef(new Animated.Value(0)).current;
	const progressValue = useRef(new Animated.Value(0)).current;

	// Get variant styles from theme
	const getVariantStyles = () => {
		const variantKey = `${variant}-${color}` as keyof typeof theme.components.CircularProgress.variants;
		return theme.components.CircularProgress.variants[variantKey] || theme.components.CircularProgress.variants["soft-primary"];
	};

	// Get size configurations
	const getSizeConfig = () => {
		const sizeConfigs = {
			sm: {
				size: 32,
				strokeWidth: 4,
			},
			md: {
				size: 40,
				strokeWidth: 6,
			},
			lg: {
				size: 48,
				strokeWidth: 8,
			},
		};
		return sizeConfigs[size];
	};

	const variantStyles = getVariantStyles();
	const sizeConfig = getSizeConfig();
	const circleSize = sizeConfig.size;
	const strokeWidth = thickness || sizeConfig.strokeWidth;
	const radius = (circleSize - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;

	// Animation for indeterminate progress
	useEffect(() => {
		if (!determinate) {
			const animation = Animated.loop(
				Animated.timing(rotationValue, {
					toValue: 1,
					duration: 1000,
					easing: Easing.linear,
					useNativeDriver: true,
				}),
			);
			animation.start();
			return () => animation.stop();
		}
	}, [determinate, rotationValue]);

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

	// Calculate stroke dash offset for determinate progress
	const strokeDashoffset = determinate
		? progressValue.interpolate({
				inputRange: [0, 100],
				outputRange: [circumference, 0],
				extrapolate: 'clamp',
			})
		: circumference * 0.75; // For indeterminate, show 25% of circle

	// Calculate rotation for indeterminate progress
	const rotation = rotationValue.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg'],
	});

	// Container styles
	const containerStyles = [
		styles.container,
		{
			width: circleSize,
			height: circleSize,
		},
		style,
	];

	// SVG styles
	const svgStyles = [
		styles.svg,
		!determinate && {
			transform: [{ rotate: rotation }],
		},
	];

	return (
		<View
			style={containerStyles}
			testID={testID}
			accessibilityRole="progressbar"
			accessibilityLabel={ariaLabel}
			accessibilityValue={{
				min: ariaValueMin,
				max: ariaValueMax,
				now: ariaValueNow || (determinate ? value : undefined),
			}}
		>
			<Animated.View style={svgStyles}>
				<Svg width={circleSize} height={circleSize} viewBox={`0 0 ${circleSize} ${circleSize}`}>
					{/* Background circle */}
					<Circle
						cx={circleSize / 2}
						cy={circleSize / 2}
						r={radius}
						fill="none"
						stroke={theme.colors.outline}
						strokeWidth={strokeWidth}
						opacity={0.3}
					/>
					
					{/* Progress circle */}
					<AnimatedCircle
						cx={circleSize / 2}
						cy={circleSize / 2}
						r={radius}
						fill="none"
						stroke={variantStyles.color || theme.colors[color]}
						strokeWidth={strokeWidth}
						strokeDasharray={circumference}
						strokeDashoffset={strokeDashoffset}
						strokeLinecap="round"
						transform={`rotate(-90 ${circleSize / 2} ${circleSize / 2})`}
					/>
				</Svg>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	svg: {
		width: '100%',
		height: '100%',
	},
});