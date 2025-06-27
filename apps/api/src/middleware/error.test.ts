import type { Request, Response } from "express";
import { ApiError, errorHandler } from "./error";

// Mock config module
jest.mock("../config", () => ({
	config: {
		NODE_ENV: "production", // Default to production for tests
	},
}));

// Import config after mocking
import { config } from "../config";

describe("Error Handler Middleware", () => {
	let mockReq: Partial<Request>;
	let mockRes: Partial<Response>;
	let mockNext: jest.Mock;
	let mockJson: jest.Mock;
	let mockStatus: jest.Mock;

	beforeEach(() => {
		mockJson = jest.fn();
		mockStatus = jest.fn().mockReturnThis();
		mockReq = {
			path: "/api/test",
			method: "GET",
		};
		mockRes = {
			status: mockStatus,
			json: mockJson,
		};
		mockNext = jest.fn();
		jest.spyOn(console, "error").mockImplementation();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("Production Environment", () => {
		beforeEach(() => {
			// @ts-expect-error - Mocking config for tests
			config.NODE_ENV = "production";
		});

		it("should not expose stack traces in production", () => {
			const error = new Error("Test error with sensitive info");
			error.stack = "Error: Test error\n    at Object.<anonymous> (/src/sensitive/path.ts:10:15)";

			errorHandler(error, mockReq as Request, mockRes as Response, mockNext);

			expect(mockStatus).toHaveBeenCalledWith(500);
			const response = mockJson.mock.calls[0][0];
			expect(response.error.stack).toBeUndefined();
			expect(response.error.details).toBeUndefined();
			expect(response.error.message).toBe("Internal Server Error");
			expect(response.error.errorId).toBeDefined();
		});

		it("should sanitize database error messages", () => {
			const dbError = new Error('column "user_password" does not exist');
			dbError.name = "SequelizeDatabaseError";

			errorHandler(dbError, mockReq as Request, mockRes as Response, mockNext);

			const response = mockJson.mock.calls[0][0];
			expect(response.error.message).toBe("Database operation failed");
			expect(response.error.message).not.toContain("user_password");
		});

		it("should not log stack traces to console in production", () => {
			const error = new Error("Test error");
			error.stack = "Sensitive stack trace";

			errorHandler(error, mockReq as Request, mockRes as Response, mockNext);

			const consoleCall = (console.error as jest.Mock).mock.calls[0][1];
			expect(consoleCall.stack).toBeUndefined();
			expect(consoleCall.errorId).toBeDefined();
		});
	});

	describe("Development Environment", () => {
		beforeEach(() => {
			// @ts-expect-error - Mocking config for tests
			config.NODE_ENV = "development";
		});

		it("should expose stack traces in development", () => {
			const error = new Error("Test error");
			error.stack = "Error: Test error\n    at Object.<anonymous>";

			errorHandler(error, mockReq as Request, mockRes as Response, mockNext);

			const response = mockJson.mock.calls[0][0];
			expect(response.error.stack).toBe(error.stack);
			expect(response.error.details).toBeDefined();
		});

		it("should log stack traces to console in development", () => {
			const error = new Error("Test error");
			error.stack = "Test stack trace";

			errorHandler(error, mockReq as Request, mockRes as Response, mockNext);

			const consoleCall = (console.error as jest.Mock).mock.calls[0][1];
			expect(consoleCall.stack).toBe("Test stack trace");
		});
	});

	describe("Error Types", () => {
		it("should handle ApiError correctly", () => {
			const apiError = new ApiError(404, "Not Found", { resource: "user" });

			errorHandler(apiError, mockReq as Request, mockRes as Response, mockNext);

			expect(mockStatus).toHaveBeenCalledWith(404);
			const response = mockJson.mock.calls[0][0];
			expect(response.error.message).toBe("Not Found");
		});

		it("should handle ValidationError", () => {
			const validationError = new Error("Invalid input");
			validationError.name = "ValidationError";

			errorHandler(validationError, mockReq as Request, mockRes as Response, mockNext);

			expect(mockStatus).toHaveBeenCalledWith(400);
		});

		it("should handle UnauthorizedError", () => {
			const unauthorizedError = new Error("No token");
			unauthorizedError.name = "UnauthorizedError";

			errorHandler(unauthorizedError, mockReq as Request, mockRes as Response, mockNext);

			expect(mockStatus).toHaveBeenCalledWith(401);
		});
	});

	describe("Error ID Generation", () => {
		it("should generate unique error IDs", () => {
			const error1 = new Error("Error 1");
			const error2 = new Error("Error 2");

			errorHandler(error1, mockReq as Request, mockRes as Response, mockNext);
			const response1 = mockJson.mock.calls[0][0];

			errorHandler(error2, mockReq as Request, mockRes as Response, mockNext);
			const response2 = mockJson.mock.calls[1][0];

			expect(response1.error.errorId).toBeDefined();
			expect(response2.error.errorId).toBeDefined();
			expect(response1.error.errorId).not.toBe(response2.error.errorId);
		});
	});
});
