import type { Meta, StoryObj } from "@storybook/react";
import { SimpleErrorBoundary } from "./SimpleErrorBoundary";

const meta: Meta<typeof SimpleErrorBoundary> = {
	title: "Components/SimpleErrorBoundary",
	component: SimpleErrorBoundary,
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
