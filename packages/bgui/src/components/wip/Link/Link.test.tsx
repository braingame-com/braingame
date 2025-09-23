// @ts-nocheck
import { fireEvent, render } from "@testing-library/react-native";
import { Link } from "./Link.native";

describe("Link", () => {
	it("renders children correctly", () => {
		const { getByText } = render(<Link>Test Link</Link>);

		expect(getByText("Test Link")).toBeTruthy();
	});

	it("handles click events", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<Link onClick={handleClick}>Click me</Link>);

		fireEvent.press(getByText("Click me"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("respects disabled state", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<Link disabled onClick={handleClick}>
				Disabled Link
			</Link>,
		);

		fireEvent.press(getByText("Disabled Link"));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("applies accessibility props", () => {
		const { getByLabelText } = render(<Link aria-label="Custom label">Content</Link>);

		expect(getByLabelText("Custom label")).toBeTruthy();
	});
});
