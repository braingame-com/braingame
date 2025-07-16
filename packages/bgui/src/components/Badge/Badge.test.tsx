import { render } from "@testing-library/react-native";
import React from "react";
import { Badge } from "./Badge.native";

describe("Badge", () => {
	it("renders children correctly", () => {
		const { getByText } = render(
			<Badge>
				<span>Test Content</span>
			</Badge>,
		);

		expect(getByText("Test Content")).toBeTruthy();
	});

	it("displays badge content", () => {
		const { getByText } = render(
			<Badge badgeContent="5">
				<span>Test Content</span>
			</Badge>,
		);

		expect(getByText("5")).toBeTruthy();
	});

	it("handles max value correctly", () => {
		const { getByText } = render(
			<Badge badgeContent={100} max={99}>
				<span>Test Content</span>
			</Badge>,
		);

		expect(getByText("99+")).toBeTruthy();
	});

	it("hides badge when invisible", () => {
		const { queryByText } = render(
			<Badge badgeContent="5" invisible>
				<span>Test Content</span>
			</Badge>,
		);

		// Badge content should not be visible when invisible=true
		expect(queryByText("5")).toBeNull();
	});

	it("renders dot badge without content", () => {
		const { queryByText } = render(
			<Badge dot>
				<span>Test Content</span>
			</Badge>,
		);

		// Should not show any text in dot mode
		expect(queryByText("")).toBeNull();
	});

	it("applies accessibility props", () => {
		const { getByLabelText } = render(
			<Badge aria-label="Custom label" badgeContent="5">
				<span>Content</span>
			</Badge>,
		);

		expect(getByLabelText("Custom label")).toBeTruthy();
	});

	it("hides badge when content is 0 and not dot", () => {
		const { queryByText } = render(
			<Badge badgeContent={0}>
				<span>Test Content</span>
			</Badge>,
		);

		// Should not show badge when content is 0
		expect(queryByText("0")).toBeNull();
	});
});
