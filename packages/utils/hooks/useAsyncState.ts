/**
 * useAsyncState Hook
 * Manages loading, error, and data states for asynchronous operations
 */

import { useCallback, useState } from "react";

export interface AsyncState<T> {
	data: T | undefined;
	loading: boolean;
	error: string;
}

export interface UseAsyncStateReturn<T> extends AsyncState<T> {
	execute: (asyncFunction: () => Promise<T>) => Promise<T>;
	setData: (data: T | undefined) => void;
	setError: (error: string) => void;
	reset: () => void;
}

/**
 * Hook for managing asynchronous state with loading and error handling
 *
 * @example
 * ```tsx
 * const { data, loading, error, execute } = useAsyncState<User>();
 *
 * const fetchUser = async () => {
 *   await execute(async () => {
 *     const response = await api.getUser();
 *     return response.data;
 *   });
 * };
 * ```
 */
export function useAsyncState<T = unknown>(initialData?: T): UseAsyncStateReturn<T> {
	const [data, setData] = useState<T | undefined>(initialData);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>("");

	const execute = useCallback(async (asyncFunction: () => Promise<T>): Promise<T> => {
		setLoading(true);
		setError("");

		try {
			const result = await asyncFunction();
			setData(result);
			return result;
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : "An error occurred";
			setError(errorMessage);
			throw err;
		} finally {
			setLoading(false);
		}
	}, []);

	const reset = useCallback(() => {
		setData(initialData);
		setLoading(false);
		setError("");
	}, [initialData]);

	return {
		data,
		loading,
		error,
		execute,
		setData,
		setError,
		reset,
	};
}

/**
 * Hook for managing multiple async operations with shared loading state
 *
 * @example
 * ```tsx
 * const { loading, error, execute } = useAsyncOperation();
 *
 * const handleSubmit = async () => {
 *   await execute(async () => {
 *     await api.updateProfile(data);
 *     navigation.goBack();
 *   });
 * };
 * ```
 */
export function useAsyncOperation() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string>("");

	const execute = useCallback(async (asyncFunction: () => Promise<void>): Promise<void> => {
		setLoading(true);
		setError("");

		try {
			await asyncFunction();
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : "An error occurred";
			setError(errorMessage);
			throw err;
		} finally {
			setLoading(false);
		}
	}, []);

	const reset = useCallback(() => {
		setLoading(false);
		setError("");
	}, []);

	return {
		loading,
		error,
		execute,
		reset,
		setError,
	};
}
