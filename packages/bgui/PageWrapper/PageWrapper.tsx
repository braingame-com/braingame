import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "../View";
import type { PageWrapperProps } from "./types";

export const PageWrapper = ({ children }: PageWrapperProps) => {
	return (
		<SafeAreaProvider>
			<View style={{ flex: 1 }}>
				{children}
				<StatusBar style="auto" />
			</View>
		</SafeAreaProvider>
	);
};
