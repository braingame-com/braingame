import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useAsyncOperation, useAsyncState } from "./useAsyncState";

describe("useAsyncState", () => {
	describe("initial state", () => {
		it("should initialize with undefined data by default", () => {
			const { result } = renderHook(() => useAsyncState());

			expect(result.current.data).toBeUndefined();
			expect(result.current.loading).toBe(false);
			expect(result.current.error).toBe("");
		});

		it("should initialize with provided initial data", () => {
			const initialData = { id: 1, name: "Test" };
			const { result } = renderHook(() => useAsyncState(initialData));

			expect(result.current.data).toEqual(initialData);
			expect(result.current.loading).toBe(false);
			expect(result.current.error).toBe("");
		});
	});

	describe("execute", () => {
		it("should handle successful async operation", async () => {
			const { result } = renderHook(() => useAsyncState<string>());
			const mockData = "test data";

			let promiseResult: string | undefined;

			await act(async () => {
				promiseResult = await result.current.execute(async () => {
					await new Promise((resolve) => setTimeout(resolve, 10));
					return mockData;
				});
			});

			expect(promiseResult).toBe(mockData);
			expect(result.current.data).toBe(mockData);
			expect(result.current.loading).toBe(false);
			expect(result.current.error).toBe("");
		});

		it("should set loading state during async operation", async () => {
			const { result } = renderHook(() => useAsyncState());

			let loadingDuringExecution = false;

			act(() => {
				result.current.execute(async () => {
					loadingDuringExecution = result.current.loading;
					await new Promise((resolve) => setTimeout(resolve, 10));
					return "data";
				});
			});

			// Check loading is true immediately after calling execute
			expect(result.current.loading).toBe(true);

			await waitFor(() => {
				expect(result.current.loading).toBe(false);
			});
		});

		it("should handle async operation errors", async () => {
			const { result } = renderHook(() => useAsyncState());
			const errorMessage = "Test error";

			await expect(
				act(async () => {
					await result.current.execute(async () => {
						throw new Error(errorMessage);
					});
				}),
			).rejects.toThrow(errorMessage);

			expect(result.current.data).toBeUndefined();
			expect(result.current.loading).toBe(false);
			expect(result.current.error).toBe(errorMessage);
		});

		it("should handle non-Error objects thrown", async () => {
			const { result } = renderHook(() => useAsyncState());

			await expect(
				act(async () => {
					await result.current.execute(async () => {
						throw "String error";
					});
				}),
			).rejects.toBe("String error");

			expect(result.current.error).toBe("An error occurred");
		});

		it("should clear previous error on new execution", async () => {
			const { result } = renderHook(() => useAsyncState<string>());

			// First execution with error
			try {
				await act(async () => {
					await result.current.execute(async () => {
						throw new Error("First error");
					});
				});
			} catch {
				// Expected error
			}

			expect(result.current.error).toBe("First error");

			// Second successful execution
			await act(async () => {
				await result.current.execute(async () => "success");
			});

			expect(result.current.error).toBe("");
			expect(result.current.data).toBe("success");
		});
	});

	describe("setData", () => {
		it("should update data directly", () => {
			const { result } = renderHook(() => useAsyncState<number>());

			act(() => {
				result.current.setData(42);
			});

			expect(result.current.data).toBe(42);
		});

		it("should allow setting data to undefined", () => {
			const { result } = renderHook(() => useAsyncState<string>("initial"));

			act(() => {
				result.current.setData(undefined);
			});

			expect(result.current.data).toBeUndefined();
		});
	});

	describe("setError", () => {
		it("should update error directly", () => {
			const { result } = renderHook(() => useAsyncState());

			act(() => {
				result.current.setError("Custom error message");
			});

			expect(result.current.error).toBe("Custom error message");
		});
	});

	describe("reset", () => {
		it("should reset to initial state", async () => {
			const initialData = { id: 1 };
			const { result } = renderHook(() => useAsyncState(initialData));

			// Execute and modify state
			await act(async () => {
				await result.current.execute(async () => ({ id: 2 }));
			});

			act(() => {
				result.current.setError("Some error");
			});

			// Reset
			act(() => {
				result.current.reset();
			});

			expect(result.current.data).toEqual(initialData);
			expect(result.current.loading).toBe(false);
			expect(result.current.error).toBe("");
		});

		it("should reset to undefined if no initial data", async () => {
			const { result } = renderHook(() => useAsyncState<string>());

			await act(async () => {
				await result.current.execute(async () => "some data");
			});

			act(() => {
				result.current.reset();
			});

			expect(result.current.data).toBeUndefined();
		});
	});
});

describe("useAsyncOperation", () => {
	describe("initial state", () => {
		it("should initialize with default values", () => {
			const { result } = renderHook(() => useAsyncOperation());

			expect(result.current.loading).toBe(false);
			expect(result.current.error).toBe("");
		});
	});

	describe("execute", () => {
		it("should handle successful async operation", async () => {
			const { result } = renderHook(() => useAsyncOperation());
			const mockFn = vi.fn();

			await act(async () => {
				await result.current.execute(async () => {
					await new Promise((resolve) => setTimeout(resolve, 10));
					mockFn();
				});
			});

			expect(mockFn).toHaveBeenCalledOnce();
			expect(result.current.loading).toBe(false);
			expect(result.current.error).toBe("");
		});

		it("should set loading state during operation", async () => {
			const { result } = renderHook(() => useAsyncOperation());

			act(() => {
				result.current.execute(async () => {
					await new Promise((resolve) => setTimeout(resolve, 10));
				});
			});

			expect(result.current.loading).toBe(true);

			await waitFor(() => {
				expect(result.current.loading).toBe(false);
			});
		});

		it("should handle operation errors", async () => {
			const { result } = renderHook(() => useAsyncOperation());
			const errorMessage = "Operation failed";

			await expect(
				act(async () => {
					await result.current.execute(async () => {
						throw new Error(errorMessage);
					});
				}),
			).rejects.toThrow(errorMessage);

			expect(result.current.loading).toBe(false);
			expect(result.current.error).toBe(errorMessage);
		});

		it("should handle non-Error objects", async () => {
			const { result } = renderHook(() => useAsyncOperation());

			await expect(
				act(async () => {
					await result.current.execute(async () => {
						throw { custom: "error" };
					});
				}),
			).rejects.toEqual({ custom: "error" });

			expect(result.current.error).toBe("An error occurred");
		});
	});

	describe("setError", () => {
		it("should update error message", () => {
			const { result } = renderHook(() => useAsyncOperation());

			act(() => {
				result.current.setError("Manual error");
			});

			expect(result.current.error).toBe("Manual error");
		});
	});

	describe("reset", () => {
		it("should reset state to initial values", async () => {
			const { result } = renderHook(() => useAsyncOperation());

			// Create some state
			try {
				await act(async () => {
					await result.current.execute(async () => {
						throw new Error("Test error");
					});
				});
			} catch {
				// Expected
			}

			expect(result.current.error).toBe("Test error");

			// Reset
			act(() => {
				result.current.reset();
			});

			expect(result.current.loading).toBe(false);
			expect(result.current.error).toBe("");
		});
	});
});
