import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { validators } from "../validation/formValidation";
import { useForm } from "./useForm";

describe("useForm", () => {
	const initialValues = {
		email: "",
		password: "",
		confirmPassword: "",
	};

	const validationRules = {
		email: validators.email,
		password: validators.password,
		confirmPassword: (value: unknown) => validators.confirmPassword(initialValues.password, value),
	};

	describe("initial state", () => {
		it("should initialize with provided values", () => {
			const { result } = renderHook(() =>
				useForm({
					initialValues,
				}),
			);

			expect(result.current.values).toEqual(initialValues);
			expect(result.current.errors).toEqual({});
			expect(result.current.touched).toEqual({});
			expect(result.current.isValid).toBe(true);
			expect(result.current.isDirty).toBe(false);
			expect(result.current.isSubmitting).toBe(false);
		});
	});

	describe("setValue", () => {
		it("should update a single field value", () => {
			const { result } = renderHook(() =>
				useForm({
					initialValues,
				}),
			);

			act(() => {
				result.current.setValue("email", "test@example.com");
			});

			expect(result.current.values.email).toBe("test@example.com");
			expect(result.current.isDirty).toBe(true);
		});

		it("should clear existing errors when field value changes", () => {
			const { result } = renderHook(() =>
				useForm({
					initialValues,
					validationRules,
				}),
			);

			// Create an error
			act(() => {
				result.current.validate();
			});

			expect(result.current.errors.email).toBeTruthy();

			// Change value should clear error
			act(() => {
				result.current.setValue("email", "new@example.com");
			});

			expect(result.current.errors.email).toBeUndefined();
		});

		it("should validate on change when validateOnChange is true", () => {
			const { result } = renderHook(() =>
				useForm({
					initialValues,
					validationRules,
					validateOnChange: true,
				}),
			);

			act(() => {
				result.current.setValue("email", "invalid");
			});

			expect(result.current.errors.email).toBe("Email is invalid");

			act(() => {
				result.current.setValue("email", "valid@example.com");
			});

			expect(result.current.errors.email).toBeUndefined();
		});
	});

	describe("setValues", () => {
		it("should update multiple values at once", () => {
			const { result } = renderHook(() =>
				useForm({
					initialValues,
				}),
			);

			act(() => {
				result.current.setValues({
					email: "test@example.com",
					password: "password123",
				});
			});

			expect(result.current.values.email).toBe("test@example.com");
			expect(result.current.values.password).toBe("password123");
			expect(result.current.isDirty).toBe(true);
		});
	});

	describe("setFieldError", () => {
		it("should set error for specific field", () => {
			const { result } = renderHook(() =>
				useForm({
					initialValues,
				}),
			);

			act(() => {
				result.current.setFieldError("email", "Custom error");
			});

			expect(result.current.errors.email).toBe("Custom error");
			expect(result.current.isValid).toBe(false);
		});
	});

	describe("setErrors", () => {
		it("should set multiple errors", () => {
			const { result } = renderHook(() =>
				useForm({
					initialValues,
				}),
			);

			act(() => {
				result.current.setErrors({
					email: "Email error",
					password: "Password error",
				});
			});

			expect(result.current.errors).toEqual({
				email: "Email error",
				password: "Password error",
			});
			expect(result.current.isValid).toBe(false);
		});
	});

	describe("setFieldTouched", () => {
		it("should mark field as touched", () => {
			const { result } = renderHook(() =>
				useForm({
					initialValues,
				}),
			);

			act(() => {
				result.current.setFieldTouched("email");
			});

			expect(result.current.touched.email).toBe(true);
		});

		it("should validate on blur when validateOnBlur is true", () => {
			const { result } = renderHook(() =>
				useForm({
					initialValues,
					validationRules,
					validateOnBlur: true,
				}),
			);

			act(() => {
				result.current.setFieldTouched("email");
			});

			expect(result.current.errors.email).toBe("Email is required");
		});

		it("should not validate on blur when validateOnBlur is false", () => {
			const { result } = renderHook(() =>
				useForm({
					initialValues,
					validationRules,
					validateOnBlur: false,
				}),
			);

			act(() => {
				result.current.setFieldTouched("email");
			});

			expect(result.current.errors.email).toBeUndefined();
		});
	});

	describe("setTouched", () => {
		it("should set multiple touched fields", () => {
			const { result } = renderHook(() =>
				useForm({
					initialValues,
				}),
			);

			act(() => {
				result.current.setTouched({
					email: true,
					password: true,
				});
			});

			expect(result.current.touched).toEqual({
				email: true,
				password: true,
			});
		});
	});

	describe("validateField", () => {
		it("should validate single field", () => {
			const { result } = renderHook(() =>
				useForm({
					initialValues,
					validationRules,
				}),
			);

			let isValid: boolean;
			act(() => {
				isValid = result.current.validateField("email");
			});

			expect(isValid!).toBe(false);
			expect(result.current.errors.email).toBe("Email is required");

			act(() => {
				result.current.setValue("email", "valid@example.com");
				isValid = result.current.validateField("email");
			});

			expect(isValid!).toBe(true);
			expect(result.current.errors.email).toBeUndefined();
		});

		it("should return true when no validation rules", () => {
			const { result } = renderHook(() =>
				useForm({
					initialValues,
				}),
			);

			let isValid: boolean;
			act(() => {
				isValid = result.current.validateField("email");
			});

			expect(isValid!).toBe(true);
		});
	});

	describe("validate", () => {
		it("should validate entire form", () => {
			const { result } = renderHook(() =>
				useForm({
					initialValues,
					validationRules,
				}),
			);

			let isValid: boolean;
			act(() => {
				isValid = result.current.validate();
			});

			expect(isValid!).toBe(false);
			expect(result.current.errors).toHaveProperty("email");
			expect(result.current.errors).toHaveProperty("password");
			expect(Object.keys(result.current.touched).length).toBe(3);
		});

		it("should return true when no validation rules", () => {
			const { result } = renderHook(() =>
				useForm({
					initialValues,
				}),
			);

			let isValid: boolean;
			act(() => {
				isValid = result.current.validate();
			});

			expect(isValid!).toBe(true);
		});

		it("should mark all fields as touched", () => {
			const { result } = renderHook(() =>
				useForm({
					initialValues,
					validationRules,
				}),
			);

			act(() => {
				result.current.validate();
			});

			expect(result.current.touched).toEqual({
				email: true,
				password: true,
				confirmPassword: true,
			});
		});
	});

	describe("handleSubmit", () => {
		it("should call onSubmit when form is valid", async () => {
			const onSubmit = vi.fn();
			const { result } = renderHook(() =>
				useForm({
					initialValues: {
						email: "test@example.com",
						password: "password123",
						confirmPassword: "password123",
					},
					validationRules,
				}),
			);

			await act(async () => {
				await result.current.handleSubmit(onSubmit)();
			});

			expect(onSubmit).toHaveBeenCalledWith({
				email: "test@example.com",
				password: "password123",
				confirmPassword: "password123",
			});
		});

		it("should not call onSubmit when form is invalid", async () => {
			const onSubmit = vi.fn();
			const { result } = renderHook(() =>
				useForm({
					initialValues,
					validationRules,
				}),
			);

			await act(async () => {
				await result.current.handleSubmit(onSubmit)();
			});

			expect(onSubmit).not.toHaveBeenCalled();
			expect(result.current.errors).toHaveProperty("email");
		});

		it("should handle async onSubmit", async () => {
			const onSubmit = vi.fn().mockResolvedValue(undefined);
			const { result } = renderHook(() =>
				useForm({
					initialValues: {
						email: "test@example.com",
						password: "password123",
						confirmPassword: "password123",
					},
					validationRules,
				}),
			);

			const submitPromise = act(async () => {
				await result.current.handleSubmit(onSubmit)();
			});

			// Check submitting state
			expect(result.current.isSubmitting).toBe(true);

			await submitPromise;

			expect(result.current.isSubmitting).toBe(false);
			expect(onSubmit).toHaveBeenCalled();
		});

		it("should reset submitting state on error", async () => {
			const onSubmit = vi.fn().mockRejectedValue(new Error("Submit failed"));
			const { result } = renderHook(() =>
				useForm({
					initialValues: {
						email: "test@example.com",
						password: "password123",
						confirmPassword: "password123",
					},
					validationRules,
				}),
			);

			await act(async () => {
				try {
					await result.current.handleSubmit(onSubmit)();
				} catch {
					// Expected error
				}
			});

			expect(result.current.isSubmitting).toBe(false);
		});
	});

	describe("reset", () => {
		it("should reset form to initial state", () => {
			const { result } = renderHook(() =>
				useForm({
					initialValues,
					validationRules,
				}),
			);

			// Modify form state
			act(() => {
				result.current.setValue("email", "test@example.com");
				result.current.setFieldError("password", "Error");
				result.current.setFieldTouched("email");
			});

			expect(result.current.isDirty).toBe(true);
			expect(result.current.values.email).toBe("test@example.com");

			// Reset
			act(() => {
				result.current.reset();
			});

			expect(result.current.values).toEqual(initialValues);
			expect(result.current.errors).toEqual({});
			expect(result.current.touched).toEqual({});
			expect(result.current.isDirty).toBe(false);
			expect(result.current.isSubmitting).toBe(false);
		});
	});

	describe("resetField", () => {
		it("should reset single field to initial value", () => {
			const { result } = renderHook(() =>
				useForm({
					initialValues,
					validationRules,
				}),
			);

			// Modify field
			act(() => {
				result.current.setValue("email", "modified@example.com");
				result.current.setFieldError("email", "Error");
				result.current.setFieldTouched("email");
			});

			// Reset field
			act(() => {
				result.current.resetField("email");
			});

			expect(result.current.values.email).toBe("");
			expect(result.current.errors.email).toBeUndefined();
			expect(result.current.touched.email).toBeUndefined();
		});

		it("should not affect other fields", () => {
			const { result } = renderHook(() =>
				useForm({
					initialValues,
				}),
			);

			act(() => {
				result.current.setValue("email", "email@example.com");
				result.current.setValue("password", "pass123");
			});

			act(() => {
				result.current.resetField("email");
			});

			expect(result.current.values.email).toBe("");
			expect(result.current.values.password).toBe("pass123");
		});
	});
});
