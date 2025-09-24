import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../../primitives/Button";
import { Stack } from "../../primitives/Stack";
import { Typography } from "../../primitives/Typography";
import { ListItem } from "../ListItem";
import { List } from "./List";
import type { ListProps } from "./List.types";

const meta: Meta<typeof List> = {
	title: "Compositions/List",
	component: List,
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
		orientation: {
			control: "select",
			options: ["vertical", "horizontal"],
		},
	},
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<ListProps>;

export const Default: Story = {
	render: (args) => (
		<List {...args}>
			<ListItem value="overview">Overview</ListItem>
			<ListItem value="reports">Reports</ListItem>
			<ListItem value="team">Team</ListItem>
		</List>
	),
	args: {
		variant: "plain",
		color: "neutral",
		size: "md",
		orientation: "vertical",
	},
};

export const WithDecorators: Story = {
	render: () => (
		<List marker="disc" variant="soft" color="primary">
			<ListItem startAction={<Typography level="body-sm">📄</Typography>} value="docs">
				Documentation
			</ListItem>
			<ListItem startAction={<Typography level="body-sm">⚙️</Typography>} value="settings">
				Settings
			</ListItem>
			<ListItem startAction={<Typography level="body-sm">💬</Typography>} value="support">
				Support
			</ListItem>
		</List>
	),
};

export const Horizontal: Story = {
	render: () => (
		<List orientation="horizontal" wrap variant="outlined" size="sm">
			{["Design", "Engineering", "Marketing", "Sales", "Operations"].map((label) => (
				<ListItem key={label} value={label} endAction={<Button variant="soft">View</Button>}>
					{label}
				</ListItem>
			))}
		</List>
	),
};

export const Selectable: Story = {
	render: () => {
		const [selection, setSelection] = useState<string | null>("reports");

		return (
			<List
				variant="outlined"
				selectionMode="single"
				selectedValue={selection}
				onSelectionChange={setSelection}
			>
				<ListItem value="overview">Overview</ListItem>
				<ListItem value="reports">Reports</ListItem>
				<ListItem value="analytics">Analytics</ListItem>
			</List>
		);
	},
};

export const Nested: Story = {
	render: () => (
		<Stack spacing="md">
			<Typography level="title-sm">Project roadmap</Typography>
			<List marker="decimal" size="lg">
				<ListItem value="phase-1">Kickoff and discovery</ListItem>
				<ListItem value="phase-2" nested>
					Prototype exploration
				</ListItem>
				<ListItem value="phase-3">Beta release</ListItem>
			</List>
		</Stack>
	),
};
