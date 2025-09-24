import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta = {
	title: "Primitives/Checkbox",
	component: Checkbox,
	parameters: {
		docs: {
			description: {
				component: "Cross-platform checkbox primitive supporting Joy-inspired variants.",
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
	},
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "Checkbox",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Checkbox variant="solid" label="Solid" />
			<Checkbox variant="soft" label="Soft" />
			<Checkbox variant="outlined" label="Outlined" />
			<Checkbox variant="plain" label="Plain" />
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<Checkbox size="sm" label="Small" />
			<Checkbox size="md" label="Medium" />
			<Checkbox size="lg" label="Large" />
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Checkbox color="primary" label="Primary" />
			<Checkbox color="neutral" label="Neutral" />
			<Checkbox color="danger" label="Danger" />
			<Checkbox color="success" label="Success" />
			<Checkbox color="warning" label="Warning" />
		</div>
	),
};

export const Disabled: Story = {
	args: {
		label: "Disabled",
		disabled: true,
	},
};
