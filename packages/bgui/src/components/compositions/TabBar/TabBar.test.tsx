import { fireEvent } from "@testing-library/react-native";
import { renderWithTheme } from "../../../test-utils/render-with-theme";
import { TabBar } from "./TabBar";

const items = [
	{ value: "home", label: "Home", icon: "home" },
	{ value: "search", label: "Search", icon: "search" },
	{ value: "profile", label: "Profile", icon: "person" },
];

describe("TabBar", () => {
	it("renders items and highlights active tab", () => {
		const { getAllByRole } = renderWithTheme(
			<TabBar items={items} activeValue="search" testID="tabbar" />,
		);

		const tabs = getAllByRole("tab");
		const activeTab = tabs.find((tab) => tab.props.accessibilityState?.selected);
		expect(activeTab?.props.accessibilityLabel).toBe("Search");
	});

	it("triggers onChange when a tab is pressed", () => {
		const handleChange = jest.fn();
		const { getByLabelText } = renderWithTheme(
			<TabBar items={items} activeValue="home" onChange={handleChange} />,
		);

		fireEvent.press(getByLabelText("Profile"));
		expect(handleChange).toHaveBeenCalledWith("profile");
	});
});
