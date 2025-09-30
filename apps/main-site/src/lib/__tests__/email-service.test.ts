import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { EmailService } from "../email-service";

class MockStorage {
	private store = new Map<string, string>();

	getItem(key: string) {
		return this.store.get(key) ?? null;
	}

	setItem(key: string, value: string) {
		this.store.set(key, value);
	}

	removeItem(key: string) {
		this.store.delete(key);
	}

	clear() {
		this.store.clear();
	}
}

describe("EmailService", () => {
	let service: EmailService;
	let storage: MockStorage;
	let consoleSpy: ReturnType<typeof jest.spyOn>;

	beforeEach(() => {
		storage = new MockStorage();
		(globalThis as { window?: Window }).window = { localStorage: storage } as unknown as Window;

		Object.defineProperty(global, "navigator", {
			value: { userAgent: "jest" },
			configurable: true,
		});

		consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
		service = new EmailService();
	});

	afterEach(() => {
		consoleSpy.mockRestore();
		delete (global as { window?: unknown }).window;
		// @ts-expect-error cleanup navigator mock
		delete global.navigator;
	});

	const extractToken = () => {
		const call = consoleSpy.mock.calls
			.map((args: unknown[]) => (typeof args[0] === "string" ? (args[0] as string) : ""))
			.find((message: string) => message.includes("Confirmation token for"));
		return call?.split(": ").pop() ?? "";
	};

	it("subscribes a new email and queues confirmation", async () => {
		const result = await service.subscribe("test@example.com");

		expect(result).toEqual({
			success: true,
			requiresConfirmation: true,
			message: "Please check your email to confirm your subscription.",
		});

		expect(extractToken()).not.toEqual("");
	});

	it("rejects invalid email addresses", async () => {
		const result = await service.subscribe("invalid-email");

		expect(result).toEqual({
			success: false,
			requiresConfirmation: false,
			message: "Please enter a valid email address.",
		});
	});

	it("confirms a subscription with a valid token", async () => {
		await service.subscribe("confirm@example.com");
		const token = extractToken();

		const result = await service.confirmEmail(token);

		expect(result).toEqual({
			success: true,
			message: "Your email has been confirmed successfully!",
		});

		const subscribers = service.exportSubscribers("confirmed");
		expect(subscribers).toHaveLength(1);
		expect(subscribers[0]?.email).toBe("confirm@example.com");
	});

	it("handles invalid confirmation tokens", async () => {
		const result = await service.confirmEmail("fake-token");

		expect(result).toEqual({
			success: false,
			message: "Invalid or expired confirmation token.",
		});
	});

	it("prevents duplicate confirmed subscriptions", async () => {
		await service.subscribe("dup@example.com");
		await service.confirmEmail(extractToken());

		const result = await service.subscribe("dup@example.com");

		expect(result).toEqual({
			success: false,
			requiresConfirmation: false,
			message: "This email is already subscribed.",
		});
	});

	it("unsubscribes a confirmed user", async () => {
		await service.subscribe("goodbye@example.com");
		await service.confirmEmail(extractToken());

		const result = await service.unsubscribe("goodbye@example.com");

		expect(result).toEqual({
			success: true,
			message: "You have been unsubscribed successfully.",
		});

		const subscribers = service.exportSubscribers();
		expect(subscribers[0]?.status).toBe("unsubscribed");
	});
});
