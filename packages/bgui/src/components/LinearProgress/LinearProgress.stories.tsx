import type { Meta, StoryObj } from "@storybook/react";
import { LinearProgress } from "./LinearProgress";

const meta = {
	title: "Components/LinearProgress",
	component: LinearProgress,
	parameters: {
		docs: {
			description: {
				component: "A LinearProgress component that works across web and native platforms.",
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
} satisfies Meta<typeof LinearProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "LinearProgress",
	},
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<LinearProgress variant="solid">Solid</LinearProgress>
			<LinearProgress variant="soft">Soft</LinearProgress>
			<LinearProgress variant="outlined">Outlined</LinearProgress>
			<LinearProgress variant="plain">Plain</LinearProgress>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			<LinearProgress size="sm">Small</LinearProgress>
			<LinearProgress size="md">Medium</LinearProgress>
			<LinearProgress size="lg">Large</LinearProgress>
		</div>
	),
};

export const Colors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
			<LinearProgress color="primary">Primary</LinearProgress>
			<LinearProgress color="neutral">Neutral</LinearProgress>
			<LinearProgress color="danger">Danger</LinearProgress>
			<LinearProgress color="success">Success</LinearProgress>
			<LinearProgress color="warning">Warning</LinearProgress>
		</div>
	),
};

export const Disabled: Story = {
	args: {
		children: "Disabled LinearProgress",
		disabled: true,
	},
};
