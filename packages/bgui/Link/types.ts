import type { LinkProps as ExpoLinkProps } from "expo-router";
import type { ReactNode } from "react";

// Enterprise-grade TypeScript interfaces
export interface LinkProps extends ExpoLinkProps {
	text?: string;
	children?: ReactNode;
}
