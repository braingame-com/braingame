import type React from "react";
import { type ReactNode, useCallback, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAccessibility } from "../../contexts/AccessibilityContext";
import { captureException } from "../../services/ErrorService";
import {
	AccessibleThemedButton,
	AccessibleThemedText,
} from "../../theme/components/AccessibleThemedComponents";
import { useTheme } from "../../theme/ThemeContext";
import { ErrorBoundary } from "./ErrorBoundary";

interface AsyncBoundaryProps<T> {
	/**
	 * Async function to load data
	 */
	asyncFn: () => Promise<T>;

	/**
	 * Render function called with loaded data
	 */
	children: (data: T) => ReactNode;

	/**
	 * Loading component (default: spinner)
	 */
	loadingFallback?: ReactNode;

	/**
	 * Error component
	 */
	errorFallback?: (error: Error, retry: () => void) => ReactNode;

	/**
	 * Dependencies that trigger reload
	 */
	deps?: React.DependencyList;

	/**
	 * Whether to show retry button on error
	 */
	showRetry?: boolean;

	/**
	 * Timeout in milliseconds
	 */
	timeout?: number;

	/**
	 * On success callback
	 */
	onSuccess?: (data: T) => void;

	/**
	 * On error callback
	 */
	onError?: (error: Error) => void;
}

interface AsyncState<T> {
	loading: boolean;
	error: Error | null;
	data: T | null;
}

export function AsyncBoundary<T>({
	asyncFn,
	children,
	loadingFallback,
	errorFallback,
	deps = [],
	showRetry = true,
	timeout,
	onSuccess,
	onError,
}: AsyncBoundaryProps<T>) {
	const { theme } = useTheme();
	const { announce } = useAccessibility();
	const [state, setState] = useState<AsyncState<T>>({
		loading: true,
		error: null,
		data: null,
	});
	const [retryCount, setRetryCount] = useState(0);

	const loadData = useCallback(async () => {
		setState({ loading: true, error: null, data: null });
		announce("Loading data");

		try {
			let data: T;

			if (timeout) {
				// Race between data fetch and timeout
				data = await Promise.race([
					asyncFn(),
					new Promise<T>((_, reject) =>
						setTimeout(() => reject(new Error("Request timeout")), timeout),
					),
				]);
			} else {
				data = await asyncFn();
			}

			setState({ loading: false, error: null, data });
			announce("Data loaded successfully");
			onSuccess?.(data);
		} catch (error) {
			const errorObj = error instanceof Error ? error : new Error(String(error));

			setState({ loading: false, error: errorObj, data: null });
			announce(`Error loading data: ${errorObj.message}`);

			captureException(errorObj, {
				component: "AsyncBoundary",
				retryCount,
				asyncFn: asyncFn.toString().substring(0, 100),
			});

			onError?.(errorObj);
		}
	}, [asyncFn, timeout, onSuccess, onError, retryCount, announce]);

	useEffect(() => {
		loadData();
	}, [loadData]);

	const retry = () => {
		setRetryCount((prev) => prev + 1);
	};

	// Loading state
	if (state.loading) {
		if (loadingFallback) {
			return <>{loadingFallback}</>;
		}

		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					padding: 20,
				}}
			>
				<ActivityIndicator size="large" color={theme.colors.primary} />
				<AccessibleThemedText variant="secondary" size="md" style={{ marginTop: 16 }}>
					Loading...
				</AccessibleThemedText>
			</View>
		);
	}

	// Error state
	if (state.error) {
		if (errorFallback) {
			return <>{errorFallback(state.error, retry)}</>;
		}

		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					padding: 20,
				}}
			>
				<AccessibleThemedText variant="error" size="2xl" weight="bold" style={{ marginBottom: 10 }}>
					⚠️
				</AccessibleThemedText>

				<AccessibleThemedText
					variant="primary"
					size="lg"
					weight="semibold"
					style={{ marginBottom: 10, textAlign: "center" }}
				>
					Failed to Load
				</AccessibleThemedText>

				<AccessibleThemedText
					variant="secondary"
					size="md"
					style={{ marginBottom: 20, textAlign: "center" }}
				>
					{state.error.message}
				</AccessibleThemedText>

				{showRetry && (
					<AccessibleThemedButton
						variant="primary"
						size="medium"
						onPress={retry}
						accessibilityLabel="Retry"
						accessibilityHint="Try loading the data again"
					>
						Retry
					</AccessibleThemedButton>
				)}
			</View>
		);
	}

	// Success state - render children with data
	return (
		<ErrorBoundary level="component" resetKeys={[retryCount]}>
			{children(state.data!)}
		</ErrorBoundary>
	);
}

/**
 * Hook version of AsyncBoundary
 */
export function useAsyncBoundary<T>(asyncFn: () => Promise<T>, deps: React.DependencyList = []) {
	const [state, setState] = useState<AsyncState<T>>({
		loading: true,
		error: null,
		data: null,
	});

	const execute = useCallback(async () => {
		setState({ loading: true, error: null, data: null });

		try {
			const data = await asyncFn();
			setState({ loading: false, error: null, data });
			return data;
		} catch (error) {
			const errorObj = error instanceof Error ? error : new Error(String(error));
			setState({ loading: false, error: errorObj, data: null });
			throw errorObj;
		}
	}, [asyncFn]);

	useEffect(() => {
		execute();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [execute, ...deps]);

	return {
		...state,
		retry: execute,
	};
}
