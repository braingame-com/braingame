// Email service for handling subscriptions, confirmations, and unsubscribes

interface EmailSubscriber {
	email: string;
	status: "pending" | "confirmed" | "unsubscribed";
	confirmedAt?: string;
	unsubscribedAt?: string;
	source?: string;
	metadata?: Record<string, unknown>;
}

const STORAGE_KEY = "braingame_email_subscribers";
const CONFIRMATION_TOKEN_KEY = "braingame_confirmation_tokens";

// In production, this would be handled by a backend service
export class EmailService {
	private subscribers: Map<string, EmailSubscriber>;
	private confirmationTokens: Map<string, string>; // token -> email

	constructor() {
		this.subscribers = this.loadSubscribers();
		this.confirmationTokens = this.loadConfirmationTokens();
	}

	private loadSubscribers(): Map<string, EmailSubscriber> {
		if (typeof window === "undefined") return new Map();

		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				const data = JSON.parse(stored);
				return new Map(Object.entries(data));
			}
		} catch (error) {
			console.error("Failed to load subscribers:", error);
		}
		return new Map();
	}

	private loadConfirmationTokens(): Map<string, string> {
		if (typeof window === "undefined") return new Map();

		try {
			const stored = localStorage.getItem(CONFIRMATION_TOKEN_KEY);
			if (stored) {
				const data = JSON.parse(stored);
				return new Map(Object.entries(data));
			}
		} catch (error) {
			console.error("Failed to load confirmation tokens:", error);
		}
		return new Map();
	}

	private saveSubscribers(): void {
		if (typeof window === "undefined") return;

		const data = Object.fromEntries(this.subscribers);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
	}

	private saveConfirmationTokens(): void {
		if (typeof window === "undefined") return;

		const data = Object.fromEntries(this.confirmationTokens);
		localStorage.setItem(CONFIRMATION_TOKEN_KEY, JSON.stringify(data));
	}

	generateConfirmationToken(): string {
		return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
	}

	async subscribe(
		email: string,
		source = "landing_page",
	): Promise<{
		success: boolean;
		requiresConfirmation: boolean;
		message: string;
	}> {
		const normalizedEmail = email.toLowerCase().trim();

		// Check if already subscribed
		const existing = this.subscribers.get(normalizedEmail);
		if (existing) {
			if (existing.status === "confirmed") {
				return {
					success: false,
					requiresConfirmation: false,
					message: "This email is already subscribed.",
				};
			}
			if (existing.status === "pending") {
				// Resend confirmation
				const token = this.generateConfirmationToken();
				this.confirmationTokens.set(token, normalizedEmail);
				this.saveConfirmationTokens();

				return {
					success: true,
					requiresConfirmation: true,
					message: "A new confirmation email has been sent.",
				};
			}
			if (existing.status === "unsubscribed") {
				// Resubscribe
				existing.status = "pending";
				existing.unsubscribedAt = undefined;
			}
		} else {
			// New subscriber
			this.subscribers.set(normalizedEmail, {
				email: normalizedEmail,
				status: "pending",
				source,
				metadata: {
					userAgent: navigator.userAgent,
					timestamp: new Date().toISOString(),
				},
			});
		}

		// Generate confirmation token
		const token = this.generateConfirmationToken();
		this.confirmationTokens.set(token, normalizedEmail);

		this.saveSubscribers();
		this.saveConfirmationTokens();

		// In production, send confirmation email here
		console.log(`Confirmation token for ${normalizedEmail}: ${token}`);

		return {
			success: true,
			requiresConfirmation: true,
			message: "Please check your email to confirm your subscription.",
		};
	}

	async confirmSubscription(token: string): Promise<{
		success: boolean;
		message: string;
	}> {
		const email = this.confirmationTokens.get(token);
		if (!email) {
			return {
				success: false,
				message: "Invalid or expired confirmation token.",
			};
		}

		const subscriber = this.subscribers.get(email);
		if (!subscriber) {
			return {
				success: false,
				message: "Subscriber not found.",
			};
		}

		if (subscriber.status === "confirmed") {
			return {
				success: false,
				message: "This email is already confirmed.",
			};
		}

		// Confirm the subscription
		subscriber.status = "confirmed";
		subscriber.confirmedAt = new Date().toISOString();

		// Remove used token
		this.confirmationTokens.delete(token);

		this.saveSubscribers();
		this.saveConfirmationTokens();

		return {
			success: true,
			message: "Your email has been confirmed successfully!",
		};
	}

	async confirmEmail(token: string) {
		return this.confirmSubscription(token);
	}

	async unsubscribe(email: string): Promise<{
		success: boolean;
		message: string;
	}> {
		const normalizedEmail = email.toLowerCase().trim();
		const subscriber = this.subscribers.get(normalizedEmail);

		if (!subscriber) {
			return {
				success: false,
				message: "Email not found in our records.",
			};
		}

		if (subscriber.status === "unsubscribed") {
			return {
				success: false,
				message: "This email is already unsubscribed.",
			};
		}

		subscriber.status = "unsubscribed";
		subscriber.unsubscribedAt = new Date().toISOString();

		this.saveSubscribers();

		return {
			success: true,
			message: "You have been unsubscribed successfully.",
		};
	}

	getSubscriber(email: string): EmailSubscriber | undefined {
		return this.subscribers.get(email.toLowerCase().trim());
	}

	getActiveSubscribersCount(): number {
		return Array.from(this.subscribers.values()).filter((sub) => sub.status === "confirmed").length;
	}

	// Email template preview
	generateEmailPreview(template: string, variables: Record<string, string>): string {
		let preview = template;
		for (const [key, value] of Object.entries(variables)) {
			preview = preview.replace(new RegExp(`{{${key}}}`, "g"), value);
		}
		return preview;
	}

	// Export subscribers (for admin use)
	exportSubscribers(status?: EmailSubscriber["status"]): EmailSubscriber[] {
		const subscribers = Array.from(this.subscribers.values());
		if (status) {
			return subscribers.filter((sub) => sub.status === status);
		}
		return subscribers;
	}
}

