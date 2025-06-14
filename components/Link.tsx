import { Text } from "@/components/Text";
import type { LinkProps } from "@/constants/types";
import { Link as XRLink } from "expo-router";

export const Link = ({ text, href, style }: LinkProps) => (
	<XRLink href={href} style={typeof style === "object" ? { ...style } : {}}>
		<Text type="link">{text}</Text>
	</XRLink>
);
