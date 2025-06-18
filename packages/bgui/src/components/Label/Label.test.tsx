import { render } from "@testing-library/react-native";
import React from "react";
import { TextInput } from "react-native";
import { Label } from "./Label";

describe("Label", () => {
	it("renders label text", () => {
		const { getByText } = render(
			<Label htmlFor="input-id">
				Email Address
			</Label>,
		);
		expect(getByText("Email Address")).toBeTruthy();
	});

	it("associates with input via htmlFor", () => {
		const { getByText, getByTestId } = render(
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

	it("applies disabled styles", () => {
		const { getByText } = render(
			<Label htmlFor="input" disabled>
				Disabled Field
			</Label>,
		);
		const label = getByText("Disabled Field");
		expect(label.props.style).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ opacity: expect.any(Number) }),
			]),
		);
	});

	it("shows error state", () => {
		const { getByText } = render(
			<Label htmlFor="input" error>
				Password
			</Label>,
		);
		const label = getByText("Password");
		// Should have error color
		expect(label.props.style).toBeDefined();
	});

	it("renders helper text", () => {
		const { getByText } = render(
			<Label htmlFor="input" helperText="Must be at least 8 characters">
				Password
			</Label>,
		);
		expect(getByText("Must be at least 8 characters")).toBeTruthy();
	});

	it("applies size variants", () => {
		const sizes = ["sm", "md", "lg"] as const;
		sizes.forEach((size) => {
			const { getByText } = render(
				<Label htmlFor="input" size={size}>
					Label {size}
				</Label>,
			);
			const label = getByText(`Label ${size}`);
			expect(label.props.style).toBeDefined();
		});
	});

	it("applies custom styles", () => {
		const customStyle = { color: "blue" };
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

	it("positions label", () => {
		const positions = ["top", "left", "right"] as const;
		positions.forEach((position) => {
			const { getByText } = render(
				<Label htmlFor="input" position={position}>
					Label {position}
				</Label>,
			);
			expect(getByText(`Label ${position}`)).toBeTruthy();
		});
	});

	it("renders with custom required indicator", () => {
		const { getByText } = render(
			<Label htmlFor="input" required requiredIndicator=" (required)">
				Email
			</Label>,
		);
		expect(getByText(" (required)")).toBeTruthy();
	});

	it("applies font weight", () => {
		const { getByText } = render(
			<Label htmlFor="input" weight="bold">
				Bold Label
			</Label>,
		);
		const label = getByText("Bold Label");
		expect(label.props.style).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ fontWeight: "bold" }),
			]),
		);
	});

	it("renders inline with input", () => {
		const { getByText } = render(
			<Label htmlFor="input" inline>
				Inline Label
			</Label>,
		);
		const container = getByText("Inline Label").parent;
		expect(container?.props.style).toEqual(
			expect.objectContaining({ flexDirection: "row" }),
		);
	});

	it("truncates long text", () => {
		const { getByText } = render(
			<Label htmlFor="input" numberOfLines={1}>
				This is a very long label that should be truncated
			</Label>,
		);
		const label = getByText("This is a very long label that should be truncated");
		expect(label.props.numberOfLines).toBe(1);
	});
});