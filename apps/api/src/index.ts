import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config";
import { corsMiddleware } from "./middleware/cors";
import { errorHandler } from "./middleware/error";
import { logger } from "./middleware/logger";
import routes from "./routes";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(corsMiddleware);

// Request logging
app.use(morgan("combined"));
app.use(logger);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api", routes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
	console.log(`🚀 API Server running on port ${PORT}`);
	console.log(`📍 Environment: ${config.NODE_ENV}`);
	console.log(`🌐 Allowed origins: ${config.ALLOWED_ORIGINS.join(", ")}`);
});
