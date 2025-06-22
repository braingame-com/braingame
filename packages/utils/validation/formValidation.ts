/**
 * Form validation utilities
 * Provides common validation functions and form handling utilities
 */

export type ValidationRule = (value: unknown) => string | null;

export interface ValidationRules {
	[field: string]: ValidationRule;
}

export interface ValidationResult {
	isValid: boolean;
	errors: Record<string, string>;
}

/**
 * Common validators for form fields
 */
export const validators = {
	/**
	 * Validates email format
	 */
	email: (email: unknown): string | null => {
		if (typeof email !== "string") return "Email must be a string";
		if (!email.trim()) return "Email is required";
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Email is invalid";
		return null;
	},

	/**
	 * Validates password strength
	 */
	password: (password: unknown, minLength = 6): string | null => {
		if (typeof password !== "string") return "Password must be a string";
		if (!password) return "Password is required";
		if (password.length < minLength) return `Password must be at least ${minLength} characters`;
		return null;
	},

	/**
	 * Validates password confirmation
	 */
	confirmPassword: (password: unknown, confirmPassword: unknown): string | null => {
		if (typeof confirmPassword !== "string") return "Confirm password must be a string";
		if (!confirmPassword) return "Please confirm your password";
		if (password !== confirmPassword) return "Passwords do not match";
		return null;
	},

	/**
	 * Generic required field validator
	 */
	required: (value: unknown, fieldName = "This field"): string | null => {
		if (value === null || value === undefined) return `${fieldName} is required`;
		if (typeof value === "string" && !value.trim()) return `${fieldName} is required`;
		if (Array.isArray(value) && value.length === 0) return `${fieldName} is required`;
		return null;
	},

	/**
	 * Validates minimum length
	 */
	minLength: (value: unknown, min: number, fieldName = "This field"): string | null => {
		if (typeof value !== "string") return `${fieldName} must be a string`;
		if (value.length < min) return `${fieldName} must be at least ${min} characters`;
		return null;
	},

	/**
	 * Validates maximum length
	 */
	maxLength: (value: unknown, max: number, fieldName = "This field"): string | null => {
		if (typeof value !== "string") return `${fieldName} must be a string`;
		if (value.length > max) return `${fieldName} must be no more than ${max} characters`;
		return null;
	},

	/**
	 * Validates numeric values
	 */
	number: (value: unknown, fieldName = "This field"): string | null => {
		if (value === null || value === undefined || value === "") return null;
		const num = Number(value);
		if (Number.isNaN(num)) return `${fieldName} must be a valid number`;
		return null;
	},

	/**
	 * Validates minimum value
	 */
	min: (value: unknown, min: number, fieldName = "This field"): string | null => {
		const num = Number(value);
		if (Number.isNaN(num)) return `${fieldName} must be a valid number`;
		if (num < min) return `${fieldName} must be at least ${min}`;
		return null;
	},

	/**
	 * Validates maximum value
	 */
	max: (value: unknown, max: number, fieldName = "This field"): string | null => {
		const num = Number(value);
		if (Number.isNaN(num)) return `${fieldName} must be a valid number`;
		if (num > max) return `${fieldName} must be no more than ${max}`;
		return null;
	},

	/**
	 * Validates phone number format
	 */
	phone: (phone: unknown): string | null => {
		if (typeof phone !== "string") return "Phone number must be a string";
		if (!phone) return "Phone number is required";
		// Basic phone validation - can be customized for specific formats
		const cleaned = phone.replace(/\D/g, "");
		if (cleaned.length < 10) return "Phone number is invalid";
		return null;
	},

	/**
	 * Validates URL format
	 */
	url: (url: unknown): string | null => {
		if (typeof url !== "string") return "URL must be a string";
		if (!url) return null; // URLs are often optional
		try {
			new URL(url);
			return null;
		} catch {
			return "Invalid URL format";
		}
	},

	/**
	 * Custom regex validator
	 */
	pattern: (value: unknown, pattern: RegExp, errorMessage: string): string | null => {
		if (typeof value !== "string") return "Value must be a string";
		if (!pattern.test(value)) return errorMessage;
		return null;
	},
};

/**
 * Validates a form with multiple fields
 */
export const validateForm = (
	values: Record<string, unknown>,
	rules: ValidationRules,
): ValidationResult => {
	const errors: Record<string, string> = {};

	for (const [field, validator] of Object.entries(rules)) {
		const error = validator(values[field]);
		if (error) {
			errors[field] = error;
		}
	}

	return {
		isValid: Object.keys(errors).length === 0,
		errors,
	};
};

/**
 * Creates a validator that combines multiple validation rules
 */
export const combineValidators = (...validators: ValidationRule[]): ValidationRule => {
	return (value: unknown): string | null => {
		for (const validator of validators) {
			const error = validator(value);
			if (error) return error;
		}
		return null;
	};
};

/**
 * Creates a conditional validator
 */
export const conditionalValidator = (
	condition: (value: unknown) => boolean,
	validator: ValidationRule,
): ValidationRule => {
	return (value: unknown): string | null => {
		if (condition(value)) {
			return validator(value);
		}
		return null;
	};
};

/**
 * Common validation rule combinations
 */
export const commonRules = {
	emailField: validators.email,
	passwordField:
		(minLength = 6) =>
		(value: unknown) =>
			validators.password(value, minLength),
	requiredField: (fieldName: string) => (value: unknown) => validators.required(value, fieldName),
	phoneField: validators.phone,
	urlField: validators.url,
	numberField: (fieldName: string) =>
		combineValidators(
			(value) => validators.required(value, fieldName),
			(value) => validators.number(value, fieldName),
		),
};
