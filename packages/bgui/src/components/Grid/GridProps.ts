import type { CSSProperties, ReactNode } from "react";

/**
 * Shared props interface for Grid component
 *
 * The Grid component helps manage layout and create responsive designs.
 */
export interface GridProps {
	/**
	 * The content of the component.
	 */
	children?: ReactNode;

	/**
	 * If `true`, the component will have the flex container behavior.
	 * @default false
	 */
	container?: boolean;

	/**
	 * If `true`, the component will have the flex item behavior.
	 * @default false
	 */
	item?: boolean;

	/**
	 * Defines the number of columns the component should span on extra-small devices.
	 * @default false
	 */
	xs?: boolean | "auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

	/**
	 * Defines the number of columns the component should span on small devices.
	 * @default false
	 */
	sm?: boolean | "auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

	/**
	 * Defines the number of columns the component should span on medium devices.
	 * @default false
	 */
	md?: boolean | "auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

	/**
	 * Defines the number of columns the component should span on large devices.
	 * @default false
	 */
	lg?: boolean | "auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

	/**
	 * Defines the number of columns the component should span on extra-large devices.
	 * @default false
	 */
	xl?: boolean | "auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

	/**
	 * Defines the space between the type `item` components.
	 * @default 0
	 */
	spacing?: number | string;

	/**
	 * Defines the horizontal space between the type `item` components.
	 */
	columnSpacing?: number | string;

	/**
	 * Defines the vertical space between the type `item` components.
	 */
	rowSpacing?: number | string;

	/**
	 * Defines the `flex-direction` style property.
	 * @default 'row'
	 */
	direction?: "row" | "row-reverse" | "column" | "column-reverse";

	/**
	 * Defines the `justify-content` style property.
	 * @default 'flex-start'
	 */
	justifyContent?:
		| "flex-start"
		| "center"
		| "flex-end"
		| "space-between"
		| "space-around"
		| "space-evenly";

	/**
	 * Defines the `align-items` style property.
	 * @default 'stretch'
	 */
	alignItems?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";

	/**
	 * Defines the `flex-wrap` style property.
	 * @default 'wrap'
	 */
	wrap?: "nowrap" | "wrap" | "wrap-reverse";

	/**
	 * Additional styles
	 */
	style?: CSSProperties | any;

	/**
	 * Test ID for testing
	 */
	testID?: string;

	/**
	 * Accessibility label
	 */
	"aria-label"?: string;
}
