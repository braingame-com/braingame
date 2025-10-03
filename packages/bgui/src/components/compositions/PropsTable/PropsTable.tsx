import { memo, useMemo } from "react";
import { StyleSheet, type ViewStyle } from "react-native";
import { useTheme } from "../../../theme";
import { Box } from "../../primitives/Box";
import { Stack } from "../../primitives/Stack";
import { Typography } from "../../primitives/Typography";
import { Card, CardContent } from "../Card";
import type { PropsTableProps } from "./PropsTable.types";

export const PropsTable = memo(function PropsTable({
	rows,
	title,
	subtitle,
	emptyState,
	style,
	testID,
}: PropsTableProps) {
	const theme = useTheme();

	const cardStyle = useMemo(
		() => StyleSheet.flatten<ViewStyle>([{ width: "100%" }, style]),
		[style],
	);

	if (!rows.length) {
		return (
			<Card style={cardStyle} testID={testID}>
				<CardContent>
					<Stack spacing="sm">
						{title ? <Typography level="title-sm">{title}</Typography> : null}
						{subtitle ? (
							<Typography level="body-sm" textColor={theme.colors.onSurfaceVariant}>
								{subtitle}
							</Typography>
						) : null}
						{emptyState ? (
							emptyState
						) : (
							<Typography level="body-sm" textColor={theme.colors.onSurfaceVariant}>
								No props exposed for this surface yet.
							</Typography>
						)}
					</Stack>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card style={cardStyle} testID={testID}>
			<CardContent>
				<Stack spacing="md">
					{title ? <Typography level="title-sm">{title}</Typography> : null}
					{subtitle ? (
						<Typography level="body-sm" textColor={theme.colors.onSurfaceVariant}>
							{subtitle}
						</Typography>
					) : null}
					<Stack spacing="sm">
						{rows.map((row) => (
							<Box
								key={row.name}
								backgroundColor="surfaceContainerLow"
								borderRadius="lg"
								padding="md"
								style={{
									borderColor: theme.colors.outlineVariant,
									borderWidth: StyleSheet.hairlineWidth,
								}}
							>
								<Stack spacing="xs">
									<Stack
										direction="row"
										spacing="xs"
										useFlexGap
										style={{ justifyContent: "space-between", alignItems: "center" }}
									>
										<Typography level="title-sm">{row.name}</Typography>
										<Typography
											level="body-xs"
											textColor={row.required ? theme.colors.error : theme.colors.onSurfaceVariant}
										>
											{row.required ? "Required" : "Optional"}
										</Typography>
									</Stack>
									<Typography
										level="body-sm"
										textColor={theme.colors.onSurfaceVariant}
										component="span"
										style={{
											fontFamily:
												"Roboto Mono, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
										}}
									>
										{row.type}
									</Typography>
									{row.defaultValue ? (
										<Typography level="body-xs" textColor={theme.colors.onSurfaceVariant}>
											Default: {row.defaultValue}
										</Typography>
									) : null}
									{row.description ? (
										typeof row.description === "string" ? (
											<Typography level="body-sm">{row.description}</Typography>
										) : (
											row.description
										)
									) : null}
								</Stack>
							</Box>
						))}
					</Stack>
				</Stack>
			</CardContent>
		</Card>
	);
});
