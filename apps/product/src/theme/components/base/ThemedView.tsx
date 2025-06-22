import React, { useMemo } from "react";
import { View as RNView, type ViewProps, type ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { withMemo } from "../../../utils/performance";
import { useTheme } from "../../ThemeContext";

interface ThemedViewProps extends ViewProps {
	variant?: "background" | "surface" | "card";
	animated?: boolean;
}

export const ThemedView = withMemo<ThemedViewProps>(
	({ variant = "background", animated = false, style, children, ...props }) => {
		const { theme } = useTheme();

		const backgroundColor = useMemo(() => {
			switch (variant) {
				case "surface":
					return theme.colors.surface;
				case "card":
					return theme.components.card.background;
				default:
					return theme.colors.background;
			}
		}, [variant, theme]);

		const viewStyle = useMemo<ViewStyle>(
			() => ({
				backgroundColor,
				...(style as ViewStyle),
			}),
			[backgroundColor, style],
		);

		if (animated) {
			return (
				<Animated.View style={[viewStyle]} {...props}>
					{children}
				</Animated.View>
			);
		}

		return (
			<RNView style={viewStyle} {...props}>
				{children}
			</RNView>
		);
	},
	"ThemedView",
);
