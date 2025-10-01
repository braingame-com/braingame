import React from "react";
import { render, type RenderOptions } from "@testing-library/react-native";
import { BGUIThemeProvider } from "../theme";

export function renderWithTheme(
	ui: React.ReactElement,
	options?: RenderOptions,
) {
	return render(<BGUIThemeProvider forceTheme="light">{ui}</BGUIThemeProvider>, options);
}
