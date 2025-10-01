import type { Meta, StoryObj } from "@storybook/react";
import { useTheme } from "../../../theme";
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
	render: () => {
		const theme = useTheme();
		return (
			<Box
				style={{
					flexDirection: "row",
					flexWrap: "wrap",
					columnGap: theme.spacing.md,
					rowGap: theme.spacing.md,
				}}
			>
				<Button variant="solid">Solid</Button>
				<Button variant="soft">Soft</Button>
				<Button variant="outlined">Outlined</Button>
				<Button variant="plain">Plain</Button>
			</Box>
		);
	},
};

export const Sizes: Story = {
	render: () => {
		const theme = useTheme();
		return (
			<Box
				style={{
					flexDirection: "row",
					columnGap: theme.spacing.md,
					alignItems: "center",
				}}
			>
				<Button size="sm">Small</Button>
				<Button size="md">Medium</Button>
				<Button size="lg">Large</Button>
			</Box>
		);
	},
};

export const WithDecorators: Story = {
	render: () => {
		const theme = useTheme();
		return (
			<Box style={{ flexDirection: "row", columnGap: theme.spacing.md }}>
				<Button startDecorator={<Typography level="body-sm">🚀</Typography>}>Launch</Button>
				<Button endDecorator={<Typography level="body-sm">→</Typography>}>Next</Button>
			</Box>
		);
	},
};

export const LoadingStates: Story = {
	render: () => {
		const theme = useTheme();
		return (
			<Box style={{ flexDirection: "row", columnGap: theme.spacing.md }}>
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
		);
	},
};

export const FullWidth: Story = {
	render: () => (
		<Box style={{ width: "100%" }}>
			<Button fullWidth>Block Action</Button>
		</Box>
	),
};
