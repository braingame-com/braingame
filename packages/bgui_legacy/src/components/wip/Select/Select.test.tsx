import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { vi } from "vitest";
import { Select } from "./Select";

describe("Select", () => {
	it("renders with placeholder", () => {
		const { getByText } = render(
			<Select value="" onValueChange={() => {}} placeholder="Choose an option">
				<Select.Item value="option1">Option 1</Select.Item>
			</Select>,
		);
		expect(getByText("Choose an option")).toBeTruthy();
	});

	it("shows selected value", () => {
		const { getByText } = render(
			<Select value="option1" onValueChange={() => {}}>
				<Select.Item value="option1">Option 1</Select.Item>
				<Select.Item value="option2">Option 2</Select.Item>
			</Select>,
		);
		expect(getByText("option1")).toBeTruthy();
	});

	it("opens dropdown when pressed", () => {
		const { getByRole, getByText } = render(
			<Select value="" onValueChange={() => {}} variant="dropdown">
				<Select.Item value="option1">Option 1</Select.Item>
			</Select>,
		);
		fireEvent.press(getByRole("button"));
		expect(getByText("Option 1")).toBeTruthy();
	});

	it("calls onValueChange when item selected", async () => {
		const fn = vi.fn();
		const { getByRole, getByText } = render(
			<Select value="" onValueChange={fn} variant="dropdown">
				<Select.Item value="option1">Option 1</Select.Item>
			</Select>,
		);
		fireEvent.press(getByRole("button"));
		await waitFor(() => {
			fireEvent.press(getByText("Option 1"));
		});
		expect(fn).toHaveBeenCalledWith("option1");
	});

	it("supports multiple selection", async () => {
		const fn = vi.fn();
		const { getByRole, getByText } = render(
			<Select value={[]} onValueChange={fn} multiple variant="dropdown">
				<Select.Item value="option1">Option 1</Select.Item>
				<Select.Item value="option2">Option 2</Select.Item>
			</Select>,
		);
		fireEvent.press(getByRole("button"));
		await waitFor(() => {
			fireEvent.press(getByText("Option 1"));
		});
		expect(fn).toHaveBeenCalledWith(["option1"]);
	});

	it("deselects item in multiple mode", async () => {
		const fn = vi.fn();
		const { getByRole, getByText } = render(
			<Select value={["option1"]} onValueChange={fn} multiple variant="dropdown">
				<Select.Item value="option1">Option 1</Select.Item>
			</Select>,
		);
		fireEvent.press(getByRole("button"));
		await waitFor(() => {
			fireEvent.press(getByText("Option 1"));
		});
		expect(fn).toHaveBeenCalledWith([]);
	});

	it("does not open when disabled", () => {
		const { getByRole, queryByText } = render(
			<Select value="" onValueChange={() => {}} disabled>
				<Select.Item value="option1">Option 1</Select.Item>
			</Select>,
		);
		fireEvent.press(getByRole("button"));
		expect(queryByText("Option 1")).toBeNull();
	});

	it("shows error message", () => {
		const { getByText } = render(
			<Select value="" onValueChange={() => {}} error errorMessage="Selection required">
				<Select.Item value="option1">Option 1</Select.Item>
			</Select>,
		);
		expect(getByText("Selection required")).toBeTruthy();
	});

	it("shows helper text", () => {
		const { getByText } = render(
			<Select value="" onValueChange={() => {}} helperText="Pick your favorite">
				<Select.Item value="option1">Option 1</Select.Item>
			</Select>,
		);
		expect(getByText("Pick your favorite")).toBeTruthy();
	});

	it("validates required props", () => {
		console.error = vi.fn();
		expect(() => {
			render(
				<Select value="" onValueChange={undefined as unknown as () => void}>
					<Select.Item value="option1">Option 1</Select.Item>
				</Select>,
			);
		}).toThrow();
	});
});
