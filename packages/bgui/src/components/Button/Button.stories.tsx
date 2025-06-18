import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
	title: "BGUI/Button",
	component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	render: () => <Button onPress={() => {}}>Primary</Button>,
};

export const Secondary: Story = {
	render: () => (
		<Button variant="secondary" onPress={() => {}}>
			Secondary
		</Button>
	),
};

export const Danger: Story = {
	render: () => (
		<Button variant="danger" onPress={() => {}}>
			Delete
		</Button>
	),
};

export const IconOnly: Story = {
	render: () => <Button icon="home" variant="icon" aria-label="home" onPress={() => {}} />,
};
