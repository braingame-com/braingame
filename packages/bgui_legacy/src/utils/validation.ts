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
	required: (value: unknown, propName: string, componentName: string) => {
		if (value == null) {
			throw new PropValidationError(componentName, propName, "This prop is required");
		}
	},

	oneOf:
		<T>(allowedValues: readonly T[]) =>
		(value: unknown, propName: string, componentName: string) => {
			if (!allowedValues.includes(value as T)) {
				throw new PropValidationError(
					componentName,
					propName,
					`Must be one of: ${allowedValues.join(", ")}`,
				);
			}
		},

	number: (value: unknown, propName: string, componentName: string) => {
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

	string: (value: unknown, propName: string, componentName: string) => {
		if (typeof value !== "string") {
			throw new PropValidationError(componentName, propName, "Must be a string");
		}
	},

	nonEmptyString: (value: unknown, propName: string, componentName: string) => {
		validators.string(value, propName, componentName);
		if (typeof value === "string" && value.trim().length === 0) {
			throw new PropValidationError(componentName, propName, "Cannot be empty");
		}
	},

	boolean: (value: unknown, propName: string, componentName: string) => {
		if (typeof value !== "boolean") {
			throw new PropValidationError(componentName, propName, "Must be a boolean");
		}
	},

	function: (value: unknown, propName: string, componentName: string) => {
		if (typeof value !== "function") {
			throw new PropValidationError(componentName, propName, "Must be a function");
		}
	},

	array: (value: unknown, propName: string, componentName: string) => {
		if (!Array.isArray(value)) {
			throw new PropValidationError(componentName, propName, "Must be an array");
		}
	},

	nonEmptyArray: (value: unknown, propName: string, componentName: string) => {
		validators.array(value, propName, componentName);
		if (Array.isArray(value) && value.length === 0) {
			throw new PropValidationError(componentName, propName, "Cannot be empty");
		}
	},
};

type Validator = (value: unknown, propName: string, componentName: string) => void;

export function validateProps<T extends Record<string, unknown>>(
	props: T,
	validationRules: Partial<Record<keyof T, Validator>>,
	componentName: string,
) {
	for (const propName in validationRules) {
		const validator = validationRules[propName];
		if (validator && props[propName] !== undefined) {
			validator(props[propName], propName, componentName);
		}
	}
}
