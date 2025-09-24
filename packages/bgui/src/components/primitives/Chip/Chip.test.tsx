import { fireEvent, render } from "@testing-library/react-native";
import { Icon } from "../Icon";
import { Chip } from "./Chip";

describe("Chip", () => {
	it("renders content", () => {
		const { getByText } = render(<Chip>Test Chip</Chip>);

		expect(getByText("Test Chip")).toBeTruthy();
	});

	it("triggers onClick when interactive", () => {
		const handleClick = jest.fn();
		const { getByText } = render(<Chip onClick={handleClick}>Tap me</Chip>);

		fireEvent.press(getByText("Tap me"));

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("does not trigger onClick when disabled", () => {
		const handleClick = jest.fn();
		const { getByText } = render(
			<Chip disabled onClick={handleClick}>
				Disabled Chip
			</Chip>,
		);

		fireEvent.press(getByText("Disabled Chip"));

		expect(handleClick).not.toHaveBeenCalled();
	});

	it("renders decorators", () => {
		const { getByText } = render(
			<Chip startDecorator={<Icon name="info" />} endDecorator={<Icon name="close" />}>
				With Icon
			</Chip>,
		);

		expect(getByText("With Icon")).toBeTruthy();
	});

	it("supports dismiss action", () => {
		const handleDismiss = jest.fn();
		const { getByLabelText } = render(
			<Chip onDismiss={handleDismiss} dismissLabel="Remove item">
				Item
			</Chip>,
		);

		fireEvent.press(getByLabelText("Remove item"));

		expect(handleDismiss).toHaveBeenCalledTimes(1);
	});

	it("applies accessibility label", () => {
		const { getByA11yLabel } = render(
			<Chip aria-label="Custom label" onClick={() => undefined}>
				Labelled Chip
			</Chip>,
		);

		expect(getByA11yLabel("Custom label")).toBeTruthy();
	});
});
