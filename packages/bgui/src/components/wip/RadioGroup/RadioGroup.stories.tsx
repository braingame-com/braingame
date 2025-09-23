// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./RadioGroup";

const meta = {
	title: "Components/RadioGroup",
	component: RadioGroup,
	parameters: {
		docs: {
			description: {
				component: "A RadioGroup component that works across web and native platforms.",
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
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "RadioGroup",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<RadioGroup variant="solid">Solid</RadioGroup>
			<RadioGroup variant="soft">Soft</RadioGroup>
			<RadioGroup variant="outlined">Outlined</RadioGroup>
			<RadioGroup variant="plain">Plain</RadioGroup>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<RadioGroup size="sm">Small</RadioGroup>
			<RadioGroup size="md">Medium</RadioGroup>
			<RadioGroup size="lg">Large</RadioGroup>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<RadioGroup color="primary">Primary</RadioGroup>
			<RadioGroup color="neutral">Neutral</RadioGroup>
			<RadioGroup color="danger">Danger</RadioGroup>
			<RadioGroup color="success">Success</RadioGroup>
			<RadioGroup color="warning">Warning</RadioGroup>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		children: "Disabled RadioGroup",
		disabled: true,
	},
};
