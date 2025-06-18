import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Slider } from "./Slider";

describe("Slider", () => {
	it("renders with value", () => {
		const { getByRole } = render(<Slider value={50} onValueChange={() => {}} min={0} max={100} />);
		const slider = getByRole("slider");
		expect(slider.props.accessibilityValue.now).toBe(50);
	});

	it("calls onValueChange when dragged", () => {
		const onValueChange = jest.fn();
		const { getByTestId } = render(
			<Slider value={50} onValueChange={onValueChange} min={0} max={100} testID="slider" />,
		);

		const slider = getByTestId("slider");
		// Simulate drag gesture
		fireEvent(slider, "responderMove", { nativeEvent: { locationX: 100 } });
		expect(onValueChange).toHaveBeenCalled();
	});

	it("respects min and max bounds", () => {
		const onValueChange = jest.fn();
		const { getByRole } = render(
			<Slider value={50} onValueChange={onValueChange} min={10} max={90} />,
		);

		const slider = getByRole("slider");
		expect(slider.props.accessibilityValue.min).toBe(10);
		expect(slider.props.accessibilityValue.max).toBe(90);
	});

	it("snaps to step values", () => {
		const onValueChange = jest.fn();
		const { getByTestId } = render(
			<Slider
				value={50}
				onValueChange={onValueChange}
				min={0}
				max={100}
				step={10}
				testID="slider"
			/>,
		);

		const slider = getByTestId("slider");
		fireEvent(slider, "responderMove", { nativeEvent: { locationX: 55 } });
		// Should snap to nearest step (50 or 60)
		expect(onValueChange).toHaveBeenCalledWith(expect.any(Number));
	});

	it("disables interaction", () => {
		const onValueChange = jest.fn();
		const { getByTestId } = render(
			<Slider
				value={50}
				onValueChange={onValueChange}
				min={0}
				max={100}
				disabled
				testID="slider"
			/>,
		);

		const slider = getByTestId("slider");
		fireEvent(slider, "responderMove", { nativeEvent: { locationX: 100 } });
		expect(onValueChange).not.toHaveBeenCalled();
	});

	it("shows marks", () => {
		const marks = [
			{ value: 0, label: "Min" },
			{ value: 50, label: "Mid" },
			{ value: 100, label: "Max" },
		];
		const { getByText } = render(
			<Slider value={50} onValueChange={() => {}} min={0} max={100} marks={marks} />,
		);

		expect(getByText("Min")).toBeTruthy();
		expect(getByText("Mid")).toBeTruthy();
		expect(getByText("Max")).toBeTruthy();
	});

	it("displays value label", () => {
		const { getByText } = render(
			<Slider value={75} onValueChange={() => {}} min={0} max={100} showValue />,
		);
		expect(getByText("75")).toBeTruthy();
	});

	it("formats value with custom formatter", () => {
		const formatter = (value: number) => `${value}%`;
		const { getByText } = render(
			<Slider
				value={75}
				onValueChange={() => {}}
				min={0}
				max={100}
				showValue
				formatValue={formatter}
			/>,
		);
		expect(getByText("75%")).toBeTruthy();
	});

	it("applies custom colors", () => {
		const { getByTestId } = render(
			<Slider
				value={50}
				onValueChange={() => {}}
				min={0}
				max={100}
				trackColor="#ccc"
				activeTrackColor="#00f"
				thumbColor="#f00"
				testID="slider"
			/>,
		);

		const slider = getByTestId("slider");
		expect(slider).toBeTruthy();
	});

	it("renders vertically", () => {
		const { getByRole } = render(
			<Slider value={50} onValueChange={() => {}} min={0} max={100} orientation="vertical" />,
		);

		const slider = getByRole("slider");
		expect(slider.props["aria-orientation"]).toBe("vertical");
	});

	it("supports range selection", () => {
		const onValueChange = jest.fn();
		const { getAllByRole } = render(
			<Slider value={[20, 80]} onValueChange={onValueChange} min={0} max={100} range />,
		);

		const sliders = getAllByRole("slider");
		expect(sliders).toHaveLength(2);
		expect(sliders[0].props.accessibilityValue.now).toBe(20);
		expect(sliders[1].props.accessibilityValue.now).toBe(80);
	});

	it("calls onSlidingStart and onSlidingComplete", () => {
		const onSlidingStart = jest.fn();
		const onSlidingComplete = jest.fn();
		const { getByTestId } = render(
			<Slider
				value={50}
				onValueChange={() => {}}
				onSlidingStart={onSlidingStart}
				onSlidingComplete={onSlidingComplete}
				min={0}
				max={100}
				testID="slider"
			/>,
		);

		const slider = getByTestId("slider");
		fireEvent(slider, "responderGrant");
		expect(onSlidingStart).toHaveBeenCalledWith(50);

		fireEvent(slider, "responderRelease");
		expect(onSlidingComplete).toHaveBeenCalledWith(50);
	});

	it("applies aria-label", () => {
		const { getByLabelText } = render(
			<Slider value={50} onValueChange={() => {}} min={0} max={100} aria-label="Volume control" />,
		);
		expect(getByLabelText("Volume control")).toBeTruthy();
	});

	it("applies size variants", () => {
		const sizes = ["sm", "md", "lg"] as const;
		sizes.forEach((size) => {
			const { getByTestId } = render(
				<Slider
					value={50}
					onValueChange={() => {}}
					min={0}
					max={100}
					size={size}
					testID={`slider-${size}`}
				/>,
			);
			expect(getByTestId(`slider-${size}`)).toBeTruthy();
		});
	});

	it("supports custom thumb component", () => {
		const CustomThumb = () => <div testID="custom-thumb" />;
		const { getByTestId } = render(
			<Slider value={50} onValueChange={() => {}} min={0} max={100} renderThumb={CustomThumb} />,
		);
		expect(getByTestId("custom-thumb")).toBeTruthy();
	});
});
