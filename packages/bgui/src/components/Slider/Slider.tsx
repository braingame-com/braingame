import { useRef, useState } from "react";
import { PanResponder, View } from "react-native";
import { styles } from "./styles";
import type { SliderProps } from "./types";

export const Slider = ({
	value,
	onValueChange,
	min = 0,
	max = 100,
	step = 1,
	disabled = false,
	"aria-label": ariaLabel,
	"aria-describedby": ariaDescribedBy,
}: SliderProps) => {
	const isRange = Array.isArray(value);
	const [values, setValues] = useState<number[]>(isRange ? value : [value]);
	const valuesRef = useRef(values);
	valuesRef.current = values;
	const trackWidth = useRef(0);
	const startValues = useRef<number[]>([]);

	const clamp = (v: number, minVal: number, maxVal: number) =>
		Math.min(Math.max(v, minVal), maxVal);

	const round = (v: number) => Math.round((v - min) / step) * step + min;

	const handleDrag = (index: number, dx: number) => {
		if (!trackWidth.current) return;
		const range = max - min;
		let next = startValues.current[index] + (dx / trackWidth.current) * range;
		next = round(next);
		next = clamp(next, min, max);
		if (isRange) {
			if (index === 0) next = Math.min(next, valuesRef.current[1]);
			else next = Math.max(next, valuesRef.current[0]);
		}
		const updated = [...valuesRef.current];
		updated[index] = next;
		valuesRef.current = updated;
		setValues(updated);
		onValueChange(isRange ? (updated as [number, number]) : updated[0]);
	};

	const createResponder = (index: number) =>
		PanResponder.create({
			onStartShouldSetPanResponder: () => !disabled,
			onPanResponderGrant: () => {
				startValues.current[index] = valuesRef.current[index];
			},
			onPanResponderMove: (_, gesture) => {
				handleDrag(index, gesture.dx);
			},
		});

	const responders = values.map((_, i) => createResponder(i));

	const getThumbLeft = (val: number) => {
		if (!trackWidth.current) return 0;
		const ratio = (val - min) / (max - min);
		return ratio * trackWidth.current;
	};

	const lower = getThumbLeft(values[0]);
	const upper = isRange ? getThumbLeft(values[1]) : lower;

	return (
		<View
			style={[styles.container, disabled && { opacity: 0.5 }]}
			accessible
			accessibilityRole="adjustable"
			accessibilityLabel={ariaLabel}
			accessibilityState={{ disabled }}
			aria-label={ariaLabel}
			aria-describedby={ariaDescribedBy}
		>
			<View
				style={styles.track}
				onLayout={(e) => {
					trackWidth.current = e.nativeEvent.layout.width;
				}}
			>
				{isRange && <View style={[styles.range, { left: lower, width: upper - lower }]} />}
				{!isRange && <View style={[styles.range, { width: lower }]} />}
				{responders.map((responder, index) => (
					<View
						key={`slider-thumb-${index === 0 ? "start" : "end"}`}
						{...responder.panHandlers}
						style={[styles.thumb, { left: index === 0 ? lower : upper }]}
						aria-valuemin={min}
						aria-valuemax={max}
						aria-valuenow={values[index]}
					/>
				))}
			</View>
		</View>
	);
};

// Styles moved to styles.ts
