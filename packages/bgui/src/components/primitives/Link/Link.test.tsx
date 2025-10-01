import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { Linking, Platform, StyleSheet, Text } from "react-native";

import { Link } from "./Link";

const openURLSpy = jest.spyOn(Linking, "openURL");
const canOpenURLSpy = jest.spyOn(Linking, "canOpenURL");
const originalPlatform = Platform.OS;

const setPlatform = (os: typeof Platform.OS) => {
	Object.defineProperty(Platform, "OS", { value: os, configurable: true });
};

beforeEach(() => {
	openURLSpy.mockResolvedValue(undefined);
	canOpenURLSpy.mockResolvedValue(true);
	setPlatform("ios");
});

afterEach(() => {
	jest.clearAllMocks();
});

afterAll(() => {
	openURLSpy.mockRestore();
	canOpenURLSpy.mockRestore();
	setPlatform(originalPlatform);
});

describe("Link", () => {
	it("renders string children", () => {
		const { getByText } = render(<Link>Example</Link>);

		expect(getByText("Example")).toBeTruthy();
	});

	it("renders decorators", () => {
		const { getByText } = render(
			<Link startDecorator={<Text>Start</Text>} endDecorator={<Text>End</Text>}>
				Decorated
			</Link>,
		);

		expect(getByText("Start")).toBeTruthy();
		expect(getByText("End")).toBeTruthy();
	});

	it("calls onClick and opens supported links", async () => {
		const handleClick = jest.fn();

		const { getByText } = render(
			<Link href="https://example.com" onClick={handleClick}>
				Visit
			</Link>,
		);

		fireEvent.press(getByText("Visit"));

		await waitFor(() => expect(openURLSpy).toHaveBeenCalledWith("https://example.com"));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("prevents presses when disabled", async () => {
		const handleClick = jest.fn();

		const { getByText } = render(
			<Link disabled href="https://example.com" onClick={handleClick}>
				Disabled
			</Link>,
		);

		fireEvent.press(getByText("Disabled"));

		await waitFor(() => {
			expect(handleClick).not.toHaveBeenCalled();
			expect(openURLSpy).not.toHaveBeenCalled();
		});
	});

	it("applies underline styles when requested", () => {
		const { getByText } = render(<Link underline="always">Always Underlined</Link>);

		const text = getByText("Always Underlined");
		const style = StyleSheet.flatten(text.props.style);
		expect(style.textDecorationLine).toBe("underline");
	});
});
