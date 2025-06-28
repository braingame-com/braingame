import { pageWrapperStyles } from "./styles";
import type { PageWrapperProps } from "./types";

/**
 * Provides safe area padding and base layout for each page.
 */
export const PageWrapper = ({ children }: PageWrapperProps) => {
	const style = {
		minHeight: "100vh",
		display: "flex",
		flexDirection: "column" as const,
		...pageWrapperStyles.container,
	};

	return <div style={style}>{children}</div>;
};
