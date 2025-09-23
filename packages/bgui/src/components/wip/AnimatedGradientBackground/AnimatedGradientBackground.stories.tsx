// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react";
import { AnimatedGradientBackground } from "./AnimatedGradientBackground";

const meta = {
	title: "Effects/AnimatedGradientBackground",
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

export const Default: Story = {
	args: {},
	render: (args) => (
		<div style={{ width: "100vw", height: "100vh" }}>
			<AnimatedGradientBackground {...args}>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "100%",
						color: "white",
						fontSize: "2rem",
						fontWeight: "bold",
					}}
				>
					Animated Gradient Background
				</div>
			</AnimatedGradientBackground>
		</div>
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

export const SharpBlobs: Story = {
	args: {
		blurRadius: 20,
		blobOpacity: 0.5,
	},
	render: Default.render,
};

export const Static: Story = {
	args: {
		animate: false,
	},
	render: Default.render,
};

export const WithContent: Story = {
	render: (args) => (
		<div style={{ width: "100vw", height: "100vh" }}>
			<AnimatedGradientBackground {...args}>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						height: "100%",
						gap: "2rem",
					}}
				>
					<h1 style={{ color: "white", fontSize: "3rem", margin: 0 }}>Welcome</h1>
					<p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "1.5rem", margin: 0 }}>
						Beautiful animated backgrounds
					</p>
					<button
						type="button"
						style={{
							padding: "1rem 2rem",
							fontSize: "1rem",
							backgroundColor: "white",
							border: "none",
							borderRadius: "0.5rem",
							cursor: "pointer",
						}}
					>
						Get Started
					</button>
				</div>
			</AnimatedGradientBackground>
		</div>
	),
};
