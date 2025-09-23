// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";

const meta = {
	title: "Components/Tooltip",
	component: Tooltip,
	parameters: {
		docs: {
			description: {
				component: "A Tooltip component that works across web and native platforms.",
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
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Tooltip",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Tooltip variant="solid">Solid</Tooltip>
			<Tooltip variant="soft">Soft</Tooltip>
			<Tooltip variant="outlined">Outlined</Tooltip>
			<Tooltip variant="plain">Plain</Tooltip>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<Tooltip size="sm">Small</Tooltip>
			<Tooltip size="md">Medium</Tooltip>
			<Tooltip size="lg">Large</Tooltip>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Tooltip color="primary">Primary</Tooltip>
			<Tooltip color="neutral">Neutral</Tooltip>
			<Tooltip color="danger">Danger</Tooltip>
			<Tooltip color="success">Success</Tooltip>
			<Tooltip color="warning">Warning</Tooltip>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		children: "Disabled Tooltip",
		disabled: true,
	},
};
