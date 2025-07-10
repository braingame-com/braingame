import {
	addDoc,
	collection,
	getDocs,
	query,
	serverTimestamp,
	type Timestamp,
	where,
} from "firebase/firestore";
import { db } from "./firebase";
import {
	emailRateLimiter,
	sanitizeInput,
	validateEmail as validateEmailFormat,
} from "./validation";

export interface EmailSignup {
	email: string;
	timestamp: Timestamp; // Firestore timestamp
	source: string;
	userAgent?: string;
	ipAddress?: string;
}

export interface EmailSubmissionResult {
	success: boolean;
	message: string;
	isDuplicate?: boolean;
}

/**
 * Validates an email address using comprehensive validation
 */
export function validateEmail(email: string): boolean {
	const result = validateEmailFormat(email);
	return result.isValid;
}

/**
 * Gets validation error message for email
 */
export function getEmailValidationError(email: string): string | null {
	const result = validateEmailFormat(email);
	return result.error || null;
}

/**
 * Sanitizes an email address by trimming and converting to lowercase
 */
export function sanitizeEmail(email: string): string {
	return sanitizeInput(email).toLowerCase();
}

/**
 * Checks if an email already exists in the database
 */
export async function checkEmailExists(email: string): Promise<boolean> {
	try {
		const emailRef = collection(db, "email_signups");
		const q = query(emailRef, where("email", "==", sanitizeEmail(email)));
		const querySnapshot = await getDocs(q);
		return !querySnapshot.empty;
	} catch (_error) {
		// Error checking email existence - proceeding to avoid blocking users
		// In case of error, proceed with submission to avoid blocking users
		return false;
	}
}

/**
 * Submits an email to the Firestore database
 */
export async function submitEmail(email: string): Promise<EmailSubmissionResult> {
	try {
		// Rate limiting check
		const clientId =
			typeof window !== "undefined" ? window.navigator.userAgent || "unknown" : "server";
		if (!emailRateLimiter.isAllowed(clientId)) {
			const remainingTime = emailRateLimiter.getRemainingTime(clientId);
			return {
				success: false,
				message: `Too many attempts. Please try again in ${remainingTime} seconds.`,
			};
		}

		// Validate email format
		const validationError = getEmailValidationError(email);
		if (validationError) {
			return {
				success: false,
				message: validationError,
			};
		}

		const sanitizedEmail = sanitizeEmail(email);

		// Check for duplicates
		const emailExists = await checkEmailExists(sanitizedEmail);
		if (emailExists) {
			return {
				success: false,
				message: "This email is already subscribed!",
				isDuplicate: true,
			};
		}

		// Prepare email signup data
		const emailSignup: Omit<EmailSignup, "timestamp"> = {
			email: sanitizedEmail,
			source: "website_homepage",
			userAgent: typeof window !== "undefined" ? window.navigator.userAgent : undefined,
		};

		// Add to Firestore
		const _docRef = await addDoc(collection(db, "email_signups"), {
			...emailSignup,
			timestamp: serverTimestamp(),
		});

		// Email submitted successfully to database

		return {
			success: true,
			message: "Thanks! We'll notify you when we launch.",
		};
	} catch (_error) {
		// Error submitting email - returning user-friendly message

		// Return a user-friendly error message
		return {
			success: false,
			message: "Something went wrong. Please try again later.",
		};
	}
}

/**
 * Gets the total count of email signups (for analytics)
 */
export async function getSignupCount(): Promise<number> {
	try {
		const emailRef = collection(db, "email_signups");
		const querySnapshot = await getDocs(emailRef);
		return querySnapshot.size;
	} catch (_error) {
		// Error getting signup count - returning default value
		return 0;
	}
}
