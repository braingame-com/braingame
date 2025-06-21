import { render } from "@testing-library/react-native";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PageWrapper } from "./PageWrapper";

/** Simple smoke tests for the PageWrapper component. */
describe("PageWrapper", () => {
	it("renders children", () => {
		const { getByText } = render(
			<PageWrapper>
				<Text>Hello</Text>
			</PageWrapper>,
		);
		expect(getByText("Hello")).toBeTruthy();
	});

	it("wraps content with providers", () => {
		const { UNSAFE_getByType } = render(
			<PageWrapper>
				<Text>Hello</Text>
			</PageWrapper>,
		);
		expect(UNSAFE_getByType(SafeAreaProvider)).toBeTruthy();
		expect(UNSAFE_getByType(StatusBar)).toBeTruthy();
	});
});
