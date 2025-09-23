import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export type LinkVariant = "plain" | "outlined" | "soft" | "solid";
export type LinkColor = "primary" | "neutral" | "danger" | "success" | "warning";
export type LinkUnderline = "none" | "hover" | "always";

export interface LinkProps {
	children?: ReactNode;
	href?: string;
	disabled?: boolean;
	color?: LinkColor;
	variant?: LinkVariant;
	underline?: LinkUnderline;
	startDecorator?: ReactNode;
	endDecorator?: ReactNode;
	level?:
		| "h1"
		| "h2"
		| "h3"
		| "h4"
		| "title-lg"
		| "title-md"
		| "title-sm"
		| "body-lg"
		| "body-md"
		| "body-sm"
		| "body-xs"
		| "inherit";
	overlay?: boolean;
	target?: "_self" | "_blank" | "_parent" | "_top";
	rel?: string;
	onClick?: (event: unknown) => void;
	onFocus?: () => void;
	onBlur?: () => void;
	style?: StyleProp<ViewStyle>;
	testID?: string;
	"aria-label"?: string;
	"aria-describedby"?: string;
}
