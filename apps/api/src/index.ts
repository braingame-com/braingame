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
*/
