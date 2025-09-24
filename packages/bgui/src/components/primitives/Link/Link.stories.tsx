import type { Meta, StoryObj } from "@storybook/react";

import { Box } from "../Box";
import { Stack } from "../Stack";
import { Typography } from "../Typography";
import { Link } from "./Link";

const meta = {
	title: "Primitives/Link",
	component: Link,
	parameters: {
		docs: {
			description: {
				component: "Interactive text element that opens URLs on both web and native platforms.",
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
			options: ["plain", "outlined", "soft", "solid"],
		},
		underline: {
			control: "select",
			options: ["hover", "always", "none"],
		},
	},
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Learn more",
		href: "https://example.com",
	},
};

export const Variants: Story = {
	render: () => (
		<Stack spacing="md" direction="row" useFlexGap>
			<Link variant="solid">Solid</Link>
			<Link variant="soft">Soft</Link>
			<Link variant="outlined">Outlined</Link>
			<Link variant="plain">Plain</Link>
		</Stack>
	),
};

export const Colors: Story = {
	render: () => (
		<Stack spacing="md" direction="row" useFlexGap>
			<Link color="primary">Primary</Link>
			<Link color="neutral">Neutral</Link>
			<Link color="danger">Danger</Link>
			<Link color="success">Success</Link>
			<Link color="warning">Warning</Link>
		</Stack>
	),
};

export const WithDecorators: Story = {
	render: () => (
		<Link
			startDecorator={<Typography level="body-sm">🔗</Typography>}
			endDecorator={<Typography level="body-sm">↗</Typography>}
			href="https://example.com"
			target="_blank"
		>
			External link
		</Link>
	),
};

export const Overlay: Story = {
	render: () => (
		<Box
			style={{ position: "relative", padding: 16, borderRadius: 12, backgroundColor: "#f2f4ff" }}
		>
			<Typography level="body-sm">
				Hover anywhere in this card—the overlay link covers the entire surface.
			</Typography>
			<Link overlay style={{ marginTop: 8 }}>
				Read more
			</Link>
		</Box>
	),
	parameters: {
		docs: {
			description: {
				story: "Overlay mode positions the pressable element absolutely across its parent.",
			},
		},
	},
};

export const UnderlineStates: Story = {
	render: () => (
		<Stack spacing="sm">
			<Link underline="hover">Underline on hover</Link>
			<Link underline="always">Always underlined</Link>
			<Link underline="none">No underline</Link>
		</Stack>
	),
};

export const Disabled: Story = {
	args: {
		children: "Disabled link",
		disabled: true,
	},
};
