const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

interface RateLimitEntry {
	count: number;
	expiresAt: number;
}

const buckets = new Map<string, RateLimitEntry>();

export interface RateLimitResult {
	allowed: boolean;
	retryAfter: number | null;
}

export function checkRateLimit(identifier: string): RateLimitResult {
	const now = Date.now();
	const entry = buckets.get(identifier);

	if (!entry || entry.expiresAt <= now) {
		buckets.set(identifier, {
			count: 1,
			expiresAt: now + WINDOW_MS,
		});
		return { allowed: true, retryAfter: null };
	}

	if (entry.count < MAX_REQUESTS) {
		entry.count += 1;
		return { allowed: true, retryAfter: null };
	}

	const retryAfterSeconds = Math.ceil((entry.expiresAt - now) / 1000);
	return { allowed: false, retryAfter: retryAfterSeconds };
}

export function resetRateLimit(identifier?: string) {
	if (identifier) {
		buckets.delete(identifier);
		return;
	}
	buckets.clear();
}
