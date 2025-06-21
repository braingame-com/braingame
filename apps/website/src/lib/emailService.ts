import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "./firebase";

export interface EmailSignup {
	email: string;
	timestamp: any; // Firestore timestamp
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
 * Validates an email address using a comprehensive regex pattern
 */
export function validateEmail(email: string): boolean {
	const emailRegex =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	return emailRegex.test(email);
}

/**
 * Sanitizes an email address by trimming and converting to lowercase
 */
export function sanitizeEmail(email: string): string {
	return email.trim().toLowerCase();
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
	} catch (error) {
		console.error("Error checking email existence:", error);
		// In case of error, proceed with submission to avoid blocking users
		return false;
	}
}

/**
 * Submits an email to the Firestore database
 */
export async function submitEmail(email: string): Promise<EmailSubmissionResult> {
	try {
		// Validate email format
		if (!validateEmail(email)) {
			return {
				success: false,
				message: "Please enter a valid email address.",
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
		const docRef = await addDoc(collection(db, "email_signups"), {
			...emailSignup,
			timestamp: serverTimestamp(),
		});

		console.log("Email submitted successfully with ID:", docRef.id);

		return {
			success: true,
			message: "Thanks! We'll notify you when we launch.",
		};
	} catch (error) {
		console.error("Error submitting email:", error);

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
	} catch (error) {
		console.error("Error getting signup count:", error);
		return 0;
	}
}
