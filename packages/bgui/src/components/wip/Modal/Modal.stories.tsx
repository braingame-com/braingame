// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react";
import type React from "react";
import { useState } from "react";
import { Modal } from "./Modal";

const meta = {
	title: "Components/Modal",
	component: Modal,
	parameters: {
		docs: {
			description: {
				component:
					"A Modal component that displays content in a layer above the page. Features focus management, backdrop blur, and accessibility support.",
			},
		},
	},
	argTypes: {
		open: {
			control: "boolean",
		},
		hideBackdrop: {
			control: "boolean",
		},
		disableEscapeKeyDown: {
			control: "boolean",
		},
		disableAutoFocus: {
			control: "boolean",
		},
		disableEnforceFocus: {
			control: "boolean",
		},
		disableRestoreFocus: {
			control: "boolean",
		},
		disableScrollLock: {
			control: "boolean",
		},
		keepMounted: {
			control: "boolean",
		},
		disablePortal: {
			control: "boolean",
		},
	},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Modal content component for examples
const ModalContent = ({
	title,
	children,
	onClose,
}: {
	title: string;
	children?: React.ReactNode;
	onClose?: () => void;
}) => (
	<div
		style={{
			position: "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			backgroundColor: "white",
			borderRadius: "8px",
			boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
			padding: "24px",
			minWidth: "300px",
			maxWidth: "500px",
			outline: "none",
		}}
	>
		<h2 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "600" }}>{title}</h2>
		{children}
		{onClose && (
			<div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end", gap: "8px" }}>
				<button
					onClick={onClose}
					style={{
						padding: "8px 16px",
						border: "1px solid #ccc",
						borderRadius: "4px",
						backgroundColor: "white",
						cursor: "pointer",
					}}
				>
					Cancel
				</button>
				<button
					onClick={onClose}
					style={{
						padding: "8px 16px",
						border: "none",
						borderRadius: "4px",
						backgroundColor: "#007bff",
						color: "white",
						cursor: "pointer",
					}}
				>
					Confirm
				</button>
			</div>
		)}
	</div>
);

export const Default: Story = {
	render: () => {
		const [open, setOpen] = useState(false);

		return (
			<>
				<button
					onClick={() => setOpen(true)}
					style={{
						padding: "8px 16px",
						border: "none",
						borderRadius: "4px",
						backgroundColor: "#007bff",
						color: "white",
						cursor: "pointer",
					}}
				>
					Open Modal
				</button>
				<Modal open={open} onClose={() => setOpen(false)}>
					<ModalContent title="Basic Modal" onClose={() => setOpen(false)}>
						<p>This is a basic modal with a backdrop and focus management.</p>
					</ModalContent>
				</Modal>
			</>
		);
	},
};

export const WithForm: Story = {
	render: () => {
		const [open, setOpen] = useState(false);

		return (
			<>
				<button
					onClick={() => setOpen(true)}
					style={{
						padding: "8px 16px",
						border: "none",
						borderRadius: "4px",
						backgroundColor: "#007bff",
						color: "white",
						cursor: "pointer",
					}}
				>
					Open Form Modal
				</button>
				<Modal open={open} onClose={() => setOpen(false)}>
					<ModalContent title="Form Modal" onClose={() => setOpen(false)}>
						<form>
							<div style={{ marginBottom: "16px" }}>
								<label style={{ display: "block", marginBottom: "4px" }}>Name:</label>
								<input
									type="text"
									style={{
										width: "100%",
										padding: "8px",
										border: "1px solid #ccc",
										borderRadius: "4px",
									}}
								/>
							</div>
							<div style={{ marginBottom: "16px" }}>
								<label style={{ display: "block", marginBottom: "4px" }}>Email:</label>
								<input
									type="email"
									style={{
										width: "100%",
										padding: "8px",
										border: "1px solid #ccc",
										borderRadius: "4px",
									}}
								/>
							</div>
							<div>
								<label style={{ display: "block", marginBottom: "4px" }}>Message:</label>
								<textarea
									rows={4}
									style={{
										width: "100%",
										padding: "8px",
										border: "1px solid #ccc",
										borderRadius: "4px",
									}}
								/>
							</div>
						</form>
					</ModalContent>
				</Modal>
			</>
		);
	},
};

