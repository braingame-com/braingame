import { fireEvent, render } from "@testing-library/react-native";
import type React from "react";
import { ThemeProvider } from "../../theme";
import { Button } from "./Button";

// Mock the theme
const mockTheme = {
	colors: {
		primary: "#6750A4",
		onPrimary: "#FFFFFF",
		primaryContainer: "#EADDFF",
		onPrimaryContainer: "#21005D",
		secondary: "#625B71",
		onSecondary: "#FFFFFF",
		secondaryContainer: "#E8DEF8",
		onSecondaryContainer: "#1D192B",
		surface: "#FFFBFE",
		onSurface: "#1C1B1F",
		surfaceVariant: "#E7E0EC",
		onSurfaceVariant: "#49454F",
		outline: "#79747E",
		error: "#BA1A1A",
		onError: "#FFFFFF",
	},
	dark: false,
};

// Helper to render with theme
const renderWithTheme = (component: React.ReactElement) => {
	return render(<ThemeProvider theme={mockTheme}>{component}</ThemeProvider>);
};

describe("Button", () => {
	describe("Rendering", () => {
		it("renders with label", () => {
			const { getByText } = renderWithTheme(<Button label="Test Button" onPress={() => {}} />);
			expect(getByText("Test Button")).toBeTruthy();
		});

		it("renders with children instead of label", () => {
			const { getByText } = renderWithTheme(<Button onPress={() => {}}>Custom Content</Button>);
			expect(getByText("Custom Content")).toBeTruthy();
		});

		it("renders all M3 variants", () => {
			const variants: Array<"filled" | "outlined" | "text" | "elevated" | "tonal"> = [
				"filled",
				"outlined",
				"text",
				"elevated",
				"tonal",
			];

			variants.forEach((variant) => {
				const { getByText } = renderWithTheme(
					<Button variant={variant} label={variant} onPress={() => {}} />,
				);
				expect(getByText(variant)).toBeTruthy();
			});
		});

		it("renders with icon", () => {
			const { getByTestId } = renderWithTheme(
				<Button label="Test" icon="add" onPress={() => {}} />,
			);
			// Icon component should render with testID
			expect(() => getByTestId("icon-add")).not.toThrow();
		});
	});

	describe("Interactions", () => {
		it("calls onPress when pressed", () => {
			const onPressMock = jest.fn();
			const { getByText } = renderWithTheme(<Button label="Press Me" onPress={onPressMock} />);

			fireEvent.press(getByText("Press Me"));
			expect(onPressMock).toHaveBeenCalledTimes(1);
		});

		it("does not call onPress when disabled", () => {
			const onPressMock = jest.fn();
			const { getByText } = renderWithTheme(
				<Button label="Disabled" onPress={onPressMock} disabled />,
			);

			fireEvent.press(getByText("Disabled"));
			expect(onPressMock).not.toHaveBeenCalled();
		});

		it("does not call onPress when loading", () => {
			const onPressMock = jest.fn();
			const { getByTestId } = renderWithTheme(
				<Button label="Loading" onPress={onPressMock} loading testID="button" />,
			);

			fireEvent.press(getByTestId("button"));
			expect(onPressMock).not.toHaveBeenCalled();
		});

		it("triggers press animations", () => {
			const onPressInMock = jest.fn();
			const onPressOutMock = jest.fn();

			const { getByText } = renderWithTheme(
				<Button
					label="Animated"
					onPress={() => {}}
					onPressIn={onPressInMock}
					onPressOut={onPressOutMock}
				/>,
			);

			const button = getByText("Animated");

			fireEvent(button, "pressIn");
			expect(onPressInMock).toHaveBeenCalled();

			fireEvent(button, "pressOut");
			expect(onPressOutMock).toHaveBeenCalled();
		});
	});

	describe("Styling", () => {
		it("applies correct height for different sizes", () => {
			const { getByTestId, rerender } = renderWithTheme(
				<Button label="Small" size="small" onPress={() => {}} testID="button" />,
			);

			let button = getByTestId("button");
			expect(button.props.style).toMatchObject(
				expect.objectContaining({
					height: 32,
				}),
			);

			rerender(
				<ThemeProvider theme={mockTheme}>
					<Button label="Medium" size="medium" onPress={() => {}} testID="button" />
				</ThemeProvider>,
			);

			button = getByTestId("button");
			expect(button.props.style).toMatchObject(
				expect.objectContaining({
					height: 40,
				}),
			);

			rerender(
				<ThemeProvider theme={mockTheme}>
					<Button label="Large" size="large" onPress={() => {}} testID="button" />
				</ThemeProvider>,
			);

			button = getByTestId("button");
			expect(button.props.style).toMatchObject(
				expect.objectContaining({
					height: 48,
				}),
			);
		});

		it("applies fullWidth style", () => {
			const { getByTestId } = renderWithTheme(
				<Button label="Full Width" fullWidth onPress={() => {}} testID="button" />,
			);

			const button = getByTestId("button");
			expect(button.props.style).toMatchObject(
				expect.objectContaining({
					width: "100%",
				}),
			);
		});

		it("applies correct border radius (M3 pill shape)", () => {
			const { getByTestId } = renderWithTheme(
				<Button label="Pill Shape" onPress={() => {}} testID="button" />,
			);

			const button = getByTestId("button");
			expect(button.props.style).toMatchObject(
				expect.objectContaining({
					borderRadius: 20,
				}),
			);
		});

		it("applies disabled opacity", () => {
			const { getByTestId } = renderWithTheme(
				<Button label="Disabled" disabled onPress={() => {}} testID="button" />,
			);

			const button = getByTestId("button");
			expect(button.props.style).toMatchObject(
				expect.objectContaining({
					opacity: 0.38,
				}),
			);
		});
	});

	describe("Accessibility", () => {
		it("has accessible role", () => {
			const { getByRole } = renderWithTheme(<Button label="Accessible" onPress={() => {}} />);
			expect(getByRole("button")).toBeTruthy();
		});

		it("forwards accessibility props", () => {
			const { getByLabelText } = renderWithTheme(
				<Button
					label="Test"
					onPress={() => {}}
					accessibilityLabel="Custom Label"
					accessibilityHint="Custom Hint"
				/>,
			);
			expect(getByLabelText("Custom Label")).toBeTruthy();
		});

		it("indicates disabled state for accessibility", () => {
			const { getByTestId } = renderWithTheme(
				<Button label="Disabled" disabled onPress={() => {}} testID="button" />,
			);

			const button = getByTestId("button");
			expect(button.props.accessibilityState).toMatchObject({
				disabled: true,
			});
		});
	});
});
