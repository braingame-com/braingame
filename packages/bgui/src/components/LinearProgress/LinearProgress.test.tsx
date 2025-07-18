import { fireEvent, render } from "@testing-library/react-native";
import { LinearProgress } from "./LinearProgress.native";

describe("LinearProgress", () => {
	it("renders children correctly", () => {
		const { getByText } = render(<LinearProgress>Test LinearProgress</LinearProgress>);

		expect(getByText("Test LinearProgress")).toBeTruthy();
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<LinearProgress onClick={handleClick}>Click me</LinearProgress>);

		fireEvent.press(getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("respects disabled state", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<LinearProgress disabled onClick={handleClick}>
				Disabled LinearProgress
			</LinearProgress>,
		);

		fireEvent.press(getByText("Disabled LinearProgress"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("applies accessibility props", () => {
		const { getByLabelText } = render(
			<LinearProgress aria-label="Custom label">Content</LinearProgress>,
		);

		expect(getByLabelText("Custom label")).toBeTruthy();
	});
});
