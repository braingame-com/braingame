import { fireEvent } from "@testing-library/react-native";
import { Platform, Text } from "react-native";
import { renderWithTheme } from "../../../test-utils/render-with-theme";
import { Modal } from "./Modal";

jest.mock("react-native/Libraries/Modal/Modal", () => {
	const React = require("react");
	const MockModal = ({ visible, children }: { visible: boolean; children: React.ReactNode }) => {
		return visible ? React.createElement(React.Fragment, null, children) : null;
	};
	return {
		__esModule: true,
		default: MockModal,
	};
});

describe("Modal (native)", () => {
	const originalPlatform = Platform.OS;

	beforeEach(() => {
		Platform.OS = "ios";
	});

	afterEach(() => {
		Platform.OS = originalPlatform;
	});

	it("renders children when open", () => {
		const { getByText } = renderWithTheme(
			<Modal open>
				<Text>Content</Text>
			</Modal>,
		);

		expect(getByText("Content")).toBeTruthy();
	});

	it("does not render when closed without keepMounted", () => {
		const { queryByText } = renderWithTheme(
			<Modal open={false}>
				<Text>Hidden</Text>
			</Modal>,
		);

		expect(queryByText("Hidden")).toBeNull();
	});

	it("renders backdrop by default", () => {
		const { UNSAFE_getByProps } = renderWithTheme(
			<Modal open>
				<Text>Content</Text>
			</Modal>,
		);

		expect(() => UNSAFE_getByProps({ testID: "bgui-modal-backdrop" })).not.toThrow();
	});

	it("omits backdrop when hideBackdrop is true", () => {
		const { queryByTestId } = renderWithTheme(
			<Modal open hideBackdrop>
				<Text>Content</Text>
			</Modal>,
		);

		expect(queryByTestId("bgui-modal-backdrop")).toBeNull();
	});

	it("calls onClose when backdrop is pressed", () => {
		const handleClose = jest.fn();
		const { UNSAFE_getByProps } = renderWithTheme(
			<Modal open onClose={handleClose}>
				<Text>Content</Text>
			</Modal>,
		);

		const backdrop = UNSAFE_getByProps({ testID: "bgui-modal-backdrop" });
		fireEvent.press(backdrop);

		expect(handleClose).toHaveBeenCalledWith(undefined, "backdropClick");
	});

	it("keeps modal mounted when keepMounted is true", () => {
		const { UNSAFE_getByProps } = renderWithTheme(
			<Modal open={false} keepMounted testID="kept-modal">
				<Text>Persisted</Text>
			</Modal>,
		);

		expect(() => UNSAFE_getByProps({ testID: "kept-modal" })).not.toThrow();
	});

	it("applies custom testID", () => {
		const { getByTestId } = renderWithTheme(
			<Modal open testID="custom-modal">
				<Text>Content</Text>
			</Modal>,
		);

		expect(getByTestId("custom-modal")).toBeTruthy();
	});
});
