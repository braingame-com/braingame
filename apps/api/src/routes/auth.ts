import { Router } from "express";
import { z } from "zod";
import { requireAuth, requireGuest } from "../middleware/session";
import { commonSchemas, validateRequest } from "../utils/security";

const router = Router();

// Extend Express Session to include our custom properties
declare module "express-session" {
	interface SessionData {
		userId?: string;
		email?: string;
		loginTime?: Date;
	}
}

// Login schema
const loginSchema = z.object({
	body: z.object({
		email: commonSchemas.email,
		password: commonSchemas.password,
	}),
});

// POST /api/auth/login - User login
router.post("/login", requireGuest, validateRequest(loginSchema), async (req, res) => {
	const { email } = req.body;

	// TODO: Implement actual authentication logic
	// This is just an example showing secure session handling

	// Example: Verify credentials (in real app, check against database)
	// const user = await User.findOne({ email });
	// const isValid = await bcrypt.compare(req.body.password, user.passwordHash);

	// For demo purposes, accept any login
	const userId = "demo-user-id";

	// Regenerate session ID to prevent session fixation attacks
	req.session.regenerate((err) => {
		if (err) {
			return res.status(500).json({ error: "Session error" });
		}

		// Set session data
		req.session.userId = userId;
		req.session.email = email;
		req.session.loginTime = new Date();

		// Save session
		req.session.save((err) => {
			if (err) {
				return res.status(500).json({ error: "Session save error" });
			}

			res.json({
				message: "Login successful",
				user: {
					id: userId,
					email,
				},
			});
		});
	});
});

// POST /api/auth/logout - User logout
router.post("/logout", requireAuth, (req, res) => {
	const email = req.session.email;

	// Destroy session
	req.session.destroy((err) => {
		if (err) {
			return res.status(500).json({ error: "Logout error" });
		}

		// Clear session cookie
		res.clearCookie("braingame.sid");

		res.json({
			message: "Logout successful",
			email,
		});
	});
});

// GET /api/auth/me - Get current user
router.get("/me", requireAuth, (req, res) => {
	res.json({
		user: {
			id: req.session.userId,
			email: req.session.email,
			loginTime: req.session.loginTime,
		},
	});
});

// GET /api/auth/check - Check if authenticated
router.get("/check", (req, res) => {
	res.json({
		authenticated: !!req.session.userId,
		userId: req.session.userId || null,
	});
});

export default router;
