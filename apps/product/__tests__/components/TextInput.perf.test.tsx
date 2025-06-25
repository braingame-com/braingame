import { TextInput } from "@braingame/bgui";
import React from "react";
import { measureRenders } from "reassure";

describe("TextInput Performance", () => {
	test("Basic TextInput renders efficiently", async () => {
		await measureRenders(<TextInput value="" onChangeText={() => {}} placeholder="Enter text" />);
	});

	test("TextInput with error renders efficiently", async () => {
		await measureRenders(
			<TextInput
				value="test"
				onChangeText={() => {}}
				placeholder="Enter text"
				error="This field is required"
			/>,
		);
	});

	test("Secure TextInput renders efficiently", async () => {
		await measureRenders(
			<TextInput
				value="password123"
				onChangeText={() => {}}
				placeholder="Enter password"
				secureTextEntry
				showPasswordToggle
			/>,
		);
	});
});
