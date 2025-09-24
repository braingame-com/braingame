import { fireEvent, render } from "@testing-library/react-native";
import { Typography } from "../../primitives/Typography";
import { List } from "../List";
import { ListItem } from "./ListItem";

describe("ListItem", () => {
	it("renders within a list context", () => {
		const { getByText } = render(
			<List>
				<ListItem>Dashboard</ListItem>
			</List>,
		);

		expect(getByText("Dashboard")).toBeTruthy();
	});

	it("supports start and end actions", () => {
		const { getByText } = render(
			<List>
				<ListItem
					startAction={<Typography level="body-sm">🔥</Typography>}
					endAction={<Typography level="body-sm">→</Typography>}
				>
					Trending
				</ListItem>
			</List>,
		);

		expect(getByText("Trending")).toBeTruthy();
	});

	it("handles press callbacks", () => {
		const handlePress = jest.fn();
		const { getByText } = render(
			<List>
				<ListItem onPress={handlePress}>Select me</ListItem>
			</List>,
		);

		fireEvent.press(getByText("Select me"));
		expect(handlePress).toHaveBeenCalledTimes(1);
	});
});
