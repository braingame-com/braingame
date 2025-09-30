import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import { Stack } from "../Stack";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
	title: "Primitives/Skeleton",
	component: Skeleton,
	args: {
		animation: "pulse",
		variant: "text",
		width: 200,
		height: 16,
	},
	argTypes: {
		animation: {
			control: "radio",
			options: ["pulse", "wave", false],
		},
		variant: {
			control: "select",
			options: ["text", "inline", "rectangular", "circular", "overlay"],
		},
		level: {
			control: "select",
			options: [
				"h1",
				"h2",
				"h3",
				"h4",
				"title-lg",
				"title-md",
				"title-sm",
				"body-lg",
				"body-md",
				"body-sm",
				"body-xs",
			],
		},
	},
	parameters: {
		layout: "centered",
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		"aria-label": "Loading content",
	},
};

export const Variants: Story = {
	render: () => (
		<Stack spacing="lg">
			<Skeleton width={220} height={16} />
			<Skeleton variant="inline" width={140} />
			<Skeleton variant="rectangular" width={220} height={120} />
			<Skeleton variant="circular" width={48} height={48} />
		</Stack>
	),
};

export const WaveAnimation: Story = {
	render: () => (
		<Stack spacing="md">
			<Skeleton animation="wave" width={220} height={16} />
			<Skeleton animation="wave" variant="rectangular" width={220} height={120} />
		</Stack>
	),
};

export const Overlay: Story = {
	render: () => (
		<View style={{ width: 220, height: 120 }}>
			<View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.1)", borderRadius: 8 }} />
			<Skeleton variant="overlay" loading animation="wave" />
		</View>
	),
};
