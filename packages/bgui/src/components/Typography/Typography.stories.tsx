import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./Typography";

const meta = {
	title: "Components/Typography",
	component: Typography,
	parameters: {
		docs: {
			description: {
				component: "A Typography component that works across web and native platforms.",
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
		fullWidth: {
			control: "boolean",
		},
	},
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Typography",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Typography variant="solid">Solid</Typography>
			<Typography variant="soft">Soft</Typography>
			<Typography variant="outlined">Outlined</Typography>
			<Typography variant="plain">Plain</Typography>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<Typography size="sm">Small</Typography>
			<Typography size="md">Medium</Typography>
			<Typography size="lg">Large</Typography>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Typography color="primary">Primary</Typography>
			<Typography color="neutral">Neutral</Typography>
			<Typography color="danger">Danger</Typography>
			<Typography color="success">Success</Typography>
			<Typography color="warning">Warning</Typography>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		children: "Disabled Typography",
		disabled: true,
	},
};

export const FullWidth: Story = {
	args: {
		children: "Full Width Typography",
		fullWidth: true,
	},
};
