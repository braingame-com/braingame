import React, { type ComponentType, lazy, Suspense } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useTheme } from "../theme/ThemeContext";

interface LoadingFallbackProps {
	message?: string;
}

/**
 * Default loading fallback component
 */
const LoadingFallback: React.FC<LoadingFallbackProps> = ({ message = "Loading..." }) => {
	const { theme } = useTheme();

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: theme.colors.background,
			}}
		>
			<ActivityIndicator size="large" color={theme.colors.primary} />
			<Text
				style={{
					marginTop: 16,
					fontSize: 16,
					color: theme.colors.textSecondary,
					fontFamily: "LexendRegular",
				}}
			>
				{message}
			</Text>
		</View>
	);
};

interface LazyLoadOptions {
	fallback?: React.ReactNode;
	preload?: boolean;
	chunkName?: string;
}

/**
 * Enhanced lazy loading wrapper for screen components
 * @param importFn - Dynamic import function
 * @param options - Configuration options
 * @returns Wrapped component with lazy loading
 */
export function lazyScreen<P extends object>(
	importFn: () => Promise<{ default: ComponentType<P> }>,
	options: LazyLoadOptions = {},
): ComponentType<P> {
	const { fallback = <LoadingFallback />, preload = false } = options;

	// Create lazy component
	const LazyComponent = lazy(importFn);

	// Preload component if requested
	if (preload) {
		importFn();
	}

	// Return wrapped component
	const WrappedComponent: React.FC<P> = (props) => (
		<Suspense fallback={fallback}>
			<LazyComponent {...props} />
		</Suspense>
	);

	WrappedComponent.displayName = `Lazy(${LazyComponent.displayName || "Component"})`;

	return WrappedComponent;
}

/**
 * Preload multiple screens for better performance
 * @param screens - Array of import functions to preload
 */
export async function preloadScreens(
	screens: Array<() => Promise<{ default: React.ComponentType<unknown> }>>,
): Promise<void> {
	await Promise.all(screens.map((importFn) => importFn()));
}

/**
 * HOC to add lazy loading to existing components
 * @param Component - Component to wrap
 * @param fallback - Loading fallback
 * @returns Lazy loaded component
 */
export function withLazyLoad<P extends object>(
	Component: ComponentType<P>,
	fallback: React.ReactNode = <LoadingFallback />,
): ComponentType<P> {
	const LazyLoadedComponent: React.FC<P> = (props) => (
		<Suspense fallback={fallback}>
			<Component {...props} />
		</Suspense>
	);

	LazyLoadedComponent.displayName = `LazyLoaded(${Component.displayName || Component.name || "Component"})`;

	return LazyLoadedComponent;
}

/**
 * Error boundary for lazy loaded components
 */
interface ErrorBoundaryState {
	hasError: boolean;
	error?: Error;
}

export class LazyErrorBoundary extends React.Component<
	{ children: React.ReactNode; fallback?: React.ReactNode },
	ErrorBoundaryState
> {
	constructor(props: { children: React.ReactNode }) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	render() {
		if (this.state.hasError) {
			return (
				this.props.fallback || (
					<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
						<Text style={{ fontSize: 18, color: "red", marginBottom: 8 }}>
							Failed to load screen
						</Text>
						<Text style={{ fontSize: 14, color: "#666" }}>
							{this.state.error?.message || "Unknown error"}
						</Text>
					</View>
				)
			);
		}

		return this.props.children;
	}
}
