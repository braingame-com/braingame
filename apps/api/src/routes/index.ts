import { type Request, type Response, Router } from "express";
import { ApiError } from "../middleware/error";
import healthRoutes from "./health";

const router: Router = Router();

// Mount health routes
router.use("/", healthRoutes);

// Root endpoint
router.get("/", (_req: Request, res: Response) => {
	res.json({
		message: "Brain Game API",
		version: "v1",
		endpoints: {
			health: "/api/health",
			ready: "/api/ready",
		},
		documentation: "https://api.braingame.dev/docs",
	});
});

// Placeholder routes for future features
router.get("/v1/users", (_req: Request, res: Response) => {
	res.json({
		message: "Users endpoint - Coming soon",
		data: [],
	});
});

router.get("/v1/sessions", (_req: Request, res: Response) => {
	res.json({
		message: "Sessions endpoint - Coming soon",
		data: [],
	});
});

router.get("/v1/analytics", (_req: Request, res: Response) => {
	res.json({
		message: "Analytics endpoint - Coming soon",
		data: {},
	});
});

// 404 handler for unmatched API routes
router.use("*", (_req: Request, _res: Response) => {
	throw new ApiError(404, "API endpoint not found");
});

export default router;
