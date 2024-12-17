import { Link as XRLink } from "expo-router";
import type { LinkProps } from "@/constants/types";
import { Text } from "@/components/Text";

export const Link = ({ text, href, style }: LinkProps) => (
	<XRLink href={href} style={typeof style === "object" ? { ...style } : {}}>
		<Text type="link">{text}</Text>
	</XRLink>
);
