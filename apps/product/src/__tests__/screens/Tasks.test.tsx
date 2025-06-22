import { render, screen } from "@testing-library/react-native";
import React from "react";
import Tasks from "../../../app/tasks";

// Mock expo-router
interface MockLinkProps {
	children: React.ReactNode;
	href: string;
	asChild?: boolean;
}

jest.mock("expo-router", () => ({
	Link: ({ children, href, asChild }: MockLinkProps) => {
		// If asChild is true, clone the child element with href prop
		if (asChild && React.isValidElement(children)) {
			return React.cloneElement(children as React.ReactElement<unknown>, {
				testID: `link-${href}`,
			});
		}
		return children;
	},
}));

describe("Tasks Screen", () => {
	it("renders the tasks title", () => {
		render(<Tasks />);

		const title = screen.getByText("Tasks");
		expect(title).toBeTruthy();
	});

	it("renders the subtitle", () => {
		render(<Tasks />);

		const subtitle = screen.getByText("Your tasks will appear here");
		expect(subtitle).toBeTruthy();
	});

	it("renders the back link", () => {
		render(<Tasks />);

		const link = screen.getByText("Back to Dashboard");
		expect(link).toBeTruthy();
	});

	it("has correct styles for the title", () => {
		render(<Tasks />);

		const title = screen.getByText("Tasks");
		expect(title.props.style).toMatchObject({
			fontSize: 32,
			fontWeight: "bold",
			marginBottom: 10,
		});
	});

	it("has correct styles for the subtitle", () => {
		render(<Tasks />);

		const subtitle = screen.getByText("Your tasks will appear here");
		expect(subtitle.props.style).toMatchObject({
			fontSize: 16,
			color: "#666",
			marginBottom: 20,
		});
	});

	it("has correct styles for the link", () => {
		render(<Tasks />);

		const link = screen.getByText("Back to Dashboard");
		expect(link.props.style).toMatchObject({
			fontSize: 18,
			color: "#007AFF",
			textDecorationLine: "underline",
		});
	});
});
