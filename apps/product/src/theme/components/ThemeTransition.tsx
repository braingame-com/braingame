import type React from "react";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
	Extrapolate,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { useTheme } from "../ThemeContext";

interface ThemeTransitionProps {
	children: React.ReactNode;
}

export const ThemeTransition: React.FC<ThemeTransitionProps> = ({ children }) => {
	const { theme, isTransitioning } = useTheme();
	const fadeValue = useSharedValue(1);
	const scaleValue = useSharedValue(1);

	useEffect(() => {
		if (isTransitioning) {
			// Fade out and scale down
			fadeValue.value = withTiming(0, { duration: 150 }, () => {
				// Fade back in and scale up
				fadeValue.value = withTiming(1, { duration: 150 });
			});

			scaleValue.value = withTiming(0.95, { duration: 150 }, () => {
				scaleValue.value = withTiming(1, { duration: 150 });
			});
		}
	}, [isTransitioning]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: fadeValue.value,
			transform: [{ scale: scaleValue.value }],
		};
	});

	return <Animated.View style={[styles.container, animatedStyle]}>{children}</Animated.View>;
};

// Smooth color transition component
interface ColorTransitionProps {
	color: string;
	children: (animatedColor: Animated.SharedValue<string>) => React.ReactNode;
}

export const ColorTransition: React.FC<ColorTransitionProps> = ({ color, children }) => {
	const animatedColor = useSharedValue(color);

	useEffect(() => {
		animatedColor.value = withTiming(color, { duration: 300 });
	}, [color]);

	return <>{children(animatedColor)}</>;
};

// Theme-aware status bar
import { StatusBar } from "expo-status-bar";

export const ThemedStatusBar: React.FC = () => {
	const { theme } = useTheme();

	return (
		<StatusBar
			style={theme.isDark ? "light" : "dark"}
			backgroundColor={theme.colors.background}
			animated
		/>
	);
};

// Screen transition wrapper with theme awareness
interface ThemedScreenProps {
	children: React.ReactNode;
	variant?: "background" | "surface";
	edges?: Array<"top" | "right" | "bottom" | "left">;
}

export const ThemedScreen: React.FC<ThemedScreenProps> = ({
	children,
	variant = "background",
	edges = ["top"],
}) => {
	const { theme } = useTheme();
	const { SafeAreaView } = require("react-native-safe-area-context");

	const backgroundColor = variant === "surface" ? theme.colors.surface : theme.colors.background;

	return (
		<>
			<ThemedStatusBar />
			<SafeAreaView style={[styles.screen, { backgroundColor }]} edges={edges}>
				<ThemeTransition>{children}</ThemeTransition>
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	screen: {
		flex: 1,
	},
});
