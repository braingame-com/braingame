import { render } from "@testing-library/react-native";
import { Skeleton } from "./Skeleton";

describe("Skeleton", () => {
	it("renders a skeleton with default props", () => {
		const { getByTestId } = render(<Skeleton testID="skeleton" />);

		expect(getByTestId("skeleton")).toBeTruthy();
	});

	it("respects the visible prop", () => {
		const { queryByTestId } = render(<Skeleton visible={false} testID="hidden-skeleton" />);

		expect(queryByTestId("hidden-skeleton")).toBeNull();
	});

	it("renders overlay variant when loading", () => {
		const { getByTestId } = render(
			<Skeleton variant="overlay" loading animation="wave" testID="overlay-skeleton" />,
		);

		expect(getByTestId("overlay-skeleton")).toBeTruthy();
	});

	it("disables animations when animation prop is false", () => {
		const { getByTestId } = render(<Skeleton animation={false} testID="static-skeleton" />);

		const skeleton = getByTestId("static-skeleton");

		expect(skeleton.props.children).toBeUndefined();
	});
});
