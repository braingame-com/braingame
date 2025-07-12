"use client";

import type React from "react";
import type { TextInputProps } from "./types";

export function TextInput({
	value,
	onValueChange,
	placeholder,
	placeholderTextColor = "#999",
	keyboardType = "default",
	autoCapitalize = "sentences",
	autoComplete,
	editable = true,
	secureTextEntry = false,
	multiline = false,
	numberOfLines = 1,
	style,
	error,
	tabIndex,
	accessibilityLabel,
	accessibilityHint,
	...props
}: TextInputProps) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		if (onValueChange) {
			onValueChange(e.target.value);
		}
	};

	// Map React Native keyboard types to HTML input types
	const getInputType = () => {
		if (secureTextEntry) return "password";
		switch (keyboardType) {
			case "email-address":
				return "email";
			case "numeric":
			case "number-pad":
			case "decimal-pad":
				return "number";
			case "phone-pad":
				return "tel";
			case "url":
				return "url";
			default:
				return "text";
		}
	};

	// Map React Native autoCapitalize to HTML
	const getAutoCapitalize = () => {
		switch (autoCapitalize) {
			case "none":
				return "off";
			case "words":
				return "words";
			case "characters":
				return "characters";
			default:
				return "sentences";
		}
	};

	const baseStyle = {
		fontFamily: "inherit",
		fontSize: 16,
		padding: "8px 12px",
		borderRadius: 4,
		border: error ? "1px solid #ef4444" : "1px solid #ccc",
		backgroundColor: editable ? "#fff" : "#f5f5f5",
		color: editable ? "#000" : "#666",
		width: "100%",
		boxSizing: "border-box" as const,
		outline: "none",
		transition: "border-color 0.2s",
		...style,
	};

	const commonProps = {
		value,
		onChange: handleChange,
		placeholder,
		disabled: !editable,
		autoComplete,
		autoCapitalize: getAutoCapitalize(),
		tabIndex,
		"aria-label": accessibilityLabel,
		"aria-describedby": accessibilityHint,
		style: baseStyle,
		...props,
	};

	if (multiline) {
		return (
			<textarea
				{...commonProps}
				rows={numberOfLines}
				style={{
					...baseStyle,
					resize: "vertical",
					minHeight: numberOfLines * 24,
				}}
			/>
		);
	}

	return <input {...commonProps} type={getInputType()} />;
}
