import { type RenderAPI, type RenderOptions, render } from "@testing-library/react-native";
import type { ReactElement } from "react";

/**
 * Custom render function that wraps components with necessary providers
 * Can be extended to include theme providers, navigation, etc.
 */
export function renderWithProviders(ui: ReactElement, options?: RenderOptions): RenderAPI {
	// For now, just use the base render
	// In the future, wrap with ThemeProvider, etc.
	return render(ui, options);
}

// Re-export everything from React Native Testing Library
export * from "@testing-library/react-native";
export { renderWithProviders as render };
