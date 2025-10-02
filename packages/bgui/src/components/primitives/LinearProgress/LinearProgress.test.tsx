import { Text } from "react-native";
import { renderWithTheme } from "../../../test-utils/render-with-theme";
import { LinearProgress } from "./LinearProgress";

describe("LinearProgress", () => {
	it("renders determinate progress", () => {
		const { getByTestId } = renderWithTheme(
			<LinearProgress determinate value={60} testID="progress" />,
		);
		const progressbar = getByTestId("progress");
		expect(progressbar.props.accessibilityValue?.now).toBe(60);
	});

	it("renders indeterminate progress without aria-valuenow", () => {
		const { getByTestId } = renderWithTheme(<LinearProgress testID="progress" />);
		const progressbar = getByTestId("progress");
		expect(progressbar.props.accessibilityValue?.now).toBeUndefined();
	});

	it("renders children inside the track", () => {
		const { getByText } = renderWithTheme(
			<LinearProgress determinate value={40}>
				<Text>Loading</Text>
			</LinearProgress>,
		);
		expect(getByText("Loading")).toBeTruthy();
	});
});
