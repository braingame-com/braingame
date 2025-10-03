"use client";

import {
	Button as BguiButton,
	DocsExample,
	PropsTable,
	type PropsTableRow,
	Stack,
	Typography,
	useTheme,
} from "@braingame/bgui";
import { useMemo } from "react";

const buttonProps: PropsTableRow[] = [
	{
		name: "variant",
		type: '"solid" | "soft" | "outlined" | "plain"',
		defaultValue: '"solid"',
		description: "Visual treatment.",
	},
	{
		name: "color",
		type: '"primary" | "neutral" | "danger" | "success" | "warning"',
		defaultValue: '"primary"',
		description: "Tone of the button.",
	},
	{
		name: "size",
		type: '"sm" | "md" | "lg"',
		defaultValue: '"md"',
		description: "Height and spacing preset.",
	},
	{
		name: "loading",
		type: "boolean",
		defaultValue: "false",
		description: "Render a spinner and disable interactions.",
	},
	{
		name: "startDecorator",
		type: "React.ReactNode",
		description: "Leading adornment (icon, text, etc.).",
	},
	{
		name: "endDecorator",
		type: "React.ReactNode",
		description: "Trailing adornment.",
	},
];

const variantsExample = `<Stack direction="row" spacing="md" useFlexGap style={{ flexWrap: \"wrap\" }}>
  <BguiButton variant="solid">Solid</BguiButton>
  <BguiButton variant="soft">Soft</BguiButton>
  <BguiButton variant="outlined">Outlined</BguiButton>
  <BguiButton variant="plain">Plain</BguiButton>
</Stack>`;

const tonesExample = `<Stack direction="row" spacing="md" useFlexGap style={{ flexWrap: \"wrap\" }}>
  <BguiButton color="primary">Primary</BguiButton>
  <BguiButton color="neutral" variant="soft">Neutral</BguiButton>
  <BguiButton color="success" variant="soft">Success</BguiButton>
  <BguiButton color="danger" variant="soft">Danger</BguiButton>
</Stack>`;

const usageSnippet = `import { Button } from "@braingame/bgui";

function SaveButton({ onSave }: { onSave: () => void }) {
  return (
    <Button variant="solid" color="primary" onClick={onSave}>
      Save changes
    </Button>
  );
}`;

export default function ButtonDocs() {
	const theme = useTheme();
	const headingColor = useMemo(
		() => theme.colors.onSurfaceVariant,
		[theme.colors.onSurfaceVariant],
	);

	return (
		<Stack spacing="xl2">
			<Stack spacing="sm">
				<Typography level="h1">Button</Typography>
				<Typography level="body-lg" textColor={headingColor}>
					Buttons trigger actions across Brain Game surfaces. Variants map directly to our design
					tokens and work in both dark and light themes.
				</Typography>
			</Stack>

			<DocsExample title="Variants" code={variantsExample}>
				<Stack direction="row" spacing="md" useFlexGap style={{ flexWrap: "wrap" }}>
					<BguiButton variant="solid">Solid</BguiButton>
					<BguiButton variant="soft">Soft</BguiButton>
					<BguiButton variant="outlined">Outlined</BguiButton>
					<BguiButton variant="plain">Plain</BguiButton>
				</Stack>
			</DocsExample>

			<DocsExample title="Color tokens" code={tonesExample}>
				<Stack direction="row" spacing="md" useFlexGap style={{ flexWrap: "wrap" }}>
					<BguiButton color="primary">Primary</BguiButton>
					<BguiButton color="neutral" variant="soft">
						Neutral
					</BguiButton>
					<BguiButton color="success" variant="soft">
						Success
					</BguiButton>
					<BguiButton color="danger" variant="soft">
						Danger
					</BguiButton>
				</Stack>
			</DocsExample>

			<Stack spacing="sm">
				<Typography level="h2">API</Typography>
				<PropsTable rows={buttonProps} testID="props-table" />
			</Stack>

			<Stack spacing="sm">
				<Typography level="h2">Usage</Typography>
				<DocsExample title="Inline usage" code={usageSnippet} allowToggle={false}>
					<Typography level="body-md" textColor={headingColor}>
						Use Button directly from @braingame/bgui and provide handlers for the actions you need.
					</Typography>
				</DocsExample>
			</Stack>
		</Stack>
	);
}
