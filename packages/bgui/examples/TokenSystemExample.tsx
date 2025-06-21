import {
	BorderRadius,
	Colors,
	createAnimation,
	getColorWithOpacity,
	getPlatformToken,
	SemanticAnimation,
	SemanticBorderRadius,
	SemanticSpacing,
	SemanticTypography,
	Shadows,
	Tokens,
	Typography,
} from "@braingame/utils";
import React from "react";
import { Pressable, Text, useColorScheme, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

/**
 * Example component demonstrating the improved token system
 * Shows best practices for using tokens in a real component
 */
export function TokenSystemExample() {
	const colorScheme = useColorScheme();
	const colors = Colors[colorScheme ?? "light"];
	const scale = useSharedValue(1);

	// Platform-specific padding
	const padding = getPlatformToken({
		default: SemanticSpacing.componentPaddingM,
		ios: SemanticSpacing.componentPaddingL,
		web: SemanticSpacing.componentPaddingXl,
	});

	// Animated style using semantic animation tokens
	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: scale.value }],
	}));

	const handlePressIn = () => {
		scale.value = withTiming(0.95, createAnimation("press", "interaction"));
	};

	const handlePressOut = () => {
		scale.value = withTiming(1, createAnimation("press", "interaction"));
	};

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: colors.background,
				padding: SemanticSpacing.layoutNormal,
			}}
		>
			{/* Header with semantic typography */}
			<Text style={{ ...SemanticTypography.h2, color: colors.text }}>Token System Demo</Text>

			{/* Subtitle with composed styles */}
			<Text
				style={{
					...SemanticTypography.bodyLarge,
					color: colors.textSecondary,
					marginTop: SemanticSpacing.gapS,
					marginBottom: SemanticSpacing.layoutSpacer,
				}}
			>
				Demonstrating the improved token system
			</Text>

			{/* Card with semantic tokens */}
			<View
				style={{
					backgroundColor: colors.card,
					borderRadius: SemanticBorderRadius.card,
					padding: SemanticSpacing.componentPaddingL,
					...Shadows.md,
					gap: SemanticSpacing.gapM,
				}}
			>
				{/* Section with layout spacing */}
				<View style={{ gap: SemanticSpacing.gapS }}>
					<Text style={{ ...SemanticTypography.h5, color: colors.text }}>Spacing Examples</Text>
					<View
						style={{
							flexDirection: "row",
							gap: SemanticSpacing.gapXs,
						}}
					>
						{["xs", "s", "m", "l", "xl"].map((size) => (
							<View
								key={size}
								style={{
									width: Tokens[size as keyof typeof Tokens],
									height: Tokens[size as keyof typeof Tokens],
									backgroundColor: colors.universal.primary,
									borderRadius: BorderRadius.xs,
								}}
							/>
						))}
					</View>
				</View>

				{/* Interactive button with animations */}
				<Animated.View style={animatedStyle}>
					<Pressable
						onPressIn={handlePressIn}
						onPressOut={handlePressOut}
						style={{
							backgroundColor: colors.universal.primary,
							paddingHorizontal: SemanticSpacing.componentPaddingL,
							paddingVertical: SemanticSpacing.componentPaddingM,
							borderRadius: SemanticBorderRadius.button,
							alignItems: "center",
						}}
					>
						<Text
							style={{
								...SemanticTypography.button,
								color: "#fff",
							}}
						>
							Interactive Button
						</Text>
					</Pressable>
				</Animated.View>

				{/* Color variations */}
				<View style={{ gap: SemanticSpacing.gapS }}>
					<Text style={{ ...SemanticTypography.label, color: colors.text }}>
						Color Opacity Variations
					</Text>
					<View style={{ flexDirection: "row", gap: SemanticSpacing.gapXs }}>
						{[0.2, 0.4, 0.6, 0.8, 1].map((opacity) => (
							<View
								key={opacity}
								style={{
									width: Tokens.xxl,
									height: Tokens.xxl,
									backgroundColor: getColorWithOpacity(colors.universal.primary, opacity),
									borderRadius: BorderRadius.sm,
								}}
							/>
						))}
					</View>
				</View>

				{/* Typography scale */}
				<View style={{ gap: SemanticSpacing.gapXs }}>
					<Text style={{ ...SemanticTypography.h6, color: colors.text }}>Heading 6</Text>
					<Text style={{ ...SemanticTypography.bodyNormal, color: colors.text }}>
						Body text with normal weight and size
					</Text>
					<Text style={{ ...SemanticTypography.caption, color: colors.textSecondary }}>
						Caption text for additional information
					</Text>
				</View>
			</View>

			{/* Pills/Badges */}
			<View
				style={{
					flexDirection: "row",
					gap: SemanticSpacing.gapM,
					marginTop: SemanticSpacing.layoutSpacer,
				}}
			>
				{["primary", "positive", "warn", "negative"].map((intent) => (
					<View
						key={intent}
						style={{
							backgroundColor: colors.universal[intent as keyof typeof colors.universal],
							paddingHorizontal: SemanticSpacing.componentPaddingM,
							paddingVertical: SemanticSpacing.componentPaddingXs,
							borderRadius: SemanticBorderRadius.pill,
						}}
					>
						<Text
							style={{
								...SemanticTypography.label,
								color: "#fff",
							}}
						>
							{intent}
						</Text>
					</View>
				))}
			</View>
		</View>
	);
}
