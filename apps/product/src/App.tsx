import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Sentry from "sentry-expo";
import { ErrorBoundary, ErrorBoundaryProvider } from "./components/ErrorBoundary";
import { AccessibilityProvider } from "./contexts/AccessibilityContext";
import { QueryClientProviderWithPersist } from "./contexts/QueryClientProvider";
import { RootNavigator } from "./navigation/RootNavigator";
import { captureException, setupGlobalErrorHandlers } from "./services/ErrorService";
import { ThemeProvider } from "./theme/ThemeContext";

// Initialize Sentry for error and performance monitoring
Sentry.init({
	dsn: process.env.SENTRY_DSN,
	enableInExpoDevelopment: true,
	debug: __DEV__,
	tracesSampleRate: 1.0,
});

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Setup global error handlers
setupGlobalErrorHandlers();

// Ignore specific warnings in development
if (__DEV__) {
	LogBox.ignoreLogs([
		"Non-serializable values were found in the navigation state",
		"Require cycle:",
	]);
}

// Font assets
const fonts = {
	Lexend: require("@braingame/utils/assets/fonts/Lexend-VariableFont_wght.ttf"),
	"Roboto Mono": require("@braingame/utils/assets/fonts/RobotoMono-VariableFont_wght.ttf"),
};

export default function App() {
	const [fontsLoaded, setFontsLoaded] = React.useState(false);
	const [appIsReady, setAppIsReady] = React.useState(false);

	useEffect(() => {
		async function prepare() {
			try {
				// Load fonts
				await Font.loadAsync(fonts);
				setFontsLoaded(true);

				// Artificially delay for two seconds to simulate a slow loading
				// experience. Please remove this if you copy and paste the code!
				if (__DEV__) {
					await new Promise((resolve) => setTimeout(resolve, 1000));
				}

				// Tell the application to render
				setAppIsReady(true);
			} catch (e) {
				// We might want to provide this error information to an error reporting service
				console.warn("Error loading app:", e);
				captureException(e instanceof Error ? e : new Error(String(e)), {
					context: "app_initialization",
				});

				// Even if there's an error, we still want to render something
				setAppIsReady(true);
			} finally {
				// Hide splash screen
				await SplashScreen.hideAsync();
			}
		}

		prepare();
	}, []);

	if (!appIsReady || !fontsLoaded) {
		return null;
	}

	return (
		<ErrorBoundaryProvider showDetails={__DEV__} enableReporting={!__DEV__} maxErrors={10}>
			<ErrorBoundary
				level="app"
				showDetails={__DEV__}
				onError={(error, errorInfo) => {
					// In production, you might want to show a crash report dialog
					// or automatically restart the app
					captureException(error, {
						level: "app",
						critical: true,
						componentStack: errorInfo.componentStack ?? undefined,
						digest: errorInfo.digest ?? undefined,
					});
				}}
			>
				<SafeAreaProvider>
					<AccessibilityProvider>
						<QueryClientProviderWithPersist>
							<ThemeProvider>
								<NavigationContainer>
									<StatusBar style="auto" />
									<RootNavigator />
								</NavigationContainer>
							</ThemeProvider>
						</QueryClientProviderWithPersist>
					</AccessibilityProvider>
				</SafeAreaProvider>
			</ErrorBoundary>
		</ErrorBoundaryProvider>
	);
}

// App crash handler for production
export const handleAppCrash = (error: Error) => {
	captureException(error, {
		level: "app",
		fatal: true,
	});

	// In production, you might want to:
	// 1. Show a crash dialog
	// 2. Restart the app
	// 3. Navigate to a crash recovery screen
};
