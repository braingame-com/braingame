import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";

const meta = {
	title: "Components/Modal",
	component: Modal,
	parameters: {
		docs: {
			description: {
				component: "A Modal component that works across web and native platforms.",
			},
		},
	},
	argTypes: {
		color: {
			control: "select",
			options: ["primary", "neutral", "danger", "success", "warning"],
		},
		variant: {
			control: "select",
			options: ["solid", "soft", "outlined", "plain"],
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
		},
		disabled: {
			control: "boolean",
		},
	},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Modal",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Modal variant="solid">Solid</Modal>
			<Modal variant="soft">Soft</Modal>
			<Modal variant="outlined">Outlined</Modal>
			<Modal variant="plain">Plain</Modal>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<Modal size="sm">Small</Modal>
			<Modal size="md">Medium</Modal>
			<Modal size="lg">Large</Modal>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Modal color="primary">Primary</Modal>
			<Modal color="neutral">Neutral</Modal>
			<Modal color="danger">Danger</Modal>
			<Modal color="success">Success</Modal>
			<Modal color="warning">Warning</Modal>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		children: "Disabled Modal",
		disabled: true,
	},
};
