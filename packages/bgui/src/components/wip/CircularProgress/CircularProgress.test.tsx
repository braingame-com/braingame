// @ts-nocheck
import { fireEvent, render } from "@testing-library/react-native";
import { CircularProgress } from "./CircularProgress.native";

describe("CircularProgress", () => {
	it("renders children correctly", () => {
		const { getByText } = render(<CircularProgress>Test CircularProgress</CircularProgress>);

		expect(getByText("Test CircularProgress")).toBeTruthy();
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<CircularProgress onClick={handleClick}>Click me</CircularProgress>,
		);

		fireEvent.press(getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("respects disabled state", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<CircularProgress disabled onClick={handleClick}>
				Disabled CircularProgress
			</CircularProgress>,
		);

		fireEvent.press(getByText("Disabled CircularProgress"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("applies accessibility props", () => {
		const { getByLabelText } = render(
			<CircularProgress aria-label="Custom label">Content</CircularProgress>,
		);

		expect(getByLabelText("Custom label")).toBeTruthy();
	});
});
