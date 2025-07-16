import type { Meta, StoryObj } from "@storybook/react";
import { Tab } from "./Tab";

const meta = {
	title: "Components/Tab",
	component: Tab,
	parameters: {
		docs: {
			description: {
				component: "A Tab component that works across web and native platforms.",
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
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Tab",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Tab variant="solid">Solid</Tab>
			<Tab variant="soft">Soft</Tab>
			<Tab variant="outlined">Outlined</Tab>
			<Tab variant="plain">Plain</Tab>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<Tab size="sm">Small</Tab>
			<Tab size="md">Medium</Tab>
			<Tab size="lg">Large</Tab>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Tab color="primary">Primary</Tab>
			<Tab color="neutral">Neutral</Tab>
			<Tab color="danger">Danger</Tab>
			<Tab color="success">Success</Tab>
			<Tab color="warning">Warning</Tab>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		children: "Disabled Tab",
		disabled: true,
	},
};
