import { type RenderOptions, render } from "@testing-library/react-native";
import type React from "react";
import { BGUIThemeProvider } from "../theme";

type RenderWithThemeOptions = RenderOptions & {
	theme?: "light" | "dark";
};

export function renderWithTheme(ui: React.ReactElement, options: RenderWithThemeOptions = {}) {
	const { theme = "light", ...renderOptions } = options;
	return render(<BGUIThemeProvider forceTheme={theme}>{ui}</BGUIThemeProvider>, renderOptions);
}
