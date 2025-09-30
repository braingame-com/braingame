// Advanced email validation with multiple checks

interface EmailValidationResult {
	isValid: boolean;
	reason?: string;
	suggestions?: string[];
	riskScore: number; // 0-100, higher = riskier
}

// Common email typos and their corrections
const COMMON_DOMAIN_TYPOS: Record<string, string> = {
	"gmial.com": "gmail.com",
	"gmai.com": "gmail.com",
	"gmil.com": "gmail.com",
	"gmaill.com": "gmail.com",
	"gnail.com": "gmail.com",
	gmailcom: "gmail.com",
	"yahooo.com": "yahoo.com",
	"yaho.com": "yahoo.com",
	"yahou.com": "yahoo.com",
	"outlok.com": "outlook.com",
	"outloook.com": "outlook.com",
	"hotmial.com": "hotmail.com",
	"hotmai.com": "hotmail.com",
	"hotmil.com": "hotmail.com",
	"iclould.com": "icloud.com",
	"icloud.co": "icloud.com",
};

// Disposable email domains (partial list)
const DISPOSABLE_DOMAINS = new Set([
	"tempmail.com",
	"throwaway.email",
	"guerrillamail.com",
	"mailinator.com",
	"10minutemail.com",
	"yopmail.com",
	"trashmail.com",
	"getnada.com",
	"temp-mail.org",
	"fakeinbox.com",
]);

// Professional/trusted domains
const TRUSTED_DOMAINS = new Set([
	"gmail.com",
	"yahoo.com",
	"outlook.com",
	"hotmail.com",
	"icloud.com",
	"protonmail.com",
	"hey.com",
	"aol.com",
	"live.com",
	"msn.com",
]);

export function validateEmail(email: string): EmailValidationResult {
	const trimmedEmail = email.trim().toLowerCase();

	// Basic format check
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(trimmedEmail)) {
		return {
			isValid: false,
			reason: "Invalid email format",
			riskScore: 100,
		};
	}

	// Length checks
	if (trimmedEmail.length > 254) {
		return {
			isValid: false,
			reason: "Email address is too long",
			riskScore: 100,
		};
	}

	const [localPart, domain] = trimmedEmail.split("@");

	// Local part validation
	if (localPart.length > 64) {
		return {
			isValid: false,
			reason: "Email username is too long",
			riskScore: 100,
		};
	}

	// Check for consecutive dots
	if (trimmedEmail.includes("..")) {
		return {
			isValid: false,
			reason: "Email contains consecutive dots",
			riskScore: 100,
		};
	}

	// Check for leading/trailing dots
	if (localPart.startsWith(".") || localPart.endsWith(".")) {
		return {
			isValid: false,
			reason: "Email username cannot start or end with a dot",
			riskScore: 100,
		};
	}

	// Domain validation
	const domainParts = domain.split(".");
	if (domainParts.length < 2) {
		return {
			isValid: false,
			reason: "Invalid domain format",
			riskScore: 100,
		};
	}

	// TLD validation
	const tld = domainParts[domainParts.length - 1];
	if (tld.length < 2 || !/^[a-z]+$/.test(tld)) {
		return {
			isValid: false,
			reason: "Invalid top-level domain",
			riskScore: 100,
		};
	}

	// Check for typos and provide suggestions
	const suggestions: string[] = [];
	if (COMMON_DOMAIN_TYPOS[domain]) {
		suggestions.push(`${localPart}@${COMMON_DOMAIN_TYPOS[domain]}`);
		return {
			isValid: true, // Still valid, but with suggestion
			suggestions,
			riskScore: 30,
		};
	}

	// Calculate risk score
	let riskScore = 0;

	// Check if disposable email
	if (DISPOSABLE_DOMAINS.has(domain)) {
		riskScore += 50;
	}

	// Check if trusted domain
	if (!TRUSTED_DOMAINS.has(domain)) {
		riskScore += 20;
	}

	// Check for suspicious patterns
	if (/\d{4,}/.test(localPart)) {
		// Many consecutive numbers
		riskScore += 15;
	}

	if (localPart.length < 3) {
		// Very short username
		riskScore += 10;
	}

	// Check for role-based emails
	const roleBasedPrefixes = ["admin", "info", "support", "sales", "noreply", "no-reply"];
	if (roleBasedPrefixes.includes(localPart)) {
		riskScore += 25;
	}

	return {
		isValid: true,
		riskScore: Math.min(riskScore, 100),
		suggestions: suggestions.length > 0 ? suggestions : undefined,
	};
}

export function calculateRiskScore(email: string): number {
	return validateEmail(email).riskScore;
}

export function checkDisposableEmail(email: string): boolean {
	const domain = email.trim().toLowerCase().split("@")[1];
	if (!domain) return false;
	return DISPOSABLE_DOMAINS.has(domain);
}

export function detectTypo(email: string): string | null {
	const trimmedEmail = email.trim().toLowerCase();
	const [, domain] = trimmedEmail.split("@");
	if (!domain) return null;
	const suggestion = COMMON_DOMAIN_TYPOS[domain];
	if (!suggestion) return null;
	const localPart = trimmedEmail.split("@")[0];
	return `${localPart}@${suggestion}`;
}

// DNS validation (requires server-side implementation)
export async function validateEmailDNS(_email: string): Promise<boolean> {
	// This would typically make an API call to validate MX records
	// For now, return true as this requires server-side implementation
	return true;
}

// Email deliverability check (requires server-side implementation)
export async function checkEmailDeliverability(_email: string): Promise<boolean> {
	// This would typically use a service like SendGrid, Mailgun, etc.
	// to verify if an email is deliverable
	return true;
}
