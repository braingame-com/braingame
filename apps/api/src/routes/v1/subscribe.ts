import { type Request, type Response, Router } from "express";
import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { z } from "zod";
import { config } from "../../config";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

const subscribeSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }),
});

const verifyAppCheck = async (req: Request) => {
	if (config.NODE_ENV !== "production") {
		return; // Bypass in non-production environments
	}

	const appCheckToken = req.header("X-Firebase-AppCheck");

	if (!appCheckToken) {
		throw new Error("App Check token not found.");
	}

	try {
		await admin.appCheck().verifyToken(appCheckToken);
	} catch (_err) {
		throw new Error("Invalid App Check token.");
	}
};

// POST /api/v1/subscribe
router.post(
	"/",
	asyncHandler(async (req: Request, res: Response) => {
		try {
			await verifyAppCheck(req);
			const { email } = subscribeSchema.parse(req.body);

			const subscribersRef = admin.firestore().collection("subscribers");
			const existingSubscriber = await subscribersRef.where("email", "==", email).get();

			if (!existingSubscriber.empty) {
				return res.status(409).json({ message: "Email already subscribed" });
			}

			const newSubscriber = {
				email,
				createdAt: FieldValue.serverTimestamp(),
			};

			await subscribersRef.add(newSubscriber);

			return res.status(201).json({ message: "Successfully subscribed" });
		} catch (error) {
			if (error instanceof z.ZodError) {
				return res.status(400).json({ message: "Validation error", errors: error.format() });
			}

			if (
				error instanceof Error &&
				(error.message.includes("App Check") || error.message.includes("Invalid"))
			) {
				return res.status(401).json({ message: "Unauthorized" });
			}

			// The asyncHandler will catch other errors and pass them to the global error handler.
			throw error;
		}
	}),
);

export default router;
