/**
 * Prop validation utilities for BGUI components.
 * Provides runtime validation of component props in development.
 */

/**
 * Custom error class for prop validation failures.
 * Includes component and prop name for easier debugging.
 */
export class PropValidationError extends Error {
	constructor(componentName: string, propName: string, message: string) {
		super(`[${componentName}] Invalid prop '${propName}': ${message}`);
		this.name = "PropValidationError";
	}
}

/**
 * Collection of reusable prop validators.
 * Each validator throws PropValidationError if validation fails.
 */
export const validators = {
	/**
	 * Validates that a prop value is not null or undefined.
	 * @throws {PropValidationError} If value is null or undefined
	 */
	// biome-ignore lint/suspicious/noExplicitAny: Validator needs to accept any value type
	required: (value: any, propName: string, componentName: string) => {
		if (value == null) {
			throw new PropValidationError(componentName, propName, "This prop is required");
		}
	},

	oneOf:
		<T>(allowedValues: readonly T[]) =>
		(value: T, propName: string, componentName: string) => {
			if (!allowedValues.includes(value)) {
				throw new PropValidationError(
					componentName,
					propName,
					`Must be one of: ${allowedValues.join(", ")}`,
				);
			}
		},

	// biome-ignore lint/suspicious/noExplicitAny: Validator needs to accept any value type
	number: (value: any, propName: string, componentName: string) => {
		if (typeof value !== "number" || Number.isNaN(value)) {
			throw new PropValidationError(componentName, propName, "Must be a valid number");
		}
	},

	numberRange:
		(min: number, max: number) => (value: number, propName: string, componentName: string) => {
			validators.number(value, propName, componentName);
			if (value < min || value > max) {
				throw new PropValidationError(componentName, propName, `Must be between ${min} and ${max}`);
			}
		},

	// biome-ignore lint/suspicious/noExplicitAny: Validator needs to accept any value type
	string: (value: any, propName: string, componentName: string) => {
		if (typeof value !== "string") {
			throw new PropValidationError(componentName, propName, "Must be a string");
		}
	},

	// biome-ignore lint/suspicious/noExplicitAny: Validator needs to accept any value type
	nonEmptyString: (value: any, propName: string, componentName: string) => {
		validators.string(value, propName, componentName);
		if (value.trim().length === 0) {
			throw new PropValidationError(componentName, propName, "Cannot be empty");
		}
	},

	// biome-ignore lint/suspicious/noExplicitAny: Validator needs to accept any value type
	boolean: (value: any, propName: string, componentName: string) => {
		if (typeof value !== "boolean") {
			throw new PropValidationError(componentName, propName, "Must be a boolean");
		}
	},

	// biome-ignore lint/suspicious/noExplicitAny: Validator needs to accept any value type
	function: (value: any, propName: string, componentName: string) => {
		if (typeof value !== "function") {
			throw new PropValidationError(componentName, propName, "Must be a function");
		}
	},

	// biome-ignore lint/suspicious/noExplicitAny: Validator needs to accept any value type
	array: (value: any, propName: string, componentName: string) => {
		if (!Array.isArray(value)) {
			throw new PropValidationError(componentName, propName, "Must be an array");
		}
	},

	// biome-ignore lint/suspicious/noExplicitAny: Validator needs to accept any value type
	nonEmptyArray: (value: any, propName: string, componentName: string) => {
		validators.array(value, propName, componentName);
		if (value.length === 0) {
			throw new PropValidationError(componentName, propName, "Cannot be empty");
		}
	},
};

// biome-ignore lint/suspicious/noExplicitAny: Generic validation function needs flexible types
export function validateProps<T extends Record<string, any>>(
	props: T,
	validationRules: Partial<
		// biome-ignore lint/suspicious/noExplicitAny: Validator function signature
		Record<keyof T, (value: any, propName: string, componentName: string) => void>
	>,
	componentName: string,
) {
	for (const [propName, validator] of Object.entries(validationRules)) {
		if (validator && props[propName] !== undefined) {
			// biome-ignore lint/suspicious/noExplicitAny: Type assertion needed for validator call
			(validator as any)(props[propName], propName, componentName);
		}
	}
}
