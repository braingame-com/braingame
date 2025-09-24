import { fireEvent, render } from "@testing-library/react-native";
import { Typography } from "../../primitives/Typography";
import { Alert } from "./Alert";

describe("Alert", () => {
	it("renders title and description", () => {
		const { getByText } = render(
			<Alert title="Network error" description="Please check your connection." />,
		);

		expect(getByText("Network error")).toBeTruthy();
		expect(getByText("Please check your connection.")).toBeTruthy();
	});

	it("renders custom actions", () => {
		const { getByText } = render(<Alert actions={<Typography>Retry</Typography>} />);

		expect(getByText("Retry")).toBeTruthy();
	});

	it("invokes dismiss handler", () => {
		const handleDismiss = jest.fn();
		const { getByLabelText } = render(
			<Alert
				onDismiss={handleDismiss}
				dismissLabel="Close alert"
				title="Heads up"
				description="Dismiss me"
			/>,
		);

		fireEvent.press(getByLabelText("Close alert"));

		expect(handleDismiss).toHaveBeenCalledTimes(1);
	});

	it("applies accessibility role", () => {
		const { getByRole } = render(<Alert role="status" title="Status" description="All good" />);

		expect(getByRole("status")).toBeTruthy();
	});
});
