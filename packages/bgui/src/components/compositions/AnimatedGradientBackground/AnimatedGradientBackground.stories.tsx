import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import { Box } from "../../primitives/Box";
import { Button } from "../../primitives/Button";
import { Stack } from "../../primitives/Stack";
import { Typography } from "../../primitives/Typography";
import { AnimatedGradientBackground } from "./AnimatedGradientBackground";

const meta = {
	title: "Visual Effects/AnimatedGradientBackground",
	component: AnimatedGradientBackground,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
	argTypes: {
		colors: {
			control: "object",
			description: "Array of colors to use for the gradient blobs",
		},
		duration: {
			control: { type: "number", min: 1000, max: 30000, step: 1000 },
			description: "Duration of the animation cycle in milliseconds",
		},
		animate: {
			control: "boolean",
			description: "Whether to animate the background",
		},
		blobCount: {
			control: { type: "number", min: 1, max: 20, step: 1 },
			description: "Number of gradient blobs to render",
		},
		blobOpacity: {
			control: { type: "number", min: 0, max: 1, step: 0.1 },
			description: "Opacity of the gradient blobs",
		},
		blurRadius: {
			control: { type: "number", min: 0, max: 200, step: 10 },
			description: "Blur radius for the gradient effect",
		},
	},
} satisfies Meta<typeof AnimatedGradientBackground>;

export default meta;

type Story = StoryObj<typeof meta>;

const FullscreenContainer = ({ children }: { children: ReactNode }) => (
	<Box style={{ width: "100vw", height: "100vh" }}>{children}</Box>
);

export const Default: Story = {
	args: {},
	render: (args) => (
		<FullscreenContainer>
			<AnimatedGradientBackground {...args}>
				<Stack
					spacing="lg"
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Typography level="display-sm" textColor="#ffffff">
						Animated Gradient Background
					</Typography>
					<Typography level="body-lg" textColor="rgba(255, 255, 255, 0.85)">
						Bring motion to your hero sections with smooth gradients and floating blobs.
					</Typography>
					<Button variant="solid" color="primary">
						Get Started
					</Button>
				</Stack>
			</AnimatedGradientBackground>
		</FullscreenContainer>
	),
};

export const CustomColors: Story = {
	args: {
		colors: ["#FF006E", "#FB5607", "#FFBE0B", "#8338EC", "#3A86FF"],
	},
	render: Default.render,
};

export const SlowAnimation: Story = {
	args: {
		duration: 20000,
	},
	render: Default.render,
};

export const ManyBlobs: Story = {
	args: {
		blobCount: 12,
		blobOpacity: 0.2,
	},
	render: Default.render,
};

export const Static: Story = {
	args: {
		animate: false,
	},
	render: Default.render,
};
