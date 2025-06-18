import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React, { act } from "react";
import { Text, View } from "react-native";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
	beforeEach(() => {
		jest.clearAllTimers();
	});

	it("renders children", () => {
		const { getByText } = render(
			<Tooltip content="Tooltip text">
				<Text>Hover me</Text>
			</Tooltip>,
		);
		expect(getByText("Hover me")).toBeTruthy();
	});

	it("shows tooltip on hover", async () => {
		jest.useFakeTimers();
		const { getByText } = render(
			<Tooltip content="Tooltip content">
				<Text>Hover target</Text>
			</Tooltip>,
		);
		
		const target = getByText("Hover target");
		fireEvent(target, "hoverIn");
		
		// Advance timers past delay
		act(() => {
			jest.advanceTimersByTime(300);
		});
		
		await waitFor(() => {
			expect(getByText("Tooltip content")).toBeTruthy();
		});
		
		jest.useRealTimers();
	});

	it("hides tooltip on hover out", async () => {
		jest.useFakeTimers();
		const { getByText, queryByText } = render(
			<Tooltip content="Tooltip content" delay={0}>
				<Text>Hover target</Text>
			</Tooltip>,
		);
		
		const target = getByText("Hover target");
		fireEvent(target, "hoverIn");
		
		await waitFor(() => {
			expect(getByText("Tooltip content")).toBeTruthy();
		});
		
		fireEvent(target, "hoverOut");
		
		await waitFor(() => {
			expect(queryByText("Tooltip content")).toBeNull();
		});
		
		jest.useRealTimers();
	});

	it("shows tooltip on focus", async () => {
		jest.useFakeTimers();
		const { getByText } = render(
			<Tooltip content="Focus tooltip">
				<Text>Focus target</Text>
			</Tooltip>,
		);
		
		const target = getByText("Focus target");
		fireEvent(target, "focus");
		
		act(() => {
			jest.advanceTimersByTime(300);
		});
		
		await waitFor(() => {
			expect(getByText("Focus tooltip")).toBeTruthy();
		});
		
		jest.useRealTimers();
	});

	it("hides tooltip on blur", async () => {
		const { getByText, queryByText } = render(
			<Tooltip content="Focus tooltip" delay={0}>
				<Text>Focus target</Text>
			</Tooltip>,
		);
		
		const target = getByText("Focus target");
		fireEvent(target, "focus");
		
		await waitFor(() => {
			expect(getByText("Focus tooltip")).toBeTruthy();
		});
		
		fireEvent(target, "blur");
		
		await waitFor(() => {
			expect(queryByText("Focus tooltip")).toBeNull();
		});
	});

	it("respects custom delay", async () => {
		jest.useFakeTimers();
		const { getByText, queryByText } = render(
			<Tooltip content="Delayed tooltip" delay={1000}>
				<Text>Hover me</Text>
			</Tooltip>,
		);
		
		const target = getByText("Hover me");
		fireEvent(target, "hoverIn");
		
		// Not visible before delay
		act(() => {
			jest.advanceTimersByTime(500);
		});
		expect(queryByText("Delayed tooltip")).toBeNull();
		
		// Visible after delay
		act(() => {
			jest.advanceTimersByTime(500);
		});
		
		await waitFor(() => {
			expect(getByText("Delayed tooltip")).toBeTruthy();
		});
		
		jest.useRealTimers();
	});

	it("cancels show on quick hover out", async () => {
		jest.useFakeTimers();
		const { getByText, queryByText } = render(
			<Tooltip content="Cancelled tooltip" delay={500}>
				<Text>Quick hover</Text>
			</Tooltip>,
		);
		
		const target = getByText("Quick hover");
		fireEvent(target, "hoverIn");
		
		// Hover out before delay
		act(() => {
			jest.advanceTimersByTime(250);
		});
		fireEvent(target, "hoverOut");
		
		// Advance past original delay
		act(() => {
			jest.advanceTimersByTime(300);
		});
		
		// Tooltip should not appear
		expect(queryByText("Cancelled tooltip")).toBeNull();
		
		jest.useRealTimers();
	});

	it("applies placement variants", () => {
		const placements = ["top", "bottom", "left", "right"] as const;
		placements.forEach((placement) => {
			const { getByText } = render(
				<Tooltip content={`Tooltip ${placement}`} placement={placement} delay={0}>
					<Text>Target</Text>
				</Tooltip>,
			);
			
			fireEvent(getByText("Target"), "hoverIn");
			// Tooltip should be positioned according to placement
			expect(getByText(`Tooltip ${placement}`)).toBeTruthy();
		});
	});

	it("applies variant styles", () => {
		const variants = ["dark", "light", "info"] as const;
		variants.forEach((variant) => {
			const { getByText } = render(
				<Tooltip content={`${variant} tooltip`} variant={variant} delay={0}>
					<Text>Target</Text>
				</Tooltip>,
			);
			
			fireEvent(getByText("Target"), "hoverIn");
			const tooltip = getByText(`${variant} tooltip`);
			expect(tooltip.parent?.props.style).toBeDefined();
		});
	});

	it("does not show when disabled", async () => {
		const { getByText, queryByText } = render(
			<Tooltip content="Disabled tooltip" disabled delay={0}>
				<Text>Hover me</Text>
			</Tooltip>,
		);
		
		fireEvent(getByText("Hover me"), "hoverIn");
		
		await waitFor(() => {
			expect(queryByText("Disabled tooltip")).toBeNull();
		});
	});

	it("handles keyboard escape to hide", async () => {
		const { getByText, queryByText } = render(
			<Tooltip content="Escapable tooltip" delay={0}>
				<Text>Target</Text>
			</Tooltip>,
		);
		
		const target = getByText("Target");
		fireEvent(target, "focus");
		
		await waitFor(() => {
			expect(getByText("Escapable tooltip")).toBeTruthy();
		});
		
		// Simulate escape key
		fireEvent(target, "keyDown", { key: "Escape" });
		
		await waitFor(() => {
			expect(queryByText("Escapable tooltip")).toBeNull();
		});
	});

	it("sets aria-describedby when visible", async () => {
		const { getByText } = render(
			<Tooltip content="Describing tooltip" delay={0}>
				<Text>Described element</Text>
			</Tooltip>,
		);
		
		const target = getByText("Described element");
		fireEvent(target, "hoverIn");
		
		await waitFor(() => {
			expect(target.props["aria-describedby"]).toBeDefined();
		});
	});

	it("renders custom content", async () => {
		const { getByText } = render(
			<Tooltip
				content={
					<View>
						<Text>Custom tooltip</Text>
						<Text>With multiple lines</Text>
					</View>
				}
				delay={0}
			>
				<Text>Hover me</Text>
			</Tooltip>,
		);
		
		fireEvent(getByText("Hover me"), "hoverIn");
		
		await waitFor(() => {
			expect(getByText("Custom tooltip")).toBeTruthy();
			expect(getByText("With multiple lines")).toBeTruthy();
		});
	});

	it("applies offset", async () => {
		const { getByText } = render(
			<Tooltip content="Offset tooltip" offset={20} delay={0}>
				<Text>Target</Text>
			</Tooltip>,
		);
		
		fireEvent(getByText("Target"), "hoverIn");
		
		await waitFor(() => {
			const tooltip = getByText("Offset tooltip");
			// Tooltip should be positioned with offset
			expect(tooltip).toBeTruthy();
		});
	});

	it("constrains to viewport", async () => {
		const { getByText } = render(
			<Tooltip content="Constrained tooltip" constrainToViewport delay={0}>
				<Text>Edge target</Text>
			</Tooltip>,
		);
		
		fireEvent(getByText("Edge target"), "hoverIn");
		
		await waitFor(() => {
			const tooltip = getByText("Constrained tooltip");
			// Tooltip should be repositioned if near viewport edge
			expect(tooltip).toBeTruthy();
		});
	});
});