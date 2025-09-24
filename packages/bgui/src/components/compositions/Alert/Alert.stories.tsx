import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../primitives/Button";
import { Alert } from "./Alert";
import type { AlertProps } from "./Alert.types";

const meta: Meta<AlertProps> = {
	title: "Compositions/Alert",
	component: Alert,
	args: {
		title: "Heads up!",
		description: "Something happened that requires your attention.",
	},
	parameters: {
		docs: {
			description: {
				component:
					"Alerts communicate important status information with optional actions. This composition blends primitives to provide icon, title, description, and actions with cross-platform parity.",
			},
		},
	},
	argTypes: {
		status: {
			control: "select",
			options: ["info", "success", "warning", "error", "neutral"],
		},
		variant: {
			control: "select",
			options: ["soft", "solid", "outlined", "plain"],
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
		},
	},
};

export default meta;

type Story = StoryObj<AlertProps>;

export const Playground: Story = {
	args: {
		status: "info",
		actions: <Button size="sm">Action</Button>,
	},
};

export const StatusVariants: Story = {
	render: () => (
		<div style={{ display: "grid", gap: 16 }}>
			<Alert status="info" description="General information about the current state." />
			<Alert status="success" description="The operation completed successfully." />
			<Alert status="warning" description="Double check before continuing." />
			<Alert status="error" description="We were unable to save your changes." />
		</div>
	),
};

export const WithActions: Story = {
	render: () => (
		<Alert
			status="warning"
			title="Unsaved changes"
			description="You have unsaved edits. Would you like to discard them?"
			actions={[
				<Button key="primary" size="sm" color="primary">
					Save
				</Button>,
				<Button key="secondary" size="sm" variant="outlined">
					Discard
				</Button>,
			]}
		/>
	),
};

export const Dismissible: Story = {
	args: {
		status: "neutral",
		variant: "outlined",
		title: "Preview mode",
		description: "You are currently viewing the site in preview mode.",
		onDismiss: () => alert("Alert dismissed"),
		dismissLabel: "Close alert",
	},
};
