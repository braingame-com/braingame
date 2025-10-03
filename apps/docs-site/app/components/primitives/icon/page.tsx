"use client";

import {
	DocsExample,
	Icon,
	PropsTable,
	type PropsTableRow,
	Stack,
	Typography,
	useTheme,
} from "@braingame/bgui";

const iconProps: PropsTableRow[] = [
	{
		name: "name",
		type: "string",
		required: true,
		description: "Material icon name from the registry.",
	},
	{ name: "size", type: "number", defaultValue: "24", description: "Pixel size for the icon." },
	{ name: "color", type: "string", description: "Override theme token or hex color." },
];

const usageSnippet = `import { Icon } from "@braingame/bgui";

<Icon name="check_circle" size={20} color="success" />;`;

export default function IconDocs() {
	const theme = useTheme();

	return (
		<Stack spacing="xl2">
			<Stack spacing="sm">
				<Typography level="h1">Icon</Typography>
				<Typography level="body-lg" textColor={theme.colors.onSurfaceVariant}>
					Icons use the Brain Game Material registry to keep bundles small while aligning with our
					design tokens.
				</Typography>
			</Stack>

			<DocsExample title="Sizes" allowToggle={false}>
				<Stack
					direction="row"
					spacing="lg"
					useFlexGap
					style={{ alignItems: "center", flexWrap: "wrap" }}
				>
					<Stack spacing="xs" style={{ alignItems: "center" }}>
						<Icon name="menu" size={18} />
						<Typography level="body-xs" textColor={theme.colors.onSurfaceVariant}>
							18px
						</Typography>
					</Stack>
					<Stack spacing="xs" style={{ alignItems: "center" }}>
						<Icon name="menu" size={24} />
						<Typography level="body-xs" textColor={theme.colors.onSurfaceVariant}>
							24px
						</Typography>
					</Stack>
					<Stack spacing="xs" style={{ alignItems: "center" }}>
						<Icon name="menu" size={32} />
						<Typography level="body-xs" textColor={theme.colors.onSurfaceVariant}>
							32px
						</Typography>
					</Stack>
				</Stack>
			</DocsExample>

			<Stack spacing="sm">
				<Typography level="h2">API</Typography>
				<PropsTable rows={iconProps} testID="props-table" />
			</Stack>

			<DocsExample title="Usage" code={usageSnippet} allowToggle={false}>
				<Typography level="body-md" textColor={theme.colors.onSurfaceVariant}>
					Icon supports any color token via the{" "}
					<Typography component="span" level="body-md">
						color
					</Typography>{" "}
					prop and will fall back to{" "}
					<Typography component="span" level="body-md">
						onSurface
					</Typography>{" "}
					automatically.
				</Typography>
			</DocsExample>
		</Stack>
	);
}
