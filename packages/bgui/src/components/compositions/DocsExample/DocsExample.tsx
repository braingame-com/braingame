import { memo, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, type ViewStyle } from "react-native";
import { useTheme } from "../../../theme";
import { Button } from "../../primitives/Button";
import { Icon } from "../../primitives/Icon";
import { Stack } from "../../primitives/Stack";
import { Typography } from "../../primitives/Typography";
import { Card, CardContent, CardHeader } from "../Card";
import { CodeSnippet } from "../CodeSnippet";
import type { DocsExampleProps } from "./DocsExample.types";

const TOGGLE_LABELS = {
	show: "Show code",
	hide: "Hide code",
};

const COPY_LABELS = {
	copy: "Copy code",
	copied: "Copied",
};

export const DocsExample = memo(function DocsExample({
	title,
	description,
	code,
	codeLanguage,
	children,
	defaultExpanded = false,
	allowToggle = true,
	copyLabel,
	copiedLabel,
	style,
	testID,
}: DocsExampleProps) {
	const theme = useTheme();
	const [expanded, setExpanded] = useState(defaultExpanded || !allowToggle);
	const [copied, setCopied] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(
		() => () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		},
		[],
	);

	const handleToggle = () => {
		if (!allowToggle) return;
		setExpanded((current) => !current);
	};

	const handleCopy = async () => {
		if (!code) return;
		try {
			if (typeof navigator !== "undefined" && navigator.clipboard) {
				await navigator.clipboard.writeText(code);
			}
			setCopied(true);
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			timeoutRef.current = setTimeout(() => setCopied(false), 2000);
		} catch (error) {
			if (process.env.NODE_ENV === "development") {
				console.warn("DocsExample: failed to copy code", error);
			}
		}
	};

	const cardStyle = useMemo(
		() => StyleSheet.flatten<ViewStyle>([{ width: "100%" }, style]),
		[style],
	);

	const showCode = Boolean(code) && (!allowToggle || expanded);
	const resolvedCopyLabel = copyLabel ?? COPY_LABELS.copy;
	const resolvedCopiedLabel = copiedLabel ?? COPY_LABELS.copied;

	return (
		<Card style={cardStyle} testID={testID}>
			{title ? (
				<CardHeader
					title={title}
					subtitle={
						description ? (
							typeof description === "string" ? (
								<Typography level="body-sm" textColor={theme.colors.onSurfaceVariant}>
									{description}
								</Typography>
							) : (
								description
							)
						) : undefined
					}
				/>
			) : null}
			<CardContent>
				{typeof children === "string" ? (
					<Typography level="body-md">{children}</Typography>
				) : (
					children
				)}
			</CardContent>
			{code ? (
				<CardContent>
					<Stack spacing="sm">
						<Stack
							direction="row"
							spacing="sm"
							useFlexGap
							style={{
								justifyContent: allowToggle ? "space-between" : "flex-end",
								flexWrap: "wrap",
							}}
						>
							{allowToggle ? (
								<Button
									variant="plain"
									color="neutral"
									onClick={handleToggle}
									startDecorator={<Icon name="code" size={18} color={theme.colors.primary} />}
								>
									{expanded ? TOGGLE_LABELS.hide : TOGGLE_LABELS.show}
								</Button>
							) : null}
							<Button
								variant="plain"
								color="neutral"
								onClick={handleCopy}
								startDecorator={
									<Icon
										name={copied ? "check" : "content_copy"}
										size={18}
										color={theme.colors.primary}
									/>
								}
							>
								{copied ? resolvedCopiedLabel : resolvedCopyLabel}
							</Button>
						</Stack>
						{showCode ? (
							<CodeSnippet
								code={code}
								language={codeLanguage}
								caption={codeLanguage ? codeLanguage.toUpperCase() : undefined}
							/>
						) : null}
					</Stack>
				</CardContent>
			) : null}
		</Card>
	);
});
