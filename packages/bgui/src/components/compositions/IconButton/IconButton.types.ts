import type { ReactNode } from "react";
import type { IconName } from "../../../icons";
import type { ButtonProps } from "../../primitives/Button";

export interface IconButtonProps
	extends Omit<ButtonProps, "children" | "startDecorator" | "endDecorator" | "loadingIndicator"> {
	children?: ReactNode;
	iconName?: IconName;
	iconSize?: number;
	loadingIndicator?: ButtonProps["loadingIndicator"];
}
