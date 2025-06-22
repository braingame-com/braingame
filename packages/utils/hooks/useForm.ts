/**
 * useForm Hook
 * Manages form state, validation, and submission
 */

import { useCallback, useState } from "react";
import type { ValidationRules } from "../validation/formValidation";
import { validateForm } from "../validation/formValidation";

export interface UseFormConfig<T> {
	initialValues: T;
	validationRules?: ValidationRules;
	validateOnChange?: boolean;
	validateOnBlur?: boolean;
}

export interface UseFormReturn<T> {
	values: T;
	errors: Record<string, string>;
	touched: Record<string, boolean>;
	isValid: boolean;
	isDirty: boolean;
	isSubmitting: boolean;
	setValue: <K extends keyof T>(field: K, value: T[K]) => void;
	setValues: (values: Partial<T>) => void;
	setFieldError: (field: keyof T, error: string) => void;
	setErrors: (errors: Record<string, string>) => void;
	setFieldTouched: (field: keyof T, touched?: boolean) => void;
	setTouched: (touched: Record<string, boolean>) => void;
	validate: () => boolean;
	validateField: (field: keyof T) => boolean;
	handleSubmit: (onSubmit: (values: T) => void | Promise<void>) => () => Promise<void>;
	reset: () => void;
	resetField: (field: keyof T) => void;
}

/**
 * Hook for managing form state and validation
 *
 * @example
 * ```tsx
 * const form = useForm({
 *   initialValues: { email: '', password: '' },
 *   validationRules: {
 *     email: validators.email,
 *     password: validators.password,
 *   },
 * });
 *
 * return (
 *   <View>
 *     <TextInput
 *       value={form.values.email}
 *       onChangeText={(text) => form.setValue('email', text)}
 *       onBlur={() => form.setFieldTouched('email')}
 *     />
 *     {form.touched.email && form.errors.email && (
 *       <Text>{form.errors.email}</Text>
 *     )}
 *     <Button onPress={form.handleSubmit(onSubmit)} />
 *   </View>
 * );
 * ```
 */
export function useForm<T extends Record<string, unknown>>({
	initialValues,
	validationRules,
	validateOnChange = false,
	validateOnBlur = true,
}: UseFormConfig<T>): UseFormReturn<T> {
	const [values, setValuesState] = useState<T>(initialValues);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [touched, setTouched] = useState<Record<string, boolean>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isDirty, setIsDirty] = useState(false);

	// Check if form is valid
	const isValid = Object.keys(errors).length === 0;

	// Set field error
	const setFieldError = useCallback((field: keyof T, error: string) => {
		setErrors((prev) => ({ ...prev, [field as string]: error }));
	}, []);

	// Validate single field
	const validateField = useCallback(
		(field: keyof T): boolean => {
			if (!validationRules || !validationRules[field as string]) return true;

			const fieldValidator = validationRules[field as string];
			const error = fieldValidator(values[field]);

			if (error) {
				setFieldError(field, error);
				return false;
			}

			// Clear error if validation passes
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[field as string];
				return newErrors;
			});

			return true;
		},
		[values, validationRules, setFieldError],
	);

	// Set a single field value
	const setValue = useCallback(
		<K extends keyof T>(field: K, value: T[K]) => {
			setValuesState((prev) => ({ ...prev, [field]: value }));
			setIsDirty(true);

			// Clear error when user starts typing
			if (errors[field as string]) {
				setErrors((prev) => {
					const newErrors = { ...prev };
					delete newErrors[field as string];
					return newErrors;
				});
			}

			// Validate on change if enabled
			if (validateOnChange && validationRules) {
				validateField(field);
			}
		},
		[errors, validateOnChange, validationRules, validateField],
	);

	// Set multiple values at once
	const setValues = useCallback((newValues: Partial<T>) => {
		setValuesState((prev) => ({ ...prev, ...newValues }));
		setIsDirty(true);
	}, []);

	// Set field touched
	const setFieldTouched = useCallback(
		(field: keyof T, isTouched = true) => {
			setTouched((prev) => ({ ...prev, [field as string]: isTouched }));

			// Validate on blur if enabled
			if (validateOnBlur && isTouched && validationRules) {
				validateField(field);
			}
		},
		[validateOnBlur, validationRules, validateField],
	);

	// Validate entire form
	const validate = useCallback((): boolean => {
		if (!validationRules) return true;

		const result = validateForm(values as Record<string, unknown>, validationRules);
		setErrors(result.errors);

		// Mark all fields as touched
		const allTouched: Record<string, boolean> = {};
		Object.keys(values).forEach((key) => {
			allTouched[key] = true;
		});
		setTouched(allTouched);

		return result.isValid;
	}, [values, validationRules]);

	// Handle form submission
	const handleSubmit = useCallback(
		(onSubmit: (values: T) => void | Promise<void>) => {
			return async () => {
				// Validate form
				const isFormValid = validate();
				if (!isFormValid) return;

				// Set submitting state
				setIsSubmitting(true);

				try {
					await onSubmit(values);
				} finally {
					setIsSubmitting(false);
				}
			};
		},
		[validate, values],
	);

	// Reset form to initial values
	const reset = useCallback(() => {
		setValuesState(initialValues);
		setErrors({});
		setTouched({});
		setIsDirty(false);
		setIsSubmitting(false);
	}, [initialValues]);

	// Reset single field
	const resetField = useCallback(
		(field: keyof T) => {
			setValue(field, initialValues[field]);
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[field as string];
				return newErrors;
			});
			setTouched((prev) => {
				const newTouched = { ...prev };
				delete newTouched[field as string];
				return newTouched;
			});
		},
		[initialValues, setValue],
	);

	return {
		values,
		errors,
		touched,
		isValid,
		isDirty,
		isSubmitting,
		setValue,
		setValues,
		setFieldError,
		setErrors,
		setFieldTouched,
		setTouched,
		validate,
		validateField,
		handleSubmit,
		reset,
		resetField,
	};
}
