import type { ViewProps } from "./types";

export function View({ children, style }: ViewProps) {
	return <div style={(style as React.CSSProperties) || undefined}>{children}</div>;
}
