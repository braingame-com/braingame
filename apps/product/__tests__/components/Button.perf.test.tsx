import { Button } from "@braingame/bgui";
import React from "react";
import { measureRenders } from "reassure";

describe("Button Performance", () => {
	test("Primary Button renders efficiently", async () => {
		await measureRenders(<Button onPress={() => {}} variant="primary" title="Click me" />);
	});

	test("Loading Button renders efficiently", async () => {
		await measureRenders(<Button onPress={() => {}} variant="primary" title="Loading" loading />);
	});

	test("Disabled Button renders efficiently", async () => {
		await measureRenders(<Button onPress={() => {}} variant="primary" title="Disabled" disabled />);
	});
});
