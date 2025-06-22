import React, { useMemo } from "react";
import {
	View as RNView,
	type ViewProps,
	type ViewStyle,
} from "react-native";
import Animated from "react-native-reanimated";
import { getAccessibilityProps } from "../../../utils/accessibility";
import { withMemo } from "../../../utils/performance";
import { useTheme } from "../../ThemeContext";

interface AccessibleThemedViewProps extends ViewProps {
	variant?: "background" | "surface" | "card";
	animated?: boolean;
	accessibilityLabel?: string;
	accessibilityRole?: any;
}

export const AccessibleThemedView = withMemo<AccessibleThemedViewProps>(
	({
		variant = "background",
		animated = false,
		style,
		children,
		accessibilityLabel,
		accessibilityRole,
		...props
	}) => {
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

		const accessibilityProps = accessibilityLabel
			? getAccessibilityProps(accessibilityLabel, undefined, accessibilityRole)
			: {};

		if (animated) {
			return (
				<Animated.View style={[viewStyle]} {...accessibilityProps} {...props}>
					{children}
				</Animated.View>
			);
		}

		return (
			<RNView style={viewStyle} {...accessibilityProps} {...props}>
				{children}
			</RNView>
		);
	},
	"AccessibleThemedView",
);