import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Animated, Easing, StyleSheet, View, type ViewStyle } from "react-native";
import { theme } from "../../theme";
import { Box } from "../Box";
import type { SkeletonProps } from "./SkeletonProps";

/**
 * Native implementation of Skeleton component
 *
 * Skeleton displays a placeholder preview of content before the data gets loaded.
 * This implementation provides smooth animations and proper theming.
 */

export const Skeleton = forwardRef<View, SkeletonProps>(
	(
		{
			children,
			animation = "pulse",
			variant = "text",
			level = "body-md",
			width,
			height,
			loading = false,
			visible = true,
			style,
			testID,
			"aria-label": ariaLabel,
			"aria-busy": ariaBusy = false,
		},
		ref,
	) => {
		const skeletonRef = useRef<View>(null);
		const pulseAnim = useRef(new Animated.Value(1)).current;
		const waveAnim = useRef(new Animated.Value(0)).current;

		// Merge refs
		useImperativeHandle(ref, () => skeletonRef.current || null);

		// Get typography styles for text variant
		const getTypographyStyles = () => {
			const typographyMap = {
				h1: { fontSize: theme.fontSizes.xl4, lineHeight: theme.fontSizes.xl4 * 1.2 },
				h2: { fontSize: theme.fontSizes.xl3, lineHeight: theme.fontSizes.xl3 * 1.2 },
				h3: { fontSize: theme.fontSizes.xl2, lineHeight: theme.fontSizes.xl2 * 1.25 },
				h4: { fontSize: theme.fontSizes.xl, lineHeight: theme.fontSizes.xl * 1.3 },
				"title-lg": { fontSize: theme.fontSizes.lg, lineHeight: theme.fontSizes.lg * 1.4 },
				"title-md": { fontSize: theme.fontSizes.md, lineHeight: theme.fontSizes.md * 1.4 },
				"title-sm": { fontSize: theme.fontSizes.sm, lineHeight: theme.fontSizes.sm * 1.4 },
				"body-lg": { fontSize: theme.fontSizes.lg, lineHeight: theme.fontSizes.lg * 1.5 },
				"body-md": { fontSize: theme.fontSizes.md, lineHeight: theme.fontSizes.md * 1.5 },
				"body-sm": { fontSize: theme.fontSizes.sm, lineHeight: theme.fontSizes.sm * 1.5 },
				"body-xs": { fontSize: theme.fontSizes.xs, lineHeight: theme.fontSizes.xs * 1.5 },
			};

			return typographyMap[level] || typographyMap["body-md"];
		};

		// Get variant styles
		const getVariantStyles = (): ViewStyle => {
			const backgroundColor = theme.colors.surfaceVariant;
			const typographyStyles = getTypographyStyles();

			switch (variant) {
				case "text":
					return {
						backgroundColor,
						borderRadius: theme.radii.xs,
						height: height || typographyStyles.fontSize,
						width: width || "100%",
					};

				case "circular": {
					const size = width || height || typographyStyles.fontSize * 3;
					return {
						backgroundColor,
						borderRadius: 9999,
						width: size,
						height: size,
					};
				}

				case "rectangular":
					return {
						backgroundColor,
						borderRadius: theme.radii.sm,
						width: width || "100%",
						height: height || typographyStyles.fontSize * 8,
					};

				case "inline":
					return {
						backgroundColor,
						borderRadius: theme.radii.xs,
						height: height || typographyStyles.fontSize,
						width: width || undefined,
					};

				case "overlay":
					return {
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor,
						borderRadius: theme.radii.xs,
					};

				default:
					return {
						backgroundColor,
						borderRadius: theme.radii.xs,
					};
			}
		};

		// Pulse animation
		useEffect(() => {
			if (animation === "pulse" && visible) {
				const pulseAnimation = Animated.loop(
					Animated.sequence([
						Animated.timing(pulseAnim, {
							toValue: 0.8,
							duration: 1000,
							easing: Easing.ease,
							useNativeDriver: true,
						}),
						Animated.timing(pulseAnim, {
							toValue: 1,
							duration: 1000,
							easing: Easing.ease,
							useNativeDriver: true,
						}),
					]),
				);
				pulseAnimation.start();

				return () => {
					pulseAnimation.stop();
				};
			}
		}, [animation, visible, pulseAnim]);

		// Wave animation
		useEffect(() => {
			if (animation === "wave" && visible) {
				const waveAnimation = Animated.loop(
					Animated.timing(waveAnim, {
						toValue: 1,
						duration: 1600,
						easing: Easing.linear,
						useNativeDriver: true,
					}),
				);
				waveAnimation.start();

				return () => {
					waveAnimation.stop();
					waveAnim.setValue(0);
				};
			}
		}, [animation, visible, waveAnim]);

		// Don't render if not visible
		if (!visible) {
			return null;
		}

		const variantStyles = getVariantStyles();

		// Container styles
		const containerStyles = [styles.container, variantStyles, style];

		// Animated styles
		const animatedStyles =
			animation === "pulse"
				? {
						opacity: pulseAnim,
					}
				: {};

		// For overlay variant, render absolutely positioned skeleton
		if (variant === "overlay" && loading) {
			return (
				<Animated.View
					ref={skeletonRef}
					style={[containerStyles, animatedStyles]}
					testID={testID}
					accessibilityLabel={ariaLabel}
					accessibilityState={{ busy: ariaBusy }}
				>
					{animation === "wave" && (
						<Animated.View
							style={[
								styles.wave,
								{
									transform: [
										{
											translateX: waveAnim.interpolate({
												inputRange: [0, 1],
												outputRange: [-200, 200],
											}),
										},
									],
								},
							]}
						/>
					)}
				</Animated.View>
			);
		}

		// For other variants
		return (
			<Box style={containerStyles}>
				<Animated.View
					ref={skeletonRef}
					style={[styles.skeleton, variantStyles, animatedStyles]}
					testID={testID}
					accessibilityLabel={ariaLabel}
					accessibilityState={{ busy: ariaBusy }}
				>
					{animation === "wave" && (
						<Animated.View
							style={[
								styles.wave,
								{
									transform: [
										{
											translateX: waveAnim.interpolate({
												inputRange: [0, 1],
												outputRange: [-200, 200],
											}),
										},
									],
								},
							]}
						/>
					)}
				</Animated.View>
				{children && <View style={styles.hiddenContent}>{children}</View>}
			</Box>
		);
	},
);

const styles = StyleSheet.create({
	container: {
		overflow: "hidden",
		position: "relative",
	},
	skeleton: {
		overflow: "hidden",
	},
	wave: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		width: 100,
		backgroundColor: "rgba(255, 255, 255, 0.3)",
	},
	hiddenContent: {
		opacity: 0,
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
});
