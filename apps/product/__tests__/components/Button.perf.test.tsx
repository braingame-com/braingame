import { Button } from "@braingame/bgui";
import React from "react";
import { measureRenders } from "reassure";

describe("Button Performance", () => {
	test("Primary Button renders efficiently", async () => {
		await measureRenders(<Button onPress={() => {}} variant="primary" label="Click me" />);
	});

	test("Loading Button renders efficiently", async () => {
		await measureRenders(<Button onPress={() => {}} variant="primary" label="Loading" isLoading />);
	});

	test("Disabled Button renders efficiently", async () => {
		await measureRenders(<Button onPress={() => {}} variant="primary" label="Disabled" disabled />);
	});
});
