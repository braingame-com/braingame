import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../primitives/Button";
import { Typography } from "../../primitives/Typography";
import { List } from "../List";
import { ListItem } from "./ListItem";
import type { ListItemProps } from "./ListItem.types";

const meta: Meta<typeof ListItem> = {
	title: "Compositions/ListItem",
	component: ListItem,
	parameters: {
		layout: "padded",
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
	},
} satisfies Meta<typeof ListItem>;

export default meta;

type Story = StoryObj<ListItemProps>;

export const Playground: Story = {
	render: (args) => (
		<List variant="outlined">
			<ListItem {...args}>Inbox</ListItem>
		</List>
	),
	args: {
		variant: "plain",
		color: "neutral",
		size: "md",
	},
};

export const WithActions: Story = {
	render: () => (
		<List variant="outlined">
			<ListItem
				startAction={<Typography level="body-sm">📬</Typography>}
				endAction={<Button variant="soft">Reply</Button>}
			>
				Message center
			</ListItem>
			<ListItem
				startAction={<Typography level="body-sm">📎</Typography>}
				endAction={<Button variant="soft">View</Button>}
			>
				Attachments
			</ListItem>
		</List>
	),
};

export const ButtonLike: Story = {
	render: () => (
		<List selectionMode="single">
			<ListItem button value="archive" startAction={<Typography level="body-sm">🗃️</Typography>}>
				Archive
			</ListItem>
			<ListItem button value="delete" startAction={<Typography level="body-sm">🗑️</Typography>}>
				Delete
			</ListItem>
		</List>
	),
};
