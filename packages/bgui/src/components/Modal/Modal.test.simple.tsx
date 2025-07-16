import React from "react";
import { Modal } from "./Modal.web";

// Simple compilation test
export function SimpleModalTest() {
	return (
		<Modal open={true} onClose={() => console.log("close")}>
			<div>Test content</div>
		</Modal>
	);
}

// Test all props
export function FullModalTest() {
	return (
		<Modal
			open={true}
			onClose={() => console.log("close")}
			container={document.body}
			disableAutoFocus={false}
			disableEnforceFocus={false}
			disableEscapeKeyDown={false}
			disablePortal={false}
			disableRestoreFocus={false}
			disableScrollLock={false}
			hideBackdrop={false}
			keepMounted={false}
			style={{ backgroundColor: "red" }}
			testID="modal-test"
			role="dialog"
			aria-label="Test Modal"
			aria-describedby="modal-description"
			aria-labelledby="modal-title"
		>
			<div id="modal-description">Test content with all props</div>
		</Modal>
	);
}
