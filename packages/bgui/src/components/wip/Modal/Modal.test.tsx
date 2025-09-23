// @ts-nocheck
import { fireEvent, render, screen } from "@testing-library/react";
import type React from "react";
import { Modal } from "./Modal";

// Mock createPortal to render in the same container
jest.mock("react-dom", () => ({
	...jest.requireActual("react-dom"),
	createPortal: (children: React.ReactNode) => children,
}));

describe("Modal", () => {
	beforeEach(() => {
		// Clear DOM before each test
		document.body.innerHTML = "";
	});

	it("renders children when open", () => {
		render(
			<Modal open>
				<div>Test Modal Content</div>
			</Modal>,
		);

		expect(screen.getByText("Test Modal Content")).toBeInTheDocument();
	});

	it("does not render children when closed", () => {
		render(
			<Modal open={false}>
				<div>Test Modal Content</div>
			</Modal>,
		);

		expect(screen.queryByText("Test Modal Content")).not.toBeInTheDocument();
	});

	it("renders backdrop by default", () => {
		render(
			<Modal open>
				<div>Test Modal Content</div>
			</Modal>,
		);

		// Check that backdrop exists (it has a negative z-index and fixed positioning)
		const backdrop = document.querySelector('[style*="position: fixed"][style*="z-index: -1"]');
		expect(backdrop).toBeInTheDocument();
	});

	it("does not render backdrop when hideBackdrop is true", () => {
		render(
			<Modal open hideBackdrop>
				<div>Test Modal Content</div>
			</Modal>,
		);

		// Check that no backdrop exists
		const backdrop = document.querySelector('[style*="position: fixed"][style*="z-index: -1"]');
		expect(backdrop).not.toBeInTheDocument();
	});

	it("calls onClose when backdrop is clicked", () => {
		const handleClose = jest.fn();
		render(
			<Modal open onClose={handleClose}>
				<div>Test Modal Content</div>
			</Modal>,
		);

		// Find and click the backdrop
		const backdrop = document.querySelector('[style*="position: fixed"][style*="z-index: -1"]');
		if (backdrop) {
			fireEvent.click(backdrop);
		}

		expect(handleClose).toHaveBeenCalledTimes(1);
		expect(handleClose).toHaveBeenCalledWith(expect.any(Object), "backdropClick");
	});

	it("calls onClose when Escape key is pressed", () => {
		const handleClose = jest.fn();
		render(
			<Modal open onClose={handleClose}>
				<div>Test Modal Content</div>
			</Modal>,
		);

		fireEvent.keyDown(document, { key: "Escape" });

		expect(handleClose).toHaveBeenCalledTimes(1);
		expect(handleClose).toHaveBeenCalledWith(expect.any(Object), "escapeKeyDown");
	});

	it("does not call onClose when Escape key is pressed and disableEscapeKeyDown is true", () => {
		const handleClose = jest.fn();
		render(
			<Modal open onClose={handleClose} disableEscapeKeyDown>
				<div>Test Modal Content</div>
			</Modal>,
		);

		fireEvent.keyDown(document, { key: "Escape" });

		expect(handleClose).not.toHaveBeenCalled();
	});

	it("keeps modal mounted when keepMounted is true and modal is closed", () => {
		render(
			<Modal open={false} keepMounted>
				<div>Test Modal Content</div>
			</Modal>,
		);

		// Modal should be in DOM but hidden
		expect(screen.getByText("Test Modal Content")).toBeInTheDocument();

		// Check that the modal has visibility: hidden
		const modalRoot = document.querySelector('[style*="visibility: hidden"]');
		expect(modalRoot).toBeInTheDocument();
	});

	it("applies accessibility props correctly", () => {
		render(
			<Modal
				open
				aria-label="Test Modal"
				aria-describedby="modal-description"
				aria-labelledby="modal-title"
			>
				<div>Test Modal Content</div>
			</Modal>,
		);

		const modal = screen.getByRole("dialog");
		expect(modal).toHaveAttribute("aria-label", "Test Modal");
		expect(modal).toHaveAttribute("aria-describedby", "modal-description");
		expect(modal).toHaveAttribute("aria-labelledby", "modal-title");
		expect(modal).toHaveAttribute("aria-modal", "true");
	});

	it("applies custom testID", () => {
		render(
			<Modal open testID="custom-modal">
				<div>Test Modal Content</div>
			</Modal>,
		);

		const modal = screen.getByTestId("custom-modal");
		expect(modal).toBeInTheDocument();
	});

	it("applies custom styles", () => {
		const customStyle = { backgroundColor: "red", padding: "20px" };
		render(
			<Modal open style={customStyle}>
				<div>Test Modal Content</div>
			</Modal>,
		);

		const modal = screen.getByRole("dialog");
		expect(modal).toHaveStyle("background-color: red");
		expect(modal).toHaveStyle("padding: 20px");
	});

	it("adds tabIndex -1 to children if not specified", () => {
		render(
			<Modal open>
				<div>Test Modal Content</div>
			</Modal>,
		);

		const content = screen.getByText("Test Modal Content");
		expect(content).toHaveAttribute("tabIndex", "-1");
	});

	it("preserves existing tabIndex on children", () => {
		render(
			<Modal open>
				<div>Test Modal Content</div>
			</Modal>,
		);

		const content = screen.getByText("Test Modal Content");
		expect(content).toHaveAttribute("tabIndex", "0");
	});
});
