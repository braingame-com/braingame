import { fireEvent, render } from "@testing-library/react-native";
import { Skeleton } from "./Skeleton.native";

describe("Skeleton", () => {
	it("renders children correctly", () => {
		const { getByText } = render(<Skeleton>Test Skeleton</Skeleton>);

		expect(getByText("Test Skeleton")).toBeTruthy();
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<Skeleton onClick={handleClick}>Click me</Skeleton>);

		fireEvent.press(getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("respects disabled state", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<Skeleton disabled onClick={handleClick}>
				Disabled Skeleton
			</Skeleton>,
		);

		fireEvent.press(getByText("Disabled Skeleton"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("applies accessibility props", () => {
		const { getByLabelText } = render(<Skeleton aria-label="Custom label">Content</Skeleton>);

		expect(getByLabelText("Custom label")).toBeTruthy();
	});
});
