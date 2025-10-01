import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
	Animated,
	Easing,
	type LayoutChangeEvent,
	Platform,
	StyleSheet,
	View,
	type ViewStyle,
} from "react-native";
import type { Theme } from "../../../theme";
import { useTheme } from "../../../theme";
import type { VariantStyle } from "../../../theme/variants";
import type { LinearProgressProps } from "./LinearProgress.types";

const DEFAULT_LABEL = "Loading…";

const createSizeMap = (theme: Theme) =>
	({
		sm: { height: 4, radius: theme.radii.xs },
		md: { height: 6, radius: theme.radii.sm },
		lg: { height: 8, radius: theme.radii.md },
	}) as const;

const clampProgress = (value: number) => Math.min(100, Math.max(0, value));

const resolveColorToken = (theme: Theme, token?: string) => {
	if (!token) return undefined;
	if (token in theme.colors) {
		return theme.colors[token as keyof Theme["colors"]];
	}
	return token;
};

export const LinearProgress = forwardRef<View, LinearProgressProps>(
	(
		{
			color = "primary",
			variant = "soft",
			size = "md",
			determinate = false,
			value = 0,
			thickness,
			"aria-label": ariaLabel = DEFAULT_LABEL,
			"aria-valuenow": ariaValueNow,
			"aria-valuemin": ariaValueMin = 0,
			"aria-valuemax": ariaValueMax = 100,
			children,
			style,
			testID,
			onLayout,
			...viewProps
		},
		ref,
	) => {
		const theme = useTheme();
		const sizeMap = useMemo(() => createSizeMap(theme), [theme]);
		const [trackWidth, setTrackWidth] = useState(0);
		const progressValue = useRef(new Animated.Value(clampProgress(value))).current;
		const indeterminateValue = useRef(new Animated.Value(0)).current;
		const indeterminateAnimation = useRef<Animated.CompositeAnimation | null>(null);

		useEffect(() => {
			if (determinate) {
				indeterminateAnimation.current?.stop();
				indeterminateValue.stopAnimation();

				Animated.timing(progressValue, {
					toValue: clampProgress(value),
					duration: 240,
					easing: Easing.out(Easing.ease),
					useNativeDriver: false,
				}).start();
			} else if (trackWidth > 0) {
				indeterminateAnimation.current?.stop();
				indeterminateValue.setValue(0);

				const animation = Animated.loop(
					Animated.timing(indeterminateValue, {
						toValue: 1,
						duration: 1200,
						easing: Easing.inOut(Easing.ease),
						useNativeDriver: Platform.OS !== "web",
					}),
					{ resetBeforeIteration: true },
				);
				animation.start();
				indeterminateAnimation.current = animation;
			}

			return () => {
				if (determinate) {
					indeterminateAnimation.current?.stop();
					indeterminateAnimation.current = null;
				}
			};
		}, [determinate, trackWidth, value, progressValue, indeterminateValue]);

		useEffect(
			() => () => {
				indeterminateAnimation.current?.stop();
				indeterminateAnimation.current = null;
			},
			[],
		);

		const handleLayout = useCallback(
			(event: LayoutChangeEvent) => {
				setTrackWidth(event.nativeEvent.layout.width);
				onLayout?.(event);
			},
			[onLayout],
		);

		const variantKey = `${variant}-${color}`;
		const variantMap = theme.components.LinearProgress.variants as Record<string, VariantStyle>;
		const variantStyles = variantMap[variantKey] ?? variantMap["soft-primary"];

		const resolvedTrackColor =
			resolveColorToken(theme, variantStyles.backgroundColor) ?? theme.colors.surfaceVariant;
		const resolvedProgressColor =
			resolveColorToken(theme, variantStyles.color) ?? theme.colors.primary;
		const resolvedBorderColor = resolveColorToken(theme, variantStyles.borderColor);

		const { height, radius } = sizeMap[size];
		const progressHeight = thickness ?? height;

		const progressWidth = useMemo(
			() =>
				progressValue.interpolate({
					inputRange: [0, 100],
					outputRange: [0, trackWidth],
					extrapolate: "clamp",
				}),
			[progressValue, trackWidth],
		);

		const indeterminateTranslate = useMemo(() => {
			if (trackWidth === 0) {
				return 0;
			}

			return indeterminateValue.interpolate({
				inputRange: [0, 1],
				outputRange: [-trackWidth, trackWidth],
				extrapolate: "clamp",
			});
		}, [indeterminateValue, trackWidth]);

		const indicatorWidth = determinate
			? progressWidth
			: trackWidth > 0
				? Math.max(trackWidth * 0.4, 1)
				: "50%";

		const trackStyle = useMemo(
			() =>
				StyleSheet.flatten<ViewStyle>([
					styles.track,
					{
						height: progressHeight,
						borderRadius: radius,
						backgroundColor: resolvedTrackColor,
						borderColor: resolvedBorderColor,
						borderWidth: variantStyles.borderWidth ?? 0,
					},
					style as ViewStyle,
				]),
			[
				progressHeight,
				radius,
				resolvedBorderColor,
				resolvedTrackColor,
				style,
				variantStyles.borderWidth,
			],
		);

		const indicatorStyle = useMemo(
			() =>
				StyleSheet.flatten<ViewStyle>([
					styles.indicator,
					{
						height: progressHeight,
						borderRadius: radius,
						backgroundColor: resolvedProgressColor,
						width: indicatorWidth,
						transform:
							determinate || trackWidth === 0
								? undefined
								: [{ translateX: indeterminateTranslate }],
					},
				]),
			[
				determinate,
				indicatorWidth,
				indeterminateTranslate,
				progressHeight,
				radius,
				resolvedProgressColor,
				trackWidth,
			],
		);

		const accessibilityValue = determinate
			? {
					min: ariaValueMin,
					max: ariaValueMax,
					now: ariaValueNow ?? clampProgress(value),
				}
			: {
					min: ariaValueMin,
					max: ariaValueMax,
				};

		return (
			<View
				ref={ref}
				style={trackStyle}
				testID={testID}
				accessibilityRole="progressbar"
				accessibilityLabel={ariaLabel}
				accessibilityValue={accessibilityValue}
				onLayout={handleLayout}
				{...viewProps}
			>
				<Animated.View style={indicatorStyle} testID={testID ? `${testID}-indicator` : undefined} />
				{children ? (
					<View pointerEvents="none" style={styles.children}>
						{children}
					</View>
				) : null}
			</View>
		);
	},
);

LinearProgress.displayName = "LinearProgress";

const styles = StyleSheet.create({
	track: {
		overflow: "hidden",
		position: "relative",
		justifyContent: "center",
	},
	indicator: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
	},
	children: {
		...StyleSheet.absoluteFillObject,
		justifyContent: "center",
		alignItems: "center",
	},
});
