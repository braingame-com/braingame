import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "../ErrorBoundary";

// Component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
	if (shouldThrow) {
		throw new Error("Test error");
	}
	return <div>No error</div>;
};

// Mock console.error to avoid noise in tests
const originalError = console.error;
beforeEach(() => {
	console.error = jest.fn();
});

afterEach(() => {
	console.error = originalError;
});

describe("ErrorBoundary", () => {
	it("should render children when there is no error", () => {
		render(
			<ErrorBoundary>
				<div>Test content</div>
			</ErrorBoundary>,
		);

		expect(screen.getByText("Test content")).toBeInTheDocument();
	});

	it("should render error UI when child component throws", () => {
		render(
			<ErrorBoundary>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>,
		);

		expect(screen.getByText("Oops! Something went wrong")).toBeInTheDocument();
		expect(
			screen.getByText("We're sorry for the inconvenience. Please try refreshing the page."),
		).toBeInTheDocument();
		expect(screen.getByText("Refresh Page")).toBeInTheDocument();
	});

	it("should allow refreshing the page", () => {
		// Mock window.location.reload
		const reloadMock = jest.fn();
		Object.defineProperty(window, "location", {
			value: { reload: reloadMock },
			writable: true,
		});

		render(
			<ErrorBoundary>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>,
		);

		const refreshButton = screen.getByText("Refresh Page");
		refreshButton.click();

		expect(reloadMock).toHaveBeenCalled();
	});

	it("should log errors to console in development", () => {
		const consoleErrorSpy = jest.spyOn(console, "error");

		render(
			<ErrorBoundary>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>,
		);

		expect(consoleErrorSpy).toHaveBeenCalled();
	});

	it("should render custom fallback if provided", () => {
		const CustomFallback = () => <div>Custom error message</div>;

		render(
			<ErrorBoundary fallback={<CustomFallback />}>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>,
		);

		expect(screen.getByText("Custom error message")).toBeInTheDocument();
	});

	it("should recover when error is cleared", () => {
		const { rerender } = render(
			<ErrorBoundary>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>,
		);

		expect(screen.getByText("Oops! Something went wrong")).toBeInTheDocument();

		// Re-render without error
		rerender(
			<ErrorBoundary>
				<ThrowError shouldThrow={false} />
			</ErrorBoundary>,
		);

		expect(screen.getByText("No error")).toBeInTheDocument();
		expect(screen.queryByText("Oops! Something went wrong")).not.toBeInTheDocument();
	});

	it("should capture error details", () => {
		const onError = jest.fn();

		render(
			<ErrorBoundary onError={onError}>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>,
		);

		expect(onError).toHaveBeenCalledWith(
			expect.any(Error),
			expect.objectContaining({
				componentStack: expect.any(String),
			}),
		);
	});

	it("should match snapshot for error state", () => {
		const { container } = render(
			<ErrorBoundary>
				<ThrowError shouldThrow={true} />
			</ErrorBoundary>,
		);

		expect(container).toMatchSnapshot();
	});

	it("should match snapshot for non-error state", () => {
		const { container } = render(
			<ErrorBoundary>
				<div>Normal content</div>
			</ErrorBoundary>,
		);

		expect(container).toMatchSnapshot();
	});
});