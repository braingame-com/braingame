import { Button } from "@braingame/bgui";
import React from "react";
import { measureRenders } from "reassure";

describe("Button Performance", () => {
	test("Primary Button renders efficiently", async () => {
		await measureRenders(
			<Button onPress={() => {}} variant="primary">
				Click me
			</Button>,
		);
	});

	test("Loading Button renders efficiently", async () => {
		await measureRenders(
			<Button onPress={() => {}} variant="primary" loading>
				Loading
			</Button>,
		);
	});

	test("Disabled Button renders efficiently", async () => {
		await measureRenders(
			<Button onPress={() => {}} variant="primary" disabled>
				Disabled
			</Button>,
		);
	});
});
