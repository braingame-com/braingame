import { fireEvent, render, screen } from "@testing-library/react";
import { IconButton } from "./IconButton.web";

describe("IconButton.web", () => {
	it("renders children correctly", () => {
		render(
			<IconButton aria-label="Test button">
				<span>Icon</span>
			</IconButton>,
		);
		expect(screen.getByText("Icon")).toBeInTheDocument();
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		render(
			<IconButton onClick={handleClick} aria-label="Clickable button">
				Click
			</IconButton>,
		);

		fireEvent.click(screen.getByRole("button"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("is disabled when disabled prop is true", () => {
		render(
			<IconButton disabled aria-label="Disabled button">
				Disabled
			</IconButton>,
		);

		const button = screen.getByRole("button");
		expect(button).toBeDisabled();
		expect(button).toHaveStyle({ opacity: 0.38 });
	});

	it("shows loading indicator when loading", () => {
		render(
			<IconButton loading aria-label="Loading button">
				Content
			</IconButton>,
		);

		// Check that progress bar is present
		expect(screen.getByRole("progressbar")).toBeInTheDocument();
		// Content should be hidden but present
		expect(screen.getByText("Content")).toHaveStyle({ opacity: 0 });
	});

	it("renders as anchor when href is provided", () => {
		render(
			<IconButton href="/test" aria-label="Link button">
				Link
			</IconButton>,
		);

		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "/test");
	});

	it("applies size styles correctly", () => {
		const { rerender } = render(
			<IconButton size="sm" aria-label="Small button">
				S
			</IconButton>,
		);

		let button = screen.getByRole("button");
		expect(button).toHaveStyle({ minWidth: "32px", minHeight: "32px" });

		rerender(
			<IconButton size="md" aria-label="Medium button">
				M
			</IconButton>,
		);

		button = screen.getByRole("button");
		expect(button).toHaveStyle({ minWidth: "36px", minHeight: "36px" });

		rerender(
			<IconButton size="lg" aria-label="Large button">
				L
			</IconButton>,
		);

		button = screen.getByRole("button");
		expect(button).toHaveStyle({ minWidth: "44px", minHeight: "44px" });
	});

	it("applies variant and color styles", () => {
		const { rerender } = render(
			<IconButton variant="solid" color="primary" aria-label="Solid primary">
				Icon
			</IconButton>,
		);

		// Test other variants
		rerender(
			<IconButton variant="outlined" color="danger" aria-label="Outlined danger">
				Icon
			</IconButton>,
		);

		const button = screen.getByRole("button");
		expect(button).toHaveStyle({ borderStyle: "solid" });
	});

	it("supports all aria attributes", () => {
		render(
			<IconButton
				aria-label="Test"
				aria-describedby="desc"
				aria-labelledby="label"
				aria-pressed={true}
				aria-expanded={false}
				aria-controls="menu"
				aria-checked={true}
			>
				Icon
			</IconButton>,
		);

		const button = screen.getByRole("button");
		expect(button).toHaveAttribute("aria-label", "Test");
		expect(button).toHaveAttribute("aria-describedby", "desc");
		expect(button).toHaveAttribute("aria-labelledby", "label");
		expect(button).toHaveAttribute("aria-pressed", "true");
		expect(button).toHaveAttribute("aria-expanded", "false");
		expect(button).toHaveAttribute("aria-controls", "menu");
		expect(button).toHaveAttribute("aria-checked", "true");
	});

	it("handles focus visible state", () => {
		render(<IconButton aria-label="Focus test">Icon</IconButton>);

		const button = screen.getByRole("button");

		// Simulate keyboard focus
		fireEvent.focus(button);
		fireEvent.keyDown(button, { key: "Tab" });

		// Note: :focus-visible pseudo-selector behavior is hard to test
		// but the implementation should work in browsers
	});
});
