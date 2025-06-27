import type { Express } from "express";
import helmet from "helmet";
import { sanitizeRequestBody } from "../utils/security";

/**
 * Applies security middleware to the Express app
 */
export function applySecurityMiddleware(app: Express) {
	// Helmet for basic security headers
	app.use(
		helmet({
			contentSecurityPolicy: {
				directives: {
					defaultSrc: ["'self'"],
					styleSrc: ["'self'", "'unsafe-inline'"],
					scriptSrc: ["'self'"],
					imgSrc: ["'self'", "data:", "https:"],
				},
			},
			hsts: {
				maxAge: 31536000,
				includeSubDomains: true,
				preload: true,
			},
		}),
	);

	// Sanitize all request bodies to prevent NoSQL injection
	app.use(sanitizeRequestBody());

	// Disable X-Powered-By header
	app.disable("x-powered-by");

	// Additional security headers
	app.use((_req, res, next) => {
		res.setHeader("X-Content-Type-Options", "nosniff");
		res.setHeader("X-Frame-Options", "DENY");
		res.setHeader("X-XSS-Protection", "1; mode=block");
		res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
		res.setHeader("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
		next();
	});
}
