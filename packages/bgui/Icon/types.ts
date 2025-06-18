import type { StyleProp, ViewStyle } from "react-native";
import type { IconSizeProps } from "../../utils/constants/types";

/**
 * Props for the {@link Icon} component.
 */
export interface IconProps {
	/** Name of the icon glyph. */
	name: string;
	/** Icon size key or explicit number of pixels. */
	size?: IconSizeProps | number;
	/** Optional color override. */
	color?: string;
	/** FontAwesome style prefix (e.g. `fas`). */
	type?: string;
	/** Additional style overrides. */
	style?: StyleProp<ViewStyle>;
}
