import { getPaddingForSize, VARIANT_COLORS, validationRules } from "./styles";

describe("Button Styles", () => {
	describe("getPaddingForSize", () => {
		it("should return correct padding for sm size", () => {
			const padding = getPaddingForSize("sm");
			expect(padding).toEqual({
				paddingVertical: 8,
				paddingHorizontal: 16,
			});
		});

		it("should return correct padding for md size", () => {
			const padding = getPaddingForSize("md");
			expect(padding).toEqual({
				paddingVertical: 12,
				paddingHorizontal: 24,
			});
		});

		it("should return correct padding for lg size", () => {
			const padding = getPaddingForSize("lg");
			expect(padding).toEqual({
				paddingVertical: 16,
				paddingHorizontal: 32,
			});
		});

		it("should return md padding for invalid size", () => {
			const padding = getPaddingForSize("invalid" as any);
			expect(padding).toEqual({
				paddingVertical: 12,
				paddingHorizontal: 24,
			});
		});
	});

	describe("VARIANT_COLORS", () => {
		it("should have all required variants", () => {
			expect(Object.keys(VARIANT_COLORS)).toEqual([
				"primary",
				"secondary",
				"ghost",
				"danger",
				"icon",
			]);
		});

		it("should have correct colors for primary variant", () => {
			expect(VARIANT_COLORS.primary).toMatchObject({
				background: expect.any(String),
				text: expect.any(String),
			});
		});
	});

	describe("validationRules", () => {
		it("should have validation for required props", () => {
			expect(validationRules).toHaveProperty("onPress");
			expect(validationRules.onPress).toMatchObject({
				required: true,
				type: "function",
			});
		});

		it("should have validation for variant prop", () => {
			expect(validationRules).toHaveProperty("variant");
			expect(validationRules.variant).toMatchObject({
				type: "string",
				oneOf: ["primary", "secondary", "ghost", "danger", "icon"],
			});
		});
	});
});
