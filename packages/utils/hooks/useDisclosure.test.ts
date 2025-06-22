import { act, renderHook } from "@testing-library/react-native";
import { vi } from "vitest";
import { useDisclosure } from "./useDisclosure";

describe("useDisclosure", () => {
	it("opens and closes correctly", () => {
		const { result } = renderHook(() => useDisclosure());

		act(() => {
			result.current.open();
		});
		expect(result.current.isOpen).toBe(true);

		act(() => {
			result.current.close();
		});
		expect(result.current.isOpen).toBe(false);
	});

	it("toggles state", () => {
		const { result } = renderHook(() => useDisclosure());

		act(() => {
			result.current.toggle();
		});
		expect(result.current.isOpen).toBe(true);

		act(() => {
			result.current.toggle();
		});
		expect(result.current.isOpen).toBe(false);
	});

	it("calls onOpenChange callback", () => {
		const callback = vi.fn();
		const { result } = renderHook(() => useDisclosure({ onOpenChange: callback }));

		act(() => {
			result.current.open();
		});
		expect(callback).toHaveBeenCalledWith(true);

		act(() => {
			result.current.close();
		});
		expect(callback).toHaveBeenCalledWith(false);
	});
});
