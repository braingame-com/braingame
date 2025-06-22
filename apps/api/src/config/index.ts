import { z } from "zod";

const configSchema = z.object({
	NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
	PORT: z.string().default("8080"),
	ALLOWED_ORIGINS: z.array(z.string()),
	API_KEY: z.string().optional(),
	LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("info"),
});

const rawConfig = {
	NODE_ENV: process.env.NODE_ENV as "development" | "production" | "test",
	PORT: process.env.PORT,
	ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(",") || [
		"http://localhost:3000",
		"http://localhost:8081",
		"https://app.braingame.dev",
		"https://www.braingame.dev",
		"https://api.braingame.dev",
	],
	API_KEY: process.env.API_KEY,
	LOG_LEVEL: process.env.LOG_LEVEL as "error" | "warn" | "info" | "debug",
};

export const config = configSchema.parse(rawConfig);

export type Config = z.infer<typeof configSchema>;
