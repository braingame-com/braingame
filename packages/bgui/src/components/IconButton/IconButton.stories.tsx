import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";

const meta = {
	title: "Components/IconButton",
	component: IconButton,
	parameters: {
		docs: {
			description: {
				component: "A IconButton component that works across web and native platforms.",
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
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "IconButton",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<IconButton variant="solid">Solid</IconButton>
			<IconButton variant="soft">Soft</IconButton>
			<IconButton variant="outlined">Outlined</IconButton>
			<IconButton variant="plain">Plain</IconButton>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<IconButton size="sm">Small</IconButton>
			<IconButton size="md">Medium</IconButton>
			<IconButton size="lg">Large</IconButton>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<IconButton color="primary">Primary</IconButton>
			<IconButton color="neutral">Neutral</IconButton>
			<IconButton color="danger">Danger</IconButton>
			<IconButton color="success">Success</IconButton>
			<IconButton color="warning">Warning</IconButton>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		children: "Disabled IconButton",
		disabled: true,
	},
};
