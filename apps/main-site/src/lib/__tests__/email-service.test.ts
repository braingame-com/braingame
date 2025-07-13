import { afterEach, beforeEach, describe, expect, it, jest } from "@jest/globals";
import { addDoc, getDocs, query, updateDoc } from "firebase/firestore";
import { EmailService } from "../email-service";
import { db } from "../firebase";

// Mock Firebase
jest.mock("../firebase", () => ({
	db: {},
}));

jest.mock("firebase/firestore", () => ({
	collection: jest.fn(() => "mock-collection"),
	addDoc: jest.fn(),
	getDocs: jest.fn(),
	query: jest.fn(),
	where: jest.fn(),
	updateDoc: jest.fn(),
	doc: jest.fn(),
	serverTimestamp: jest.fn(() => new Date()),
}));

// Mock rate limiter
jest.mock("../rate-limiter", () => ({
	checkRateLimit: jest.fn(() => ({ allowed: true, retryAfter: null })),
}));

// Mock email validation
jest.mock("../email-validation", () => ({
	validateEmail: jest.fn((email) => email.includes("@")),
	calculateRiskScore: jest.fn(() => 0),
	detectTypo: jest.fn(() => null),
}));

describe("EmailService", () => {
	let emailService: EmailService;

	beforeEach(() => {
		emailService = new EmailService();
		jest.clearAllMocks();
	});

	describe("subscribe", () => {
		it("should successfully subscribe a new email", async () => {
			const mockQuerySnapshot = {
				empty: true,
			};
			(getDocs as jest.Mock).mockResolvedValue(mockQuerySnapshot);
			(addDoc as jest.Mock).mockResolvedValue({ id: "test-id" });

			const result = await emailService.subscribe("test@example.com");

			expect(result).toEqual({
				success: true,
				requiresConfirmation: true,
				message: "Please check your email to confirm your subscription.",
			});
			expect(addDoc).toHaveBeenCalled();
		});

		it("should handle already subscribed emails", async () => {
			const mockQuerySnapshot = {
				empty: false,
				docs: [
					{
						data: () => ({
							status: "confirmed",
						}),
					},
				],
			};
			(getDocs as jest.Mock).mockResolvedValue(mockQuerySnapshot);

			const result = await emailService.subscribe("existing@example.com");

			expect(result).toEqual({
				success: false,
				requiresConfirmation: false,
				message: "This email is already subscribed.",
			});
			expect(addDoc).not.toHaveBeenCalled();
		});

		it("should handle pending confirmations", async () => {
			const mockQuerySnapshot = {
				empty: false,
				docs: [
					{
						data: () => ({
							status: "pending",
						}),
					},
				],
			};
			(getDocs as jest.Mock).mockResolvedValue(mockQuerySnapshot);

			const result = await emailService.subscribe("pending@example.com");

			expect(result).toEqual({
				success: false,
				requiresConfirmation: true,
				message: "Please check your email to confirm your subscription.",
			});
		});

		it("should validate email before subscribing", async () => {
			const result = await emailService.subscribe("invalid-email");

			expect(result).toEqual({
				success: false,
				requiresConfirmation: false,
				message: "Please enter a valid email address.",
			});
			expect(addDoc).not.toHaveBeenCalled();
		});
	});

	describe("confirmEmail", () => {
		it("should confirm a valid token", async () => {
			const mockQuerySnapshot = {
				empty: false,
				docs: [
					{
						id: "doc-id",
						ref: "doc-ref",
						data: () => ({
							status: "pending",
							confirmationTokenExpiry: new Date(Date.now() + 3600000), // 1 hour from now
						}),
					},
				],
			};
			(getDocs as jest.Mock).mockResolvedValue(mockQuerySnapshot);
			(updateDoc as jest.Mock).mockResolvedValue(undefined);

			const result = await emailService.confirmEmail("valid-token");

			expect(result).toEqual({
				success: true,
				message: "Your email has been confirmed successfully!",
			});
			expect(updateDoc).toHaveBeenCalled();
		});

		it("should reject expired tokens", async () => {
			const mockQuerySnapshot = {
				empty: false,
				docs: [
					{
						data: () => ({
							status: "pending",
							confirmationTokenExpiry: new Date(Date.now() - 3600000), // 1 hour ago
						}),
					},
				],
			};
			(getDocs as jest.Mock).mockResolvedValue(mockQuerySnapshot);

			const result = await emailService.confirmEmail("expired-token");

			expect(result).toEqual({
				success: false,
				message: "This confirmation link has expired.",
			});
			expect(updateDoc).not.toHaveBeenCalled();
		});

		it("should handle invalid tokens", async () => {
			const mockQuerySnapshot = {
				empty: true,
			};
			(getDocs as jest.Mock).mockResolvedValue(mockQuerySnapshot);

			const result = await emailService.confirmEmail("invalid-token");

			expect(result).toEqual({
				success: false,
				message: "Invalid confirmation token.",
			});
		});
	});

	describe("unsubscribe", () => {
		it("should unsubscribe an existing email", async () => {
			const mockQuerySnapshot = {
				empty: false,
				docs: [
					{
						id: "doc-id",
						ref: "doc-ref",
						data: () => ({
							email: "test@example.com",
						}),
					},
				],
			};
			(getDocs as jest.Mock).mockResolvedValue(mockQuerySnapshot);
			(updateDoc as jest.Mock).mockResolvedValue(undefined);

			const result = await emailService.unsubscribe("test@example.com", "valid-token");

			expect(result).toEqual({
				success: true,
				message: "You have been unsubscribed successfully.",
			});
			expect(updateDoc).toHaveBeenCalled();
		});

		it("should handle non-existent subscriptions", async () => {
			const mockQuerySnapshot = {
				empty: true,
			};
			(getDocs as jest.Mock).mockResolvedValue(mockQuerySnapshot);

			const result = await emailService.unsubscribe("nonexistent@example.com", "token");

			expect(result).toEqual({
				success: false,
				message: "No subscription found.",
			});
		});
	});
});
