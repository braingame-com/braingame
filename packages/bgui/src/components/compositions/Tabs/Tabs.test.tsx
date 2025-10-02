import { fireEvent } from "@testing-library/react-native";
import { Platform, StyleSheet, Text } from "react-native";
import { renderWithTheme } from "../../../test-utils/render-with-theme";
import { Tab, TabList, TabPanel, Tabs } from "./Tabs";

describe("Tabs composition", () => {
	const originalPlatform = Platform.OS;

	afterEach(() => {
		Platform.OS = originalPlatform;
	});
	it("selects a tab when pressed", () => {
		const { getAllByRole, getByText, queryByText } = renderWithTheme(
			<Tabs defaultValue="first">
				<TabList testID="tablist">
					<Tab value="first">First</Tab>
					<Tab value="second">Second</Tab>
				</TabList>
				<TabPanel value="first">
					<Text>First content</Text>
				</TabPanel>
				<TabPanel value="second">
					<Text>Second content</Text>
				</TabPanel>
			</Tabs>,
		);

		expect(getByText("First content")).toBeTruthy();
		expect(queryByText("Second content")).toBeNull();

		const tabs = getAllByRole("tab");
		fireEvent.press(tabs[1]);

		expect(getByText("Second content")).toBeTruthy();
	});

	it("supports arrow key navigation", () => {
		Platform.OS = "web";
		const { getAllByRole, getByTestId, getByText } = renderWithTheme(
			<Tabs defaultValue="first">
				<TabList testID="tablist">
					<Tab value="first">First</Tab>
					<Tab value="second">Second</Tab>
					<Tab value="third">Third</Tab>
				</TabList>
				<TabPanel value="first">
					<Text>First content</Text>
				</TabPanel>
				<TabPanel value="second">
					<Text>Second content</Text>
				</TabPanel>
				<TabPanel value="third">
					<Text>Third content</Text>
				</TabPanel>
			</Tabs>,
		);

		const list = getByTestId("tablist");
		fireEvent(list, "keyDown", { nativeEvent: { key: "ArrowRight" }, defaultPrevented: false });
		let tabs = getAllByRole("tab");
		expect(tabs[1].props.accessibilityState?.selected).toBe(true);
		expect(getByText("Second content")).toBeTruthy();

		fireEvent(list, "keyDown", { nativeEvent: { key: "ArrowRight" }, defaultPrevented: false });
		tabs = getAllByRole("tab");
		expect(tabs[2].props.accessibilityState?.selected).toBe(true);
		expect(getByText("Third content")).toBeTruthy();
	});

	it("can keep panels mounted when requested", () => {
		const { UNSAFE_getByProps, queryByText } = renderWithTheme(
			<Tabs defaultValue="first">
				<TabList testID="tablist">
					<Tab value="first">First</Tab>
					<Tab value="second">Second</Tab>
				</TabList>
				<TabPanel value="first" testID="panel-first">
					<Text>First content</Text>
				</TabPanel>
				<TabPanel value="second" keepMounted testID="panel-second">
					<Text>Second content</Text>
				</TabPanel>
			</Tabs>,
		);

		expect(queryByText("Second content")).toBeNull();
		const panel = UNSAFE_getByProps({ testID: "panel-second" });
		const hostView = Array.isArray(panel.children) ? panel.children[0] : null;
		expect(hostView).toBeTruthy();
		const style = StyleSheet.flatten((hostView as { props: { style?: unknown } }).props.style);
		expect(style?.display).toBe("none");
	});
});
