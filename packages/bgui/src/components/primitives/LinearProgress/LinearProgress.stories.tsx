import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "../Box";
import { Stack } from "../Stack";
import { Typography } from "../Typography";
import { LinearProgress } from "./LinearProgress";

const meta = {
	title: "Feedback/LinearProgress",
	component: LinearProgress,
	tags: ["autodocs"],
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
		determinate: {
			control: "boolean",
		},
		value: {
			control: { type: "number", min: 0, max: 100, step: 5 },
		},
	},
} satisfies Meta<typeof LinearProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		determinate: true,
		value: 45,
	},
	render: (args) => (
		<Box style={{ width: 320 }}>
			<Typography level="body-sm" style={{ marginBottom: 8 }}>
				Uploading files…
			</Typography>
			<LinearProgress {...args} />
		</Box>
	),
};

export const Indeterminate: Story = {
	args: {
		determinate: false,
	},
	render: () => (
		<Box style={{ width: 320 }}>
			<Typography level="body-sm" style={{ marginBottom: 8 }}>
				Preparing environment…
			</Typography>
			<LinearProgress />
		</Box>
	),
};

export const Variants: Story = {
	render: () => (
		<Stack spacing="sm" style={{ width: 320 }}>
			<LinearProgress variant="solid" determinate value={60}>
				<Typography level="body-xs" textColor="#ffffff">
					Solid
				</Typography>
			</LinearProgress>
			<LinearProgress variant="soft" determinate value={40}>
				<Typography level="body-xs">Soft</Typography>
			</LinearProgress>
			<LinearProgress variant="outlined" determinate value={30}>
				<Typography level="body-xs">Outlined</Typography>
			</LinearProgress>
			<LinearProgress variant="plain" determinate value={80}>
				<Typography level="body-xs">Plain</Typography>
			</LinearProgress>
		</Stack>
	),
};

export const Sizes: Story = {
	render: () => (
		<Stack spacing="sm" style={{ width: 320 }}>
			<LinearProgress size="sm" determinate value={30}>
				<Typography level="body-xs">Small</Typography>
			</LinearProgress>
			<LinearProgress size="md" determinate value={50}>
				<Typography level="body-xs">Medium</Typography>
			</LinearProgress>
			<LinearProgress size="lg" determinate value={70}>
				<Typography level="body-xs">Large</Typography>
			</LinearProgress>
		</Stack>
	),
};
