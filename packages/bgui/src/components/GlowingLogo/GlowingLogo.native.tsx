import React, { useEffect, useRef } from "react";
import { Animated, Pressable, View, Image, StyleSheet } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import type { GlowingLogoProps } from "./GlowingLogoProps";

/**
 * Native implementation of GlowingLogo component
 *
 * Creates a logo with an animated glow effect
 */

const DEFAULT_SIZE = 120;
const DEFAULT_GLOW_COLOR = "#007fff";

const glowIntensityMap = {
	low: { blur: 20, scale: 1.1, opacity: 0.6 },
	medium: { blur: 30, scale: 1.2, opacity: 0.8 },
	high: { blur: 40, scale: 1.3, opacity: 1 },
};

// Default logo SVG component
const DefaultLogo: React.FC<{ size: number; color: string }> = ({ size, color }) => (
	<Svg width={size} height={size} viewBox="0 0 120 120">
		<Circle cx="60" cy="60" r="50" fill={color} />
		<Path
			d="M60 20 L80 50 L70 50 L70 80 L50 80 L50 50 L40 50 Z"
			fill="white"
			opacity="0.9"
		/>
	</Svg>
);

export const GlowingLogo: React.FC<GlowingLogoProps> = ({
	size = DEFAULT_SIZE,
	glowColor = DEFAULT_GLOW_COLOR,
	glowIntensity = "medium",
	animate = true,
	source,
	onPress,
	children,
	style,
	testID,
	...props
}) => {
	const pulseAnim = useRef(new Animated.Value(1)).current;
	const glowAnim = useRef(new Animated.Value(0.7)).current;
	const { scale, opacity } = glowIntensityMap[glowIntensity];

	useEffect(() => {
		if (!animate) return;

		const pulseAnimation = Animated.loop(
			Animated.sequence([
				Animated.timing(pulseAnim, {
					toValue: 1.05,
					duration: 2000,
					useNativeDriver: true,
				}),
				Animated.timing(pulseAnim, {
					toValue: 1,
					duration: 2000,
					useNativeDriver: true,
				}),
			]),
		);

		const glowAnimation = Animated.loop(
			Animated.sequence([
				Animated.timing(glowAnim, {
					toValue: 1,
					duration: 1500,
					useNativeDriver: true,
				}),
				Animated.timing(glowAnim, {
					toValue: 0.7,
					duration: 1500,
					useNativeDriver: true,
				}),
			]),
		);

		pulseAnimation.start();
		glowAnimation.start();

		return () => {
			pulseAnimation.stop();
			glowAnimation.stop();
		};
	}, [animate, pulseAnim, glowAnim]);

	const content = (
		<View style={[styles.container, { width: size, height: size }, style]} testID={testID} {...props}>
			{/* Glow effect */}
			<Animated.View
				style={[
					styles.glow,
					{
						width: size * scale,
						height: size * scale,
						backgroundColor: glowColor,
						opacity: animate ? glowAnim : opacity,
					},
				]}
			/>

			{/* Logo content */}
			<Animated.View
				style={[
					styles.logoContainer,
					{
						width: size,
						height: size,
						transform: animate ? [{ scale: pulseAnim }] : [],
					},
				]}
			>
				{children ? (
					children
				) : source ? (
					<Image
						source={typeof source === "string" ? { uri: source } : source}
						style={styles.image}
						resizeMode="cover"
					/>
				) : (
					<View style={styles.defaultLogoContainer}>
						<DefaultLogo size={size * 0.8} color={glowColor} />
					</View>
				)}
			</Animated.View>
		</View>
	);

	if (onPress) {
		return (
			<Pressable onPress={onPress} accessible accessibilityRole="button">
				{content}
			</Pressable>
		);
	}

	return content;
};

const styles = StyleSheet.create({
	container: {
		position: "relative",
		alignItems: "center",
		justifyContent: "center",
	},
	glow: {
		position: "absolute",
		borderRadius: 999,
		// Note: React Native doesn't support blur effect natively
		// You would need to use a library like react-native-blur for actual blur
	},
	logoContainer: {
		borderRadius: 999,
		overflow: "hidden",
		backgroundColor: "#1a1a1a",
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		width: "100%",
		height: "100%",
	},
	defaultLogoContainer: {
		alignItems: "center",
		justifyContent: "center",
	},
});