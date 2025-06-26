import { describe, expect, it } from "vitest";
import {
	combineValidators,
	commonRules,
	conditionalValidator,
	validateForm,
	validators,
} from "./formValidation";

describe("Form Validation Utilities", () => {
	describe("validators.email", () => {
		it("should accept valid email addresses", () => {
			expect(validators.email("user@example.com")).toBeNull();
			expect(validators.email("user.name@example.com")).toBeNull();
			expect(validators.email("user+tag@example.co.uk")).toBeNull();
		});

		it("should reject invalid email addresses", () => {
			expect(validators.email("")).toBe("Email is required");
			expect(validators.email("   ")).toBe("Email is required");
			expect(validators.email("notanemail")).toBe("Email is invalid");
			expect(validators.email("@example.com")).toBe("Email is invalid");
			expect(validators.email("user@")).toBe("Email is invalid");
			expect(validators.email("user@example")).toBe("Email is invalid");
		});

		it("should reject non-string values", () => {
			expect(validators.email(123)).toBe("Email must be a string");
			expect(validators.email(null)).toBe("Email must be a string");
			expect(validators.email(undefined)).toBe("Email must be a string");
			expect(validators.email([])).toBe("Email must be a string");
		});
	});

	describe("validators.password", () => {
		it("should accept valid passwords", () => {
			expect(validators.password("password123")).toBeNull();
			expect(validators.password("123456")).toBeNull();
			expect(validators.password("longpassword", 10)).toBeNull();
		});

		it("should reject passwords that are too short", () => {
			expect(validators.password("12345")).toBe("Password must be at least 6 characters");
			expect(validators.password("short", 10)).toBe("Password must be at least 10 characters");
		});

		it("should reject empty passwords", () => {
			expect(validators.password("")).toBe("Password is required");
			expect(validators.password(null)).toBe("Password must be a string");
		});

		it("should reject non-string values", () => {
			expect(validators.password(123456)).toBe("Password must be a string");
			expect(validators.password([])).toBe("Password must be a string");
		});
	});

	describe("validators.confirmPassword", () => {
		it("should accept matching passwords", () => {
			expect(validators.confirmPassword("password123", "password123")).toBeNull();
		});

		it("should reject non-matching passwords", () => {
			expect(validators.confirmPassword("password123", "password456")).toBe(
				"Passwords do not match",
			);
		});

		it("should reject empty confirmation", () => {
			expect(validators.confirmPassword("password123", "")).toBe("Please confirm your password");
		});

		it("should reject non-string values", () => {
			expect(validators.confirmPassword("password123", 123)).toBe(
				"Confirm password must be a string",
			);
		});
	});

	describe("validators.required", () => {
		it("should accept non-empty values", () => {
			expect(validators.required("value")).toBeNull();
			expect(validators.required(123)).toBeNull();
			expect(validators.required(["item"])).toBeNull();
			expect(validators.required(true)).toBeNull();
			expect(validators.required(false)).toBeNull();
		});

		it("should reject empty values", () => {
			expect(validators.required(null)).toBe("This field is required");
			expect(validators.required(undefined)).toBe("This field is required");
			expect(validators.required("")).toBe("This field is required");
			expect(validators.required("   ")).toBe("This field is required");
			expect(validators.required([])).toBe("This field is required");
		});

		it("should use custom field names", () => {
			expect(validators.required(null, "Username")).toBe("Username is required");
			expect(validators.required("", "Email")).toBe("Email is required");
		});
	});

	describe("validators.minLength", () => {
		it("should accept strings meeting minimum length", () => {
			expect(validators.minLength("hello", 5)).toBeNull();
			expect(validators.minLength("hello world", 5)).toBeNull();
		});

		it("should reject strings below minimum length", () => {
			expect(validators.minLength("hi", 5)).toBe("This field must be at least 5 characters");
			expect(validators.minLength("hi", 5, "Username")).toBe(
				"Username must be at least 5 characters",
			);
		});

		it("should reject non-string values", () => {
			expect(validators.minLength(123, 5)).toBe("This field must be a string");
		});
	});

	describe("validators.maxLength", () => {
		it("should accept strings within maximum length", () => {
			expect(validators.maxLength("hello", 10)).toBeNull();
			expect(validators.maxLength("hello", 5)).toBeNull();
		});

		it("should reject strings exceeding maximum length", () => {
			expect(validators.maxLength("hello world", 5)).toBe(
				"This field must be no more than 5 characters",
			);
			expect(validators.maxLength("toolong", 5, "Bio")).toBe(
				"Bio must be no more than 5 characters",
			);
		});

		it("should reject non-string values", () => {
			expect(validators.maxLength(123, 5)).toBe("This field must be a string");
		});
	});

	describe("validators.number", () => {
		it("should accept valid numbers", () => {
			expect(validators.number(123)).toBeNull();
			expect(validators.number("123")).toBeNull();
			expect(validators.number("123.45")).toBeNull();
			expect(validators.number(0)).toBeNull();
			expect(validators.number(-123)).toBeNull();
		});

		it("should accept empty values", () => {
			expect(validators.number(null)).toBeNull();
			expect(validators.number(undefined)).toBeNull();
			expect(validators.number("")).toBeNull();
		});

		it("should reject invalid numbers", () => {
			expect(validators.number("abc")).toBe("This field must be a valid number");
			expect(validators.number("123abc")).toBe("This field must be a valid number");
			expect(validators.number("abc", "Age")).toBe("Age must be a valid number");
		});
	});

	describe("validators.min", () => {
		it("should accept values above minimum", () => {
			expect(validators.min(10, 5)).toBeNull();
			expect(validators.min("10", 5)).toBeNull();
			expect(validators.min(5, 5)).toBeNull();
		});

		it("should reject values below minimum", () => {
			expect(validators.min(3, 5)).toBe("This field must be at least 5");
			expect(validators.min("3", 5, "Age")).toBe("Age must be at least 5");
		});

		it("should reject non-numeric values", () => {
			expect(validators.min("abc", 5)).toBe("This field must be a valid number");
		});
	});

	describe("validators.max", () => {
		it("should accept values below maximum", () => {
			expect(validators.max(5, 10)).toBeNull();
			expect(validators.max("5", 10)).toBeNull();
			expect(validators.max(10, 10)).toBeNull();
		});

		it("should reject values above maximum", () => {
			expect(validators.max(15, 10)).toBe("This field must be no more than 10");
			expect(validators.max("15", 10, "Score")).toBe("Score must be no more than 10");
		});

		it("should reject non-numeric values", () => {
			expect(validators.max("abc", 10)).toBe("This field must be a valid number");
		});
	});

	describe("validators.phone", () => {
		it("should accept valid phone numbers", () => {
			expect(validators.phone("1234567890")).toBeNull();
			expect(validators.phone("123-456-7890")).toBeNull();
			expect(validators.phone("(123) 456-7890")).toBeNull();
			expect(validators.phone("+1 123 456 7890")).toBeNull();
		});

		it("should reject invalid phone numbers", () => {
			expect(validators.phone("123")).toBe("Phone number is invalid");
			expect(validators.phone("")).toBe("Phone number is required");
		});

		it("should reject non-string values", () => {
			expect(validators.phone(1234567890)).toBe("Phone number must be a string");
		});
	});

	describe("validators.url", () => {
		it("should accept valid URLs", () => {
			expect(validators.url("https://example.com")).toBeNull();
			expect(validators.url("http://example.com")).toBeNull();
			expect(validators.url("https://example.com/path")).toBeNull();
			expect(validators.url("https://example.com:8080")).toBeNull();
		});

		it("should accept empty URLs", () => {
			expect(validators.url("")).toBeNull();
		});

		it("should reject invalid URLs", () => {
			expect(validators.url("not a url")).toBe("Invalid URL format");
			expect(validators.url("example.com")).toBe("Invalid URL format");
			expect(validators.url("://example.com")).toBe("Invalid URL format");
		});

		it("should reject non-string values", () => {
			expect(validators.url(123)).toBe("URL must be a string");
		});
	});

	describe("validators.pattern", () => {
		it("should accept values matching pattern", () => {
			expect(validators.pattern("ABC123", /^[A-Z]{3}\d{3}$/, "Invalid format")).toBeNull();
			expect(validators.pattern("hello", /^[a-z]+$/, "Invalid format")).toBeNull();
		});

		it("should reject values not matching pattern", () => {
			expect(validators.pattern("abc123", /^[A-Z]{3}\d{3}$/, "Invalid format")).toBe(
				"Invalid format",
			);
			expect(validators.pattern("hello123", /^[a-z]+$/, "Must be lowercase letters only")).toBe(
				"Must be lowercase letters only",
			);
		});

		it("should reject non-string values", () => {
			expect(validators.pattern(123, /^\d+$/, "Invalid")).toBe("Value must be a string");
		});
	});

	describe("validateForm", () => {
		it("should validate all fields in a form", () => {
			const values = {
				email: "user@example.com",
				password: "password123",
			};

			const rules = {
				email: validators.email,
				password: validators.password,
			};

			const result = validateForm(values, rules);
			expect(result.isValid).toBe(true);
			expect(result.errors).toEqual({});
		});

		it("should collect all validation errors", () => {
			const values = {
				email: "invalid",
				password: "12",
			};

			const rules = {
				email: validators.email,
				password: validators.password,
			};

			const result = validateForm(values, rules);
			expect(result.isValid).toBe(false);
			expect(result.errors).toEqual({
				email: "Email is invalid",
				password: "Password must be at least 6 characters",
			});
		});

		it("should handle missing fields", () => {
			const values = {
				email: "user@example.com",
			};

			const rules = {
				email: validators.email,
				password: validators.password,
			};

			const result = validateForm(values, rules);
			expect(result.isValid).toBe(false);
			expect(result.errors).toEqual({
				password: "Password must be a string",
			});
		});
	});

	describe("combineValidators", () => {
		it("should run multiple validators in sequence", () => {
			const combined = combineValidators(
				(value) => validators.required(value, "Username"),
				(value) => validators.minLength(value, 3, "Username"),
				(value) => validators.maxLength(value, 20, "Username"),
			);

			expect(combined("johndoe")).toBeNull();
			expect(combined("")).toBe("Username is required");
			expect(combined("ab")).toBe("Username must be at least 3 characters");
			expect(combined("thisusernameistoolong")).toBe("Username must be no more than 20 characters");
		});

		it("should stop at first error", () => {
			let validator2Called = false;
			const combined = combineValidators(
				() => "First error",
				() => {
					validator2Called = true;
					return "Second error";
				},
			);

			expect(combined("any value")).toBe("First error");
			expect(validator2Called).toBe(false);
		});
	});

	describe("conditionalValidator", () => {
		it("should apply validator when condition is true", () => {
			const validator = conditionalValidator(
				(value) => value !== null && value !== undefined,
				(value) => validators.minLength(value, 5),
			);

			expect(validator("hello")).toBeNull();
			expect(validator("hi")).toBe("This field must be at least 5 characters");
			expect(validator(null)).toBeNull();
			expect(validator(undefined)).toBeNull();
		});

		it("should skip validator when condition is false", () => {
			const validator = conditionalValidator(
				(value) => typeof value === "string" && value.startsWith("http"),
				validators.url,
			);

			expect(validator("https://example.com")).toBeNull();
			expect(validator("http://invalid")).toBe("Invalid URL format");
			expect(validator("not a url")).toBeNull(); // Condition false, so no validation
		});
	});

	describe("commonRules", () => {
		it("should provide pre-configured email validation", () => {
			expect(commonRules.emailField("user@example.com")).toBeNull();
			expect(commonRules.emailField("invalid")).toBe("Email is invalid");
		});

		it("should provide pre-configured password validation", () => {
			const passwordRule = commonRules.passwordField();
			expect(passwordRule("password123")).toBeNull();
			expect(passwordRule("12345")).toBe("Password must be at least 6 characters");

			const customPasswordRule = commonRules.passwordField(8);
			expect(customPasswordRule("1234567")).toBe("Password must be at least 8 characters");
		});

		it("should provide pre-configured required field validation", () => {
			const requiredRule = commonRules.requiredField("Username");
			expect(requiredRule("john")).toBeNull();
			expect(requiredRule("")).toBe("Username is required");
		});

		it("should provide pre-configured phone validation", () => {
			expect(commonRules.phoneField("1234567890")).toBeNull();
			expect(commonRules.phoneField("123")).toBe("Phone number is invalid");
		});

		it("should provide pre-configured URL validation", () => {
			expect(commonRules.urlField("https://example.com")).toBeNull();
			expect(commonRules.urlField("not a url")).toBe("Invalid URL format");
		});

		it("should provide pre-configured number field validation", () => {
			const numberRule = commonRules.numberField("Age");
			expect(numberRule("25")).toBeNull();
			expect(numberRule("")).toBe("Age is required");
			expect(numberRule("abc")).toBe("Age must be a valid number");
		});
	});
});
