/// <reference types="jest" />
import { render } from "@testing-library/react-native";
import { ProgressBar } from "./ProgressBar";

describe("ProgressBar", () => {
	it("renders linear progress with correct width", () => {
		const { getByTestId } = render(<ProgressBar value={25} animated={false} />);
		const bar = getByTestId("progress-bar-inner");
		const widthStyle = (Array.isArray(bar.props.style) ? bar.props.style : [bar.props.style]).find(
			(s) => s && typeof s.width !== "undefined",
		);
		expect(widthStyle?.width).toBe("25%");
	});
});
