import type { Meta, StoryObj } from "@storybook/react";
import { CircularProgress } from "./CircularProgress";

const meta = {
	title: "Components/CircularProgress",
	component: CircularProgress,
	parameters: {
		docs: {
			description: {
				component:
					"CircularProgress communicates ongoing operations and can operate in determinate or indeterminate modes.",
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
			options: ["plain", "outlined", "soft", "solid"],
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
		},
		determinate: {
			control: "boolean",
		},
		value: {
			control: { type: "number", min: 0, max: 100 },
		},
	},
} satisfies Meta<typeof CircularProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Loading",
	},
};

export const Determinate: Story = {
	args: {
		determinate: true,
		value: 65,
		children: "65%",
		color: "success",
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
			<CircularProgress size="sm" determinate value={25}>
				25%
			</CircularProgress>
			<CircularProgress size="md" determinate value={50}>
				50%
			</CircularProgress>
			<CircularProgress size="lg" determinate value={85}>
				85%
			</CircularProgress>
		</div>
	),
};
