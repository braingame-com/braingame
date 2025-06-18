import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Colors, Tokens } from "@braingame/utils";
import { View } from "../../../View";
import { Text } from "../../../Text";
import { Icon } from "../../../Icon";
import type { AlertProps } from "./types";

export const Alert = ({
        variant = "inline",
        title,
        message,
        type = "info",
        actions,
        dismissible,
        onDismiss,
        style,
}: AlertProps) => {
        const [visible, setVisible] = useState(true);

        if (!visible) {
                return null;
        }

        const backgroundColorMap = {
                info: Colors.universal.primaryFaded,
                success: Colors.universal.positiveFaded,
                warning: Colors.universal.warnFaded,
                error: Colors.universal.negativeFaded,
        } as const;
        const borderColorMap = {
                info: Colors.universal.primaryHalfFaded,
                success: Colors.universal.positiveHalfFaded,
                warning: Colors.universal.warnHalfFaded,
                error: Colors.universal.negativeHalfFaded,
        } as const;

        const handleDismiss = () => {
                setVisible(false);
                if (onDismiss) {
                        onDismiss();
                }
        };

        return (
                <View
                        style={[
                                styles.container,
                                variant === "banner" && styles.banner,
                                variant === "floating" && styles.floating,
                                {
                                        backgroundColor: backgroundColorMap[type],
                                        borderColor: borderColorMap[type],
                                },
                                style,
                        ]}
                >
                        <View style={styles.content}>
                                {title && (
                                        <Text type="subtitle" style={styles.title}>
                                                {title}
                                        </Text>
                                )}
                                <Text>{message}</Text>
                                {actions && <View style={styles.actions}>{actions}</View>}
                        </View>
                        {dismissible && (
                                <Pressable onPress={handleDismiss} style={styles.close} accessibilityRole="button" accessibilityLabel="Dismiss alert">
                                        <Icon name="xmark" size="small" />
                                </Pressable>
                        )}
                </View>
        );
};

const styles = StyleSheet.create({
        container: {
                flexDirection: "row",
                alignItems: "flex-start",
                padding: Tokens.s,
                borderWidth: 1,
                borderRadius: Tokens.xs,
                gap: Tokens.s,
        },
        banner: {
                width: "100%",
        },
        floating: {
                position: "absolute",
                top: Tokens.l,
                left: Tokens.l,
                right: Tokens.l,
                zIndex: 1000,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 4,
        },
        content: {
                flex: 1,
        },
        title: {
                marginBottom: Tokens.xs,
        },
        actions: {
                marginTop: Tokens.s,
        },
        close: {
                marginLeft: Tokens.s,
        },
});
