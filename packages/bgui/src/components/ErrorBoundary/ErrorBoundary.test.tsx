import { render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";
import { ErrorBoundary } from "./ErrorBoundary";

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

	it("resets error state when resetKeys change", () => {
		const { getByText, rerender } = render(
			<ErrorBoundary resetKeys={["key1"]}>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>,
		);
		
		// Error should be displayed
		expect(getByText("Something went wrong")).toBeTruthy();
		
		// Change reset keys
		rerender(
			<ErrorBoundary resetKeys={["key2"]}>
				<ThrowError shouldThrow={false} />
			</ErrorBoundary>,
		);
		
		// Error should be cleared
		expect(getByText("No error")).toBeTruthy();
	});

	it("calls onReset when reset keys change", () => {
		const onReset = jest.fn();
		const { rerender } = render(
			<ErrorBoundary resetKeys={["key1"]} onReset={onReset}>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>,
		);
		
		// Change reset keys
		rerender(
			<ErrorBoundary resetKeys={["key2"]} onReset={onReset}>
				<ThrowError shouldThrow={false} />
			</ErrorBoundary>,
		);
		
		expect(onReset).toHaveBeenCalled();
	});

	it("isolates errors to boundary scope", () => {
		const { getByText } = render(
			<>
				<ErrorBoundary>
					<ThrowError shouldThrow={true} />
				</ErrorBoundary>
				<Text>Outside boundary</Text>
			</>,
		);
		
		// Error UI should be shown inside boundary
		expect(getByText("Something went wrong")).toBeTruthy();
		// Content outside boundary should still render
		expect(getByText("Outside boundary")).toBeTruthy();
	});

	it("handles errors in error boundary fallback", () => {
		const BadFallback = () => {
			throw new Error("Fallback error");
		};
		
		// This should not crash the app
		const { getByText } = render(
			<ErrorBoundary fallback={<BadFallback />}>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>,
		);
		
		// Should show default error UI
		expect(getByText("Something went wrong")).toBeTruthy();
	});
});