export const NoBackdrop: Story = {
	render: () => {
		const [open, setOpen] = useState(false);

		return (
			<>
				<button
					onClick={() => setOpen(true)}
					style={{
						padding: "8px 16px",
						border: "none",
						borderRadius: "4px",
						backgroundColor: "#007bff",
						color: "white",
						cursor: "pointer",
					}}
				>
					Open Modal (No Backdrop)
				</button>
				<Modal open={open} onClose={() => setOpen(false)} hideBackdrop>
					<ModalContent title="No Backdrop Modal" onClose={() => setOpen(false)}>
						<p>This modal has no backdrop, so you can still see the page behind it.</p>
					</ModalContent>
				</Modal>
			</>
		);
	},
};

export const DisableEscapeKey: Story = {
	render: () => {
		const [open, setOpen] = useState(false);

		return (
			<>
				<button
					onClick={() => setOpen(true)}
					style={{
						padding: "8px 16px",
						border: "none",
						borderRadius: "4px",
						backgroundColor: "#007bff",
						color: "white",
						cursor: "pointer",
					}}
				>
					Open Modal (Escape Disabled)
				</button>
				<Modal open={open} onClose={() => setOpen(false)} disableEscapeKeyDown>
					<ModalContent title="Escape Key Disabled" onClose={() => setOpen(false)}>
						<p>Press ESC - it won't close this modal. Use the button instead.</p>
					</ModalContent>
				</Modal>
			</>
		);
	},
};

export const KeepMounted: Story = {
	render: () => {
		const [open, setOpen] = useState(false);

		return (
			<>
				<button
					onClick={() => setOpen(true)}
					style={{
						padding: "8px 16px",
						border: "none",
						borderRadius: "4px",
						backgroundColor: "#007bff",
						color: "white",
						cursor: "pointer",
					}}
				>
					Open Modal (Keep Mounted)
				</button>
				<Modal open={open} onClose={() => setOpen(false)} keepMounted>
					<ModalContent title="Keep Mounted Modal" onClose={() => setOpen(false)}>
						<p>This modal stays in the DOM even when closed (keepMounted=true).</p>
					</ModalContent>
				</Modal>
			</>
		);
	},
};

export const ScrollLockDisabled: Story = {
	render: () => {
		const [open, setOpen] = useState(false);

		return (
			<>
				<div style={{ height: "150vh", padding: "20px" }}>
					<button
						onClick={() => setOpen(true)}
						style={{
							padding: "8px 16px",
							border: "none",
							borderRadius: "4px",
							backgroundColor: "#007bff",
							color: "white",
							cursor: "pointer",
						}}
					>
						Open Modal (Scroll Lock Disabled)
					</button>
					<p>This page is taller than the viewport. The modal won't prevent scrolling.</p>
				</div>
				<Modal open={open} onClose={() => setOpen(false)} disableScrollLock>
					<ModalContent title="Scroll Lock Disabled" onClose={() => setOpen(false)}>
						<p>Background scrolling is still enabled while this modal is open.</p>
					</ModalContent>
				</Modal>
			</>
		);
	},
};

export const AccessibilityExample: Story = {
	render: () => {
		const [open, setOpen] = useState(false);

		return (
			<>
				<button
					onClick={() => setOpen(true)}
					style={{
						padding: "8px 16px",
						border: "none",
						borderRadius: "4px",
						backgroundColor: "#007bff",
						color: "white",
						cursor: "pointer",
					}}
				>
					Open Accessible Modal
				</button>
				<Modal
					open={open}
					onClose={() => setOpen(false)}
					aria-labelledby="modal-title"
					aria-describedby="modal-description"
				>
					<ModalContent title="Accessible Modal" onClose={() => setOpen(false)}>
						<p id="modal-description">
							This modal demonstrates proper accessibility features including:
							<br />• Focus management and trapping
							<br />• ARIA attributes for screen readers
							<br />• Keyboard navigation support
							<br />• Proper role and labeling
						</p>
					</ModalContent>
				</Modal>
			</>
		);
	},
};
