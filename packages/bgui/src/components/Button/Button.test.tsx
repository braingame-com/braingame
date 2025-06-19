import { fireEvent, render } from "@testing-library/react-native";
import { Button } from "./Button";

describe("Button", () => {
	it("renders children", () => {
		const { getByText } = render(<Button onPress={() => {}}>Press me</Button>);
		expect(getByText("Press me")).toBeTruthy();
	});

	it("calls onPress when pressed", () => {
		const fn = jest.fn();
		const { getByRole } = render(<Button onPress={fn}>Click</Button>);
		fireEvent.press(getByRole("button"));
		expect(fn).toHaveBeenCalled();
	});

	it("disables press when disabled", () => {
		const fn = jest.fn();
		const { getByRole } = render(
			<Button onPress={fn} disabled>
				Disabled
			</Button>,
		);
		fireEvent.press(getByRole("button"));
		expect(fn).not.toHaveBeenCalled();
	});
});
