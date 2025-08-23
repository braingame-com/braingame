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
	} = props;

	// Helper to get spacing value
	const getSpacingValue = (value: unknown): string | number | undefined => {
		if (value === undefined || value === null) return undefined;
		if (typeof value === "number") return value;
		if (typeof value === "string") {
			// Check if it's a theme spacing key
			const themeValue = restyleTheme.spacing[value as keyof typeof restyleTheme.spacing];
			return themeValue || value;
		}
		return String(value);
	};

	// Helper to get color value
	const getColorValue = (value: unknown): string | undefined => {
		if (!value) return undefined;
		if (typeof value === "string") {
			// Check if it's a theme color key
			const themeValue = restyleTheme.colors[value as keyof typeof restyleTheme.colors];
			return themeValue || value;
		}
		return String(value);
	};

	// Helper to get border radius value
	const getBorderRadiusValue = (value: unknown): string | number | undefined => {
		if (value === undefined || value === null) return undefined;
		if (typeof value === "number") return value;
		if (typeof value === "string") {
			// Check if it's a theme radius key
			const themeValue = restyleTheme.borderRadii[value as keyof typeof restyleTheme.borderRadii];
			return themeValue || value;
		}
		return String(value);
	};

	// Build styles object
	const styles: React.CSSProperties = {
		// Layout
		display: flex !== undefined || flexDirection ? "flex" : undefined,
		flex: typeof flex === "object" ? 1 : flex,
		flexDirection: flexDirection as React.CSSProperties["flexDirection"],
		flexWrap: flexWrap as React.CSSProperties["flexWrap"],
		justifyContent: justifyContent as React.CSSProperties["justifyContent"],
		alignItems: alignItems as React.CSSProperties["alignItems"],
		alignSelf: alignSelf as React.CSSProperties["alignSelf"],
		alignContent: alignContent as React.CSSProperties["alignContent"],
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
		width: width as React.CSSProperties["width"],
		height: height as React.CSSProperties["height"],
		minWidth: minWidth as React.CSSProperties["minWidth"],
		minHeight: minHeight as React.CSSProperties["minHeight"],
		maxWidth: maxWidth as React.CSSProperties["maxWidth"],
		maxHeight: maxHeight as React.CSSProperties["maxHeight"],

		// Colors
		backgroundColor: getColorValue(bg ?? backgroundColor),
		opacity: typeof opacity === "object" ? undefined : (opacity as React.CSSProperties["opacity"]),

		// Borders
		borderRadius: getBorderRadiusValue(borderRadius),
		borderWidth:
			typeof borderWidth === "object"
				? undefined
				: (borderWidth as React.CSSProperties["borderWidth"]),
		borderColor: getColorValue(borderColor),
		borderStyle:
			(borderStyle as React.CSSProperties["borderStyle"]) || (borderWidth ? "solid" : undefined),
		borderTopWidth:
			typeof borderTopWidth === "object"
				? undefined
				: (borderTopWidth as React.CSSProperties["borderTopWidth"]),
		borderRightWidth:
			typeof borderRightWidth === "object"
				? undefined
				: (borderRightWidth as React.CSSProperties["borderRightWidth"]),
		borderBottomWidth:
			typeof borderBottomWidth === "object"
				? undefined
				: (borderBottomWidth as React.CSSProperties["borderBottomWidth"]),
		borderLeftWidth:
			typeof borderLeftWidth === "object"
				? undefined
				: (borderLeftWidth as React.CSSProperties["borderLeftWidth"]),

		// Position
		position: position as React.CSSProperties["position"],
		top: typeof top === "object" || top === null ? undefined : (top as React.CSSProperties["top"]),
		right:
			typeof right === "object" || right === null
				? undefined
				: (right as React.CSSProperties["right"]),
		bottom:
			typeof bottom === "object" || bottom === null
				? undefined
				: (bottom as React.CSSProperties["bottom"]),
		left:
			typeof left === "object" || left === null ? undefined : (left as React.CSSProperties["left"]),
		zIndex: typeof zIndex === "object" ? undefined : (zIndex as React.CSSProperties["zIndex"]),

		// Other
		overflow:
			typeof overflow === "object" ? undefined : (overflow as React.CSSProperties["overflow"]),

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
