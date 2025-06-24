import { vi } from "vitest";
import { fireEvent, render, screen } from "../../test-utils";
import { TextInput } from "./TextInput";

describe("TextInput", () => {
	describe("Basic Rendering", () => {
		it("renders correctly with value", () => {
			render(<TextInput value="test value" onValueChange={vi.fn()} />);

			expect(screen.getByDisplayValue("test value")).toBeTruthy();
		});

		it("renders with empty value", () => {
			render(<TextInput value="" onValueChange={vi.fn()} />);

			const input = screen.getByRole("textbox");
			expect(input.props.value).toBe("");
		});

		it("renders with placeholder", () => {
			render(<TextInput value="" onValueChange={vi.fn()} placeholder="Enter text here" />);

			expect(screen.getByPlaceholderText("Enter text here")).toBeTruthy();
		});

		it("renders with testID", () => {
			render(<TextInput value="test" onValueChange={vi.fn()} testID="text-input" />);

			expect(screen.getByTestId("text-input")).toBeTruthy();
		});
	});

	describe("Value Management", () => {
		it("calls onValueChange when text changes", () => {
			const onValueChange = vi.fn();
			render(<TextInput value="initial" onValueChange={onValueChange} />);

			const input = screen.getByDisplayValue("initial");
			fireEvent.changeText(input, "updated text");

			expect(onValueChange).toHaveBeenCalledTimes(1);
			expect(onValueChange).toHaveBeenCalledWith("updated text");
		});

		it("calls onValueChange with empty string", () => {
			const onValueChange = vi.fn();
			render(<TextInput value="some text" onValueChange={onValueChange} />);

			const input = screen.getByDisplayValue("some text");
			fireEvent.changeText(input, "");

			expect(onValueChange).toHaveBeenCalledWith("");
		});

		it("handles multiple text changes", () => {
			const onValueChange = vi.fn();
			render(<TextInput value="" onValueChange={onValueChange} />);

			const input = screen.getByRole("textbox");

			fireEvent.changeText(input, "a");
			fireEvent.changeText(input, "ab");
			fireEvent.changeText(input, "abc");

			expect(onValueChange).toHaveBeenCalledTimes(3);
			expect(onValueChange).toHaveBeenNthCalledWith(1, "a");
			expect(onValueChange).toHaveBeenNthCalledWith(2, "ab");
			expect(onValueChange).toHaveBeenNthCalledWith(3, "abc");
		});

		it("updates displayed value when value prop changes", () => {
			const { rerender } = render(<TextInput value="initial" onValueChange={vi.fn()} />);

			expect(screen.getByDisplayValue("initial")).toBeTruthy();

			rerender(<TextInput value="updated" onValueChange={vi.fn()} />);

			expect(screen.getByDisplayValue("updated")).toBeTruthy();
			expect(() => screen.getByDisplayValue("initial")).toThrow();
		});
	});

	describe("Variants", () => {
		it("renders standard variant by default", () => {
			render(<TextInput value="test" onValueChange={vi.fn()} testID="container" />);

			const container = screen.getByTestId("container").parent;
			expect(container).toBeTruthy();
		});

		it("renders flat variant correctly", () => {
			render(<TextInput value="test" onValueChange={vi.fn()} variant="flat" testID="container" />);

			const container = screen.getByTestId("container").parent;
			expect(container).toBeTruthy();
		});

		it("renders error variant correctly", () => {
			render(<TextInput value="test" onValueChange={vi.fn()} variant="error" testID="container" />);

			const container = screen.getByTestId("container").parent;
			expect(container).toBeTruthy();
		});

		it("applies correct styles for each variant", () => {
			const variants = ["standard", "flat", "error"] as const;

			variants.forEach((variant) => {
				render(
					<TextInput
						value="test"
						onValueChange={vi.fn()}
						variant={variant}
						testID={`input-${variant}`}
					/>,
				);

				const input = screen.getByTestId(`input-${variant}`);
				expect(input).toBeTruthy();
			});
		});
	});

	describe("Icons", () => {
		it("renders left icon when provided", () => {
			render(<TextInput value="test" onValueChange={vi.fn()} leftIcon="user" />);

			const icons = screen.getAllByRole("image");
			expect(icons).toHaveLength(1);
		});

		it("renders right icon when provided", () => {
			render(<TextInput value="test" onValueChange={vi.fn()} rightIcon="search" />);

			const icons = screen.getAllByRole("image");
			expect(icons).toHaveLength(1);
		});

		it("renders both left and right icons", () => {
			render(<TextInput value="test" onValueChange={vi.fn()} leftIcon="user" rightIcon="x" />);

			const icons = screen.getAllByRole("image");
			expect(icons).toHaveLength(2);
		});

		it("renders without icons when none provided", () => {
			render(<TextInput value="test" onValueChange={vi.fn()} />);

			expect(() => screen.getAllByRole("image")).toThrow();
		});

		it("handles icon changes", () => {
			const { rerender } = render(
				<TextInput value="test" onValueChange={vi.fn()} leftIcon="user" />,
			);

			expect(screen.getAllByRole("image")).toHaveLength(1);

			rerender(<TextInput value="test" onValueChange={vi.fn()} leftIcon="search" />);

			expect(screen.getAllByRole("image")).toHaveLength(1);

			rerender(<TextInput value="test" onValueChange={vi.fn()} />);

			expect(() => screen.getAllByRole("image")).toThrow();
		});
	});

	describe("Input Types and Keyboard", () => {
		it("supports email keyboard type", () => {
			render(
				<TextInput
					value="test@example.com"
					onValueChange={vi.fn()}
					keyboardType="email-address"
					testID="email-input"
				/>,
			);

			const input = screen.getByTestId("email-input");
			expect(input.props.keyboardType).toBe("email-address");
		});

		it("supports numeric keyboard type", () => {
			render(
				<TextInput
					value="123"
					onValueChange={vi.fn()}
					keyboardType="numeric"
					testID="numeric-input"
				/>,
			);

			const input = screen.getByTestId("numeric-input");
			expect(input.props.keyboardType).toBe("numeric");
		});

		it("supports phone pad keyboard type", () => {
			render(
				<TextInput
					value="+1234567890"
					onValueChange={vi.fn()}
					keyboardType="phone-pad"
					testID="phone-input"
				/>,
			);

			const input = screen.getByTestId("phone-input");
			expect(input.props.keyboardType).toBe("phone-pad");
		});

		it("supports secure text entry", () => {
			render(
				<TextInput
					value="password123"
					onValueChange={vi.fn()}
					secureTextEntry={true}
					testID="password-input"
				/>,
			);

			const input = screen.getByTestId("password-input");
			expect(input.props.secureTextEntry).toBe(true);
		});
	});

	describe("Focus and Blur", () => {
		it("handles focus events", () => {
			const onFocus = vi.fn();
			render(
				<TextInput value="test" onValueChange={vi.fn()} onFocus={onFocus} testID="focus-input" />,
			);

			const input = screen.getByTestId("focus-input");
			fireEvent(input, "focus");

			expect(onFocus).toHaveBeenCalledTimes(1);
		});

		it("handles blur events", () => {
			const onBlur = vi.fn();
			render(
				<TextInput value="test" onValueChange={vi.fn()} onBlur={onBlur} testID="blur-input" />,
			);

			const input = screen.getByTestId("blur-input");
			fireEvent(input, "blur");

			expect(onBlur).toHaveBeenCalledTimes(1);
		});

		it("handles focus and blur sequence", () => {
			const onFocus = vi.fn();
			const onBlur = vi.fn();
			render(
				<TextInput
					value="test"
					onValueChange={vi.fn()}
					onFocus={onFocus}
					onBlur={onBlur}
					testID="focus-blur-input"
				/>,
			);

			const input = screen.getByTestId("focus-blur-input");

			fireEvent(input, "focus");
			expect(onFocus).toHaveBeenCalledTimes(1);
			expect(onBlur).toHaveBeenCalledTimes(0);

			fireEvent(input, "blur");
			expect(onFocus).toHaveBeenCalledTimes(1);
			expect(onBlur).toHaveBeenCalledTimes(1);
		});
	});

	describe("Accessibility", () => {
		it("is accessible by role", () => {
			render(<TextInput value="test" onValueChange={vi.fn()} />);

			expect(screen.getByRole("textbox")).toBeTruthy();
		});

		it("supports accessibility label", () => {
			render(
				<TextInput value="test" onValueChange={vi.fn()} accessibilityLabel="Username input" />,
			);

			expect(screen.getByLabelText("Username input")).toBeTruthy();
		});

		it("supports accessibility hint", () => {
			render(
				<TextInput
					value="test"
					onValueChange={vi.fn()}
					accessibilityHint="Enter your username"
					testID="hint-input"
				/>,
			);

			const input = screen.getByTestId("hint-input");
			expect(input.props.accessibilityHint).toBe("Enter your username");
		});

		it("supports accessibility role", () => {
			render(
				<TextInput
					value="test"
					onValueChange={vi.fn()}
					accessibilityRole="search"
					testID="search-input"
				/>,
			);

			const input = screen.getByTestId("search-input");
			expect(input.props.accessibilityRole).toBe("search");
		});

		it("supports accessibility state", () => {
			render(
				<TextInput
					value="test"
					onValueChange={vi.fn()}
					accessibilityState={{ disabled: true }}
					testID="disabled-input"
				/>,
			);

			const input = screen.getByTestId("disabled-input");
			expect(input.props.accessibilityState).toEqual({ disabled: true });
		});
	});

	describe("Custom Styling", () => {
		it("applies custom container style", () => {
			const customStyle = { backgroundColor: "red", margin: 10 };
			render(
				<TextInput
					value="test"
					onValueChange={vi.fn()}
					style={customStyle}
					testID="styled-input"
				/>,
			);

			const container = screen.getByTestId("styled-input").parent;
			expect(container?.props.style).toEqual(
				expect.arrayContaining([expect.objectContaining(customStyle)]),
			);
		});

		it("combines custom style with variant styles", () => {
			const customStyle = { padding: 20 };
			render(
				<TextInput
					value="test"
					onValueChange={vi.fn()}
					variant="error"
					style={customStyle}
					testID="combined-style-input"
				/>,
			);

			const container = screen.getByTestId("combined-style-input").parent;
			expect(container?.props.style).toEqual(
				expect.arrayContaining([expect.objectContaining(customStyle)]),
			);
		});
	});

	describe("Text Input Properties", () => {
		it("supports multiline input", () => {
			render(
				<TextInput
					value="Line 1\nLine 2"
					onValueChange={vi.fn()}
					multiline={true}
					testID="multiline-input"
				/>,
			);

			const input = screen.getByTestId("multiline-input");
			expect(input.props.multiline).toBe(true);
		});

		it("supports numberOfLines", () => {
			render(
				<TextInput value="test" onValueChange={vi.fn()} numberOfLines={3} testID="lines-input" />,
			);

			const input = screen.getByTestId("lines-input");
			expect(input.props.numberOfLines).toBe(3);
		});

		it("supports maxLength", () => {
			render(
				<TextInput value="test" onValueChange={vi.fn()} maxLength={10} testID="maxlength-input" />,
			);

			const input = screen.getByTestId("maxlength-input");
			expect(input.props.maxLength).toBe(10);
		});

		it("supports editable property", () => {
			render(
				<TextInput value="test" onValueChange={vi.fn()} editable={false} testID="readonly-input" />,
			);

			const input = screen.getByTestId("readonly-input");
			expect(input.props.editable).toBe(false);
		});

		it("supports autoFocus", () => {
			render(
				<TextInput
					value="test"
					onValueChange={vi.fn()}
					autoFocus={true}
					testID="autofocus-input"
				/>,
			);

			const input = screen.getByTestId("autofocus-input");
			expect(input.props.autoFocus).toBe(true);
		});
	});

	describe("Return Key and Submission", () => {
		it("supports onSubmitEditing", () => {
			const onSubmit = vi.fn();
			render(
				<TextInput
					value="test"
					onValueChange={vi.fn()}
					onSubmitEditing={onSubmit}
					testID="submit-input"
				/>,
			);

			const input = screen.getByTestId("submit-input");
			fireEvent(input, "submitEditing");

			expect(onSubmit).toHaveBeenCalledTimes(1);
		});

		it("supports returnKeyType", () => {
			render(
				<TextInput
					value="test"
					onValueChange={vi.fn()}
					returnKeyType="done"
					testID="return-key-input"
				/>,
			);

			const input = screen.getByTestId("return-key-input");
			expect(input.props.returnKeyType).toBe("done");
		});

		it("supports blurOnSubmit", () => {
			render(
				<TextInput
					value="test"
					onValueChange={vi.fn()}
					blurOnSubmit={false}
					testID="blur-submit-input"
				/>,
			);

			const input = screen.getByTestId("blur-submit-input");
			expect(input.props.blurOnSubmit).toBe(false);
		});
	});

	describe("Edge Cases", () => {
		it("handles null value gracefully", () => {
			// @ts-expect-error Testing edge case
			render(<TextInput value={null} onValueChange={vi.fn()} />);

			const input = screen.getByRole("textbox");
			expect(input).toBeTruthy();
		});

		it("handles undefined value gracefully", () => {
			// @ts-expect-error Testing edge case
			render(<TextInput value={undefined} onValueChange={vi.fn()} />);

			const input = screen.getByRole("textbox");
			expect(input).toBeTruthy();
		});

		it("handles very long text values", () => {
			const longText = "a".repeat(1000);
			render(<TextInput value={longText} onValueChange={vi.fn()} />);

			expect(screen.getByDisplayValue(longText)).toBeTruthy();
		});

		it("handles special characters in text", () => {
			const specialText = "!@#$%^&*()_+-=[]{}|;:,.<>?";
			render(<TextInput value={specialText} onValueChange={vi.fn()} />);

			expect(screen.getByDisplayValue(specialText)).toBeTruthy();
		});

		it("handles emoji in text", () => {
			const emojiText = "Hello 👋 World 🌍";
			render(<TextInput value={emojiText} onValueChange={vi.fn()} />);

			expect(screen.getByDisplayValue(emojiText)).toBeTruthy();
		});

		it("handles undefined onValueChange gracefully", () => {
			// @ts-expect-error Testing edge case
			render(<TextInput value="test" />);

			const input = screen.getByRole("textbox");
			expect(() => fireEvent.changeText(input, "new text")).not.toThrow();
		});
	});

	describe("Real-world Usage Patterns", () => {
		it("works as search input with icon", () => {
			const onSearch = vi.fn();
			render(
				<TextInput
					value=""
					onValueChange={onSearch}
					placeholder="Search..."
					leftIcon="search"
					variant="flat"
				/>,
			);

			const input = screen.getByPlaceholderText("Search...");
			fireEvent.changeText(input, "search term");

			expect(onSearch).toHaveBeenCalledWith("search term");
			expect(screen.getAllByRole("image")).toHaveLength(1);
		});

		it("works as password input", () => {
			const onChange = vi.fn();
			render(
				<TextInput
					value=""
					onValueChange={onChange}
					placeholder="Password"
					secureTextEntry={true}
					rightIcon="eye"
				/>,
			);

			const input = screen.getByPlaceholderText("Password");
			fireEvent.changeText(input, "secretpassword");

			expect(onChange).toHaveBeenCalledWith("secretpassword");
			expect(input.props.secureTextEntry).toBe(true);
		});

		it("works as form field with validation", () => {
			const onChange = vi.fn();
			render(
				<TextInput
					value="invalid-email"
					onValueChange={onChange}
					placeholder="Email"
					variant="error"
					keyboardType="email-address"
					accessibilityLabel="Email address"
					accessibilityHint="Enter a valid email address"
				/>,
			);

			const input = screen.getByLabelText("Email address");
			expect(input.props.keyboardType).toBe("email-address");
			expect(input.props.accessibilityHint).toBe("Enter a valid email address");
		});
	});
});
