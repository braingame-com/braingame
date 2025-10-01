import type { Ref } from "react";
import { forwardRef } from "react";
import { type StyleProp, StyleSheet, View, type ViewProps, type ViewStyle } from "react-native";
import type { Theme } from "../../../theme";
import { useTheme } from "../../../theme";

export type SpacingToken = keyof Theme["spacing"];
export type ColorToken = keyof Theme["colors"];
export type RadiusToken = keyof Theme["radii"];

export interface BoxProps extends ViewProps {
	padding?: SpacingToken | number;
	paddingHorizontal?: SpacingToken | number;
	paddingVertical?: SpacingToken | number;
	margin?: SpacingToken | number;
	marginHorizontal?: SpacingToken | number;
	marginVertical?: SpacingToken | number;
	backgroundColor?: ColorToken | string;
	borderRadius?: RadiusToken | number;
	style?: StyleProp<ViewStyle>;
}

const resolveSpacing = (value: SpacingToken | number | undefined, theme: Theme) => {
	if (typeof value === "string") {
		return theme.spacing[value] ?? undefined;
	}
	return value as ViewStyle["backgroundColor"] | undefined;
};

const resolveRadius = (value: RadiusToken | number | undefined, theme: Theme) => {
	if (typeof value === "string") {
		return theme.radii[value] ?? undefined;
	}
	return value;
};

const resolveColor = (value: ColorToken | string | undefined, theme: Theme): string | undefined => {
	if (typeof value === "string" && value in theme.colors) {
		return theme.colors[value as ColorToken];
	}
	return typeof value === "string" ? value : undefined;
};

export const Box = forwardRef<View, BoxProps>(function Box(
	{
		style,
		padding,
		paddingHorizontal,
		paddingVertical,
		margin,
		marginHorizontal,
		marginVertical,
		backgroundColor,
		borderRadius,
		...rest
	},
	ref,
) {
	const theme = useTheme();

	const tokenStyle: ViewStyle = {};

	const resolvedPadding = resolveSpacing(padding, theme);
	if (resolvedPadding !== undefined) {
		tokenStyle.padding = resolvedPadding as ViewStyle["padding"];
	}

	const resolvedPaddingHorizontal = resolveSpacing(paddingHorizontal, theme);
	if (resolvedPaddingHorizontal !== undefined) {
		tokenStyle.paddingHorizontal = resolvedPaddingHorizontal as ViewStyle["paddingHorizontal"];
	}

	const resolvedPaddingVertical = resolveSpacing(paddingVertical, theme);
	if (resolvedPaddingVertical !== undefined) {
		tokenStyle.paddingVertical = resolvedPaddingVertical as ViewStyle["paddingVertical"];
	}

	const resolvedMargin = resolveSpacing(margin, theme);
	if (resolvedMargin !== undefined) {
		tokenStyle.margin = resolvedMargin as ViewStyle["margin"];
	}

	const resolvedMarginHorizontal = resolveSpacing(marginHorizontal, theme);
	if (resolvedMarginHorizontal !== undefined) {
		tokenStyle.marginHorizontal = resolvedMarginHorizontal as ViewStyle["marginHorizontal"];
	}

	const resolvedMarginVertical = resolveSpacing(marginVertical, theme);
	if (resolvedMarginVertical !== undefined) {
		tokenStyle.marginVertical = resolvedMarginVertical as ViewStyle["marginVertical"];
	}

	const resolvedRadius = resolveRadius(borderRadius, theme);
	if (resolvedRadius !== undefined) {
		tokenStyle.borderRadius = resolvedRadius as ViewStyle["borderRadius"];
	}

	const resolvedBackground = resolveColor(backgroundColor, theme);
	if (resolvedBackground !== undefined) {
		tokenStyle.backgroundColor = resolvedBackground;
	}

	const flattenedStyle = StyleSheet.flatten([tokenStyle, style]);

	return <View ref={ref as Ref<View>} style={flattenedStyle} {...rest} />;
});

Box.displayName = "Box";
