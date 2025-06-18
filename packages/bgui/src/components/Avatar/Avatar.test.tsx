import { render } from "@testing-library/react-native";
import React from "react";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
	it("renders with image source", () => {
		const { getByLabelText } = render(
			<Avatar source={{ uri: "https://example.com/avatar.jpg" }} alt="User avatar" />,
		);
		expect(getByLabelText("User avatar")).toBeTruthy();
	});

	it("renders with name fallback", () => {
		const { getByText } = render(<Avatar name="John Doe" />);
		expect(getByText("JD")).toBeTruthy();
	});

	it("renders single initial for single name", () => {
		const { getByText } = render(<Avatar name="John" />);
		expect(getByText("J")).toBeTruthy();
	});

	it("renders placeholder when no source or name", () => {
		const { getByLabelText } = render(<Avatar />);
		expect(getByLabelText("avatar icon")).toBeTruthy();
	});

	it("renders status indicator", () => {
		const { getByTestId } = render(<Avatar name="John" status="online" />);
		expect(getByTestId("avatar-status")).toBeTruthy();
	});

	it("applies different sizes", () => {
		const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
		sizes.forEach((size) => {
			const { getByTestId } = render(<Avatar name="Test" size={size} testID="avatar" />);
			const avatar = getByTestId("avatar");
			expect(avatar.props.style).toBeDefined();
		});
	});

	it("applies custom shape", () => {
		const { getByTestId } = render(<Avatar name="Test" shape="square" testID="avatar" />);
		const avatar = getByTestId("avatar");
		expect(avatar.props.style).toEqual(
			expect.arrayContaining([expect.objectContaining({ borderRadius: expect.any(Number) })]),
		);
	});

	it("shows loading state", () => {
		const { getByTestId } = render(<Avatar loading testID="avatar" />);
		const avatar = getByTestId("avatar");
		// Should show skeleton or loading indicator
		expect(avatar).toBeTruthy();
	});

	it("handles image load error", () => {
		const { getByLabelText, getByText } = render(
			<Avatar source={{ uri: "https://example.com/broken.jpg" }} name="Fallback Name" />,
		);

		const image = getByLabelText("Fallback Name");
		// Simulate error
		image.props.onError?.();

		// Should show name fallback
		expect(getByText("FN")).toBeTruthy();
	});

	it("applies custom background color", () => {
		const { getByTestId } = render(
			<Avatar name="Test" backgroundColor="#ff0000" testID="avatar" />,
		);
		const avatar = getByTestId("avatar");
		expect(avatar.props.style).toEqual(
			expect.arrayContaining([expect.objectContaining({ backgroundColor: "#ff0000" })]),
		);
	});

	it("renders badge", () => {
		const { getByText } = render(<Avatar name="Test" badge={5} />);
		expect(getByText("5")).toBeTruthy();
	});

	it("applies aria-label", () => {
		const { getByLabelText } = render(
			<Avatar name="John Doe" aria-label="John Doe's profile picture" />,
		);
		expect(getByLabelText("John Doe's profile picture")).toBeTruthy();
	});
});
