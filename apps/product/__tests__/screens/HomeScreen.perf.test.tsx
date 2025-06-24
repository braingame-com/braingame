import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type React from "react";
import { measureRenders } from "reassure";
import HomeScreen from "../../src/screens/HomeScreen";

// Mock dependencies
jest.mock("../../src/hooks/useAuth", () => ({
	useAuth: () => ({
		user: { id: "1", name: "Test User" },
		isLoading: false,
	}),
}));

const queryClient = new QueryClient({
	defaultOptions: {
		queries: { retry: false },
	},
});

const Wrapper = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProvider client={queryClient}>
		<NavigationContainer>{children}</NavigationContainer>
	</QueryClientProvider>
);

describe("HomeScreen Performance", () => {
	test("HomeScreen renders efficiently", async () => {
		await measureRenders(<HomeScreen />, { wrapper: Wrapper });
	});

	test("HomeScreen with data renders efficiently", async () => {
		// Mock data loading state
		jest.mock("../../src/hooks/useUserData", () => ({
			useUserData: () => ({
				data: Array(20)
					.fill(null)
					.map((_, i) => ({
						id: i,
						title: `Item ${i}`,
						description: `Description for item ${i}`,
					})),
				isLoading: false,
			}),
		}));

		await measureRenders(<HomeScreen />, { wrapper: Wrapper });
	});
});
