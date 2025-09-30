import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Radio } from "../../primitives/Radio";
import { RadioGroup } from "./RadioGroup";

const meta = {
	title: "Compositions/RadioGroup",
	component: RadioGroup,
	parameters: {
		docs: {
			description: {
				component: "Managed set of Radio primitives with shared accessibility and state.",
			},
		},
	},
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<RadioGroup>
			<Radio label="Daily" value="daily" />
			<Radio label="Weekly" value="weekly" />
			<Radio label="Monthly" value="monthly" />
		</RadioGroup>
	),
};

export const Horizontal: Story = {
	render: () => (
		<RadioGroup orientation="horizontal">
			<Radio label="Email" value="email" />
			<Radio label="Push" value="push" />
			<Radio label="SMS" value="sms" />
		</RadioGroup>
	),
};

export const Controlled: Story = {
	render: function ControlledStory() {
		const [value, setValue] = useState<string | number | undefined>("weekly");
		return (
			<RadioGroup value={value} onChange={(event) => setValue(event.target.value)}>
				<Radio label="Daily" value="daily" />
				<Radio label="Weekly" value="weekly" />
				<Radio label="Monthly" value="monthly" />
			</RadioGroup>
		);
	},
};
