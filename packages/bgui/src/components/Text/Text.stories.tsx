import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";

const meta = {
	title: "Components/Text",
	component: Text,
	parameters: {
		docs: {
			description: {
				component: "A Text component that works across web and native platforms.",
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
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Text",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Text variant="solid">Solid</Text>
			<Text variant="soft">Soft</Text>
			<Text variant="outlined">Outlined</Text>
			<Text variant="plain">Plain</Text>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<Text size="sm">Small</Text>
			<Text size="md">Medium</Text>
			<Text size="lg">Large</Text>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Text color="primary">Primary</Text>
			<Text color="neutral">Neutral</Text>
			<Text color="danger">Danger</Text>
			<Text color="success">Success</Text>
			<Text color="warning">Warning</Text>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		children: "Disabled Text",
		disabled: true,
	},
};

export const FullWidth: Story = {
	args: {
		children: "Full Width Text",
		fullWidth: true,
	},
};
