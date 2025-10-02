import { fireEvent } from "@testing-library/react-native";
import { StyleSheet } from "react-native";
import { renderWithTheme } from "../../../test-utils/render-with-theme";
import { Slider } from "./Slider";

const layoutEvent = (width: number) => ({
	nativeEvent: {
		layout: {
			width,
			height: 4,
			x: 0,
			y: 0,
		},
	},
});

const responderEvent = (locationX: number) => ({
	nativeEvent: {
		locationX,
	},
});

describe("Slider", () => {
	it("renders with theme colors and thumb positioning", () => {
		const { getByTestId } = renderWithTheme(
			<Slider defaultValue={50} minimumValue={0} maximumValue={100} testID="slider" />,
		);

		fireEvent(getByTestId("slider-track"), "layout", layoutEvent(200));
		const activeTrackStyle = StyleSheet.flatten(getByTestId("slider-track-active").props.style);
		const thumbStyleObject = StyleSheet.flatten(getByTestId("slider-thumb").props.style);

		expect(activeTrackStyle?.width).toBe(100);
		expect(thumbStyleObject?.transform).toEqual([{ translateX: 100 }]);
	});

	it("invokes value change callbacks when sliding", () => {
		const handleChange = jest.fn();
		const handleStart = jest.fn();
		const handleComplete = jest.fn();
		const { getByTestId } = renderWithTheme(
			<Slider
				defaultValue={0}
				minimumValue={0}
				maximumValue={100}
				step={10}
				onSlidingStart={handleStart}
				onValueChange={handleChange}
				onSlidingComplete={handleComplete}
				testID="slider"
			/>,
		);

		const slider = getByTestId("slider");
		fireEvent(getByTestId("slider-track"), "layout", layoutEvent(100));

		// Begin interaction
		fireEvent(slider, "startShouldSetResponder");
		fireEvent(slider, "responderGrant", responderEvent(20));
		fireEvent(slider, "responderMove", responderEvent(80));
		fireEvent(slider, "responderRelease", responderEvent(80));

		expect(handleStart).toHaveBeenCalledWith(0);
		expect(handleChange).toHaveBeenCalledWith(80);
		expect(handleComplete).toHaveBeenCalledWith(80);
	});

	it("responds to keyboard events", () => {
		const handleComplete = jest.fn();
		const { getByTestId } = renderWithTheme(
			<Slider
				defaultValue={50}
				minimumValue={0}
				maximumValue={100}
				step={10}
				onSlidingComplete={handleComplete}
				testID="slider"
			/>,
		);

		const slider = getByTestId("slider");
		fireEvent(getByTestId("slider-track"), "layout", layoutEvent(100));

		const preventDefault = jest.fn();
		fireEvent(slider, "keyDown", {
			nativeEvent: { key: "ArrowRight" },
			preventDefault,
		});

		expect(preventDefault).toHaveBeenCalled();
		expect(handleComplete).toHaveBeenCalledWith(60);
	});
});
