import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../primitives/Button";
import { Stack } from "../../primitives/Stack";
import { Tooltip } from "./Tooltip";
import type { TooltipProps } from "./Tooltip.types";

const meta = {
	title: "Compositions/Tooltip",
	component: Tooltip,
	args: {
		title: "Helpful hint",
		children: <Button>Hover me</Button>,
	},
	parameters: {
		layout: "centered",
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
		placement: {
			control: "select",
			options: [
				"top",
				"top-start",
				"top-end",
				"right",
				"right-start",
				"right-end",
				"bottom",
				"bottom-start",
				"bottom-end",
				"left",
				"left-start",
				"left-end",
			],
		},
	},
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
	render: (args: TooltipProps) => (
		<Stack direction="row" spacing="md" useFlexGap={false}>
			<Tooltip {...args} variant="solid" color="primary" title="Primary">
				<Button>Primary</Button>
			</Tooltip>
			<Tooltip {...args} variant="soft" color="success" title="Success">
				<Button variant="outlined">Success</Button>
			</Tooltip>
			<Tooltip {...args} variant="outlined" color="warning" title="Warning">
				<Button variant="soft">Warning</Button>
			</Tooltip>
			<Tooltip {...args} variant="plain" color="neutral" title="Neutral">
				<Button variant="plain">Neutral</Button>
			</Tooltip>
		</Stack>
	),
};

export const Placements: Story = {
	render: (args: TooltipProps) => (
		<Stack direction="row" spacing="md" useFlexGap={false}>
			<Tooltip {...args} placement="top" title="Top">
				<Button>Top</Button>
			</Tooltip>
			<Tooltip {...args} placement="bottom" title="Bottom">
				<Button>Bottom</Button>
			</Tooltip>
			<Tooltip {...args} placement="left" title="Left">
				<Button>Left</Button>
			</Tooltip>
			<Tooltip {...args} placement="right" title="Right">
				<Button>Right</Button>
			</Tooltip>
		</Stack>
	),
};
