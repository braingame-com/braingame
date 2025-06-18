import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";
import { Tabs } from "./Tabs";

describe("Tabs", () => {
	it("renders tabs and panels", () => {
		const { getByText } = render(
			<Tabs defaultValue="tab1">
				<Tabs.List>
					<Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
					<Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
				</Tabs.List>
				<Tabs.Panel value="tab1">
					<Text>Panel 1</Text>
				</Tabs.Panel>
				<Tabs.Panel value="tab2">
					<Text>Panel 2</Text>
				</Tabs.Panel>
			</Tabs>,
		);
		expect(getByText("Tab 1")).toBeTruthy();
		expect(getByText("Tab 2")).toBeTruthy();
		expect(getByText("Panel 1")).toBeTruthy();
	});

	it("switches tabs when clicked", () => {
		const { getByText, queryByText } = render(
			<Tabs defaultValue="tab1">
				<Tabs.List>
					<Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
					<Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
				</Tabs.List>
				<Tabs.Panel value="tab1">
					<Text>Panel 1</Text>
				</Tabs.Panel>
				<Tabs.Panel value="tab2">
					<Text>Panel 2</Text>
				</Tabs.Panel>
			</Tabs>,
		);

		fireEvent.press(getByText("Tab 2"));
		expect(queryByText("Panel 1")).toBeNull();
		expect(getByText("Panel 2")).toBeTruthy();
	});

	it("supports controlled mode", () => {
		const fn = jest.fn();
		const { getByText } = render(
			<Tabs value="tab1" onValueChange={fn}>
				<Tabs.List>
					<Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
					<Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
				</Tabs.List>
			</Tabs>,
		);

		fireEvent.press(getByText("Tab 2"));
		expect(fn).toHaveBeenCalledWith("tab2");
	});

	it("disables tab interaction", () => {
		const fn = jest.fn();
		const { getByText } = render(
			<Tabs defaultValue="tab1" onValueChange={fn}>
				<Tabs.List>
					<Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
					<Tabs.Tab value="tab2" disabled>
						Tab 2
					</Tabs.Tab>
				</Tabs.List>
			</Tabs>,
		);

		fireEvent.press(getByText("Tab 2"));
		expect(fn).not.toHaveBeenCalled();
	});

	it("applies correct accessibility roles", () => {
		const { getByRole, getAllByRole } = render(
			<Tabs defaultValue="tab1">
				<Tabs.List>
					<Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
					<Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
				</Tabs.List>
			</Tabs>,
		);

		expect(getByRole("tablist")).toBeTruthy();
		expect(getAllByRole("tab")).toHaveLength(2);
	});

	it("supports different variants", () => {
		const { getByRole } = render(
			<Tabs defaultValue="tab1" variant="pills">
				<Tabs.List>
					<Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
				</Tabs.List>
			</Tabs>,
		);

		const tablist = getByRole("tablist");
		// Variant is passed through context, so we just verify rendering
		expect(tablist).toBeTruthy();
	});

	it("supports scrollable tabs", () => {
		const { getByRole } = render(
			<Tabs defaultValue="tab1" scrollable>
				<Tabs.List>
					<Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
					<Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
					<Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
				</Tabs.List>
			</Tabs>,
		);

		const tablist = getByRole("tablist");
		// ScrollView wrapper will be applied when scrollable
		expect(tablist).toBeTruthy();
	});

	it("marks active tab with aria-selected", () => {
		const { getAllByRole } = render(
			<Tabs defaultValue="tab2">
				<Tabs.List>
					<Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
					<Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
				</Tabs.List>
			</Tabs>,
		);

		const tabs = getAllByRole("tab");
		expect(tabs[0].props.accessibilityState.selected).toBe(false);
		expect(tabs[1].props.accessibilityState.selected).toBe(true);
	});

	it("lazy renders panels", () => {
		const { queryByText } = render(
			<Tabs defaultValue="tab1" lazy>
				<Tabs.List>
					<Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
					<Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
				</Tabs.List>
				<Tabs.Panel value="tab1">
					<Text>Panel 1</Text>
				</Tabs.Panel>
				<Tabs.Panel value="tab2">
					<Text>Panel 2</Text>
				</Tabs.Panel>
			</Tabs>,
		);

		// Only active panel should be rendered when lazy
		expect(queryByText("Panel 1")).toBeTruthy();
		expect(queryByText("Panel 2")).toBeNull();
	});
});
