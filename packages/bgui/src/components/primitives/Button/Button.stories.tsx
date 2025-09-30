import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "../Box";
import { Typography } from "../Typography";
import { Button } from "./Button";

const meta = {
	title: "Primitives/Button",
	component: Button,
	parameters: {
		docs: {
			description: {
				component:
					"Cross-platform button primitive with Joy-inspired variants, decorators, and loading states.",
			},
		},
	},
	argTypes: {
		color: {
			control: "select",
			options: ["primary", "neutral", "danger", "success", "warning"],
		},
		variant: {
			control: "select",
			options: ["solid", "soft", "outlined", "plain"],
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
		},
	},
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {
	args: {
		children: "Submit",
		color: "primary",
		variant: "solid",
	},
};

export const Variants: Story = {
	render: () => (
		<Box flexDirection="row" flexWrap="wrap" gap="md">
			<Button variant="solid">Solid</Button>
			<Button variant="soft">Soft</Button>
			<Button variant="outlined">Outlined</Button>
			<Button variant="plain">Plain</Button>
		</Box>
	),
};

export const Sizes: Story = {
	render: () => (
		<Box flexDirection="row" gap="md" alignItems="center">
			<Button size="sm">Small</Button>
			<Button size="md">Medium</Button>
			<Button size="lg">Large</Button>
		</Box>
	),
};

export const WithDecorators: Story = {
	render: () => (
		<Box flexDirection="row" gap="md">
			<Button startDecorator={<Typography level="body-sm">🚀</Typography>}>Launch</Button>
			<Button endDecorator={<Typography level="body-sm">→</Typography>}>Next</Button>
		</Box>
	),
};

export const LoadingStates: Story = {
	render: () => (
		<Box flexDirection="row" gap="md">
			<Button loading loadingPosition="start">
				Start
			</Button>
			<Button loading loadingPosition="center">
				Center
			</Button>
			<Button loading loadingPosition="end">
				End
			</Button>
		</Box>
	),
};

export const FullWidth: Story = {
	render: () => (
		<Box width="100%">
			<Button fullWidth>Block Action</Button>
		</Box>
	),
};
