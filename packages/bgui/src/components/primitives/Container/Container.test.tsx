import { render } from "@testing-library/react-native";
import * as ReactNative from "react-native";
import { StyleSheet, Text } from "react-native";

import { Container } from "./Container";

const useWindowDimensionsSpy = jest.spyOn(ReactNative, "useWindowDimensions");

const setScreenWidth = (width: number) => {
	useWindowDimensionsSpy.mockReturnValue({ width, height: 800, scale: 1, fontScale: 1 });
};

beforeEach(() => {
	setScreenWidth(1024);
});

afterEach(() => {
	jest.clearAllMocks();
});

afterAll(() => {
	useWindowDimensionsSpy.mockRestore();
});

describe("Container", () => {
	it("renders children", () => {
		const { getByText } = render(
			<Container>
				<Text>Content</Text>
			</Container>,
		);

		expect(getByText("Content")).toBeTruthy();
	});

	it("applies provided testID", () => {
		const { getByTestId } = render(
			<Container testID="container-test">
				<Text>Content</Text>
			</Container>,
		);

		expect(getByTestId("container-test")).toBeTruthy();
	});

	it("applies max width constraints", () => {
		setScreenWidth(1400);
		const { getByTestId } = render(
			<Container testID="container" maxWidth="md">
				<Text>Content</Text>
			</Container>,
		);

		const style = StyleSheet.flatten(getByTestId("container").props.style);
		const { width } = ReactNative.useWindowDimensions();
		expect(style.maxWidth).toBeLessThanOrEqual(900);
		expect(style.maxWidth).toBeLessThanOrEqual(width);
	});

	it("respects disableGutters", () => {
		const { getByTestId } = render(
			<Container testID="container" disableGutters>
				<Text>Content</Text>
			</Container>,
		);

		const style = StyleSheet.flatten(getByTestId("container").props.style);
		expect(style.paddingHorizontal).toBeUndefined();
	});

	it("limits width when fixed is true", () => {
		setScreenWidth(480);
		const { getByTestId } = render(
			<Container testID="container" fixed maxWidth="lg">
				<Text>Content</Text>
			</Container>,
		);

		const style = StyleSheet.flatten(getByTestId("container").props.style);
		const { width } = ReactNative.useWindowDimensions();
		expect(style.maxWidth).toBeLessThanOrEqual(width);
		expect(style.maxWidth).toBeLessThanOrEqual(1200);
	});

	it("omits maxWidth when disabled", () => {
		const { getByTestId } = render(
			<Container testID="container" maxWidth={false}>
				<Text>Content</Text>
			</Container>,
		);

		const style = StyleSheet.flatten(getByTestId("container").props.style);
		expect(style.maxWidth).toBeUndefined();
	});

	it("merges custom styles", () => {
		const { getByTestId } = render(
			<Container testID="container" style={{ backgroundColor: "papayawhip" }}>
				<Text>Content</Text>
			</Container>,
		);

		const style = StyleSheet.flatten(getByTestId("container").props.style);
		expect(style.backgroundColor).toBe("papayawhip");
	});
});
