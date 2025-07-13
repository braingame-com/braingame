import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { NextRequest } from "next/server";
import { POST } from "../subscribe/route";

// Mock EmailService
jest.mock("../../../lib/email-service", () => ({
	EmailService: jest.fn().mockImplementation(() => ({
		subscribe: jest.fn(),
	})),
}));

// Mock rate limiter
jest.mock("../../../lib/rate-limiter", () => ({
	checkRateLimit: jest.fn(() => ({ allowed: true, retryAfter: null })),
}));

// Mock analytics
jest.mock("../../../lib/analytics", () => ({
	trackEvent: jest.fn(),
}));

import { trackEvent } from "../../../lib/analytics";
import { EmailService } from "../../../lib/email-service";
import { checkRateLimit } from "../../../lib/rate-limiter";

describe("Subscribe API Route", () => {
	let mockEmailService: jest.Mocked<EmailService>;

	beforeEach(() => {
		jest.clearAllMocks();
		mockEmailService = new EmailService() as jest.Mocked<EmailService>;
	});

	it("should successfully subscribe a valid email", async () => {
		mockEmailService.subscribe.mockResolvedValue({
			success: true,
			requiresConfirmation: true,
			message: "Please check your email to confirm your subscription.",
		});

		const request = new NextRequest("http://localhost:3000/api/subscribe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-forwarded-for": "127.0.0.1",
			},
			body: JSON.stringify({ email: "test@example.com" }),
		});

		const response = await POST(request);
		const data = await response.json();

		expect(response.status).toBe(200);
		expect(data).toEqual({
			success: true,
			message: "Please check your email to confirm your subscription.",
		});

		expect(mockEmailService.subscribe).toHaveBeenCalledWith("test@example.com", "api");
		expect(trackEvent).toHaveBeenCalledWith("email_subscribe_attempt", {
			email: "test@example.com",
			source: "api",
			ip: "127.0.0.1",
		});
	});

	it("should reject invalid email format", async () => {
		const request = new NextRequest("http://localhost:3000/api/subscribe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: "invalid-email" }),
		});

		const response = await POST(request);
		const data = await response.json();

		expect(response.status).toBe(400);
		expect(data).toEqual({
			success: false,
			message: "Please provide a valid email address",
		});

		expect(mockEmailService.subscribe).not.toHaveBeenCalled();
	});

	it("should handle rate limiting", async () => {
		(checkRateLimit as jest.Mock).mockReturnValue({
			allowed: false,
			retryAfter: 60,
		});

		const request = new NextRequest("http://localhost:3000/api/subscribe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-forwarded-for": "127.0.0.1",
			},
			body: JSON.stringify({ email: "test@example.com" }),
		});

		const response = await POST(request);
		const data = await response.json();

		expect(response.status).toBe(429);
		expect(response.headers.get("Retry-After")).toBe("60");
		expect(data).toEqual({
			success: false,
			message: "Too many requests. Please try again later.",
		});

		expect(mockEmailService.subscribe).not.toHaveBeenCalled();
	});

	it("should handle missing email", async () => {
		const request = new NextRequest("http://localhost:3000/api/subscribe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({}),
		});

		const response = await POST(request);
		const data = await response.json();

		expect(response.status).toBe(400);
		expect(data).toEqual({
			success: false,
			message: "Please provide a valid email address",
		});
	});

	it("should handle service errors", async () => {
		mockEmailService.subscribe.mockRejectedValue(new Error("Database error"));

		const request = new NextRequest("http://localhost:3000/api/subscribe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: "test@example.com" }),
		});

		const response = await POST(request);
		const data = await response.json();

		expect(response.status).toBe(500);
		expect(data).toEqual({
			success: false,
			message: "An error occurred. Please try again later.",
		});

		expect(trackEvent).toHaveBeenCalledWith("email_subscribe_error", {
			email: "test@example.com",
			error: "Database error",
			source: "api",
		});
	});

	it("should handle malformed JSON", async () => {
		const request = new NextRequest("http://localhost:3000/api/subscribe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: "invalid json",
		});

		const response = await POST(request);
		const data = await response.json();

		expect(response.status).toBe(400);
		expect(data).toEqual({
			success: false,
			message: "Invalid request format",
		});
	});
});
