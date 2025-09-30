import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import {
	AccessibilityInfo,
	Animated,
	type DimensionValue,
	Easing,
	Platform,
	type View as RNView,
	type StyleProp,
	StyleSheet,
	View,
	type ViewStyle,
} from "react-native";
import { theme } from "../../../theme";
import type {
	SkeletonAnimation,
	SkeletonLevel,
	SkeletonProps,
	SkeletonVariant,
} from "./Skeleton.types";

const usePrefersReducedMotion = () => {
	const [prefers, setPrefers] = useState(false);

	useEffect(() => {
		if (Platform.OS === "web") {
			if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
				const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
				const handleChange = (event: MediaQueryListEvent) => {
					setPrefers(event.matches);
				};

				setPrefers(mediaQuery.matches);

				if (typeof mediaQuery.addEventListener === "function") {
					mediaQuery.addEventListener("change", handleChange);
					return () => {
						mediaQuery.removeEventListener("change", handleChange);
					};
				}

				mediaQuery.addListener(handleChange);
				return () => {
					mediaQuery.removeListener(handleChange);
				};
			}

			return undefined;
		}

		let isMounted = true;
		const handleReduceMotion = (value: boolean) => {
			if (isMounted) {
				setPrefers(value);
			}
		};

		AccessibilityInfo.isReduceMotionEnabled()
			.then(handleReduceMotion)
			.catch(() => {
				// No-op when the platform does not support this setting.
			});

		const subscription = AccessibilityInfo.addEventListener?.(
			"reduceMotionChanged",
			handleReduceMotion,
		);

		return () => {
			isMounted = false;

			if (subscription && typeof subscription.remove === "function") {
				subscription.remove();
				return;
			}

			// Fallback for older React Native versions where removeEventListener is still required.
			// @ts-expect-error - removeEventListener exists on legacy React Native types.
			AccessibilityInfo.removeEventListener?.("reduceMotionChanged", handleReduceMotion);
		};
	}, []);

	return prefers;
};

const getTypographyMetrics = (level: SkeletonLevel) => {
	const map: Record<SkeletonLevel, { fontSize: number; lineHeight: number }> = {
		h1: { fontSize: theme.fontSizes.xl5, lineHeight: theme.fontSizes.xl5 * 1.2 },
		h2: { fontSize: theme.fontSizes.xl4, lineHeight: theme.fontSizes.xl4 * 1.2 },
		h3: { fontSize: theme.fontSizes.xl3, lineHeight: theme.fontSizes.xl3 * 1.25 },
		h4: { fontSize: theme.fontSizes.xl2, lineHeight: theme.fontSizes.xl2 * 1.3 },
		"title-lg": { fontSize: theme.fontSizes.lg, lineHeight: theme.fontSizes.lg * 1.4 },
		"title-md": { fontSize: theme.fontSizes.md, lineHeight: theme.fontSizes.md * 1.4 },
		"title-sm": { fontSize: theme.fontSizes.sm, lineHeight: theme.fontSizes.sm * 1.4 },
		"body-lg": { fontSize: theme.fontSizes.lg, lineHeight: theme.fontSizes.lg * 1.5 },
		"body-md": { fontSize: theme.fontSizes.md, lineHeight: theme.fontSizes.md * 1.5 },
		"body-sm": { fontSize: theme.fontSizes.sm, lineHeight: theme.fontSizes.sm * 1.5 },
		"body-xs": { fontSize: theme.fontSizes.xs, lineHeight: theme.fontSizes.xs * 1.5 },
	};

	return map[level] ?? map["body-md"];
};

const toDimensionValue = (value?: number | string): DimensionValue | undefined => {
	if (value === undefined) {
		return undefined;
	}

	return value as DimensionValue;
};

