import { fireEvent, render } from "@testing-library/react-native";
import { Alert } from "./Alert.native";

describe("Alert", () => {
	it("renders children correctly", () => {
		const { getByText } = render(<Alert>Test Alert</Alert>);

		expect(getByText("Test Alert")).toBeTruthy();
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<Alert onClick={handleClick}>Click me</Alert>);

		fireEvent.press(getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("respects disabled state", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<Alert disabled onClick={handleClick}>
				Disabled Alert
			</Alert>,
		);

		fireEvent.press(getByText("Disabled Alert"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("applies accessibility props", () => {
		const { getByLabelText } = render(<Alert aria-label="Custom label">Content</Alert>);

		expect(getByLabelText("Custom label")).toBeTruthy();
	});
});
