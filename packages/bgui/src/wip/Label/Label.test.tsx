import { render } from "@testing-library/react-native";
import { TextInput } from "react-native";
import { Label } from "./Label";

describe("Label", () => {
	it("renders label text", () => {
		const { getByText } = render(<Label htmlFor="input-id">Email Address</Label>);
		expect(getByText("Email Address")).toBeTruthy();
	});

	it("associates with input via htmlFor", () => {
		const { getByText } = render(
			<>
				<Label htmlFor="email-input">Email</Label>
				<TextInput testID="email-input" nativeID="email-input" />
			</>,
		);
		const label = getByText("Email");
		expect(label.props.accessibilityLabelledBy).toBe("email-input");
	});

	it("renders required indicator", () => {
		const { getByText } = render(
			<Label htmlFor="input" required>
				Username
			</Label>,
		);
		expect(getByText("*")).toBeTruthy();
	});

	it("applies size variations", () => {
		const sizes = ["sm", "md", "lg"] as const;
		for (const size of sizes) {
			const { getByText } = render(
				<Label htmlFor={`input-${size}`} size={size}>
					{`Label ${size}`}
				</Label>,
			);
			const label = getByText(`Label ${size}`);
			expect(label.props.style).toBeDefined();
		}
	});

	it("applies variant styles", () => {
		const variants = ["standard", "floating"] as const;
		for (const variant of variants) {
			const { getByText } = render(
				<Label htmlFor={`input-${variant}`} variant={variant}>
					{`Label ${variant}`}
				</Label>,
			);
			const label = getByText(`Label ${variant}`);
			expect(label.props.style).toBeDefined();
		}
	});

	it("applies custom styles", () => {
		const customStyle = { color: "blue", fontSize: 20 };
		const { getByText } = render(
			<Label htmlFor="input" style={customStyle}>
				Styled Label
			</Label>,
		);
		const label = getByText("Styled Label");
		expect(label.props.style).toEqual(
			expect.arrayContaining([expect.objectContaining(customStyle)]),
		);
	});

	it("renders without htmlFor", () => {
		const { getByText } = render(<Label>Standalone Label</Label>);
		expect(getByText("Standalone Label")).toBeTruthy();
	});

	it("renders with complex children", () => {
		const { getByText } = render(
			<Label htmlFor="input">
				Complex <strong>Label</strong>
			</Label>,
		);
		expect(getByText("Complex")).toBeTruthy();
		expect(getByText("Label")).toBeTruthy();
	});

	it("does not show required indicator when not required", () => {
		const { queryByText } = render(<Label htmlFor="input">Optional Field</Label>);
		expect(queryByText("*")).toBeNull();
	});

	it("sets accessibility role", () => {
		const { getByText } = render(<Label htmlFor="input">Accessible Label</Label>);
		const label = getByText("Accessible Label");
		// Label should have appropriate accessibility properties
		expect(label.props.accessibilityRole).toBeDefined();
	});
});
