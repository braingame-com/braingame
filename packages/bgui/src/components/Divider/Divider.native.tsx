import { createBox } from "@shopify/restyle";
import type React from "react";
import { type StyleProp, StyleSheet, type ViewStyle } from "react-native";
import type { Theme } from "../../theme";
import { theme } from "../../theme";
import { Typography } from "../Typography";
import type { DividerProps } from "./DividerProps";

const Box = createBox<Theme>();

/**
 * Native implementation of Divider component using React Native
 *
 * Creates a visual separator that can be horizontal or vertical,
 * with optional content in the middle.
 */
export const Divider: React.FC<DividerProps> = ({
	children,
	orientation = "horizontal",
	inset = "none",
	thickness = 1,
	color = "outline",
	style,
	testID,
}) => {
	// Get color value from theme or use as-is
	const getColorValue = (colorProp: string): string => {
		const themeColor = theme.colors[colorProp as keyof typeof theme.colors];
		return themeColor || colorProp;
	};

	const dividerColor = getColorValue(color);
	const isVertical = orientation === "vertical";

	// Base container style
	const containerStyle = {
		alignSelf: "stretch" as const,
		flexShrink: 0,
		...(inset === "context" && {
			marginHorizontal: isVertical ? 0 : theme.spacing.md,
			marginVertical: isVertical ? theme.spacing.md : 0,
		}),
	};

	// Convert style to be compatible with Restyle Box
	const convertedStyle = style ? StyleSheet.flatten(style as StyleProp<ViewStyle>) : undefined;

	// If there are children, render a more complex divider with content
	if (children) {
		return (
			<Box
				testID={testID}
				flexDirection={isVertical ? "column" : "row"}
				alignItems="center"
				gap="sm"
				style={[containerStyle, convertedStyle]}
			>
				<Box
					flex={1}
					height={isVertical ? undefined : thickness}
					width={isVertical ? thickness : undefined}
					style={{ backgroundColor: dividerColor }}
				/>
				{typeof children === "string" ? (
					<Typography level="body-xs" style={{ color: theme.colors.onSurfaceVariant }}>
						{children}
					</Typography>
				) : (
					children
				)}
				<Box
					flex={1}
					height={isVertical ? undefined : thickness}
					width={isVertical ? thickness : undefined}
					style={{ backgroundColor: dividerColor }}
				/>
			</Box>
		);
	}

	// Simple divider without children
	return (
		<Box
			testID={testID}
			height={isVertical ? "100%" : thickness}
			width={isVertical ? thickness : "100%"}
			style={[{ backgroundColor: dividerColor }, containerStyle, convertedStyle]}
			accessible
			accessibilityRole="none"
		/>
	);
};
