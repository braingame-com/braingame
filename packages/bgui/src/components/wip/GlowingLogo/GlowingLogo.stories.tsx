// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react";
import { GlowingLogo } from "./GlowingLogo";

const meta = {
	title: "Effects/GlowingLogo",
	component: GlowingLogo,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: { type: "number", min: 50, max: 300, step: 10 },
			description: "Size of the logo in pixels",
		},
		glowColor: {
			control: "color",
			description: "Color of the glow effect",
		},
		glowIntensity: {
			control: { type: "select" },
			options: ["low", "medium", "high"],
			description: "Intensity of the glow effect",
		},
		animate: {
			control: "boolean",
			description: "Whether to animate the glow effect",
		},
		onPress: {
			action: "clicked",
			description: "Click/press handler",
		},
	},
} satisfies Meta<typeof GlowingLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const Large: Story = {
	args: {
		size: 200,
	},
};

export const CustomColor: Story = {
	args: {
		glowColor: "#FF006E",
	},
};

export const HighIntensity: Story = {
	args: {
		glowIntensity: "high",
		glowColor: "#8338EC",
	},
};

export const LowIntensity: Story = {
	args: {
		glowIntensity: "low",
	},
};

export const Static: Story = {
	args: {
		animate: false,
	},
};

export const Clickable: Story = {
	args: {
		onPress: () => console.log("Logo clicked!"),
	},
};

export const WithCustomContent: Story = {
	args: {
		children: (
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "#1a1a1a",
					color: "white",
					fontSize: "2rem",
					fontWeight: "bold",
				}}
			>
				BG
			</div>
		),
	},
};

export const MultipleLogos: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
			<GlowingLogo size={80} glowColor="#FF006E" glowIntensity="low" />
			<GlowingLogo size={120} glowColor="#8338EC" glowIntensity="medium" />
			<GlowingLogo size={160} glowColor="#3A86FF" glowIntensity="high" />
		</div>
	),
};

export const OnDarkBackground: Story = {
	parameters: {
		backgrounds: { default: "dark" },
	},
	render: () => (
		<div
			style={{
				padding: "4rem",
				backgroundColor: "#0a0a0a",
				borderRadius: "1rem",
			}}
		>
			<GlowingLogo size={150} glowColor="#00FFFF" />
		</div>
	),
};
