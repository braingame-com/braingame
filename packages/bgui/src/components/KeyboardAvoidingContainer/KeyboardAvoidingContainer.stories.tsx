import type { Meta, StoryObj } from "@storybook/react";
import { KeyboardAvoidingContainer } from "./KeyboardAvoidingContainer";

const meta: Meta<typeof KeyboardAvoidingContainer> = {
	title: "Components/KeyboardAvoidingContainer",
	component: KeyboardAvoidingContainer,
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
