import { renderWithTheme } from "../../../test-utils/render-with-theme";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
	it("renders a skeleton with default props", () => {
		const { getByTestId } = renderWithTheme(<Skeleton testID="skeleton" />);

		expect(getByTestId("skeleton")).toBeTruthy();
	});

	it("respects the visible prop", () => {
		const { queryByTestId } = renderWithTheme(
			<Skeleton visible={false} testID="hidden-skeleton" />,
		);

		expect(queryByTestId("hidden-skeleton")).toBeNull();
	});

	it("renders overlay variant when loading", () => {
		const { getByTestId } = renderWithTheme(
			<Skeleton variant="overlay" loading animation="wave" testID="overlay-skeleton" />,
		);

		expect(getByTestId("overlay-skeleton")).toBeTruthy();
	});

	it("disables animations when animation prop is false", () => {
		const { getByTestId } = renderWithTheme(
			<Skeleton animation={false} testID="static-skeleton" />,
		);

		const skeleton = getByTestId("static-skeleton");

		expect(skeleton.props.children).toBeNull();
	});
});
