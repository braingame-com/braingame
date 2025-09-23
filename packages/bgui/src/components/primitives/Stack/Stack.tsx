import type { ReactElement } from "react";
import { Children, Fragment, isValidElement } from "react";
import { StyleSheet } from "react-native";
import { theme } from "../../../theme";
import { Box } from "../Box";
import type { SpacingValue, StackProps } from "./Stack.types";

const resolveSpacing = (value: SpacingValue | undefined) => {
	if (typeof value === "number") return value;
	if (!value) return 0;
	return theme.spacing[value as keyof typeof theme.spacing] ?? 0;
};

export const Stack: React.FC<StackProps> = ({
	children,
	direction = "column",
	spacing = 0,
	divider,
	useFlexGap = true,
	style,
	testID,
}) => {
	const spacingValue = resolveSpacing(spacing);
	const childArray = Children.toArray(children).filter(isValidElement) as ReactElement[];

	const baseStyle = StyleSheet.flatten([{ flexDirection: direction }, style]);

	// When divider provided, interleave regardless of gap support
	if (divider && childArray.length > 1) {
		const interleaved: React.ReactNode[] = [];
		childArray.forEach((child, index) => {
			interleaved.push(child);
			if (index < childArray.length - 1) {
				const dividerKey =
					typeof child.key === "string" ? `${child.key}-divider` : `divider-${index}`;
				interleaved.push(<Fragment key={dividerKey}>{divider}</Fragment>);
			}
		});

		return (
			<Box testID={testID} style={baseStyle}>
				{interleaved}
			</Box>
		);
	}

	if (useFlexGap && spacingValue > 0) {
		return (
			<Box
				testID={testID}
				style={StyleSheet.flatten([baseStyle, { rowGap: spacingValue, columnGap: spacingValue }])}
			>
				{childArray}
			</Box>
		);
	}

	if (spacingValue <= 0 || childArray.length <= 1) {
		return (
			<Box testID={testID} style={baseStyle}>
				{childArray}
			</Box>
		);
	}

	const isRow = direction === "row" || direction === "row-reverse";
	const isReverse = direction === "row-reverse" || direction === "column-reverse";

	let isFirstRendered = true;
	let generatedKey = 0;
	return (
		<Box testID={testID} style={baseStyle}>
			{childArray.map((child) => {
				const marginStyle = isRow
					? isReverse
						? { marginRight: isFirstRendered ? 0 : spacingValue }
						: { marginLeft: isFirstRendered ? 0 : spacingValue }
					: isReverse
						? { marginBottom: isFirstRendered ? 0 : spacingValue }
						: { marginTop: isFirstRendered ? 0 : spacingValue };
				const elementKey =
					typeof child.key === "string" ? child.key : `stack-child-${generatedKey++}`;
				isFirstRendered = false;

				return (
					<Box key={elementKey} style={marginStyle}>
						{child}
					</Box>
				);
			})}
		</Box>
	);
};
