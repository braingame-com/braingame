import { createBox } from "@shopify/restyle";
import type React from "react";
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

	// If there are children, render a more complex divider with content
	if (children) {
		return (
			<Box
				testID={testID}
				flexDirection={isVertical ? "column" : "row"}
				alignItems="center"
				gap="sm"
				style={[containerStyle, style]}
			>
				<Box
					flex={1}
					height={isVertical ? undefined : thickness}
					width={isVertical ? thickness : undefined}
					backgroundColor={dividerColor as any}
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
					backgroundColor={dividerColor as any}
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
			backgroundColor={dividerColor as any}
			style={[containerStyle, style]}
			accessible
			accessibilityRole="none"
		/>
	);
};
