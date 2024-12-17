import Svg, { Path } from "react-native-svg";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import type { IconName } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useThemeColor } from "@/hooks/useThemeColor";
import type { IconProps, IconPrefix } from "@/constants/types";
import { Tokens } from "@/constants/Tokens";
import { getIconSize } from "@/helpers/getIconSize";
import { View } from "./View";

// Font Awesome setup
library.add(fab, far, fas);

export const Icon = ({ name, color, size, type }: IconProps) => {
	const iconColor = color || useThemeColor("text");
	const iconSize = size ? getIconSize(size) : Tokens.m;

	return (
		<View style={{ padding: 0 }} transparent>
			{name === "brain-game" ? (
				bgIcon(iconColor, iconSize)
			) : (
				<FontAwesomeIcon
					icon={[(type as IconPrefix) || "far", name as IconName]}
					color={iconColor}
					size={iconSize as number}
					style={{ outline: "none" }}
				/>
			)}
		</View>
	);
};

const bgIcon = (color: string, size: number) => (
	<Svg viewBox="0 0 24 24" fill={color} width={size} height={size}>
		<Path d="m20.88,7.56l1.56-.78,1.56-.78v-2.88c0-.57-.15-1.1-.42-1.56-.27-.47-.67-.87-1.14-1.14C21.98.15,21.45,0,20.88,0H3.12C2.55,0,2.02.15,1.56.42c-.47.27-.87.67-1.14,1.14-.27.46-.42.99-.42,1.56v17.76c0,.57.15,1.1.42,1.56.27.47.67.87,1.14,1.14.46.27.99.42,1.56.42h17.76c.57,0,1.1-.15,1.56-.42.47-.27.87-.67,1.14-1.14.27-.46.42-.99.42-1.56v-10.44h-8.88l-3.12,1.56,3.12,1.56h5.76v5.76c0,.19-.03.38-.1.55l-2.2-1.1-.58-.29-12.95-6.48,12.95-6.48.58-.29,2.2-1.1c.06.17.1.35.1.55v2.88Zm-5.05,13.32H4.68c-.86,0-1.56-.7-1.56-1.56v-4.79l12.71,6.35ZM3.12,9.47v-4.79c0-.86.7-1.56,1.56-1.56h11.14L3.12,9.47Z" />
	</Svg>
);
