import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "./Radio";

const meta = {
	title: "Components/Radio",
	component: Radio,
	parameters: {
		docs: {
			description: {
				component: "A Radio component that works across web and native platforms.",
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
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Radio",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Radio variant="solid">Solid</Radio>
			<Radio variant="soft">Soft</Radio>
			<Radio variant="outlined">Outlined</Radio>
			<Radio variant="plain">Plain</Radio>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<Radio size="sm">Small</Radio>
			<Radio size="md">Medium</Radio>
			<Radio size="lg">Large</Radio>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Radio color="primary">Primary</Radio>
			<Radio color="neutral">Neutral</Radio>
			<Radio color="danger">Danger</Radio>
			<Radio color="success">Success</Radio>
			<Radio color="warning">Warning</Radio>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		children: "Disabled Radio",
		disabled: true,
	},
};
