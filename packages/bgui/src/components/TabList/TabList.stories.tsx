import type { Meta, StoryObj } from "@storybook/react";
import { TabList } from "./TabList";

const meta = {
	title: "Components/TabList",
	component: TabList,
	parameters: {
		docs: {
			description: {
				component: "A TabList component that works across web and native platforms.",
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
} satisfies Meta<typeof TabList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "TabList",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<TabList variant="solid">Solid</TabList>
			<TabList variant="soft">Soft</TabList>
			<TabList variant="outlined">Outlined</TabList>
			<TabList variant="plain">Plain</TabList>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<TabList size="sm">Small</TabList>
			<TabList size="md">Medium</TabList>
			<TabList size="lg">Large</TabList>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<TabList color="primary">Primary</TabList>
			<TabList color="neutral">Neutral</TabList>
			<TabList color="danger">Danger</TabList>
			<TabList color="success">Success</TabList>
			<TabList color="warning">Warning</TabList>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		children: "Disabled TabList",
		disabled: true,
	},
};
