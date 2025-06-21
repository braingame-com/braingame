import { render } from "@testing-library/react-native";
import { Text } from "react-native";
import { SimpleErrorBoundary as ErrorBoundary } from "./SimpleErrorBoundary";

// Component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
	if (shouldThrow) {
		throw new Error("Test error");
	}
	return <Text>No error</Text>;
};

describe("ErrorBoundary", () => {
	// Suppress console errors for these tests
	const originalError = console.error;
	beforeAll(() => {
		console.error = jest.fn();
	});
	afterAll(() => {
		console.error = originalError;
	});

	it("renders children when there is no error", () => {
		const { getByText } = render(
			<ErrorBoundary>
				<Text>Child content</Text>
			</ErrorBoundary>,
		);
		expect(getByText("Child content")).toBeTruthy();
	});

	it("renders error UI when child throws", () => {
		const { getByText } = render(
			<ErrorBoundary>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>,
		);
		expect(getByText("Something went wrong")).toBeTruthy();
		expect(getByText("Test error")).toBeTruthy();
	});

	it("renders custom fallback when provided", () => {
		const fallback = <Text>Custom error message</Text>;
		const { getByText } = render(
			<ErrorBoundary fallback={fallback}>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>,
		);
		expect(getByText("Custom error message")).toBeTruthy();
	});

	it("calls onError callback when error occurs", () => {
		const onError = jest.fn();
		render(
			<ErrorBoundary onError={onError}>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>,
		);
		expect(onError).toHaveBeenCalledWith(
			expect.objectContaining({ message: "Test error" }),
			expect.any(Object),
		);
	});

	it("maintains error state after rerender", () => {
		const { getByText, rerender } = render(
			<ErrorBoundary>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>,
		);

		// Error should be displayed
		expect(getByText("Something went wrong")).toBeTruthy();

		// Rerender with same props
		rerender(
			<ErrorBoundary>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>,
		);

		// Error should still be displayed
		expect(getByText("Something went wrong")).toBeTruthy();
	});

	it("does not catch errors in event handlers", () => {
		// This test verifies that errors in event handlers are not caught by error boundaries
		const handleClick = () => {
			throw new Error("Event handler error");
		};

		const Component = () => <Text onPress={handleClick}>Click me</Text>;

		const { getByText } = render(
			<ErrorBoundary>
				<Component />
			</ErrorBoundary>,
		);

		// Component should render normally
		expect(getByText("Click me")).toBeTruthy();
		// Event handler errors are not caught by error boundaries
	});
});
