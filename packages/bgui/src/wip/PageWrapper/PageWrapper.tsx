import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "../View";
import { pageWrapperStyles } from "./styles";
import type { PageWrapperProps } from "./types";

/**
 * Provides safe area padding and base layout for each page.
 */
export const PageWrapper = ({ children }: PageWrapperProps) => {
	return (
		<SafeAreaProvider>
			<View style={pageWrapperStyles.container}>
				{children}
				<StatusBar style="auto" />
			</View>
		</SafeAreaProvider>
	);
};
