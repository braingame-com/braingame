import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { config } from "./config";
import { corsMiddleware } from "./middleware/cors";
import { errorHandler } from "./middleware/error";
import { appLogger, logger } from "./middleware/logger";
import { applySecurityMiddleware } from "./middleware/security";
import routes from "./routes";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Apply comprehensive security middleware
applySecurityMiddleware(app);

// CORS configuration
app.use(corsMiddleware);

// Request logging
app.use(morgan("combined"));
app.use(logger);

// Body parsing with size limits to prevent DoS
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// API routes
app.use("/api", routes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
	appLogger.info(`🚀 API Server running on port ${PORT}`);
	appLogger.info(`📍 Environment: ${config.NODE_ENV}`);
	appLogger.info(`🌐 Allowed origins: ${config.ALLOWED_ORIGINS.join(", ")}`);
});
