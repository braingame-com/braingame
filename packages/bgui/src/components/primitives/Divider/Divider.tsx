import type { AriaAttributes } from "react";
import { type DimensionValue, Platform, StyleSheet, type ViewStyle } from "react-native";
import { theme } from "../../../theme";
import { Box, type BoxProps } from "../Box";
import { Typography } from "../Typography";
import type { DividerColorToken, DividerProps, DividerVariant } from "./Divider.types";

const VARIANT_COLOR_MAP: Record<DividerVariant, DividerColorToken> = {
	default: "outline",
	subtle: "outlineVariant",
	emphasized: "onSurfaceVariant",
};

const resolveColor = (variant: DividerVariant, color?: DividerProps["color"]) => {
	if (color) {
		const themeColor = theme.colors[color as DividerColorToken];
		return themeColor ?? color;
	}

	return theme.colors[VARIANT_COLOR_MAP[variant]];
};

const resolveInset = (inset: DividerProps["inset"]) => {
	if (!inset || inset === "none") {
		return 0;
	}

	if (inset === "context") {
		return theme.spacing.md;
	}

	if (typeof inset === "number") {
		return inset;
	}

	return theme.spacing[inset as keyof typeof theme.spacing] ?? 0;
};

export const Divider: React.FC<DividerProps> = ({
	children,
	orientation = "horizontal",
	inset = "none",
	variant = "default",
	thickness = StyleSheet.hairlineWidth,
	color,
	style,
	testID,
}) => {
	const isVertical = orientation === "vertical";
	const insetValue = resolveInset(inset);
	const dividerColor = resolveColor(variant, color);
	const contentSpacing = theme.spacing.sm;

	const baseAccessibility: Pick<BoxProps, "accessibilityRole" | "accessible"> = {
		accessibilityRole: "none",
		accessible: false,
	};

	const webAccessibility =
		Platform.OS === "web"
			? ({
					role: "separator",
					"aria-orientation": orientation,
				} satisfies { role: string } & Pick<AriaAttributes, "aria-orientation">)
			: undefined;

	if (!children) {
		const baseSimpleStyle: ViewStyle = {
			alignSelf: "stretch",
			backgroundColor: dividerColor,
			height: isVertical ? ("100%" as DimensionValue) : thickness,
			width: isVertical ? thickness : ("100%" as DimensionValue),
			marginHorizontal: !isVertical && insetValue ? insetValue : undefined,
			marginVertical: isVertical && insetValue ? insetValue : undefined,
		};

		const simpleStyle = StyleSheet.flatten<ViewStyle>([baseSimpleStyle, style]);

		return (
			<Box
				testID={testID}
				style={simpleStyle}
				{...baseAccessibility}
				{...(webAccessibility as Record<string, unknown>)}
			/>
		);
	}

	const lineStyle: ViewStyle = {
		backgroundColor: dividerColor,
		flex: 1,
		height: isVertical ? undefined : thickness,
		width: isVertical ? thickness : undefined,
	};

	const containerBaseStyle: ViewStyle = {
		flexDirection: isVertical ? "column" : "row",
		alignItems: "center",
		marginHorizontal: !isVertical && insetValue ? insetValue : undefined,
		marginVertical: isVertical && insetValue ? insetValue : undefined,
	};

	const containerStyle = StyleSheet.flatten<ViewStyle>([containerBaseStyle, style]);

	const contentWrapperStyle: ViewStyle = isVertical
		? { marginVertical: contentSpacing }
		: { marginHorizontal: contentSpacing };

	const content =
		typeof children === "string" || typeof children === "number" ? (
			<Typography level="body-xs" textColor={theme.colors.onSurfaceVariant}>
				{children}
			</Typography>
		) : (
			children
		);

	return (
		<Box
			testID={testID}
			style={containerStyle}
			{...baseAccessibility}
			{...(webAccessibility as Record<string, unknown>)}
		>
			<Box style={lineStyle} {...baseAccessibility} />
			<Box style={contentWrapperStyle} {...baseAccessibility}>
				{content}
			</Box>
			<Box style={lineStyle} {...baseAccessibility} />
		</Box>
	);
};
