import { TextInput } from "@braingame/bgui";
import React from "react";
import { measureRenders } from "reassure";

describe("TextInput Performance", () => {
	test("Basic TextInput renders efficiently", async () => {
		await measureRenders(<TextInput value="" onValueChange={() => {}} placeholder="Enter text" />);
	});

	test("TextInput with error renders efficiently", async () => {
		await measureRenders(
			<TextInput value="test" onValueChange={() => {}} placeholder="Enter text" variant="error" />,
		);
	});

	test("Secure TextInput renders efficiently", async () => {
		await measureRenders(
			<TextInput
				value="password123"
				onValueChange={() => {}}
				placeholder="Enter password"
				secureTextEntry
			/>,
		);
	});
});
