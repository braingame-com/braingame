import { fireEvent, render } from "@testing-library/react-native";
import { Tab, TabList, TabPanel, Tabs } from "./Tabs";

describe("Tabs composition", () => {
	it("selects a tab when pressed", () => {
		const { getByText, queryByText } = render(
			<Tabs defaultValue="first">
				<TabList>
					<Tab value="first">First</Tab>
					<Tab value="second">Second</Tab>
				</TabList>
				<TabPanel value="first">First content</TabPanel>
				<TabPanel value="second">Second content</TabPanel>
			</Tabs>,
		);

		expect(getByText("First content")).toBeTruthy();
		expect(queryByText("Second content")).toBeNull();

		fireEvent.press(getByText("Second"));

		expect(getByText("Second content")).toBeTruthy();
	});

	it("supports arrow key navigation", () => {
		const { getByA11yRole, getByText } = render(
			<Tabs defaultValue="first">
				<TabList>
					<Tab value="first">First</Tab>
					<Tab value="second">Second</Tab>
					<Tab value="third">Third</Tab>
				</TabList>
				<TabPanel value="first">First content</TabPanel>
				<TabPanel value="second">Second content</TabPanel>
				<TabPanel value="third">Third content</TabPanel>
			</Tabs>,
		);

		const list = getByA11yRole("tablist");

		fireEvent(list, "keyDown", { nativeEvent: { key: "ArrowRight" } });
		expect(getByText("Second content")).toBeTruthy();

		fireEvent(list, "keyDown", { nativeEvent: { key: "ArrowRight" } });
		expect(getByText("Third content")).toBeTruthy();
	});

	it("can keep panels mounted when requested", () => {
		const { getByText } = render(
			<Tabs defaultValue="first">
				<TabList>
					<Tab value="first">First</Tab>
					<Tab value="second">Second</Tab>
				</TabList>
				<TabPanel value="first">First content</TabPanel>
				<TabPanel value="second" keepMounted>
					Second content
				</TabPanel>
			</Tabs>,
		);

		expect(getByText("Second content")).toBeTruthy();
	});
});
