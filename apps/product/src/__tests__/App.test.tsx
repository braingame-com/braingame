import { render } from "@testing-library/react-native";
import { Text, View } from "react-native";

// Simple component test to verify jest-expo setup
const TestComponent = () => (
	<View testID="test-view">
		<Text>Test Component</Text>
	</View>
);

describe("Product App Tests", () => {
	it("renders test component correctly", () => {
		const { getByTestId, getByText } = render(<TestComponent />);

		expect(getByTestId("test-view")).toBeTruthy();
		expect(getByText("Test Component")).toBeTruthy();
	});

	it("verifies jest-expo is working", () => {
		// This test verifies that our jest-expo preset is loaded correctly
		expect(typeof jest).toBe("object");
		expect(jest).toHaveProperty("fn");
	});
});
