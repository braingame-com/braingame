import type { ReactNode } from "react";

// Enterprise-grade TypeScript interfaces
export interface ErrorInfo {
	componentStack: string;
	errorBoundary?: string;
	errorBoundaryStack?: string;
}

export interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
	errorInfo: ErrorInfo | null;
	errorId: string | null;
}

export interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
	onError?: (error: Error, errorInfo: ErrorInfo) => void;
	resetOnPropsChange?: boolean;
	resetKeys?: Array<string | number>;
	isolate?: boolean;
}
