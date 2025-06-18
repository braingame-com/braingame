import { Link as ExpoLink } from "expo-router";
import type { LinkProps } from "./types";

/**
 * Wrapper around `expo-router` Link that supports optional text shorthand.
 */
export const Link = ({ href, text, children, ...rest }: LinkProps) => {
	return (
		<ExpoLink href={href} {...rest}>
			{text || children}
		</ExpoLink>
	);
};
