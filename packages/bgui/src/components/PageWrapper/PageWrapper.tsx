import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "../View";
import { pageWrapperStyles } from "./styles";
import type { PageWrapperProps } from "./types";

/**
 * Provides safe area padding and base layout for each page.
 */
export const PageWrapper = ({ children }: PageWrapperProps) => {
	// On web, we don't need StatusBar or SafeAreaProvider
	if (Platform.OS === "web") {
		return <View style={pageWrapperStyles.container}>{children}</View>;
	}

	return (
		<SafeAreaProvider>
			<View style={pageWrapperStyles.container}>
				{children}
				<StatusBar style="auto" />
			</View>
		</SafeAreaProvider>
	);
};
