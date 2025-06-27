import cookieParser from "cookie-parser";
import type { Express, NextFunction, Request, Response } from "express";
import session from "express-session";
import { config } from "../config";

/**
 * Configures secure session management for the Express app
 */
export function applySessionMiddleware(app: Express) {
	// Cookie parser middleware - must come before session
	app.use(cookieParser(process.env.COOKIE_SECRET || "development-cookie-secret"));

	// Session configuration with security best practices
	const sessionConfig: session.SessionOptions = {
		secret: process.env.SESSION_SECRET || "development-session-secret",
		name: "braingame.sid", // Custom session ID name (avoid default 'connect.sid')
		resave: false, // Don't save session if unmodified
		saveUninitialized: false, // Don't create session until something stored
		rolling: true, // Reset expiry on activity
		cookie: {
			httpOnly: true, // Prevent XSS attacks - cookies not accessible via JavaScript
			secure: config.NODE_ENV === "production", // HTTPS only in production
			sameSite: "strict", // CSRF protection
			maxAge: 1000 * 60 * 60, // 1 hour (matches SESSION_TIMEOUT default)
			path: "/",
			domain: config.NODE_ENV === "production" ? ".braingame.com" : undefined,
		},
		// In production, use Redis or another session store
		// For now, using default in-memory store (not for production!)
	};

	// Apply session middleware
	app.use(session(sessionConfig));

	// Add session security headers
	app.use((req, _res, next) => {
		// Regenerate session ID on login to prevent session fixation
		if (req.body?.action === "login" && req.method === "POST") {
			req.session.regenerate((err) => {
				if (err) {
					next(err);
				} else {
					next();
				}
			});
		} else {
			next();
		}
	});
}

/**
 * Session store configuration for production
 * TODO: Implement Redis or another persistent session store
 */
export function getProductionSessionStore() {
	// Example Redis store configuration (requires connect-redis package):
	// const RedisStore = require('connect-redis')(session);
	// const redis = require('redis');
	// const redisClient = redis.createClient({
	//   host: process.env.REDIS_HOST,
	//   port: process.env.REDIS_PORT,
	//   password: process.env.REDIS_PASSWORD,
	// });
	//
	// return new RedisStore({ client: redisClient });

	console.warn("Using in-memory session store. Not suitable for production!");
	return undefined;
}

/**
 * Middleware to ensure user is authenticated
 */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
	if (!req.session?.userId) {
		return res.status(401).json({ error: "Authentication required" });
	}
	next();
}

/**
 * Middleware to ensure user is not authenticated (for login/register pages)
 */
export function requireGuest(req: Request, res: Response, next: NextFunction) {
	if (req.session?.userId) {
		return res.status(400).json({ error: "Already authenticated" });
	}
	next();
}
