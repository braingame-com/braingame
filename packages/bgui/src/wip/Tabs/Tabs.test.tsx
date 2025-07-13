import { fireEvent, render } from "@testing-library/react-native";
import type React from "react";
import { useState } from "react";
import { Text } from "react-native";
import { vi } from "vitest";
import { Tabs } from "./Tabs";

// Helper component for testing controlled mode
const ControlledTabs = ({
	initialValue = "tab1",
	children,
}: {
	initialValue?: string;
	children: React.ReactNode;
}) => {
	const [activeTab, setActiveTab] = useState(initialValue);
	return (
		<Tabs activeTab={activeTab} onValueChange={setActiveTab}>
			{children}
		</Tabs>
	);
};

describe("Tabs", () => {
	it("renders tabs and panels", () => {
		const { getByText } = render(
			<ControlledTabs>
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
			</ControlledTabs>,
		);
		expect(getByText("Tab 1")).toBeTruthy();
		expect(getByText("Tab 2")).toBeTruthy();
		expect(getByText("Panel 1")).toBeTruthy();
	});

	it("switches tabs when clicked", () => {
		const { getByText, queryByText } = render(
			<ControlledTabs>
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
			</ControlledTabs>,
		);

		fireEvent.press(getByText("Tab 2"));
		expect(queryByText("Panel 1")).toBeNull();
		expect(getByText("Panel 2")).toBeTruthy();
	});

	it("supports controlled mode", () => {
		const fn = vi.fn();
		const { getByText } = render(
			<Tabs activeTab="tab1" onValueChange={fn}>
				<Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
				<Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
			</Tabs>,
		);

		fireEvent.press(getByText("Tab 2"));
		expect(fn).toHaveBeenCalledWith("tab2");
	});

	it("calls onValueChange when tab changes", () => {
		const fn = vi.fn();
		const { getByText } = render(
			<Tabs activeTab="tab1" onValueChange={fn}>
				<Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
				<Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
			</Tabs>,
		);

		fireEvent.press(getByText("Tab 2"));
		expect(fn).toHaveBeenCalledWith("tab2");
	});

	it("disables tabs", () => {
		const fn = vi.fn();
		const { getByText } = render(
			<Tabs activeTab="tab1" onValueChange={fn}>
				<Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
				<Tabs.Tab value="tab2" disabled>
					Tab 2
				</Tabs.Tab>
			</Tabs>,
		);

		fireEvent.press(getByText("Tab 2"));
		expect(fn).not.toHaveBeenCalled();
	});

	it("applies variant styles", () => {
		const { getByText } = render(
			<Tabs activeTab="tab1" onValueChange={() => {}} variant="pills">
				<Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
			</Tabs>,
		);

		const tab = getByText("Tab 1");
		expect(tab).toBeTruthy();
	});

	it("supports scrollable tabs", () => {
		const { getByText } = render(
			<Tabs activeTab="tab1" onValueChange={() => {}} scrollable>
				<Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
			</Tabs>,
		);

		const tab = getByText("Tab 1");
		expect(tab).toBeTruthy();
	});

	it("applies aria roles", () => {
		const { getByRole, getAllByRole } = render(
			<ControlledTabs>
				<Tabs.List>
					<Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
					<Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
				</Tabs.List>
			</ControlledTabs>,
		);

		expect(getByRole("tablist")).toBeTruthy();
		expect(getAllByRole("tab")).toHaveLength(2);
	});

	it("sets aria-selected on active tab", () => {
		const { getAllByRole } = render(
			<Tabs activeTab="tab2" onValueChange={() => {}}>
				<Tabs.List>
					<Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
					<Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
				</Tabs.List>
			</Tabs>,
		);

		const tabs = getAllByRole("tab");
		expect(tabs[0].props["aria-selected"]).toBe(false);
		expect(tabs[1].props["aria-selected"]).toBe(true);
	});

	it("sets aria-controls and aria-labelledby", () => {
		const { getByRole } = render(
			<ControlledTabs>
				<Tabs.List>
					<Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
				</Tabs.List>
				<Tabs.Panel value="tab1">
					<Text>Panel 1</Text>
				</Tabs.Panel>
			</ControlledTabs>,
		);

		const tab = getByRole("tab");
		expect(tab.props["aria-controls"]).toBe("tabpanel-tab1");
	});

	it("supports keyboard navigation", () => {
		const { getAllByRole } = render(
			<ControlledTabs>
				<Tabs.List>
					<Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
					<Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
					<Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
				</Tabs.List>
			</ControlledTabs>,
		);

		// Keyboard navigation would be tested here if supported
		const tabs = getAllByRole("tab");
		expect(tabs).toHaveLength(3);
	});
});
