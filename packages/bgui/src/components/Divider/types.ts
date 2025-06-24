/**
 * Divider orientation options
 */
export type DividerOrientation = "horizontal" | "vertical";

/**
 * Divider visual style variants
 */
export type DividerVariant = "solid" | "dashed";

/**
 * Props for the Divider component
 */
export interface DividerProps {
	/**
	 * Direction of the divider line.
	 * - "horizontal": Line spans width
	 * - "vertical": Line spans height
	 * @default "horizontal"
	 */
	orientation?: DividerOrientation;

	/**
	 * Color of the divider line.
	 * @default Theme's border color
	 */
	color?: string;

	/**
	 * Thickness of the divider line in pixels.
	 * @default StyleSheet.hairlineWidth
	 */
	thickness?: number;

	/**
	 * Visual style of the line.
	 * - "solid": Continuous line
	 * - "dashed": Dashed line pattern
	 * @default "solid"
	 */
	variant?: DividerVariant;

	/**
	 * Additional styles to apply to the divider.
	 */
	style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
}
