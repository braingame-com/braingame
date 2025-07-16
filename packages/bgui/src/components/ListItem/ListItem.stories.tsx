import type { Meta, StoryObj } from "@storybook/react";
import { ListItem } from "./ListItem";

const meta = {
	title: "Components/ListItem",
	component: ListItem,
	parameters: {
		docs: {
			description: {
				component: "A ListItem component that works across web and native platforms.",
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
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "ListItem",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<ListItem variant="solid">Solid</ListItem>
			<ListItem variant="soft">Soft</ListItem>
			<ListItem variant="outlined">Outlined</ListItem>
			<ListItem variant="plain">Plain</ListItem>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<ListItem size="sm">Small</ListItem>
			<ListItem size="md">Medium</ListItem>
			<ListItem size="lg">Large</ListItem>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<ListItem color="primary">Primary</ListItem>
			<ListItem color="neutral">Neutral</ListItem>
			<ListItem color="danger">Danger</ListItem>
			<ListItem color="success">Success</ListItem>
			<ListItem color="warning">Warning</ListItem>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		children: "Disabled ListItem",
		disabled: true,
	},
};
