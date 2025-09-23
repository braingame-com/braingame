// @ts-nocheck
import { fireEvent, render } from "@testing-library/react-native";
import { Textarea } from "./Textarea.native";

describe("Textarea", () => {
	it("renders children correctly", () => {
		const { getByText } = render(<Textarea>Test Textarea</Textarea>);

		expect(getByText("Test Textarea")).toBeTruthy();
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<Textarea onClick={handleClick}>Click me</Textarea>);

		fireEvent.press(getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("respects disabled state", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<Textarea disabled onClick={handleClick}>
				Disabled Textarea
			</Textarea>,
		);

		fireEvent.press(getByText("Disabled Textarea"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("applies accessibility props", () => {
		const { getByLabelText } = render(<Textarea aria-label="Custom label">Content</Textarea>);

		expect(getByLabelText("Custom label")).toBeTruthy();
	});
});
