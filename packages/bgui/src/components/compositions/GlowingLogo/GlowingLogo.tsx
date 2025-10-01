import { forwardRef, useEffect, useMemo, useRef } from "react";
import {
	Animated,
	Image,
	Platform,
	Pressable,
	StyleSheet,
	View,
	type ViewStyle,
} from "react-native";
import Svg, { Circle, Path } from "react-native-svg";
import { useTheme } from "../../../theme";
import type { GlowingLogoProps } from "./GlowingLogo.types";

const DEFAULT_SIZE = 120;
const glowIntensityMap = {
	low: { blur: 16, scale: 1.05, opacity: 0.55 },
	medium: { blur: 28, scale: 1.15, opacity: 0.75 },
	high: { blur: 36, scale: 1.25, opacity: 0.95 },
} as const;

const useNativeDriver = Platform.OS !== "web";

const DefaultLogo = ({ size, color }: { size: number; color: string }) => (
	<Svg width={size} height={size} viewBox="0 0 120 120" accessibilityRole="image">
		<Circle cx="60" cy="60" r="50" fill={color} />
		<Path d="M60 20 L80 50 L70 50 L70 80 L50 80 L50 50 L40 50 Z" fill="white" opacity="0.9" />
	</Svg>
);

export const GlowingLogo = forwardRef<View, GlowingLogoProps>(
	(
		{
			size = DEFAULT_SIZE,
			glowColor,
			glowIntensity = "medium",
			animate = true,
			source,
			onPress,
			children,
			style,
			testID,
			"aria-label": ariaLabel,
			...viewProps
		},
		ref,
	) => {
		const theme = useTheme();
		const resolvedGlowColor = glowColor ?? theme.colors.primary;
		const pulseAnim = useRef(new Animated.Value(1)).current;
		const glowAnim = useRef(new Animated.Value(glowIntensityMap[glowIntensity].opacity)).current;

		useEffect(() => {
			glowAnim.setValue(glowIntensityMap[glowIntensity].opacity);
		}, [glowAnim, glowIntensity]);

		useEffect(() => {
			const animations: Animated.CompositeAnimation[] = [];

			if (animate) {
				const pulse = Animated.loop(
					Animated.sequence([
						Animated.timing(pulseAnim, {
							toValue: 1.05,
							duration: 1800,
							useNativeDriver,
						}),
						Animated.timing(pulseAnim, {
							toValue: 1,
							duration: 1800,
							useNativeDriver,
						}),
					]),
				);

				const glow = Animated.loop(
					Animated.sequence([
						Animated.timing(glowAnim, {
							toValue: 1,
							duration: 1500,
							useNativeDriver,
						}),
						Animated.timing(glowAnim, {
							toValue: glowIntensityMap[glowIntensity].opacity,
							duration: 1500,
							useNativeDriver,
						}),
					]),
				);

				animations.push(pulse, glow);
				animations.forEach((animation) => animation.start());

				return () => {
					animations.forEach((animation) => animation.stop());
				};
			}

			return undefined;
		}, [animate, glowAnim, glowIntensity, pulseAnim]);

		const Container = useMemo(() => (onPress ? Pressable : View), [onPress]);

		const containerStyle = useMemo(
			() =>
				StyleSheet.flatten<ViewStyle>([
					styles.container,
					{ width: size, height: size },
					style as ViewStyle,
				]),
			[size, style],
		);

		const glowStyles = useMemo(() => {
			const { blur, scale, opacity } = glowIntensityMap[glowIntensity];
			const base: ViewStyle = {
				position: "absolute",
				top: "50%",
				left: "50%",
				width: size * scale,
				height: size * scale,
				marginLeft: -(size * scale) / 2,
				marginTop: -(size * scale) / 2,
				borderRadius: (size * scale) / 2,
				backgroundColor: resolvedGlowColor,
				opacity: animate ? undefined : opacity,
			};

			if (Platform.OS === "web") {
				return [
					base,
					{ filter: `blur(${blur}px)`, willChange: "transform" } as unknown as ViewStyle,
				];
			}

			return [
				base,
				{
					shadowColor: resolvedGlowColor,
					shadowOpacity: 0.35,
					shadowOffset: { width: 0, height: 0 },
					shadowRadius: blur / 4,
				} satisfies ViewStyle,
			];
		}, [animate, glowIntensity, resolvedGlowColor, size]);

		const content = (
			<Animated.View
				pointerEvents="none"
				style={[
					styles.logo,
					{
						width: size,
						height: size,
						backgroundColor: children ? "transparent" : theme.colors.surface,
						transform: animate ? [{ scale: pulseAnim }] : undefined,
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
						<DefaultLogo size={size * 0.8} color={resolvedGlowColor} />
					</View>
				)}
			</Animated.View>
		);

		const glowElement = (
			<Animated.View
				pointerEvents="none"
				style={[...glowStyles, animate ? { opacity: glowAnim } : null]}
			/>
		);

		return (
			<Container
				ref={ref as never}
				onPress={onPress}
				accessibilityRole={onPress ? "button" : undefined}
				accessibilityLabel={ariaLabel ?? "Logo"}
				testID={testID}
				style={containerStyle}
				{...viewProps}
			>
				{glowElement}
				{content}
			</Container>
		);
	},
);

GlowingLogo.displayName = "GlowingLogo";

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
	logo: {
		borderRadius: 999,
		overflow: "hidden",
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
