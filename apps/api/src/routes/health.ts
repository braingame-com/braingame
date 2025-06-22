import { type Request, type Response, Router } from "express";
import { config } from "../config";

const router: Router = Router();

interface HealthResponse {
	status: "healthy" | "unhealthy";
	timestamp: string;
	environment: string;
	version: string;
	uptime: number;
}

router.get("/health", (_req: Request, res: Response<HealthResponse>) => {
	const healthCheck: HealthResponse = {
		status: "healthy",
		timestamp: new Date().toISOString(),
		environment: config.NODE_ENV,
		version: process.env.npm_package_version || "1.0.0",
		uptime: process.uptime(),
	};

	res.json(healthCheck);
});

router.get("/ready", (_req: Request, res: Response) => {
	// Add any readiness checks here (database connections, external services, etc.)
	res.json({ ready: true });
});

export default router;
