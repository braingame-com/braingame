import { Router } from "express";
import { z } from "zod";
import { commonSchemas, isValidObjectId, validateRequest } from "../utils/security";

const router = Router();

/**
 * Example of secure API endpoints with input validation
 */

// Schema for creating a user
const createUserSchema = z.object({
	body: z.object({
		email: commonSchemas.email,
		username: commonSchemas.username,
		password: commonSchemas.password,
	}),
});

// Schema for querying users
const getUserSchema = z.object({
	params: z.object({
		id: commonSchemas.objectId,
	}),
});

// Schema for listing with pagination
const listUsersSchema = z.object({
	query: commonSchemas.pagination,
});

// POST /api/users - Create a new user
router.post("/users", validateRequest(createUserSchema), async (req, res) => {
	// Input is already validated and sanitized
	const { email, username } = req.body;

	// Example: Create user in database (when implemented)
	// const user = await User.create({ email, username, password: req.body.password });

	res.json({
		message: "User creation endpoint (validated and secure)",
		data: { email, username },
	});
});

// GET /api/users/:id - Get user by ID
router.get("/users/:id", validateRequest(getUserSchema), async (req, res) => {
	const { id } = req.params;

	// Additional validation example
	if (!isValidObjectId(id)) {
		return res.status(400).json({ error: "Invalid user ID format" });
	}

	// Example: Fetch user from database (when implemented)
	// const user = await User.findById(id);

	res.json({
		message: "User fetch endpoint (validated and secure)",
		data: { id },
	});
});

// GET /api/users - List users with pagination
router.get("/users", validateRequest(listUsersSchema), async (req, res) => {
	const { page, limit } = req.query;

	// Example: Fetch paginated users (when implemented)
	// const users = await User.find()
	//   .limit(limit)
	//   .skip((page - 1) * limit);

	res.json({
		message: "User list endpoint (validated and secure)",
		data: { page, limit },
	});
});

export default router;
