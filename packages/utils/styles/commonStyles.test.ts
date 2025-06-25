import { Platform } from "react-native";
import { describe, expect, it, vi } from "vitest";
import {
	createButtonStyle,
	createContainerStyle,
	createInputStyle,
	dimensions,
	fonts,
	layout,
	platformStyles,
	shadows,
	spacing,
	textPresets,
} from "./commonStyles";

// Mock React Native Platform
vi.mock("react-native", () => ({
	Platform: {
		OS: "ios",
		select: vi.fn((options) => options.ios || options.default),
	},
	StyleSheet: {
		hairlineWidth: 1,
	},
}));

describe("Common Styles", () => {
	describe("shadows", () => {
		it("should have all shadow presets", () => {
			expect(shadows).toHaveProperty("none");
			expect(shadows).toHaveProperty("small");
			expect(shadows).toHaveProperty("medium");
			expect(shadows).toHaveProperty("large");
			expect(shadows).toHaveProperty("xl");
		});

		it("should have correct shadow properties", () => {
			expect(shadows.none.shadowOpacity).toBe(0);
			expect(shadows.small.elevation).toBe(2);
			expect(shadows.medium.shadowRadius).toBe(8);
			expect(shadows.large.shadowOffset).toEqual({ width: 0, height: 8 });
			expect(shadows.xl.shadowOpacity).toBe(0.2);
		});
	});

	describe("spacing", () => {
		it("should have consistent spacing values", () => {
			expect(spacing.xs).toBe(4);
			expect(spacing.s).toBe(8);
			expect(spacing.m).toBe(16);
			expect(spacing.l).toBe(24);
			expect(spacing.xl).toBe(32);
			expect(spacing.xxl).toBe(48);
			expect(spacing.xxxl).toBe(64);
		});
	});

	describe("dimensions", () => {
		it("should have standard dimensions", () => {
			expect(dimensions.buttonHeight).toBe(48);
			expect(dimensions.inputHeight).toBe(48);
			expect(dimensions.borderRadius).toBe(8);
			expect(dimensions.borderWidth).toBe(1);
		});
	});

	describe("fonts", () => {
		it("should have font family definitions", () => {
			expect(fonts).toHaveProperty("primary");
			expect(fonts).toHaveProperty("secondary");
			expect(fonts).toHaveProperty("mono");
		});
	});

	describe("layout", () => {
		it("should have common layout styles", () => {
			expect(layout.center).toEqual({
				alignItems: "center",
				justifyContent: "center",
			});

			expect(layout.flexRow).toEqual({
				flexDirection: "row",
			});

			expect(layout.flexRowCenter).toEqual({
				flexDirection: "row",
				alignItems: "center",
			});

			expect(layout.flex1).toEqual({
				flex: 1,
			});
		});
	});

	describe("textPresets", () => {
		it("should have all text size presets", () => {
			expect(textPresets).toHaveProperty("h1");
			expect(textPresets).toHaveProperty("h2");
			expect(textPresets).toHaveProperty("h3");
			expect(textPresets).toHaveProperty("h4");
			expect(textPresets).toHaveProperty("h5");
			expect(textPresets).toHaveProperty("body");
			expect(textPresets).toHaveProperty("caption");
			expect(textPresets).toHaveProperty("button");
		});

		it("should have correct font sizes", () => {
			expect(textPresets.h1.fontSize).toBe(32);
			expect(textPresets.body.fontSize).toBe(16);
			expect(textPresets.caption.fontSize).toBe(12);
		});
	});

	describe("platformStyles", () => {
		it("should have platform-specific values", () => {
			// Test iOS platform
			(Platform as { OS: string }).OS = "ios";
			expect(platformStyles.keyboardAvoidingView.behavior).toBe("padding");
			expect(platformStyles.statusBarHeight).toBe(44);
			expect(platformStyles.navBarHeight).toBe(64);
		});

		it("should have correct keyboard avoiding view config", () => {
			expect(platformStyles.keyboardAvoidingView).toHaveProperty("behavior");
			expect(platformStyles.keyboardAvoidingView).toHaveProperty("style");
			expect(platformStyles.keyboardAvoidingView.style).toEqual({ flex: 1 });
		});
	});

	describe("createButtonStyle", () => {
		it("should create button style with defaults", () => {
			const style = createButtonStyle();

			expect(style).toMatchObject({
				height: dimensions.buttonSizes.medium,
				borderRadius: dimensions.borderRadiusValues.large,
				alignItems: "center",
				justifyContent: "center",
				paddingHorizontal: spacing.l,
			});
		});

		it("should create button style with custom height and radius", () => {
			const style = createButtonStyle(40, 4);

			expect(style.height).toBe(40);
			expect(style.borderRadius).toBe(4);
		});
	});

	describe("createInputStyle", () => {
		it("should create input style with defaults", () => {
			const style = createInputStyle();

			expect(style).toMatchObject({
				height: dimensions.inputSizes.medium,
				borderRadius: dimensions.borderRadiusValues.medium,
				paddingHorizontal: spacing.m,
				borderWidth: dimensions.borderWidthValues.thin,
			});
		});

		it("should create input style with custom height and radius", () => {
			const style = createInputStyle(56, 8);

			expect(style.height).toBe(56);
			expect(style.borderRadius).toBe(8);
		});
	});

	describe("createContainerStyle", () => {
		it("should create container style with defaults", () => {
			const style = createContainerStyle();

			expect(style).toMatchObject({
				flex: 1,
				padding: spacing.l,
			});
		});

		it("should create container with custom padding", () => {
			const style = createContainerStyle(spacing.xl);

			expect(style.padding).toBe(spacing.xl);
		});

		it("should create container with background color", () => {
			const style = createContainerStyle(spacing.m, "#f0f0f0");

			expect(style.backgroundColor).toBe("#f0f0f0");
			expect(style.padding).toBe(spacing.m);
		});
	});
});
