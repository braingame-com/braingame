import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta = {
	title: "Components/Skeleton",
	component: Skeleton,
	parameters: {
		docs: {
			description: {
				component: "A Skeleton component that works across web and native platforms.",
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
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Skeleton",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Skeleton variant="solid">Solid</Skeleton>
			<Skeleton variant="soft">Soft</Skeleton>
			<Skeleton variant="outlined">Outlined</Skeleton>
			<Skeleton variant="plain">Plain</Skeleton>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<Skeleton size="sm">Small</Skeleton>
			<Skeleton size="md">Medium</Skeleton>
			<Skeleton size="lg">Large</Skeleton>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<Skeleton color="primary">Primary</Skeleton>
			<Skeleton color="neutral">Neutral</Skeleton>
			<Skeleton color="danger">Danger</Skeleton>
			<Skeleton color="success">Success</Skeleton>
			<Skeleton color="warning">Warning</Skeleton>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		children: "Disabled Skeleton",
		disabled: true,
	},
};
