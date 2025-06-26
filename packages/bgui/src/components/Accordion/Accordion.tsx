import { Tokens, useThemeColor } from "@braingame/utils";
import type React from "react";
import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { withErrorBoundary } from "../../utils/withErrorBoundary";
import { ContextErrorBoundary } from "../ErrorBoundary";

/**
 * Props for the Accordion component
 */
export interface AccordionProps {
	/**
	 * Accordion items to display.
	 * Should contain Accordion.Item components.
	 */
	children: ReactNode;

	/**
	 * Controlled expanded panel value(s).
	 * Can be a single string or array of strings for multiple panels.
	 * Must be used with onValueChange.
	 */
	value?: string | string[];

	/**
	 * Callback fired when panels are expanded/collapsed.
	 * Receives the new expanded value(s).
	 * Required when value is provided.
	 */
	onValueChange?: (value: string | string[]) => void;

	/**
	 * Default expanded panel value(s) for uncontrolled usage.
	 * Can be a single string or array of strings.
	 */
	defaultValue?: string | string[];

	/**
	 * Whether multiple panels can be expanded simultaneously.
	 * When false, expanding a panel collapses others.
	 * @default false
	 */
	allowMultiple?: boolean;
}

interface AccordionContextValue {
	expanded: string[];
	toggle: (panel: string) => void;
	register: (ref: React.RefObject<View>) => void;
	refs: React.RefObject<View>[];
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

const toArray = (val?: string | string[]) => {
	if (!val) return [] as string[];
	return Array.isArray(val) ? val : [val];
};

/**
 * Accordion component for organizing content into collapsible panels.
 * Provides accessible expandable sections with keyboard navigation.
 *
 * @example
 * ```tsx
 * // Basic single accordion
 * <Accordion defaultValue="item1">
 *   <Accordion.Item value="item1" title="Section 1">
 *     <Text>Content for section 1</Text>
 *   </Accordion.Item>
 *   <Accordion.Item value="item2" title="Section 2">
 *     <Text>Content for section 2</Text>
 *   </Accordion.Item>
 *   <Accordion.Item value="item3" title="Section 3">
 *     <Text>Content for section 3</Text>
 *   </Accordion.Item>
 * </Accordion>
 *
 * // Controlled accordion with multiple panels
 * <Accordion
 *   value={expanded}
 *   onValueChange={setExpanded}
 *   allowMultiple
 * >
 *   <Accordion.Item value="general" title="General Settings">
 *     <SettingsForm type="general" />
 *   </Accordion.Item>
 *   <Accordion.Item value="advanced" title="Advanced Settings">
 *     <SettingsForm type="advanced" />
 *   </Accordion.Item>
 *   <Accordion.Item value="security" title="Security">
 *     <SecuritySettings />
 *   </Accordion.Item>
 * </Accordion>
 *
 * // Custom title with icons
 * <Accordion defaultValue={["notifications"]} allowMultiple>
 *   <Accordion.Item
 *     value="notifications"
 *     title={
 *       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
 *         <Icon name="bell" />
 *         <Text>Notifications</Text>
 *       </View>
 *     }
 *   >
 *     <NotificationPreferences />
 *   </Accordion.Item>
 *   <Accordion.Item
 *     value="privacy"
 *     title={
 *       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
 *         <Icon name="lock" />
 *         <Text>Privacy</Text>
 *       </View>
 *     }
 *   >
 *     <PrivacySettings />
 *   </Accordion.Item>
 * </Accordion>
 * ```
 *
 * @component
 */
const AccordionComponent = ({
	children,
	value,
	onValueChange,
	defaultValue,
	allowMultiple = false,
}: AccordionProps) => {
	const controlled = value !== undefined;

	// Validate props
	if (controlled && !onValueChange) {
		throw new Error("Accordion: onValueChange is required when value is provided");
	}
	const [internal, setInternal] = useState<string[]>(toArray(defaultValue));
	const expanded = controlled ? toArray(value) : internal;

	const itemRefs = useRef<React.RefObject<View>[]>([]);

	const register = useCallback((ref: React.RefObject<View | null>) => {
		itemRefs.current.push(ref as React.RefObject<View>);
	}, []);

	const _focusItem = useCallback((index: number) => {
		const ref = itemRefs.current[index];
		ref?.current?.focus?.();
	}, []);

	const toggle = useCallback(
		(panel: string) => {
			let next: string[];
			if (allowMultiple) {
				if (expanded.includes(panel)) {
					next = expanded.filter((p) => p !== panel);
				} else {
					next = [...expanded, panel];
				}
			} else {
				next = expanded[0] === panel ? [] : [panel];
			}
			if (controlled) {
				onValueChange?.(allowMultiple ? next : (next[0] ?? ""));
			} else {
				setInternal(next);
				onValueChange?.(allowMultiple ? next : (next[0] ?? ""));
			}
		},
		[expanded, allowMultiple, controlled, onValueChange],
	);

	return (
		<ContextErrorBoundary contextName="Accordion">
			<AccordionContext.Provider value={{ expanded, toggle, register, refs: itemRefs.current }}>
				<View>{children}</View>
			</AccordionContext.Provider>
		</ContextErrorBoundary>
	);
};

/**
 * Props for the Accordion.Item component
 */
interface ItemProps {
	/**
	 * Header content for the accordion item.
	 * Can be text or custom React elements.
	 */
	title: ReactNode;

