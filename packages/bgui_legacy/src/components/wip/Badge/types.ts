export type ThemeColor = "primary" | "secondary" | "danger" | "neutral" | "success" | "warning";

export type BadgeVariant = "notification" | "status" | "count";

export interface BadgeProps {
	count?: number;
	text?: string;
	dot?: boolean;
	color?: ThemeColor;
	variant?: BadgeVariant;
	style?: import("react-native").StyleProp<import("react-native").ViewStyle>;
}
