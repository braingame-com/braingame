import { z } from "zod";

/**
 * Minimal environment schema shared across Brain Game apps.
 */
export const EnvSchema = z.object({
	NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
	API_BASE_URL: z.string().url().optional(),
	FIREBASE_API_KEY: z.string().optional(),
	FIREBASE_AUTH_DOMAIN: z.string().optional(),
	FIREBASE_PROJECT_ID: z.string().optional(),
	FIREBASE_STORAGE_BUCKET: z.string().optional(),
	FIREBASE_MESSAGING_SENDER_ID: z.string().optional(),
	FIREBASE_APP_ID: z.string().optional(),
	NEXT_PUBLIC_FIREBASE_API_KEY: z.string().optional(),
	NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().optional(),
	NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().optional(),
	NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().optional(),
	NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().optional(),
	NEXT_PUBLIC_FIREBASE_APP_ID: z.string().optional(),
});

export type Env = z.infer<typeof EnvSchema>;

/**
 * Validates the current process environment and returns typed values.
 */
export function parseEnv(env: NodeJS.ProcessEnv = process.env): Env {
	return EnvSchema.parse(env);
}

export const env = parseEnv();
