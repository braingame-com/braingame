import { describe, it } from "@jest/globals";
import {
	calculateRiskScore,
	checkDisposableEmail,
	detectTypo,
	validateEmail,
} from "../email-validation";

describe("Email Validation", () => {
	describe("validateEmail", () => {
		it("should accept valid email addresses", () => {
			const validEmails = [
				"test@example.com",
				"user.name@company.org",
				"test+tag@email.co.uk",
				"123@numbers.com",
				"test_underscore@test.com",
			];

			for (const email of validEmails) {
				expect(validateEmail(email).isValid).toBe(true);
			}
		});

		it("should reject invalid email addresses", () => {
			const invalidEmails = [
				"notanemail",
				"@example.com",
				"test@",
				"test..double@example.com",
				"test@example..com",
				"test @example.com",
				"test@exam ple.com",
				"",
			];

			for (const email of invalidEmails) {
				expect(validateEmail(email).isValid).toBe(false);
			}
		});
	});

	describe("detectTypo", () => {
		it("should detect common domain typos", () => {
			expect(detectTypo("test@gmial.com")).toBe("test@gmail.com");
			expect(detectTypo("user@gmai.com")).toBe("user@gmail.com");
			expect(detectTypo("someone@outlok.com")).toBe("someone@outlook.com");
			expect(detectTypo("person@yahooo.com")).toBe("person@yahoo.com");
		});

		it("should return null for correct domains", () => {
			expect(detectTypo("test@gmail.com")).toBe(null);
			expect(detectTypo("user@outlook.com")).toBe(null);
			expect(detectTypo("person@yahoo.com")).toBe(null);
		});

		it("should handle uppercase emails", () => {
			expect(detectTypo("TEST@GMIAL.COM")).toBe("test@gmail.com");
		});
	});

	describe("checkDisposableEmail", () => {
		it("should identify disposable email domains", () => {
			const disposableEmails = [
				"test@tempmail.com",
				"user@guerrillamail.com",
				"throwaway@10minutemail.com",
				"temp@mailinator.com",
			];

			for (const email of disposableEmails) {
				expect(checkDisposableEmail(email)).toBe(true);
			}
		});

		it("should accept legitimate email domains", () => {
			const legitimateEmails = ["test@gmail.com", "user@company.com", "person@university.edu"];

			for (const email of legitimateEmails) {
				expect(checkDisposableEmail(email)).toBe(false);
			}
		});
	});

	describe("calculateRiskScore", () => {
		it("should return low risk for trusted domains", () => {
			expect(calculateRiskScore("test@gmail.com")).toBe(0);
			expect(calculateRiskScore("user@outlook.com")).toBe(0);
		});

		it("should return higher risk for disposable emails", () => {
			expect(calculateRiskScore("test@tempmail.com")).toBe(70);
			expect(calculateRiskScore("user@guerrillamail.com")).toBe(70);
		});

		it("should return medium risk for typos", () => {
			expect(calculateRiskScore("test@gmial.com")).toBe(30);
			expect(calculateRiskScore("user@outlok.com")).toBe(30);
		});

		it("should return maximum risk for invalid emails", () => {
			expect(calculateRiskScore("notanemail")).toBe(100);
			expect(calculateRiskScore("@example.com")).toBe(100);
		});
	});
});
