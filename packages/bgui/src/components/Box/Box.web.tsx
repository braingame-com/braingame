"use client";
import type React from "react";
import { theme as restyleTheme } from "../../theme";
import type { BoxProps } from "./BoxProps";

/**
 * Web implementation of Box component
 *
 * This implementation maps Restyle props to CSS styles for web.
 * It provides the same API as the native Box component but renders
 * to a div with inline styles.
 */
export const Box: React.FC<
	BoxProps & { children?: React.ReactNode; testID?: string; style?: React.CSSProperties }
> = (props) => {
	const {
		children,
		// Layout props
		flex,
		flexDirection,
		flexWrap,
		justifyContent,
		alignItems,
		alignSelf,
		alignContent,

		// Spacing props
		padding,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		paddingHorizontal,
		paddingVertical,
		p,
		pt,
		pr,
		pb,
		pl,
		px,
		py,

		margin,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,
		marginHorizontal,
		marginVertical,
		m,
		mt,
		mr,
		mb,
		ml,
		mx,
		my,

		// Size props
		width,
		height,
		minWidth,
		minHeight,
		maxWidth,
		maxHeight,

		// Color props
		backgroundColor,
		bg,
		opacity,

		// Border props
		borderRadius,
		borderWidth,
		borderColor,
		borderStyle,
		borderTopWidth,
		borderRightWidth,
		borderBottomWidth,
		borderLeftWidth,

		// Position props
		position,
		top,
		right,
		bottom,
		left,
		zIndex,

		// Other props
		gap,
		overflow,

		style: customStyle,
		testID,
		...rest
	} = props as any; // Type assertion to handle Restyle's complex type system

	// Helper to get spacing value
	const getSpacingValue = (value: any): string | number | undefined => {
		if (value === undefined || value === null) return undefined;
		if (typeof value === "number") return value;
		if (typeof value === "string") {
			// Check if it's a theme spacing key
			const themeValue = restyleTheme.spacing[value as keyof typeof restyleTheme.spacing];
			return themeValue || value;
		}
		return value;
	};

	// Helper to get color value
	const getColorValue = (value: any): string | undefined => {
		if (!value) return undefined;
		if (typeof value === "string") {
			// Check if it's a theme color key
			const themeValue = restyleTheme.colors[value as keyof typeof restyleTheme.colors];
			return themeValue || value;
		}
		return value;
	};

	// Helper to get border radius value
	const getBorderRadiusValue = (value: any): string | number | undefined => {
		if (value === undefined || value === null) return undefined;
		if (typeof value === "number") return value;
		if (typeof value === "string") {
			// Check if it's a theme radius key
			const themeValue = restyleTheme.borderRadii[value as keyof typeof restyleTheme.borderRadii];
			return themeValue || value;
		}
		return value;
	};

	// Build styles object
	const styles: React.CSSProperties = {
		// Layout
		display: flex !== undefined || flexDirection ? "flex" : undefined,
		flex,
		flexDirection: flexDirection as any,
		flexWrap,
		justifyContent,
		alignItems,
		alignSelf,
		alignContent,
		gap: getSpacingValue(gap),

		// Spacing - use shorthand props if provided, otherwise longhand
		padding: getSpacingValue(p ?? padding),
		paddingTop: getSpacingValue(pt ?? paddingTop ?? py ?? paddingVertical),
		paddingRight: getSpacingValue(pr ?? paddingRight ?? px ?? paddingHorizontal),
		paddingBottom: getSpacingValue(pb ?? paddingBottom ?? py ?? paddingVertical),
		paddingLeft: getSpacingValue(pl ?? paddingLeft ?? px ?? paddingHorizontal),

		margin: getSpacingValue(m ?? margin),
		marginTop: getSpacingValue(mt ?? marginTop ?? my ?? marginVertical),
		marginRight: getSpacingValue(mr ?? marginRight ?? mx ?? marginHorizontal),
		marginBottom: getSpacingValue(mb ?? marginBottom ?? my ?? marginVertical),
		marginLeft: getSpacingValue(ml ?? marginLeft ?? mx ?? marginHorizontal),

		// Size
		width,
		height,
		minWidth,
		minHeight,
		maxWidth,
		maxHeight,

		// Colors
		backgroundColor: getColorValue(bg ?? backgroundColor),
		opacity,

		// Borders
		borderRadius: getBorderRadiusValue(borderRadius),
		borderWidth,
		borderColor: getColorValue(borderColor),
		borderStyle: (borderStyle as any) || (borderWidth ? "solid" : undefined),
		borderTopWidth,
		borderRightWidth,
		borderBottomWidth,
		borderLeftWidth,

		// Position
		position: position as any,
		top,
		right,
		bottom,
		left,
		zIndex,

		// Other
		overflow,

		// Custom styles override
		...customStyle,
	};

	// Remove undefined values
	const cleanStyles = Object.entries(styles).reduce((acc, [key, value]) => {
		if (value !== undefined) {
			acc[key as keyof React.CSSProperties] = value;
		}
		return acc;
	}, {} as React.CSSProperties);

	return (
		<div data-testid={testID} style={cleanStyles} {...rest}>
			{children}
		</div>
	);
};
