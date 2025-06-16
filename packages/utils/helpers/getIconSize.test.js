const { getIconSize } = require("./getIconSize");
const { Tokens } = require("../constants/Tokens");

describe("getIconSize", () => {
	it("returns the number when size is a number", () => {
		expect(getIconSize(24)).toBe(24);
		expect(getIconSize(32)).toBe(32);
		expect(getIconSize(0)).toBe(0);
	});

	it("returns correct token size for primary", () => {
		expect(getIconSize("primary")).toBe(Tokens.xl);
	});

	it("returns correct token size for secondary", () => {
		expect(getIconSize("secondary")).toBe(Tokens.l);
	});

	it("returns correct token size for small", () => {
		expect(getIconSize("small")).toBe(Tokens.s);
	});

	it("handles edge cases", () => {
		// Test with negative numbers
		expect(getIconSize(-10)).toBe(-10);

		// Test with decimal numbers
		expect(getIconSize(16.5)).toBe(16.5);
	});
});
