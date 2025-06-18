import type React from "react";
import {
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { Pressable, Text, View } from "react-native";

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
	register: (ref: React.RefObject<any>) => void;
	refs: React.RefObject<any>[];
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

const toArray = (val?: string | string[]) => {
	if (!val) return [] as string[];
	return Array.isArray(val) ? val : [val];
};

export const Accordion = ({
	children,
	value,
	onValueChange,
	defaultValue,
	allowMultiple = false,
}: AccordionProps) => {
	const controlled = value !== undefined;
	const [internal, setInternal] = useState<string[]>(toArray(defaultValue));
	const expanded = controlled ? toArray(value) : internal;

	const itemRefs = useRef<React.RefObject<any>[]>([]);

	const register = useCallback((ref: React.RefObject<any>) => {
		itemRefs.current.push(ref);
	}, []);

	const focusItem = useCallback((index: number) => {
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
	const ref = useRef<any>(null);
	const indexRef = useRef<number>(-1);

	useEffect(() => {
		register(ref);
		indexRef.current = refs.length - 1;
	}, [register, refs.length]);

	const expandedState = expanded.includes(val);

	const handleKeyDown = (e: any) => {
		if (e.nativeEvent.key === "ArrowDown") {
			e.preventDefault();
			const next = (indexRef.current + 1) % refs.length;
			const nextRef = refs[next];
			nextRef?.current?.focus?.();
		} else if (e.nativeEvent.key === "ArrowUp") {
			e.preventDefault();
			const prev = (indexRef.current - 1 + refs.length) % refs.length;
			const prevRef = refs[prev];
			prevRef?.current?.focus?.();
		} else if (e.nativeEvent.key === " " || e.nativeEvent.key === "Enter") {
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
				onKeyDown={handleKeyDown}
				tabIndex={0}
			>
				{typeof title === "string" ? <Text>{title}</Text> : title}
			</Pressable>
			{expandedState && <View>{children}</View>}
		</View>
	);
};

Accordion.Item = Item;
export default Accordion;
