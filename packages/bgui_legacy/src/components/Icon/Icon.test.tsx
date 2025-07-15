import { render } from "@testing-library/react-native";
import type React from "react";
import { ThemeProvider } from "../../theme";
import { Icon } from "./Icon";

describe("Icon", () => {
	const renderWithTheme = (ui: React.ReactElement) => {
		return render(<ThemeProvider>{ui}</ThemeProvider>);
	};

	it("renders correctly", () => {
		const { getByTestId } = renderWithTheme(<Icon name="home" testID="test-icon" />);
		expect(getByTestId("test-icon")).toBeTruthy();
	});

	it("renders with different sizes", () => {
		const { rerender } = renderWithTheme(<Icon name="menu" size="sm" />);
		rerender(
			<ThemeProvider>
				<Icon name="menu" size={32} />
			</ThemeProvider>,
		);
		// Test passes if no errors thrown
	});

	it("renders with custom color", () => {
		const { getByTestId } = renderWithTheme(
			<Icon name="favorite" color="#FF0000" testID="test-icon" />,
		);
		expect(getByTestId("test-icon")).toBeTruthy();
	});

	it("handles missing icon gracefully", () => {
		// @ts-expect-error Testing invalid icon name
		const { container } = renderWithTheme(<Icon name="invalid_icon" />);
		expect(container.children.length).toBe(0);
	});
});
