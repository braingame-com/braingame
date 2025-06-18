import { Link } from "../../Link";
import { Text } from "../../Text";
import type { BreadcrumbItemProps } from "./types";

export const BreadcrumbItem = ({ children, href, onPress }: BreadcrumbItemProps) => {
	if (href || onPress) {
		return (
			<Link href={href} onPress={onPress}>
				{children}
			</Link>
		);
	}

	return <Text>{children}</Text>;
};
