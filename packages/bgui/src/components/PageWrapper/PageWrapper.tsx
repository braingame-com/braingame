import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "../View";
import { pageWrapperStyles } from "./styles";
import type { PageWrapperProps } from "./types";

/**
 * PageWrapper component that provides safe area padding and base layout.
 * Wraps page content with SafeAreaProvider and manages status bar.
 *
 * @example
 * ```tsx
 * // Basic page wrapper
 * <PageWrapper>
 *   <Text>Page content here</Text>
 * </PageWrapper>
 *
 * // Full page example
 * <PageWrapper>
 *   <View style={{ flex: 1 }}>
 *     <Header title="My Page" />
 *     <ScrollView>
 *       <Text>Main content...</Text>
 *     </ScrollView>
 *     <Footer />
 *   </View>
 * </PageWrapper>
 *
 * // With navigation
 * <PageWrapper>
 *   <NavigationContainer>
 *     <Stack.Navigator>
 *       <Stack.Screen name="Home" component={HomeScreen} />
 *     </Stack.Navigator>
 *   </NavigationContainer>
 * </PageWrapper>
 *
 * // With theme provider
 * <PageWrapper>
 *   <ThemeProvider>
 *     <AppContent />
 *   </ThemeProvider>
 * </PageWrapper>
 * ```
 *
 * @component
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
