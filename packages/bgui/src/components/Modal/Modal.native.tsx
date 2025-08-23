import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import {
	Animated,
	BackHandler,
	Dimensions,
	Pressable,
	Modal as RNModal,
	StyleSheet,
	View,
} from "react-native";
import type { ModalProps } from "./ModalProps";

/**
 * Native implementation of Modal component
 *
 * Modals inform users about a task and can contain critical information, require decisions, or involve multiple tasks.
 * This implementation uses React Native's Modal component with proper accessibility and animations.
 */

export const Modal = forwardRef<View, ModalProps>(
	(
		{
			children,
			open,
			onClose,
			disableAutoFocus: _disableAutoFocus = false,
			disableEnforceFocus: _disableEnforceFocus = false,
			disableEscapeKeyDown = false,
			disableRestoreFocus: _disableRestoreFocus = false,
			disableScrollLock: _disableScrollLock = false,
			hideBackdrop = false,
			keepMounted = false,
			disablePortal: _disablePortal = false,
			container: _container,
			style,
			testID,
			role = "dialog",
			"aria-label": ariaLabel,
			"aria-describedby": _ariaDescribedby,
			"aria-labelledby": ariaLabelledby,
		},
		ref,
	) => {
		const modalRef = useRef<View>(null);
		const fadeAnim = useRef(new Animated.Value(0)).current;
		const scaleAnim = useRef(new Animated.Value(0.9)).current;
		const [visible, setVisible] = useState(open);

		// Merge refs
		useImperativeHandle(ref, () => modalRef.current || ({} as object));

		// Handle modal open/close animations
		useEffect(() => {
			if (open) {
				setVisible(true);
				Animated.parallel([
					Animated.timing(fadeAnim, {
						toValue: 1,
						duration: 200,
						useNativeDriver: true,
					}),
					Animated.timing(scaleAnim, {
						toValue: 1,
						duration: 200,
						useNativeDriver: true,
					}),
				]).start();
			} else {
				Animated.parallel([
					Animated.timing(fadeAnim, {
						toValue: 0,
						duration: 150,
						useNativeDriver: true,
					}),
					Animated.timing(scaleAnim, {
						toValue: 0.9,
						duration: 150,
						useNativeDriver: true,
					}),
				]).start(() => {
					if (!keepMounted) {
						setVisible(false);
					}
				});
			}
		}, [open, fadeAnim, scaleAnim, keepMounted]);

		// Handle Android back button
		useEffect(() => {
			if (open && !disableEscapeKeyDown) {
				const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
					onClose?.(null, "escapeKeyDown");
					return true;
				});

				return () => backHandler.remove();
			}
		}, [open, disableEscapeKeyDown, onClose]);

		// Handle backdrop press
		const handleBackdropPress = () => {
			if (onClose) {
				onClose(null, "backdropClick");
			}
		};

		// Handle modal request close
		const handleRequestClose = () => {
			if (onClose) {
				onClose(null, "escapeKeyDown");
			}
		};

		// Don't render if not visible and not keeping mounted
		if (!visible && !keepMounted) {
			return null;
		}

		// Get screen dimensions for centering
		const { width: _screenWidth, height: _screenHeight } = Dimensions.get("window");

		// Modal content styles
		const modalContentStyle = [
			styles.modalContent,
			{
				transform: [{ scale: scaleAnim }],
				opacity: fadeAnim,
			},
			style,
		];

		// Backdrop styles
		const backdropStyle = [
			styles.backdrop,
			{
				opacity: fadeAnim,
			},
		];

		return (
			<RNModal
				visible={visible}
				transparent={true}
				animationType="none"
				onRequestClose={handleRequestClose}
				statusBarTranslucent={true}
				hardwareAccelerated={true}
			>
				<View style={styles.container}>
					{/* Backdrop */}
					{!hideBackdrop && (
						<Animated.View style={backdropStyle}>
							<Pressable
								style={styles.backdropPressable}
								onPress={handleBackdropPress}
								accessible={false}
							/>
						</Animated.View>
					)}

					{/* Modal Content */}
					<Animated.View
						ref={modalRef}
						style={StyleSheet.flatten(modalContentStyle)}
						testID={testID}
						accessibilityRole={role}
						accessibilityLabel={ariaLabel}
						accessibilityLabelledBy={ariaLabelledby}
						accessibilityViewIsModal={true}
						accessible={true}
					>
						{children}
					</Animated.View>
				</View>
			</RNModal>
		);
	},
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "transparent",
	},
	backdrop: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	backdropPressable: {
		flex: 1,
		width: "100%",
		height: "100%",
	},
	modalContent: {
		backgroundColor: "white",
		borderRadius: 12,
		padding: 20,
		marginHorizontal: 20,
		maxWidth: 400,
		maxHeight: "80%",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
});
