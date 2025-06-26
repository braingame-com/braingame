import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../Button/Button";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
	title: "Components/Alert",
	component: Alert,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: "select",
			options: ["info", "success", "warning", "error"],
		},
		variant: {
			control: "select",
			options: ["banner", "inline", "floating"],
		},
		title: {
			control: "text",
		},
		message: {
			control: "text",
		},
		dismissible: {
			control: "boolean",
		},
		onDismiss: {
			action: "dismissed",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		message: "This is a default alert message",
	},
};

export const WithTitle: Story = {
	args: {
		title: "Information",
		message: "This alert has both a title and a message",
		type: "info",
	},
};

export const Types: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
			<Alert type="info" title="Info" message="This is an informational alert" />
			<Alert type="success" title="Success" message="Operation completed successfully!" />
			<Alert type="warning" title="Warning" message="Please review before proceeding" />
			<Alert type="error" title="Error" message="An error occurred while processing" />
		</div>
	),
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
			<Alert variant="banner" title="Banner Alert" message="Full-width banner style alert" />
			<Alert variant="inline" title="Inline Alert" message="Inline alert with rounded corners" />
			<Alert
				variant="floating"
				title="Floating Alert"
				message="Floating alert with shadow effect"
			/>
		</div>
	),
};

export const Dismissible: Story = {
	render: () => {
		const [visible, setVisible] = useState(true);

		if (!visible) {
			return (
				<Button onPress={() => setVisible(true)} variant="secondary">
					Show Alert Again
				</Button>
			);
		}

		return (
			<Alert
				type="info"
				title="Dismissible Alert"
				message="Click the X button to dismiss this alert"
				dismissible
				onDismiss={() => setVisible(false)}
			/>
		);
	},
};

export const WithActions: Story = {
	args: {
		type: "warning",
		title: "Confirm Action",
		message: "Are you sure you want to proceed?",
		actions: (
			<div style={{ display: "flex", gap: 8 }}>
				<Button size="sm" variant="primary" onPress={() => console.log("Confirm clicked")}>
					Confirm
				</Button>
				<Button size="sm" variant="ghost" onPress={() => console.log("Cancel clicked")}>
					Cancel
				</Button>
			</div>
		),
	},
};
