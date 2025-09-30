import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Stack } from "../Stack";
import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
	title: "Primitives/Switch",
	component: Switch,
	parameters: {
		docs: {
			description: {
				component: "Cross-platform toggle control built on the BGUI primitive system.",
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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Notifications",
	},
};

export const Variants: Story = {
	render: () => (
		<Stack direction="row" spacing="md">
			<Switch variant="solid">Solid</Switch>
			<Switch variant="soft">Soft</Switch>
			<Switch variant="outlined">Outlined</Switch>
			<Switch variant="plain">Plain</Switch>
		</Stack>
	),
};

export const Sizes: Story = {
	render: () => (
		<Stack direction="row" spacing="md" alignItems="center">
			<Switch size="sm">Small</Switch>
			<Switch size="md">Medium</Switch>
			<Switch size="lg">Large</Switch>
		</Stack>
	),
};

export const Colors: Story = {
	render: () => (
		<Stack direction="row" spacing="md">
			<Switch color="primary">Primary</Switch>
			<Switch color="neutral">Neutral</Switch>
			<Switch color="danger">Danger</Switch>
			<Switch color="success">Success</Switch>
			<Switch color="warning">Warning</Switch>
		</Stack>
	),
};

export const Controlled: Story = {
	render: () => {
		const [checked, setChecked] = useState(false);

		return (
			<Switch checked={checked} onValueChange={setChecked}>
				Controlled toggle ({checked ? "on" : "off"})
			</Switch>
		);
	},
};

export const WithDecorators: Story = {
	render: () => (
		<Switch startDecorator="🔒" endDecorator="🌙">
			Secure mode
		</Switch>
	),
};
