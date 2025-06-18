import type { ReactNode } from "react";

/** Information captured during an error boundary failure. */
export interface ErrorInfo {
	/** React component stack trace. */
	componentStack: string;
	/** Name of the boundary where the error occurred. */
	errorBoundary?: string;
	/** Stack trace for nested error boundaries. */
	errorBoundaryStack?: string;
}

/** Internal state maintained by {@link ErrorBoundary}. */
export interface ErrorBoundaryState {
	/** Whether an error has been caught. */
	hasError: boolean;
	/** Captured error object. */
	error: Error | null;
	/** Additional error information. */
	errorInfo: ErrorInfo | null;
	/** Unique identifier generated for the error. */
	errorId: string | null;
}

/** Props accepted by {@link ErrorBoundary}. */
export interface ErrorBoundaryProps {
	/** Child components that should be protected. */
	children: ReactNode;
	/** Custom fallback element to render on error. */
	fallback?: ReactNode;
	/** Optional callback when an error is captured. */
	onError?: (error: Error, errorInfo: ErrorInfo) => void;
	/** Reset the boundary when any prop changes. */
	resetOnPropsChange?: boolean;
	/** Keys that trigger a reset when changed. */
	resetKeys?: Array<string | number>;
	/** Isolate the boundary from parent contexts. */
	isolate?: boolean;
}
