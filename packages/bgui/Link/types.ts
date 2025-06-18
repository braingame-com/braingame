import type { LinkProps as ExpoLinkProps } from "expo-router";
import type { ReactNode } from "react";

/**
 * Props for the {@link Link} component.
 */
export interface LinkProps extends ExpoLinkProps {
	/** Text content if not using `children`. */
	text?: string;
	/** Elements to render inside the link. */
	children?: ReactNode;
}
