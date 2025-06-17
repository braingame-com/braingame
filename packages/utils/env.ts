import { z } from "zod";

/**
 * Validates required environment variables using Zod.
 * This helper ensures configuration errors are caught at startup.
 */
const envSchema = z.object({
	APP_NAME: z.string(),
	API_BASE_URL: z.string().url(),
	NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

export type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse(process.env as Record<string, unknown>);
