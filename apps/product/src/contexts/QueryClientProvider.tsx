import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import type React from "react";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 3,
			retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
			gcTime: 1000 * 60 * 60 * 24, // 24 hours
		},
	},
});

const persister = {
	persistClient: async (client: any) => {
		await AsyncStorage.setItem("REACT_QUERY_OFFLINE_CACHE", JSON.stringify(client));
	},
	restoreClient: async () => {
		const cacheString = await AsyncStorage.getItem("REACT_QUERY_OFFLINE_CACHE");
		if (!cacheString) return undefined;
		return JSON.parse(cacheString);
	},
	removeClient: async () => {
		await AsyncStorage.removeItem("REACT_QUERY_OFFLINE_CACHE");
	},
};

export const QueryClientProviderWithPersist: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => (
	<PersistQueryClientProvider
		client={queryClient}
		persistOptions={{
			persister,
			maxAge: 1000 * 60 * 60 * 24, // 24 hours
		}}
	>
		{children}
	</PersistQueryClientProvider>
);
