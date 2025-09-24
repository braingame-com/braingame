import { fireEvent, render } from "@testing-library/react-native";
import { Button } from "../../primitives/Button";
import { Typography } from "../../primitives/Typography";
import { Card, CardActions, CardContent, CardHeader } from "./Card";

describe("Card", () => {
	it("renders header, content, and actions", () => {
		const { getByText } = render(
			<Card>
				<CardHeader title="Project" subtitle="Updated today" />
				<CardContent>
					<Typography level="body-md">Details live here</Typography>
				</CardContent>
				<CardActions>
					<Button variant="outlined">Action</Button>
				</CardActions>
			</Card>,
		);

		expect(getByText("Project")).toBeTruthy();
		expect(getByText("Details live here")).toBeTruthy();
		expect(getByText("Action")).toBeTruthy();
	});

	it("invokes onPress when interactive", () => {
		const handlePress = jest.fn();
		const { getByRole } = render(
			<Card onPress={handlePress}>
				<CardContent>
					<Typography level="body-md">Press me</Typography>
				</CardContent>
			</Card>,
		);

		fireEvent.press(getByRole("button"));
		expect(handlePress).toHaveBeenCalledTimes(1);
	});

	it("prevents presses when disabled", () => {
		const handlePress = jest.fn();
		const { getByRole } = render(
			<Card onPress={handlePress} disabled>
				<CardContent>
					<Typography level="body-md">Disabled card</Typography>
				</CardContent>
			</Card>,
		);

		fireEvent.press(getByRole("button"));
		expect(handlePress).not.toHaveBeenCalled();
	});
});
