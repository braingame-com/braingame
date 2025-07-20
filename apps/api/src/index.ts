import * as functions from "firebase-functions";

export const api = functions.https.onRequest((_req, res) => {
	res.send("Hello from Firebase!");
});

/*
import dotenv from "dotenv";
import express from "express";
import * as admin from "firebase-admin";
import helmet from "helmet";
import { corsMiddleware } from "./middleware/cors";
import { errorHandler } from "./middleware/error";
import { logger } from "./middleware/logger";
import routes from "./routes";

// Load environment variables
dotenv.config();

// Initialize Firebase Admin SDK
admin.initializeApp();

const app = express();

// Core Middleware
app.use(helmet());
app.use(corsMiddleware);
app.use(logger);
app.use(express.json());

// API Routes
// All routes are implicitly prefixed with '/api' due to the function's rewrite rule in firebase.json.
// So, a route defined as '/health' in our routes file will be accessible at '/api/health'.
app.use("/", routes);

// Error Handling Middleware
app.use(errorHandler);

// Expose the Express app as a Firebase Cloud Function
export const api = functions.https.onRequest(app);
*/
