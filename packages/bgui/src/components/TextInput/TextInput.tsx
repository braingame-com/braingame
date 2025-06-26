import { TextInput as RNTextInput, View } from "react-native";
import { Icon } from "../Icon";
import { styles } from "./styles";
import type { TextInputProps } from "./types";

/**
 * TextInput component for user text entry.
 * Supports icons, variants, and all native TextInput props.
 *
 * @example
 * ```tsx
 * // Basic text input
 * <TextInput
 *   value={text}
 *   onValueChange={setText}
 *   placeholder="Enter text"
 * />
 *
 * // With icons
 * <TextInput
 *   value={email}
 *   onValueChange={setEmail}
 *   leftIcon="email"
 *   placeholder="Email address"
 *   keyboardType="email-address"
 * />
 *
 * // Password input with visibility toggle
 * <TextInput
 *   value={password}
 *   onValueChange={setPassword}
 *   leftIcon="lock"
 *   rightIcon={showPassword ? "eye-off" : "eye"}
 *   secureTextEntry={!showPassword}
 * />
 *
 * // Error state
 * <TextInput
 *   value={username}
 *   onValueChange={setUsername}
 *   variant="error"
 *   placeholder="Username"
 * />
 *
 * // Flat variant
 * <TextInput
 *   value={search}
 *   onValueChange={setSearch}
 *   variant="flat"
 *   leftIcon="search"
 *   placeholder="Search..."
 * />
 * ```
 *
 * @component
 */

export function TextInput({
	value,
	onValueChange,
	leftIcon,
	rightIcon,
	variant = "standard",
	style,
	...rest
}: TextInputProps) {
	return (
		<View
			style={[
				styles.container,
				variant === "flat" && styles.flat,
				variant === "error" && styles.error,
				style,
			]}
		>
			{leftIcon && <Icon name={leftIcon} style={styles.icon} />}
			<RNTextInput style={styles.input} value={value} onChangeText={onValueChange} {...rest} />
			{rightIcon && <Icon name={rightIcon} style={styles.icon} />}
		</View>
	);
}
