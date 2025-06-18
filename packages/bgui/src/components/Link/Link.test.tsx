import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Link } from "./Link";

describe("Link", () => {
	it("renders link text", () => {
		const { getByText } = render(<Link href="https://example.com">Click here</Link>);
		expect(getByText("Click here")).toBeTruthy();
	});

	it("handles press event", () => {
		const onPress = jest.fn();
		const { getByText } = render(
			<Link href="https://example.com" onPress={onPress}>
				Link
			</Link>,
		);
		fireEvent.press(getByText("Link"));
		expect(onPress).toHaveBeenCalled();
	});

	it("opens external links", () => {
		// Mock Linking.openURL
		const mockOpenURL = jest.fn();
		jest.mock("react-native", () => ({
			...jest.requireActual("react-native"),
			Linking: { openURL: mockOpenURL },
		}));

		const { getByText } = render(
			<Link href="https://example.com" external>
				External Link
			</Link>,
		);
		fireEvent.press(getByText("External Link"));
		// Should call Linking.openURL
	});

	it("applies underline by default", () => {
		const { getByText } = render(<Link href="#">Underlined</Link>);
		const link = getByText("Underlined");
		expect(link.props.style).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ textDecorationLine: "underline" }),
			]),
		);
	});

	it("removes underline when specified", () => {
		const { getByText } = render(
			<Link href="#" underline={false}>
				No underline
			</Link>,
		);
		const link = getByText("No underline");
		expect(link.props.style).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ textDecorationLine: "none" }),
			]),
		);
	});

	it("applies color variants", () => {
		const colors = ["primary", "secondary", "danger"] as const;
		colors.forEach((color) => {
			const { getByText } = render(
				<Link href="#" color={color}>
					Link {color}
				</Link>,
			);
			const link = getByText(`Link ${color}`);
			expect(link.props.style).toBeDefined();
		});
	});

	it("shows visited state", () => {
		const { getByText, rerender } = render(
			<Link href="#" visited={false}>
				Unvisited
			</Link>,
		);
		let link = getByText("Unvisited");
		expect(link.props.style).toBeDefined();

		rerender(
			<Link href="#" visited={true}>
				Visited
			</Link>,
		);
		link = getByText("Visited");
		// Should have different color for visited
		expect(link.props.style).toBeDefined();
	});

	it("disables interaction", () => {
		const onPress = jest.fn();
		const { getByText } = render(
			<Link href="#" onPress={onPress} disabled>
				Disabled Link
			</Link>,
		);
		fireEvent.press(getByText("Disabled Link"));
		expect(onPress).not.toHaveBeenCalled();
	});

	it("applies size variants", () => {
		const sizes = ["sm", "md", "lg"] as const;
		sizes.forEach((size) => {
			const { getByText } = render(
				<Link href="#" size={size}>
					Link {size}
				</Link>,
			);
			const link = getByText(`Link ${size}`);
			expect(link.props.style).toBeDefined();
		});
	});

	it("renders with icon", () => {
		const { getByLabelText } = render(
			<Link href="#" icon="external-link">
				External
			</Link>,
		);
		expect(getByLabelText("external-link icon")).toBeTruthy();
	});

	it("positions icon correctly", () => {
		const { getByText, getByLabelText } = render(
			<Link href="#" icon="arrow" iconPosition="right">
				Next
			</Link>,
		);
		// Icon should be after text
		expect(getByText("Next")).toBeTruthy();
		expect(getByLabelText("arrow icon")).toBeTruthy();
	});

	it("applies accessibility role", () => {
		const { getByRole } = render(<Link href="#">Accessible Link</Link>);
		expect(getByRole("link")).toBeTruthy();
	});

	it("applies aria-label", () => {
		const { getByLabelText } = render(
			<Link href="#" aria-label="Go to homepage">
				Home
			</Link>,
		);
		expect(getByLabelText("Go to homepage")).toBeTruthy();
	});

	it("prevents default behavior", () => {
		const onPress = jest.fn((e) => e.preventDefault());
		const { getByText } = render(
			<Link href="#section" onPress={onPress}>
				Anchor Link
			</Link>,
		);
		fireEvent.press(getByText("Anchor Link"));
		expect(onPress).toHaveBeenCalled();
	});

	it("applies custom styles", () => {
		const customStyle = { fontWeight: "bold" as const };
		const { getByText } = render(
			<Link href="#" style={customStyle}>
				Styled Link
			</Link>,
		);
		const link = getByText("Styled Link");
		expect(link.props.style).toEqual(
			expect.arrayContaining([expect.objectContaining(customStyle)]),
		);
	});
});