import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";

const meta = {
	title: "Components/Alert",
	component: Alert,
	parameters: {
		docs: {
			description: {
				component: "A Alert component that works across web and native platforms.",
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
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Alert",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Alert variant="solid">Solid</Alert>
			<Alert variant="soft">Soft</Alert>
			<Alert variant="outlined">Outlined</Alert>
			<Alert variant="plain">Plain</Alert>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<Alert size="sm">Small</Alert>
			<Alert size="md">Medium</Alert>
			<Alert size="lg">Large</Alert>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Alert color="primary">Primary</Alert>
			<Alert color="neutral">Neutral</Alert>
			<Alert color="danger">Danger</Alert>
			<Alert color="success">Success</Alert>
			<Alert color="warning">Warning</Alert>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		children: "Disabled Alert",
		disabled: true,
	},
};
