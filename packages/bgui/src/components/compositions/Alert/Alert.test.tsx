import { fireEvent } from "@testing-library/react-native";
import { renderWithTheme } from "../../../test-utils/render-with-theme";
import { Typography } from "../../primitives/Typography";
import { Alert } from "./Alert";

describe("Alert", () => {
	it("renders title and description", () => {
		const { getByText } = renderWithTheme(
			<Alert title="Network error" description="Please check your connection." />,
		);

		expect(getByText("Network error")).toBeTruthy();
		expect(getByText("Please check your connection.")).toBeTruthy();
	});

	it("renders custom actions", () => {
		const { getByText } = renderWithTheme(<Alert actions={<Typography>Retry</Typography>} />);

		expect(getByText("Retry")).toBeTruthy();
	});

	it("invokes dismiss handler", () => {
		const handleDismiss = jest.fn();
		const { getByLabelText } = renderWithTheme(
			<Alert
				onDismiss={handleDismiss}
				dismissLabel="Close alert"
				title="Heads up"
				description="Dismiss me"
			/>,
		);

		fireEvent.press(getByLabelText("Close alert"), { defaultPrevented: false, nativeEvent: {} });

		expect(handleDismiss).toHaveBeenCalledTimes(1);
	});

	it("applies accessibility role", () => {
		const { getByTestId } = renderWithTheme(
			<Alert role="status" title="Status" description="All good" testID="alert" />,
		);
		const alert = getByTestId("alert");
		expect(alert.props.accessibilityRole).toBe("text");
	});
});
