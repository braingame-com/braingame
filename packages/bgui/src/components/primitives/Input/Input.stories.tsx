import type { Meta, StoryObj } from "@storybook/react";

import { Box } from "../Box";
import { Stack } from "../Stack";
import { Typography } from "../Typography";
import { Input } from "./Input";

const meta = {
	title: "Primitives/Input",
	component: Input,
	parameters: {
		docs: {
			description: {
				component: "Cross-platform text input built on top of React Native's TextInput.",
			},
		},
	},
	argTypes: {
		variant: {
			control: "select",
			options: ["plain", "outlined", "soft", "solid"],
		},
		color: {
			control: "select",
			options: ["neutral", "primary", "danger", "success", "warning"],
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
		},
		disabled: {
			control: "boolean",
		},
	},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placeholder: "Email",
	},
};

export const Variants: Story = {
	render: () => (
		<Stack spacing="md">
			<Input variant="solid" placeholder="Solid" value="Solid" readOnly />
			<Input variant="soft" placeholder="Soft" value="Soft" readOnly />
			<Input variant="outlined" placeholder="Outlined" value="Outlined" readOnly />
			<Input variant="plain" placeholder="Plain" value="Plain" readOnly />
		</Stack>
	),
};

export const Colors: Story = {
	render: () => (
		<Stack spacing="md">
			<Input color="primary" placeholder="Primary" value="Primary" readOnly />
			<Input color="neutral" placeholder="Neutral" value="Neutral" readOnly />
			<Input color="danger" placeholder="Danger" value="Danger" readOnly />
			<Input color="success" placeholder="Success" value="Success" readOnly />
			<Input color="warning" placeholder="Warning" value="Warning" readOnly />
		</Stack>
	),
};

export const Sizes: Story = {
	render: () => (
		<Stack spacing="md">
			<Input size="sm" placeholder="Small" />
			<Input size="md" placeholder="Medium" />
			<Input size="lg" placeholder="Large" />
		</Stack>
	),
};

export const WithDecorators: Story = {
	render: () => (
		<Input
			startDecorator={<Typography level="body-sm">@</Typography>}
			endDecorator={<Typography level="body-sm">.com</Typography>}
			placeholder="username"
		/>
	),
};

export const FullWidth: Story = {
	render: () => (
		<Box style={{ width: "100%" }}>
			<Input fullWidth placeholder="Full width" />
		</Box>
	),
	parameters: {
		docs: {
			description: {
				story: "Full width forces the input to stretch to the parent container.",
			},
		},
	},
};

export const Disabled: Story = {
	args: {
		placeholder: "Disabled",
		disabled: true,
	},
};
