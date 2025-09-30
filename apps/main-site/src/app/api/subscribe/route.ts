import { type NextRequest, NextResponse } from "next/server";
import { trackEvent } from "../../../lib/analytics";
import { EmailService } from "../../../lib/email-service";
import { validateEmail } from "../../../lib/email-validation";
import { checkRateLimit } from "../../../lib/rate-limiter";

const emailService = new EmailService();

const extractClientIdentifier = (request: NextRequest) => {
	const forwardedFor = request.headers.get("x-forwarded-for");
	if (forwardedFor) {
		return forwardedFor.split(",")[0]?.trim() ?? "unknown";
	}
	const realIp = request.headers.get("x-real-ip");
	if (realIp) {
		return realIp.trim();
	}
	return "unknown";
};

const parseRequestBody = async (request: NextRequest) => {
	try {
		return await request.json();
	} catch (_error) {
		return { error: "Invalid request format" } as const;
	}
};

export async function POST(request: NextRequest) {
	const body = await parseRequestBody(request);
	if ("error" in body) {
		return NextResponse.json(
			{
				success: false,
				message: body.error,
			},
			{ status: 400 },
		);
	}

	const email = typeof body.email === "string" ? body.email.trim() : "";
	const clientId = extractClientIdentifier(request);

	if (!email) {
		return NextResponse.json(
			{
				success: false,
				message: "Please provide a valid email address",
			},
			{ status: 400 },
		);
	}

	const rateResult = checkRateLimit(clientId);
	if (!rateResult.allowed) {
		return NextResponse.json(
			{
				success: false,
				message: "Too many requests. Please try again later.",
			},
			{
				status: 429,
				headers: rateResult.retryAfter
					? { "Retry-After": String(rateResult.retryAfter) }
					: undefined,
			},
		);
	}

	const validation = validateEmail(email);
	if (!validation.isValid) {
		return NextResponse.json(
			{
				success: false,
				message: "Please provide a valid email address",
			},
			{ status: 400 },
		);
	}

	trackEvent("email_subscribe_attempt", {
		email,
		source: "api",
		ip: clientId,
	});

	try {
		const result = await emailService.subscribe(email, "api");
		if (result.success) {
			trackEvent("email_subscribe_success", {
				email,
				source: "api",
				requiresConfirmation: result.requiresConfirmation,
			});
		}

		return NextResponse.json(
			{
				success: result.success,
				message: result.message,
			},
			{ status: result.success ? 200 : 400 },
		);
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown error";
		trackEvent("email_subscribe_error", {
			email,
			error: message,
			source: "api",
		});

		return NextResponse.json(
			{
				success: false,
				message: "An error occurred. Please try again later.",
			},
			{ status: 500 },
		);
	}
}
