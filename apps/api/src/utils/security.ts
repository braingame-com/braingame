import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

/**
 * Security utilities to prevent NoSQL injection and other attacks
 */

/**
 * Sanitizes input to prevent NoSQL injection attacks
 * Removes any MongoDB operators from objects
 */
export function sanitizeInput<T>(input: T): T {
	if (typeof input !== "object" || input === null) {
		return input;
	}

	if (Array.isArray(input)) {
		return input.map((item) => sanitizeInput(item)) as T;
	}

	const sanitized: Record<string, unknown> = {};
	const obj = input as Record<string, unknown>;

	for (const key in obj) {
		if (key.startsWith("$")) {
			// Skip any keys that start with $ (MongoDB operators)
			continue;
		}

		const value = obj[key];

		if (typeof value === "object" && value !== null) {
			// Recursively sanitize nested objects
			sanitized[key] = sanitizeInput(value);
		} else {
			sanitized[key] = value;
		}
	}

	return sanitized as T;
}

/**
 * Validates MongoDB ObjectId format
 */
export function isValidObjectId(id: string): boolean {
	const objectIdRegex = /^[0-9a-fA-F]{24}$/;
	return objectIdRegex.test(id);
}

/**
 * Common Zod schemas for validation
 */
export const commonSchemas = {
	objectId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format"),
	email: z.string().email(),
	username: z
		.string()
		.min(3)
		.max(30)
		.regex(
			/^[a-zA-Z0-9_-]+$/,
			"Username can only contain letters, numbers, underscores, and hyphens",
		),
	password: z.string().min(8).max(100),
	pagination: z.object({
		page: z.number().int().positive().default(1),
		limit: z.number().int().positive().max(100).default(20),
	}),
};

/**
 * Express middleware to sanitize request body
 */
export function sanitizeRequestBody() {
	return (req: Request, _res: Response, next: NextFunction) => {
		if (req.body) {
			req.body = sanitizeInput(req.body);
		}
		next();
	};
}

/**
 * Express middleware to validate request with Zod schema
 */
export function validateRequest(schema: z.ZodSchema) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const validated = await schema.parseAsync({
				body: req.body,
				query: req.query,
				params: req.params,
			});

			req.body = validated.body || req.body;
			req.query = validated.query || req.query;
			req.params = validated.params || req.params;

			next();
		} catch (error) {
			if (error instanceof z.ZodError) {
				return res.status(400).json({
					error: "Validation failed",
					details: error.errors,
				});
			}
			next(error);
		}
	};
}
