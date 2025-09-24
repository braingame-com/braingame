import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Icon } from "../Icon";
import { Badge } from "./Badge";
import type { BadgeProps } from "./Badge.types";

const meta: Meta<BadgeProps> = {
	title: "Primitives/Badge",
	component: Badge,
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
	parameters: {
		docs: {
			description: {
				component:
					"Badges label or provide status information. The primitive supports dot mode, decorators, custom icons, and optional dismiss actions.",
			},
		},
	},
	args: {
		badgeContent: 8,
	},
};

export default meta;

type Story = StoryObj<BadgeProps>;

export const Playground: Story = {
	args: {
		children: <span style={{ padding: 12, display: "inline-block" }}>Inbox</span>,
	},
};

export const DotBadge: Story = {
	render: () => (
		<Badge dot color="success">
			<span style={{ padding: 12, display: "inline-block" }}>Online</span>
		</Badge>
	),
};

export const WithDecorators: Story = {
	render: () => (
		<Badge
			badgeContent="New"
			startDecorator={<Icon name="info" size={14} />}
			endDecorator={<Icon name="chevron_right" size={14} />}
			variant="soft"
			color="primary"
		>
			<span style={{ padding: 12, display: "inline-flex", alignItems: "center", gap: 8 }}>
				Updates Available
			</span>
		</Badge>
	),
};

export const MaxValue: Story = {
	render: () => (
		<Badge badgeContent={120} max={99} color="danger">
			<span style={{ padding: 12, display: "inline-block" }}>Notifications</span>
		</Badge>
	),
};

export const Dismissible: Story = {
	render: () => {
		const [visible, setVisible] = useState(true);
		return (
			<Badge
				badgeContent={visible ? "Tip" : undefined}
				onDismiss={() => setVisible(false)}
				dismissLabel="Dismiss tip"
				variant="outlined"
				color="warning"
			>
				<span style={{ padding: 12, display: "inline-block" }}>Hover for hint</span>
			</Badge>
		);
	},
};
