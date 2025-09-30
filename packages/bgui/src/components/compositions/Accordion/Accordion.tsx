import {
	Children,
	createContext,
	isValidElement,
	type ReactElement,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";
import { LayoutAnimation, Platform, Pressable, StyleSheet, UIManager, View } from "react-native";
import { theme } from "../../../theme";
import { Typography } from "../../primitives/Typography";
import type { AccordionItemProps, AccordionProps, AccordionValue } from "./Accordion.types";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

type AccordionContextValue = {
	openValues: Set<AccordionValue>;
	toggle: (value: AccordionValue) => void;
	multiple: boolean;
	disabled: boolean;
	allowCollapseAll: boolean;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

const useAccordion = () => {
	const context = useContext(AccordionContext);
	if (!context) {
		throw new Error("Accordion components must be used within <Accordion>");
	}
	return context;
};

const normalizeValue = (value?: AccordionValue | AccordionValue[]) => {
	if (!value) return [];
	return Array.isArray(value) ? value : [value];
};

const createSet = (values: AccordionValue[]) => new Set(values);

const AccordionItemComponent: React.FC<AccordionItemProps> = ({
	value,
	title,
	description,
	children,
	disabled,
	style,
}) => {
	const { openValues, toggle, multiple, disabled: accordionDisabled } = useAccordion();
	const isOpen = openValues.has(value);
	const isDisabled = accordionDisabled || disabled;

	const handleToggle = useCallback(() => {
		if (isDisabled) return;
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		toggle(value);
	}, [isDisabled, toggle, value]);

	return (
		<View style={[styles.itemContainer, style]}>
			<Pressable
				onPress={handleToggle}
				accessible
				accessibilityRole="button"
				accessibilityState={{ expanded: isOpen, disabled: isDisabled }}
				style={[
					styles.trigger,
					isOpen && styles.triggerActive,
					isDisabled && styles.triggerDisabled,
				]}
			>
				<View style={styles.triggerContent}>
					<Typography level="title-sm" style={styles.triggerTitle}>
						{title}
					</Typography>
					<Typography level="body-sm" style={[styles.chevron, isOpen && styles.chevronOpen]}>
						⌄
					</Typography>
				</View>
				{description ? (
					<Typography level="body-sm" style={styles.description}>
						{description}
					</Typography>
				) : null}
			</Pressable>
			{isOpen ? <View style={styles.content}>{children}</View> : null}
			{multiple ? <View style={styles.separator} /> : null}
		</View>
	);
};

const AccordionComponent: React.FC<AccordionProps> & { Item: typeof AccordionItemComponent } = ({
	children,
	defaultValue,
	value,
	onValueChange,
	multiple = false,
	disabled = false,
	allowCollapseAll = true,
	style,
}) => {
	const [internalValues, setInternalValues] = useState<AccordionValue[]>(() =>
		normalizeValue(defaultValue),
	);
	const isControlled = value !== undefined;
	const openValues = useMemo(
		() => createSet(normalizeValue(isControlled ? value : internalValues)),
		[isControlled, value, internalValues],
	);

	const updateValues = useCallback(
		(next: AccordionValue[]) => {
			if (!isControlled) {
				setInternalValues(next);
			}
			onValueChange?.(next);
		},
		[isControlled, onValueChange],
	);

	const toggle = useCallback(
		(itemValue: AccordionValue) => {
			const current = new Set(openValues);

			if (current.has(itemValue)) {
				if (!allowCollapseAll && current.size === 1) return;
				current.delete(itemValue);
			} else {
				if (!multiple) {
					current.clear();
				}
				current.add(itemValue);
			}

			updateValues(Array.from(current));
		},
		[allowCollapseAll, multiple, openValues, updateValues],
	);

	const contextValue = useMemo<AccordionContextValue>(
		() => ({
			openValues,
			toggle,
			multiple,
			disabled,
			allowCollapseAll,
		}),
		[allowCollapseAll, disabled, multiple, openValues, toggle],
	);

	const items = useMemo(() => {
		const validChildren: ReactElement<AccordionItemProps>[] = [];
		Children.forEach(children as ReactNode, (child) => {
			if (isValidElement<AccordionItemProps>(child)) {
				validChildren.push(child);
			}
		});
		return validChildren;
	}, [children]);

	return (
		<AccordionContext.Provider value={contextValue}>
			<View style={[styles.container, style]}>{items}</View>
		</AccordionContext.Provider>
	);
};

AccordionComponent.Item = AccordionItemComponent;

export const Accordion = AccordionComponent;

const styles = StyleSheet.create({
	container: {
		borderRadius: theme.radii.lg,
		backgroundColor: theme.colors.surface,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: theme.colors.outlineVariant,
	},
	itemContainer: {
		overflow: "hidden",
	},
	trigger: {
		paddingHorizontal: theme.spacing.lg,
		paddingVertical: theme.spacing.md,
		backgroundColor: theme.colors.surface,
		flexDirection: "column",
		gap: theme.spacing.xs,
	},
	triggerActive: {
		backgroundColor: theme.colors.primaryContainer,
	},
	triggerDisabled: {
		opacity: 0.6,
	},
	triggerContent: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	triggerTitle: {
		color: theme.colors.onSurface,
	},
	description: {
		color: theme.colors.onSurfaceVariant,
	},
	chevron: {
		transform: [{ rotate: "0deg" }],
		color: theme.colors.onSurfaceVariant,
	},
	chevronOpen: {
		transform: [{ rotate: "180deg" }],
	},
	content: {
		paddingHorizontal: theme.spacing.lg,
		paddingBottom: theme.spacing.md,
		backgroundColor: theme.colors.surface,
	},
	separator: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: theme.colors.outlineVariant,
	},
});

export type { AccordionItemProps, AccordionProps, AccordionValue } from "./Accordion.types";
