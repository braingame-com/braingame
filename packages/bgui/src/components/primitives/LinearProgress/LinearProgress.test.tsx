import { render } from "@testing-library/react-native";
import { Text } from "react-native";
import { LinearProgress } from "./LinearProgress";

describe("LinearProgress", () => {
	it("renders determinate progress", () => {
		const { getByTestId } = render(<LinearProgress determinate value={60} testID="progress" />);
		const progressbar = getByTestId("progress");
		expect(progressbar.props.accessibilityValue?.now).toBe(60);
		expect(getByTestId("progress-indicator")).toBeTruthy();
	});

	it("renders indeterminate progress without aria-valuenow", () => {
		const { getByTestId } = render(<LinearProgress testID="progress" />);
		const progressbar = getByTestId("progress");
		expect(progressbar.props.accessibilityValue?.now).toBeUndefined();
	});

	it("renders children inside the track", () => {
		const { getByText } = render(
			<LinearProgress determinate value={40}>
				<Text>Loading</Text>
			</LinearProgress>,
		);
		expect(getByText("Loading")).toBeTruthy();
	});
});