	/**
	 * Unique identifier for this panel.
	 * Used to track expanded state.
	 */
	value: string;

	/**
	 * Content to display when the panel is expanded.
	 */
	children: ReactNode;
}

/**
 * Individual accordion panel item.
 * Must be used within an Accordion component.
 *
 * @component
 */
export const Item = ({ title, value: val, children }: ItemProps) => {
	const context = useContext(AccordionContext);
	if (!context) {
		throw new Error("Accordion.Item must be used within Accordion");
	}
	const { expanded, toggle, register, refs } = context;
	const ref = useRef<View>(null);
	const indexRef = useRef<number>(-1);
	const [isFocused, setIsFocused] = useState(false);
	const borderColor = useThemeColor("border");

	useEffect(() => {
		register(ref as React.RefObject<View>);
		indexRef.current = refs.length - 1;
	}, [register, refs.length]);

	const expandedState = expanded.includes(val);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "ArrowDown" || e.key === "ArrowUp") {
			e.preventDefault();
			const currentIndex =
				Platform.OS === "web"
					? refs.findIndex(
							(ref) =>
								ref.current === (document as unknown as { activeElement: unknown }).activeElement,
						)
					: -1;
			let nextIndex = currentIndex;

			if (e.key === "ArrowDown") {
				nextIndex = (currentIndex + 1) % refs.length;
			} else if (e.key === "ArrowUp") {
				nextIndex = (currentIndex - 1 + refs.length) % refs.length;
			}

			if (nextIndex !== currentIndex && Platform.OS === "web") {
				(refs[nextIndex].current as unknown as { focus?: () => void })?.focus?.();
			}
		} else if (e.key === " " || e.key === "Enter") {
			e.preventDefault();
			toggle(val);
		}
	};

	return (
		<View>
			<Pressable
				onPress={() => toggle(val)}
				accessibilityRole="button"
				accessibilityState={{ expanded: expandedState }}
				ref={ref}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				{...(Platform.OS === "web"
					? {
							onKeyDown: handleKeyDown,
							tabIndex: 0,
							role: "button" as const,
							"aria-expanded": expandedState,
							"aria-controls": `accordion-content-${val}`,
						}
					: {})}
				style={{
					padding: Tokens.m,
					borderRadius: Tokens.xs,
					// Add focus outline for web
					...(Platform.OS === "web" && isFocused
						? {
								outlineWidth: 2,
								outlineColor: borderColor,
								outlineStyle: "solid",
								outlineOffset: 2,
							}
						: {}),
				}}
			>
				{typeof title === "string" ? <Text>{title}</Text> : title}
			</Pressable>
			{expandedState && (
				<View
					{...(Platform.OS === "web" ? { id: `accordion-content-${val}`, role: "region" } : {})}
				>
					{children}
				</View>
			)}
		</View>
	);
};

// Wrap with error boundary and attach Item
export const Accordion = Object.assign(withErrorBoundary(AccordionComponent), {
	Item: withErrorBoundary(Item),
});

export default Accordion;
