import type { ErrorInfo, ReactNode } from "react";

export interface ContextErrorBoundaryFallbackArgs {
	error: Error;
	reset: () => void;
	contextName: string;
}

export type ContextErrorBoundaryFallback =
	| ReactNode
	| ((args: ContextErrorBoundaryFallbackArgs) => ReactNode);

export interface ContextErrorBoundaryProps {
	children: ReactNode;
	contextName: string;
	fallback?: ContextErrorBoundaryFallback;
	onError?: (error: Error, info: ErrorInfo) => void;
	onReset?: () => void;
}
