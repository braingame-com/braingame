import { render } from "@testing-library/react-native";
import React from "react";
import { Text } from "./Text";

describe("Text", () => {
	it("renders text content", () => {
		const { getByText } = render(<Text>Hello World</Text>);
		expect(getByText("Hello World")).toBeTruthy();
	});

	it("applies type variants", () => {
		const types = ["body", "heading", "title", "subtitle", "caption", "small"] as const;
		types.forEach((type) => {
			const { getByText } = render(<Text type={type}>Text {type}</Text>);
			const text = getByText(`Text ${type}`);
			expect(text.props.style).toBeDefined();
		});
	});

	it("applies size variants", () => {
		const sizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as const;
		sizes.forEach((size) => {
			const { getByText } = render(<Text size={size}>Size {size}</Text>);
			const text = getByText(`Size ${size}`);
			expect(text.props.style).toEqual(
				expect.arrayContaining([expect.objectContaining({ fontSize: expect.any(Number) })]),
			);
		});
	});

	it("applies weight variants", () => {
		const weights = ["normal", "medium", "semibold", "bold"] as const;
		weights.forEach((weight) => {
			const { getByText } = render(<Text weight={weight}>Weight {weight}</Text>);
			const text = getByText(`Weight ${weight}`);
			expect(text.props.style).toEqual(
				expect.arrayContaining([expect.objectContaining({ fontWeight: expect.any(String) })]),
			);
		});
	});

	it("applies text alignment", () => {
		const alignments = ["left", "center", "right", "justify"] as const;
		alignments.forEach((align) => {
			const { getByText } = render(<Text align={align}>Align {align}</Text>);
			const text = getByText(`Align ${align}`);
			expect(text.props.style).toEqual(
				expect.arrayContaining([expect.objectContaining({ textAlign: align })]),
			);
		});
	});

	it("applies color variants", () => {
		const colors = ["primary", "secondary", "success", "danger", "warning", "muted"] as const;
		colors.forEach((color) => {
			const { getByText } = render(<Text color={color}>Color {color}</Text>);
			const text = getByText(`Color ${color}`);
			expect(text.props.style).toBeDefined();
		});
	});

	it("applies custom color", () => {
		const { getByText } = render(<Text color="#ff0000">Red text</Text>);
		const text = getByText("Red text");
		expect(text.props.style).toEqual(
			expect.arrayContaining([expect.objectContaining({ color: "#ff0000" })]),
		);
	});

	it("truncates with numberOfLines", () => {
		const { getByText } = render(
			<Text numberOfLines={1}>
				This is a very long text that should be truncated to a single line
			</Text>,
		);
		const text = getByText("This is a very long text that should be truncated to a single line");
		expect(text.props.numberOfLines).toBe(1);
	});

	it("applies text transform", () => {
		const transforms = ["none", "uppercase", "lowercase", "capitalize"] as const;
		transforms.forEach((transform) => {
			const { getByText } = render(<Text transform={transform}>transform text</Text>);
			const text = getByText("transform text");
			expect(text.props.style).toEqual(
				expect.arrayContaining([expect.objectContaining({ textTransform: transform })]),
			);
		});
	});

	it("applies text decoration", () => {
		const decorations = ["none", "underline", "line-through"] as const;
		decorations.forEach((decoration) => {
			const { getByText } = render(<Text decoration={decoration}>Decorated</Text>);
			const text = getByText("Decorated");
			expect(text.props.style).toEqual(
				expect.arrayContaining([expect.objectContaining({ textDecorationLine: decoration })]),
			);
		});
	});

	it("applies italic style", () => {
		const { getByText } = render(<Text italic>Italic text</Text>);
		const text = getByText("Italic text");
		expect(text.props.style).toEqual(
			expect.arrayContaining([expect.objectContaining({ fontStyle: "italic" })]),
		);
	});

	it("renders as selectable", () => {
		const { getByText } = render(<Text selectable>Selectable text</Text>);
		const text = getByText("Selectable text");
		expect(text.props.selectable).toBe(true);
	});

	it("applies custom styles", () => {
		const customStyle = { letterSpacing: 2 };
		const { getByText } = render(<Text style={customStyle}>Styled text</Text>);
		const text = getByText("Styled text");
		expect(text.props.style).toEqual(
			expect.arrayContaining([expect.objectContaining(customStyle)]),
		);
	});

	it("sets accessibility role for headings", () => {
		const { getByRole } = render(<Text type="heading">Main Heading</Text>);
		expect(getByRole("header")).toBeTruthy();
	});

	it("applies font family", () => {
		const { getByText } = render(<Text fontFamily="monospace">Code text</Text>);
		const text = getByText("Code text");
		expect(text.props.style).toEqual(
			expect.arrayContaining([expect.objectContaining({ fontFamily: "monospace" })]),
		);
	});

	it("applies line height", () => {
		const { getByText } = render(<Text lineHeight={1.5}>Spaced text</Text>);
		const text = getByText("Spaced text");
		expect(text.props.style).toEqual(
			expect.arrayContaining([expect.objectContaining({ lineHeight: expect.any(Number) })]),
		);
	});

	it("renders with testID", () => {
		const { getByTestId } = render(<Text testID="custom-text">Test</Text>);
		expect(getByTestId("custom-text")).toBeTruthy();
	});

	it("supports nested text", () => {
		const { getByText } = render(
			<Text>
				Parent <Text weight="bold">Bold</Text> text
			</Text>,
		);
		expect(getByText("Bold")).toBeTruthy();
	});

	it("applies muted variant", () => {
		const { getByText } = render(<Text muted>Muted text</Text>);
		const text = getByText("Muted text");
		expect(text.props.style).toBeDefined();
	});

	it("combines multiple style props", () => {
		const { getByText } = render(
			<Text size="lg" weight="bold" color="primary" italic align="center">
				Complex styled text
			</Text>,
		);
		const text = getByText("Complex styled text");
		expect(text.props.style).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					fontSize: expect.any(Number),
					fontWeight: expect.any(String),
					fontStyle: "italic",
					textAlign: "center",
				}),
			]),
		);
	});
});
