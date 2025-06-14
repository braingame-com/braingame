import { Link as XRLink } from "expo-router";
import type { LinkProps } from "../utils/constants/types";
import { Text } from "./Text";

export const Link = ({ text, href, style }: LinkProps) => (
	<XRLink href={href} style={typeof style === "object" ? { ...style } : {}}>
		<Text type="link">{text}</Text>
	</XRLink>
);
