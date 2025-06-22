import type { NextFunction, Request, Response } from "express";
import { config } from "../config";

export class ApiError extends Error {
	constructor(
		public statusCode: number,
		public message: string,
		public details?: any,
	) {
		super(message);
		this.name = "ApiError";
	}
}

export const errorHandler = (
	err: Error | ApiError,
	req: Request,
	res: Response,
	next: NextFunction,
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
	}

	// Log error details in development
	if (config.NODE_ENV === "development") {
		console.error("Error details:", {
			name: err.name,
			message: err.message,
			stack: err.stack,
			details,
		});
	}

	res.status(statusCode).json({
		error: {
			message,
			...(config.NODE_ENV === "development" && { details }),
			timestamp: new Date().toISOString(),
			path: req.path,
			method: req.method,
		},
	});
};
