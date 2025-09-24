import { fireEvent, render } from "@testing-library/react-native";
import { Typography } from "../../primitives/Typography";
import { ListItem } from "../ListItem";
import { List } from "./List";

describe("List", () => {
	it("renders provided list items", () => {
		const { getByText } = render(
			<List>
				<ListItem>Alpha</ListItem>
				<ListItem>Beta</ListItem>
			</List>,
		);

		expect(getByText("Alpha")).toBeTruthy();
		expect(getByText("Beta")).toBeTruthy();
	});

	it("emits selection changes when selectionMode is single", () => {
		const handleSelection = jest.fn();
		const { getByText } = render(
			<List selectionMode="single" onSelectionChange={handleSelection}>
				<ListItem value="one">One</ListItem>
				<ListItem value="two">Two</ListItem>
			</List>,
		);

		fireEvent.press(getByText("Two"));
		expect(handleSelection).toHaveBeenCalledWith("two");
	});

	it("does not trigger selection for disabled items", () => {
		const handleSelection = jest.fn();
		const { getByText } = render(
			<List selectionMode="single" onSelectionChange={handleSelection}>
				<ListItem value="one" disabled>
					<Typography level="body-md">Disabled</Typography>
				</ListItem>
			</List>,
		);

		fireEvent.press(getByText("Disabled"));
		expect(handleSelection).not.toHaveBeenCalled();
	});
});
