import type { Meta, StoryObj } from "@storybook/react";
import { List } from "./List";

const meta = {
	title: "Components/List",
	component: List,
	parameters: {
		docs: {
			description: {
				component: "A List component that works across web and native platforms.",
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
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "List",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<List variant="solid">Solid</List>
			<List variant="soft">Soft</List>
			<List variant="outlined">Outlined</List>
			<List variant="plain">Plain</List>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<List size="sm">Small</List>
			<List size="md">Medium</List>
			<List size="lg">Large</List>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<List color="primary">Primary</List>
			<List color="neutral">Neutral</List>
			<List color="danger">Danger</List>
			<List color="success">Success</List>
			<List color="warning">Warning</List>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		children: "Disabled List",
		disabled: true,
	},
};
