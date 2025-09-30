import type { Meta, StoryObj } from "@storybook/react";
import { type ReactNode, useState } from "react";
import { Box } from "../../primitives/Box";
import { Button } from "../../primitives/Button";
import { Stack } from "../../primitives/Stack";
import { Typography } from "../../primitives/Typography";
import { Modal } from "./Modal";

const meta: Meta<typeof Modal> = {
	title: "Components/Modal",
	component: Modal,
	parameters: {
		docs: {
			description: {
				component:
					"A cross-platform modal surface that manages focus, accessibility, and background interactions.",
			},
		},
	},
	argTypes: {
		open: { control: "boolean" },
		hideBackdrop: { control: "boolean" },
		disableEscapeKeyDown: { control: "boolean" },
		disableAutoFocus: { control: "boolean" },
		disableEnforceFocus: { control: "boolean" },
		disableRestoreFocus: { control: "boolean" },
		disableScrollLock: { control: "boolean" },
		keepMounted: { control: "boolean" },
		disablePortal: { control: "boolean" },
	},
};

export default meta;
type Story = StoryObj<typeof Modal>;

type ModalContentProps = {
	title: string;
	titleId?: string;
	onClose?: () => void;
	children?: ReactNode;
};

const ModalContent = ({ title, titleId, onClose, children }: ModalContentProps) => (
	<Box
		style={{
			width: 360,
			backgroundColor: "#ffffff",
			borderRadius: 16,
			padding: 24,
			shadowColor: "rgba(15, 23, 42, 0.2)",
			shadowOpacity: 0.25,
			shadowOffset: { width: 0, height: 16 },
			shadowRadius: 32,
			elevation: 8,
		}}
	>
		<Stack spacing="md">
			<Typography id={titleId} level="title-md">
				{title}
			</Typography>
			{children}
			{onClose ? (
				<Stack direction="row" spacing="sm" style={{ justifyContent: "flex-end" }}>
					<Button variant="outlined" color="neutral" onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={onClose}>Confirm</Button>
				</Stack>
			) : null}
		</Stack>
	</Box>
);

export const Default: Story = {
	render: () => {
		const [open, setOpen] = useState(false);

		return (
			<Stack spacing="lg" style={{ alignItems: "flex-start" }}>
				<Button onClick={() => setOpen(true)}>Open Modal</Button>
				<Modal open={open} onClose={() => setOpen(false)}>
					<ModalContent title="Basic Modal" onClose={() => setOpen(false)}>
						<Typography level="body-md">
							This modal provides focus management and backdrop dismissal out of the box.
						</Typography>
					</ModalContent>
				</Modal>
			</Stack>
		);
	},
};

export const WithForm: Story = {
	render: () => {
		const [open, setOpen] = useState(false);

		return (
			<Stack spacing="lg" style={{ alignItems: "flex-start" }}>
				<Button onClick={() => setOpen(true)}>Open Form Modal</Button>
				<Modal open={open} onClose={() => setOpen(false)}>
					<ModalContent title="Request Information" onClose={() => setOpen(false)}>
						<Stack spacing="sm">
							<Typography level="body-sm">Name</Typography>
							<input style={{ padding: 8, borderRadius: 8, border: "1px solid #cbd5f5" }} />
							<Typography level="body-sm">Email</Typography>
							<input
								type="email"
								style={{ padding: 8, borderRadius: 8, border: "1px solid #cbd5f5" }}
							/>
							<Typography level="body-sm">Message</Typography>
							<textarea
								rows={4}
								style={{ padding: 8, borderRadius: 8, border: "1px solid #cbd5f5" }}
							/>
						</Stack>
					</ModalContent>
				</Modal>
			</Stack>
		);
	},
};

export const NoBackdrop: Story = {
	render: () => {
		const [open, setOpen] = useState(false);

		return (
			<Stack spacing="lg" style={{ alignItems: "flex-start" }}>
				<Button onClick={() => setOpen(true)}>Open Modal (No Backdrop)</Button>
				<Modal open={open} onClose={() => setOpen(false)} hideBackdrop>
					<ModalContent title="No Backdrop" onClose={() => setOpen(false)}>
						<Typography level="body-md">
							The modal remains interactive while the page behind stays visible.
						</Typography>
					</ModalContent>
				</Modal>
			</Stack>
		);
	},
};

export const DisableEscapeKey: Story = {
	render: () => {
		const [open, setOpen] = useState(false);

		return (
			<Stack spacing="lg" style={{ alignItems: "flex-start" }}>
				<Button onClick={() => setOpen(true)}>Open Modal (Escape Disabled)</Button>
				<Modal open={open} onClose={() => setOpen(false)} disableEscapeKeyDown>
					<ModalContent title="Escape Key Disabled" onClose={() => setOpen(false)}>
						<Typography level="body-md">
							Pressing Escape will no longer close this modal. Use the action buttons instead.
						</Typography>
					</ModalContent>
				</Modal>
			</Stack>
		);
	},
};

export const KeepMounted: Story = {
	render: () => {
		const [open, setOpen] = useState(false);

		return (
			<Stack spacing="lg" style={{ alignItems: "flex-start" }}>
				<Button onClick={() => setOpen(true)}>Open Modal (Keep Mounted)</Button>
				<Modal open={open} onClose={() => setOpen(false)} keepMounted>
					<ModalContent title="Keep Mounted" onClose={() => setOpen(false)}>
						<Typography level="body-md">
							The modal stays in the DOM even when hidden, which can help preserve internal state.
						</Typography>
					</ModalContent>
				</Modal>
			</Stack>
		);
	},
};

export const ScrollLockDisabled: Story = {
	render: () => {
		const [open, setOpen] = useState(false);

		return (
			<Stack spacing="lg" style={{ minHeight: 900 }}>
				<Button onClick={() => setOpen(true)}>Open Modal (Scroll Lock Disabled)</Button>
				<Typography level="body-sm">
					Scroll the page while the modal is open to see that background scrolling is preserved.
				</Typography>
				<Modal open={open} onClose={() => setOpen(false)} disableScrollLock>
					<ModalContent title="Scroll Lock Disabled" onClose={() => setOpen(false)}>
						<Typography level="body-md">
							Background scrolling remains enabled when this modal is visible.
						</Typography>
					</ModalContent>
				</Modal>
			</Stack>
		);
	},
};

export const AccessibilityExample: Story = {
	render: () => {
		const [open, setOpen] = useState(false);

		return (
			<Stack spacing="lg" style={{ alignItems: "flex-start" }}>
				<Button onClick={() => setOpen(true)}>Open Accessible Modal</Button>
				<Modal
					open={open}
					onClose={() => setOpen(false)}
					aria-labelledby="modal-title"
					aria-describedby="modal-description"
				>
					<ModalContent
						title="Accessible Modal"
						titleId="modal-title"
						onClose={() => setOpen(false)}
					>
						<Typography id="modal-description" level="body-md">
							This modal demonstrates labelled and described content for assistive technologies.
						</Typography>
					</ModalContent>
				</Modal>
			</Stack>
		);
	},
};
