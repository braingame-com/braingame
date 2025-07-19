import { BGUIThemeProvider } from "@braingame/bgui";
import { createLogger } from "@braingame/utils";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { LogBox } from "react-native";

const logger = createLogger({ prefix: "RootLayout" });

export default function RootLayout() {
	useEffect(() => {
		// Disable yellow box warnings
		LogBox.ignoreAllLogs();

		// For web, disable the error overlay
		if (typeof window !== "undefined") {
			// Override console.error to filter out dev tool errors
			console.error = (...args) => {
				const errorString = args[0]?.toString() || "";

				// Filter out known problematic errors
				if (
					errorString.includes("Invalid hook call") ||
					errorString.includes("ErrorOverlay") ||
					errorString.includes("withDevTools") ||
					errorString.includes("ErrorToastContainer")
				) {
					return;
				}

				// Log the error using our logger instead
				logger.error(errorString, ...args.slice(1));
			};

			// Prevent error overlay from mounting
			const style = document.createElement("style");
			style.textContent = `
				#ErrorOverlay,
				[data-expo-error-overlay],
				.error-overlay,
				.error-toast-container {
					display: none !important;
				}
			`;
			document.head.appendChild(style);
		}
	}, []);

	return (
		<BGUIThemeProvider>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			/>
		</BGUIThemeProvider>
	);
}
