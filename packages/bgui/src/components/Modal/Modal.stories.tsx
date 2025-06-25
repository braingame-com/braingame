import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../Button/Button";
import { Text } from "../Text/Text";
import { Modal } from "./Modal";

const meta: Meta<typeof Modal> = {
	title: "Components/Modal",
	component: Modal,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		visible: {
			control: "boolean",
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg", "fullscreen"],
		},
		variant: {
			control: "select",
			options: ["center", "bottom-sheet"],
		},
		closable: {
			control: "boolean",
		},
		backdrop: {
			control: "boolean",
		},
		onClose: {
			action: "closed",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper for modal stories
const ModalDemo = ({ children, ...args }: React.PropsWithChildren<Record<string, unknown>>) => {
	const [visible, setVisible] = useState(false);

	return (
		<>
			<Button onPress={() => setVisible(true)}>Open Modal</Button>
			<Modal {...args} visible={visible} onClose={() => setVisible(false)}>
				{children}
			</Modal>
		</>
	);
};

export const Default: Story = {
	render: (args: typeof meta.args) => (
		<ModalDemo {...args}>
			<div style={{ padding: 20 }}>
				<Text variant="title">Modal Title</Text>
				<Text style={{ marginTop: 12 }}>This is the modal content.</Text>
			</div>
		</ModalDemo>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16 }}>
			<ModalDemo size="sm">
				<div style={{ padding: 20 }}>
					<Text variant="title">Small Modal</Text>
					<Text>Compact size for simple dialogs</Text>
				</div>
			</ModalDemo>
			<ModalDemo size="md">
				<div style={{ padding: 20 }}>
					<Text variant="title">Medium Modal</Text>
					<Text>Default size for most content</Text>
				</div>
			</ModalDemo>
			<ModalDemo size="lg">
				<div style={{ padding: 20 }}>
					<Text variant="title">Large Modal</Text>
					<Text>Spacious size for complex forms</Text>
				</div>
			</ModalDemo>
		</div>
	),
};

export const BottomSheet: Story = {
	render: (args: typeof meta.args) => (
		<ModalDemo {...args} variant="bottom-sheet">
			<div style={{ padding: 20 }}>
				<Text variant="title">Bottom Sheet</Text>
				<Text style={{ marginTop: 12 }}>Mobile-friendly modal that slides up from the bottom</Text>
			</div>
		</ModalDemo>
	),
};

export const NotClosable: Story = {
	render: (args: typeof meta.args) => (
		<ModalDemo {...args} closable={false}>
			<div style={{ padding: 20 }}>
				<Text variant="title">Required Action</Text>
				<Text style={{ marginTop: 12, marginBottom: 20 }}>
					This modal cannot be closed by clicking outside or pressing Escape.
				</Text>
				<Button onPress={() => console.log("Action completed")}>Complete Action</Button>
			</div>
		</ModalDemo>
	),
};

export const NoBackdrop: Story = {
	render: (args: typeof meta.args) => (
		<ModalDemo {...args} backdrop={false}>
			<div style={{ padding: 20 }}>
				<Text variant="title">No Backdrop</Text>
				<Text>Modal without background dimming</Text>
			</div>
		</ModalDemo>
	),
};

export const WithForm: Story = {
	render: (args: typeof meta.args) => (
		<ModalDemo {...args} size="md">
			<div style={{ padding: 20 }}>
				<Text variant="title" style={{ marginBottom: 20 }}>
					User Settings
				</Text>
				<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
					<div>
						<Text variant="subtitle">Name</Text>
						<input
							type="text"
							style={{ width: "100%", padding: 8, marginTop: 4, borderRadius: 4 }}
							placeholder="Enter your name"
						/>
					</div>
					<div>
						<Text variant="subtitle">Email</Text>
						<input
							type="email"
							style={{ width: "100%", padding: 8, marginTop: 4, borderRadius: 4 }}
							placeholder="Enter your email"
						/>
					</div>
					<div style={{ display: "flex", gap: 12, marginTop: 20 }}>
						<Button variant="primary" onPress={() => console.log("Save clicked")}>
							Save
						</Button>
						<Button variant="ghost" onPress={() => console.log("Cancel clicked")}>
							Cancel
						</Button>
					</div>
				</div>
			</div>
		</ModalDemo>
	),
};
