import type { Meta, StoryObj } from "@storybook/react";

import { Box } from "../Box";
import { Stack } from "../Stack";
import { Typography } from "../Typography";
import { Container } from "./Container";

const meta = {
	title: "Primitives/Container",
	component: Container,
	parameters: {
		docs: {
			description: {
				component:
					"Container centers its children and constrains width according to the selected breakpoint.",
			},
		},
	},
	argTypes: {
		maxWidth: {
			control: "select",
			options: ["xs", "sm", "md", "lg", "xl", false],
			description: "Maximum width applied to the container.",
		},
		disableGutters: {
			control: "boolean",
			description: "Removes the default horizontal padding when enabled.",
		},
		fixed: {
			control: "boolean",
			description: "Locks the container width to the current breakpoint.",
		},
	},
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoContent = () => (
	<Box
		style={{
			backgroundColor: "rgba(51, 102, 255, 0.08)",
			padding: 16,
			borderRadius: 12,
		}}
	>
		<Typography level="title-md">Container Content</Typography>
		<Typography level="body-sm">
			This block is wrapped by the Container primitive which manages horizontal spacing and width.
		</Typography>
	</Box>
);

export const Default: Story = {
	render: () => (
		<Container>
			<DemoContent />
		</Container>
	),
};

export const MaxWidths: Story = {
	render: () => (
		<Stack spacing="lg">
			<Box>
				<Typography level="title-sm">Extra Small</Typography>
				<Container maxWidth="xs">
					<DemoContent />
				</Container>
			</Box>
			<Box>
				<Typography level="title-sm">Small</Typography>
				<Container maxWidth="sm">
					<DemoContent />
				</Container>
			</Box>
			<Box>
				<Typography level="title-sm">Medium</Typography>
				<Container maxWidth="md">
					<DemoContent />
				</Container>
			</Box>
			<Box>
				<Typography level="title-sm">Large (default)</Typography>
				<Container maxWidth="lg">
					<DemoContent />
				</Container>
			</Box>
			<Box>
				<Typography level="title-sm">Extra Large</Typography>
				<Container maxWidth="xl">
					<DemoContent />
				</Container>
			</Box>
		</Stack>
	),
};

export const WithoutGutters: Story = {
	render: () => (
		<Stack spacing="md">
			<Typography level="title-sm">With default gutters</Typography>
			<Box style={{ backgroundColor: "#f2f4ff" }}>
				<Container>
					<DemoContent />
				</Container>
			</Box>
			<Typography level="title-sm">Without gutters</Typography>
			<Box style={{ backgroundColor: "#f2f4ff" }}>
				<Container disableGutters>
					<DemoContent />
				</Container>
			</Box>
		</Stack>
	),
};

export const FixedWidth: Story = {
	render: () => (
		<Stack spacing="md">
			<Typography level="title-sm">Responsive width (default)</Typography>
			<Container maxWidth="md">
				<DemoContent />
			</Container>
			<Typography level="title-sm">Fixed to the md breakpoint</Typography>
			<Container maxWidth="md" fixed>
				<DemoContent />
			</Container>
		</Stack>
	),
};

export const CustomStyle: Story = {
	render: () => (
		<Container
			maxWidth="md"
			style={{
				backgroundColor: "#f9fafc",
				paddingVertical: 32,
				borderRadius: 16,
			}}
		>
			<DemoContent />
		</Container>
	),
};
