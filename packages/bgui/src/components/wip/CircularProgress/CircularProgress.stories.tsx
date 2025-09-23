// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react";
import { CircularProgress } from "./CircularProgress";

const meta = {
	title: "Components/CircularProgress",
	component: CircularProgress,
	parameters: {
		docs: {
			description: {
				component: "A CircularProgress component that works across web and native platforms.",
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
} satisfies Meta<typeof CircularProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "CircularProgress",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<CircularProgress variant="solid">Solid</CircularProgress>
			<CircularProgress variant="soft">Soft</CircularProgress>
			<CircularProgress variant="outlined">Outlined</CircularProgress>
			<CircularProgress variant="plain">Plain</CircularProgress>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<CircularProgress size="sm">Small</CircularProgress>
			<CircularProgress size="md">Medium</CircularProgress>
			<CircularProgress size="lg">Large</CircularProgress>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<CircularProgress color="primary">Primary</CircularProgress>
			<CircularProgress color="neutral">Neutral</CircularProgress>
			<CircularProgress color="danger">Danger</CircularProgress>
			<CircularProgress color="success">Success</CircularProgress>
			<CircularProgress color="warning">Warning</CircularProgress>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		children: "Disabled CircularProgress",
		disabled: true,
	},
};
