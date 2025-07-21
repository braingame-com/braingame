import * as logger from "firebase-functions/logger";
import { onRequest } from "firebase-functions/v2/https";

export const api = onRequest((_request, response) => {
	logger.info("Hello logs!", { structuredData: true });
	response.send("Hello from Firebase!");
});

/*
import * as functions from "firebase-functions";

export const api = functions.https.onRequest((req, res) => {
	res.send("Hello from Firebase!");
});
*/

// Something
// Added to fix linting issue