const resolveVariantStyles = (
	variant: SkeletonVariant,
	level: SkeletonLevel,
	width?: number | string,
	height?: number | string,
): ViewStyle => {
	const backgroundColor = theme.colors.surfaceVariant;
	const borderRadius = theme.radii.xs;
	const metrics = getTypographyMetrics(level);

	switch (variant) {
		case "text":
			return {
				backgroundColor,
				borderRadius,
				height: toDimensionValue(height ?? metrics.fontSize),
				width: toDimensionValue(width ?? "100%"),
			};
		case "circular": {
			const size = width ?? height ?? metrics.fontSize * 3;
			return {
				backgroundColor,
				borderRadius: 9999,
				height: toDimensionValue(size),
				width: toDimensionValue(size),
			};
		}
		case "rectangular":
			return {
				backgroundColor,
				borderRadius: theme.radii.sm,
				height: toDimensionValue(height ?? metrics.fontSize * 8),
				width: toDimensionValue(width ?? "100%"),
			};
		case "inline":
			return {
				backgroundColor,
				borderRadius,
				height: toDimensionValue(height ?? metrics.fontSize),
				width: toDimensionValue(width ?? metrics.fontSize * 5),
				alignSelf: "flex-start",
			};
		case "overlay":
			return {
				backgroundColor,
				borderRadius,
				...StyleSheet.absoluteFillObject,
			};
		default:
			return {
				backgroundColor,
				borderRadius,
				height: toDimensionValue(height ?? metrics.fontSize),
				width: toDimensionValue(width ?? "100%"),
			};
	}
};

export const Skeleton = forwardRef<RNView, SkeletonProps>(
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
			className,
			"aria-label": ariaLabel,
			"aria-busy": ariaBusy = false,
			...rest
		},
		ref,
	) => {
		const rootRef = useRef<RNView | null>(null);
		useImperativeHandle(ref, () => rootRef.current ?? ({} as RNView));

		const prefersReducedMotion = usePrefersReducedMotion();
		const resolvedAnimation: SkeletonAnimation = prefersReducedMotion ? false : animation;

		const pulseAnim = useRef(new Animated.Value(1)).current;
		const waveAnim = useRef(new Animated.Value(0)).current;

		useEffect(() => {
			if (!visible || resolvedAnimation !== "pulse") {
				pulseAnim.stopAnimation(() => {
					pulseAnim.setValue(1);
				});
				return;
			}

			const animationLoop = Animated.loop(
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

			animationLoop.start();

			return () => {
				animationLoop.stop();
				pulseAnim.setValue(1);
			};
		}, [pulseAnim, resolvedAnimation, visible]);

		useEffect(() => {
			if (!visible || resolvedAnimation !== "wave") {
				waveAnim.stopAnimation(() => {
					waveAnim.setValue(0);
				});
				return;
			}

			const animationLoop = Animated.loop(
				Animated.timing(waveAnim, {
					toValue: 1,
					duration: 1600,
					easing: Easing.linear,
					useNativeDriver: true,
				}),
			);

			animationLoop.start();

			return () => {
				animationLoop.stop();
				waveAnim.setValue(0);
			};
		}, [resolvedAnimation, visible, waveAnim]);

		if (!visible) {
			return null;
		}

		const variantStyles = resolveVariantStyles(variant, level, width, height);

		const containerStyles = [styles.container, variantStyles, style].filter(Boolean) as Array<
			StyleProp<ViewStyle>
		>;

		const animatedStyles = resolvedAnimation === "pulse" ? { opacity: pulseAnim } : undefined;
		const waveStyle =
			resolvedAnimation === "wave"
				? [
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
					]
				: undefined;

		const accessibilityState = { busy: ariaBusy };

		const sharedWebProps = className ? ({ className } as Record<string, unknown>) : undefined;

		if (variant === "overlay" && loading) {
			return (
				<Animated.View
					ref={rootRef}
					style={[containerStyles, animatedStyles]}
					testID={testID}
					accessibilityLabel={ariaLabel}
					accessibilityState={accessibilityState}
					{...(sharedWebProps as Record<string, unknown>)}
					{...rest}
				>
					{waveStyle ? <Animated.View style={waveStyle} /> : null}
				</Animated.View>
			);
		}

		const flattenedContainerStyle = StyleSheet.flatten(containerStyles);

		return (
			<View
				ref={rootRef}
				style={flattenedContainerStyle}
				{...(sharedWebProps as Record<string, unknown>)}
				{...rest}
			>
				<Animated.View
					style={[styles.skeleton, variantStyles, animatedStyles]}
					testID={testID}
					accessibilityLabel={ariaLabel}
					accessibilityState={accessibilityState}
				>
					{waveStyle ? <Animated.View style={waveStyle} /> : null}
				</Animated.View>
				{children ? <View style={styles.hiddenContent}>{children}</View> : null}
			</View>
		);
	},
);

Skeleton.displayName = "Skeleton";

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
		width: 120,
		backgroundColor: "rgba(255, 255, 255, 0.35)",
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
