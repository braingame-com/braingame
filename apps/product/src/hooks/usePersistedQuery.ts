import { type QueryFunction, type QueryKey, useQuery } from "@tanstack/react-query";
import { useNetworkStatus } from "../components/ErrorBoundary/NetworkErrorBoundary";

export const usePersistedQuery = <TQueryFnData, TError>(
	key: QueryKey,
	queryFn: QueryFunction<TQueryFnData>,
	enabled = true,
) => {
	const { isConnected } = useNetworkStatus();

	return useQuery<TQueryFnData, TError>({
		queryKey: key,
		queryFn,
		enabled: enabled && isConnected,
		retry: (failureCount, error) => {
			if (!isConnected) return false;
			return failureCount < 3;
		},
		retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
	});
};
