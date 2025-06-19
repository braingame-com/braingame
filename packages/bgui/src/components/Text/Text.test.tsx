import { render } from "@testing-library/react-native";
import { Text } from "./Text";

describe("Text", () => {
	it("renders text content", () => {
		const { getByText } = render(<Text>Hello World</Text>);
		expect(getByText("Hello World")).toBeTruthy();
	});

	it("applies variant styles", () => {
		const variants = ["h1", "h2", "h3", "body", "caption"] as const;
		for (const variant of variants) {
			const { getByText } = render(<Text variant={variant}>Text {variant}</Text>);
			const text = getByText(`Text ${variant}`);
			expect(text.props.style).toBeDefined();
		}
	});

	it("applies color prop", () => {
		const colors = ["primary", "secondary", "danger", "neutral", "success", "warning"] as const;
		for (const color of colors) {
			const { getByText } = render(<Text color={color}>Color {color}</Text>);
			const text = getByText(`Color ${color}`);
			expect(text.props.style).toBeDefined();
		}
	});

	it("applies text alignment", () => {
		const alignments = ["left", "center", "right"] as const;
		for (const align of alignments) {
			const { getByText } = render(<Text align={align}>Aligned {align}</Text>);
			const text = getByText(`Aligned ${align}`);
			expect(text.props.style).toEqual(
				expect.arrayContaining([expect.objectContaining({ textAlign: align })]),
			);
		}
	});

	it("applies numberOfLines prop", () => {
		const { getByText } = render(
			<Text numberOfLines={2}>
				This is a very long text that should be truncated after two lines
			</Text>,
		);
		const text = getByText("This is a very long text that should be truncated after two lines");
		expect(text.props.numberOfLines).toBe(2);
	});

	it("applies custom styles", () => {
		const customStyle = { fontSize: 20, fontWeight: "bold" as const };
		const { getByText } = render(<Text style={customStyle}>Styled text</Text>);
		const text = getByText("Styled text");
		expect(text.props.style).toEqual(
			expect.arrayContaining([expect.objectContaining(customStyle)]),
		);
	});

	it("renders children nodes", () => {
		const { getByText } = render(
			<Text>
				<Text>Nested </Text>
				<Text>Text</Text>
			</Text>,
		);
		expect(getByText("Nested")).toBeTruthy();
		expect(getByText("Text")).toBeTruthy();
	});

	it("applies accessibility props", () => {
		const { getByRole } = render(
			<Text accessibilityRole="header" accessibilityLabel="Main heading">
				Heading
			</Text>,
		);
		const text = getByRole("header");
		expect(text.props.accessibilityLabel).toBe("Main heading");
	});

	it("inherits Text component props", () => {
		const onPress = jest.fn();
		const { getByText } = render(
			<Text onPress={onPress} testID="pressable-text">
				Press me
			</Text>,
		);
		const text = getByText("Press me");
		expect(text.props.testID).toBe("pressable-text");
	});

	it("combines variant and custom styles", () => {
		const { getByText } = render(
			<Text variant="h1" style={{ color: "red" }}>
				Combined styles
			</Text>,
		);
		const text = getByText("Combined styles");
		expect(text.props.style).toBeDefined();
	});

	it("applies default body variant", () => {
		const { getByText } = render(<Text>Default variant</Text>);
		const text = getByText("Default variant");
		expect(text.props.style).toBeDefined();
	});

	it("renders empty string", () => {
		const { queryByText } = render(<Text>{""}</Text>);
		// Empty text should still render but won't be queryable
		expect(queryByText("")).toBeNull();
	});

	it("applies selectable prop", () => {
		const { getByText } = render(<Text selectable>Selectable text</Text>);
		const text = getByText("Selectable text");
		expect(text.props.selectable).toBe(true);
	});

	it("applies ellipsizeMode with numberOfLines", () => {
		const { getByText } = render(
			<Text numberOfLines={1} ellipsizeMode="tail">
				Long text that should be truncated
			</Text>,
		);
		const text = getByText("Long text that should be truncated");
		expect(text.props.numberOfLines).toBe(1);
		expect(text.props.ellipsizeMode).toBe("tail");
	});
});
