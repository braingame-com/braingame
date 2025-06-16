import { Link as ExpoLink } from "expo-router";
import type { LinkProps } from "./types";

export const Link = ({ href, text, children, ...rest }: LinkProps) => {
	return (
		<ExpoLink href={href} {...rest}>
			{text || children}
		</ExpoLink>
	);
};
