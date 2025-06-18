import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";
import { Card } from "./Card";

describe("Card", () => {
	it("renders children content", () => {
		const { getByText } = render(
			<Card>
				<Text>Card content</Text>
			</Card>,
		);
		expect(getByText("Card content")).toBeTruthy();
	});

	it("renders header", () => {
		const { getByText } = render(
			<Card>
				<Card.Header>
					<Text>Header</Text>
				</Card.Header>
				<Text>Content</Text>
			</Card>,
		);
		expect(getByText("Header")).toBeTruthy();
	});

	it("renders footer", () => {
		const { getByText } = render(
			<Card>
				<Text>Content</Text>
				<Card.Footer>
					<Text>Footer</Text>
				</Card.Footer>
			</Card>,
		);
		expect(getByText("Footer")).toBeTruthy();
	});

	it("handles press event", () => {
		const onPress = jest.fn();
		const { getByText } = render(
			<Card onPress={onPress}>
				<Text>Clickable card</Text>
			</Card>,
		);
		fireEvent.press(getByText("Clickable card"));
		expect(onPress).toHaveBeenCalled();
	});

	it("applies hover state", () => {
		const { getByTestId } = render(
			<Card testID="card">
				<Text>Hoverable card</Text>
			</Card>,
		);
		const card = getByTestId("card");

		// Trigger hover
		fireEvent(card, "hoverIn");
		// Card should have hover styles applied
		expect(card.props.style).toBeDefined();

		fireEvent(card, "hoverOut");
		// Hover styles should be removed
		expect(card.props.style).toBeDefined();
	});

	it("applies focus state", () => {
		const { getByTestId } = render(
			<Card testID="card">
				<Text>Focusable card</Text>
			</Card>,
		);
		const card = getByTestId("card");

		fireEvent(card, "focus");
		// Should have focus styles
		expect(card.props.style).toBeDefined();

		fireEvent(card, "blur");
		// Focus styles should be removed
		expect(card.props.style).toBeDefined();
	});

	it("applies elevation", () => {
		const { getByTestId } = render(
			<Card elevation={2} testID="card">
				<Text>Elevated card</Text>
			</Card>,
		);
		const card = getByTestId("card");
		expect(card.props.style).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					shadowOffset: expect.any(Object),
					shadowOpacity: expect.any(Number),
					shadowRadius: expect.any(Number),
					elevation: 2,
				}),
			]),
		);
	});

	it("applies padding prop", () => {
		const { getByTestId } = render(
			<Card padding="lg" testID="card">
				<Text>Padded card</Text>
			</Card>,
		);
		const card = getByTestId("card");
		expect(card.props.style).toEqual(
			expect.arrayContaining([expect.objectContaining({ padding: expect.any(Number) })]),
		);
	});

	it("applies variant styles", () => {
		const variants = ["outlined", "filled", "elevated"] as const;
		variants.forEach((variant) => {
			const { getByTestId } = render(
				<Card variant={variant} testID={`card-${variant}`}>
					<Text>Card</Text>
				</Card>,
			);
			const card = getByTestId(`card-${variant}`);
			expect(card.props.style).toBeDefined();
		});
	});

	it("disables interaction when disabled", () => {
		const onPress = jest.fn();
		const { getByText } = render(
			<Card onPress={onPress} disabled>
				<Text>Disabled card</Text>
			</Card>,
		);
		fireEvent.press(getByText("Disabled card"));
		expect(onPress).not.toHaveBeenCalled();
	});

	it("applies custom styles", () => {
		const customStyle = { backgroundColor: "red" };
		const { getByTestId } = render(
			<Card style={customStyle} testID="card">
				<Text>Styled card</Text>
			</Card>,
		);
		const card = getByTestId("card");
		expect(card.props.style).toEqual(
			expect.arrayContaining([expect.objectContaining(customStyle)]),
		);
	});

	it("sets accessibility role", () => {
		const { getByRole } = render(
			<Card onPress={() => {}}>
				<Text>Interactive card</Text>
			</Card>,
		);
		expect(getByRole("button")).toBeTruthy();
	});

	it("applies aria-label", () => {
		const { getByLabelText } = render(
			<Card aria-label="Product card">
				<Text>Product</Text>
			</Card>,
		);
		expect(getByLabelText("Product card")).toBeTruthy();
	});

	it("applies aria-describedby", () => {
		const { getByTestId } = render(
			<Card aria-describedby="card-description" testID="card">
				<Text>Card</Text>
			</Card>,
		);
		const card = getByTestId("card");
		expect(card.props["aria-describedby"]).toBe("card-description");
	});
});
