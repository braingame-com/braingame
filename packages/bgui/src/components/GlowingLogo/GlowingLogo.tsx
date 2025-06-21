import React, { useEffect, useRef } from "react";
import { Animated, Pressable, View, Platform } from "react-native";
import { styles } from "./styles";
import type { GlowingLogoProps } from "./types";

const DEFAULT_SIZE = 120;
const DEFAULT_GLOW_COLOR = "#7c3aed";

const glowIntensityMap = {
	low: { blur: 20, scale: 1.1 },
	medium: { blur: 30, scale: 1.2 },
	high: { blur: 40, scale: 1.3 },
};

export const GlowingLogo: React.FC<GlowingLogoProps> = ({
	size = DEFAULT_SIZE,
	glowColor = DEFAULT_GLOW_COLOR,
	glowIntensity = "medium",
	animate = true,
	onPress,
	...viewProps
}) => {
	const pulseAnim = useRef(new Animated.Value(1)).current;
	const glowAnim = useRef(new Animated.Value(0.7)).current;

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
			])
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
			])
		);

		pulseAnimation.start();
		glowAnimation.start();

		return () => {
			pulseAnimation.stop();
			glowAnimation.stop();
		};
	}, [animate, pulseAnim, glowAnim]);

	const { blur, scale } = glowIntensityMap[glowIntensity];

	const LogoSvg = Platform.OS === "web" ? (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="white"
			style={{ display: "block" }}
		>
			<path d="m20.88,7.56l1.56-.78,1.56-.78v-2.88c0-.57-.15-1.1-.42-1.56-.27-.47-.67-.87-1.14-1.14C21.98.15,21.45,0,20.88,0H3.12C2.55,0,2.02.15,1.56.42c-.47.27-.87.67-1.14,1.14-.27.46-.42.99-.42,1.56v17.76c0,.57.15,1.1.42,1.56.27.47.67.87,1.14,1.14.46.27.99.42,1.56.42h17.76c.57,0,1.1-.15,1.56-.42.47-.27.87-.67,1.14-1.14.27-.46.42-.99.42-1.56v-10.44h-8.88l-3.12,1.56,3.12,1.56h5.76v5.76c0,.19-.03.38-.1.55l-2.2-1.1-.58-.29-12.95-6.48,12.95-6.48.58-.29,2.2-1.1c.06.17.1.35.1.55v2.88Zm-5.05,13.32H4.68c-.86,0-1.56-.7-1.56-1.56v-4.79l12.71,6.35ZM3.12,9.47v-4.79c0-.86.7-1.56,1.56-1.56h11.14L3.12,9.47Z" />
		</svg>
	) : null;

	const glowStyle = Platform.OS === "web" ? {
		boxShadow: `0 0 ${blur}px ${glowColor}`,
	} : {};

	const content = (
		<Animated.View
			style={[
				styles.logoContainer,
				{
					transform: [{ scale: pulseAnim }],
					width: size,
					height: size,
				},
			]}
		>
			{/* Glow layers - only on web with CSS box-shadow */}
			{Platform.OS === "web" && (
				<>
					<Animated.View
						style={[
							styles.glowLayer,
							{
								opacity: glowAnim,
								transform: [{ scale }],
								width: size,
								height: size,
								borderRadius: size / 4,
								backgroundColor: glowColor,
								...glowStyle,
							},
						]}
					/>
					<Animated.View
						style={[
							styles.glowLayer,
							{
								opacity: Animated.multiply(glowAnim, 0.6),
								transform: [{ scale: scale * 0.8 }],
								width: size,
								height: size,
								borderRadius: size / 4,
								backgroundColor: glowColor,
								...glowStyle,
							},
						]}
					/>
				</>
			)}

			{/* Logo */}
			<View style={styles.logo}>
				{LogoSvg}
			</View>
		</Animated.View>
	);

	return (
		<View style={[styles.container, viewProps.style]} {...viewProps}>
			{onPress ? (
				<Pressable onPress={onPress}>{content}</Pressable>
			) : (
				content
			)}
		</View>
	);
};