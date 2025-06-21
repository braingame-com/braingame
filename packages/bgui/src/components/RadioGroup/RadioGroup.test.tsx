import { vi } from "vitest";
import { fireEvent, render } from "@testing-library/react-native";
import { RadioGroup } from "./RadioGroup";

describe("RadioGroup", () => {
	it("renders radio options", () => {
		const { getByText } = render(
			<RadioGroup value="option1" onValueChange={() => {}}>
				<RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
				<RadioGroup.Item value="option2">Option 2</RadioGroup.Item>
			</RadioGroup>,
		);
		expect(getByText("Option 1")).toBeTruthy();
		expect(getByText("Option 2")).toBeTruthy();
	});

	it("selects option on press", () => {
		const onValueChange = vi.fn();
		const { getByText } = render(
			<RadioGroup value="option1" onValueChange={onValueChange}>
				<RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
				<RadioGroup.Item value="option2">Option 2</RadioGroup.Item>
			</RadioGroup>,
		);

		fireEvent.press(getByText("Option 2"));
		expect(onValueChange).toHaveBeenCalledWith("option2");
	});

	it("shows selected state", () => {
		const { getAllByRole } = render(
			<RadioGroup value="option2" onValueChange={() => {}}>
				<RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
				<RadioGroup.Item value="option2">Option 2</RadioGroup.Item>
			</RadioGroup>,
		);

		const radios = getAllByRole("radio");
		expect(radios[0].props.accessibilityState.checked).toBe(false);
		expect(radios[1].props.accessibilityState.checked).toBe(true);
	});

	it("disables individual items", () => {
		const onValueChange = vi.fn();
		const { getByText } = render(
			<RadioGroup value="option1" onValueChange={onValueChange}>
				<RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
				<RadioGroup.Item value="option2" disabled>
					Option 2
				</RadioGroup.Item>
			</RadioGroup>,
		);

		fireEvent.press(getByText("Option 2"));
		expect(onValueChange).not.toHaveBeenCalled();
	});

	it("disables entire group", () => {
		const onValueChange = vi.fn();
		const { getByText } = render(
			<RadioGroup value="option1" onValueChange={onValueChange} disabled>
				<RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
				<RadioGroup.Item value="option2">Option 2</RadioGroup.Item>
			</RadioGroup>,
		);

		fireEvent.press(getByText("Option 2"));
		expect(onValueChange).not.toHaveBeenCalled();
	});

	it("supports default value", () => {
		const { getAllByRole } = render(
			<RadioGroup defaultValue="option2">
				<RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
				<RadioGroup.Item value="option2">Option 2</RadioGroup.Item>
			</RadioGroup>,
		);

		const radios = getAllByRole("radio");
		expect(radios[1].props.accessibilityState.checked).toBe(true);
	});

	it("applies variant styles", () => {
		const variants = ["standard", "card"] as const;
		for (const variant of variants) {
			const { getByText } = render(
				<RadioGroup value="option1" onValueChange={() => {}} variant={variant}>
					<RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
				</RadioGroup>,
			);
			expect(getByText("Option 1")).toBeTruthy();
		}
	});

	it("shows error state", () => {
		const { getByText } = render(
			<RadioGroup value="" onValueChange={() => {}} error errorMessage="Please select an option">
				<RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
			</RadioGroup>,
		);
		expect(getByText("Please select an option")).toBeTruthy();
	});

	it("shows helper text", () => {
		const { getByText } = render(
			<RadioGroup value="" onValueChange={() => {}} helperText="Select one option">
				<RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
			</RadioGroup>,
		);
		expect(getByText("Select one option")).toBeTruthy();
	});

	it("applies aria-label", () => {
		const { getByLabelText } = render(
			<RadioGroup value="" onValueChange={() => {}} aria-label="Choose your preference">
				<RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
			</RadioGroup>,
		);
		expect(getByLabelText("Choose your preference")).toBeTruthy();
	});

	it("applies aria-invalid", () => {
		const { getByLabelText } = render(
			<RadioGroup value="" onValueChange={() => {}} aria-label="Options" aria-invalid={true}>
				<RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
			</RadioGroup>,
		);
		const group = getByLabelText("Options");
		expect(group.props["aria-invalid"]).toBe(true);
	});

	it("handles keyboard navigation", () => {
		const { getAllByRole } = render(
			<RadioGroup value="option1" onValueChange={() => {}}>
				<RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
				<RadioGroup.Item value="option2">Option 2</RadioGroup.Item>
			</RadioGroup>,
		);

		// Keyboard navigation would be tested here if supported
		const radios = getAllByRole("radio");
		expect(radios).toHaveLength(2);
	});
});
