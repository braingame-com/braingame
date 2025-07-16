import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const meta = {
	title: "Components/Select",
	component: Select,
	parameters: {
		docs: {
			description: {
				component: "A Select component that works across web and native platforms.",
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
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Select",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Select variant="solid">Solid</Select>
			<Select variant="soft">Soft</Select>
			<Select variant="outlined">Outlined</Select>
			<Select variant="plain">Plain</Select>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<Select size="sm">Small</Select>
			<Select size="md">Medium</Select>
			<Select size="lg">Large</Select>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Select color="primary">Primary</Select>
			<Select color="neutral">Neutral</Select>
			<Select color="danger">Danger</Select>
			<Select color="success">Success</Select>
			<Select color="warning">Warning</Select>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		children: "Disabled Select",
		disabled: true,
	},
};
