import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta = {
	title: "Components/Textarea",
	component: Textarea,
	parameters: {
		docs: {
			description: {
				component: "A Textarea component that works across web and native platforms.",
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
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Textarea",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Textarea variant="solid">Solid</Textarea>
			<Textarea variant="soft">Soft</Textarea>
			<Textarea variant="outlined">Outlined</Textarea>
			<Textarea variant="plain">Plain</Textarea>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<Textarea size="sm">Small</Textarea>
			<Textarea size="md">Medium</Textarea>
			<Textarea size="lg">Large</Textarea>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Textarea color="primary">Primary</Textarea>
			<Textarea color="neutral">Neutral</Textarea>
			<Textarea color="danger">Danger</Textarea>
			<Textarea color="success">Success</Textarea>
			<Textarea color="warning">Warning</Textarea>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		children: "Disabled Textarea",
		disabled: true,
	},
};
