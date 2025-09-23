// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react";
import { TabPanel } from "./TabPanel";

const meta = {
	title: "Components/TabPanel",
	component: TabPanel,
	parameters: {
		docs: {
			description: {
				component: "A TabPanel component that works across web and native platforms.",
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
} satisfies Meta<typeof TabPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "TabPanel",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<TabPanel variant="solid">Solid</TabPanel>
			<TabPanel variant="soft">Soft</TabPanel>
			<TabPanel variant="outlined">Outlined</TabPanel>
			<TabPanel variant="plain">Plain</TabPanel>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<TabPanel size="sm">Small</TabPanel>
			<TabPanel size="md">Medium</TabPanel>
			<TabPanel size="lg">Large</TabPanel>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<TabPanel color="primary">Primary</TabPanel>
			<TabPanel color="neutral">Neutral</TabPanel>
			<TabPanel color="danger">Danger</TabPanel>
			<TabPanel color="success">Success</TabPanel>
			<TabPanel color="warning">Warning</TabPanel>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		children: "Disabled TabPanel",
		disabled: true,
	},
};
