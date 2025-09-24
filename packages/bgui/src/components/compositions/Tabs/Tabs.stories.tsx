import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Box } from "../../primitives/Box";
import { Stack } from "../../primitives/Stack";
import { Typography } from "../../primitives/Typography";
import { Tab, TabList, TabPanel, Tabs } from "./Tabs";
import type { TabsProps } from "./Tabs.types";

const meta: Meta<typeof Tabs> = {
	title: "Compositions/Tabs",
	component: Tabs,
	parameters: {
		docs: {
			description: {
				component:
					"Cross-platform tab navigation that reuses shared context for keyboard navigation and focus management.",
			},
		},
	},
	argTypes: {
		orientation: {
			control: "select",
			options: ["horizontal", "vertical"],
		},
		color: {
			control: "select",
			options: ["primary", "neutral", "danger", "success", "warning"],
		},
		variant: {
			control: "select",
			options: ["plain", "outlined", "soft", "solid"],
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

const Example = (props: TabsProps) => {
	const [value, setValue] = useState<TabsProps["value"]>("overview");

	return (
		<Tabs {...props} value={value} onChange={setValue}>
			<TabList>
				<Tab value="overview">Overview</Tab>
				<Tab value="details">Details</Tab>
				<Tab value="reviews">Reviews</Tab>
			</TabList>
			<TabPanel value="overview">
				<Stack spacing="sm">
					<Typography level="title-sm">Overview</Typography>
					<Typography level="body-sm">
						Consolidated summary content that renders consistently across platforms.
					</Typography>
				</Stack>
			</TabPanel>
			<TabPanel value="details">
				<Stack spacing="sm">
					<Typography level="title-sm">Details</Typography>
					<Typography level="body-sm">
						Additional metadata, specs, or in-depth explanations can live here.
					</Typography>
				</Stack>
			</TabPanel>
			<TabPanel value="reviews">
				<Stack spacing="sm">
					<Typography level="title-sm">Reviews</Typography>
					<Typography level="body-sm">
						Surface social proof or testimonials without duplicating layout logic.
					</Typography>
				</Stack>
			</TabPanel>
		</Tabs>
	);
};

export const Default: Story = {
	render: (args) => <Example {...args} />,
	args: {
		orientation: "horizontal",
		size: "md",
		color: "neutral",
		variant: "plain",
	},
};

export const Vertical: Story = {
	render: (args) => (
		<Box style={{ maxWidth: 480 }}>
			<Example {...args} orientation="vertical" />
		</Box>
	),
};

export const FilledPanels: Story = {
	render: () => {
		const [value, setValue] = useState<TabsProps["value"]>("one");
		return (
			<Tabs value={value} onChange={setValue} variant="soft" color="primary">
				<TabList>
					<Tab value="one">Tab One</Tab>
					<Tab value="two">Tab Two</Tab>
				</TabList>
				<TabPanel value="one">
					<Stack spacing="sm">
						<Typography level="title-sm">Soft Primary</Typography>
						<Typography level="body-sm">Panels can adopt shared variants.</Typography>
					</Stack>
				</TabPanel>
				<TabPanel value="two">
					<Stack spacing="sm">
						<Typography level="title-sm">Soft Primary</Typography>
						<Typography level="body-sm">Values persist across navigation.</Typography>
					</Stack>
				</TabPanel>
			</Tabs>
		);
	},
};
