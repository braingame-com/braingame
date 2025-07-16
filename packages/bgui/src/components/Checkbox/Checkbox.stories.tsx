import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta = {
	title: "Components/Checkbox",
	component: Checkbox,
	parameters: {
		docs: {
			description: {
				component: "A Checkbox component that works across web and native platforms.",
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
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Checkbox",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Checkbox variant="solid">Solid</Checkbox>
			<Checkbox variant="soft">Soft</Checkbox>
			<Checkbox variant="outlined">Outlined</Checkbox>
			<Checkbox variant="plain">Plain</Checkbox>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<Checkbox size="sm">Small</Checkbox>
			<Checkbox size="md">Medium</Checkbox>
			<Checkbox size="lg">Large</Checkbox>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Checkbox color="primary">Primary</Checkbox>
			<Checkbox color="neutral">Neutral</Checkbox>
			<Checkbox color="danger">Danger</Checkbox>
			<Checkbox color="success">Success</Checkbox>
			<Checkbox color="warning">Warning</Checkbox>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		children: "Disabled Checkbox",
		disabled: true,
	},
};
