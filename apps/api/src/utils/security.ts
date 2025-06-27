import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

/**
 * Common Zod schemas for validation
 */
export const commonSchemas = {
	email: z.string().email(),
	password: z.string().min(8).max(100),
};

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
