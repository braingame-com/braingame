import { type QueryFunction, type QueryKey, useQuery } from "@tanstack/react-query";
import { useNetworkStatus } from "../components/ErrorBoundary/NetworkErrorBoundary";

export const usePersistedQuery = <TQueryFnData, TError>(
	key: QueryKey,
	queryFn: QueryFunction<TQueryFnData>,
	enabled = true,
) => {
	const { isConnected, isInternetReachable } = useNetworkStatus();
	const hasInternet = isConnected && isInternetReachable;

	return useQuery<TQueryFnData, TError>({
		queryKey: key,
		queryFn,
		enabled: enabled, // Allow queries to run to return cached data
		retry: (failureCount, _error) => {
			// Only retry if we have internet connection
			if (!hasInternet) return false;
			return failureCount < 3;
		},
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
		// Return stale data while offline
		staleTime: hasInternet ? 5 * 60 * 1000 : Number.POSITIVE_INFINITY, // 5 minutes when online, forever when offline
		// Keep cache for 24 hours
		gcTime: 24 * 60 * 60 * 1000,
	});
};
