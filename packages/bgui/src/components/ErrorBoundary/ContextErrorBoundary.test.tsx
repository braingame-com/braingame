import { vi } from "vitest";
import { render, screen } from "../../test-utils";
import { ContextErrorBoundary } from "./ContextErrorBoundary";
import { Text } from "../Text/Text";

// Component that throws an error for testing
const ThrowError = ({ shouldThrow = false, message = "Test error" }: { shouldThrow?: boolean; message?: string }) => {
	if (shouldThrow) {
		throw new Error(message);
	}
	return <Text>No error</Text>;
};

// Mock console.error to avoid noise in test output
const originalConsoleError = console.error;
beforeAll(() => {
	console.error = vi.fn();
});

afterAll(() => {
	console.error = originalConsoleError;
});

// Mock __DEV__ for development mode testing
const originalDev = global.__DEV__;
const mockDevMode = (isDev: boolean) => {
	global.__DEV__ = isDev;
};

afterEach(() => {
	global.__DEV__ = originalDev;
	vi.clearAllMocks();
});

describe("ContextErrorBoundary", () => {
	describe("Normal Operation", () => {
		it("renders children when no error occurs", () => {
			render(
				<ContextErrorBoundary>
					<Text>Test content</Text>
				</ContextErrorBoundary>
			);

			expect(screen.getByText("Test content")).toBeTruthy();
		});

		it("renders multiple children when no error occurs", () => {
			render(
				<ContextErrorBoundary>
					<Text>First child</Text>
					<Text>Second child</Text>
				</ContextErrorBoundary>
			);

			expect(screen.getByText("First child")).toBeTruthy();
			expect(screen.getByText("Second child")).toBeTruthy();
		});

		it("passes through props to children", () => {
			render(
				<ContextErrorBoundary>
					<Text testID="child-text">Test content</Text>
				</ContextErrorBoundary>
			);

			expect(screen.getByTestId("child-text")).toBeTruthy();
		});
	});

	describe("Error Handling", () => {
		it("catches and displays error with default fallback", () => {
			render(
				<ContextErrorBoundary>
					<ThrowError shouldThrow={true} />
				</ContextErrorBoundary>
			);

			expect(screen.getByText("Context Provider Error")).toBeTruthy();
			expect(screen.getByText(/An error occurred in the context provider/)).toBeTruthy();
		});

		it("displays custom context name in error message", () => {
			render(
				<ContextErrorBoundary contextName="Theme">
					<ThrowError shouldThrow={true} />
				</ContextErrorBoundary>
			);

			expect(screen.getByText("Context Provider Error")).toBeTruthy();
			expect(screen.getByText(/An error occurred in the Theme provider/)).toBeTruthy();
		});

		it("calls onError callback when error occurs", () => {
			const onError = vi.fn();
			const errorMessage = "Custom test error";

			render(
				<ContextErrorBoundary onError={onError}>
					<ThrowError shouldThrow={true} message={errorMessage} />
				</ContextErrorBoundary>
			);

			expect(onError).toHaveBeenCalledTimes(1);
			expect(onError).toHaveBeenCalledWith(
				expect.objectContaining({
					message: errorMessage,
				}),
				expect.objectContaining({
					componentStack: expect.any(String),
				})
			);
		});

		it("logs error to console with context name", () => {
			const contextName = "UserProvider";
			const consoleErrorSpy = vi.spyOn(console, "error");

			render(
				<ContextErrorBoundary contextName={contextName}>
					<ThrowError shouldThrow={true} />
				</ContextErrorBoundary>
			);

			expect(consoleErrorSpy).toHaveBeenCalledWith(
				`Error in ${contextName} provider:`,
				expect.any(Error),
				expect.objectContaining({
					componentStack: expect.any(String),
				})
			);
		});

		it("logs error to console with default context name", () => {
			const consoleErrorSpy = vi.spyOn(console, "error");

			render(
				<ContextErrorBoundary>
					<ThrowError shouldThrow={true} />
				</ContextErrorBoundary>
			);

			expect(consoleErrorSpy).toHaveBeenCalledWith(
				"Error in Context provider:",
				expect.any(Error),
				expect.any(Object)
			);
		});
	});

	describe("Custom Fallback", () => {
		it("renders custom fallback when provided", () => {
			const customFallback = <Text>Custom error message</Text>;

			render(
				<ContextErrorBoundary fallback={customFallback}>
					<ThrowError shouldThrow={true} />
				</ContextErrorBoundary>
			);

			expect(screen.getByText("Custom error message")).toBeTruthy();
			expect(() => screen.getByText("Context Provider Error")).toThrow();
		});

		it("renders complex custom fallback", () => {
			const customFallback = (
				<>
					<Text>Something went wrong!</Text>
					<Text>Please try again later.</Text>
				</>
			);

			render(
				<ContextErrorBoundary fallback={customFallback}>
					<ThrowError shouldThrow={true} />
				</ContextErrorBoundary>
			);

			expect(screen.getByText("Something went wrong!")).toBeTruthy();
			expect(screen.getByText("Please try again later.")).toBeTruthy();
		});

		it("still calls onError with custom fallback", () => {
			const onError = vi.fn();
			const customFallback = <Text>Custom fallback</Text>;

			render(
				<ContextErrorBoundary fallback={customFallback} onError={onError}>
					<ThrowError shouldThrow={true} />
				</ContextErrorBoundary>
			);

			expect(screen.getByText("Custom fallback")).toBeTruthy();
			expect(onError).toHaveBeenCalledTimes(1);
		});
	});

	describe("Development Mode", () => {
		it("shows error details in development mode", () => {
			mockDevMode(true);
			const errorMessage = "Detailed test error";

			render(
				<ContextErrorBoundary>
					<ThrowError shouldThrow={true} message={errorMessage} />
				</ContextErrorBoundary>
			);

			expect(screen.getByText(`Error: ${errorMessage}`)).toBeTruthy();
		});

		it("hides error details in production mode", () => {
			mockDevMode(false);
			const errorMessage = "Production test error";

			render(
				<ContextErrorBoundary>
					<ThrowError shouldThrow={true} message={errorMessage} />
				</ContextErrorBoundary>
			);

			expect(() => screen.getByText(`Error: ${errorMessage}`)).toThrow();
			expect(screen.getByText("Context Provider Error")).toBeTruthy();
		});
	});

	describe("Error Recovery", () => {
		it("can recover from error state when children change", () => {
			const { rerender } = render(
				<ContextErrorBoundary>
					<ThrowError shouldThrow={true} />
				</ContextErrorBoundary>
			);

			// Should show error state
			expect(screen.getByText("Context Provider Error")).toBeTruthy();

			// Rerender with non-throwing children
			rerender(
				<ContextErrorBoundary>
					<Text>Recovered content</Text>
				</ContextErrorBoundary>
			);

			// Should still show error state (error boundaries don't auto-recover)
			expect(screen.getByText("Context Provider Error")).toBeTruthy();
		});

		it("maintains error state across rerenders", () => {
			const { rerender } = render(
				<ContextErrorBoundary contextName="TestContext">
					<ThrowError shouldThrow={true} />
				</ContextErrorBoundary>
			);

			expect(screen.getByText("Context Provider Error")).toBeTruthy();

			// Rerender with different props
			rerender(
				<ContextErrorBoundary contextName="UpdatedContext">
					<ThrowError shouldThrow={true} />
				</ContextErrorBoundary>
			);

			// Should still show error (error boundaries need key change to reset)
			expect(screen.getByText("Context Provider Error")).toBeTruthy();
		});

		it("resets error state with key prop change", () => {
			const { rerender } = render(
				<ContextErrorBoundary key="first">
					<ThrowError shouldThrow={true} />
				</ContextErrorBoundary>
			);

			expect(screen.getByText("Context Provider Error")).toBeTruthy();

			// Rerender with different key (simulates remounting)
			rerender(
				<ContextErrorBoundary key="second">
					<Text>Reset content</Text>
				</ContextErrorBoundary>
			);

			expect(screen.getByText("Reset content")).toBeTruthy();
			expect(() => screen.getByText("Context Provider Error")).toThrow();
		});
	});

	describe("Error Message Variations", () => {
		it("handles different error types", () => {
			const TypeError = () => {
				throw new TypeError("Type error message");
			};

			render(
				<ContextErrorBoundary>
					<TypeError />
				</ContextErrorBoundary>
			);

			expect(screen.getByText("Context Provider Error")).toBeTruthy();
		});

		it("handles errors without messages", () => {
			const EmptyError = () => {
				throw new Error();
			};

			mockDevMode(true);

			render(
				<ContextErrorBoundary>
					<EmptyError />
				</ContextErrorBoundary>
			);

			expect(screen.getByText("Context Provider Error")).toBeTruthy();
		});

		it("handles non-Error objects being thrown", () => {
			const ThrowString = () => {
				throw "String error";
			};

			render(
				<ContextErrorBoundary>
					<ThrowString />
				</ContextErrorBoundary>
			);

			expect(screen.getByText("Context Provider Error")).toBeTruthy();
		});
	});

	describe("Styling", () => {
		it("applies consistent error styling", () => {
			render(
				<ContextErrorBoundary>
					<ThrowError shouldThrow={true} />
				</ContextErrorBoundary>
			);

			const errorContainer = screen.getByText("Context Provider Error").parent;
			expect(errorContainer?.props.style).toEqual(
				expect.objectContaining({
					padding: 16,
					backgroundColor: "#fee",
					borderWidth: 1,
					borderColor: "#fcc",
					borderRadius: 4,
					margin: 8,
				})
			);
		});

		it("applies consistent text styling", () => {
			render(
				<ContextErrorBoundary>
					<ThrowError shouldThrow={true} />
				</ContextErrorBoundary>
			);

			const errorTitle = screen.getByText("Context Provider Error");
			expect(errorTitle.props.style).toEqual(
				expect.objectContaining({
					fontSize: 18,
					fontWeight: "bold",
					color: "#c33",
					marginBottom: 8,
				})
			);
		});
	});

	describe("Edge Cases", () => {
		it("handles null children", () => {
			render(
				<ContextErrorBoundary>
					{null}
				</ContextErrorBoundary>
			);

			// Should render without error (nothing visible)
			expect(screen.queryByText("Context Provider Error")).toBeNull();
		});

		it("handles undefined children", () => {
			render(
				<ContextErrorBoundary>
					{undefined}
				</ContextErrorBoundary>
			);

			// Should render without error (nothing visible)
			expect(screen.queryByText("Context Provider Error")).toBeNull();
		});

		it("handles conditional children", () => {
			const showContent = false;

			render(
				<ContextErrorBoundary>
					{showContent && <Text>Conditional content</Text>}
				</ContextErrorBoundary>
			);

			expect(screen.queryByText("Context Provider Error")).toBeNull();
		});

		it("handles empty context name", () => {
			render(
				<ContextErrorBoundary contextName="">
					<ThrowError shouldThrow={true} />
				</ContextErrorBoundary>
			);

			expect(screen.getByText(/An error occurred in the context provider/)).toBeTruthy();
		});

		it("handles very long context names", () => {
			const longName = "VeryLongContextNameThatExceedsNormalLengthAndKeepsGoingAndGoingAndGoing";

			render(
				<ContextErrorBoundary contextName={longName}>
					<ThrowError shouldThrow={true} />
				</ContextErrorBoundary>
			);

			expect(screen.getByText(new RegExp(`An error occurred in the ${longName} provider`))).toBeTruthy();
		});
	});
});