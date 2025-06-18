import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { ActionList } from "./ActionList";
import { ActionListItem } from "./ActionListItem";

describe("ActionList", () => {
	it("renders items", () => {
		const { getByText } = render(
			<ActionList>
				<ActionListItem>Item 1</ActionListItem>
				<ActionListItem>Item 2</ActionListItem>
			</ActionList>,
		);
		expect(getByText("Item 1")).toBeTruthy();
		expect(getByText("Item 2")).toBeTruthy();
	});

	it("handles item press", () => {
		const fn = jest.fn();
		const { getByText } = render(
			<ActionList>
				<ActionListItem onPress={fn}>Click me</ActionListItem>
			</ActionList>,
		);
		fireEvent.press(getByText("Click me"));
		expect(fn).toHaveBeenCalled();
	});

	it("supports single selection", () => {
		const fn = jest.fn();
		const { getByText } = render(
			<ActionList selectable onSelectionChange={fn}>
				<ActionListItem value="item1">Item 1</ActionListItem>
				<ActionListItem value="item2">Item 2</ActionListItem>
			</ActionList>,
		);
		fireEvent.press(getByText("Item 1"));
		expect(fn).toHaveBeenCalledWith(["item1"]);
	});

	it("supports controlled selection", () => {
		const { getByText, rerender } = render(
			<ActionList selectable selectedItems={["item1"]}>
				<ActionListItem value="item1">Item 1</ActionListItem>
				<ActionListItem value="item2">Item 2</ActionListItem>
			</ActionList>,
		);
		// Item 1 should be selected
		const item1 = getByText("Item 1").parent;
		expect(item1?.props["aria-selected"]).toBe(true);

		// Update selection
		rerender(
			<ActionList selectable selectedItems={["item2"]}>
				<ActionListItem value="item1">Item 1</ActionListItem>
				<ActionListItem value="item2">Item 2</ActionListItem>
			</ActionList>,
		);
		const item2 = getByText("Item 2").parent;
		expect(item2?.props["aria-selected"]).toBe(true);
	});

	it("deselects selected item", () => {
		const fn = jest.fn();
		const { getByText } = render(
			<ActionList selectable selectedItems={["item1"]} onSelectionChange={fn}>
				<ActionListItem value="item1">Item 1</ActionListItem>
			</ActionList>,
		);
		fireEvent.press(getByText("Item 1"));
		expect(fn).toHaveBeenCalledWith([]);
	});

	it("disables item interaction", () => {
		const fn = jest.fn();
		const { getByText } = render(
			<ActionList>
				<ActionListItem onPress={fn} disabled>
					Disabled Item
				</ActionListItem>
			</ActionList>,
		);
		fireEvent.press(getByText("Disabled Item"));
		expect(fn).not.toHaveBeenCalled();
	});

	it("renders with icons", () => {
		const { getByLabelText } = render(
			<ActionList>
				<ActionListItem icon="settings">Settings</ActionListItem>
			</ActionList>,
		);
		// Icon should be rendered with aria-hidden
		expect(getByLabelText("settings icon")).toBeTruthy();
	});

	it("applies correct roles", () => {
		const { getByRole } = render(
			<ActionList selectable>
				<ActionListItem>Item</ActionListItem>
			</ActionList>,
		);
		expect(getByRole("listbox")).toBeTruthy();
	});

	it("applies menu role for menu variant", () => {
		const { getByRole } = render(
			<ActionList variant="menu">
				<ActionListItem>Item</ActionListItem>
			</ActionList>,
		);
		expect(getByRole("menu")).toBeTruthy();
	});

	it("supports aria-label", () => {
		const { getByLabelText } = render(
			<ActionList aria-label="Main navigation">
				<ActionListItem>Home</ActionListItem>
			</ActionList>,
		);
		expect(getByLabelText("Main navigation")).toBeTruthy();
	});
});