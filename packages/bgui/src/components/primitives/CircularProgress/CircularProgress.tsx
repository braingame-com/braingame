import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import {
	Animated,
	Easing,
	type StyleProp,
	StyleSheet,
	type View,
	type ViewStyle,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import { theme } from "../../../theme";
import { Box } from "../Box";
import { Typography } from "../Typography";
import type {
	CircularProgressProps,
	CircularProgressSize,
	CircularProgressVariant,
} from "./CircularProgress.types";

type SizeTokens = {
	size: number;
	strokeWidth: number;
	labelLevel: "body-xs" | "body-sm" | "body-md";
};

const SIZE_MAP: Record<CircularProgressSize, SizeTokens> = {
	sm: { size: 32, strokeWidth: 4, labelLevel: "body-xs" },
	md: { size: 40, strokeWidth: 6, labelLevel: "body-sm" },
	lg: { size: 56, strokeWidth: 8, labelLevel: "body-md" },
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const resolveThemeColor = (value?: string) => {
	if (!value) return undefined;
	return theme.colors[value as keyof typeof theme.colors] ?? value;
};

const getVariantTokens = (
	variant: CircularProgressVariant,
	color: NonNullable<CircularProgressProps["color"]>,
) => {
	const key = `${variant}-${color}` as keyof typeof theme.components.CircularProgress.variants;
	return (
		theme.components.CircularProgress.variants[key] ??
		theme.components.CircularProgress.variants["soft-primary"]
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
	svgWrapper: {
		width: "100%",
		height: "100%",
	},
	content: {
		position: "absolute",
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		alignItems: "center",
		justifyContent: "center",
	},
});

export const CircularProgress = forwardRef<View, CircularProgressProps>(
	(
		{
			"aria-label": ariaLabel = "Loading…",
			"aria-labelledby": ariaLabelledby,
			"aria-valuemax": ariaValueMax,
			"aria-valuemin": ariaValueMin,
			"aria-valuenow": ariaValueNow,
			"aria-valuetext": ariaValueText,
			children,
			className: _className,
			color = "primary",
			determinate = false,
			size = "md",
			style,
			testID,
			thickness,
			value = 0,
			variant = "soft",
		},
		ref,
	) => {
		const containerRef = useRef<View>(null);
		useImperativeHandle(ref, () => containerRef.current as View);

		const rotationValue = useRef(new Animated.Value(0)).current;
		const clampedValue = Math.min(Math.max(value, 0), 100);
		const progressValue = useRef(new Animated.Value(clampedValue)).current;

		const sizeTokens = SIZE_MAP[size];
		const strokeWidth = thickness ?? sizeTokens.strokeWidth;
		const radius = (sizeTokens.size - strokeWidth) / 2;
		const circumference = 2 * Math.PI * radius;

		const variantTokens = useMemo(() => getVariantTokens(variant, color), [color, variant]);

		const resolvedBackground = resolveThemeColor(variantTokens.backgroundColor);
		const resolvedForeground = resolveThemeColor(variantTokens.color);

		const progressColor = useMemo(() => {
			if (variant === "solid") {
				return resolvedBackground ?? theme.colors[color];
			}
			return resolvedForeground ?? theme.colors[color];
		}, [color, resolvedBackground, resolvedForeground, variant]);

		const trackColor = useMemo(() => {
			if (variant === "soft") {
				return theme.colors.surfaceVariant;
			}
			if (variant === "solid") {
				return theme.colors.surfaceVariant;
			}
			return resolvedBackground ?? theme.colors.outlineVariant;
		}, [resolvedBackground, variant]);

		useEffect(() => {
			if (!determinate) {
				const animation = Animated.loop(
					Animated.timing(rotationValue, {
						toValue: 1,
						duration: 1200,
						easing: Easing.linear,
						useNativeDriver: true,
					}),
				);
				animation.start();
				return () => {
					animation.stop();
					rotationValue.setValue(0);
				};
			}
			return undefined;
		}, [determinate, rotationValue]);

		useEffect(() => {
			if (determinate) {
				Animated.timing(progressValue, {
					toValue: clampedValue,
					duration: 240,
					easing: Easing.out(Easing.ease),
					useNativeDriver: false,
				}).start();
			} else {
				progressValue.setValue(75);
			}
		}, [clampedValue, determinate, progressValue]);

		const strokeDashoffset = determinate
			? progressValue.interpolate({
					inputRange: [0, 100],
					outputRange: [circumference, 0],
					extrapolate: "clamp",
				})
			: circumference * 0.75;

		const rotation = rotationValue.interpolate({
			inputRange: [0, 1],
			outputRange: ["0deg", "360deg"],
		});

		const containerStyle = [
			styles.container,
			{ width: sizeTokens.size, height: sizeTokens.size },
			style,
		].filter(Boolean) as StyleProp<ViewStyle>;

		const accessibilityValue = determinate
			? {
					min: ariaValueMin ?? 0,
					max: ariaValueMax ?? 100,
					now: ariaValueNow ?? clampedValue,
					...(ariaValueText ? { text: ariaValueText } : {}),
				}
			: ariaValueText
				? {
						text: ariaValueText,
					}
				: undefined;

		const renderChildren = () => {
			if (children === undefined || children === null) {
				return null;
			}

			if (typeof children === "string" || typeof children === "number") {
				return (
					<Typography level={sizeTokens.labelLevel} style={{ color: progressColor }}>
						{children}
					</Typography>
				);
			}

			return children;
		};

		return (
			<Box
				ref={containerRef}
				accessibilityLabel={ariaLabel}
				accessibilityRole="progressbar"
				accessibilityValue={accessibilityValue}
				accessibilityLabelledBy={ariaLabelledby}
				style={containerStyle}
				testID={testID}
			>
				<Animated.View
					style={[styles.svgWrapper, !determinate && { transform: [{ rotate: rotation }] }]}
				>
					<Svg
						width={sizeTokens.size}
						height={sizeTokens.size}
						viewBox={`0 0 ${sizeTokens.size} ${sizeTokens.size}`}
					>
						<Circle
							cx={sizeTokens.size / 2}
							cy={sizeTokens.size / 2}
							r={radius}
							fill="none"
							stroke={trackColor}
							strokeWidth={strokeWidth}
							opacity={0.35}
						/>
						<AnimatedCircle
							cx={sizeTokens.size / 2}
							cy={sizeTokens.size / 2}
							r={radius}
							fill="none"
							stroke={progressColor}
							strokeWidth={strokeWidth}
							strokeDasharray={circumference}
							strokeDashoffset={strokeDashoffset}
							strokeLinecap="round"
							transform={`rotate(-90 ${sizeTokens.size / 2} ${sizeTokens.size / 2})`}
						/>
					</Svg>
				</Animated.View>
				<Box style={styles.content}>{renderChildren()}</Box>
			</Box>
		);
	},
);

CircularProgress.displayName = "CircularProgress";
