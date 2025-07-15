import { Tokens } from "@braingame/utils";
import { fireEvent, render } from "@testing-library/react-native";
import { View } from "./View";

jest.mock("../../theme", () => ({
	useTheme: jest.fn(() => ({
		colors: {
			background: "theme-color",
			surfaceContainer: "theme-color",
			outlineVariant: "theme-color",
		},
	})),
}));

describe("View", () => {
	it("applies background color from theme", () => {
		const { getByTestId } = render(<View testID="view" />);
		const element = getByTestId("view");
		expect(element.props.style).toEqual(
			expect.arrayContaining([expect.objectContaining({ backgroundColor: "theme-color" })]),
		);
	});

	it("applies rounded corners", () => {
		const { getByTestId } = render(<View rounded testID="view" />);
		const element = getByTestId("view");
		expect(element.props.style).toEqual(
			expect.arrayContaining([expect.objectContaining({ borderRadius: Tokens.m })]),
		);
	});

	it("applies border styles", () => {
		const { getByTestId } = render(<View border testID="view" />);
		const element = getByTestId("view");
		expect(element.props.style).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ borderWidth: 1, borderColor: "theme-color" }),
			]),
		);
	});

	it("updates border color on hover when hoverable", () => {
		const { getByTestId } = render(<View border hoverable testID="view" />);
		let element = getByTestId("view");
		// initially transparent
		expect(element.props.style).toEqual(
			expect.arrayContaining([expect.objectContaining({ borderColor: "transparent" })]),
		);
		fireEvent(element, "mouseEnter");
		element = getByTestId("view");
		expect(element.props.style).toEqual(
			expect.arrayContaining([expect.objectContaining({ borderColor: "theme-color" })]),
		);
	});

	it("applies pointer cursor when grabbable", () => {
		const { getByTestId } = render(<View grabbable testID="view" />);
		const element = getByTestId("view");
		expect(element.props.style).toEqual(
			expect.arrayContaining([expect.objectContaining({ cursor: "pointer" })]),
		);
	});
});
