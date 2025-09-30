import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import { Box } from "../../primitives/Box";
import { Stack } from "../../primitives/Stack";
import { Typography } from "../../primitives/Typography";
import { GlowingLogo } from "./GlowingLogo";

const meta = {
	title: "Visual Effects/GlowingLogo",
	component: GlowingLogo,
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: { type: "number", min: 60, max: 240, step: 10 },
			description: "Size of the logo in pixels",
		},
		glowColor: {
			control: "color",
			description: "Color of the glow effect",
		},
		glowIntensity: {
			control: {
				type: "select",
				options: ["low", "medium", "high"],
			},
			description: "Intensity of the glow effect",
		},
		animate: {
			control: "boolean",
			description: "Whether to animate the glow",
		},
		onPress: {
			action: "pressed",
		},
	},
} satisfies Meta<typeof GlowingLogo>;

export default meta;

type Story = StoryObj<typeof meta>;

const Centered = ({ children }: { children: ReactNode }) => (
	<Box
		style={{
			width: "100%",
			maxWidth: 320,
			margin: "0 auto",
			padding: 24,
			alignItems: "center",
		}}
	>
		{children}
	</Box>
);

export const Default: Story = {
	args: {},
	render: (args) => (
		<Centered>
			<Stack spacing="md" style={{ alignItems: "center" }}>
				<GlowingLogo {...args} />
				<Typography level="title-md" textColor="#0f172a">
					Brain Game Labs
				</Typography>
				<Typography level="body-sm" textColor="#334155" style={{ textAlign: "center" }}>
					Subtle glow animation that draws attention without overwhelming the layout.
				</Typography>
			</Stack>
		</Centered>
	),
};

export const CustomColor: Story = {
	args: {
		glowColor: "#10b981",
	},
	render: Default.render,
};

export const Static: Story = {
	args: {
		animate: false,
	},
	render: Default.render,
};