// Create singleton instance
export const emailService = new EmailService();

// Email templates
export const EMAIL_TEMPLATES = {
	confirmation: {
		subject: "Confirm your Brain Game subscription",
		previewText: "Just one more step to join the Brain Game waitlist!",
		html: `
			<h1>Welcome to Brain Game!</h1>
			<p>Thanks for joining our waitlist. Please confirm your email address by clicking the link below:</p>
			<a href="{{confirmationLink}}" style="display: inline-block; padding: 12px 24px; background: #0074D9; color: white; text-decoration: none; border-radius: 4px;">Confirm Email</a>
			<p>If you didn't sign up for Brain Game, you can safely ignore this email.</p>
		`,
		text: `
			Welcome to Brain Game!
			
			Thanks for joining our waitlist. Please confirm your email address by visiting:
			{{confirmationLink}}
			
			If you didn't sign up for Brain Game, you can safely ignore this email.
		`,
	},
	welcome: {
		subject: "Welcome to Brain Game!",
		previewText: "You're officially on the waitlist!",
		html: `
			<h1>You're in!</h1>
			<p>Welcome to the Brain Game waitlist, {{email}}!</p>
			<p>We'll keep you updated on our progress and let you know as soon as we launch.</p>
			<p>In the meantime, follow us on social media for updates!</p>
		`,
		text: `
			You're in!
			
			Welcome to the Brain Game waitlist, {{email}}!
			We'll keep you updated on our progress and let you know as soon as we launch.
			
			In the meantime, follow us on social media for updates!
		`,
	},
	update: {
		subject: "Brain Game Update: {{updateTitle}}",
		previewText: "{{updatePreview}}",
		html: `
			<h1>{{updateTitle}}</h1>
			{{updateContent}}
			<hr>
			<p style="font-size: 12px; color: #666;">
				You're receiving this email because you signed up for Brain Game updates.
				<a href="{{unsubscribeLink}}">Unsubscribe</a>
			</p>
		`,
		text: `
			{{updateTitle}}
			
			{{updateContent}}
			
			---
			You're receiving this email because you signed up for Brain Game updates.
			Unsubscribe: {{unsubscribeLink}}
		`,
	},
};
