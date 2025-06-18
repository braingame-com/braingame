import { render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";
import { Divider } from "./Divider";

describe("Divider", () => {
	it("renders horizontal divider by default", () => {
		const { getByTestId } = render(<Divider testID="divider" />);
		const divider = getByTestId("divider");
		expect(divider.props.style).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					height: 1,
					width: "100%",
				}),
			]),
		);
	});

	it("renders vertical divider", () => {
		const { getByTestId } = render(<Divider orientation="vertical" testID="divider" />);
		const divider = getByTestId("divider");
		expect(divider.props.style).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					width: 1,
					height: "100%",
				}),
			]),
		);
	});

	it("renders with text", () => {
		const { getByText } = render(<Divider>OR</Divider>);
		expect(getByText("OR")).toBeTruthy();
	});

	it("renders with custom component as children", () => {
		const { getByText } = render(
			<Divider>
				<Text>Custom Content</Text>
			</Divider>,
		);
		expect(getByText("Custom Content")).toBeTruthy();
	});

	it("applies spacing", () => {
		const { getByTestId } = render(<Divider spacing="lg" testID="divider" />);
		const divider = getByTestId("divider");
		expect(divider.props.style).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					marginVertical: expect.any(Number),
				}),
			]),
		);
	});

	it("applies thickness", () => {
		const { getByTestId } = render(<Divider thickness={2} testID="divider" />);
		const divider = getByTestId("divider");
		expect(divider.props.style).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					height: 2,
				}),
			]),
		);
	});

	it("applies color", () => {
		const { getByTestId } = render(<Divider color="#ff0000" testID="divider" />);
		const divider = getByTestId("divider");
		expect(divider.props.style).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					backgroundColor: "#ff0000",
				}),
			]),
		);
	});

	it("applies variant styles", () => {
		const variants = ["solid", "dashed", "dotted"] as const;
		variants.forEach((variant) => {
			const { getByTestId } = render(
				<Divider variant={variant} testID={`divider-${variant}`} />,
			);
			const divider = getByTestId(`divider-${variant}`);
			expect(divider.props.style).toBeDefined();
		});
	});

	it("sets correct accessibility role", () => {
		const { getByRole } = render(<Divider />);
		expect(getByRole("separator")).toBeTruthy();
	});

	it("applies aria-orientation for horizontal", () => {
		const { getByRole } = render(<Divider />);
		const divider = getByRole("separator");
		expect(divider.props["aria-orientation"]).toBe("horizontal");
	});

	it("applies aria-orientation for vertical", () => {
		const { getByRole } = render(<Divider orientation="vertical" />);
		const divider = getByRole("separator");
		expect(divider.props["aria-orientation"]).toBe("vertical");
	});

	it("applies custom styles", () => {
		const customStyle = { opacity: 0.5 };
		const { getByTestId } = render(<Divider style={customStyle} testID="divider" />);
		const divider = getByTestId("divider");
		expect(divider.props.style).toEqual(
			expect.arrayContaining([expect.objectContaining(customStyle)]),
		);
	});

	it("positions text correctly", () => {
		const positions = ["start", "center", "end"] as const;
		positions.forEach((textPosition) => {
			const { getByText } = render(<Divider textPosition={textPosition}>Text</Divider>);
			expect(getByText("Text")).toBeTruthy();
		});
	});

	it("applies inset", () => {
		const { getByTestId } = render(<Divider inset testID="divider" />);
		const divider = getByTestId("divider");
		expect(divider.props.style).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					marginHorizontal: expect.any(Number),
				}),
			]),
		);
	});
});