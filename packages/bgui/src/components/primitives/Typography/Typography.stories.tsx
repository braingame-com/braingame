import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "../Box";
import { Typography } from "./Typography";

const meta = {
	title: "Primitives/Typography",
	component: Typography,
	parameters: {
		docs: {
			description: {
				component:
					"Cross-platform text primitive supporting Joy UI typography levels, variants, and decorators.",
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
			options: ["plain", "soft", "outlined", "solid"],
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
				"inherit",
			],
		},
	},
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof Typography>;

export const Playground: Story = {
	args: {
		children: "Typography",
		level: "body-md",
		color: "neutral",
	},
};

export const Levels: Story = {
	render: () => (
		<Box gap="sm">
			<Typography level="h1">Heading 1</Typography>
			<Typography level="h2">Heading 2</Typography>
			<Typography level="title-lg">Title Large</Typography>
			<Typography level="body-md">Body Medium</Typography>
		</Box>
	),
};

export const Variants: Story = {
	render: () => (
		<Box flexDirection="row" gap="md">
			<Typography variant="plain" color="primary">
				Plain
			</Typography>
			<Typography variant="soft" color="success">
				Soft
			</Typography>
			<Typography variant="outlined" color="danger">
				Outlined
			</Typography>
			<Typography variant="solid" color="warning">
				Solid
			</Typography>
		</Box>
	),
};

export const WithDecorators: Story = {
	render: () => (
		<Typography
			startDecorator={<Typography level="body-sm">📘</Typography>}
			endDecorator={<Typography level="body-sm">→</Typography>}
		>
			Continue reading
		</Typography>
	),
};

export const NoWrap: Story = {
	render: () => (
		<Box width={240}>
			<Typography noWrap>
				This sentence will be truncated with an ellipsis when it exceeds the container width.
			</Typography>
		</Box>
	),
};
