import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from "../page";
import { submitEmail } from "../../lib/emailService";

// Mock the email service
jest.mock("../../lib/emailService", () => ({
	submitEmail: jest.fn(),
}));

describe("HomePage", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should render the homepage with all elements", () => {
		render(<HomePage />);

		// Check main title
		expect(screen.getByText("Brain Game")).toBeInTheDocument();

		// Check subtitle
		expect(
			screen.getByText("A new era of personal development technology is coming soon."),
		).toBeInTheDocument();

		// Check form elements
		expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
		expect(screen.getByText("Join")).toBeInTheDocument();

		// Check GitHub link
		expect(screen.getByText("View on GitHub")).toBeInTheDocument();
	});

	it("should handle successful email submission", async () => {
		const mockSubmitEmail = submitEmail as jest.MockedFunction<typeof submitEmail>;
		mockSubmitEmail.mockResolvedValue({
			success: true,
			message: "Thanks for subscribing! Check your email to confirm.",
		});

		const user = userEvent.setup();
		render(<HomePage />);

		const emailInput = screen.getByPlaceholderText("Enter your email");
		const submitButton = screen.getByText("Join");

		// Type email
		await user.type(emailInput, "test@example.com");

		// Submit form
		await user.click(submitButton);

		// Check loading state
		expect(screen.getByText("...")).toBeInTheDocument();

		// Wait for success message
		await waitFor(() => {
			expect(
				screen.getByText("Thanks for subscribing! Check your email to confirm."),
			).toBeInTheDocument();
		});

		// Check that email was cleared
		expect(emailInput).toHaveValue("");
	});

	it("should handle failed email submission", async () => {
		const mockSubmitEmail = submitEmail as jest.MockedFunction<typeof submitEmail>;
		mockSubmitEmail.mockResolvedValue({
			success: false,
			message: "This email is already subscribed.",
		});

		const user = userEvent.setup();
		render(<HomePage />);

		const emailInput = screen.getByPlaceholderText("Enter your email");
		const submitButton = screen.getByText("Join");

		await user.type(emailInput, "existing@example.com");
		await user.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText("This email is already subscribed.")).toBeInTheDocument();
		});

		// Email should not be cleared on failure
		expect(emailInput).toHaveValue("existing@example.com");
	});

	it("should handle network errors", async () => {
		const mockSubmitEmail = submitEmail as jest.MockedFunction<typeof submitEmail>;
		mockSubmitEmail.mockRejectedValue(new Error("Network error"));

		const user = userEvent.setup();
		render(<HomePage />);

		const emailInput = screen.getByPlaceholderText("Enter your email");
		const submitButton = screen.getByText("Join");

		await user.type(emailInput, "test@example.com");
		await user.click(submitButton);

		await waitFor(() => {
			expect(
				screen.getByText("Something went wrong. Please try again."),
			).toBeInTheDocument();
		});
	});

	it("should validate empty email", async () => {
		const user = userEvent.setup();
		render(<HomePage />);

		const submitButton = screen.getByText("Join");
		await user.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText("Please enter your email address")).toBeInTheDocument();
		});

		expect(submitEmail).not.toHaveBeenCalled();
	});

	it("should disable form during submission", async () => {
		const mockSubmitEmail = submitEmail as jest.MockedFunction<typeof submitEmail>;
		mockSubmitEmail.mockImplementation(
			() => new Promise((resolve) => setTimeout(resolve, 1000)),
		);

		const user = userEvent.setup();
		render(<HomePage />);

		const emailInput = screen.getByPlaceholderText("Enter your email");
		const submitButton = screen.getByText("Join");

		await user.type(emailInput, "test@example.com");
		await user.click(submitButton);

		// Check that input and button are disabled
		expect(emailInput).toBeDisabled();
		expect(submitButton).toBeDisabled();
	});

	it("should apply correct styling to success and error messages", async () => {
		const mockSubmitEmail = submitEmail as jest.MockedFunction<typeof submitEmail>;

		const user = userEvent.setup();
		render(<HomePage />);

		const emailInput = screen.getByPlaceholderText("Enter your email");
		const submitButton = screen.getByText("Join");

		// Test success styling
		mockSubmitEmail.mockResolvedValue({
			success: true,
			message: "Success!",
		});

		await user.type(emailInput, "success@example.com");
		await user.click(submitButton);

		await waitFor(() => {
			const message = screen.getByText("Success!");
			expect(message).toHaveStyle({ color: "#22c55e" });
		});

		// Clear and test error styling
		await user.clear(emailInput);
		mockSubmitEmail.mockResolvedValue({
			success: false,
			message: "Error!",
		});

		await user.type(emailInput, "error@example.com");
		await user.click(submitButton);

		await waitFor(() => {
			const message = screen.getByText("Error!");
			expect(message).toHaveStyle({ color: "#ef4444" });
		});
	});
});