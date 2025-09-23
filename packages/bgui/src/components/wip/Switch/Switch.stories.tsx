// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";

const meta = {
	title: "Components/Switch",
	component: Switch,
	parameters: {
		docs: {
			description: {
				component: "A Switch component that works across web and native platforms.",
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
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Switch",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Switch variant="solid">Solid</Switch>
			<Switch variant="soft">Soft</Switch>
			<Switch variant="outlined">Outlined</Switch>
			<Switch variant="plain">Plain</Switch>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<Switch size="sm">Small</Switch>
			<Switch size="md">Medium</Switch>
			<Switch size="lg">Large</Switch>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Switch color="primary">Primary</Switch>
			<Switch color="neutral">Neutral</Switch>
			<Switch color="danger">Danger</Switch>
			<Switch color="success">Success</Switch>
			<Switch color="warning">Warning</Switch>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		children: "Disabled Switch",
		disabled: true,
	},
};
