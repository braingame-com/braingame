import { Text, useAbortController, useMountedState } from "@braingame/bgui";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { FIREBASE_FUNCTION_URL, VISION_AREAS } from "../constants";
import { mindsetStyles } from "../styles";
import type { ButtonState, VisionArea } from "../types";

interface VisionGoalsProps {
	onComplete: () => void;
	completed: boolean;
}

/**
 * Vision & Goals Component
 * 5-area life planning system ported from dev-dil
 * Converts React form to React Native with same functionality
 */
export const VisionGoals: React.FC<VisionGoalsProps> = ({ onComplete, completed }) => {
	// Form state - matches dev-dil structure
	const [formData, setFormData] = useState<VisionArea[]>(() =>
		VISION_AREAS.map((area) => ({ key: area, value: "" })),
	);

	const [buttonState, setButtonState] = useState<ButtonState>("idle");
	const [error, setError] = useState<string>("");
	const isMounted = useMountedState();
	const abortController = useAbortController();
	const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const errorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	/**
	 * Handle text input changes
	 * Maintains same data structure as dev-dil
	 */
	const handleInputChange = (index: number, value: string) => {
		const newFormData = [...formData];
		newFormData[index].value = value;
		setFormData(newFormData);

		// Clear error when user starts typing
		if (error) setError("");
	};

	/**
	 * Validate form - all fields required
	 * Same validation logic as dev-dil
	 */
	const validateForm = (): boolean => {
		const emptyFields = formData.filter((item) => !item.value.trim());
		if (emptyFields.length > 0) {
			setError(`Please fill in all ${VISION_AREAS.length} areas`);
			return false;
		}
		return true;
	};

	/**
	 * Submit to Firebase Cloud Function + Google Sheets
	 * Same backend integration as dev-dil
	 */
	const handleSubmit = async () => {
		if (!validateForm()) return;

		if (isMounted()) {
			setButtonState("loading");
			setError("");
		}

		try {
			const response = await fetch(FIREBASE_FUNCTION_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					sheet: "Vision", // Same sheet name as dev-dil
					data: formData,
				}),
				signal: abortController.signal,
			});

			if (abortController.signal.aborted || !isMounted()) return;

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();

			if (!isMounted()) return;

			if (result.success) {
				setButtonState("success");
				onComplete(); // Mark as completed

				// Reset button state after delay (matches dev-dil behavior)
				successTimeoutRef.current = setTimeout(() => {
					if (isMounted()) {
						setButtonState("idle");
					}
				}, 2000);
			} else {
				throw new Error(result.message || "Submission failed");
			}
		} catch (err) {
			if (abortController.signal.aborted || !isMounted()) return;

			console.error("Vision submission error:", err);
			setError(err instanceof Error ? err.message : "Failed to submit vision");
			setButtonState("error");

			// Reset button state after delay
			errorTimeoutRef.current = setTimeout(() => {
				if (isMounted()) {
					setButtonState("idle");
				}
			}, 2000);
		}
	};

	// Cleanup timeouts on unmount
	useEffect(() => {
		return () => {
			if (successTimeoutRef.current) {
				clearTimeout(successTimeoutRef.current);
			}
			if (errorTimeoutRef.current) {
				clearTimeout(errorTimeoutRef.current);
			}
		};
	}, []);

	/**
	 * Get button text based on state
	 * Matches dev-dil Button component behavior
	 */
	const getButtonText = () => {
		switch (buttonState) {
			case "loading":
				return "Saving...";
			case "success":
				return "Saved!";
			case "error":
				return "Failed";
			default:
				return "Save Vision";
		}
	};

	return (
		<View style={mindsetStyles.card}>
			{/* Card Header */}
			<View style={mindsetStyles.cardHeader}>
				<Text variant="title" style={mindsetStyles.cardTitle}>
					Vision & Goals
				</Text>
				<View
					style={[
						mindsetStyles.statusBadge,
						completed ? mindsetStyles.statusCompleted : mindsetStyles.statusPending,
					]}
				>
					<Text style={mindsetStyles.statusText}>{completed ? "✓ Done" : "To do"}</Text>
				</View>
			</View>

			<Text style={mindsetStyles.cardDescription}>
				Define your vision across 5 key life areas. Be specific and detailed.
			</Text>

			{/* Form */}
			<ScrollView style={mindsetStyles.formContainer} showsVerticalScrollIndicator={false}>
				{formData.map((area, index) => (
					<View key={area.key} style={mindsetStyles.inputGroup}>
						<Text style={mindsetStyles.inputLabel}>{area.key}</Text>
						<TextInput
							style={mindsetStyles.textInput}
							value={area.value}
							onChangeText={(value) => handleInputChange(index, value)}
							placeholder={`Describe your vision for ${area.key.toLowerCase()}...`}
							placeholderTextColor="#666"
							multiline
							numberOfLines={4}
							textAlignVertical="top"
						/>
					</View>
				))}

				{/* Error Message */}
				{error ? <Text style={mindsetStyles.errorText}>{error}</Text> : null}

				{/* Submit Button */}
				<View style={{ marginTop: 24 }}>
					<TouchableOpacity
						onPress={handleSubmit}
						disabled={buttonState === "loading"}
						style={[
							mindsetStyles.button,
							buttonState === "loading" && mindsetStyles.buttonLoading,
							buttonState === "success" && mindsetStyles.buttonSuccess,
							buttonState === "error" && mindsetStyles.buttonError,
						]}
					>
						<Text style={mindsetStyles.buttonText}>{getButtonText()}</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
};
