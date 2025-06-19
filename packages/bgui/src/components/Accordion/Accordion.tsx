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

export interface AccordionProps {
	children: ReactNode;
	value?: string | string[];
	onValueChange?: (value: string | string[]) => void;
	defaultValue?: string | string[];
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
		<AccordionContext.Provider value={{ expanded, toggle, register, refs: itemRefs.current }}>
			<View>{children}</View>
		</AccordionContext.Provider>
	);
};

interface ItemProps {
	title: ReactNode;
	value: string;
	children: ReactNode;
}

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

	// biome-ignore lint/suspicious/noExplicitAny: Event type varies between web and native
	const handleKeyDown = (e: any) => {
		const key = Platform.OS === "web" ? e.key : e.nativeEvent?.key;
		if (key === "ArrowDown") {
			if (Platform.OS === "web") e.preventDefault();
			const next = (indexRef.current + 1) % refs.length;
			const nextRef = refs[next];
			// @ts-ignore - focus exists on web
			nextRef?.current?.focus?.();
		} else if (key === "ArrowUp") {
			if (Platform.OS === "web") e.preventDefault();
			const prev = (indexRef.current - 1 + refs.length) % refs.length;
			const prevRef = refs[prev];
			// @ts-ignore - focus exists on web
			prevRef?.current?.focus?.();
		} else if (key === " " || key === "Enter") {
			if (Platform.OS === "web") e.preventDefault();
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
