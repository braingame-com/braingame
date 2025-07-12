import { Text, type TextProps } from "@braingame/bgui";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

interface AnimatedTextProps extends TextProps {
	children: React.ReactNode;
	delay?: number;
	duration?: number;
	fadeIn?: boolean;
	slideUp?: boolean;
}

export function AnimatedText({
	children,
	delay = 0,
	duration = 600,
	fadeIn = true,
	slideUp = false,
	style,
	...props
}: AnimatedTextProps) {
	const fadeAnim = useRef(new Animated.Value(fadeIn ? 0 : 1)).current;
	const slideAnim = useRef(new Animated.Value(slideUp ? 20 : 0)).current;

	useEffect(() => {
		const animations = [];

		if (fadeIn) {
			animations.push(
				Animated.timing(fadeAnim, {
					toValue: 1,
					duration,
					delay,
					useNativeDriver: true,
				}),
			);
		}

		if (slideUp) {
			animations.push(
				Animated.timing(slideAnim, {
					toValue: 0,
					duration,
					delay,
					useNativeDriver: true,
				}),
			);
		}

		Animated.parallel(animations).start();
	}, [fadeIn, slideUp, delay, duration, fadeAnim, slideAnim]);

	return (
		<Animated.Text
			{...props}
			style={[
				style,
				{
					opacity: fadeAnim,
					transform: [{ translateY: slideAnim }],
				},
			]}
		>
			{children}
		</Animated.Text>
	);
}

interface GradientTextProps extends TextProps {
	gradient?: string[];
	children: React.ReactNode;
}

export function GradientText({
	gradient = ["#0074D9", "#00C9FF"],
	children,
	style,
	...props
}: GradientTextProps) {
	// Note: True gradient text requires SVG or web-specific CSS
	// For React Native compatibility, we'll use a solid color
	return (
		<Text
			{...props}
			style={[
				style,
				{
					color: gradient[0],
					fontWeight: "bold",
				},
			]}
		>
			{children}
		</Text>
	);
}

interface HighlightTextProps extends TextProps {
	children: string;
	highlight: string;
	highlightColor?: string;
}

export function HighlightText({
	children,
	highlight,
	highlightColor = "#0074D9",
	style,
	...props
}: HighlightTextProps) {
	if (!highlight) {
		return (
			<Text style={style} {...props}>
				{children}
			</Text>
		);
	}

	const parts = children.split(new RegExp(`(${highlight})`, "gi"));

	return (
		<Text style={style} {...props}>
			{parts.map((part) =>
				part.toLowerCase() === highlight.toLowerCase() ? (
					<Text key={part} style={{ color: highlightColor, fontWeight: "bold" }}>
						{part}
					</Text>
				) : (
					part
				),
			)}
		</Text>
	);
}
