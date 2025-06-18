import { Colors, Tokens, useThemeColor } from "@braingame/utils";
import { useEffect, useRef } from "react";
import { Animated, Platform, StyleSheet, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import type { ProgressBarProps } from "./types";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const ProgressBar = ({
	value,
	color,
	backgroundColor,
	variant = "linear",
	animated = true,
	size = 40,
	style,
}: ProgressBarProps) => {
	const progressColor = color ?? Colors.universal.primary;
	const trackColor = backgroundColor ?? useThemeColor("border");
	const progress = useRef(new Animated.Value(value)).current;

	useEffect(() => {
		if (animated) {
			Animated.timing(progress, {
				toValue: value,
				duration: 500,
				useNativeDriver: false,
			}).start();
		} else {
			progress.setValue(value);
		}
	}, [value, animated, progress]);

	if (variant === "circular") {
		const radius = size / 2;
		const strokeWidth = Tokens.xs;
		const circumference = 2 * Math.PI * (radius - strokeWidth / 2);
		const strokeDashoffset = progress.interpolate({
			inputRange: [0, 100],
			outputRange: [circumference, 0],
		});

		return (
			<View
				style={style}
				accessibilityRole="progressbar"
				accessibilityValue={{
					min: 0,
					max: 100,
					now: value,
				}}
				accessibilityLabel={`Progress: ${value} percent`}
				aria-label={`Progress: ${value} percent`}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuenow={value}
				role="progressbar"
			>
				<Svg width={size} height={size} {...(Platform.OS === "web" ? { "aria-hidden": true } : {})}>
					<Circle
						cx={radius}
						cy={radius}
						r={radius - strokeWidth / 2}
						stroke={trackColor}
						strokeWidth={strokeWidth}
						fill="none"
					/>
					<AnimatedCircle
						testID="progress-circle"
						cx={radius}
						cy={radius}
						r={radius - strokeWidth / 2}
						stroke={progressColor}
						strokeWidth={strokeWidth}
						strokeLinecap="round"
						fill="none"
						strokeDasharray={`${circumference} ${circumference}`}
						strokeDashoffset={strokeDashoffset}
					/>
				</Svg>
			</View>
		);
	}

	const width = progress.interpolate({
		inputRange: [0, 100],
		outputRange: ["0%", "100%"],
	});

	return (
		<View
			style={[styles.track, { backgroundColor: trackColor }, style]}
			accessibilityRole="progressbar"
			accessibilityValue={{
				min: 0,
				max: 100,
				now: value,
			}}
			accessibilityLabel={`Progress: ${value} percent`}
			aria-label={`Progress: ${value} percent`}
			aria-valuemin={0}
			aria-valuemax={100}
			aria-valuenow={value}
			aria-live="polite"
			role="progressbar"
		>
			<Animated.View
				testID="progress-bar-inner"
				style={[styles.bar, { backgroundColor: progressColor, width }]}
				{...(Platform.OS === "web" ? { "aria-hidden": true } : {})}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	track: {
		width: "100%",
		height: Tokens.s,
		borderRadius: Tokens.s,
		overflow: "hidden",
	},
	bar: {
		height: "100%",
	},
});
