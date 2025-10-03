import { fireEvent } from "@testing-library/react-native";
import { renderWithTheme } from "../../../test-utils/render-with-theme";
import { SidebarNavigation } from "./SidebarNavigation";

const sections = [
	{
		title: "Getting Started",
		items: [
			{ value: "introduction", label: "Introduction" },
			{ value: "installation", label: "Installation" },
		],
	},
];

describe("SidebarNavigation", () => {
	it("renders section titles and items", () => {
		const { getByText } = renderWithTheme(
			<SidebarNavigation sections={sections} activeItem="introduction" />,
		);

		expect(getByText("Getting Started")).toBeTruthy();
		expect(getByText("Introduction")).toBeTruthy();
		expect(getByText("Installation")).toBeTruthy();
	});

	it("invokes onItemPress when an item is pressed", () => {
		const handlePress = jest.fn();
		const { getByRole } = renderWithTheme(
			<SidebarNavigation sections={sections} activeItem="introduction" onItemPress={handlePress} />,
		);

		const installationItem = getByRole("link", { name: "Installation" });
		fireEvent.press(installationItem);

		expect(handlePress).toHaveBeenCalledTimes(1);
		const [firstCall] = handlePress.mock.calls;
		expect(firstCall?.[0]).toEqual({ value: "installation", label: "Installation" });
	});
});
