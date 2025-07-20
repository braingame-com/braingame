import { type Request, type Response, Router } from "express";
import { ApiError } from "../middleware/error";
import v1Routes from "./v1";

const router: Router = Router();

// Mount v1 routes
router.use("/v1", v1Routes);

// Root endpoint
router.get("/", (_req: Request, res: Response) => {
	res.json({
		message: "Brain Game API",
		version: "v1",
		documentation: "https://docs.braingame.dev/api", // This will be the future home of our API docs
	});
});

// 404 handler for unmatched API routes
router.use("*", (_req: Request, _res: Response) => {
	throw new ApiError(404, "API endpoint not found");
});

export default router;
