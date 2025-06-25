import { render, screen } from "@testing-library/react-native";
import React from "react";
import { vi } from "vitest";
import Index from "../../../app/index";

// Mock expo-router
interface MockLinkProps {
	children: React.ReactNode;
	href: string;
	asChild?: boolean;
}

vi.mock("expo-router", () => ({
	Link: ({ children, href, asChild }: MockLinkProps) => {
		// If asChild is true, clone the child element with href prop
		if (asChild && React.isValidElement(children)) {
			return React.cloneElement(children, {
				testID: `link-${href}`,
			} as Record<string, unknown>);
		}
		return children;
	},
}));

describe("Index (Dashboard) Screen", () => {
	it("renders the dashboard title", () => {
		render(<Index />);

		const title = screen.getByText("Dashboard");
		expect(title).toBeTruthy();
	});

	it("renders the tasks link", () => {
		render(<Index />);

		const link = screen.getByText("Go to Tasks");
		expect(link).toBeTruthy();
	});

	it("has correct styles for the title", () => {
		render(<Index />);

		const title = screen.getByText("Dashboard");
		expect(title.props.style).toMatchObject({
			fontSize: 32,
			fontWeight: "bold",
			marginBottom: 20,
		});
	});

	it("has correct styles for the link", () => {
		render(<Index />);

		const link = screen.getByText("Go to Tasks");
		expect(link.props.style).toMatchObject({
			fontSize: 18,
			color: "#007AFF",
			textDecorationLine: "underline",
		});
	});

	it("renders with correct container styles", () => {
		render(<Index />);

		// Get the root View by finding the parent of the title
		const title = screen.getByText("Dashboard");
		const container = title.parent;

		if (container?.props.style) {
			expect(container.props.style).toMatchObject(
				expect.objectContaining({
					flex: 1,
					padding: 20,
					backgroundColor: "#fff",
				}),
			);
		}
	});
});
