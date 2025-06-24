import { Platform } from "react-native";
import { render, screen } from "../../test-utils";
import { Text } from "../Text/Text";
import { KeyboardAvoidingContainer } from "./KeyboardAvoidingContainer";

// Mock Platform.OS for testing
const mockPlatform = (os: "ios" | "android" | "web") => {
	Object.defineProperty(Platform, "OS", {
		writable: true,
		value: os,
	});
};

describe("KeyboardAvoidingContainer", () => {
	beforeEach(() => {
		// Reset to iOS by default
		mockPlatform("ios");
	});

	describe("Basic Rendering", () => {
		it("renders children correctly", () => {
			render(
				<KeyboardAvoidingContainer>
					<Text>Test Content</Text>
				</KeyboardAvoidingContainer>,
			);

			expect(screen.getByText("Test Content")).toBeTruthy();
		});

		it("renders with multiple children", () => {
			render(
				<KeyboardAvoidingContainer>
					<Text>First Child</Text>
					<Text>Second Child</Text>
				</KeyboardAvoidingContainer>,
			);

			expect(screen.getByText("First Child")).toBeTruthy();
			expect(screen.getByText("Second Child")).toBeTruthy();
		});

		it("applies default flex style", () => {
			render(
				<KeyboardAvoidingContainer testID="container">
					<Text>Content</Text>
				</KeyboardAvoidingContainer>,
			);

			const container = screen.getByTestId("container");
			expect(container.props.style).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						flex: 1,
					}),
				]),
			);
		});
	});

	describe("Platform-specific Behavior", () => {
		it("uses padding behavior on iOS by default", () => {
			mockPlatform("ios");

			render(
				<KeyboardAvoidingContainer testID="container">
					<Text>Content</Text>
				</KeyboardAvoidingContainer>,
			);

			const container = screen.getByTestId("container");
			expect(container.props.behavior).toBe("padding");
		});

		it("uses height behavior on Android by default", () => {
			mockPlatform("android");

			render(
				<KeyboardAvoidingContainer testID="container">
					<Text>Content</Text>
				</KeyboardAvoidingContainer>,
			);

			const container = screen.getByTestId("container");
			expect(container.props.behavior).toBe("height");
		});

		it("uses height behavior on web by default", () => {
			mockPlatform("web");

			render(
				<KeyboardAvoidingContainer testID="container">
					<Text>Content</Text>
				</KeyboardAvoidingContainer>,
			);

			const container = screen.getByTestId("container");
			expect(container.props.behavior).toBe("height");
		});
	});

	describe("Custom Behavior", () => {
		it("uses custom behavior when provided", () => {
			render(
				<KeyboardAvoidingContainer behavior="position" testID="container">
					<Text>Content</Text>
				</KeyboardAvoidingContainer>,
			);

			const container = screen.getByTestId("container");
			expect(container.props.behavior).toBe("position");
		});

		it("overrides platform default with custom behavior", () => {
			mockPlatform("ios");

			render(
				<KeyboardAvoidingContainer behavior="height" testID="container">
					<Text>Content</Text>
				</KeyboardAvoidingContainer>,
			);

			const container = screen.getByTestId("container");
			expect(container.props.behavior).toBe("height");
		});

		it("accepts all KeyboardAvoidingView behaviors", () => {
			const behaviors = ["padding", "height", "position"] as const;

			behaviors.forEach((behavior) => {
				render(
					<KeyboardAvoidingContainer behavior={behavior} testID={`container-${behavior}`}>
						<Text>Content</Text>
					</KeyboardAvoidingContainer>,
				);

				const container = screen.getByTestId(`container-${behavior}`);
				expect(container.props.behavior).toBe(behavior);
			});
		});
	});

	describe("Custom Styling", () => {
		it("applies custom style alongside default flex style", () => {
			const customStyle = { backgroundColor: "red", padding: 10 };

			render(
				<KeyboardAvoidingContainer style={customStyle} testID="container">
					<Text>Content</Text>
				</KeyboardAvoidingContainer>,
			);

			const container = screen.getByTestId("container");
			expect(container.props.style).toEqual([{ flex: 1 }, customStyle]);
		});

		it("allows overriding flex style", () => {
			const customStyle = { flex: 0.5, backgroundColor: "blue" };

			render(
				<KeyboardAvoidingContainer style={customStyle} testID="container">
					<Text>Content</Text>
				</KeyboardAvoidingContainer>,
			);

			const container = screen.getByTestId("container");
			expect(container.props.style).toEqual([{ flex: 1 }, customStyle]);
		});

		it("handles array of styles", () => {
			const style1 = { backgroundColor: "red" };
			const style2 = { padding: 10 };

			render(
				<KeyboardAvoidingContainer style={[style1, style2]} testID="container">
					<Text>Content</Text>
				</KeyboardAvoidingContainer>,
			);

			const container = screen.getByTestId("container");
			expect(container.props.style).toEqual([{ flex: 1 }, [style1, style2]]);
		});
	});

	describe("Props Forwarding", () => {
		it("forwards ViewProps to KeyboardAvoidingView", () => {
			render(
				<KeyboardAvoidingContainer
					testID="container"
					accessible={true}
					accessibilityLabel="Keyboard avoiding container"
					pointerEvents="auto"
				>
					<Text>Content</Text>
				</KeyboardAvoidingContainer>,
			);

			const container = screen.getByTestId("container");
			expect(container.props.accessible).toBe(true);
			expect(container.props.accessibilityLabel).toBe("Keyboard avoiding container");
			expect(container.props.pointerEvents).toBe("auto");
		});

		it("forwards additional KeyboardAvoidingView props", () => {
			render(
				<KeyboardAvoidingContainer testID="container" keyboardVerticalOffset={100} enabled={true}>
					<Text>Content</Text>
				</KeyboardAvoidingContainer>,
			);

			const container = screen.getByTestId("container");
			expect(container.props.keyboardVerticalOffset).toBe(100);
			expect(container.props.enabled).toBe(true);
		});
	});

	describe("Accessibility", () => {
		it("supports accessibility label", () => {
			render(
				<KeyboardAvoidingContainer accessibilityLabel="Form container">
					<Text>Form Content</Text>
				</KeyboardAvoidingContainer>,
			);

			expect(screen.getByLabelText("Form container")).toBeTruthy();
		});

		it("supports accessibility role", () => {
			render(
				<KeyboardAvoidingContainer accessibilityRole="main" testID="container">
					<Text>Main Content</Text>
				</KeyboardAvoidingContainer>,
			);

			const container = screen.getByTestId("container");
			expect(container.props.accessibilityRole).toBe("main");
		});

		it("does not interfere with children accessibility", () => {
			render(
				<KeyboardAvoidingContainer>
					<Text accessibilityLabel="Important text">Content</Text>
				</KeyboardAvoidingContainer>,
			);

			expect(screen.getByLabelText("Important text")).toBeTruthy();
		});
	});

	describe("Edge Cases", () => {
		it("handles null children gracefully", () => {
			render(<KeyboardAvoidingContainer testID="container">{null}</KeyboardAvoidingContainer>);

			const container = screen.getByTestId("container");
			expect(container).toBeTruthy();
		});

		it("handles undefined children gracefully", () => {
			render(<KeyboardAvoidingContainer testID="container">{undefined}</KeyboardAvoidingContainer>);

			const container = screen.getByTestId("container");
			expect(container).toBeTruthy();
		});

		it("handles false children gracefully", () => {
			render(
				<KeyboardAvoidingContainer testID="container">
					{false && <Text>Hidden</Text>}
				</KeyboardAvoidingContainer>,
			);

			const container = screen.getByTestId("container");
			expect(container).toBeTruthy();
			expect(() => screen.getByText("Hidden")).toThrow();
		});

		it("handles conditional children", () => {
			const showContent = true;

			render(
				<KeyboardAvoidingContainer>
					{showContent && <Text>Conditional Content</Text>}
				</KeyboardAvoidingContainer>,
			);

			expect(screen.getByText("Conditional Content")).toBeTruthy();
		});
	});

	describe("Real-world Usage Patterns", () => {
		it("works with form-like content", () => {
			render(
				<KeyboardAvoidingContainer>
					<Text>Form Title</Text>
					<Text>Input Label</Text>
					<Text>Submit Button</Text>
				</KeyboardAvoidingContainer>,
			);

			expect(screen.getByText("Form Title")).toBeTruthy();
			expect(screen.getByText("Input Label")).toBeTruthy();
			expect(screen.getByText("Submit Button")).toBeTruthy();
		});

		it("maintains performance with complex children", () => {
			const manyChildren = Array.from({ length: 50 }, (_, i) => <Text key={i}>Item {i}</Text>);

			render(
				<KeyboardAvoidingContainer testID="container">{manyChildren}</KeyboardAvoidingContainer>,
			);

			const container = screen.getByTestId("container");
			expect(container).toBeTruthy();
			expect(screen.getByText("Item 0")).toBeTruthy();
			expect(screen.getByText("Item 49")).toBeTruthy();
		});
	});
});
