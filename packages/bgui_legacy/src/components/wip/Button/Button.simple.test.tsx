import { buttonStyles } from "@braingame/utils";
import { Button } from "./Button";

describe("Button - Simple Tests", () => {
	it("should export Button component", () => {
		expect(Button).toBeDefined();
	});

	it("should have button styles imported", () => {
		expect(buttonStyles).toBeDefined();
		expect(buttonStyles.button).toBeDefined();
		expect(buttonStyles.iconButton).toBeDefined();
	});
});
