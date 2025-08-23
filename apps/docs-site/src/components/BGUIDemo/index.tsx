"use client";

// Re-export types
// Legacy type exports for backward compatibility
export type {
	AlertProps,
	AvatarProps,
	BadgeProps,
	BoxProps,
	BoxProps as ViewProps,
	ButtonProps,
	CardProps,
	CheckboxProps,
	ChipProps,
	CircularProgressProps,
	ContainerProps,
	DividerProps,
	GridProps,
	IconButtonProps,
	InputProps,
	InputProps as TextInputProps,
	LinearProgressProps,
	LinkProps,
	ListItemProps,
	ListProps,
	ModalProps,
	RadioGroupProps,
	RadioProps,
	SelectProps,
	SkeletonProps,
	StackProps,
	SwitchProps,
	TabListProps,
	TabPanelProps,
	TabProps,
	TabsProps,
	TextareaProps,
	TooltipProps,
	TypographyProps,
	TypographyProps as TextProps,
} from "@braingame/bgui";
// Re-export all components from @braingame/bgui for use in documentation
// Compatibility exports for old component names
export {
	Alert,
	Avatar,
	Badge,
	Box,
	Box as View,
	Button,
	Card,
	Checkbox,
	Chip,
	CircularProgress,
	Container,
	Divider,
	Grid,
	IconButton,
	Input,
	Input as TextInput,
	LinearProgress,
	Link,
	List,
	ListItem,
	Modal,
	Option,
	Radio,
	RadioGroup,
	Select,
	Skeleton,
	Stack,
	Switch,
	Tab,
	TabList,
	TabPanel,
	Tabs,
	Textarea,
	Tooltip,
	Typography,
	Typography as Text,
} from "@braingame/bgui";

// Import for Icon component
import { Option as BGUIOption, Typography as BGUITypography } from "@braingame/bgui";

// Icon component for backward compatibility - uses Typography with material icon font
export const Icon = ({
	name,
	size = "md",
	color,
	style,
	...props
}: {
	name: string;
	size?: "sm" | "md" | "lg";
	color?: string;
	style?: any;
	[key: string]: any;
}) => {
	const sizeMap = { sm: 16, md: 24, lg: 32 };
	return (
		<BGUITypography
			component="span"
			style={{
				fontFamily: "Material Icons",
				fontSize: sizeMap[size],
				color,
				...style,
			}}
			{...props}
		>
			{name}
		</BGUITypography>
	);
};

// SelectItem for backward compatibility
export const SelectItem = BGUIOption;
