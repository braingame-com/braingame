// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta = {
	title: "Components/Input",
	component: Input,
	parameters: {
		docs: {
			description: {
				component: "A Input component that works across web and native platforms.",
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
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Input",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Input variant="solid">Solid</Input>
			<Input variant="soft">Soft</Input>
			<Input variant="outlined">Outlined</Input>
			<Input variant="plain">Plain</Input>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<Input size="sm">Small</Input>
			<Input size="md">Medium</Input>
			<Input size="lg">Large</Input>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Input color="primary">Primary</Input>
			<Input color="neutral">Neutral</Input>
			<Input color="danger">Danger</Input>
			<Input color="success">Success</Input>
			<Input color="warning">Warning</Input>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		children: "Disabled Input",
		disabled: true,
	},
};
