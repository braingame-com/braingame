import { useMemo } from "react";
import { type ImageStyle, StyleSheet, type TextStyle, type ViewStyle } from "react-native";
import { useTheme } from "../ThemeContext";
import type { Theme } from "../types";

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export function useThemedStyles<T extends NamedStyles<T>>(styleFactory: (theme: Theme) => T): T {
	const { theme } = useTheme();

	return useMemo(() => {
		return StyleSheet.create(styleFactory(theme));
	}, [theme, styleFactory]);
}

// Common themed style utilities
export const useThemedUtilities = () => {
	const { theme } = useTheme();

	return useMemo(
		() => ({
			// Spacing utilities
			spacing: {
				xs: theme.sizes.spacingXS,
				sm: theme.sizes.spacingSM,
				md: theme.sizes.spacingMD,
				lg: theme.sizes.spacingLG,
				xl: theme.sizes.spacingXL,
				"2xl": theme.sizes.spacing2XL,
				"3xl": theme.sizes.spacing3XL,
			},

			// Padding utilities
			padding: {
				xs: { padding: theme.sizes.spacingXS },
				sm: { padding: theme.sizes.spacingSM },
				md: { padding: theme.sizes.spacingMD },
				lg: { padding: theme.sizes.spacingLG },
				xl: { padding: theme.sizes.spacingXL },
			},

			// Margin utilities
			margin: {
				xs: { margin: theme.sizes.spacingXS },
				sm: { margin: theme.sizes.spacingSM },
				md: { margin: theme.sizes.spacingMD },
				lg: { margin: theme.sizes.spacingLG },
				xl: { margin: theme.sizes.spacingXL },
			},

			// Border radius utilities
			rounded: {
				xs: { borderRadius: theme.sizes.radiusXS },
				sm: { borderRadius: theme.sizes.radiusSM },
				md: { borderRadius: theme.sizes.radiusMD },
				lg: { borderRadius: theme.sizes.radiusLG },
				xl: { borderRadius: theme.sizes.radiusXL },
				full: { borderRadius: theme.sizes.radiusFull },
			},

			// Shadow utilities
			shadow: {
				none: {},
				sm: {
					shadowColor: theme.colors.shadow,
					shadowOffset: { width: 0, height: 1 },
					shadowOpacity: 0.05,
					shadowRadius: 2,
					elevation: 1,
				},
				md: {
					shadowColor: theme.colors.shadow,
					shadowOffset: { width: 0, height: 2 },
					shadowOpacity: 0.1,
					shadowRadius: 4,
					elevation: 2,
				},
				lg: {
					shadowColor: theme.colors.shadow,
					shadowOffset: { width: 0, height: 4 },
					shadowOpacity: 0.15,
					shadowRadius: 8,
					elevation: 4,
				},
				xl: {
					shadowColor: theme.colors.shadow,
					shadowOffset: { width: 0, height: 8 },
					shadowOpacity: 0.2,
					shadowRadius: 16,
					elevation: 8,
				},
			},

			// Border utilities
			border: {
				none: { borderWidth: 0 },
				thin: {
					borderWidth: 1,
					borderColor: theme.colors.border,
				},
				medium: {
					borderWidth: 2,
					borderColor: theme.colors.border,
				},
				thick: {
					borderWidth: 4,
					borderColor: theme.colors.border,
				},
			},

			// Flex utilities
			flex: {
				row: {
					flexDirection: "row" as const,
				},
				col: {
					flexDirection: "column" as const,
				},
				center: {
					justifyContent: "center" as const,
					alignItems: "center" as const,
				},
				between: {
					justifyContent: "space-between" as const,
				},
				around: {
					justifyContent: "space-around" as const,
				},
				evenly: {
					justifyContent: "space-evenly" as const,
				},
			},

			// Text alignment utilities
			text: {
				left: { textAlign: "left" as const },
				center: { textAlign: "center" as const },
				right: { textAlign: "right" as const },
				justify: { textAlign: "justify" as const },
			},

			// Common component styles
			components: {
				container: {
					flex: 1,
					backgroundColor: theme.colors.background,
				},
				surface: {
					backgroundColor: theme.colors.surface,
				},
				card: {
					backgroundColor: theme.components.card.background,
					borderRadius: theme.sizes.radiusLG,
					borderWidth: 1,
					borderColor: theme.components.card.border,
					...{
						shadowColor: theme.components.card.shadow,
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.05,
						shadowRadius: 4,
						elevation: 2,
					},
				},
				divider: {
					height: 1,
					backgroundColor: theme.colors.divider,
				},
				input: {
					backgroundColor: theme.components.input.background,
					borderWidth: 1,
					borderColor: theme.components.input.border,
					borderRadius: theme.sizes.radiusMD,
					paddingVertical: theme.sizes.spacingSM + 4,
					paddingHorizontal: theme.sizes.spacingMD,
					fontSize: theme.sizes.fontSizeMD,
					color: theme.components.input.text,
					fontFamily: "Lexend",
					fontWeight: "400",
				},
			},
		}),
		[theme],
	);
};
