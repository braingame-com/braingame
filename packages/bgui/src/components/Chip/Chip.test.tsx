import { fireEvent, render } from "@testing-library/react-native";
import { Chip } from "./Chip";

describe("Chip", () => {
	it("renders with label", () => {
		const { getByText } = render(<Chip label="Test Chip" />);
		expect(getByText("Test Chip")).toBeTruthy();
	});

	it("renders with icon", () => {
		const { UNSAFE_getByType } = render(<Chip label="Test" icon="tag" />);
		const Icon = jest.requireActual("../Icon").Icon;
		const iconElement = UNSAFE_getByType(Icon);
		expect(iconElement.props.name).toBe("tag");
	});

	it("calls onPress when pressed", () => {
		const onPress = jest.fn();
		const { getByRole } = render(<Chip label="Clickable" onPress={onPress} />);
		fireEvent.press(getByRole("button"));
		expect(onPress).toHaveBeenCalledTimes(1);
	});

	it("shows remove button when onRemove is provided", () => {
		const onRemove = jest.fn();
		const { getByLabelText } = render(<Chip label="Removable" onRemove={onRemove} />);
		const removeButton = getByLabelText("Remove Removable");
		expect(removeButton).toBeTruthy();
	});

	it("calls onRemove when remove button is pressed", () => {
		const onRemove = jest.fn();
		const { getByLabelText } = render(<Chip label="Removable" onRemove={onRemove} />);
		fireEvent.press(getByLabelText("Remove Removable"));
		expect(onRemove).toHaveBeenCalledTimes(1);
	});

	it("applies selected state", () => {
		const { getByRole } = render(<Chip label="Selected" onPress={() => {}} selected />);
		const button = getByRole("button");
		expect(button.props.accessibilityState.selected).toBe(true);
	});

	it("applies disabled state", () => {
		const onPress = jest.fn();
		const { getByRole } = render(<Chip label="Disabled" onPress={onPress} disabled />);
		const button = getByRole("button");
		expect(button.props.accessibilityState.disabled).toBe(true);
		fireEvent.press(button);
		expect(onPress).not.toHaveBeenCalled();
	});

	it("does not show remove button when disabled", () => {
		const onRemove = jest.fn();
		const { queryByLabelText } = render(<Chip label="Disabled" onRemove={onRemove} disabled />);
		expect(queryByLabelText("Remove Disabled")).toBeNull();
	});
});
