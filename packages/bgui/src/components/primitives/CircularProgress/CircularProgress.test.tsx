import { renderWithTheme } from "../../../test-utils/render-with-theme";
import { CircularProgress } from "./CircularProgress";

describe("CircularProgress", () => {
	it("renders provided children", () => {
		const { getByText } = renderWithTheme(<CircularProgress>Loading data</CircularProgress>);

		expect(getByText("Loading data")).toBeTruthy();
	});

	it("exposes determinate progress values for assistive tech", () => {
		const { getByTestId } = renderWithTheme(
			<CircularProgress determinate value={42} aria-label="Uploading" testID="progress" />,
		);

		const progressbar = getByTestId("progress");

		expect(progressbar.props.accessibilityValue?.now).toBe(42);
		expect(progressbar.props.accessibilityValue?.min).toBe(0);
		expect(progressbar.props.accessibilityValue?.max).toBe(100);
	});

	it("omits value attributes when indeterminate", () => {
		const { getByTestId } = renderWithTheme(
			<CircularProgress aria-label="Loading" testID="progress" />,
		);

		const progressbar = getByTestId("progress");

		expect(progressbar.props.accessibilityValue?.now).toBeUndefined();
		expect(progressbar.props.accessibilityValue?.min).toBeUndefined();
		expect(progressbar.props.accessibilityValue?.max).toBeUndefined();
	});
});
