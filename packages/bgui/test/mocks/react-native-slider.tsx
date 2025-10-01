import React, { forwardRef } from "react";

export interface SliderProps {
	value?: number;
	minimumValue?: number;
	maximumValue?: number;
	step?: number;
	onValueChange?: (value: number) => void;
	testID?: string;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
	(
		{ value = 0, minimumValue = 0, maximumValue = 1, step = 0.1, onValueChange, testID },
		ref,
	) => {
		return (
			<input
				ref={ref}
				type="range"
				min={minimumValue}
				max={maximumValue}
				step={step}
				value={value}
				data-testid={testID}
				onChange={(event) => onValueChange?.(Number(event.target.value))}
			/>
		);
	},
);

Slider.displayName = "MockSlider";

export default Slider;
