import type React from "react";
import { useColorScheme } from "react-native";
import { ThemeProvider as InternalThemeProvider } from "./engine";
import theme, { darkTheme } from "./theme";

interface BGUIThemeProviderProps {
	children: React.ReactNode;
	/**
	 * Force a specific theme regardless of system preference
	 */
	forceTheme?: "light" | "dark";
}

/**
 * BGUI Theme Provider
 *
 * Wraps the application with Restyle's ThemeProvider and automatically
 * switches between light and dark themes based on system preference.
 *
 * @example
 * ```tsx
 * import { BGUIThemeProvider } from '@braingame/bgui';
 *
 * function App() {
 *   return (
 *     <BGUIThemeProvider>
 *       <YourApp />
 *     </BGUIThemeProvider>
 *   );
 * }
 * ```
 */
export function BGUIThemeProvider({ children, forceTheme }: BGUIThemeProviderProps) {
	const systemColorScheme = useColorScheme();

	// Determine which theme to use
	const activeTheme = forceTheme
		? forceTheme === "dark"
			? darkTheme
			: theme
		: systemColorScheme === "dark"
			? darkTheme
			: theme;

	return <InternalThemeProvider theme={activeTheme}>{children}</InternalThemeProvider>;
}
