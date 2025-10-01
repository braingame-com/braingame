import type React from "react";
import { useColorScheme } from "react-native";
import { ThemeProvider as InternalThemeProvider } from "./engine";
import type { Theme } from "./theme";
import theme, { darkTheme } from "./theme";

interface BGUIThemeProviderProps {
	children: React.ReactNode;
	/**
	 * Force a specific theme regardless of system preference
	 */
	forceTheme?: "light" | "dark";
	/**
	 * Optional override for the light theme tokens
	 */
	themeOverride?: Theme;
	/**
	 * Optional override for the dark theme tokens
	 */
	darkThemeOverride?: Theme;
}

/**
 * BGUI Theme Provider
 *
 * Wraps the application with BGUI's theme engine and automatically
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
export function BGUIThemeProvider({
	children,
	forceTheme,
	themeOverride,
	darkThemeOverride,
}: BGUIThemeProviderProps) {
	const systemColorScheme = useColorScheme();

	// Determine which theme to use
	const activeTheme = forceTheme
		? forceTheme === "dark"
			? (darkThemeOverride ?? darkTheme)
			: (themeOverride ?? theme)
		: systemColorScheme === "dark"
			? (darkThemeOverride ?? darkTheme)
			: (themeOverride ?? theme);

	return <InternalThemeProvider theme={activeTheme}>{children}</InternalThemeProvider>;
}
