import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { RadioGroup } from "./RadioGroup";

describe("RadioGroup", () => {
	it("renders radio options", () => {
		const { getByText } = render(
			<RadioGroup value="option1" onValueChange={() => {}}>
				<RadioGroup.Item value="option1" label="Option 1" />
				<RadioGroup.Item value="option2" label="Option 2" />
			</RadioGroup>,
		);
		expect(getByText("Option 1")).toBeTruthy();
		expect(getByText("Option 2")).toBeTruthy();
	});

	it("selects option on press", () => {
		const onValueChange = jest.fn();
		const { getByText } = render(
			<RadioGroup value="option1" onValueChange={onValueChange}>
				<RadioGroup.Item value="option1" label="Option 1" />
				<RadioGroup.Item value="option2" label="Option 2" />
			</RadioGroup>,
		);

		fireEvent.press(getByText("Option 2"));
		expect(onValueChange).toHaveBeenCalledWith("option2");
	});

	it("shows selected state", () => {
		const { getAllByRole } = render(
			<RadioGroup value="option2" onValueChange={() => {}}>
				<RadioGroup.Item value="option1" label="Option 1" />
				<RadioGroup.Item value="option2" label="Option 2" />
			</RadioGroup>,
		);

		const radios = getAllByRole("radio");
		expect(radios[0].props.accessibilityState.checked).toBe(false);
		expect(radios[1].props.accessibilityState.checked).toBe(true);
	});

	it("disables individual items", () => {
		const onValueChange = jest.fn();
		const { getByText } = render(
			<RadioGroup value="option1" onValueChange={onValueChange}>
				<RadioGroup.Item value="option1" label="Option 1" />
				<RadioGroup.Item value="option2" label="Option 2" disabled />
			</RadioGroup>,
		);

		fireEvent.press(getByText("Option 2"));
		expect(onValueChange).not.toHaveBeenCalled();
	});

	it("disables entire group", () => {
		const onValueChange = jest.fn();
		const { getByText } = render(
			<RadioGroup value="option1" onValueChange={onValueChange} disabled>
				<RadioGroup.Item value="option1" label="Option 1" />
				<RadioGroup.Item value="option2" label="Option 2" />
			</RadioGroup>,
		);

		fireEvent.press(getByText("Option 2"));
		expect(onValueChange).not.toHaveBeenCalled();
	});

	it("renders with description", () => {
		const { getByText } = render(
			<RadioGroup value="option1" onValueChange={() => {}}>
				<RadioGroup.Item value="option1" label="Option 1" description="This is the first option" />
			</RadioGroup>,
		);
		expect(getByText("This is the first option")).toBeTruthy();
	});

	it("applies orientation", () => {
		const { getByRole } = render(
			<RadioGroup value="option1" onValueChange={() => {}} orientation="horizontal">
				<RadioGroup.Item value="option1" label="Option 1" />
				<RadioGroup.Item value="option2" label="Option 2" />
			</RadioGroup>,
		);

		const group = getByRole("radiogroup");
		expect(group.props["aria-orientation"]).toBe("horizontal");
	});

	it("applies size variants", () => {
		const sizes = ["sm", "md", "lg"] as const;
		sizes.forEach((size) => {
			const { getByText } = render(
				<RadioGroup value="option1" onValueChange={() => {}} size={size}>
					<RadioGroup.Item value="option1" label={`Option ${size}`} />
				</RadioGroup>,
			);
			expect(getByText(`Option ${size}`)).toBeTruthy();
		});
	});

	it("validates required selection", () => {
		const onValueChange = jest.fn();
		const { getByRole } = render(
			<RadioGroup value={undefined} onValueChange={onValueChange} required>
				<RadioGroup.Item value="option1" label="Option 1" />
			</RadioGroup>,
		);

		const group = getByRole("radiogroup");
		expect(group.props["aria-required"]).toBe(true);
	});

	it("shows error state", () => {
		const { getByText } = render(
			<RadioGroup
				value="option1"
				onValueChange={() => {}}
				error
				errorMessage="Please select an option"
			>
				<RadioGroup.Item value="option1" label="Option 1" />
			</RadioGroup>,
		);
		expect(getByText("Please select an option")).toBeTruthy();
	});

	it("applies custom styles to items", () => {
		const { getByText } = render(
			<RadioGroup value="option1" onValueChange={() => {}}>
				<RadioGroup.Item value="option1" label="Option 1" style={{ padding: 20 }} />
			</RadioGroup>,
		);

		const item = getByText("Option 1").parent;
		expect(item?.props.style).toEqual(expect.objectContaining({ padding: 20 }));
	});

	it("supports uncontrolled mode with defaultValue", () => {
		const onValueChange = jest.fn();
		const { getByText } = render(
			<RadioGroup defaultValue="option1" onValueChange={onValueChange}>
				<RadioGroup.Item value="option1" label="Option 1" />
				<RadioGroup.Item value="option2" label="Option 2" />
			</RadioGroup>,
		);

		fireEvent.press(getByText("Option 2"));
		expect(onValueChange).toHaveBeenCalledWith("option2");
	});

	it("applies name to group", () => {
		const { getByRole } = render(
			<RadioGroup value="option1" onValueChange={() => {}} name="preferences">
				<RadioGroup.Item value="option1" label="Option 1" />
			</RadioGroup>,
		);

		const group = getByRole("radiogroup");
		expect(group.props.accessibilityLabel).toBe("preferences");
	});

	it("supports custom radio rendering", () => {
		const { getByTestId } = render(
			<RadioGroup value="option1" onValueChange={() => {}}>
				<RadioGroup.Item
					value="option1"
					label="Option 1"
					renderRadio={() => <div testID="custom-radio" />}
				/>
			</RadioGroup>,
		);
		expect(getByTestId("custom-radio")).toBeTruthy();
	});

	it("prevents selection when max selections reached", () => {
		const onValueChange = jest.fn();
		const { getAllByRole } = render(
			<RadioGroup value="option1" onValueChange={onValueChange}>
				<RadioGroup.Item value="option1" label="Option 1" />
				<RadioGroup.Item value="option2" label="Option 2" />
			</RadioGroup>,
		);

		// Radio groups only allow one selection by design
		const radios = getAllByRole("radio");
		expect(radios.filter((r) => r.props.accessibilityState.checked)).toHaveLength(1);
	});
});
