import type { Meta, StoryObj } from "@storybook/react";
import { GlowingLogo } from "./GlowingLogo";

const meta: Meta<typeof GlowingLogo> = {
	title: "Components/GlowingLogo",
	component: GlowingLogo,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		// TODO: Add default props
	},
};

// TODO: Add more story variations
