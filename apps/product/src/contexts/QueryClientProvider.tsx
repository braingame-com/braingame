import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	createAsyncStoragePersistor,
	persistQueryClient,
} from "@tanstack/react-query-persist-client";
import type React from "react";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 3,
			retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
		},
	},
});

const asyncStoragePersistor = createAsyncStoragePersistor({ storage: AsyncStorage });

persistQueryClient({
	queryClient,
	persistor: asyncStoragePersistor,
});

export const QueryClientProviderWithPersist: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
