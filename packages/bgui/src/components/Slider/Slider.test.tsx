import { fireEvent, render } from "@testing-library/react-native";
import { Slider } from "./Slider";

describe("Slider", () => {
	it("renders with value", () => {
		const { getByRole } = render(<Slider value={50} onValueChange={() => {}} />);
		expect(getByRole("slider")).toBeTruthy();
	});

	it("renders with min and max", () => {
		const onValueChange = jest.fn();
		const { getByRole } = render(
			<Slider value={50} onValueChange={onValueChange} min={0} max={100} />,
		);
		const slider = getByRole("slider");
		expect(slider.props.accessibilityValue.min).toBe(0);
		expect(slider.props.accessibilityValue.max).toBe(100);
		expect(slider.props.accessibilityValue.now).toBe(50);
	});

	it("calls onValueChange when value changes", () => {
		const onValueChange = jest.fn();
		const { getByRole } = render(<Slider value={50} onValueChange={onValueChange} />);

		const slider = getByRole("slider");
		// Simulate a value change
		fireEvent(slider, "valueChange", 75);
		expect(onValueChange).toHaveBeenCalledWith(75);
	});

	it("respects step prop", () => {
		const onValueChange = jest.fn();
		const { getByRole } = render(
			<Slider value={50} onValueChange={onValueChange} min={0} max={100} step={10} />,
		);

		const slider = getByRole("slider");
		// Value should be rounded to nearest step
		fireEvent(slider, "valueChange", 53);
		expect(onValueChange).toHaveBeenCalledWith(50);
	});

	it("disables interaction when disabled", () => {
		const onValueChange = jest.fn();
		const { getByRole } = render(
			<Slider value={50} onValueChange={onValueChange} min={0} max={100} disabled />,
		);

		const slider = getByRole("slider");
		expect(slider.props.disabled).toBe(true);
		fireEvent(slider, "valueChange", 75);
		expect(onValueChange).not.toHaveBeenCalled();
	});

	it("shows error state", () => {
		const { getByText } = render(
			<Slider value={50} onValueChange={() => {}} error errorMessage="Value is out of range" />,
		);
		expect(getByText("Value is out of range")).toBeTruthy();
	});

	it("shows helper text", () => {
		const { getByText } = render(
			<Slider value={50} onValueChange={() => {}} helperText="Adjust the volume" />,
		);
		expect(getByText("Adjust the volume")).toBeTruthy();
	});

	it("supports range values", () => {
		const onValueChange = jest.fn();
		const { getByRole } = render(
			<Slider value={[20, 80]} onValueChange={onValueChange} min={0} max={100} />,
		);

		const slider = getByRole("slider");
		// Should handle range values
		fireEvent(slider, "valueChange", [30, 70]);
		expect(onValueChange).toHaveBeenCalledWith([30, 70]);
	});

	it("applies custom styles", () => {
		const customStyle = { backgroundColor: "red" };
		const { getByRole } = render(
			<Slider value={50} onValueChange={() => {}} style={customStyle} />,
		);

		const slider = getByRole("slider");
		expect(slider.props.style).toEqual(
			expect.arrayContaining([expect.objectContaining(customStyle)]),
		);
	});

	it("applies aria-label", () => {
		const { getByLabelText } = render(
			<Slider value={50} onValueChange={() => {}} aria-label="Volume control" />,
		);
		expect(getByLabelText("Volume control")).toBeTruthy();
	});

	it("applies aria-describedby", () => {
		const { getByRole } = render(
			<Slider value={50} onValueChange={() => {}} aria-describedby="volume-description" />,
		);
		const slider = getByRole("slider");
		expect(slider.props["aria-describedby"]).toBe("volume-description");
	});

	it("applies aria-invalid", () => {
		const { getByRole } = render(
			<Slider value={50} onValueChange={() => {}} aria-invalid={true} />,
		);
		const slider = getByRole("slider");
		expect(slider.props["aria-invalid"]).toBe(true);
	});

	it("sets accessibility value", () => {
		const { getByRole } = render(<Slider value={75} onValueChange={() => {}} min={0} max={100} />);
		const slider = getByRole("slider");
		expect(slider.props.accessibilityValue).toEqual({
			min: 0,
			max: 100,
			now: 75,
		});
	});
});
