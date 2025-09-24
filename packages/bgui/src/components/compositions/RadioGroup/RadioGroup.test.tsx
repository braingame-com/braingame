import { fireEvent, render } from "@testing-library/react-native";
import { Radio } from "../../primitives/Radio";
import { RadioGroup } from "./RadioGroup";

describe("RadioGroup", () => {
	it("provides selection context to radios", () => {
		const handleChange = jest.fn();
		const { getByLabelText } = render(
			<RadioGroup onChange={handleChange} aria-label="preferences">
				<Radio label="Daily" value="daily" aria-label="daily" />
				<Radio label="Weekly" value="weekly" aria-label="weekly" />
			</RadioGroup>,
		);

		fireEvent.press(getByLabelText("weekly"));
		expect(handleChange).toHaveBeenCalled();

		fireEvent.press(getByLabelText("daily"));
		expect(handleChange).toHaveBeenCalledTimes(2);
	});

	it("respects controlled value", () => {
		const { getByLabelText } = render(
			<RadioGroup value="weekly" aria-label="schedule">
				<Radio label="Daily" value="daily" aria-label="daily" />
				<Radio label="Weekly" value="weekly" aria-label="weekly" />
			</RadioGroup>,
		);

		expect(getByLabelText("weekly").props.accessibilityState?.selected).toBe(true);
		expect(getByLabelText("daily").props.accessibilityState?.selected).toBe(false);
	});
});
