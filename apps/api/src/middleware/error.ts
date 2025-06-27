import { randomUUID } from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import { config } from "../config";

export class ApiError extends Error {
	constructor(
		public statusCode: number,
		public message: string,
		public details?: Record<string, unknown>,
	) {
		super(message);
		this.name = "ApiError";
	}
}

/**
 * Sanitizes error messages to prevent information leakage
 */
function sanitizeErrorMessage(message: string): string {
	// Remove potential database schema information
	const patterns = [
		/column ".*?" does not exist/gi,
		/relation ".*?" does not exist/gi,
		/duplicate key value violates unique constraint ".*?"/gi,
		/invalid input syntax for type .*?: ".*?"/gi,
		/null value in column ".*?" violates not-null constraint/gi,
	];

	let sanitized = message;
	for (const pattern of patterns) {
		sanitized = sanitized.replace(pattern, "Database operation failed");
	}

	return sanitized;
}

export const errorHandler = (
	err: Error | ApiError,
	req: Request,
	res: Response,
	_next: NextFunction,
) => {
	let statusCode = 500;
	let message = "Internal Server Error";
	let details: unknown;

	if (err instanceof ApiError) {
		statusCode = err.statusCode;
		message = err.message;
		details = err.details;
	} else if (err.name === "ValidationError") {
		statusCode = 400;
		message = "Validation Error";
		details = err.message;
	} else if (err.name === "UnauthorizedError") {
		statusCode = 401;
		message = "Unauthorized";
	} else if (err.name === "SequelizeDatabaseError" || err.name === "MongoError") {
		// Database errors should not expose schema information
		statusCode = 500;
		message = "Database operation failed";
		// Don't include details for database errors
	}

	// Generate error ID for tracking
	const errorId = randomUUID();

	// Sanitize error messages in production
	if (config.NODE_ENV === "production") {
		message = sanitizeErrorMessage(message);
	}

	// Log error details
	if (config.NODE_ENV === "development") {
		// In development, log full error details including stack trace
		console.error("Error details:", {
			errorId,
			name: err.name,
			message: err.message,
			stack: err.stack,
			details,
		});
	} else {
		// In production, log error without stack trace to prevent sensitive info in logs
		console.error("Error occurred:", {
			errorId,
			name: err.name,
			message: err.message,
			statusCode,
			path: req.path,
			method: req.method,
			timestamp: new Date().toISOString(),
		});
	}

	res.status(statusCode).json({
		error: {
			message,
			errorId, // Include error ID for support reference
			...(config.NODE_ENV === "development" && {
				details,
				stack: err.stack, // Only include stack trace in development
			}),
			timestamp: new Date().toISOString(),
			path: req.path,
			method: req.method,
		},
	});
};
