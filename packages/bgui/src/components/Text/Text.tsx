import { Text as RNText } from "react-native";
import { Colors } from "../../../../utils/constants/Colors";
import { textStyles } from "../../../../utils/constants/styles";
import { useThemeColor } from "../../../../utils/hooks/useThemeColor";
import type { TextProps } from "./types";

export const Text = ({
  children,
  variant = "body",
  color,
  align = "left",
  numberOfLines,
  style,
  ...rest
}: TextProps) => {
  const baseColor = useThemeColor("text");
  const secondaryColor = useThemeColor("textSecondary");

  let resolvedColor = baseColor;
  switch (color) {
    case "primary":
      resolvedColor = Colors.universal.primary;
      break;
    case "secondary":
      resolvedColor = secondaryColor;
      break;
    case "danger":
      resolvedColor = Colors.universal.negative;
      break;
    case "success":
      resolvedColor = Colors.universal.positive;
      break;
    case "warning":
      resolvedColor = Colors.universal.warn;
      break;
    case "neutral":
    default:
      resolvedColor = baseColor;
  }

  return (
    <RNText
      numberOfLines={numberOfLines}
      style={[
        { color: resolvedColor, textAlign: align, fontFamily: "SohneBook" },
        variant === "h1" && textStyles.displayTitle,
        variant === "h2" && textStyles.title,
        variant === "h3" && textStyles.subtitle,
        variant === "body" && textStyles.default,
        variant === "caption" && textStyles.small,
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
};
