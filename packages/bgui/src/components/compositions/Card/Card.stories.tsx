import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../../primitives/Button";
import { Stack } from "../../primitives/Stack";
import { Typography } from "../../primitives/Typography";
import { Card, CardActions, CardContent, CardHeader } from "./Card";
import type { CardProps } from "./Card.types";

const meta: Meta<typeof Card> = {
	title: "Compositions/Card",
	component: Card,
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
		orientation: {
			control: "select",
			options: ["vertical", "horizontal"],
		},
	},
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<CardProps>;

export const Default: Story = {
	render: (args) => (
		<Card {...args}>
			<CardHeader title="Team Standup" subtitle="Today • 10:00 AM" />
			<CardContent>
				<Typography level="body-md">
					Share updates with the squad, raise blockers, and plan the sprint together.
				</Typography>
			</CardContent>
			<CardActions>
				<Button variant="outlined">Snooze</Button>
				<Button variant="solid">Join call</Button>
			</CardActions>
		</Card>
	),
	args: {
		variant: "outlined",
		color: "neutral",
		size: "md",
		orientation: "vertical",
	},
};

export const Variants: Story = {
	render: () => (
		<Stack direction="row" spacing="md" useFlexGap={false} style={{ flexWrap: "wrap" }}>
			{["plain", "outlined", "soft", "solid"].map((variant) => (
				<Card
					key={variant}
					variant={variant as CardProps["variant"]}
					size="sm"
					style={{ width: 260 }}
				>
					<CardHeader title={`${variant.charAt(0).toUpperCase()}${variant.slice(1)}`} />
					<CardContent>
						<Typography level="body-sm">
							Each variant adapts the surface and border treatment.
						</Typography>
					</CardContent>
					<CardActions>
						<Button variant="soft">Learn more</Button>
					</CardActions>
				</Card>
			))}
		</Stack>
	),
};

export const HorizontalLayout: Story = {
	render: () => (
		<Card orientation="horizontal" size="lg" style={{ maxWidth: 600 }}>
			<CardHeader
				title="Starter workspace"
				subtitle="Collaborators: 8"
				leading={<Typography level="title-lg">🚀</Typography>}
			/>
			<CardContent padding>
				<Typography level="body-md">
					Launch projects faster with preconfigured templates and shared resources that scale across
					teams.
				</Typography>
			</CardContent>
			<CardActions align="space-between">
				<Typography level="body-sm" color="neutral">
					Last updated 2 days ago
				</Typography>
				<Button variant="solid">Open</Button>
			</CardActions>
		</Card>
	),
};

export const Interactive: Story = {
	render: () => {
		const [selection, setSelection] = useState<string | null>("pro");

		const plans: Array<{ id: string; title: string; price: string; description: string }> = [
			{
				id: "free",
				title: "Starter",
				price: "$0",
				description: "Essential tools for side projects.",
			},
			{ id: "pro", title: "Pro", price: "$24", description: "Advanced analytics and automations." },
			{ id: "scale", title: "Scale", price: "$99", description: "Collaboration for large teams." },
		];

		return (
			<Stack direction="row" spacing="md" useFlexGap={false} style={{ flexWrap: "wrap" }}>
				{plans.map((plan) => (
					<Card
						key={plan.id}
						onPress={() => setSelection(plan.id)}
						variant={selection === plan.id ? "solid" : "outlined"}
						color={selection === plan.id ? "primary" : "neutral"}
						size="md"
						style={{ width: 240 }}
					>
						<CardHeader title={plan.title} subtitle={plan.price} />
						<CardContent>
							<Typography level="body-sm">{plan.description}</Typography>
						</CardContent>
					</Card>
				))}
			</Stack>
		);
	},
};
