import { fireEvent, render } from "@testing-library/react-native";
import { Text } from "react-native";
import { vi } from "vitest";
import { Accordion } from "./Accordion";

describe("Accordion", () => {
	it("renders items", () => {
		const { getByText } = render(
			<Accordion>
				<Accordion.Item title="Section 1" value="1">
					<Text>Content 1</Text>
				</Accordion.Item>
				<Accordion.Item title="Section 2" value="2">
					<Text>Content 2</Text>
				</Accordion.Item>
			</Accordion>,
		);

		expect(getByText("Section 1")).toBeTruthy();
		expect(getByText("Section 2")).toBeTruthy();
	});

	it("expands item when clicked", () => {
		const { getByText, queryByText } = render(
			<Accordion>
				<Accordion.Item title="Section 1" value="1">
					<Text>Content 1</Text>
				</Accordion.Item>
			</Accordion>,
		);

		// Content should be hidden initially
		expect(queryByText("Content 1")).toBeNull();

		// Click to expand
		fireEvent.press(getByText("Section 1"));
		expect(getByText("Content 1")).toBeTruthy();
	});

	it("collapses expanded item when clicked again", () => {
		const { getByText, queryByText } = render(
			<Accordion defaultValue="1">
				<Accordion.Item title="Section 1" value="1">
					<Text>Content 1</Text>
				</Accordion.Item>
			</Accordion>,
		);

		// Content should be visible initially
		expect(getByText("Content 1")).toBeTruthy();

		// Click to collapse
		fireEvent.press(getByText("Section 1"));
		expect(queryByText("Content 1")).toBeNull();
	});

	it("supports single expansion mode", () => {
		const { getByText, queryByText } = render(
			<Accordion>
				<Accordion.Item title="Section 1" value="1">
					<Text>Content 1</Text>
				</Accordion.Item>
				<Accordion.Item title="Section 2" value="2">
					<Text>Content 2</Text>
				</Accordion.Item>
			</Accordion>,
		);

		// Expand first item
		fireEvent.press(getByText("Section 1"));
		expect(getByText("Content 1")).toBeTruthy();

		// Expand second item - first should collapse
		fireEvent.press(getByText("Section 2"));
		expect(queryByText("Content 1")).toBeNull();
		expect(getByText("Content 2")).toBeTruthy();
	});

	it("supports multiple expansion mode", () => {
		const { getByText } = render(
			<Accordion allowMultiple>
				<Accordion.Item title="Section 1" value="1">
					<Text>Content 1</Text>
				</Accordion.Item>
				<Accordion.Item title="Section 2" value="2">
					<Text>Content 2</Text>
				</Accordion.Item>
			</Accordion>,
		);

		// Expand both items
		fireEvent.press(getByText("Section 1"));
		fireEvent.press(getByText("Section 2"));

		// Both should be visible
		expect(getByText("Content 1")).toBeTruthy();
		expect(getByText("Content 2")).toBeTruthy();
	});

	it("supports controlled mode", () => {
		const fn = vi.fn();
		const { getByText } = render(
			<Accordion value="1" onValueChange={fn}>
				<Accordion.Item title="Section 1" value="1">
					<Text>Content 1</Text>
				</Accordion.Item>
				<Accordion.Item title="Section 2" value="2">
					<Text>Content 2</Text>
				</Accordion.Item>
			</Accordion>,
		);

		fireEvent.press(getByText("Section 2"));
		expect(fn).toHaveBeenCalledWith("2");
	});

	it("supports controlled mode with multiple values", () => {
		const fn = vi.fn();
		const { getByText } = render(
			<Accordion value={["1"]} onValueChange={fn} allowMultiple>
				<Accordion.Item title="Section 1" value="1">
					<Text>Content 1</Text>
				</Accordion.Item>
				<Accordion.Item title="Section 2" value="2">
					<Text>Content 2</Text>
				</Accordion.Item>
			</Accordion>,
		);

		fireEvent.press(getByText("Section 2"));
		expect(fn).toHaveBeenCalledWith(["1", "2"]);
	});

	it("supports default expanded values", () => {
		const { getByText } = render(
			<Accordion defaultValue={["1", "2"]} allowMultiple>
				<Accordion.Item title="Section 1" value="1">
					<Text>Content 1</Text>
				</Accordion.Item>
				<Accordion.Item title="Section 2" value="2">
					<Text>Content 2</Text>
				</Accordion.Item>
			</Accordion>,
		);

		// Both should be visible by default
		expect(getByText("Content 1")).toBeTruthy();
		expect(getByText("Content 2")).toBeTruthy();
	});

	it("applies correct accessibility roles", () => {
		const { getAllByRole } = render(
			<Accordion>
				<Accordion.Item title="Section 1" value="1">
					<Text>Content 1</Text>
				</Accordion.Item>
			</Accordion>,
		);

		const buttons = getAllByRole("button");
		expect(buttons).toHaveLength(1);
		expect(buttons[0].props.accessibilityState.expanded).toBe(false);
	});

	it("updates accessibility state when expanded", () => {
		const { getByText, getAllByRole } = render(
			<Accordion>
				<Accordion.Item title="Section 1" value="1">
					<Text>Content 1</Text>
				</Accordion.Item>
			</Accordion>,
		);

		fireEvent.press(getByText("Section 1"));
		const buttons = getAllByRole("button");
		expect(buttons[0].props.accessibilityState.expanded).toBe(true);
	});

	it("throws error when value provided without onValueChange", () => {
		console.error = vi.fn();
		expect(() => {
			render(
				<Accordion value="1">
					<Accordion.Item title="Section 1" value="1">
						<Text>Content 1</Text>
					</Accordion.Item>
				</Accordion>,
			);
		}).toThrow("Accordion: onValueChange is required when value is provided");
	});

	it("throws error when Item used outside Accordion", () => {
		console.error = vi.fn();
		expect(() => {
			render(
				<Accordion.Item title="Section 1" value="1">
					<Text>Content 1</Text>
				</Accordion.Item>,
			);
		}).toThrow("Accordion.Item must be used within Accordion");
	});
});
