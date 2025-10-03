import { fireEvent } from "@testing-library/react-native";
import { renderWithTheme } from "../../../test-utils/render-with-theme";
import { Toast } from "./Toast";

describe("Toast", () => {
	it("renders title and message", () => {
		const { getByText } = renderWithTheme(
			<Toast title="Saved" message="Profile updated" tone="success" variant="solid" />,
		);

		expect(getByText("Saved")).toBeTruthy();
		expect(getByText("Profile updated")).toBeTruthy();
	});

	it("invokes dismiss callback", () => {
		const onDismiss = jest.fn();
		const { getByLabelText } = renderWithTheme(<Toast message="Undo?" onDismiss={onDismiss} />);

		fireEvent.press(getByLabelText("Dismiss notification"));
		expect(onDismiss).toHaveBeenCalledTimes(1);
	});
});
