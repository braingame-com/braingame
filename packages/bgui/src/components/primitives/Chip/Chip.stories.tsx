import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Icon } from "../Icon";
import { Chip } from "./Chip";
import type { ChipProps } from "./Chip.types";

const meta: Meta<ChipProps> = {
	title: "Primitives/Chip",
	component: Chip,
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
					"Chips represent compact pieces of information such as filters or selected items. They support icons, decorators, and dismiss actions across platforms.",
			},
		},
	},
	args: {
		children: "Chip",
	},
};

export default meta;

type Story = StoryObj<ChipProps>;

export const Playground: Story = {
	args: {
		color: "neutral",
		variant: "soft",
		size: "md",
	},
};

export const WithDecorators: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
			<Chip startDecorator={<Icon name="info" size={16} />}>Informational</Chip>
			<Chip endDecorator={<Icon name="check" size={16} />} color="success" variant="solid">
				Confirmed
			</Chip>
			<Chip startDecorator={<Icon name="warning" size={16} />} color="warning" variant="outlined">
				Warning
			</Chip>
		</div>
	),
};

export const Dismissible: Story = {
	render: () => {
		const [chips, setChips] = useState(["React", "TypeScript", "Accessibility"]);
		return (
			<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
				{chips.map((chip) => (
					<Chip
						key={chip}
						onDismiss={() => setChips((items) => items.filter((item) => item !== chip))}
						startDecorator={<Icon name="tag" size={16} />}
						dismissLabel={`Remove ${chip}`}
					>
						{chip}
					</Chip>
				))}
			</div>
		);
	},
};

export const Clickable: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
			<Chip onClick={() => alert("Clicked chip")}>Default</Chip>
			<Chip
				color="primary"
				onClick={() => alert("Primary chip")}
				startDecorator={<Icon name="favorite" size={16} />}
			>
				Favorite
			</Chip>
			<Chip
				color="danger"
				variant="solid"
				onClick={() => alert("Danger chip")}
				endDecorator={<Icon name="delete" size={16} />}
			>
				Delete
			</Chip>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 12, alignItems: "center" }}>
			<Chip size="sm">Small</Chip>
			<Chip size="md">Medium</Chip>
			<Chip size="lg">Large</Chip>
		</div>
	),
};
