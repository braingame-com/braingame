import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import { Tooltip } from "./Tooltip.web";

// Mock the portal container creation
beforeEach(() => {
	const portalContainer = document.createElement("div");
	portalContainer.id = "bgui-tooltip-portal";
	document.body.appendChild(portalContainer);
});

afterEach(() => {
	const portalContainer = document.getElementById("bgui-tooltip-portal");
	if (portalContainer) {
		document.body.removeChild(portalContainer);
	}
});

describe("Tooltip (Web)", () => {
	test("renders trigger element", () => {
		render(
			<Tooltip title="Test tooltip">
				<button>Hover me</button>
			</Tooltip>,
		);

		expect(screen.getByText("Hover me")).toBeInTheDocument();
	});

	test("shows tooltip on hover", async () => {
		render(
			<Tooltip title="Test tooltip">
				<button>Hover me</button>
			</Tooltip>,
		);

		const button = screen.getByText("Hover me");
		fireEvent.mouseEnter(button);

		await waitFor(() => {
			expect(screen.getByText("Test tooltip")).toBeInTheDocument();
		});
	});

	test("hides tooltip on mouse leave", async () => {
		render(
			<Tooltip title="Test tooltip">
				<button>Hover me</button>
			</Tooltip>,
		);

		const button = screen.getByText("Hover me");
		fireEvent.mouseEnter(button);

		await waitFor(() => {
			expect(screen.getByText("Test tooltip")).toBeInTheDocument();
		});

		fireEvent.mouseLeave(button);

		await waitFor(() => {
			expect(screen.queryByText("Test tooltip")).not.toBeInTheDocument();
		});
	});

	test("respects controlled open prop", () => {
		const { rerender } = render(
			<Tooltip title="Test tooltip" open={false}>
				<button>Hover me</button>
			</Tooltip>,
		);

		expect(screen.queryByText("Test tooltip")).not.toBeInTheDocument();

		rerender(
			<Tooltip title="Test tooltip" open={true}>
				<button>Hover me</button>
			</Tooltip>,
		);

		expect(screen.getByText("Test tooltip")).toBeInTheDocument();
	});

	test("does not render tooltip when title is empty", () => {
		render(
			<Tooltip title="">
				<button>Hover me</button>
			</Tooltip>,
		);

		const button = screen.getByText("Hover me");
		fireEvent.mouseEnter(button);

		expect(screen.queryByText("Test tooltip")).not.toBeInTheDocument();
	});

	test("respects disableHoverListener prop", () => {
		render(
			<Tooltip title="Test tooltip" disableHoverListener>
				<button>Hover me</button>
			</Tooltip>,
		);

		const button = screen.getByText("Hover me");
		fireEvent.mouseEnter(button);

		expect(screen.queryByText("Test tooltip")).not.toBeInTheDocument();
	});

	test("shows arrow when arrow prop is true", async () => {
		render(
			<Tooltip title="Test tooltip" arrow open>
				<button>Hover me</button>
			</Tooltip>,
		);

		await waitFor(() => {
			const tooltip = screen.getByRole("tooltip");
			expect(tooltip).toBeInTheDocument();
			// Check if arrow div is rendered
			expect(tooltip.querySelector("div[style*='border']")).toBeInTheDocument();
		});
	});

	test("applies correct ARIA attributes", () => {
		render(
			<Tooltip title="Test tooltip" open>
				<button>Hover me</button>
			</Tooltip>,
		);

		const button = screen.getByText("Hover me");
		const tooltip = screen.getByRole("tooltip");

		expect(button).toHaveAttribute("aria-describedby", tooltip.id);
		expect(tooltip).toHaveAttribute("role", "tooltip");
	});

	test("calls onOpen and onClose callbacks", async () => {
		const onOpen = jest.fn();
		const onClose = jest.fn();

		render(
			<Tooltip title="Test tooltip" onOpen={onOpen} onClose={onClose}>
				<button>Hover me</button>
			</Tooltip>,
		);

		const button = screen.getByText("Hover me");
		fireEvent.mouseEnter(button);

		await waitFor(() => {
			expect(onOpen).toHaveBeenCalledTimes(1);
		});

		fireEvent.mouseLeave(button);

		await waitFor(() => {
			expect(onClose).toHaveBeenCalledTimes(1);
		});
	});
});
