import type { OverridableRecord } from "./utils";

export interface DefaultShadow {
	xs: string;
	sm: string;
	md: string;
	lg: string;
	xl: string;
}
export type ShadowOverrides = {};
export interface Shadow extends OverridableRecord<DefaultShadow, ShadowOverrides, string> {}
