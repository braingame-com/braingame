/**
 * Email validation and security utilities
 */

// RFC 5322 compliant email regex
const EMAIL_REGEX =
	/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Common disposable email domains to block
const DISPOSABLE_DOMAINS = [
	"tempmail.com",
	"throwaway.email",
	"guerrillamail.com",
	"mailinator.com",
	"10minutemail.com",
	"dispostable.com",
];

export interface ValidationResult {
	isValid: boolean;
	error?: string;
}

/**
 * Validates an email address
 */
export function validateEmail(email: string): ValidationResult {
	// Trim and lowercase
	const normalizedEmail = email.trim().toLowerCase();

	// Check if empty
	if (!normalizedEmail) {
		return { isValid: false, error: "Email is required" };
	}

	// Check length
	if (normalizedEmail.length > 254) {
		return { isValid: false, error: "Email is too long" };
	}

	// Check format
	if (!EMAIL_REGEX.test(normalizedEmail)) {
		return { isValid: false, error: "Please enter a valid email address" };
	}

	// Check for disposable domains
	const domain = normalizedEmail.split("@")[1];
	if (DISPOSABLE_DOMAINS.includes(domain)) {
		return { isValid: false, error: "Please use a permanent email address" };
	}

	// Check for common typos
	const commonTypos = checkCommonTypos(normalizedEmail);
	if (commonTypos) {
		return { isValid: false, error: commonTypos };
	}

	return { isValid: true };
}

/**
 * Checks for common email typos and suggests corrections
 */
function checkCommonTypos(email: string): string | null {
	const domain = email.split("@")[1];
	const commonDomains: Record<string, string> = {
		"gmial.com": "Did you mean gmail.com?",
		"gmai.com": "Did you mean gmail.com?",
		"yahooo.com": "Did you mean yahoo.com?",
		"yaho.com": "Did you mean yahoo.com?",
		"hotmial.com": "Did you mean hotmail.com?",
		"outlok.com": "Did you mean outlook.com?",
		"iclould.com": "Did you mean icloud.com?",
	};

	if (commonDomains[domain]) {
		return commonDomains[domain];
	}

	return null;
}

/**
 * Sanitizes input to prevent XSS
 */
export function sanitizeInput(input: string): string {
	return input
		.trim()
		.replace(/[<>]/g, "") // Remove HTML brackets
		.slice(0, 254); // Limit length
}

/**
 * Simple rate limiter using in-memory storage
 */
class RateLimiter {
	private attempts: Map<string, { count: number; resetTime: number }> = new Map();
	private readonly maxAttempts: number;
	private readonly windowMs: number;

	constructor(maxAttempts = 3, windowMs = 60000) {
		// 3 attempts per minute
		this.maxAttempts = maxAttempts;
		this.windowMs = windowMs;
	}

	isAllowed(identifier: string): boolean {
		const now = Date.now();
		const record = this.attempts.get(identifier);

		if (!record || now > record.resetTime) {
			// First attempt or window expired
			this.attempts.set(identifier, {
				count: 1,
				resetTime: now + this.windowMs,
			});
			return true;
		}

		if (record.count >= this.maxAttempts) {
			// Max attempts reached
			return false;
		}

		// Increment count
		record.count++;
		return true;
	}

	getRemainingTime(identifier: string): number {
		const record = this.attempts.get(identifier);
		if (!record) return 0;

		const remaining = record.resetTime - Date.now();
		return remaining > 0 ? Math.ceil(remaining / 1000) : 0;
	}

	// Clean up old entries periodically
	cleanup(): void {
		const now = Date.now();
		for (const [key, value] of this.attempts.entries()) {
			if (now > value.resetTime) {
				this.attempts.delete(key);
			}
		}
	}
}

export const emailRateLimiter = new RateLimiter(3, 60000); // 3 attempts per minute

// Cleanup every 5 minutes
if (typeof window !== "undefined") {
	setInterval(() => emailRateLimiter.cleanup(), 5 * 60 * 1000);
}
