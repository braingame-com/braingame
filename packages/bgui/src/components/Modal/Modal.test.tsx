import { vi } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { Text } from "react-native";
import { Modal } from "./Modal";

describe("Modal", () => {
	it("renders when visible", () => {
		const { getByText } = render(
			<Modal visible={true} onClose={() => {}}>
				<Text>Modal content</Text>
			</Modal>,
		);
		expect(getByText("Modal content")).toBeTruthy();
	});

	it("does not render when not visible", () => {
		const { queryByText } = render(
			<Modal visible={false} onClose={() => {}}>
				<Text>Modal content</Text>
			</Modal>,
		);
		expect(queryByText("Modal content")).toBeNull();
	});

	it("calls onClose when backdrop pressed", () => {
		const fn = vi.fn();
		const { getByTestId } = render(
			<Modal visible={true} onClose={fn}>
				<Text>Modal content</Text>
			</Modal>,
		);

		// Find the backdrop (first Pressable in the tree)
		const backdrop = getByTestId("modal-backdrop");
		fireEvent.press(backdrop);
		expect(fn).toHaveBeenCalled();
	});

	it("does not close on backdrop press when closable is false", () => {
		const fn = vi.fn();
		const { getByTestId } = render(
			<Modal visible={true} onClose={fn} closable={false}>
				<Text>Modal content</Text>
			</Modal>,
		);

		const backdrop = getByTestId("modal-backdrop");
		fireEvent.press(backdrop);
		expect(fn).not.toHaveBeenCalled();
	});

	it("does not close on backdrop press when backdrop is false", () => {
		const fn = vi.fn();
		const { getByTestId } = render(
			<Modal visible={true} onClose={fn} backdrop={false}>
				<Text>Modal content</Text>
			</Modal>,
		);

		const backdrop = getByTestId("modal-backdrop");
		fireEvent.press(backdrop);
		expect(fn).not.toHaveBeenCalled();
	});

	it("applies size styles", () => {
		const { getByTestId } = render(
			<Modal visible={true} onClose={() => {}} size="sm">
				<Text>Small modal</Text>
			</Modal>,
		);

		const content = getByTestId("modal-content");
		expect(content.props.style).toEqual(
			expect.arrayContaining([expect.objectContaining({ width: 300 })]),
		);
	});

	it("supports different variants", () => {
		const { getByTestId } = render(
			<Modal visible={true} onClose={() => {}} variant="bottom-sheet">
				<Text>Bottom sheet</Text>
			</Modal>,
		);

		const content = getByTestId("modal-content");
		expect(content.props.style).toEqual(
			expect.arrayContaining([expect.objectContaining({ marginTop: "auto" })]),
		);
	});

	it("applies aria-label", () => {
		const { getByLabelText } = render(
			<Modal visible={true} onClose={() => {}} aria-label="Settings dialog">
				<Text>Settings</Text>
			</Modal>,
		);

		expect(getByLabelText("Settings dialog")).toBeTruthy();
	});

	it("handles onRequestClose from RNModal", () => {
		const fn = vi.fn();
		const { UNSAFE_getByType } = render(
			<Modal visible={true} onClose={fn}>
				<Text>Modal content</Text>
			</Modal>,
		);

		// Get the RNModal component and trigger onRequestClose
		const rnModal = UNSAFE_getByType(require("react-native").Modal);
		rnModal.props.onRequestClose();
		expect(fn).toHaveBeenCalled();
	});

	it("transitions visibility", async () => {
		const { queryByText, rerender } = render(
			<Modal visible={false} onClose={() => {}}>
				<Text>Modal content</Text>
			</Modal>,
		);

		expect(queryByText("Modal content")).toBeNull();

		rerender(
			<Modal visible={true} onClose={() => {}}>
				<Text>Modal content</Text>
			</Modal>,
		);

		await waitFor(() => {
			expect(queryByText("Modal content")).toBeTruthy();
		});
	});
});

// Add test IDs to Modal component for testing
// This would need to be added to the actual Modal component:
// <Pressable testID="modal-backdrop" ...>
// <View testID="modal-content" ...>
