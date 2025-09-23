// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";

const meta = {
	title: "Components/Tabs",
	component: Tabs,
	parameters: {
		docs: {
			description: {
				component: "A Tabs component that works across web and native platforms.",
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
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Tabs",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Tabs variant="solid">Solid</Tabs>
			<Tabs variant="soft">Soft</Tabs>
			<Tabs variant="outlined">Outlined</Tabs>
			<Tabs variant="plain">Plain</Tabs>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<Tabs size="sm">Small</Tabs>
			<Tabs size="md">Medium</Tabs>
			<Tabs size="lg">Large</Tabs>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Tabs color="primary">Primary</Tabs>
			<Tabs color="neutral">Neutral</Tabs>
			<Tabs color="danger">Danger</Tabs>
			<Tabs color="success">Success</Tabs>
			<Tabs color="warning">Warning</Tabs>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		children: "Disabled Tabs",
		disabled: true,
	},
};
