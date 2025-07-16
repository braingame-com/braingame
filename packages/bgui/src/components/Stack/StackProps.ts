import type { ReactNode } from "react";
import type { ViewStyle } from "react-native";

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
type SpacingValue = keyof typeof import("../../theme").theme.spacing | number;

/**
 * Shared props interface for Stack component
 * This ensures API consistency between web and native implementations
 */
export interface StackProps {
	/**
	 * The content of the Stack
	 */
	children?: ReactNode;

	/**
	 * Defines the `flex-direction` style property.
	 * It is applied for all screen sizes.
	 * @default 'column'
	 */
	direction?: FlexDirection;

	/**
	 * Defines the space between immediate children.
	 * Can be a theme spacing token (xs, sm, md, lg, xl) or a number
	 * @default 0
	 */
	spacing?: SpacingValue;

	/**
	 * Add an element between each child.
	 */
	divider?: ReactNode;

	/**
	 * If `true`, the CSS flexbox `gap` is used instead of applying `margin` to children.
	 * Note: In React Native, we always use gap as it's well-supported.
	 * @default true
	 */
	useFlexGap?: boolean;

	/**
	 * Additional styles
	 */
	style?: ViewStyle;

	/**
	 * Test ID for testing
	 */
	testID?: string;
}
