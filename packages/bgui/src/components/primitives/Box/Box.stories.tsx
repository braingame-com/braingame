import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "../Typography";
import { Box } from "./Box";

const meta = {
	title: "Primitives/Box",
	component: Box,
	parameters: {
		docs: {
			description: {
				component:
					"Theme-aware layout primitive that exposes spacing, layout, and color props via Restyle.",
			},
		},
	},
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof Box>;

export const Playground: Story = {
	args: {
		padding: "md",
		backgroundColor: "primaryContainer",
		borderRadius: "md",
		children: "Box content",
	},
};

export const LayoutExamples: Story = {
	render: () => (
		<Box flexDirection="row" gap="md">
			<Box padding="sm" backgroundColor="primary" borderRadius="sm">
				<Typography level="body-sm" textColor="onPrimary">
					Primary
				</Typography>
			</Box>
			<Box padding="sm" backgroundColor="surfaceVariant" borderRadius="sm">
				<Typography level="body-sm" textColor="onSurfaceVariant">
					Surface Variant
				</Typography>
			</Box>
			<Box padding="sm" backgroundColor="success" borderRadius="sm">
				<Typography level="body-sm" textColor="onSuccess">
					Success
				</Typography>
			</Box>
		</Box>
	),
};
