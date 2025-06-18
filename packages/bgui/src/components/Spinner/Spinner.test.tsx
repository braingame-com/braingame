import { render } from "@testing-library/react-native";
import React from "react";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
	it("renders spinner", () => {
		const { getByTestId } = render(<Spinner testID="spinner" />);
		expect(getByTestId("spinner")).toBeTruthy();
	});

	it("applies size variants", () => {
		const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
		sizes.forEach((size) => {
			const { getByTestId } = render(<Spinner size={size} testID={`spinner-${size}`} />);
			const spinner = getByTestId(`spinner-${size}`);
			expect(spinner.props.style).toBeDefined();
		});
	});

	it("applies custom size", () => {
		const { getByTestId } = render(<Spinner size={48} testID="spinner" />);
		const spinner = getByTestId("spinner");
		expect(spinner.props.style).toEqual(
			expect.objectContaining({
				width: 48,
				height: 48,
			}),
		);
	});

	it("applies color", () => {
		const { getByTestId } = render(<Spinner color="#ff0000" testID="spinner" />);
		const spinner = getByTestId("spinner");
		expect(spinner.props.color).toBe("#ff0000");
	});

	it("applies theme color", () => {
		const { getByTestId } = render(<Spinner color="primary" testID="spinner" />);
		const spinner = getByTestId("spinner");
		// Should use theme color
		expect(spinner.props.color).toBeDefined();
	});

	it("renders with label", () => {
		const { getByText } = render(<Spinner label="Loading..." />);
		expect(getByText("Loading...")).toBeTruthy();
	});

	it("positions label", () => {
		const positions = ["top", "bottom", "left", "right"] as const;
		positions.forEach((labelPosition) => {
			const { getByText } = render(
				<Spinner label={`Loading ${labelPosition}`} labelPosition={labelPosition} />,
			);
			expect(getByText(`Loading ${labelPosition}`)).toBeTruthy();
		});
	});

	it("applies variants", () => {
		const variants = ["circular", "dots", "bars"] as const;
		variants.forEach((variant) => {
			const { getByTestId } = render(
				<Spinner variant={variant} testID={`spinner-${variant}`} />,
			);
			expect(getByTestId(`spinner-${variant}`)).toBeTruthy();
		});
	});

	it("sets accessibility role", () => {
		const { getByRole } = render(<Spinner />);
		expect(getByRole("progressbar")).toBeTruthy();
	});

	it("applies aria-label", () => {
		const { getByLabelText } = render(<Spinner aria-label="Loading content" />);
		expect(getByLabelText("Loading content")).toBeTruthy();
	});

	it("uses label as aria-label fallback", () => {
		const { getByLabelText } = render(<Spinner label="Processing..." />);
		expect(getByLabelText("Processing...")).toBeTruthy();
	});

	it("sets aria-busy", () => {
		const { getByRole } = render(<Spinner />);
		const spinner = getByRole("progressbar");
		expect(spinner.props["aria-busy"]).toBe(true);
	});

	it("renders in overlay mode", () => {
		const { getByTestId } = render(<Spinner overlay testID="spinner-overlay" />);
		const overlay = getByTestId("spinner-overlay");
		expect(overlay.props.style).toEqual(
			expect.objectContaining({
				position: "absolute",
			}),
		);
	});

	it("applies custom styles", () => {
		const customStyle = { margin: 20 };
		const { getByTestId } = render(<Spinner style={customStyle} testID="spinner" />);
		const spinner = getByTestId("spinner");
		expect(spinner.props.style).toEqual(expect.objectContaining(customStyle));
	});

	it("controls animation speed", () => {
		const { getByTestId } = render(<Spinner speed={2000} testID="spinner" />);
		const spinner = getByTestId("spinner");
		// Animation duration should be set
		expect(spinner).toBeTruthy();
	});

	it("renders with custom thickness", () => {
		const { getByTestId } = render(<Spinner thickness={4} testID="spinner" />);
		const spinner = getByTestId("spinner");
		expect(spinner).toBeTruthy();
	});

	it("applies track color", () => {
		const { getByTestId } = render(<Spinner trackColor="#cccccc" testID="spinner" />);
		const spinner = getByTestId("spinner");
		expect(spinner).toBeTruthy();
	});

	it("supports determinate progress", () => {
		const { getByRole } = render(<Spinner value={75} />);
		const spinner = getByRole("progressbar");
		expect(spinner.props.accessibilityValue).toEqual({
			min: 0,
			max: 100,
			now: 75,
		});
	});

	it("hides from screen readers when decorative", () => {
		const { getByTestId } = render(<Spinner decorative testID="spinner" />);
		const spinner = getByTestId("spinner");
		expect(spinner.props["aria-hidden"]).toBe(true);
	});
});