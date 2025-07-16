import type { OverridableRecord } from "./utils";

export interface DefaultRadius {
	xs: string;
	sm: string;
	md: string;
	lg: string;
	xl: string;
}
export type RadiusOverrides = {};

export interface Radius extends OverridableRecord<DefaultRadius, RadiusOverrides, string> {}
