import { fireEvent, render, screen } from "@testing-library/react";
import type React from "react";
import { Modal } from "./Modal";

jest.mock("react-dom", () => ({
	...jest.requireActual("react-dom"),
	createPortal: (children: React.ReactNode) => children,
}));

describe("Modal", () => {
	beforeEach(() => {
		document.body.innerHTML = "";
	});

	it("renders children when open", () => {
		render(
			<Modal open>
				<div>Content</div>
			</Modal>,
		);

		expect(screen.getByText("Content")).toBeInTheDocument();
	});

	it("does not render when closed and keepMounted is false", () => {
		render(
			<Modal open={false}>
				<div>Hidden</div>
			</Modal>,
		);

		expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
	});

	it("renders backdrop by default", () => {
		render(
			<Modal open>
				<div>Content</div>
			</Modal>,
		);

		expect(screen.getByTestId("bgui-modal-backdrop")).toBeInTheDocument();
	});

	it("omits backdrop when hideBackdrop is true", () => {
		render(
			<Modal open hideBackdrop>
				<div>Content</div>
			</Modal>,
		);

		expect(screen.queryByTestId("bgui-modal-backdrop")).not.toBeInTheDocument();
	});

	it("calls onClose when backdrop is clicked", () => {
		const handleClose = jest.fn();
		render(
			<Modal open onClose={handleClose}>
				<div>Content</div>
			</Modal>,
		);

		fireEvent.mouseDown(screen.getByTestId("bgui-modal-backdrop"));

		expect(handleClose).toHaveBeenCalledWith(expect.any(Object), "backdropClick");
	});

	it("calls onClose when Escape is pressed", () => {
		const handleClose = jest.fn();
		render(
			<Modal open onClose={handleClose}>
				<div>Content</div>
			</Modal>,
		);

		fireEvent.keyDown(document, { key: "Escape" });

		expect(handleClose).toHaveBeenCalledWith(expect.any(Object), "escapeKeyDown");
	});

	it("does not close when disableEscapeKeyDown is true", () => {
		const handleClose = jest.fn();
		render(
			<Modal open onClose={handleClose} disableEscapeKeyDown>
				<div>Content</div>
			</Modal>,
		);

		fireEvent.keyDown(document, { key: "Escape" });

		expect(handleClose).not.toHaveBeenCalled();
	});

	it("keeps modal mounted when keepMounted is true", () => {
		render(
			<Modal open={false} keepMounted testID="kept-modal">
				<div>Persisted</div>
			</Modal>,
		);

		const modal = screen.getByTestId("kept-modal");
		expect(modal).toBeInTheDocument();
		expect(modal).toHaveAttribute("data-state", "closed");
	});

	it("applies accessibility attributes", () => {
		render(
			<Modal open aria-label="Test" aria-labelledby="title" aria-describedby="description">
				<div>Content</div>
			</Modal>,
		);

		const modal = screen.getByRole("dialog");
		expect(modal).toHaveAttribute("aria-label", "Test");
		expect(modal).toHaveAttribute("aria-labelledby", "title");
		expect(modal).toHaveAttribute("aria-describedby", "description");
		expect(modal).toHaveAttribute("aria-modal", "true");
	});

	it("applies custom testID", () => {
		render(
			<Modal open testID="custom-modal">
				<div>Content</div>
			</Modal>,
		);

		expect(screen.getByTestId("custom-modal")).toBeInTheDocument();
	});

	it("applies custom styles", () => {
		render(
			<Modal open style={{ backgroundColor: "rgb(255, 0, 0)", padding: 32 }}>
				<div>Content</div>
			</Modal>,
		);

		const modal = screen.getByRole("dialog");
		expect(modal).toHaveStyle({ backgroundColor: "rgb(255, 0, 0)" });
		expect(modal).toHaveStyle({ padding: "32px" });
	});

	it("adds tabIndex -1 to children when not provided", () => {
		render(
			<Modal open>
				<div>Focusable</div>
			</Modal>,
		);

		expect(screen.getByText("Focusable")).toHaveAttribute("tabIndex", "-1");
	});

	it("preserves existing child tabIndex", () => {
		render(
			<Modal open>
				<button type="button" tabIndex={0}>
					Focusable
				</button>
			</Modal>,
		);

		expect(screen.getByRole("button", { name: "Focusable" })).toHaveAttribute("tabIndex", "0");
	});
});
