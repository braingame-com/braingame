export type ThemeColor = "primary" | "secondary" | "danger" | "neutral" | "success" | "warning";

export type BadgeVariant = "notification" | "status" | "count";

/**
 * Props for the Badge component
 */
export interface BadgeProps {
	/**
	 * Numeric count to display.
	 * Mutually exclusive with text and dot.
	 */
	count?: number;

	/**
	 * Text content to display.
	 * Mutually exclusive with count and dot.
	 */
	text?: string;

	/**
	 * Whether to show as a small dot indicator.
	 * When true, no content is displayed.
	 * @default false
	 */
	dot?: boolean;

	/**
	 * Theme color for the badge background.
	 * - "primary": Primary brand color
	 * - "secondary": Secondary brand color
	 * - "danger": Red for alerts/errors
	 * - "success": Green for positive states
	 * - "warning": Yellow for warnings
	 * - "neutral": Gray for default state
	 * @default "primary"
	 */
	color?: ThemeColor;

	/**
	 * Semantic variant of the badge.
	 * - "notification": For unread counts (announces to screen readers)
	 * - "status": For state indicators
	 * - "count": For general numeric displays
	 * @default "count"
	 */
	variant?: BadgeVariant;

	/**
	 * Additional styles to apply to the badge container.
	 */
	style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
}
