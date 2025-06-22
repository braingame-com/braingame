import React, { useMemo } from "react";
import {
	TouchableOpacity as RNTouchableOpacity,
	View as RNView,
	type ViewProps,
	type ViewStyle,
} from "react-native";
import { withMemo } from "../../../utils/performance";
import { useTheme } from "../../ThemeContext";

interface ThemedCardProps extends ViewProps {
	elevation?: "none" | "low" | "medium" | "high";
	padding?: "none" | "small" | "medium" | "large";
	onPress?: () => void;
}

export const ThemedCard = withMemo<ThemedCardProps>(
	({ elevation = "low", padding = "medium", onPress, style, children, ...props }) => {
		const { theme } = useTheme();

		const cardStyle = useMemo<ViewStyle>(() => {
			const elevationStyles = {
				none: {},
				low: {
					shadowColor: theme.components.card.shadow,
					shadowOffset: { width: 0, height: 2 },
					shadowOpacity: 0.05,
					shadowRadius: 4,
					elevation: 2,
				},
				medium: {
					shadowColor: theme.components.card.shadow,
					shadowOffset: { width: 0, height: 4 },
					shadowOpacity: 0.1,
					shadowRadius: 8,
					elevation: 4,
				},
				high: {
					shadowColor: theme.components.card.shadow,
					shadowOffset: { width: 0, height: 8 },
					shadowOpacity: 0.15,
					shadowRadius: 16,
					elevation: 8,
				},
			};

			const paddingMap = {
				none: 0,
				small: theme.sizes.spacingSM,
				medium: theme.sizes.spacingMD,
				large: theme.sizes.spacingLG,
			};

			return {
				backgroundColor: theme.components.card.background,
				borderRadius: theme.sizes.radiusLG,
				borderWidth: 1,
				borderColor: theme.components.card.border,
				padding: paddingMap[padding],
				...elevationStyles[elevation],
				...(style as ViewStyle),
			};
		}, [elevation, padding, theme, style]);

		if (onPress) {
			return (
				<RNTouchableOpacity onPress={onPress} activeOpacity={0.8} {...props}>
					<RNView style={cardStyle}>{children}</RNView>
				</RNTouchableOpacity>
			);
		}

		return (
			<RNView style={cardStyle} {...props}>
				{children}
			</RNView>
		);
	},
	"ThemedCard",
);
